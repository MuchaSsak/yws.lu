#!/usr/bin/env node
/**
 * One-off import of the We Spark project texts (wiki: site/i18n.md § Project texts): copies each project's title and
 * description from the 2025 dictionary (../lib/dictionary.tsx, parsed, never evaluated) into
 * src/content/projects/<locale>/<slug>.md, word for word. Only the layout is structured: a short line ending with ":"
 * (or a known section label) becomes an h3 without the colon, "•"/"●" lines become list items, URLs and the email
 * become links, other lines paragraphs. `lang` is
 * the language the text is written in (the 2025 dictionary had French texts on the English site and the reverse,
 * Q35). Listed typo fixes are applied after the copy (placeholders.md § Obvious typo fixes).
 *
 *   node scripts/import-projects.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

import { ROOT } from "./routes.mjs";

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
const strings = (code) => {
  const block = dictionary.properties.find((p) => keyOf(p) === code).initializer;
  const out = {};
  for (const p of block.properties) {
    if (!ts.isPropertyAssignment(p)) continue;
    const init = p.initializer;
    if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) out[keyOf(p)] = init.text;
  }
  return out;
};

/** [slug (the anchor, site/structure.md § We Spark Projects), dictionary key part] in the 2025 order. */
const PROJECTS = [
  ["get-your-home", "GetYourHome"],
  ["locked-out", "LockedOut"],
  ["safe-paths", "SafePaths"],
  ["girlssective", "GirlsSective"],
  ["mobile-learning", "MobileLearning"],
  ["sport", "Sport"],
  ["self-chronicle", "SelfChronicle"],
];
/**
 * Typos, grammar and typography in the client's texts, fixed after the copy in titles and bodies (each listed in
 * placeholders.md § Obvious typo fixes). The wording stays; the order matters (the specific dash before the generic).
 */
const TYPOS = [
  ["sans pressionni jugement", "sans pression ni jugement"],
  ["du mondequi les entoure", "du monde qui les entoure"],
  ["le ministère de la justice", "le ministère de la Justice"],
  // French titles take no capitals after the first word.
  ["Atelier Jeunesse sur le Logement", "atelier jeunesse sur le logement"],
  ["Regard Jeune sur le Logement", "regard jeune sur le logement"],
  // « naviguer » is intransitive; a dangling participle; a list that loses its « en »; « etc… » doubles the ellipsis.
  ["pour naviguer les défis", "pour faire face aux défis"],
  ["En assistant à nos séances, nous espérons qu'ils", "Nous espérons qu'en assistant à nos séances, ils"],
  ["société. Afin qu'ils puissent", "société, afin qu'ils puissent"],
  [
    "en louant un espace, recruter les participants, acheter le matériel, etc…",
    "en louant un espace, en recrutant les participants, en achetant le matériel, etc.",
  ],
  ["Erasmus +", "Erasmus+"],
  ["(2024-2025)", "(2024–2025)"],
  ["Projet V - ", "Projet V – "],
  // A spaced hyphen is a dash.
  [" - ", " — "],
];
/** French typography for a text written in French: typographic apostrophe, « » quotes, no-break space before : ; ! ? */
const frenchTypography = (text) =>
  text
    .replace(/(\p{L})'(\p{L})/gu, "$1’$2")
    .replace(/“([^”]+)”/g, "« $1 »")
    .replace(/ +([:;!?»])/g, " $1")
    .replace(/« +/g, "« ");
/** Section labels written without a colon (Safe Paths), which become h3 like the "Label :" lines. */
const LABELS = new Set([
  "Workshop Schedule",
  "Practical Information",
  "Registration",
  "Contact",
  "Programme des ateliers",
  "Informations pratiques",
  "Inscription",
]);
/** The language a text is written in: French has accents and French function words; checked by hand for all 14. */
const languageOf = (text) => (/\b(le|la|les|des|est|pour|une|avec)\b/.test(text) && /[éèàç]/.test(text) ? "fr" : "en");

const escape = (text) => text.replace(/([\\*_`<>[\]])/g, "\\$1");
/** Bare URLs and the email become Markdown links (they were plain text in 2025). */
const linkify = (text) =>
  escape(text)
    .replace(/https?:\/\/\S+/g, (url) => `<${url.replace(/\\/g, "")}>`)
    .replace(/\b[\w.]+@[\w.]+\.[a-z]{2,}\b/g, (email) => `[${email}](mailto:${email})`);

function markdown(text) {
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim());
  const out = [];
  let list = false;
  for (const line of lines) {
    if (!line) {
      if (list) out.push("");
      list = false;
      continue;
    }
    const bullet = /^[•●]\s*/.exec(line);
    if (bullet) {
      if (!list) out.push("");
      out.push(`- ${linkify(line.slice(bullet[0].length))}`);
      list = true;
      continue;
    }
    if (list) out.push("");
    list = false;
    // Headings drop the trailing colon (layout, not wording); a lead-in sentence ("During the session, …:") stays.
    if (/^[^,]{2,40}?\s?:$/.test(line) || LABELS.has(line)) out.push(`### ${escape(line.replace(/\s*:$/, ""))}`, "");
    else out.push(linkify(line), "");
  }
  return `${out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()}\n`;
}

for (const code of ["en", "fr"]) {
  const dict = strings(code);
  const dir = join(ROOT, "src", "content", "projects", code);
  mkdirSync(dir, { recursive: true });
  PROJECTS.forEach(([slug, key], index) => {
    let title = dict[`project${key}TitleWeSparkProjects`];
    let body = dict[`project${key}DescriptionWeSparkProjects`];
    if (!title || !body) throw new Error(`${code} ${key} missing`);
    const lang = languageOf(`${title} ${body}`);
    for (const [from, to] of TYPOS) {
      title = title.replaceAll(from, to);
      body = body.replaceAll(from, to);
    }
    if (lang === "fr") [title, body] = [frenchTypography(title), frenchTypography(body)];
    const front = `---\ntitle: ${JSON.stringify(title)}\norder: ${index + 1}\nlang: ${lang}\n---\n\n`;
    writeFileSync(join(dir, `${slug}.md`), front + markdown(body));
    console.log(`${code} ${slug} (${lang}) ${title.slice(0, 60)}`);
  });
}
