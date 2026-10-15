import type { APIRoute } from "astro";

import { CREDITS } from "~/data/credits";
import { DEVELOPER } from "~/data/developer";
import { ORGANISATION } from "~/data/organisation";
import { AUTONYMS, LOCALES } from "~/lib/locales";

/**
 * humans.txt (wiki: site/seo.md § Feeds): who runs the site, who built it (Q4: named here and in the JSON-LD only,
 * never on the page), whose work it shows, what it is built with.
 */
export const GET: APIRoute = () => {
  const lines = [
    "/* TEAM */",
    `Organisation: ${ORGANISATION.legalName}`,
    `Contact: ${ORGANISATION.email}`,
    "Location: Luxembourg",
    "",
    `Developer: ${DEVELOPER.name}`,
    `Site: ${DEVELOPER.url}`,
    "",
    "/* THANKS */",
    ...CREDITS.map(
      (credit) => `${credit.title} by ${credit.author}: ${credit.source} (CC BY 4.0${credit.modified ? ", modified" : ""})`,
    ),
    "",
    "/* SITE */",
    `Language: ${LOCALES.map((locale) => AUTONYMS[locale]).join(", ")}`,
    "Standards: HTML, CSS, WCAG 2.2 AA",
    "Software: Astro, Lingui, Tailwind CSS, three.js, React Three Fiber",
    `Last update: ${new Date().toISOString().slice(0, 10)}`,
  ];
  return new Response(`${lines.join("\n")}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
