/**
 * The one list of locales (wiki: site/i18n.md). Lingui config, routes, the path builder, sitemaps and scripts read it.
 * The URL segment equals the locale id. Adding a locale = this list + a catalog (`src/locales/<id>/messages.po`).
 */
export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const SOURCE_LOCALE: Locale = "en";
export const DEFAULT_LOCALE: Locale = "en";

/** Each language named in itself: the switcher's visible labels (never flag emoji: Windows draws them as letters). */
export const AUTONYMS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/** Open Graph needs a territory; `<html lang>` and hreflang use the bare code. Luxembourg's French and English. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_GB",
  fr: "fr_FR",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (LOCALES as readonly string[]).includes(value);
