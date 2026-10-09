import type { Locale } from "~/lib/locales";

/**
 * A calendar date as each locale writes it (wiki: site/i18n.md § Formatting): "9 April 2026" / « 9 avril 2026 ».
 * `iso` is a `YYYY-MM-DD` day in Luxembourg; noon UTC keeps it on the same day in every time zone the build runs in.
 */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Luxembourg",
  }).format(new Date(`${iso}T12:00:00Z`));
}
