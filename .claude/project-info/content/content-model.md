# Content model

> Owns: the organisation's facts (one data source), where each page's content comes from, the statistics and the house
> pictures (static since Supabase was retired). Pages and sections: `structure.md`. Copy voice: `brand.md`. Translations: `i18n.md`.

## The organisation (one source: `src/data/organisation.ts` after the migration; today `lib/constants.ts`)

Every surface that shows a fact (header CTA, footer, contact sections, legal pages, JSON-LD, `llms.txt`) reads it from
the one module; a unit test checks the shapes (E.164 phones, absolute URLs, postcode format).

| Fact | Value | Source |
| --- | --- | --- |
| Name | Youth Work Synergy | [repo: lib/dictionary.tsx] |
| Short name | YWS | [repo] |
| Legal form | ASBL (association sans but lucratif); written "a.s.b.l." in the addresses and "ASBL" in the copyright line | [repo: lib/constants.ts, components/layout/Footer.tsx] |
| Legal name | "Youth Work Synergy ASBL" as written in the footer; the registered form (RCS / LBR entry, number `F…`) is **Unknown** | `open-questions.md` |
| Office | Bureau YWS a.s.b.l., 136-138, rue Adolphe Fischer, L-1521 Luxembourg | [repo: lib/constants.ts, commit 188082f 2026-09-29] |
| Registered seat (postal address) | Siège (adresse postale) YWS a.s.b.l., 16, rue Pierre Weydert, L-5891 Fentange | [repo: lib/constants.ts] |
| Email | contact@yws.lu | [repo] |
| Phones | two numbers stored in one string "286622 • 661597312" → **+352 28 66 22** and **+352 661 597 312** (E.164 `+352286622`, `+352661597312`); which is landline/mobile and what each is for: **Unknown** | [repo], `open-questions.md` |
| Facebook | https://www.facebook.com/profile.php?id=61557997643374 | [repo] |
| LinkedIn | https://www.linkedin.com/in/ywslu/ (a personal-profile URL, not `/company/`) | [repo] |
| Instagram | https://www.instagram.com/yws.lu/ | [repo] |
| Status | GLS (Gestion Locative Sociale) status, works in collaboration with the Ministry of Housing | [repo: dictionary `heroDescriptionAboutUs`] |
| Since | 2023 ("Since 2023, we've already opened…") | [repo: dictionary `realImpactDescriptionAboutUs`] |
| Opening hours | **Unknown** (never shown; not invented) | `open-questions.md` |
| Founded / team names / registration number | **Unknown** | `open-questions.md` |

## External links the journeys use

| Link | Where | Source |
| --- | --- | --- |
| Apply for housing: Google Form `…1FAIpQLSeak3NN…/viewform` | home, Looking for housing, header | [repo: `YWS_APPLY_FOR_HOUSING_GOOGLE_FORM_LINK`] |
| Rent your property form | **empty string** in constants (owners contact by email/phone) | [repo: `YWS_RENT_YOUR_PROPERTY_GOOGLE_FORM_LINK = ""`] |
| Office on Google Maps (search URL + embed) | contact section, footer | [repo] |
| Houses map (Google My Maps `mid=1aPvVQqtHy7bmTQoetB5RWpCkIUjlEOg`) | About us (component exists, not rendered today) | [repo: RealImpactMap.tsx] |
| TEC conference Zoom registration | TEC page (event took place 9 April 2026) | [repo] |
| TEC practices site | https://tecpractices.eu/web/ (nav since 2026-05-11) | [repo: NavBar.tsx] |
| Project links | Get your home (Google Form), Locked out (Google Drive), Safe Paths (Google Form) | [repo: ProjectsList.tsx] |

## Statistics and house pictures (static since 2026-10-09; Supabase retired)

The 2025 site read one Supabase project (`tsgaliwebpcrjwtcxzdp`) in the browser with TanStack Query: a `statistics`
table with one row and a public `houses-pictures` bucket with 7 images (a `projects` table was typed but never
existed). Supabase was **removed** [user 2026-10-09: "replace it with statically typed values"]: both now live in the
repo, so they are in the HTML for search engines and visitors, with no third-party request, cookie or client JS.

| Data | Where now | Values | How to change |
| --- | --- | --- | --- |
| Statistics | `web/src/data/statistics.ts` (`STATISTICS`, typed) | 9 shared houses / 40 young people housed / 750 requests waiting, as of 2025-07-09 (the row's `created_at`; checked against the table 2026-10-09) | edit the file, commit, deploy |
| House pictures | `web/src/assets/houses/yws-shared-house-1…7` (byte copies of the bucket, 2025 carousel order), listed with per-locale alt text in `web/src/data/houses.ts` | 7 façade photos, 450–800 px, 28–63 KB, client's own | add the file + a `HOUSE_PICTURES` entry with its alt (en + fr) |

Owner step: delete the Supabase project only **after** this branch is live in production; until then the 2025 site on
`main` still reads it (the About us carousel would break). File names and alt text name no village (residents'
privacy; Q40 [assumption]).

## Page content sources

| Page | Copy | Media | Data |
| --- | --- | --- | --- |
| Home | dictionary (hero, who we are, housing, projects, contact) | group photo, partner logos, house/wardrobe/rocket 3D | — |
| Looking for housing | dictionary (hero, 4 timeline steps, who gets priority) | Vortex particles (canvas 2D) | Google Form link |
| Rent your property | dictionary (hero, why rent to us, 5 benefit cards, interested) | background lines (SVG) | — |
| About us | dictionary (hero, mission + 3 cards, real impact) | group photo, 7 house pictures | `statistics.ts`, `houses.ts` |
| We Spark projects | dictionary (7 projects, long texts; 3 written in French inside the English dictionary) | 10 project JPGs (25–30 MB each), logos, Safe Paths posters per locale | — |
| TEC conference | **hard-coded English** in components (no French) | banner PNG, LightPillar shader, cobe globe, SplashCursor | Zoom link |
| Jobs (retired) | French offer texts hard-coded + 2 PDFs | ColorBends shader | — |

Copy rules: existing French is human text (keep verbatim; fix only obvious typos, listed in `i18n.md`); new copy is
factual, close to the client's words and listed in `placeholders.md` for approval [user 2026-10-09].
