import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { ORGANISATION } from "~/data/organisation";

/**
 * The legal texts (wiki: site/i18n.md § Project texts, legal/compliance-and-data.md): both locales exist with the same
 * outline, their contact facts are organisation.ts's (one source, no drift), and the French follows the site's
 * typography (site/i18n.md § Formatting).
 */
const DIR = fileURLToPath(new URL("legal/", import.meta.url));
const read = (locale: string, page: string) => readFileSync(`${DIR}${locale}/${page}.md`, "utf8");
const outline = (text: string) => [...text.matchAll(/^(#{2,3}) /gm)].map((match) => match[1]);
const body = (text: string) => text.replace(/^---[\s\S]*?---/, "");

describe.each(["privacy", "legal"])("%s", (page) => {
  const en = read("en", page);
  const fr = read("fr", page);

  it("has the same headings in both locales", () => {
    expect(outline(fr)).toEqual(outline(en));
    expect(outline(en).length).toBeGreaterThan(3);
  });

  it("states the contact facts as organisation.ts does", () => {
    for (const text of [en, fr]) {
      expect(text).toContain(ORGANISATION.email);
      expect(text).toContain(ORGANISATION.office.street);
      expect(text).toContain(`${ORGANISATION.office.postalCode} ${ORGANISATION.office.locality}`);
      for (const phone of ORGANISATION.phones) expect(text).toContain(`[+352 ${phone.display}](tel:${phone.e164})`);
    }
  });

  it("writes French with no-break spaces and typographic apostrophes", () => {
    const text = body(fr)
      .replace(/\]\([^)]*\)/g, "]")
      .replace(/`[^`]*`/g, "");
    expect(text).not.toMatch(/ [:;!?»]/);
    expect(text).not.toMatch(/« /);
    expect(text).not.toMatch(/\p{L}'\p{L}/u);
  });
});

it("the legal notice gives the registered office as organisation.ts does", () => {
  for (const locale of ["en", "fr"]) {
    const text = read(locale, "legal");
    expect(text).toContain(`${ORGANISATION.seat.street}, ${ORGANISATION.seat.postalCode} ${ORGANISATION.seat.locality}`);
  }
});
