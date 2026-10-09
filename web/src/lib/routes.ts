import { DEFAULT_LOCALE, isLocale, type Locale, LOCALES } from "./locales";

/**
 * The ONE route map and path builder (wiki: site/i18n.md § URLs, site/seo.md). Links, canonical, hreflang, the language
 * switcher, the sitemap, the e2e route list and the old-URL redirects (vercel.json, checked by routes.test.ts) all read
 * it. Slugs are lowercase kebab-case, localized per locale from the keyword research (site/seo.md § Target queries).
 * Every path ends with a slash.
 */
export const ROUTES = {
  home: { en: "", fr: "" },
  housing: { en: "apply-for-housing", fr: "demande-de-logement" },
  owners: { en: "rent-your-property", fr: "louer-votre-bien" },
  about: { en: "about-us", fr: "qui-sommes-nous" },
  projects: { en: "we-spark-projects", fr: "projets-we-spark" },
  tec: { en: "tec-conference", fr: "conference-tec" },
  privacy: { en: "privacy-policy", fr: "politique-de-confidentialite" },
  legal: { en: "legal-notice", fr: "mentions-legales" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteId = keyof typeof ROUTES;
export const ROUTE_IDS = Object.keys(ROUTES) as RouteId[];

/** `/fr/demande-de-logement/` for (`fr`, "housing"). A `#hash` may follow. */
export function pathTo(locale: Locale, id: RouteId, hash?: string): string {
  const slug = ROUTES[id][locale];
  return `/${locale}/${slug ? `${slug}/` : ""}${hash ? `#${hash}` : ""}`;
}

export interface Alternate {
  hreflang: Locale | "x-default";
  href: string;
}

/** Reciprocal, self-referencing hreflang links (absolute); `x-default` is the English page. */
export function alternates(site: string | URL, id: RouteId): Alternate[] {
  const origin = new URL(site).origin;
  return [
    ...LOCALES.map((locale) => ({ hreflang: locale, href: origin + pathTo(locale, id) })),
    { hreflang: "x-default" as const, href: origin + pathTo(DEFAULT_LOCALE, id) },
  ];
}

/** The route id and locale of a built path (`/fr/qui-sommes-nous/` → about, fr), or null. */
export function routeOf(pathname: string): { id: RouteId; locale: Locale } | null {
  const [first, slug = ""] = pathname.split("/").filter(Boolean);
  if (!isLocale(first)) return null;
  const id = ROUTE_IDS.find((routeId) => ROUTES[routeId][first] === slug);
  return id ? { id, locale: first } : null;
}

/** Static paths for `[locale]/[page].astro`: every route but home, in every locale. */
export const pageStaticPaths = () =>
  LOCALES.flatMap((locale) =>
    ROUTE_IDS.filter((id) => id !== "home").map((id) => ({ params: { locale, page: ROUTES[id][locale] }, props: { id } })),
  );

/** Static paths for pages that exist once per locale (`[locale]/index.astro`, `[locale]/404.astro`). */
export const localeStaticPaths = () => LOCALES.map((locale) => ({ params: { locale } }));

/**
 * The 2025 site's PascalCase URLs (what Google indexed, English only) → the English page, permanent (308). `/Jobs`
 * was retired with both offers [user 2026-10-09] and lands on About us. vercel.json holds the same list
 * (routes.test.ts keeps them equal), with and without a trailing slash, case-insensitively.
 */
export const LEGACY: Record<string, RouteId> = {
  "/AboutUs": "about",
  "/LookingForHousing": "housing",
  "/RentYourProperty": "owners",
  "/WeSparkProjects": "projects",
  "/TecConference": "tec",
  "/Jobs": "about",
};
