import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { LOCALES, SOURCE_LOCALE } from "../lib/locales";

/**
 * The catalogs are complete (wiki: site/i18n.md § Workflow): every message extracted into the English source catalog
 * has a non-empty translation in every other locale, with the same placeholders. The production build also fails on
 * a missing message (astro.config.mjs `failOnMissing`); this catches it before a build.
 */
interface Entry {
  id: string;
  context: string;
  str: string;
}

function parse(locale: string): Entry[] {
  const text = readFileSync(new URL(`./${locale}/messages.po`, import.meta.url), "utf8").replace(/\r\n/g, "\n");
  const unquote = (lines: string[]) => lines.map((line) => JSON.parse(line.replace(/^(msgid|msgstr|msgctxt) /, ""))).join("");
  return text
    .split(/\n\n+/)
    .map((block) => {
      const lines = block.split("\n").filter((line) => line.trim() && !line.startsWith("#"));
      const field = (name: string) => {
        const start = lines.findIndex((line) => line.startsWith(`${name} `));
        if (start < 0) return "";
        const end = lines.findIndex((line, index) => index > start && /^(msgid|msgstr|msgctxt) /.test(line));
        return unquote(lines.slice(start, end < 0 ? undefined : end));
      };
      return { id: field("msgid"), context: field("msgctxt"), str: field("msgstr") };
    })
    .filter((entry) => entry.id);
}

const placeholders = (text: string) => [...text.matchAll(/\{[^}]+\}|<\d+>|<\/\d+>/g)].map((m) => m[0]).sort();

describe("catalogs", () => {
  const source = parse(SOURCE_LOCALE);

  it("the source catalog is not empty", () => {
    expect(source.length).toBeGreaterThan(10);
  });

  for (const locale of LOCALES.filter((l) => l !== SOURCE_LOCALE)) {
    const target = new Map(parse(locale).map((entry) => [`${entry.context}\u0004${entry.id}`, entry]));
    it(`${locale} translates every message`, () => {
      const missing = source
        .filter((entry) => !target.get(`${entry.context}\u0004${entry.id}`)?.str.trim())
        .map((entry) => entry.id);
      expect(missing).toEqual([]);
    });
    if (locale === "fr")
      it("fr has a no-break space before : ; ! ? », after « and before % (site/i18n.md § Formatting)", () => {
        const plain = [...target.values()].filter((entry) => / [:;!?»%]|« /.test(entry.str)).map((entry) => entry.str);
        expect(plain).toEqual([]);
      });
    if (locale === "fr")
      it("fr uses the typographic apostrophe (’) between letters (site/i18n.md § Formatting)", () => {
        const straight = [...target.values()].filter((entry) => /\p{L}'\p{L}/u.test(entry.str)).map((entry) => entry.str);
        expect(straight).toEqual([]);
      });
    it(`${locale} keeps every placeholder and tag`, () => {
      const broken = source
        .filter((entry) => {
          const str = target.get(`${entry.context}\u0004${entry.id}`)?.str;
          return str && JSON.stringify(placeholders(str)) !== JSON.stringify(placeholders(entry.id));
        })
        .map((entry) => entry.id);
      expect(broken).toEqual([]);
    });
  }
});
