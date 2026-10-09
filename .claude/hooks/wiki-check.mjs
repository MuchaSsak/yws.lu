#!/usr/bin/env node
/**
 * The project wiki's mechanical guard (installed by the start-project-info skill into .claude/hooks/).
 *
 *   node .claude/hooks/wiki-check.mjs              # lint: report, exit 1 on errors
 *   node .claude/hooks/wiki-check.mjs --stop-hook  # Claude Code Stop hook (reads the hook JSON on stdin)
 *
 * Lint (what a script can prove; content truth still needs a read):
 *   1. CLAUDE.md has a `## Routing table` and every path in its "Read" column exists
 *   2. every wiki page is listed in .claude/project-info/README.md (so it can be found)
 *   3. every page starts with `# Title`; relative `x.md` / `../x.md` links between pages resolve
 *   4. log.md entries have the `## [YYYY-MM-DD] <area> | <summary>` shape
 *   5. lessons.md keeps a `## Rules` section (session-start.mjs injects it) under the 60-rule cap
 *   6. routing-synonyms.json and wiki-check.json, when present, are valid JSON objects
 *   7. no secret-looking strings in the wiki, CLAUDE.md or .claude/settings.json (all committed)
 *
 * Stop hook: when code changed since the session started (commits made in the session, read from the
 * HEAD session-start.mjs remembered, plus the worktree) but nothing under the wiki / CLAUDE.md / README
 * did, block the stop ONCE with a reminder (update the page that describes it + log.md, record lessons); when the wiki
 * changed, run the lint and block once on errors. `stop_hook_active` guarantees no loop. Optional
 * `.claude/project-info/wiki-check.json`: { "ignore": ["regex", ...], "areas": [{ "prefix": "src/api/",
 * "pages": ["api.md"] }] } names the pages to update per code area. Never blocks on its own failure.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";

const WIKI_DIR = ".claude/project-info";
const RULES_CAP = 60;
const SKIP_DIRS = new Set(["assets", "research", "fixtures", "audits", "node_modules"]);
const SECRETS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9]{36,}\b/,
  /\bglpat-[A-Za-z0-9_-]{20,}\b/,
  /\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{24,}\b/,
  /\b[rs]k_(?:live|test)_[A-Za-z0-9]{20,}\b/,
  /\bwhsec_[A-Za-z0-9]{20,}\b/,
  /\bAIza[0-9A-Za-z_-]{35}\b/,
  /\bxox[abprs]-[A-Za-z0-9-]{10,}\b/,
  /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\b/,
];

const hookMode = process.argv.includes("--stop-hook");
let input = {};
if (hookMode) {
  try {
    input = JSON.parse(readFileSync(0, "utf8") || "{}");
  } catch {
    input = {};
  }
  if (input.stop_hook_active) process.exit(0);
}
const ROOT = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const WIKI = join(ROOT, WIKI_DIR);
const rel = (p) => relative(ROOT, p).replace(/\\/g, "/");
const read = (p) => readFileSync(p, "utf8").replace(/\r\n/g, "\n");

function pages(dir = WIKI) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (!SKIP_DIRS.has(name)) out.push(...pages(full));
    } else if (name.endsWith(".md")) out.push(full);
  }
  return out;
}

function lint() {
  const errors = [];
  const warnings = [];
  if (!existsSync(WIKI)) return { errors: [`${WIKI_DIR}/ does not exist (run /start-project-info)`], warnings, count: 0 };

  // 1. routing table
  const claudeFile = join(ROOT, "CLAUDE.md");
  const claude = existsSync(claudeFile) ? read(claudeFile) : "";
  const start = claude.indexOf("## Routing table");
  if (!claude) errors.push("CLAUDE.md is missing (it holds the routing table)");
  else if (start < 0) errors.push("CLAUDE.md: no '## Routing table' section");
  else {
    const end = claude.indexOf("\n## ", start + 5);
    const table = claude.slice(start, end < 0 ? undefined : end);
    for (const line of table.split("\n")) {
      if (!line.startsWith("|") || /^\|\s*:?-/.test(line) || /Task touches/i.test(line)) continue;
      for (const [, path] of (line.split("|")[2] ?? "").matchAll(/`([^`\s]+)`/g)) {
        if (/[<>*]/.test(path) || !/(\.\w+|\/)$/.test(path)) continue;
        if (!existsSync(join(ROOT, path)) && !existsSync(join(WIKI, path))) errors.push(`CLAUDE.md routing table: \`${path}\` does not exist`);
      }
    }
    if (!/\|\s*Task touches/i.test(table)) warnings.push("CLAUDE.md routing table: header should be '| Task touches | Read |' (the prompt hook reads it)");
  }

  // 2 + 3. pages
  const readmeFile = join(WIKI, "README.md");
  const readme = existsSync(readmeFile) ? read(readmeFile) : "";
  if (!readme) errors.push(`${WIKI_DIR}/README.md is missing (the map of pages)`);
  const all = pages();
  for (const page of all) {
    const name = rel(page).slice(WIKI_DIR.length + 1);
    const text = read(page);
    if (readme && name !== "README.md" && !readme.includes(name.split("/").pop())) errors.push(`${name}: not listed in README.md`);
    if (!text.split("\n")[0]?.startsWith("# ")) errors.push(`${name}: first line must be '# Title'`);
    for (const [, link] of text.matchAll(/\]\(((?:\.\.\/|\.\/)?[\w./-]+\.md)(?:#[\w-]*)?\)/g)) {
      if (!existsSync(join(dirname(page), link))) (name === "log.md" ? warnings : errors).push(`${name}: link ${link} does not resolve`);
    }
  }

  // 4. log
  const logFile = join(WIKI, "log.md");
  if (!existsSync(logFile)) errors.push(`${WIKI_DIR}/log.md is missing`);
  else {
    for (const line of read(logFile).split("\n")) {
      if (line.startsWith("## ") && !/^## \[\d{4}-\d{2}-\d{2}\] [\w./-]+ \| \S/.test(line)) errors.push(`log.md: malformed entry '${line.slice(0, 80)}'`);
    }
  }

  // 5. lessons
  const lessonsFile = [join(WIKI, "lessons.md"), join(WIKI, "memory/lessons.md")].find((p) => existsSync(p));
  if (!lessonsFile) warnings.push("no lessons.md: the lessons loop has nowhere to write");
  else {
    const parts = read(lessonsFile).split(/^## Rules[ \t]*$/m);
    if (parts.length < 2) errors.push(`${rel(lessonsFile)}: no '## Rules' section (session-start.mjs injects it)`);
    else {
      const rules = parts[1].split(/^## /m)[0].split("\n").filter((line) => line.startsWith("- ")).length;
      if (rules > RULES_CAP) warnings.push(`${rel(lessonsFile)}: ${rules} rules, cap ${RULES_CAP} - merge, prune, or promote some into checks`);
    }
  }

  // 6. the hook config files parse (a broken one silently falls back to defaults)
  for (const name of ["routing-synonyms.json", "wiki-check.json"]) {
    const file = join(WIKI, name);
    if (!existsSync(file)) continue;
    try {
      const value = JSON.parse(read(file));
      if (typeof value !== "object" || Array.isArray(value) || value === null) errors.push(`${name}: must be a JSON object`);
    } catch (error) {
      errors.push(`${name}: invalid JSON (${error.message})`);
    }
  }

  // 7. secrets (the wiki, CLAUDE.md and .claude/settings.json are committed)
  for (const file of [...all, claudeFile, join(ROOT, ".claude/settings.json")].filter((p) => existsSync(p))) {
    const text = read(file);
    if (SECRETS.some((re) => re.test(text))) errors.push(`${rel(file)}: looks like it contains a secret - name the env var, never the value`);
  }
  return { errors, warnings, count: all.length };
}

function git(args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 8000 });
}

/** This session's state files (session-start.mjs writes `.json`; `.stop` = the state last blocked on). */
const statePath = (ext) =>
  join(tmpdir(), "claude-session-start", `${createHash("sha1").update(`${resolve(ROOT).toLowerCase()}|${input.session_id}`).digest("hex").slice(0, 16)}${ext}`);

/** Files committed since this session started (session-start.mjs remembered the HEAD), or []. */
function committedThisSession() {
  if (!input.session_id) return [];
  try {
    const { head } = JSON.parse(readFileSync(statePath(".json"), "utf8"));
    return git(["diff", "--name-only", `${head}..HEAD`]).split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

function stopHook() {
  let files;
  try {
    files = git(["status", "--porcelain", "--untracked-files=all"])
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const path = line.slice(3);
        const arrow = path.indexOf(" -> ");
        return (arrow >= 0 ? path.slice(arrow + 4) : path).replace(/^"|"$/g, "");
      });
  } catch {
    process.exit(0); // not a git repo, or git missing: nothing to compare
  }
  let config = {};
  try {
    config = JSON.parse(read(join(WIKI, "wiki-check.json")));
  } catch {
    config = {};
  }
  const ignore = [
    /(^|\/)(package-lock\.json|bun\.lockb?|yarn\.lock|pnpm-lock\.yaml|Cargo\.lock|poetry\.lock|go\.sum|composer\.lock)$/,
    /\.(snap|log)$/,
    /^\.claude\/(settings\.local\.json|hooks\/)/,
    /^CLAUDE\.local\.md$/,
    ...(config.ignore ?? []).map((re) => new RegExp(re)),
  ];
  const committed = committedThisSession();
  files = [...new Set([...files, ...committed])];
  const isDoc = (file) => file.startsWith(`${WIKI_DIR}/`) || /^(CLAUDE|README|AGENTS)\.md$/i.test(file);
  const docs = files.filter(isDoc);
  const code = files.filter((file) => !isDoc(file) && !ignore.some((re) => re.test(file)));
  const reasons = [];

  if (docs.length) {
    const { errors } = lint();
    if (errors.length) reasons.push("The wiki lint found problems:", ...errors.map((e) => `  - ${e}`));
  } else if (code.length) {
    const areas = (config.areas ?? []).filter((area) => code.some((file) => file.startsWith(area.prefix)));
    reasons.push(
      `${code.length} file(s) changed this session${committed.length ? " (commits included)" : ""} but no wiki change. Before stopping:`,
      ...(areas.length
        ? areas.map((area) => `  - ${area.prefix} -> ${area.pages.map((page) => `${WIKI_DIR}/${page}`).join(", ")}`)
        : [`  - update the ${WIKI_DIR}/ page that describes what changed (the CLAUDE.md routing table says which)`]),
      `  - append a line to ${WIKI_DIR}/log.md`,
      "  - did the user correct you, or did a tool trip you? Add the lesson to lessons.md (## Rules).",
      "If nothing documented changed (a typo, a test, a refactor), say so in one line and stop again.",
      "(Already committed? Docs can follow in their own commit.)",
    );
  }
  if (!reasons.length) process.exit(0);
  // Block once per state: after "nothing documented changed", the same HEAD + worktree passes later stops too.
  if (input.session_id) {
    const worktree = createHash("sha1").update(git(["diff", "HEAD"])).digest("hex");
    const fingerprint = `${git(["rev-parse", "HEAD"]).trim()}|${worktree}|${[...files].sort().join(",")}`;
    try {
      if (readFileSync(statePath(".stop"), "utf8") === fingerprint) process.exit(0);
    } catch {
      // first block in this state
    }
    try {
      writeFileSync(statePath(".stop"), fingerprint);
    } catch {
      // best effort
    }
  }
  process.stdout.write(JSON.stringify({ decision: "block", reason: reasons.join("\n") }));
  process.exit(0);
}

if (hookMode) {
  try {
    stopHook();
  } catch {
    process.exit(0); // never block on the guard itself
  }
} else {
  const { errors, warnings, count } = lint();
  console.log(`wiki-check: ${count} pages, ${errors.length} error(s), ${warnings.length} warning(s)`);
  for (const w of warnings) console.log(`  warn  ${w}`);
  for (const e of errors) console.log(`  ERROR ${e}`);
  process.exit(errors.length ? 1 : 0);
}
