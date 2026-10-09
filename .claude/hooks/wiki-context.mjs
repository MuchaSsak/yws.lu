#!/usr/bin/env node
/**
 * Claude Code UserPromptSubmit hook: wiki-first context. Scores the prompt against the "Task touches"
 * column of the `## Routing table` in the project's CLAUDE.md and injects the <= 5 best wiki pages to
 * read before acting. The routing table stays the ONE list: a new row is picked up automatically.
 * One file serves pstryk-pipeline (`scripts/`) and every project set up by the start-project-info skill
 * (`.claude/hooks/`).
 *
 * Scoring: each prompt word adds to a row when it equals a row word (1) or shares a 5+ letter prefix
 * with one (0.6; a plural -s 0.9), divided by sqrt(number of rows holding that word), so words that are everywhere count
 * little. A row is routed when it scores >= 0.75 AND >= 55% of the best row. Short words (2-3 letters)
 * count only when a row or a synonym uses them. Words people type that the table doesn't use:
 * `.claude/project-info/routing-synonyms.json`, e.g. { "checkout": ["payments"], "zamow*": ["orders"] }
 * (keys are matched without diacritics; a trailing * matches any ending, for inflected languages).
 * Prints nothing for short or unmatched prompts. Always exits 0.
 *
 *   echo '{"prompt":"change the sign-up e-mail"}' | node .claude/hooks/wiki-context.mjs
 *   node .claude/hooks/wiki-context.mjs --test "first prompt" "second prompt"   # rows, scores, matched words
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const MAX_ROWS = 5;
const MIN_SCORE = 0.75;
const RELATIVE = 0.55;
const STOP = new Set(
  (
    "the and for with from into what when where which that this these those your their our how does are was were has have its any all each every " +
    "only also then than them they you not but own new old one two per via just like want make sure some more okay yeah please could would " +
    "should there here about after before because still need thing things stuff maybe really something anything everything can will did done " +
    "let get got use used using way also even well very much many lot lots right now today tomorrow yesterday leave left " +
    "change changes changed update updates updated fix fixes fixed add adds added work works"
  ).split(" "),
);
/** 2-3 letter words that never carry a topic, even when a row happens to contain them. */
const SHORT_STOP = new Set("a an as at be by do go he if in is it me my no of on or so to up us we i ok vs etc via and the for".split(" "));
/** Short tokens that carry meaning on their own. */
const SHORT_OK = new Set(["api", "db", "seo", "cms", "ui", "ux", "cli", "ci", "css", "sql", "kv", "dns", "ssr", "env", "pr", "qa", "csv", "pdf", "faq", "jwt", "pl", "en", "uk"]);
/** Words people type -> words routing tables tend to use. Extended per project by routing-synonyms.json. */
const BASE_SYNONYMS = {
  database: ["data", "schema", "db"], table: ["data", "schema"], migration: ["schema", "migrations"], supabase: ["data", "db"],
  login: ["auth"], signin: ["auth"], password: ["auth"], permissions: ["auth", "access"],
  deploy: ["deploy", "operations", "hosting"], hosting: ["hosting", "operations"], server: ["operations", "hosting"], secrets: ["env", "secrets"],
  translate: ["i18n", "locales"], translation: ["i18n", "locales"], language: ["i18n", "locales"], languages: ["i18n", "locales"],
  copy: ["copy", "voice", "brand"], text: ["copy", "voice"], tone: ["voice", "brand"], microcopy: ["copy", "voice"],
  design: ["design", "tokens", "brand"], colors: ["design", "tokens"], colours: ["design", "tokens"], font: ["design", "typography"],
  fonts: ["design", "typography"], layout: ["design", "structure"], animation: ["design", "motion"], mobile: ["responsive", "design"],
  page: ["structure"], pages: ["structure"], navigation: ["structure"], sitemap: ["structure", "seo"], screen: ["structure", "design"],
  price: ["pricing", "monetization"], prices: ["pricing", "monetization"], payment: ["monetization", "payments"], payments: ["monetization", "payments"],
  legal: ["compliance", "privacy"], gdpr: ["compliance", "privacy"], rodo: ["compliance", "privacy"], privacy: ["compliance", "privacy"],
  cookie: ["compliance", "cookies"], cookies: ["compliance", "cookies"], consent: ["compliance", "consent"],
  google: ["seo"], ranking: ["seo"], keywords: ["seo"], analytics: ["analytics", "events"], tracking: ["analytics", "events"],
  test: ["testing", "conventions"], tests: ["testing", "conventions"], commit: ["git", "conventions", "pausing"], commits: ["git", "conventions"],
  image: ["assets"], images: ["assets"], logo: ["assets", "brand"], icons: ["assets"], photos: ["assets"],
  bug: ["open-questions", "issues", "known"], bugs: ["open-questions", "issues", "known"], question: ["open-questions"], questions: ["open-questions"],
  session: ["session", "working"], sessions: ["session", "working"], chat: ["session", "working"], chats: ["session", "working"],
  compact: ["compaction"], compaction: ["compaction"], pause: ["pausing"], pausing: ["pausing"], stop: ["pausing"], resume: ["pausing"],
  lesson: ["lessons"], lessons: ["lessons"], learn: ["lessons"], remember: ["lessons", "memory"], memory: ["lessons", "memory"],
  process: ["working", "workflow"], processes: ["working", "workflow"], workflow: ["working", "workflow"], quality: ["quality", "done"],
  "routing-table": ["routing", "wiki"], "claude.md": ["routing", "wiki"], wiki: ["wiki", "routing"],
  // Polish stems (keys without diacritics; * = any ending)
  "baz*": ["data", "db"], "dane": ["data", "privacy"], "danych": ["data", "privacy"], "logowan*": ["auth"], "hasl*": ["auth"],
  "wdroz*": ["deploy", "operations"], "tlumacz*": ["i18n", "locales"], "jezyk*": ["i18n", "locales"], "tekst*": ["copy", "voice"],
  "kolor*": ["design", "tokens"], "czcion*": ["design", "typography"], "animacj*": ["design", "motion"], "telefon*": ["responsive", "mobile"],
  "stron*": ["structure", "pages"], "cennik*": ["pricing"], "cen": ["pricing"], "ceny": ["pricing"], "platnos*": ["payments", "monetization"],
  "prywatnos*": ["privacy", "compliance"], "zgod*": ["consent", "compliance"], "ciasteczk*": ["cookies", "compliance"], "regulamin*": ["compliance", "legal"],
  "test*": ["testing"], "blad": ["bugs", "issues"], "bled*": ["bugs", "issues"], "pytani*": ["open-questions"], "zdjec*": ["assets", "images"],
  "sesj*": ["session", "working"], "czat*": ["session", "working"], "pamie*": ["lessons", "memory"], "lekcj*": ["lessons"], "kompakt*": ["compaction"],
};
/** Phrases that mean one thing: a "routing table" is CLAUDE.md, not a database table. */
const PHRASES = [
  [/routing[ -]table/g, "routing-table"],
  [/claude[ .]md\b/g, "claude.md"],
  [/new (?:chats?|sessions?)\b/g, "session"],
];

const normalize = (text) =>
  PHRASES.reduce((out, [re, to]) => out.replace(re, to), String(text).toLowerCase())
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/ł/g, "l");

/** Words of a text; `keepShort(t)` decides whether a 2-3 letter word survives. */
function tokens(text, keepShort = () => false) {
  return normalize(text)
    .split(/[^a-z0-9._-]+/)
    .map((t) => t.replace(/^[._-]+|[._-]+$/g, ""))
    .filter((t) => t.length >= 2 && !STOP.has(t) && (t.length >= 4 || SHORT_OK.has(t) || (!SHORT_STOP.has(t) && keepShort(t))));
}

function loadSynonyms(root) {
  const merged = new Map();
  const add = (key, list) => {
    const k = normalize(key).trim();
    if (k) merged.set(k, [...(merged.get(k) ?? []), ...list.map((w) => normalize(w))]);
  };
  for (const [key, list] of Object.entries(BASE_SYNONYMS)) add(key, list);
  const file = join(root, ".claude/project-info/routing-synonyms.json");
  if (existsSync(file)) {
    try {
      for (const [key, list] of Object.entries(JSON.parse(readFileSync(file, "utf8")))) if (Array.isArray(list)) add(key, list.map(String));
    } catch {
      // a broken file is reported by the wiki lint; routing falls back to the base set
    }
  }
  const exact = new Map();
  const stems = [];
  for (const [key, list] of merged) {
    if (key.endsWith("*") && key.length > 2) stems.push([key.slice(0, -1), list]);
    else exact.set(key, list);
  }
  return { expand: (word) => [...(exact.get(word) ?? []), ...stems.filter(([stem]) => word.startsWith(stem)).flatMap(([, list]) => list)], exact, stems };
}

function routingRows(root) {
  const file = join(root, "CLAUDE.md");
  if (!existsSync(file)) return [];
  const md = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const start = md.indexOf("## Routing table");
  if (start < 0) return [];
  const end = md.indexOf("\n## ", start + 5);
  const rows = [];
  for (const line of md.slice(start, end < 0 ? undefined : end).split("\n")) {
    if (!line.startsWith("|") || /^\|\s*:?-/.test(line) || /Task touches/i.test(line)) continue;
    const [task = "", read = ""] = line.split("|").slice(1).map((cell) => cell.trim());
    const pages = [...read.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
    if (!pages.length) continue;
    // page paths add their own names (api.md -> "api"), not the shared ".claude/project-info" prefix
    const pageWords = pages.flatMap((p) => p.replace(/^\.claude\/project-info\//, "").split("/")).join(" ");
    rows.push({ task: task.replace(/\*\*/g, ""), pages, words: new Set(tokens(`${task} ${pageWords}`, () => true)) });
  }
  return rows;
}

/** Ranked rows for a prompt, with the matched words (for --test). */
export function route(prompt, root) {
  const rows = routingRows(root);
  if (!rows.length) return [];
  const df = new Map();
  for (const row of rows) for (const w of row.words) df.set(w, (df.get(w) ?? 0) + 1);
  const syn = loadSynonyms(root);
  const vocab = new Set([...df.keys(), ...syn.exact.keys()]);
  const base = tokens(prompt, (t) => vocab.has(t) || syn.stems.some(([stem]) => t.startsWith(stem)));
  const words = [...new Set(base.flatMap((w) => [w, ...syn.expand(w)]))];
  const scored = rows.map((row) => {
    let s = 0;
    const hits = [];
    for (const w of words) {
      let best = 0;
      let match = "";
      for (const k of row.words) {
        let v = 0;
        if (k === w) v = k.length >= 4 || SHORT_OK.has(k) ? 1 : 0.5;
        else if (w.length >= 4 && (k === `${w}s` || w === `${k}s`)) v = 0.9; // plural: email ~ emails
        else if (w.length >= 5 && k.length >= 5 && (k.startsWith(w) || w.startsWith(k))) v = 0.6;
        v /= Math.sqrt(df.get(k) ?? 1);
        if (v > best) [best, match] = [v, k];
      }
      if (best > 0) {
        s += best;
        hits.push(match === w ? w : `${w}~${match}`);
      }
    }
    return { row, s, hits };
  });
  const top = Math.max(0, ...scored.map((x) => x.s));
  return scored
    .filter((x) => x.s >= MIN_SCORE && x.s >= RELATIVE * top)
    .sort((a, b) => b.s - a.s)
    .slice(0, MAX_ROWS);
}

const testIndex = process.argv.indexOf("--test");
if (testIndex >= 0) {
  const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  for (const prompt of process.argv.slice(testIndex + 1)) {
    console.log(`> ${prompt}`);
    const ranked = route(prompt, root);
    if (!ranked.length) console.log("  (nothing routed)");
    for (const { row, s, hits } of ranked) console.log(`  ${s.toFixed(2)}  ${row.task.slice(0, 70)}  [${hits.join(", ")}]`);
  }
  process.exit(0);
}

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  process.exit(0);
}
const ROOT = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const prompt = String(input.prompt ?? "");
if (prompt.trim().length < 25) process.exit(0);
// Agent hand-backs and system notifications arrive as prompts too; they are not tasks.
if (/\[Subagent hand-back\]|<task-notification>|\[SYSTEM NOTIFICATION|<agent-message /.test(prompt)) process.exit(0);

let ranked = [];
try {
  ranked = route(prompt, ROOT);
} catch {
  process.exit(0); // a hook must never break a prompt
}
if (ranked.length === 0) process.exit(0);
const additionalContext = [
  "[project wiki] Before acting, read the pages that match this task:",
  ...ranked.map(({ row }) => `- ${row.task}: ${row.pages.join(", ")}`),
  "Change behaviour a page describes -> update that page + append a line to .claude/project-info/log.md in the same change. A correction or a tool gotcha -> a lesson in the lessons page (## Rules).",
].join("\n");
process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext } }));
