import { DEFAULT_LOCALE, isLocale, type Locale, LOCALES } from "./locales";

/**
 * The ONE route map and path builder (wiki: site/i18n.md § URLs, site/seo.md). Links, canonical, hreflang, the language
 * switcher, the sitemap, the e2e route list and the old-URL redirects (vercel.json, checked by routes.test.ts) all read
 * it. Slugs are lowercase kebab-case, localized per locale from the keyword research (site/seo.md § Target queries).
 * Every path ends with a slash.
 */
export const ROUTES = {
  home: { en: "", fr: "" },
  housing: { en: "youth-housing", fr: "logement-jeunes" },
  owners: { en: "rent-your-property", fr: "louer-son-bien" },
  about: { en: "about-us", fr: "a-propos" },
  projects: { en: "youth-projects", fr: "projets-jeunes" },
  tec: { en: "tec-conference", fr: "conference-tec" },
  privacy: { en: "privacy-policy", fr: "politique-de-confidentialite" },
  legal: { en: "legal-notice", fr: "mentions-legales" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteId = keyof typeof ROUTES;
export const ROUTE_IDS = Object.keys(ROUTES) as RouteId[];

/**
 * The routes migrated so far (wiki: revamp-plan.md § Slices). Astro builds these, and every e2e / Lighthouse sweep
 * runs over them; a slice adds its id when it starts. Removed once every route is migrated.
 */
export const READY: readonly RouteId[] = ["home", "housing"];

/** `/fr/logement-jeunes/` for (`fr`, "housing"). A `#hash` may follow. */
export function pathTo(locale: Locale, id: RouteId, hash?: string): string {
  const slug = ROUTES[id][locale];
  return `/${locale}/${slug ? `${slug}/` : ""}${hash ? `#${hash}` : ""}`;
}

export interface Alternate {
  hreflang: Locale | "x-default";
  href: string;
}

/**
 * Reciprocal, self-referencing hreflang links (absolute). `x-default`: for home, the bare `/` (it redirects by browser
 * language: Google's documented case for x-default); for every other page, the default-locale page (Q19).
 */
export function alternates(site: string | URL, id: RouteId): Alternate[] {
  const origin = new URL(site).origin;
  return [
    ...LOCALES.map((locale) => ({ hreflang: locale, href: origin + pathTo(locale, id) })),
    { hreflang: "x-default" as const, href: origin + (id === "home" ? "/" : pathTo(DEFAULT_LOCALE, id)) },
  ];
}

/** The route id and locale of a built path (`/fr/a-propos/` → about, fr), or null. */
export function routeOf(pathname: string): { id: RouteId; locale: Locale } | null {
  const [first, slug = ""] = pathname.split("/").filter(Boolean);
  if (!isLocale(first)) return null;
  const id = ROUTE_IDS.find((routeId) => ROUTES[routeId][first] === slug);
  return id ? { id, locale: first } : null;
}

/** Static paths for `[locale]/[page].astro`: every migrated route but home, in every locale. */
export const pageStaticPaths = () =>
  LOCALES.flatMap((locale) =>
    READY.filter((id) => id !== "home").map((id) => ({ params: { locale, page: ROUTES[id][locale] }, props: { id } })),
  );

/** Static paths for pages that exist once per locale (`[locale]/index.astro`, `[locale]/404.astro`). */
export const localeStaticPaths = () => LOCALES.map((locale) => ({ params: { locale } }));

export interface LegacyRedirect {
  to: RouteId;
  hash?: string;
}

/**
 * Old URLs still in search indexes, bookmarks and the Wayback Machine → their English page, permanent (308). Keys are
 * Vercel `source` patterns (path-to-regexp). `scripts/vercel-config.ts` writes them into vercel.json with and without
 * the trailing slash and in lower case too; routes.test.ts checks the file is current. English, because that is the
 * content Google indexed under them (research/2026-10-09-audiences-keywords.md F6).
 */
export const LEGACY: Record<string, LegacyRedirect> = {
  // The 2025 Next.js site.
  "/AboutUs": { to: "about" },
  "/LookingForHousing": { to: "housing" },
  "/RentYourProperty": { to: "owners" },
  "/WeSparkProjects": { to: "projects" },
  "/TecConference": { to: "tec" },
  // Jobs retired with both offers [user 2026-10-09]; the two job-ad PDFs too.
  "/Jobs": { to: "about" },
  "/files/CDD_:name(.*)": { to: "about" },
  // The WordPress site (until 2024).
  "/our-story": { to: "about" },
  "/our-accommodations": { to: "housing" },
  "/our-projects": { to: "projects" },
  "/contact": { to: "home", hash: "contact" },
  "/cash-donation": { to: "about" },
  "/donation-in-kind": { to: "about" },
  "/news-event": { to: "projects" },
  "/legal-notices": { to: "legal" },
  "/privacy-policy": { to: "privacy" },
};
