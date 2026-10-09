import { describe, expect, it } from "vitest";

import { getI18n } from "./i18n";
import { LOCALES } from "./locales";
import { fullTitle, META } from "./meta";
import { ROUTE_IDS } from "./routes";

/**
 * The metadata table in every locale (wiki: site/seo.md § Metadata rules): the full title fits the result line
 * (target 60, the launch gate's hard cap 65), the description says enough and is not cut (50–155, cap 160), and no
 * two pages share a title or a description.
 */
describe("page metadata", () => {
  for (const locale of LOCALES) {
    const i18n = getI18n(locale);
    const rows = ROUTE_IDS.map((id) => ({
      id,
      title: fullTitle(i18n._(META[id].title), META[id].full),
      description: i18n._(META[id].description),
    }));

    it(`${locale}: every title is 60 characters or fewer`, () => {
      expect(rows.filter((row) => [...row.title].length > 60).map((row) => `${row.id}: ${row.title}`)).toEqual([]);
    });

    it(`${locale}: every description is 50–155 characters`, () => {
      const off = rows.filter((row) => [...row.description].length < 50 || [...row.description].length > 155);
      expect(off.map((row) => `${row.id} (${[...row.description].length}): ${row.description}`)).toEqual([]);
    });

    it(`${locale}: titles and descriptions are unique`, () => {
      expect(new Set(rows.map((row) => row.title)).size).toBe(rows.length);
      expect(new Set(rows.map((row) => row.description)).size).toBe(rows.length);
    });
  }
});
