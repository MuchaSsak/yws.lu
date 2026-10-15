import { describe, expect, it } from "vitest";

import { DEVELOPER } from "~/data/developer";

import { LOCALES } from "./locales";
import { ROUTE_IDS } from "./routes";
import { schemaGraph } from "./schema";

/**
 * The developer credit is markup only (wiki: site/seo.md § JSON-LD graph, Q4): the homes carry the Person node with
 * the same `@id` as on muszarski.com, and every page names it as `creator` by reference.
 */
describe("JSON-LD developer credit", () => {
  const graph = (locale: (typeof LOCALES)[number], route: (typeof ROUTE_IDS)[number]) =>
    schemaGraph({ site: "https://www.yws.lu", locale, route, name: "n", description: "d", mission: "m" })["@graph"] as Record<
      string,
      unknown
    >[];

  it("puts the Person on the homes, with the developer's own @id", () => {
    for (const locale of LOCALES) {
      const person = graph(locale, "home").find((node) => node["@type"] === "Person");
      expect(person?.["@id"]).toBe("https://muszarski.com/#person");
      expect(person?.sameAs).toEqual([...DEVELOPER.sameAs]);
    }
  });

  it("names the developer as creator on every page, by reference only elsewhere", () => {
    for (const route of ROUTE_IDS) {
      const nodes = graph("en", route);
      const page = nodes.find((node) => String(node["@id"]).endsWith("#webpage"));
      expect(page?.creator).toEqual({ "@id": DEVELOPER.id });
      if (route !== "home") expect(nodes.some((node) => node["@type"] === "Person")).toBe(false);
    }
  });
});
