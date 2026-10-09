#!/usr/bin/env node
/**
 * Fills `src/locales/fr/messages.po` with the client's French, copied mechanically from the 2025 dictionary
 * (wiki: site/i18n.md § French rules: existing French is human text, kept verbatim, never retyped).
 *
 *   node scripts/fill-fr.mjs [--manual scripts/fr-manual.json] [--dry]
 *
 * For every message whose fr `msgstr` is empty: the English text is looked up among the plain-string values of
 * `DICTIONARY.en` in ../lib/dictionary.tsx (whitespace-normalised); the French value under the same key is used.
 * Messages built from JSX entries or split differently go in `scripts/fr-manual.json` ({ "[<context>] <msgid>" or
 * "<msgid>": "<French>" }), each value copied from the dictionary's French JSX, or new French marked for review in
 * placeholders.md. Prints what is still missing. A manual entry also replaces a filled msgstr: that is how a reviewed
 * grammar or wording fix to the client's French lands (each one listed in placeholders.md).
 *
 * French spacing: every fr msgstr gets a no-break space (U+00A0) instead of a plain space before `: ; ! ?` and `»`,
 * after `«` and between a number and `%` (site/i18n.md § Formatting); catalogs.test.ts fails on a plain space there.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

import { ROOT } from "./routes.mjs";

const argv = process.argv.slice(2);
const manualPath = argv.includes("--manual") ? argv[argv.indexOf("--manual") + 1] : join(ROOT, "scripts", "fr-manual.json");
const dry = argv.includes("--dry");
const PO = join(ROOT, "src", "locales", "fr", "messages.po");

// The 2025 dictionary, parsed with TypeScript's own parser (no evaluation of the JSX).
const require = createRequire(join(ROOT, "..", "package.json"));
const ts = require("typescript");
const file = join(ROOT, "..", "lib", "dictionary.tsx");
const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let dictionary;
source.forEachChild(function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText() === "DICTIONARY") dictionary = node.initializer;
  node.forEachChild(visit);
});
const keyOf = (p) => (ts.isStringLiteral(p.name) || ts.isNoSubstitutionTemplateLiteral(p.name) ? p.name.text : p.name.getText());
const strings = (lang) => {
  const block = dictionary.properties.find((p) => keyOf(p) === lang).initializer;
  const out = new Map();
  for (const p of block.properties) {
    if (!ts.isPropertyAssignment(p)) continue;
    const init = p.initializer;
    if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) out.set(keyOf(p), init.text);
  }
  return out;
};
const norm = (text) => text.replace(/\s+/g, " ").trim();
const en = strings("en");
const fr = strings("fr");
const byEnglish = new Map();
for (const [key, text] of en) if (fr.has(key) && !byEnglish.has(norm(text))) byEnglish.set(norm(text), fr.get(key));

// JSX entries (hero lines, descriptions): the text of each top-level element inside the fragment, in order, with
// React's whitespace rule (lines trimmed, joined by one space). en line i ↔ fr line i when both have the same count.
const jsxText = (node) => {
  let out = "";
  const walk = (n) => {
    // Plain-text spans only (whitespace collapsed below), which is all these entries hold.
    if (ts.isJsxText(n)) out += n.text;
    else if (
      ts.isJsxExpression(n) &&
      n.expression &&
      (ts.isStringLiteral(n.expression) || ts.isNoSubstitutionTemplateLiteral(n.expression))
    ) {
      out += n.expression.text;
    } else n.forEachChild(walk);
  };
  walk(node);
  return norm(out);
};
const jsxLines = (lang) => {
  const block = dictionary.properties.find((p) => keyOf(p) === lang).initializer;
  const out = new Map();
  for (const p of block.properties) {
    if (!ts.isPropertyAssignment(p)) continue;
    let init = p.initializer;
    while (ts.isParenthesizedExpression(init)) init = init.expression;
    if (!ts.isJsxFragment(init) && !ts.isJsxElement(init)) continue;
    const children = (ts.isJsxFragment(init) ? init.children : init.children).filter(
      (c) => ts.isJsxElement(c) || ts.isJsxSelfClosingElement(c),
    );
    out.set(keyOf(p), children.map(jsxText).filter(Boolean));
  }
  return out;
};
const enJsx = jsxLines("en");
const frJsx = jsxLines("fr");
for (const [key, lines] of enJsx) {
  const french = frJsx.get(key);
  if (!french || french.length !== lines.length) continue;
  lines.forEach((line, i) => {
    if (!byEnglish.has(line)) byEnglish.set(line, french[i]);
  });
}

const manual = existsSync(manualPath) ? JSON.parse(readFileSync(manualPath, "utf8")) : {};
const unquote = (lines) => lines.map((line) => JSON.parse(line.replace(/^(msgid|msgstr|msgctxt) /, ""))).join("");
/** French spacing (site/i18n.md § Formatting): whitespace only, never wording. */
const frenchSpacing = (text) =>
  text
    .replace(/ +([:;!?»])/g, " $1")
    .replace(/« +/g, "« ")
    .replace(/(\d) +%/g, "$1 %");

const text = readFileSync(PO, "utf8").replace(/\r\n/g, "\n");
let filled = 0;
let changed = 0;
const missing = [];
const blocks = text.split(/\n\n/).map((block) => {
  const lines = block.split("\n");
  const at = (name) => lines.findIndex((line) => line.startsWith(`${name} `));
  const take = (name) => {
    const start = at(name);
    if (start < 0) return "";
    let end = start + 1;
    while (end < lines.length && lines[end].startsWith('"')) end++;
    return unquote(lines.slice(start, end));
  };
  const id = take("msgid");
  if (!id) return block;
  const context = take("msgctxt");
  const current = take("msgstr");
  // A manual entry wins over the dictionary and over a filled msgstr: it is a reviewed fix (placeholders.md).
  const french = manual[context ? `[${context}] ${id}` : id] ?? (current || byEnglish.get(norm(id)));
  if (!french) {
    missing.push(context ? `[${context}] ${id}` : id);
    return block;
  }
  const spaced = frenchSpacing(french);
  if (spaced === current) return block;
  if (current) changed++;
  else filled++;
  const start = at("msgstr");
  let end = start + 1;
  while (end < lines.length && lines[end].startsWith('"')) end++;
  lines.splice(start, end - start, `msgstr ${JSON.stringify(spaced)}`);
  return lines.join("\n");
});
if (!dry) writeFileSync(PO, blocks.join("\n\n"));
console.log(
  `fr: ${filled} filled, ${changed} changed (manual fix or spacing)${dry ? " (dry run)" : ""}, ${missing.length} still empty`,
);
for (const id of missing) console.log(`  missing: ${id.slice(0, 140)}`);
