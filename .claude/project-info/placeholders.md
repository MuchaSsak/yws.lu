# Placeholders and copy for approval

> The not-real register: every `PLACEHOLDER` in code/data, every temporary asset, and every new string the client must
> approve. The launch gate fails a production build while any `PLACEHOLDER` marker ships. Cleared on "go to prod".
> The launch runbook (owner steps) lives in `site/seo.md` § Launch. French source of truth: `web/scripts/fr-manual.json`
> (new French and fixes) + the 2025 dictionary (`bun run i18n:fill`).

## PLACEHOLDER markers in code

| Where | What | Needs | Since |
| --- | --- | --- | --- |
| — | none yet (the legal pages will add them: Q1) | — | — |

## Temporary or partial assets

| Asset | Why partial | Needs | Since |
| --- | --- | --- | --- |
| `/favicon.ico` (16 + 32 px), `/favicon.png` | the client's only icon is 32 px; no 48 px icon (Google's minimum), apple-touch-icon or manifest | a master logo (Q33) | 2026-10-09 |

## New copy for the client to approve

Metadata (titles and descriptions, both locales): the table in `site/seo.md` § Metadata table, as shipped in
`web/src/lib/meta.ts` and the fr catalog (FR rows tightened 2026-10-09 to fit 60 / 155 characters; `meta.test.ts`).

| Where | en | fr (new French, for review) |
| --- | --- | --- |
| 404 heading | Page not found | Page introuvable |
| 404 lead | This page does not exist or has moved. | Cette page n’existe pas ou a été déplacée. |
| 404 links heading | Where to go from here: | Pour continuer : |
| Header, phones | Apply (short for "Apply for housing") | Postuler |
| Menu | Menu · Call us · Language | Menu · Appelez-nous · Langue |
| Nav label (hidden) | Main | Principale |
| Skip link | Skip to content | Aller au contenu |
| New-tab links (hidden) | (opens in a new tab) | (s’ouvre dans un nouvel onglet) |
| Footer addresses | Office · Registered office (postal address) · Open in Google Maps | Bureau · Siège (adresse postale) · Ouvrir dans Google Maps |
| Footer legal row | Privacy policy · Legal notice | Politique de confidentialité · Mentions légales |
| Credits dialog | by · modified (optimised for the web) · Lead Developer | par · modifié (optimisé pour le web) · Développeur principal (existing) |
| Partner strip | Our partners · European Solidarity Corps · Ministry of Housing and Spatial Planning · Ministry of Justice · André Losch Fondation · Gestion locative sociale | Nos partenaires · Corps européen de solidarité · Ministère du Logement et de l’Aménagement du territoire · Ministère de la Justice · André Losch Fondation · Gestion locative sociale |

## French fixes (the client's French, corrected so it reads natural; listed, not silent) [user 2026-10-09]

| English | Before (2025) | After | Why |
| --- | --- | --- | --- |
| Learn more | Apprendre encore plus | En savoir plus | calque; the standard French CTA |
| Rent your property (nav) | Louez votre propriété | Louez votre bien | « propriété » reads as an estate; the owner page and the slug say « bien » |
| Rent out your **property** (home H1) | propriété | bien | same |
| Cheers to them! (credits) | Santé à eux ! | Merci à eux ! | « Santé » is a drinking toast |
| TEC Conference (nav) | TEC Conference | Conférence TEC | English in the French site; matches the FR page and slug |
| Personal Interview | Entretien personnel | Entretien individuel | the usual term |
| Why Rent to Us? | Pourquoi nous louer ? | Pourquoi nous confier votre bien ? | « nous louer » also reads "rent us" |
| Give youth a chance for a **better future** | Donner aux jeunes une chance pour **un avenir meilleur** | Donner aux jeunes la chance d’**un avenir meilleur** | calque ("une chance pour") |
| Partnering with us means… | Devenir partenaire avec nous, c’est… | Devenir notre partenaire, c’est… | « partenaire de », not « avec » |
| We are a trusted… Ministry of Housing | …le Ministère du Logement. | …le ministère du Logement. | French capitalisation in running text |
| We prioritize… including gender diversity when possible | …en incluant une diversité de genre lorsque cela est possible. | …en veillant à la mixité de genre lorsque c’est possible. | calque; « mixité » is the French term |
| every French string | plain space before `: ; ! ?` and `»` | no-break space (U+00A0) | French typography, whitespace only (`i18n.md` § Formatting) |

Kept as written (checked): « Postulez maintenant » (« postuler » is the usual verb for a colocation), « Voici comment
cela fonctionne », « Qui sommes-nous », « À la recherche d’un logement », the mission line.

## Obvious typo fixes in existing French (listed, not silent)

| Key / place | Before | After |
| --- | --- | --- |
| `projectSportDescriptionWeSparkProjects` | « sans pressionni jugement » | « sans pression ni jugement » |
| same | « du mondequi les entoure » | « du monde qui les entoure » |
| `Educator` (both locales) | « un.e éduacteur.trice » | moot: Jobs retired, not migrated |

## English slips (fixed as their pages migrate, listed here) [user 2026-10-09]

"aged 18 - 34" (elsewhere "18–34"); "as soon as place becomes available" (→ "a place"); "If any issue arrives" (→
"arises"). "We prepare each property for sale, long-term use" ("sale" in a rental offer) waits for Q25: a meaning,
not a grammar fix.
