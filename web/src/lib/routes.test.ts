import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { vercelJson } from "../../scripts/vercel-config";
import { LOCALES } from "./locales";
import { alternates, LEGACY, pathTo, ROUTE_IDS, ROUTES, routeOf } from "./routes";

/** The route map's contract (wiki: site/i18n.md § URLs, site/seo.md § Redirects). */
describe("route map", () => {
  it("has a lowercase ASCII kebab-case slug per locale, unique within the locale", () => {
    for (const locale of LOCALES) {
      const slugs = ROUTE_IDS.filter((id) => id !== "home").map((id) => ROUTES[id][locale]);
      for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("builds paths that end with a slash and round-trip through routeOf", () => {
    for (const locale of LOCALES) {
      for (const id of ROUTE_IDS) {
        const path = pathTo(locale, id);
        expect(path.endsWith("/")).toBe(true);
        expect(routeOf(path)).toEqual({ id, locale });
      }
    }
  });

  it("gives every page reciprocal hreflang links plus x-default", () => {
    for (const id of ROUTE_IDS) {
      const links = alternates("https://www.yws.lu", id);
      expect(links.map((link) => link.hreflang)).toEqual([...LOCALES, "x-default"]);
      for (const link of links) expect(link.href).toMatch(/^https:\/\/www\.yws\.lu\//);
    }
    expect(alternates("https://www.yws.lu", "home").at(-1)?.href).toBe("https://www.yws.lu/");
  });
});

describe("legacy redirects", () => {
  it("point at pages that exist", () => {
    for (const { to } of Object.values(LEGACY)) expect(ROUTE_IDS).toContain(to);
  });

  it("are current in vercel.json (run `bun run vercel:config`)", () => {
    expect(readFileSync(new URL("../../vercel.json", import.meta.url), "utf8")).toBe(vercelJson());
  });
});
