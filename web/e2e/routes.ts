import { DEFAULT_LOCALE, type Locale, LOCALES } from "../src/lib/locales";
import { LEGACY, pathTo, READY, type RouteId } from "../src/lib/routes";

/**
 * Every built page the gates sweep, from the one route map (wiki: site/i18n.md § URLs). Grows as slices migrate
 * routes (`READY`), and covers both locales.
 */
export interface Page {
  id: RouteId;
  locale: Locale;
  path: string;
}
export const PAGES: Page[] = LOCALES.flatMap((locale) => READY.map((id) => ({ id, locale, path: pathTo(locale, id) })));
export const HOMES = LOCALES.map((locale) => pathTo(locale, "home"));
/** Paths every sweep visits: the pages plus a missing URL per locale (the 404). */
export const ROUTES = [...PAGES.map((page) => page.path), "/en/does-not-exist/", "/fr/page-introuvable/"];

/** The gate widths (requirements.md): the full sweep for homes, a lighter one for inner pages. */
export const WIDTHS = [320, 390, 768, 1024, 1440, 1920, 2560] as const;
export const INNER_WIDTHS = [320, 390, 1024, 1920, 2560] as const;

/** Old URLs and where they must 308 (routes.ts LEGACY → vercel.json). `:name(.*)` patterns get a sample path. */
export const LEGACY_CASES = Object.entries(LEGACY).map(([source, { to, hash }]) => ({
  from: source.replace(":name(.*)", "Gestionnaire-du-parc-immobilier.pdf"),
  to: pathTo(DEFAULT_LOCALE, to, hash),
}));
