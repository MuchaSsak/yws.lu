# SEO

> Owns: target queries, the entity plan and JSON-LD graph, metadata rules and the metadata table (page × locale),
> crawl and indexing, feeds, favicons, `llms.txt`, `humans.txt`, verification, IndexNow, the launch/SEO gate checks
> and § Launch (the owner's runbook). URLs, slugs, hreflang, the `/` redirect: `i18n.md`. Pages, CTAs, redirects:
> `structure.md`. Facts: `content-model.md`. Evidence: `research/2026-10-09-seo-structured-data.md` (Google rules,
> checked 2026-10-09), `research/2026-10-09-audiences-keywords.md`.

## Where we start (2026-10-09)

- No `<title>`, description, canonical, hreflang, OG or JSON-LD in the served HTML (`generateTranslatedMetadata()`
  returns `undefined` on the server [repo: lib/utils.ts]); French indexable at no URL; `robots.txt`, `sitemap.xml` 404.
- Google titles the home page "Youth Work Synergy (YWS) Logo" and quotes the footer address as the About us snippet;
  a pasted link shows no card [user 2026-10-09]. Lighthouse SEO 82 on every measured route [file: HANDOFF.md § 6].

## Target queries (Google autocomplete gl=lu; no volume data [research: audiences-keywords])

| Page | en: primary · secondary | fr: primary · secondary |
| --- | --- | --- |
| home | Youth Work Synergy (N) · affordable housing for young people in Luxembourg, youth housing Luxembourg | Youth Work Synergy asbl (N) · asbl logement Luxembourg, colocation pour jeunes |
| housing | affordable housing for young people in Luxembourg · cheap room for rent, furnished room / shared house, coliving, housing support Luxembourg | logement jeunes Luxembourg · logement pour jeunes adultes, colocation pas cher, chambre meublée, logement jeunes actifs |
| owners | rent out property Luxembourg (weak), social rental management (GOV wording) · rental income tax Luxembourg, guaranteed rent | gestion locative sociale Luxembourg · louer son bien / appartement à une association, louer son bien sans risques |
| about | Youth Work Synergy (N) · youth work Luxembourg | Youth Work Synergy asbl (N) · asbl logement jeunes Luxembourg |
| projects | youth-led projects Luxembourg · European Solidarity Corps Luxembourg, Erasmus+ KA210 | projets jeunes Luxembourg · Safe Paths Luxembourg (N), Corps européen de solidarité |
| tec | TEC Practices (N), Training and Evaluation Cycle · TEC trainers, mobile learning for adults | conférence TEC Practices (N) · cycle de formation et d'évaluation |
| legal notice, privacy | not targeted: noindex (§ Crawl) | not targeted: noindex |

**Never head terms** [research: audiences-keywords F9]: "GLS" alone (parcels), "agence immobilière sociale" (Belgian
AIS), "TEC conference" or "We Spark" alone, "YWS" alone, bare "Luxembourg" in FR, "Jugendwunnen" (a state scheme:
never imply YWS is part of it). German / Luxembourgish: research notes only (Q3).

## Entity plan

- **One name:** "Youth Work Synergy" in the title suffix, `og:site_name`, `WebSite.name`, `NGO.name` and the logo alt
  (done in the spike [repo: web/src/components/layout/SiteHeader.astro]); "YWS" = `alternateName`; "Youth Work
  Synergy ASBL" = `legalName`, footer ©, legal notice. **One NAP:** the web shows 3 addresses and 3 phones
  [research: audiences-keywords F8]; footer, contact, JSON-LD, Google Business Profile and socials show the office +
  the main phone (Q2, Q12).
- **Third-party proof:** logement.public.lu's GLS partner list links to `https://yws.lu/` [research: comparable-sites
  § 5]: the root keeps answering (`i18n.md` § Root) and the owners page links back to that list.

| `NGO` property | Value | Source |
| --- | --- | --- |
| `@type` | `NGO` (Organization subtype; Google asks for the most specific one) | [research: seo-structured-data § 1.2] |
| `name` · `alternateName` · `legalName` | Youth Work Synergy · YWS · Youth Work Synergy ASBL (registered form: Q1) | [repo: lib/constants.ts, Footer.tsx] |
| `url` | `https://www.yws.lu/` | Q16 [assumption] |
| `logo` | `#logo` → `/logo.png`, 300×200 (≥ 112 px ✓); must read on white; a square version only from the client's original | [file: public/logo.png] |
| `description` | the client's mission line per locale (`ourMissionDescriptionAboutUs`) | [repo: lib/dictionary.tsx] |
| `email` · `telephone` | contact@yws.lu · `+352286622`, `+352661597312` (E.164; which is main: Q2) | [repo: web/src/data/organisation.ts] |
| `address` | two `PostalAddress`: seat 16, rue Pierre Weydert, 5891 Fentange; office 136-138, rue Adolphe Fischer, 1521 Luxembourg; `addressCountry` "LU" (`postalCode` without "L-") | [repo: organisation.ts] |
| `location` | `#office` `Place`: office address + `hasMap` = `office.maps` | [repo: organisation.ts] |
| `contactPoint` | one: email + first phone, `contactType` "customer support"; `availableLanguage` once confirmed (Q2) | [research: seo-structured-data § 1.2] |
| `sameAs` · `areaServed` | `ORGANISATION.socials[].href` (LinkedIn is an `/in/` URL: Q15) · `Country` Luxembourg | [repo: organisation.ts] |
| left out until confirmed | `identifier` (RCS F14106 via North Data: Q1), `foundingDate`, `vatID`; `nonprofitStatus` has no LU value | [research: audiences-keywords F4] |

## JSON-LD graph (`src/lib/schema.ts`; one `<script type="application/ld+json">` per page)

| Page | Nodes |
| --- | --- |
| home (en, fr) | `WebSite` + `NGO` (full) + `WebPage` (`about` → org) |
| about | `AboutPage` (`mainEntity` → org) + `NGO` (full, same `@id`) + `BreadcrumbList` |
| housing, owners, projects, tec | `WebPage` + `BreadcrumbList` |
| privacy policy, legal notice · 404, root | `WebPage` · none |

- **Stable `@id`s:** `https://www.yws.lu/#organization`, `/#website`, `/#logo`, `/#office`; per page
  `<canonical>#webpage`, `#breadcrumb`, `#primaryimage`; built from `organisation.ts` + `routes.ts`, never typed.
- **`WebSite`:** `url` `https://www.yws.lu/`, `name`, `alternateName` `["YWS"]`, `inLanguage` `["en","fr"]`,
  `publisher` → org; identical on both locale homes (the root only redirects) [research: seo-structured-data § 1.3].
  **`WebPage`:** `url` = canonical, `name` = title page part, `description`, `inLanguage`, `isPartOf`, `breadcrumb`;
  `primaryImageOfPage` only for a real photo (never the share card or logo) [research: seo-structured-data § 6.2].
- **`BreadcrumbList`:** "Homepage" / "Page d'accueil" (existing strings) → page, only where the visible breadcrumb
  renders (`structure.md` § Chrome): markup always matches visible text.
- **Not marked up:** FAQPage (rich result gone 2026-05-07), Event (no rich results for LU / FR or French; online-only
  ineligible; the TEC event is past), JobPosting (Jobs retired [user 2026-10-09]), LocalBusiness, HowTo, `meta
  keywords`. No rich result is promised.

## Metadata rules

- **Title** `<page part> | Youth Work Synergy` (the client's 2025 delimiter [repo: lib/dictionary.tsx METADATA]); home
  `Youth Work Synergy | <topic>` (site name first [research: seo-structured-data § 1.3]). ≤ 60 chars, unique across
  pages × locales, native per locale, static. **Description** ≤ 155, factual, from the client's sentences, unique.
- **H1 agreement:** the page part restates the H1's topic; the home H1 is the owners' hero line, so the home title
  names the organisation instead (the one exception).
- **Canonical** absolute, self, per locale, trailing slash; `og:url` = canonical; none on 404 and root.
- **Robots meta:** launch build `index, follow, max-image-preview:large`; legal pages, 404, root `noindex, follow`;
  every page `noindex, follow` in any other build (§ Crawl, Review builds).
- **Open Graph:** `og:type` website · `og:site_name` · `og:title` = title minus suffix (Facebook: no branding) ·
  `og:description` · `og:url` · `og:image` 1200×630 PNG ≤ 300 KB per page × locale (title + description on the site's
  glow + logo tile), drawn locally by `bun run og` into committed `public/og/` (the Vercel build has no browser; the
  gate fails on a stale card [repo: web/scripts/og.mjs]) · `og:image:width/height/type/alt` · `og:locale`
  `en_GB`/`fr_FR` + alternate. **Twitter:** `summary_large_image` only (no X account known).
- **`theme-color`** `#ff6900` [repo: web/src/layouts/BaseLayout.astro] (Discord's embed colour; token in `design.md`).
  `<html lang>` = bare locale. All static at build; nothing is set by client JS.

## Metadata table (all new copy for the client's approval: `placeholders.md` § New copy)

EN descriptions condense the client's sentences (Basis); FR rows are **new French, for review**, built from the same
keys' existing French. Counts include spaces. "90%" follows the client's copy (Q17); tec rows depend on Q8.

| Page | L | Title (chars) | Description (chars) | H1 today | Basis |
| --- | --- | --- | --- | --- | --- |
| home | en | Youth Work Synergy \| Homes for young people in Luxembourg (57) | Youth Work Synergy (YWS) is a Luxembourg non-profit: we rent homes from private owners and offer young people aged 18–34 affordable, stable coliving. (149) | Rent out your property | `whoWeAreDescriptionHomepage`, `heroDescriptionHomepage` |
| home | fr | Youth Work Synergy \| Logements pour jeunes au Luxembourg (56) | ASBL luxembourgeoise, nous louons des maisons à des propriétaires privés pour offrir aux jeunes de 18 à 34 ans des colocations stables et abordables. (149) | Louer votre propriété | same keys |
| housing | en | Youth housing in Luxembourg, ages 18–34 \| Youth Work Synergy (60) | Aged 18–34 and need stable, affordable housing in Luxembourg? Fully furnished rooms in shared homes, with coaching and support. Fill in our quick form. (151) | Looking for housing? | `heroDescriptionLookingForHousing`, `lookingForHousingDescriptionHomepage` |
| housing | fr | Logement jeunes au Luxembourg \| Youth Work Synergy (50) | Vous avez entre 18 et 34 ans et cherchez un logement stable et abordable au Luxembourg ? Chambres meublées en colocation, avec accompagnement. (142) | Vous cherchez un logement ? | same keys |
| owners | en | Rent out your property in Luxembourg \| Youth Work Synergy (57) | Rent your house, apartment or room to Youth Work Synergy: guaranteed rent every month, a 90% tax exemption on net rental income and tenant support. (147) | Rent your property with confidence: safe, reliable & impactful | `heroDescriptionRentYourProperty`, `whyRentToUs*` |
| owners | fr | Gestion locative sociale au Luxembourg \| Youth Work Synergy (59) | Louez votre maison, appartement ou chambre à Youth Work Synergy : loyer garanti chaque mois, exonération fiscale de 90 % sur les revenus locatifs nets. (151) | Louez votre bien en toute confiance : sûr, fiable et utile | same keys; GLS wording from `heroDescriptionAboutUs` |
| about | en | About us: our mission and real impact \| Youth Work Synergy (58) | A Luxembourg non-profit (ASBL) with Gestion Locative Sociale (GLS) status, working with the Ministry of Housing to solve the youth housing crisis. (146) | About us | `heroDescriptionAboutUs`, "Our mission", "Real impact" |
| about | fr | À propos : notre mission, notre impact \| Youth Work Synergy (59) | ASBL luxembourgeoise au statut de Gestion Locative Sociale (GLS), nous travaillons avec le Ministère du Logement contre la crise du logement des jeunes. (152) | À propos de nous | same keys |
| projects | en | We Spark Projects: youth-led projects \| Youth Work Synergy (58) | Youth-led projects we support: a housing workshop, a documentary on the housing crisis, Erasmus+ and European Solidarity Corps projects. (136) | We Spark Projects | "Youth-Led Projects!", project texts |
| projects | fr | Projets menés par des jeunes \| Youth Work Synergy (49) | Projets menés par des jeunes avec YWS : atelier logement, documentaire sur la crise du logement, projets Erasmus+ et du Corps européen de solidarité. (149) | Nous donnons vie à des projets | « Projets menés par des jeunes ! » |
| tec | en | TEC conference: Much More Than a Method \| Youth Work Synergy (60) | The closing conference of V – Comprehensive Guide to Best Practices in Mobile Learning for Adults took place online on 9 April 2026. See tecpractices.eu. (153) | Much More Than a Method | TEC hero [repo: app/TecConference] |
| tec | fr | Conférence TEC : plus qu’une méthode \| Youth Work Synergy (57) | La conférence de clôture du projet V – Comprehensive Guide to Best Practices in Mobile Learning for Adults a eu lieu en ligne le 9 avril 2026. (142) | none (new: « Bien plus qu’une méthode ») | new French |
| privacy | en | Privacy policy \| Youth Work Synergy (35) | How Youth Work Synergy ASBL handles personal data when you visit this website or contact us, and how to exercise your rights under the GDPR. (140) | Privacy policy | new |
| privacy | fr | Politique de confidentialité \| Youth Work Synergy (49) | Comment Youth Work Synergy ASBL traite vos données personnelles lorsque vous visitez ce site ou nous contactez, et comment exercer vos droits (RGPD). (149) | Politique de confidentialité | new |
| legal | en | Legal notice \| Youth Work Synergy (33) | Legal notice of Youth Work Synergy ASBL: registered name and seat, registration number, contact details and the host of this website. (133) | Legal notice | new |
| legal | fr | Mentions légales \| Youth Work Synergy (37) | Mentions légales de Youth Work Synergy ASBL : dénomination, siège, numéro d’immatriculation, coordonnées et hébergeur du site. (126) | Mentions légales | new |
| 404 | both | Page not found · Page introuvable \| Youth Work Synergy (54) | This page does not exist or has moved. Cette page n’existe pas ou a été déplacée. (81) | Page not found · Page introuvable | new |

One typed table (`src/lib/meta.ts`, catalog messages with context) feeds `BaseLayout`, the OG script and `llms.txt`;
a unit test enforces the limits and uniqueness. French spaces before `: ? !` are no-break (`i18n.md` § Formatting).

## Crawl and indexing

- **`robots.txt`** (`src/pages/robots.txt.ts`): `User-agent: *`, `Allow: /`,
  `Sitemap: https://www.yws.lu/sitemap-index.xml`; the same on review builds (a block would hide their `noindex`). AI
  training crawlers: no rule (Q34).
- **Sitemap** (`@astrojs/sitemap`: `/sitemap-index.xml` + `/sitemap-0.xml`): indexable canonical URLs only, 6 route
  ids (home, housing, owners, about, projects, tec) × 2 locales = **12**. Each `<url>` lists `xhtml:link` en, fr,
  x-default from the head's `alternates()` (x-default via `serialize`) and `<image:image><image:loc>` for that page's
  real photos (houses, group photo, projects, Safe Paths posters, TEC banner; `scripts/sitemap-images.mjs` after the
  build, from `data-sitemap-image` elements). `lastmod` = the last commit touching the route's own sources, written to
  `src/data/page-dates.json` by `bun run dates` (Vercel may clone shallow [assumption]), never the build time. No
  `priority` / `changefreq`. To add in `vercel-config.ts`: `/sitemap.xml` → 308 `/sitemap-index.xml` (404 today).
- **Legal pages, decided: both `noindex, follow`, out of the sitemap** (the portfolio's choice, already in the gate
  [repo: web/scripts/launch-gate.mjs `NOINDEX`]): no search intent beyond "brand + mentions légales", which the home
  result answers; linked from every footer, never blocked in `robots.txt`; same rule in both locales.
- **Review builds:** a launch build is `VERCEL_ENV=production`, `IS_FULL_PRODUCTION=true` or `--launch`; any other
  build (local, branch preview) is noindex, uses its own host as origin (`VERCEL_URL`, so preview cards work), builds
  the specimen page and runs the gate in review mode [repo: web/scripts/launch.mjs]. A production build with a
  `PLACEHOLDER` fails and Vercel keeps the previous deployment live. This also covers Vercel dropping its preview
  `X-Robots-Tag` on custom branch domains [research: seo-structured-data § 3].
- **Host:** canonical `https://www.yws.lu` (Q16 [assumption]); apex → www 308 lives in Vercel → Domains (live [web:
  curl https://yws.lu 2026-10-09]); no host rule in `vercel.json` (a second host rule looped assets in the portfolio).
- **Status codes:** the 404 is a real 404, noindex; unknown URLs never redirect home (soft 404); legacy 308s take one
  hop (`structure.md` § Redirects).

## Feeds, favicons, llms.txt, humans.txt

- **RSS: none.** Nothing dated and list-shaped exists: 7 projects with activity periods but no publication dates, one
  past event, Jobs retired. Revisit if YWS publishes news or offers.
- **Favicons:** `app/favicon.ico` (16/32/48/256 frames) is the **Next.js default triangle**, not YWS's icon; the
  2025 site linked `/favicon.png` (32 px black "y") while Next also served the triangle at `/favicon.ico` [file:
  app/favicon.ico, app/layout.tsx]. The new site: `/favicon.ico` (16 + 32 px PNG frames) and `/favicon.png` (32 px),
  both from the client's 32 px icon by `scripts/favicons.mjs`, never upscaled. Google wants ≥ 48 px: the 48 px frame,
  `/apple-touch-icon.png` 180, `/icon-192.png` and `/site.webmanifest` wait for a master (Q33).
- **`/llms.txt`** (`src/pages/llms.txt.ts`): `# Youth Work Synergy`, the who-we-are line as blockquote, `## Pages` and
  `## Pages (français)` (title + description), `## Contact` from `organisation.ts`. Google ignores it; Lighthouse
  13.5 checks it [research: seo-structured-data § 7].
- **`/humans.txt`:** TEAM = Youth Work Synergy ASBL + contact; THANKS = the CC BY model authors as in the credits
  dialog [repo: lib/dictionary.tsx]; SITE = languages, Astro, Lingui, three.js, last update. **No developer name until Q4.**

## Verification and IndexNow

- **Search Console:** Domain property via DNS TXT (§ Launch 5). Optional metas on every page, only when set:
  `GOOGLE_SITE_VERIFICATION` → `google-site-verification`, `BING_SITE_VERIFICATION` → `msvalidate.01` (names in
  `.env.example`, values only in Vercel). **`/ms32821332.txt`** (Microsoft 365 domain-ownership file for `yws.lu`
  [file: public/ms32821332.txt]) is copied byte for byte (it starts with a UTF-8 BOM) into the Astro `public/`.
- **IndexNow:** key = 32 hex chars from `crypto.randomUUID()` minus dashes, made once by `bun run indexnow:key` (never
  typed), in `public/<key>.txt`, committed (public by design) [research: seo-structured-data § 4.3]. `bun run indexnow`
  (`scripts/indexnow.mjs`) POSTs `{host, key, keyLocation, urlList}` to `https://api.indexnow.org/indexnow`: by default
  the built sitemap URLs the live sitemap lacks (per-URL `lastmod` comes with `page-dates.json`), `--all` at launch; refuses unless the key file
  answers 200 on www; 200/202 pass, 403/422 fail. Reaches Bing and the other participants, not Google.

## Launch/SEO gate (`web/scripts/launch-gate.mjs`, after every `astro build`; strict in a launch build)

1. Every page: one `<title>`, description, canonical (404, root exempt), `<html lang>` = locale, one `<h1>`.
2. Titles target ≤ 60 (warning), cap 65; descriptions target ≤ 155, cap 160 [repo: launch-gate.mjs]; all unique.
3. One origin (`https://www.yws.lu` in a launch build) across canonical, hreflang, `og:url`, `og:image`, JSON-LD, sitemap.
4. hreflang en + fr + x-default on every indexable page, reciprocal, each target built and self-canonical.
5. JSON-LD parses; `@id`s from the fixed set; `WebSite` only on homes; `BreadcrumbList` only with a visible breadcrumb.
6. Each indexable page × locale has a current share card (1200×630, ≤ 300 KB) and `og:image:alt`.
7. Internal links and `#anchors` resolve; every new-tab link carries the hidden "(opens in a new tab)".
8. Robots values per § Crawl; the sitemap is exactly the indexable set, with alternates and a real `lastmod`.
9. Launch build: no `PLACEHOLDER`, no empty verification meta, no `meta keywords`. Every build: no `<form>` [user
   2026-10-09], no raster image outside WebP/AVIF (favicons and share cards aside).
10. Files: `robots.txt`, `sitemap-index.xml`, `llms.txt`, `humans.txt` (no developer name while Q4 is open),
    `favicon.ico` with a 48 px frame, `apple-touch-icon.png`, byte-identical `ms32821332.txt`, the IndexNow key.
11. `vercel.json` current (`--check` in `build`); every legacy source lands on a built page in one hop
    (`routes.test.ts`; curl checks on the preview in e2e).

## Launch (owner runbook, in order; Claude does none of it)

0. **Ready:** every gate green on the latest branch preview of `revamp/2026-10` [user 2026-10-09]; the client approved
   the new copy; no open `PLACEHOLDER` in `placeholders.md`.
1. **Merge:** nothing to change in Vercel first: the repo-root `vercel.json` (generated by
   `web/scripts/vercel-config.ts`) sets framework `astro`, install `cd web && bun install --frozen-lockfile`, build
   `cd web && bun run build`, output `web/dist`, so the project keeps Root Directory `.` [repo: vercel.json]. Check on
   the branch preview that it built the Astro site (Deployments → the preview → Build Logs shows `astro build`). Then
   GitHub → Pull requests → `revamp/2026-10` → `main` → Merge (the release Action runs on `main` [repo:
   .github/workflows/release.yml]).
2. **Primary domain:** Vercel → Settings → **Domains**: `www.yws.lu` on Production, no redirect; `yws.lu` →
   **Redirect to `www.yws.lu`**, 308 (Q16). Check `curl -sI https://yws.lu/en/` → 308 to www.
3. **Env flags:** Vercel → Settings → **Environment Variables**. Nothing is required: a Production deploy is a launch
   build by itself (`VERCEL_ENV=production` [repo: web/scripts/launch.mjs]); `IS_FULL_PRODUCTION` = `true` is only for
   a launch build elsewhere and must never be set on Preview. Optional, Production only: `GOOGLE_SITE_VERIFICATION`,
   `BING_SITE_VERIFICATION` (only for a meta method). Leave `PUBLIC_SITE_URL` unset (a launch uses `https://www.yws.lu`).
4. **Deploy:** the merge builds Production; after an env change, Deployments → latest Production → ⋯ → **Redeploy**.
   Smoke checks (Git Bash: `MSYS_NO_PATHCONV=1`): `curl -sI https://www.yws.lu/` → 307 `/en/`; with
   `-H "Accept-Language: fr-LU,fr;q=0.9"` → 307 `/fr/`; `/en/` robots meta = `index, follow, max-image-preview:large`;
   `/AboutUs`, `/LookingForHousing`, `/Jobs` → one 308 each; `/robots.txt`, `/sitemap-index.xml`, `/ms32821332.txt`,
   `/<key>.txt` → 200, no redirect; the `*.vercel.app` production URL: note whether it sends `X-Robots-Tag: noindex`.
5. **Search Console:** search.google.com/search-console → property menu → **Add property** → **Domain** →
   `yws.lu` → copy the TXT value (`google-site-verification=…`). DNS host: `nslookup -type=NS yws.lu` (Vercel
   nameservers → Vercel → Domains → `yws.lu` → DNS Records; otherwise the registrar's DNS panel). Add: Type **TXT**,
   Name/Host `@` or blank (the apex, as the panel calls it), Value = the copied string, default TTL; edit or delete no
   existing TXT record. GSC → **Verify** (minutes to days). Keep the record forever.
6. **Sitemap:** GSC → Indexing → **Sitemaps** → `sitemap-index.xml` → Submit → expect Success, 12 URLs.
7. **URL Inspection** (GSC top bar) → each URL → **Test live URL** (canonical, robots, indexable) → **Request
   indexing**. Day 1: `/en/`, `/fr/`, `/en/youth-housing/`, `/fr/logement-jeunes/`, `/en/rent-your-property/`,
   `/fr/louer-son-bien/`; day 2: about, projects and tec in both locales (daily quota). Inspect
   `https://www.yws.lu/AboutUs` once: it should report the redirect.
8. **Bing:** bing.com/webmasters → sign in → **Import** from Google Search Console → allow → select `yws.lu` →
   Import (site + submitted sitemaps). Fallback: Add site → meta tag → `BING_SITE_VERIFICATION` → redeploy → Verify.
9. **IndexNow:** `cd web && bun run indexnow --all` → 200 or 202 (key file `web/public/247b545c08794fcfaa356693c094db59.txt`, committed). After later deploys: `bun run indexnow`.
10. **Google Business Profile (Q12):** business.google.com → find "Youth Work Synergy"; if it exists, set name, the
    office address exactly as in the footer, the main phone (Q2) and website `https://www.yws.lu/` (Info → edit); if
    not, a profile needs a staffed office with signage [research: seo-structured-data § 5]: the client decides. Same
    NAP check on Facebook, Instagram, LinkedIn, the CRIJE guide and the EU Youth Portal.
11. **Re-check:** pagespeed.web.dev on `/en/`, `/fr/`, `/en/youth-housing/`, `/en/rent-your-property/`, mobile +
    desktop, into `memory/run-notes.md` (field data likely "no data"); Rich Results Test + validator.schema.org on
    `/en/`, `/fr/`, `/en/about-us/`; paste `https://www.yws.lu/en/` into Discord to see the card.
12. **After 1–2 weeks:** GSC → Pages (indexed per locale; PascalCase URLs under "Page with redirect" is expected),
    Sitemaps, Breadcrumbs, Performance by page and query; the result's site name reads "Youth Work Synergy".
13. **Optional (Q13; `technologies.md` § Supabase):** Vercel → Settings → Git → **Deploy Hooks** → one for `main`;
    Supabase → Database → **Webhooks** → on `statistics` update, POST that hook URL.
