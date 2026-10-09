# Structure

> Owns: the sitemap, each page's sections in order, the header and navigation, the footer spec, the CTA inventory per
> audience, embeds, the 404, the legal pages and the redirects (retired Jobs + legacy URLs). Slugs, `/` redirect,
> switcher: `i18n.md`. Titles, descriptions, JSON-LD: `seo.md`. Facts: `content-model.md`. Look: `design.md`.
> Features F01–F13: `requirements.md`. Section order = the 2025 site [repo: app/**]; revamp changes are marked.

## Sitemap (mirrors `web/src/lib/routes.ts`)

```
/                                     307 → /fr/ or /en/ by Accept-Language; never canonical (i18n.md § Root)
/en/                        /fr/                                 home
/en/youth-housing/          /fr/logement-jeunes/                 young people: housing + apply
/en/rent-your-property/     /fr/louer-son-bien/                  property owners
/en/about-us/               /fr/a-propos/                        organisation, mission, impact
/en/youth-projects/         /fr/projets-jeunes/                  We Spark Projects (7 projects)
/en/tec-conference/         /fr/conference-tec/                  TEC conference archive (event 9 April 2026, past)
/en/privacy-policy/         /fr/politique-de-confidentialite/    noindex,follow (seo.md § Crawl)
/en/legal-notice/           /fr/mentions-legales/                noindex,follow
/404.html                                                        one bilingual page, status 404, noindex
/robots.txt /sitemap-index.xml /llms.txt /humans.txt /favicon.ico /favicon.png (apple-touch-icon + manifest: Q33)
/ms32821332.txt /<indexnow-key>.txt /og/…                        (seo.md)
```

## Chrome (every page, DOM order)

Skip link → `#main` · header · inner pages: a one-line breadcrumb ("Homepage" › page, labelled `nav`) backing the
`BreadcrumbList` (new element: comps proposal; if dropped, the markup goes too) · `<main id="main">` · footer · phone
action bar. `scroll-padding-top` = header height. One `<h1>`, sections `<h2>`, cards `<h3>` (2025: every section
heading was an `<h1>` [file: HANDOFF.md § 5]).

## Header and navigation

| Width | Shows | Notes |
| --- | --- | --- |
| wide (English from 1280 px, French from 1600 px: where each locale's nav fits, checked by the header-fit e2e test) | logo → locale home · About us · Rent your property · We Spark Projects · TEC Conference · Contact us · **Apply for housing** (orange-tinted pill, solid on hover) · the other language with its flag ("🇫🇷 Français" / "🇬🇧 English", flags drawn as SVG) | existing labels; "Apply for housing" → the housing page, eligibility first, as in 2025 (Q26 default [assumption 2026-10-09]); the housing page's "Apply now" opens the Google Form |
| narrower | logo · **Apply** (short label on phones: "Apply" / « Postuler », new copy) · the other language (from 640 px) · **Menu** | 64 px tall below 1280 px, 80 px above; a light frosted bar, `white/75` + blur, dark text and the logo drawn in ink [user 2026-10-09: the dark bar was too heavy] (2025 `bg-black/25` with white text: 1.8:1) |
| menu (disclosure under the header) | Apply for housing (pill), the nav items, Call us +352 28 66 22, contact@yws.lu, 🇬🇧 English · 🇫🇷 Français (current marked) | "Menu" is a text button with `aria-expanded`; while open the rest of the page is `inert` (focus stays in the header), dimmed and still (a tap on the dim closes), Escape closes and returns focus; a link closes it. Motion [user 2026-10-09]: the bars turn into a cross, the sheet (white, rounded bottom) drops in over 320 ms and its links follow 35 ms apart; closing plays back; reduced motion: instant |
| proposal (`comps/`): phone action bar | Apply now (form ↗) · Rent out · Contact us, fixed bottom ≤ 56 px | "every journey one tap away" literally; a new element over content, so a proposal; today Rent out and Contact are two taps (menu → item) on phones |

TEC Conference → the internal page [user 2026-10-09] (the 2025 desktop nav pointed at tecpractices.eu from commit
87b18ab, 2026-05-11). Jobs leaves every menu. "Contact us" → the current page's `#contact` (home, owners), else
`/<locale>/#contact`.

## Pages: sections in order

**Home.** 1 Hero: H1 "Rent out *your* *property*", line "Give youth a chance for a better future", 3 sentences (a home
for young people; ASBL with the Ministry of Housing; "up to 90%" tax exemption: Q17), "Learn more" → owners; 3D house
(2025: ≥ 1280 px only; revamp: poster on phones, scene after the H1, near visibility). 2 Partner strip: ESC, Fondation
**Sommer**, Gestion Locative Sociale, Erasmus+, Ministry of Housing, André Losch Fondation, Ministry of Justice, each
linking out (2025 links were `tabIndex=-1`); EU logos static (Q21). 3 Who we are (`#who-we-are`): 2 sentences, "Learn
more" → about. 4 Looking for housing? (`#looking-for-housing`): furnished rooms, quick form; "Learn more" → housing,
"Apply now" ↗; 3D wardrobe left of the header from 1280 px. 5 Youth-Led Projects! (`#youth-led-projects`): "See for
yourself" → projects; 3D rocket right of the header from 1280 px (both built 2026-10-09: `Section split`, the header
left-aligned beside its toy; below 1280 the header is centred alone, as in 2025).
6 Contact us (`#contact` + an alias for the 2025 `#contact-section` [assumption]): socials, email and phones (plain
text since commit 8cd66bc, 2025-12-02), office map (iframe on load in 2025 → facade).

**Youth housing.** 1 Hero: H1 "Looking for housing?", "Are you between 18 and 34…", "We're here to help", "Apply now"
↗; particle background (Aceternity Vortex → own flow field, Q23). 2 "Here's how it works" (`#how-it-works`): ordered
timeline, 4 steps (h3): Fill Out the Form · Let's Talk · Personal Interview · Our Selection Process. 3 "Who Gets
Priority?" (`#who-gets-priority`): urgency, basic financial stability, gender balance, not everyone at once; "Apply
now" ↗. Proposal: an eligibility box from the client's facts only (18–34, furnished shared homes, coaching, the
steps); price, wait time, student eligibility unknown (Q24).

**Rent your property.** 1 Hero: H1 "Rent your property with confidence: safe, reliable & impactful", 3 sentences;
revamp: email + call buttons and a link to the logement.lu GLS list [research: comparable-sites § 3 #14]. 2 "Why Rent
to Us?" (`#why-rent-to-us`): 4 paragraphs, 5 cards (h3): Guaranteed Rent · Tax Benefits (90 %, Q17) · Ongoing Tenant
Support · Property Flexibility · Property Maintenance. 3 "Interested in renting your property to us?" (`#contact`):
one line, email + each phone as links (plain text in 2025).

**About us.** 1 Hero: H1 "About us", 5 lines (bold "Rent out your property — Give youth a chance…"; empty houses into
homes; the youth housing crisis; ASBL with GLS status and the Ministry of Housing), group photo. 2 "Our mission"
(`#our-mission`): 1 sentence, 3 cards: Coaching · Affordability · Sustainability. 3 "Real impact" (`#real-impact`):
the statistics sentence ("Since 2023 … 9 shared houses … 40 young people … 750 requests", static: F05) +
houses carousel (7 pictures; skip `.emptyFolderPlaceholder` by name, not index 0). No team section (no team data).

**We Spark Projects.** 1 Hero: H1 "We Spark Projects", "Here's a showcase of projects we've helped to bring to life."
2 At a glance [user 2026-10-09: "improve the projects subpage and layout"]: one tile per project in its colour (number,
logo, the whole title, the first line of its text via `excerpt()`, the client's words), the tile jumps to the project;
a swipe strip on phones (the next tile peeks in), rows of tiles from 640 px; a `<nav>` "Projects at a glance".
3 Seven projects as full-width chapters (2025 and the first port: cards two to a row, a 95-word card beside a 300-word
one left a screen-high hole): from 1024 px a side column that stays in view (number, logo, the `<h2>` with the
anchor, the language note, the link out) beside the text; inner objectives / activities / results as `<h3>` + lists
under labels with a bar in the project's colour; an even 4:3 grid of photos (two to a row on phones), the poster up
to 400 px; photos ≤ 2560 px AVIF/WebP; logos decorative (alt "": the `<h2>` names the project; 2025: the whole
description as alt); text capped at 70 characters a line. Texts: the `projects` content collection (`i18n.md` § Project texts). Get Your Home (`#get-your-home`,
Erasmus+, 6 photos, "Register now" ↗) · Locked Out (`#locked-out`, Fondation Sommer, 4 photos, "Learn more" ↗ Drive) ·
Safe Paths Luxembourg (`#safe-paths`, Ministry of Justice, poster per locale, "Learn more" ↗ form; workshops
April–May 2026 past: Q9) · Girlssective (`#girlssective`) · Projet V Mobile Learning (`#mobile-learning`; revamp:
"The closing conference" → the TEC page) · Les jeunes amis du sport (`#sport`) · The Self Chronicle
(`#self-chronicle`). The last three have no link. Languages: `i18n.md` § French rules.

**TEC conference.** 2025 order kept: 1 Hero (H1 "Much More Than a Method", quote, Projet V closing conference, 9 April
2026 14:30–15:30, Zoom) · 2 Globe + partner countries (Italy, Germany, Luxembourg) · 3 Why this conference matters ·
4 Conference programme · 5 Q&A (time, format, registration) · 6 What we will present · 7 Who is it for? · 8 Join us!
(email + Zoom). Revamp (Q8 [assumption]): past tense; every Zoom CTA becomes **Visit tecpractices.eu** ↗ (primary in
the hero, again at the end); the registration card goes; no claim about a recording; no Event markup; new French page.
Built [repo: web/src/components/tec/]: a line "This event took place on 9 April 2026." above the H1; headings 6–8 become
"What we presented" · "Who was it for?" · "Join the conversation"; the Q&A keeps time and format as compact cards; the
poster is the client's banner (alt says what it shows; 2025's alt named the group photo); "Ninfea" kept as written.

**404** (`404.html`; Vercel serves it with status 404 for any unknown path): one bilingual page, no JS
[assumption]: H1 "Page not found · Page introuvable", a line per language (`lang="fr"` on the French), links to both
homes, Looking for housing, Rent your property, Contact us. Noindex, no canonical, no hreflang (per-locale copies are
optional; the gate already allows `/en/404/`, `/fr/404/`).

**Legal pages** (en + fr, facts only, `PLACEHOLDER` until approved; text in `compliance-and-data.md`; noindex). Legal
notice: publisher (name + "a.s.b.l.", seat, R.C.S. Luxembourg number, representative: Q1), contact, host (Vercel Inc.
[research: legal-asbl-luxembourg § 1.4]), credits, links. Privacy policy: GDPR art. 13 headings, CNPD complaint,
cookies, last updated. Footer legal row only, never the header. **Built 2026-10-09** (layout 2026-10-09: a sticky contents column from 1024 px with the section being read marked, a folded « Contents » card on phones, the right to object as a callout): `LegalPage.astro` renders the
`legal` content collection under an H1 and "Last updated" (`formatDate`), a 70ch reading column, phone links that
never wrap; 36 `PLACEHOLDER` markers until the client answers (placeholders.md).

## Footer (one data source: `organisation.ts` + `routes.ts` + catalogs)

- `<footer>` once (contentinfo), static at the page end: never sticky or fixed (2025: sticky + blur over content);
  its last row clears the action bar. AA contrast, no `/60` alpha text.
- **Organisation block:** logo (alt "Youth Work Synergy"), the mission line (`ourMissionDescriptionAboutUs`,
  existing), legal name "Youth Work Synergy ASBL" (+ RCS once Q1 is answered).
- **Link columns per journey**, each a `<nav>` named by a real `<h2>` (no h4/h5 as text): Looking for housing
  (housing page · Apply now ↗ · We Spark Projects) · Rent your property (owners page · Why Rent to Us? · its
  contact) · Who we are (About us · Our mission · Real impact · TEC Conference) · Contact us.
- **Contact column** in `<address>`: office "Bureau YWS a.s.b.l." and seat "Siège (adresse postale)" (English labels
  "Office" / "Registered office (postal address)" are new copy), each with its own Google Maps link ↗; email `mailto:`
  (no new tab); **each phone its own `tel:`** (`+352286622`, `+352661597312`; 2025 put both in one broken link);
  Facebook, Instagram, LinkedIn as icon + visible name ↗ (2025: icon only, no name). Then the switcher.
- **Legal row:** "©{year} Youth Work Synergy ASBL. All rights reserved." (existing) · Privacy policy · Legal notice ·
  See credits (dialog listing every CC BY asset with author, link, licence, "modified" where optimised: F10).

## CTA inventory (existing labels unless marked new; ↗ = new tab + hidden "(opens in a new tab)")

| Audience | CTA (en / fr) | Target | Where |
| --- | --- | --- | --- |
| young person | Apply now / Postulez maintenant | Google Form `links.applyForHousing` ↗ | header, action bar, home § 4, housing hero + § 3, footer |
| young person | Looking for housing / À la recherche d'un logement · Learn more | housing page | nav, menu, footer · home § 4 |
| young person | email, subject "Housing application" / « Demande de logement » (new) | `mailto:` | contact sections |
| owner | Learn more · Rent your property / Louez votre propriété · Rent out / Louer | owners page | home hero · nav, menu, footer · action bar |
| owner | email, subject "Renting my property" / « Louer mon bien » (new) · each phone | `mailto:` · `tel:` | owners hero + `#contact`, home contact, footer |
| partner, funder | Learn more · See for yourself / Voyez par vous-même | about · projects | home § 3, § 5 |
| practitioner | TEC Conference · Visit tecpractices.eu (new, Q8) | TEC page · `links.tecPractices` ↗ | nav · TEC hero + end |
| projects | Register now (Get Your Home) · Learn more (Locked Out, Safe Paths) | Google Form ↗ · Drive ↗ · form ↗ | project cards (still open? Q9) |
| everyone | Contact us / Contactez-nous | `#contact` | nav, menu, action bar, footer |
| everyone | Copy / Copier → « Copié » · Open in Google Maps · How your data is handled → privacy policy (all new) | clipboard (email, address) · `office.maps` ↗ · privacy page | contact sections (F04), footer |
| everyone | See credits / Voir les crédits · English / Français | dialog · same page, other locale | footer · header, menu, footer |

Cross-links: home → all four journeys; housing ↔ owners via header and footer; Mobile Learning ↔ TEC; about →
projects and owners. No form anywhere [user 2026-10-09].

## Embeds and third parties

| What | How | Why |
| --- | --- | --- |
| Housing application | external Google Form, link only ↗ | no forms on the site [user 2026-10-09] |
| Office map | the `office.embed` iframe in the markup with `loading="lazy"`: it loads by itself near the screen [user 2026-10-09], over a drawn grid with the address; below it the address, "Open in Google Maps" and "Map by Google Maps. How your data is handled" (→ privacy policy) | no Google request on load (e2e `privacy.spec.ts`); the consent trade-off is in legal/compliance-and-data.md |
| Houses map (My Maps `links.housesMap`) | **not shown**: removed from About us on 2025-12-02 (commit 8cd66bc, reason unrecorded); if wanted back (Q31), a facade in Real impact (its iframe sets `NID` on load) | residents' privacy unknown |
| Zoom, Google Drive, Safe Paths and Get Your Home forms | links only ↗ | — |
| Statistics + house pictures | static in the repo (Supabase retired 2026-10-09): no request at all | `content-model.md` |

## Redirects (308 to the English page, one hop; `LEGACY` in `routes.ts` → `vercel.json`)

16 legacy sources → **44** rules (with/without trailing slash, lower-case variant) + 2 root 307s = **46** in
`vercel.json` [file: vercel.json, counted 2026-10-09].

| Sources | → | Rules |
| --- | --- | --- |
| `/AboutUs`, `/LookingForHousing`, `/RentYourProperty`, `/WeSparkProjects`, `/TecConference` (2025 Next) | about, housing, owners, projects, tec | 20 |
| **Retired Jobs:** `/Jobs` + the two job PDFs `/files/CDD_:name(.*)` [user 2026-10-09] | `/en/about-us/` (no JobPosting) | 4 + 2 |
| WordPress (until 2024): `/our-story`, `/cash-donation`, `/donation-in-kind` | about | 6 |
| `/our-accommodations` · `/our-projects`, `/news-event` | housing · projects | 2 · 4 |
| `/contact` · `/legal-notices` · `/privacy-policy` | `/en/#contact` · legal · privacy | 6 |

Not redirected (404; decide with Search Console data): `/files/brochure.pdf` (Q14),
`/wp-content/uploads/2024/12/New-Brochure.pdf` (403 live [research: audiences-keywords F6]). Tested by `routes.test.ts`
(file current, targets exist) and e2e on the preview (one hop, both hosts, with and without slash: F13).
