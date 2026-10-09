# SEO, structured data, multilingual and link previews for yws.lu (research, 2026-10-09)

Scope: Youth Work Synergy ASBL, bilingual en + fr, Luxembourg. Revamp target per `revamp-plan.md`: Astro 7 + Lingui on Vercel, locale-prefixed URLs. Live site today: Next.js 15 on Vercel.
Conventions: every source was checked on **2026-10-09**. "upd." = the page's own "Last updated" stamp. Tags: **(official)** vendor docs, **(3rd)** third-party write-up, **(inf)** my inference, **(live)** curl against www.yws.lu on 2026-10-09. Source IDs like [G3] resolve in the Sources table at the end.

## 0. Build / skip at a glance

| Build | Skip / don't bother |
|---|---|
| `NGO` (Organization subtype) JSON-LD on home (both locales) or about page: name, alternateName, legalName, url, logo >=112 px, address, email, telephone, contactPoint, sameAs [G3] | FAQPage: rich result gone since 2026-05-07 [G2] |
| `WebSite` JSON-LD (name, alternateName, url) on the home page(s) for site names [G4] | HowTo (gone 2023), Sitelinks search box (gone 2024-11-21), ClaimReview, Estimated salary, Course info, Learning video, Special announcement, Vehicle listing, Practice problem [G2][G11][G13] |
| BreadcrumbList on inner pages (desktop-only display since 2025-01-22) [G5][G6] | Event rich results: not offered in LU/FR/BE, online-only and invite-only events ineligible [G7] |
| hreflang `en`, `fr`, `x-default` (self-referencing, reciprocal, absolute) + self-canonical per locale [G17][G21] | `nonprofitStatus`: no Luxembourg value in schema.org, not used by Google [SO2][SO3][G3] |
| `/` = 302/307 Accept-Language redirect only at root, x-default = `https://www.yws.lu/` [G20][G23] | `priority` / `changefreq` in sitemaps (ignored) [G24]; sitemap "ping" (404 since 2023) [G26] |
| robots.txt with `Sitemap:` line; sitemap index; real `lastmod` [G24][G27] | Image sitemap extras `image:caption/title/geo_location/license` (deprecated) [G25] |
| Search Console Domain property (DNS TXT at apex) + Bing import from GSC + optional IndexNow [SC1][B1][IN2] | IndexNow for Google (Google does not participate) [IN3][IN4] |
| OG + Twitter tags per locale, 1200x630 image, <=300 KB, absolute https, og:image:alt [FB2][WA1][X1] | LocalBusiness markup (no GBP-grade benefit for an NGO; Organization covers address) (inf) [G3][G14] |
| PNG/ICO favicon >48 px square, stable URL (SVG is not on Google's list) [G34] | Expecting llms.txt or structured data to help Google AI features [G37] |
| Google Business Profile for the staffed office, if it has signage and receives visitors [GBP1] | Indexing API (JobPosting/BroadcastEvent only and now needs approval) [G9] |

## 1. Structured data

### 1.1 What Google Search still shows (gallery upd. 2026-06-15) [G1]
Article, Breadcrumb, Carousel (with Recipe/Course/Restaurant/Movie), Course list, Dataset (Dataset Search only, per 2025-11-05 changelog [G2]), Discussion forum, Education Q&A, Employer aggregate rating, Event, Image metadata, Job posting, Local business, Math solver, Movie, Organization, Product, Profile page, Q&A, Recipe, Review snippet, Software app, Speakable, Subscription/paywalled, Vacation rental, Video. FAQ is absent (removed 2026-06-15) [G1][G2].

Relevant to yws.lu: Organization, WebSite (site names, not in the gallery but documented [G4]), Breadcrumb, maybe JobPosting. Event and Q&A/Profile page do not fit (see below).

General rules [G15][G16]: JSON-LD recommended; markup must describe visible content; all required props needed for eligibility; "the more recommended properties... the higher quality". AI features: "Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add" [G37].

### 1.2 Organization (and `NGO`) [G3] (upd. 2026-09-08)
| Item | Google says | Note for yws.lu |
|---|---|---|
| Required props | "There are no required properties" | add all that apply |
| Subtype | "We recommend using the most specific schema.org subtype of Organization" (examples: OnlineStore, LocalBusiness subtypes). NGO not named. | `NGO` is a direct schema.org subtype (Thing > Organization > NGO) [SO1]; using it is consistent with the rule (inf) |
| Placement | "home page, or a single page that describes your organization, for example the about us page. You don't need to include it on every page" | put on both locale home pages with the same `@id` (inf) |
| logo | "must be 112x112px, at minimum"; crawlable + indexable URL; Google Images format (BMP, GIF, JPEG, PNG, WebP, SVG, AVIF [G35]); "looks how you intend it to look on a purely white background" | current `/logo.png` should be checked on white |
| sameAs | URLs of profiles on other sites, multiple allowed | live footer links: Facebook `profile.php?id=61557997643374`, Instagram `yws.lu`, LinkedIn `/in/ywslu/` (a personal-profile URL type, not `/company/`) (live) |
| address | PostalAddress (streetAddress, addressLocality, addressRegion, postalCode, addressCountry) | live footer has two: office 136-138 rue Adolphe Fischer, L-1521 Luxembourg; seat/postal 16 rue Pierre Weydert, L-5891 Fentange (live). Pick one public NAP (office if staffed) (inf) |
| contactPoint | best contact methods with telephone + email | add schema.org `availableLanguage: ["en","fr"]` (inf) |
| legalName, alternateName, description, email, telephone (with country code), foundingDate, taxID, vatID, iso6523Code, duns, numberOfEmployees, globalLocationNumber | all listed as recommended | telephone in E.164-ish form: the live `tel:286622 • 661597312` link is not dialable (live) |
| nonprofitStatus | not in Google's list | schema.org range NonprofitType has only DE/IT/NL/UK/US enumerations (V30.1, 2026-09-16) [SO2][SO3]: no LU value, skip |
| areaServed | not in Google's list | harmless schema.org property; no Google feature (inf) |

Minimal shape (values from live footer, confirm with client):
```json
{"@context":"https://schema.org","@type":"NGO","@id":"https://www.yws.lu/#org",
 "name":"Youth Work Synergy","alternateName":"YWS","legalName":"Youth Work Synergy ASBL",
 "url":"https://www.yws.lu/","logo":"https://www.yws.lu/logo-512.png","email":"contact@yws.lu",
 "telephone":"+352 28 66 22",
 "address":{"@type":"PostalAddress","streetAddress":"136-138 rue Adolphe Fischer","postalCode":"1521","addressLocality":"Luxembourg","addressCountry":"LU"},
 "contactPoint":{"@type":"ContactPoint","contactType":"customer support","email":"contact@yws.lu","telephone":"+352 28 66 22","availableLanguage":["en","fr"]},
 "sameAs":["https://www.facebook.com/profile.php?id=61557997643374","https://www.instagram.com/yws.lu/"]}
```

### 1.3 WebSite + site names [G4] (upd. 2025-12-10)
- Required: `name`, `url` ("canonical home page of your site's domain or subdomain"). Recommended: `alternateName` (ordered list, example has 3; no max stated).
- "The WebSite structured data must be on the home page of the site... the domain or subdomain level root URI." Subdirectories (`example.com/news`) are not supported. Available "in all languages... on both mobile and desktop".
- Sources Google weighs besides markup: "`og:site_name`, `<title>`, heading elements, and other text on a home page". "Use your site name consistently across your home page."
- Duplicates: "make sure that you're using the same structured data on all page duplicates" (http/https, www/non-www).
- Guidelines: unique, concise, commonly recognized, not generic. Recrawl takes "several days to several weeks".
- yws.lu (inf): `/` redirects to `/en/` or `/fr/`, so put identical WebSite JSON-LD (`url: "https://www.yws.lu/"`, `name: "Youth Work Synergy"`, `alternateName: ["YWS","Youth Work Synergy ASBL"]`) on both locale home pages; `og:site_name` = same `name` in both locales; home `<title>` starts with the same name. The site name is per host, one for both languages.
- Title-link interplay: for domain-level site names "Google may omit the site name from the title link, if it's repetitive" [G32].

### 1.4 BreadcrumbList [G5] (upd. 2026-09-08), [G6]
- "This feature is available on desktop in all regions and languages". Since 2025-01-22 Google "no longer show[s] breadcrumbs on mobile search results"; mobile shows domain only; markup still supported, Search Console report continues [G6].
- Required: `itemListElement` (ListItem), `position`, `name`, `item` (last item may omit `item`; Google uses the page URL).
- Worth it only on 2-level pages (inf); localize `name` per locale, `item` URLs within the same locale.

### 1.5 Event [G7] (upd. 2026-09-08)
- Region/language availability: Australia (en), Brazil (pt), Canada (en), Germany (de), India (en), Latin America (es), Spain (es), UK (en), US (en). **No Luxembourg, France, Belgium, no French.**
- Changed 2025-06-05: "removed the online event properties"; "events must be bookable by the general public and held at a physical location" [G2]. Page: "Virtual experiences that have no real-world component aren't supported." `eventAttendanceMode`/`VirtualLocation` are no longer documented (still valid schema.org).
- Ineligible: membership- or invitation-required events, school-premises student events, non-events, business hours, coupons. Erasmus+-style youth exchanges that need an application are likely ineligible (inf).
- Required: `name`, `startDate` (ISO 8601 with offset), `location.name` + `location.address`. Recommended: description, endDate, eventStatus (Scheduled/Cancelled/Postponed/Rescheduled), image (>=720 px wide, 50K px total, 16:9/4:3/1:1), offers, organizer, performer, previousStartDate. One event per leaf URL; listing pages not supported.
- Past events: the page says nothing; nothing to gain from markup on past events (inf).
- Verdict: optional at best for TEC conference (an external site today: nav links to tecpractices.eu) (live).

### 1.6 JobPosting [G8] (upd. 2026-09-08), [G9]
- Required: `datePosted`, `description` (HTML), `hiringOrganization`, `jobLocation` (addressCountry required) or remote setup, `title`. Recommended: `validThrough` ("required for job postings that have an expiration date"; omit if none), `employmentType` (incl. `VOLUNTEER`, `INTERN`), `baseSalary`, `identifier`, `applicantLocationRequirements` + `jobLocationType: TELECOMMUTE` for remote, `directApply`.
- Region list (Europe): Austria, Belarus, Belgium, Denmark, France, Germany, Greece, Italy, Netherlands, Portugal, Russia, Spain, Switzerland, UK. **Luxembourg not listed**; FR/BE/DE are, so cross-border searchers may see LU jobs (inf).
- Closed offers: "must be expired" by `validThrough` in the past, or 404/410, or removing the markup; "Failure to take timely action on expired jobs may result in a manual action". "We don't allow job postings that don't have a way to apply." Sitemap recrawl uses `lastmod`.
- Indexing API: "can only be used to crawl pages with either JobPosting or BroadcastEvent"; default 200 quota "and it requires additional approval" [G9]. Not worth it for a handful of offers (inf).

### 1.7 FAQPage
- 2023-08: restricted to "well-known, authoritative government and health websites"; 2026-05-08 changelog: "This feature will no longer appear in Google Search starting May 7, 2026"; 2026-06-15: docs removed; the old doc URL now redirects to `/search/updates#removing-faq-rich-result` [G2][G10]. Skip; visible FAQ content is still fine.

### 1.8 WebPage / AboutPage / ContactPage
- No rich result; not in the gallery [G1]. Fine to use as page type with `inLanguage`, `isPartOf: {"@id": "#website"}`, `about/mainEntity: {"@id": "#org"}` (inf). `primaryImageOfPage` on WebPage is one of the documented ways to suggest the preferred thumbnail image (added 2026-03-02) [G35][G2].

### 1.9 LocalBusiness vs Organization for an NGO with an office
- Google: LocalBusiness for "a local business, for example a restaurant or a physical store" [G3]; LocalBusiness doc is about knowledge panel / carousel details like hours and departments [G14] (upd. 2026-09-08).
- An NGO knowledge panel / Maps listing is driven by Google Business Profile, not markup (inf). Recommendation: `NGO` with `address` (+ optional `location`), no LocalBusiness. Revisit only if the office has public opening hours and a GBP.

### 1.10 Deprecated / retired types to avoid (verified)
| Type | Status | Source |
|---|---|---|
| HowTo | removed from Search, docs removed 2023-09 (old URL redirects to `#how-to-deprecation`) | [G2] |
| Sitelinks search box | visual removed from 2024-11-21; WebSite markup itself still supported | [G13] |
| Book Actions, Course Info, ClaimReview, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing | phase-out announced 2025-06-12; removed from SC/Rich Results Test 2025-09-09; Book Actions banner removed again 2025-11-05 ("there's still a feature using the markup") | [G11][G2] |
| Practice problem | deprecated 2025-11-05, docs removed 2026-01-06 | [G2][G12] |
| Dataset | only Dataset Search, not Google Search (2025-11-05) | [G2] |
| FAQ | gone 2026-05-07, docs removed 2026-06-15 | [G2] |
| Event online properties | removed from docs 2025-06-05 | [G2] |
| Image sitemap `image:caption`, `image:geo_location`, `image:title`, `image:license` | removed from docs | [G25] |

### 1.11 Validation
- Rich Results Test: "You can test an arbitrary code snippet... choose Code instead of URL"; default UA smartphone; tests only Google rich result types [SC5]. Reachable at search.google.com/test/rich-results (live).
- Schema Markup Validator validator.schema.org (generic schema.org; URL or code) reachable (live). Use it for `NGO`, `WebSite`, `WebPage`, which RRT may not surface.

## 2. Multilingual

| Topic | Rule | Source |
|---|---|---|
| Separate URLs | "Google recommends using different URLs for each language version... rather than using cookies or browser settings" | [G18] (upd. 2025-12-10) |
| Methods | HTML `<link>`, HTTP `Link:` header, sitemap `xhtml:link` are "equivalent"; using all three gives "no benefit" and is harder to manage | [G17] (upd. 2026-09-21) |
| Self-reference | "Each language version must list itself as well as all other language versions." | [G17] |
| Reciprocity | "If two pages don't both point to each other, the tags will be ignored." | [G17] |
| Absolute URLs | "must be fully-qualified, including the transport method" | [G17] |
| Placement | inside a well-formed `<head>`; don't combine hreflang with `media` etc. in one `<link>` | [G17] |
| Codes | ISO 639-1 language + optional ISO 3166-1 alpha-2 region; codes outside those (e.g. `es-419`) "aren't supported"; case-insensitive; region alone invalid | [G17] |
| x-default | fallback "especially on language/country selectors or auto-redirecting home pages" | [G17][G20] |
| Language detection | "Google doesn't use hreflang or the HTML lang attribute to detect the language of a page"; uses visible content; avoid side-by-side translations | [G17][G18] |
| Canonical | "specify a canonical page in the same language"; `rel=canonical` with hreflang/lang attributes is ignored for canonicalization | [G21] (upd. 2026-07-10) |
| Redirects between languages | "Avoid automatically redirecting users from one language version of a site to a different language version" | [G18] |
| Googlebot | crawls mostly from US IPs and "sends HTTP requests without setting Accept-Language" | [G19][G18] |
| Robots per locale | robots meta and robots.txt "must specify the same rules in each locale" | [G19] |
| Geo meta | Google ignores `geo.position`, `distribution` etc. | [G18] |

Recommended setup for yws.lu (inf, built on the rules above):
- URLs: `https://www.yws.lu/en/...`, `https://www.yws.lu/fr/...` (slugs per `revamp-plan.md`: `/en/youth-housing/` vs `/fr/logement-jeunes/`).
- hreflang values `en` and `fr` (language only, so French speakers in FR/BE/LU all match; `fr-LU` would target only Luxembourg), plus `x-default` -> `https://www.yws.lu/`. Same set on every locale version.
- `/` root: 302 or 307 based on `Accept-Language` (Google's 2014 guidance says "server-side 302 redirects"; 307 "Equivalent to 302") [G20][G23]. Not 301/308: a permanent redirect makes Google treat the target as canonical and lets browsers cache one language for everyone [G22]. Add `Vary: Accept-Language` for CDN correctness (HTTP caching, not a Google rule). Googlebot (no header) gets the default locale. Put the x-default hreflang set on the locale home pages (the root itself returns only a redirect).
- No redirect at `/en/*` or `/fr/*`. Visible language switcher linking to the equivalent page.
- `<html lang="en">` / `<html lang="fr">`: not used by Google but required for accessibility (WCAG 2.2 SC 3.1.1 [W4]); live site is `lang="en"` on all pages today (live).
- `og:locale` per page in ogp.me `language_TERRITORY` form, `og:locale:alternate` = the other locale [OG1]. `fr_LU`/`en_GB` are syntactically valid; Facebook's own supported-locale list was not checked (FB1 only says "Defaults to en_US"), so `fr_FR` + `en_GB` is the safe pair (inf).
- Self-canonical on every locale page; never canonical `/fr/x` -> `/en/x`.
- Astro note: `@astrojs/sitemap` `i18n` option emits `xhtml:link` alternates [A1]; confirm self-entry and add `x-default` via `serialize` if absent (unverified). Next.js note (current stack): the official localized-sitemap example lists only the other locales, so the self-entry must be added manually [N1].

## 3. Crawl and indexing

| Topic | Fact | Source |
|---|---|---|
| robots.txt purpose | controls crawling; "not a mechanism for keeping a web page out of Google"; use noindex | [G27] (upd. 2025-12-10) |
| robots.txt missing | 4xx (except 429) treated "as if a valid robots.txt file didn't exist", i.e. no restrictions; 500 KiB limit; cached up to 24 h | [G28b] (upd. 2026-08-31) |
| Sitemap directive | `Sitemap: https://...` anywhere in robots.txt, multiple allowed, no limit | [G24] (upd. 2026-07-08) |
| Sitemap limits | 50 MB uncompressed / 50,000 URLs per file; UTF-8; absolute URLs; index file for more | [G24] |
| lastmod | used only if "consistently and verifiably... accurate"; reflect "significant update" (main content, structured data, links), not a copyright-year change | [G24] |
| priority / changefreq | "Google ignores" them | [G24] |
| Ping endpoint | deprecated 2023, requests return 404 ("deprecation is complete") | [G26] |
| hreflang in sitemap | `xmlns:xhtml`, one `<url>` per URL, each lists all alternates incl. itself; child links don't count toward URL limit | [G17] |
| Image sitemaps | still supported: `image:image` (<=1,000 per `<url>`) + `image:loc` only | [G25] (upd. 2025-12-10) |
| noindex | robots meta or `X-Robots-Tag`; since 2026-03-24 Google also respects robots meta in `<body>` | [G28] (upd. 2026-03-24) |
| JS + noindex | 200 pages go to rendering "unless a robots meta tag or header tells Google not to index"; non-200 pages: "rendering might be skipped"; don't rely on JS to remove a noindex | [G29] (upd. 2026-03-04) |
| Redirect types | 301 and 308 = permanent ("strong signal"); 302/303/307 = temporary ("weak signal"); 308 "Equivalent to 301", 307 "Equivalent to 302"; pick the semantically right one for other clients | [G23] (upd. 2026-02-04), [G22] |
| Redirect hops | Googlebot "follows up to 10 redirect hops"; Inspection tools don't follow redirects | [G23] |
| Soft 404 | 2xx with error/empty content is reported as soft 404 | [G23] |
| 4xx | 404/410 drop URLs from the index; newly found 404s not processed | [G23] |
| Trailing slash | Google treats slash/non-slash as separate URLs; pick one, redirect the other (or leave both 200 with same content); the root `/` is the same either way | [G30] |
| Case | "URLs are case sensitive" | [G31] (upd. 2025-12-10) |
| Preview deployments | Vercel adds `X-Robots-Tag: noindex` to every Preview Deployment and to outdated production deployments, but **omits it when a custom domain is assigned to a non-production branch** | [V1] (upd. 2026-10-02) |

yws.lu specifics:
- Live: `https://yws.lu/` -> 308 -> `https://www.yws.lu/` (good, one hop); `/robots.txt` 404, `/sitemap.xml` 404, `/llms.txt` 404, unknown paths return a real 404 with `noindex` (live).
- Old URLs are PascalCase and currently 200: `/AboutUs`, `/Jobs`, `/LookingForHousing`, `/RentYourProperty`, `/WeSparkProjects`, `/TecConference`; lowercase `/aboutus` is 404 (live). Map each old URL to its new locale URL with one permanent hop (308 or 301), e.g. `/AboutUs` -> `/en/about-us/` (inf).
- Astro: static `astro build` writes redirects as `<meta http-equiv="refresh">` pages unless an adapter writes host config; default object-syntax status 301 [A2]. Use the Vercel adapter or `vercel.json` so redirects are real HTTP 3xx (inf). Next.js (current): `permanent: true` = 308, `false` = 307 [N2].
- Keep trailing-slash policy identical in canonical, hreflang, sitemap, internal links and OG `og:url` (inf).
- Custom 404: real 404 status, both languages, links to both home pages; static HTML (non-200 may not be rendered) [G29]; never redirect unknown URLs to home (soft 404) (inf).
- Check `*.vercel.app` production alias with `curl -I`: the KB only promises noindex for previews and outdated deployments (inf).

## 4. Search Console, Bing, IndexNow

### 4.1 Google Search Console [SC1][SC2][SC3][SC4]
Domain property (covers "all subdomains (m, www, and so on) and multiple protocols") [SC2]:
1. Search Console > Add property > **Domain** > enter `yws.lu`.
2. Copy the TXT value `google-site-verification=...`.
3. At the DNS host for `yws.lu`: new record type **TXT**, Host/Name "either leave this blank, or set as '@'" (apex), Value = the string.
4. Verify. "It can take a few minutes or even days"; "don't remove the DNS record... even after verification succeeds". CNAME variant exists for some providers [SC1].
URL-prefix alternatives (not valid for Domain properties): HTML file (upload unmodified, no auth), meta tag `<meta name="google-site-verification" content="..." />` "within the `<head>`" of "the non-logged-in homepage", Google Analytics (`<head>` tag), Tag Manager [SC1].
Sitemaps report: owner permission; submit the sitemap or sitemap index URL; statuses Success / Couldn't fetch / Has errors; "The report shows only sitemaps that were submitted using this report or the API" [SC3].
URL Inspection: indexed version vs live test; Request indexing has "a daily limit"; for many pages submit a sitemap [SC4].
New: Search Console has a "Generative AI performance report" [G37]; AI Mode data counts toward Performance totals since 2025-06-16 [G2].

### 4.2 Bing Webmaster Tools [B1]
- Import from GSC: "We will only import the list of your verified sites"; "We will also import sitemaps submitted on Google Search Console, but we will not be importing any site analytics related data"; needs view-only GSC access, used "to periodically validate your verification status and update sitemaps" [B1]. Fastest route once GSC is verified.
- Manual: Domain Connect auto-CNAME (partner DNS hosts only); `BingSiteAuth.xml` "to the root directory"; meta tag pasted "at the end of the `<head>` section" of the default page; manual CNAME [B1]. Tag format `<meta name="msvalidate.01" content="..."/>` (3rd) [B2].
- Bing language signals: Bing's guideline pages are JS-only and could not be read; 3rd-party sources say Bing leans on `content-language`/`lang` more than hreflang (3rd, unverified) [B3]. Correct `lang` covers it either way.
- Unrelated but present: `public/ms32821332.txt` is a Microsoft 365 domain-ownership file served live (200); `web/public/` does not contain it yet (live). Carry it over if M365 still relies on it.

### 4.3 IndexNow [IN1][IN2][IN3]
- Key: 8-128 chars, `a-z A-Z 0-9 -` (documentation also says "hexadecimal"; a dash-less UUID satisfies both) [IN1][IN2].
- Key file: UTF-8 text file containing only the key at `https://www.yws.lu/{key}.txt`, or elsewhere with `keyLocation` (a non-root file only authorizes URLs under its path) [IN1][IN2].
- Single URL: `GET https://api.indexnow.org/indexnow?url={url-encoded}&key={key}` [IN2].
- Bulk: `POST https://api.indexnow.org/indexnow`, `Content-Type: application/json; charset=utf-8`, body `{"host":"www.yws.lu","key":"...","keyLocation":"https://www.yws.lu/{key}.txt","urlList":[...]}`, max 10,000 URLs [IN1][IN2].
- Responses: 200 OK, 202 Accepted (key pending), 400, 403 (bad key), 422 (URL/host mismatch), 429 [IN1][IN2].
- Sharing: "submitted URLs will be automatically shared with all other participating search engines" [IN1]. Participants in `searchengines.json`: Bing, Yandex, Seznam, Naver, Yep, Internet Archive, Amazonbot [IN3]. Google is not listed; 3rd-party: no Google adoption as of 2026 [IN4]. Submit changed/added/deleted URLs, not the whole site repeatedly [IN2].
- Verdict: optional, cheap post-deploy step for Bing/Copilot reach (inf).

## 5. Local SEO for a Luxembourg non-profit

- Google Business Profile eligibility (current guideline text) [GBP1]: real-world location; "virtual office... isn't eligible"; co-working offices only with "clear signage", receiving "customers at the location during business hours", and "staffed during business hours"; "P.O. boxes... aren't acceptable"; "Businesses showing their address on Google should maintain permanent fixed signage"; service-area businesses "should hide your business address"; departments of organisations may get separate profiles. No exclusion of non-profits. The older sentence "must make in-person contact with customers during its stated hours" is no longer on the page (searched 2026-10-09).
- yws.lu (inf): candidate = the Luxembourg-city office (136-138 rue Adolphe Fischer) if staffed with signage; the Fentange seat is "postal address" per the live footer, so not a GBP location.
- NAP: "Represent your business as it's consistently represented and recognized in the real world across signage, stationery, and other branding" [GBP1]. Use one name ("Youth Work Synergy" / legal "Youth Work Synergy ASBL"), one public address, one phone format everywhere: footer, JSON-LD, GBP, Facebook, LinkedIn, directories (inf).
- `areaServed`: schema.org property on Organization/ContactPoint/Service; no Google feature (inf); `{"@type":"Country","name":"Luxembourg"}` is enough.
- Google for Nonprofits: Luxembourg is an eligible country; verification via Goodstack [GNP].
- Luxembourg-relevant listings (citations/backlinks):

| Listing | What | Source |
|---|---|---|
| benevolat.lu directory | Agence du Bénévolat a.s.b.l. directory, 579 associations listed; orgs can publish volunteer missions | [LU1] |
| lbr.lu (RCS) | official register where ASBLs are filed; confirm RCS number there | [LU2] |
| myasbl.public.lu | Ministry of Justice portal for ASBLs/foundations (info, not a directory) | [LU3] |
| European Youth Portal | "List of accredited organisations" (European Solidarity Corps), filter by country | [LU4] |
| ANEFORE | Luxembourg Erasmus+ / ESC national agency (site reachable) | [LU5] |
| SNJ | Service national de la jeunesse (site reachable) | [LU6] |
| Editus.lu | POST-group business directory, still active in 2026 (3rd); not reachable from this sandbox | [LU7] |

## 6. Link previews

### 6.1 Tags (one set per locale page)
| Tag | Rule | Source |
|---|---|---|
| og:title, og:type, og:image, og:url | the 4 required OGP properties; og:url = "canonical URL" | [OG1] |
| og:description, og:site_name, og:locale (`language_TERRITORY`, default `en_US`), og:locale:alternate (array) | optional | [OG1] |
| og:image:width/height/type/alt, og:image:secure_url | structured image props; alt = "description of what is in the image (not a caption)" | [OG1] |
| og:title (Facebook) | "without any branding such as your site name" | [FB1] |
| og:description (Facebook) | "usually between 2 and 4 sentences" | [FB1] |
| twitter:card | `summary_large_image`; falls back from og:title/og:description/og:image/og:image:alt; title max 70, description max 200, alt max 420 chars | [X1] |
| theme-color | Discord uses it for the embed side colour (community) | [DC1], [M1] |

### 6.2 Per platform
| Platform | Needs | Image | Notes |
|---|---|---|---|
| Facebook | og:url, og:title, og:description, og:image; og:type; og:locale [FB1] | >=1200x630 recommended, >=600x315 for large card, min 200x200, <=8 MB, ~1.91:1 [FB2] | set og:image:width/height so first share renders; images cached per image URL, so change the filename to update [FB2]; crawler UA `facebookexternalhit/1.1` [FB1]; Sharing Debugger developers.facebook.com/tools/debug (needs a FB account, 3rd knowledge) |
| LinkedIn | og:title, og:image, og:description, og:url "must exist" [LI1] (page "updated 2 years ago") | min 1200x627, 1.91:1, <=5 MB; <401 px wide shows as thumbnail [LI1] | Post Inspector linkedin.com/post-inspector (reachable; login needed, 3rd knowledge) |
| X | twitter:card + OG fallback [X1] | `summary_large_image`: 2:1, min 300x157, max 4096x4096, <5 MB, JPG/PNG/WEBP/GIF, no SVG [X1][X2] | Cards docs no longer on docs.x.com: developer.x.com cards URLs redirect to docs.x.com/overview; last archived copy Jan 2026; cards-dev.twitter.com/validator redirects to X login (live) |
| WhatsApp | og:title, og:description, og:url "must be inside the `<head>`"; head must be "within the first 300KB of the HTML" [WA1] | og:image absolute URL, "under 600KB", ">=300px" wide, aspect <=4:1 [WA1]; community reports ~300 KB works reliably (3rd) [WA2] | "not guaranteed to work" [WA1] |
| Slack | classic unfurl "looks for common OpenGraph and X... Card metadata" [SL1] | no documented limits | |
| Discord | OG title/description/image/site_name; `twitter:card summary_large_image` makes the image large (community, 2018) [DC2]; `theme-color` sets embed colour [DC1] | 1200x630 works (3rd) | no official Discord doc for website embeds |

Common rules: absolute `https://` URLs for og:url and og:image (WA1; inf for others); server-render all tags (crawlers do not run JS). **Live yws.lu home has no `<title>`, no meta description and no OG/Twitter tags in the HTML at all (only favicon links), for browser, facebookexternalhit and Googlebot UAs (live).**
Suggested asset (inf): one 1200x630 JPEG/PNG per locale (text differs), <=300 KB, plus `og:image:alt` in the page language.
Tension: Google uses `og:image` (and `primaryImageOfPage`) as preferred-image hints for Search thumbnails and says "Avoid using a generic image (for example, your site logo) or an image with text" [G35]. Text-heavy social cards may be a poor Search thumbnail; a photo-led card with little text satisfies both (inf).

### 6.3 Free checkers (reachability on 2026-10-09)
metatags.io 200, heymeta.com 200, socialsharepreview.com 200, opengraph.xyz 429 to curl (bot protection; works in browser per common use) (live). Login-free status not verified in a browser. Rich Results Test and validator.schema.org accept pasted code [SC5] (live).

## 7. Titles, descriptions, images, favicon, manifest, llms.txt, humans.txt

| Item | Fact | Source |
|---|---|---|
| Title length | "no limit on how long a `<title>` element can be"; truncated "to fit the device width"; brand concisely with a delimiter; same language/script as the page; avoid boilerplate | [G32] (upd. 2025-12-10) |
| Title rule of thumb | ~50-60 chars / ~580-600 px desktop | (3rd) [LEN1][LEN2] |
| Description | "no limit"; truncated as needed; unique per page; `max-snippet` to cap | [G33] (upd. 2026-04-20) |
| Description rule of thumb | ~150-160 chars (~920 px) desktop, ~120 mobile | (3rd) [LEN1] |
| `max-image-preview:large` | "A larger image preview, up to the width of the viewport, may be shown"; applies to web search, Images, Discover | [G28] |
| Discover | large images "at least 1200 px wide" and "Enabled by the max-image-preview:large setting" | [G36] (upd. 2026-03-09) |
| Favicon | one per hostname; `<link rel="icon">` (also `shortcut icon`, `apple-touch-icon`, `apple-touch-icon-precomposed`) on the home page; square 1:1, "at least 8x8px", "we recommend using a favicon that's larger than 48x48px"; formats "BMP, GIF, ICO, PNG, JPEG, PPM, and TIFF"; "The favicon URL must be stable"; Googlebot-Image must be able to crawl it | [G34] (upd. 2026-08-28) |
| Favicon for yws.lu | live: `/favicon.ico` declared `sizes="16x16"` plus `/favicon.png` typed `image/x-icon` (live). Ship e.g. `/favicon.ico` (16/32/48) + `/icon-192.png`; an SVG icon is fine for browsers but is not on Google's list (inf) |
| Web app manifest | not used by Google's favicon pipeline (absent from [G34]); optional for installability | [G34], [M2] |
| theme-color | browser UI colour; `media` for light/dark; "Limited availability" (Chrome Android, Safari) | [M1] (upd. 2026-04-22) |
| llms.txt and Google | "Google Search itself doesn't use them"; creating one "will neither harm nor help your site's visibility or rankings in Google Search" | [G37] (upd. 2026-07-10), [G2] 2026-06-15 |
| llms.txt spec | `/llms.txt`, H1 required, blockquote summary, H2 link lists; proposed Sept 2024, "version 2 published August 10, 2026" | [L1] |
| llms.txt adoption | 4,088 -> 36,120 sites (Jun 2025 -> May 2026); "97% of llms.txt files received zero requests in May 2026" (Ahrefs data) | (3rd) [L2] |
| Lighthouse | 13.2.0 (2026-05-01) added an "agentic browsing" category with an llms.txt check; on by default in 13.3.0 (2026-05-07); 13.5.0 groups llms.txt under "agent discovery". The repo's devDependency is `lighthouse ^13.5.0`, so local audits will flag a missing llms.txt | [L3] |
| humans.txt | text file "In the site root. Just next to the robots.txt", optional `<link type="text/plain" rel="author" href=".../humans.txt">`; no search engine documents using it (inf) | [H1] |

## 8. Core Web Vitals

| Metric | Good | Needs improvement | Poor |
|---|---|---|---|
| LCP | <=2.5 s | 2.5-4 s | >4 s |
| INP | <=200 ms | 200-500 ms | >500 ms |
| CLS | <=0.1 | 0.1-0.25 | >0.25 |
Measured at the 75th percentile of page loads, split mobile/desktop; all three "Stable" [W1] (upd. 2024-10-31). Google's page repeats 2.5 s / 200 ms / 0.1 [G38] (upd. 2025-12-10). No threshold change found for 2025-2026.
- CrUX eligibility: page must be publicly discoverable (200, no noindex) and "sufficiently popular" (threshold not disclosed) [W2] (upd. 2024-06-20).
- PageSpeed Insights: no URL data -> "fall back to origin-level"; no origin data -> "unable to show any real-user experience data"; field data covers a trailing 28-day period [W3] (upd. 2024-10-21).
- yws.lu (inf): expect no CrUX field data (low traffic) and an empty Search Console CWV report; rely on Lighthouse lab runs (already in repo scripts) and, if wanted, consent-aware RUM.

## Changed in 2025-2026

| Date | Change | Source |
|---|---|---|
| 2025-01-22 | Breadcrumbs removed from mobile results; desktop only | [G6][G2] |
| 2025-03-05 | AI Mode added to robots meta / `data-nosnippet` docs | [G2] |
| 2025-06-05 | Event docs: online event properties removed; physical + publicly bookable only | [G2] |
| 2025-06-11 | Multilingual docs: removed the "block auto-translated pages with robots.txt" section | [G2] |
| 2025-06-12 | Phase-out: Book Actions, Course Info, ClaimReview, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing (SC/RRT removal 2025-09-09) | [G11][G2] |
| 2025-06-16 | AI Mode data counts in Search Console Performance totals | [G2] |
| 2025-11-05 | Practice problem deprecated; Dataset = Dataset Search only; Book Actions un-deprecated | [G2][G12] |
| 2025-11-20 / 12-17 | Crawler, robots.txt, HTTP status, crawl budget docs moved to developers.google.com/crawling | [G2] |
| 2025-12-18 | Non-200 pages may skip rendering | [G2][G29] |
| 2026-01-06 | Practice problem docs removed | [G2] |
| 2026-03-02 | Preferred image: `primaryImageOfPage` / main-entity `image` / `og:image` documented as thumbnail hints | [G2][G35] |
| 2026-03-24 | Robots meta tags in `<body>` are respected | [G2][G28] |
| 2026-05-01/07 | Lighthouse agentic-browsing category with llms.txt audit (13.2.0 / default in 13.3.0) | [L3] |
| 2026-05-07/08 | FAQ rich results stop showing; docs removed 2026-06-15 | [G2] |
| 2026-05-15 | Google guide on optimizing for generative AI features; spam policies cover AI responses | [G2][G37] |
| 2026-06-15 | Note: llms.txt not needed for Google Search | [G2][G37] |
| 2026-07-10 | Canonicalization troubleshooting: re-evaluation timeframes | [G2] |
| 2026-08-10 | llms.txt spec v2 | [L1] |
| 2026-08-28 | Favicon formats listed explicitly (BMP, GIF, ICO, PNG, JPEG, PPM, TIFF; no SVG/WebP); Google says supported formats "haven't changed" | [G2][G34] |
| 2026-09-08 | "Regional differences in Search experience" page (EEA aggregator/supplier units, carousels) | [G2] |
| 2026-09-16 | Search profile badge guide (profile.google.com/@handle) | [G2][G39] |
| 2026-09-21 | hreflang doc last updated (current text: `es-419`-style codes unsupported, case-insensitive) | [G17] |
| by 2026-10-09 | X Cards docs gone from docs.x.com; card validator redirects to login | [X1] (live) |
| by 2026-10-09 | IndexNow participants now include Internet Archive and Amazonbot | [IN3] |
| by 2026-10-09 | GBP guidelines no longer contain the "in-person contact during stated hours" sentence | [GBP1] |
| 2024-11-21 (context) | Sitelinks search box removed | [G13] |

## Surprises worth flagging
- Event rich results do not exist for LU/FR/BE or French, and Luxembourg is missing from the job-search country list [G7][G8].
- FAQ rich results are fully gone (May 2026), not just restricted [G2].
- Google's favicon format list excludes SVG and WebP [G34].
- Live yws.lu serves no `<title>`, description or OG tags in HTML; robots.txt and sitemap are 404 (live).
- Lighthouse 13.x (in this repo) scores llms.txt in its agentic category while Google Search ignores the file [L3][G37].
- Vercel previews on a custom branch domain are indexable unless noindex is added manually [V1].

## Sources (all checked 2026-10-09)
| ID | URL | Page date |
|---|---|---|
| G1 | https://developers.google.com/search/docs/appearance/structured-data/search-gallery | upd. 2026-06-15 |
| G2 | https://developers.google.com/search/updates | changelog to 2026-10-08 |
| G3 | https://developers.google.com/search/docs/appearance/structured-data/organization | upd. 2026-09-08 |
| G4 | https://developers.google.com/search/docs/appearance/site-names | upd. 2025-12-10 |
| G5 | https://developers.google.com/search/docs/appearance/structured-data/breadcrumb | upd. 2026-09-08 |
| G6 | https://developers.google.com/search/blog/2025/01/simplifying-breadcrumbs | 2025-01 |
| G7 | https://developers.google.com/search/docs/appearance/structured-data/event | upd. 2026-09-08 |
| G8 | https://developers.google.com/search/docs/appearance/structured-data/job-posting | upd. 2026-09-08 |
| G9 | https://developers.google.com/search/apis/indexing-api/v3/quickstart | upd. 2026-07-16 |
| G10 | https://developers.google.com/search/docs/appearance/structured-data/faqpage (redirects to updates#removing-faq-rich-result) | - |
| G11 | https://developers.google.com/search/blog/2025/06/simplifying-search-results | 2025-06, upd. 2025-09-08 |
| G12 | https://developers.google.com/search/blog/2025/11/update-on-our-efforts | 2025-11 |
| G13 | https://developers.google.com/search/blog/2024/10/sitelinks-search-box | 2024-10 |
| G14 | https://developers.google.com/search/docs/appearance/structured-data/local-business | upd. 2026-09-08 |
| G15 | https://developers.google.com/search/docs/appearance/structured-data/sd-policies | upd. 2026-07-10 |
| G16 | https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data | upd. 2025-12-10 |
| G17 | https://developers.google.com/search/docs/specialty/international/localized-versions | upd. 2026-09-21 |
| G18 | https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites | upd. 2025-12-10 |
| G19 | https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages | upd. 2025-12-10 |
| G20 | https://developers.google.com/search/blog/2014/05/creating-right-homepage-for-your | 2014-05 |
| G21 | https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls | upd. 2026-07-10 |
| G22 | https://developers.google.com/search/docs/crawling-indexing/301-redirects | - |
| G23 | https://developers.google.com/crawling/docs/troubleshooting/http-status-codes | upd. 2026-02-04 |
| G24 | https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap | upd. 2026-07-08 |
| G25 | https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps | upd. 2025-12-10 |
| G26 | https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping | 2023-06 |
| G27 | https://developers.google.com/search/docs/crawling-indexing/robots/intro | upd. 2025-12-10 |
| G28 | https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag | upd. 2026-03-24 |
| G28b | https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec | upd. 2026-08-31 |
| G29 | https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics | upd. 2026-03-04 |
| G30 | https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash | 2010-04 |
| G31 | https://developers.google.com/search/docs/crawling-indexing/url-structure | upd. 2025-12-10 |
| G32 | https://developers.google.com/search/docs/appearance/title-link | upd. 2025-12-10 |
| G33 | https://developers.google.com/search/docs/appearance/snippet | upd. 2026-04-20 |
| G34 | https://developers.google.com/search/docs/appearance/favicon-in-search | upd. 2026-08-28 |
| G35 | https://developers.google.com/search/docs/appearance/google-images | upd. 2026-03-02 |
| G36 | https://developers.google.com/search/docs/appearance/google-discover | upd. 2026-03-09 |
| G37 | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | upd. 2026-07-10 |
| G38 | https://developers.google.com/search/docs/appearance/core-web-vitals | upd. 2025-12-10 |
| G39 | https://developers.google.com/search/docs/appearance/search-profiles | 2026-09 |
| SC1 | https://support.google.com/webmasters/answer/9008080 | - |
| SC2 | https://support.google.com/webmasters/answer/34592 | - |
| SC3 | https://support.google.com/webmasters/answer/7451001 | - |
| SC4 | https://support.google.com/webmasters/answer/9012289 | - |
| SC5 | https://support.google.com/webmasters/answer/7445569 | - |
| GBP1 | https://support.google.com/business/answer/3038177 | - |
| GNP | https://support.google.com/nonprofits/answer/3215869 | - |
| SO1 | https://schema.org/NGO | V30.1 |
| SO2 | https://schema.org/nonprofitStatus | V30.1, 2026-09-16 |
| SO3 | https://schema.org/NonprofitType | V30.1 |
| W1 | https://web.dev/articles/vitals | upd. 2024-10-31 |
| W2 | https://developer.chrome.com/docs/crux/methodology | upd. 2024-06-20 |
| W3 | https://developers.google.com/speed/docs/insights/v5/about | upd. 2024-10-21 |
| W4 | https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html | reachable |
| B1 | https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b (JS app; text read from embedded help strings) | - |
| B2 | https://www.promodo.com/blog/how-to-add-website-to-bing-webmaster-tools (3rd, search snippet only) | 2026 |
| B3 | https://woorank.com/en/edu/seo-guides/best-practices-for-language-declaration (3rd, search snippet only) | - |
| IN1 | https://www.indexnow.org/documentation | - |
| IN2 | https://www.indexnow.org/faq | - |
| IN3 | https://www.indexnow.org/searchengines.json | - |
| IN4 | https://blckalpaca.at/en/knowledge-base/seo-geo/technical-seo/indexnow-35-billion-urls-daily-without-google (3rd, search snippet only) | 2026 |
| OG1 | https://ogp.me/ | - |
| FB1 | https://developers.facebook.com/docs/sharing/webmasters | - |
| FB2 | https://developers.facebook.com/docs/sharing/webmasters/images | - |
| X1 | https://web.archive.org/web/20260116124848/https://developer.x.com/en/docs/x-for-websites/cards/overview/markup | archived 2026-01-16 |
| X2 | https://web.archive.org/web/20260112050218/https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image | archived 2026-01-12 |
| LI1 | https://www.linkedin.com/help/linkedin/answer/a521928 | "2 years ago" |
| WA1 | https://developers.facebook.com/docs/whatsapp/link-previews | - |
| WA2 | https://support.wix.com/en/article/wix-editor-recommended-ogimage-size (3rd: "only be displayed if the image is under 300 KB") | - |
| SL1 | https://docs.slack.dev/messaging/unfurling-links-in-messages | - |
| DC1 | https://meta.discourse.org/t/changing-the-color-text-of-my-forums-embed-on-discord/216690 (community) | 2022-02 |
| DC2 | https://forums.swift.org/t/site-logo-is-giant-in-discord-and-slack-embeds/12505 (community) | 2018 |
| V1 | https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines | upd. 2026-10-02 |
| A1 | https://docs.astro.build/en/guides/integrations-guide/sitemap/ | - |
| A2 | https://docs.astro.build/en/guides/routing/ | - |
| N1 | https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap | upd. 2026-08-18 |
| N2 | https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects | upd. 2026-06-30 |
| L1 | https://llmstxt.org/ | v2 2026-08-10 |
| L2 | https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/ (3rd) | 2026-06 |
| L3 | https://github.com/GoogleChrome/lighthouse/releases (v13.2.0-v13.5.0) | 2026-05-01..09-18 |
| H1 | https://humanstxt.org/ | - |
| M1 | https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color | 2026-04-22 |
| M2 | https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest | - |
| LEN1 | https://spotibo.com/meta-description-length/ (3rd, search snippet only) | 2026 |
| LEN2 | https://flaviocopes.com/character-limits-titles-descriptions.md (3rd, search snippet only) | - |
| LU1 | https://benevolat.lu/en/directory-organisations/ | - |
| LU2 | https://www.lbr.lu/ | - |
| LU3 | https://myasbl.public.lu/fr.html | - |
| LU4 | https://youth.europa.eu/volunteering/organisations_en | - |
| LU5 | https://www.anefore.lu/ | - |
| LU6 | https://www.snj.public.lu/ | - |
| LU7 | https://paperjam.lu/guide/organisation/01304220736/editus-luxembourg (3rd, about editus.lu, search snippet only) | 2026 |
| live | curl of https://yws.lu/, https://www.yws.lu/ and paths listed in section 3 | 2026-10-09 |

Not covered: keyword research and slugs (separate research file), content/E-E-A-T strategy, Google Ad Grants details, GBP category names, Facebook's supported-locale list for og:locale, Bing's own language-signal docs (JS-only pages), Discord official embed docs (none found), login-free behaviour of OG checkers (not tested in a browser), Search profile eligibility, EEA aggregator units in detail, video/Article markup, analytics/consent for RUM, accessibility audits beyond `lang`.
