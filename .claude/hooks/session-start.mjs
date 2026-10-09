#!/usr/bin/env node
/**
 * Claude Code SessionStart hook: the "how we work here" card, injected into a new chat, a resumed one,
 * after /clear and after EVERY compaction (the summary is lossy; the card is not). One file serves this
 * repo (`scripts/`) and every project set up by the start-project-info skill (`.claude/hooks/`), so it
 * finds its pages by convention:
 *   - the working agreement: .claude/project-info/conventions/working-with-claude.md | working-agreement.md
 *   - the lessons:           .claude/project-info/memory/lessons.md | lessons.md (its "## Rules" section)
 *   - in-flight git state:   branch, uncommitted file count, commits not on the upstream, last commit
 * It also remembers the HEAD a session started at (a tiny file in the OS temp dir, keyed by project +
 * session id; a compaction keeps the first one), so wiki-check's Stop hook sees code that was
 * committed during the session, not only what is still uncommitted.
 * Prints nothing it cannot find and always exits 0: a hook must never break a session.
 *
 *   echo '{"source":"compact"}' | node scripts/session-start.mjs
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const WIKI = ".claude/project-info";
const MAX_RULES_CHARS = 8000;

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  input = {};
}
const ROOT = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const source = String(input.source ?? "startup");

const first = (...paths) => paths.find((path) => existsSync(join(ROOT, path)));
const read = (path) => readFileSync(join(ROOT, path), "utf8").replace(/\r\n/g, "\n");

/** The lessons' "## Rules" section (the whole file when it has none), capped. */
function rules(path) {
  const text = read(path);
  const start = text.search(/^## Rules[ \t]*$/m);
  let body = start >= 0 ? text.slice(start).replace(/^## Rules[ \t]*\n/, "") : text;
  const next = body.search(/^## /m);
  if (next >= 0) body = body.slice(0, next);
  body = body.trim();
  if (body.length <= MAX_RULES_CHARS) return body;
  return `${body.slice(0, MAX_RULES_CHARS)}\n... (cut: ${path} is over its cap - merge, prune or promote rules into checks)`;
}

function git(args) {
  try {
    const out = execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 4000 });
    return out.trim();
  } catch {
    return null;
  }
}

/** Counts only: file names never enter the context from here. */
function inFlight() {
  const branch = git(["rev-parse", "--abbrev-ref", "HEAD"]);
  if (branch === null) return null;
  const dirty = (git(["status", "--porcelain", "--untracked-files=all"]) ?? "").split("\n").filter(Boolean).length;
  const ahead = git(["rev-list", "--count", "@{upstream}..HEAD"]);
  const last = git(["log", "-1", "--format=%h %s"]);
  const parts = [`branch ${branch}`, `${dirty} uncommitted file${dirty === 1 ? "" : "s"}`];
  if (ahead !== null) parts.push(`${ahead} commit${ahead === "1" ? "" : "s"} not on the upstream`);
  if (last) parts.push(`last commit ${last}`);
  return parts.join(" | ");
}

const NOTE = {
  compact:
    "The context was just COMPACTED. This is not a pause: carry on with the current task. The summary lost detail: re-read a file before editing it, check `git status` / `git diff` for what is really done, re-run the last failing check.",
  resume: "Resumed session: files may have changed since; check `git status` before continuing.",
  clear: "Fresh context after /clear: read the routed pages for the next task first (the prompt hook lists them).",
  startup: "New session: read the routed pages for the task first (the prompt hook lists them).",
};

/** Where this session's starting HEAD is kept (wiki-check.mjs reads the same path). */
const STATE_DIR = join(tmpdir(), "claude-session-start");
const stateFile = (sessionId) =>
  join(STATE_DIR, `${createHash("sha1").update(`${resolve(ROOT).toLowerCase()}|${sessionId}`).digest("hex").slice(0, 16)}.json`);

function rememberStart() {
  if (!input.session_id) return;
  const head = git(["rev-parse", "HEAD"]);
  if (!head) return;
  try {
    mkdirSync(STATE_DIR, { recursive: true });
    const file = stateFile(input.session_id);
    if (!existsSync(file)) writeFileSync(file, JSON.stringify({ head, root: ROOT, at: Date.now() }));
    const old = Date.now() - 14 * 24 * 3600 * 1000;
    for (const name of readdirSync(STATE_DIR)) if (statSync(join(STATE_DIR, name)).mtimeMs < old) unlinkSync(join(STATE_DIR, name));
  } catch {
    // best effort: without it the Stop hook falls back to the worktree only
  }
}
rememberStart();

const agreement = first(`${WIKI}/conventions/working-with-claude.md`, `${WIKI}/working-agreement.md`);
const lessons = first(`${WIKI}/memory/lessons.md`, `${WIKI}/lessons.md`);
const state = inFlight();
if (!agreement && !lessons && !state) process.exit(0);

const lines = [`[session card | ${source}] ${NOTE[source] ?? NOTE.startup}`];
if (agreement) {
  lines.push(
    `How we work here: ${agreement} (read it once this session: start, quality bar, compaction, pausing only when the user says, finishing, the report, the lessons loop).`,
  );
}
if (state) lines.push(`In flight: ${state}.`);
if (lessons) {
  lines.push(
    `Lessons (${lessons}, "Rules"): mistakes already paid for. Apply them; add one when the user corrects you or a tool trips you.`,
    rules(lessons),
  );
}
process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: lines.join("\n") } }));
