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
| Home contact, office map (click to load) | Show map · The map loads from Google Maps when you ask for it. · Map: {address} (frame title) | Afficher la carte · La carte se charge depuis Google Maps à votre demande. · Carte : {address} |
| Owners contact, email subject | Renting my property | Louer mon bien |
| About us, gallery | Pictures of our shared houses · Previous picture · Next picture | Photos de nos colocations · Photo précédente · Photo suivante |
| About us, group photo alt | The Youth Work Synergy group, about twenty people cheering outdoors | Le groupe Youth Work Synergy : une vingtaine de personnes, bras levés, en plein air |
| We Spark, a text in the other language (Q35 fallback) | (in French) · (in English) | (en français) · (en anglais) |
| We Spark, Projet V button → the TEC page | The closing conference | La conférence de clôture |
| We Spark, photo alts (`src/data/projects.ts`: 6 Get Your Home, 4 Locked Out, the Safe Paths poster; logos decorative, alt "") | what each photo shows; no names, roles or genders guessed ("Workshop handouts on a table at Get Your Home", "Four people in front of the Locked Out title on the cinema screen"…) | « Les supports de l’atelier Get Your Home posés sur une table », « Quatre personnes devant le titre Locked Out projeté sur l’écran du cinéma »… (all in `web/scripts/fr-manual.json`) |
| TEC, the past-event line (Q8) | This event took place on {date}. | Cet événement a eu lieu le {date}. |
| TEC, rewritten in the past (Q8; the client's English otherwise) | "Join us for the closing conference … and discover how" → "The closing conference … showed how"; "Hosted on Zoom™" (a link) → "Held online on Zoom"; "we will launch … present … introduce" → "we launched … presented … introduced"; "This conference is an opportunity" → "was"; "The programme … is as follows" → "was"; "What we will present" → "What we presented"; "Who is it for?" → "Who was it for?", "This conference is for" → "was for", "this event will offer insights" → "the resources at tecpractices.eu offer insights"; "Join us!" → "Join the conversation", "We invite you to join us, explore …" → "We invite you to explore …"; "Register on Zoom™" / "Register here" → "Visit tecpractices.eu"; Q&A "Beginning at 9 April 2026, 14:30-15:30" → "9 April 2026, 14:30–15:30"; "Online via Zoom." kept, the recording promise and the Registration card dropped | the whole page is new French (no French existed): « Bien plus qu’une méthode », « Pourquoi cette conférence est importante », « Programme de la conférence », « Questions-réponses », « Ce que nous avons présenté », « À qui s’adressait-elle ? », « Prenez part à la conversation », « Découvrir tecpractices.eu », « Porté par… », TEC = « cycle de formation et d’évaluation »… (all in `web/scripts/fr-manual.json`) |
| TEC, poster alt | The conference poster: "Much More Than A Method!", an hour online on 9 April 2026, 14:30–15:30, an illustrated young woman looking through a lens, the NINFEA, Youth Work Synergy and Kultur Nest e.V. logos and "Co-funded by the European Union" | L’affiche de la conférence « Much More Than A Method! » : une heure en ligne le 9 avril 2026… |
| TEC, globe section name (hidden) · partner countries | About the project · Italy · Germany · Luxembourg | À propos du projet · Italie · Allemagne · Luxembourg |
| About us, house pictures alt (7, `src/data/houses.ts`) | A YWS shared house in Luxembourg: \<what the photo shows\> (no village, Q40) | Une colocation YWS au Luxembourg : \<ce que montre la photo\> |

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
| Rent out your property — **Give youth a chance for a better future** (About us) | — Donnez une chance à la jeunesse pour un avenir meilleur | — donnez aux jeunes la chance d’un avenir meilleur | calque, and no capital after the dash; same wording as the home fix |
| We turn empty houses into real homes — and change lives **in the process** | …et changeons des vies en cours de route. | …et changeons des vies au passage. | « en cours de route » means "midway"; calque |
| …for many aged 18–34… (About us) | pour beaucoup de 18 à 34 ans | pour beaucoup de jeunes de 18 à 34 ans | the noun was missing |
| We are a Luxembourg-based non-profit (ASBL) with GLS… Ministry of Housing | …le Ministère du Logement… | …le ministère du Logement… | French capitalisation in running text |
| We provide fully furnished rooms… with support, coaching, and a safe environment | du coaching, et un cadre sécurisé | du coaching et un cadre sécurisé | no serial comma before « et » in French |
| Interested in renting your property to us? | Intéressé(e) à louer votre bien à notre organisation ? | Vous souhaitez nous louer votre bien ? | « intéressé à » is an anglicism; one natural question |
| Property Flexibility · Property Maintenance (owners cards) | Flexibilité de la propriété · Entretien de la propriété | Flexibilité d’usage · Entretien du bien | « propriété » again (see the nav fix) |
| Get Your Home, Locked Out (French titles) | Atelier Jeunesse sur le Logement · Regard Jeune sur le Logement | atelier jeunesse sur le logement · regard jeune sur le logement | English Title Case; French capitalises the first word only |
| Locked Out text | “Locked Out” est un projet… | « Locked Out » est un projet… | French quotation marks |
| Safe Paths text | le ministère de la justice | le ministère de la Justice | the ministry's name takes the capital |
| Girlssective, expected results | …les compétences nécessaires pour naviguer les défis de l’intégration | …pour faire face aux défis de l’intégration | « naviguer » takes no object (calque of "navigate challenges") |
| Sport, key activities | …en louant un espace, recruter les participants, acheter le matériel, etc… | …en louant un espace, en recrutant les participants, en achetant le matériel, etc. | the list keeps its « en »; « etc. » takes no ellipsis |
| Sport, expected results | …s’intègrent dans notre société. Afin qu’ils puissent profiter… | …s’intègrent dans notre société, afin qu’ils puissent profiter… | a sentence cannot stand on « Afin que » alone |
| Sport, expected results | En assistant à nos séances, nous espérons qu’ils éprouveront moins de solitude. | Nous espérons qu’en assistant à nos séances, ils éprouveront moins de solitude. | dangling participle: the young people attend, not « nous » |
| Projet V title | Projet V - Comprehensive Guide… – Erasmus + | Projet V – Comprehensive Guide… – Erasmus+ | one dash style; the programme's spelling |
| Girlssective, Self Chronicle titles (both locales) | (2024-2025) | (2024–2025) | an en dash for a range |
| every French string | plain space before `: ; ! ?` and `»` | no-break space (U+00A0) | French typography, whitespace only (`i18n.md` § Formatting) |
| every French string | straight apostrophe (') between letters, mixed with ’ | typographic apostrophe (’) | one apostrophe style; `catalogs.test.ts` checks it |

The project texts' fixes are applied by `web/scripts/import-projects.mjs` (`TYPOS`, French typography) after the
word-for-word copy, so the client's text stays reproducible from the 2025 dictionary (`i18n.md` § Project texts).

Kept as written (checked): « Postulez maintenant » (« postuler » is the usual verb for a colocation), « Voici comment
cela fonctionne », « Qui sommes-nous », « À la recherche d’un logement », the mission line.

## Obvious typo fixes in existing French (listed, not silent)

| Key / place | Before | After |
| --- | --- | --- |
| `projectSportDescriptionWeSparkProjects` | « sans pressionni jugement » | « sans pression ni jugement » |
| same | « du mondequi les entoure » | « du monde qui les entoure » |
| `Educator` (both locales) | « un.e éduacteur.trice » | moot: Jobs retired, not migrated |

## English slips (fixed as their pages migrate, listed here) [user 2026-10-09]

Fixed in slice 0 (home, owners, about; the French was already right and is kept): "aged 18 - 34" → "aged 18–34"
(home Who we are, About us hero); "as soon as place becomes available" → "a place"; "If any issue arrives" →
"arises"; "30-40%" → "30–40%". Fixed with the TEC page: "the project and the website Presented by Youth Work Synergy (YWS)" → "the project and the
website, presented by …"; "V - Comprehensive Guide" → "V – Comprehensive Guide" (as in the page's metadata). Fixed with the We Spark page: spaced hyphens used as dashes → "—" ("peer support —
empowering…", "filmmaking — from storytelling to camera work — and…"); "(2024-2025)" → "(2024–2025)". Waiting: "We prepare each property for sale, long-term use" ("sale" in a rental
offer) waits for Q25: a meaning, not a grammar fix.
