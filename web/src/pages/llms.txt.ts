import type { APIRoute } from "astro";

import { ORGANISATION } from "~/data/organisation";
import { getI18n } from "~/lib/i18n";
import { LOCALES } from "~/lib/locales";
import { fullTitle, META, MISSION } from "~/lib/meta";
import { INDEXABLE, pathTo } from "~/lib/routes";

/**
 * llms.txt (wiki: site/seo.md § Feeds): the site in plain Markdown for language-model tools. Every indexable page in
 * both languages with its title and description, then the contact facts, all from the same sources as the pages.
 */
const HEADINGS = { en: "Pages", fr: "Pages (français)" } as const;

export const GET: APIRoute = ({ site }) => {
  const en = getI18n("en");
  const pages = LOCALES.map((locale) => {
    const i18n = getI18n(locale);
    const items = INDEXABLE.map((id) => {
      const meta = META[id];
      const title = fullTitle(i18n._(meta.title), meta.full);
      return `- [${title}](${new URL(pathTo(locale, id), site).href}): ${i18n._(meta.description)}`;
    });
    return `## ${HEADINGS[locale]}\n\n${items.join("\n")}`;
  });
  const phones = ORGANISATION.phones.map((phone) => `+352 ${phone.display}`).join(", ");
  const address = (place: { street: string; postalCode: string; locality: string }) =>
    `${place.street}, ${place.postalCode} ${place.locality}`;
  const contact = [
    `- Email: ${ORGANISATION.email}`,
    `- Phone: ${phones}`,
    `- Office: ${address(ORGANISATION.office)}`,
    `- Registered office (postal address): ${address(ORGANISATION.seat)}`,
    ...ORGANISATION.socials.map((social) => `- ${social.name}: ${social.href}`),
  ];
  const body = [`# ${ORGANISATION.name}`, `> ${en._(MISSION)}`, ...pages, `## Contact\n\n${contact.join("\n")}`];
  return new Response(`${body.join("\n\n")}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
