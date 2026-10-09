# Brand

> Owns: the identity in three lines, name rules, voice per locale (analysed from the real copy in `lib/dictionary.tsx`),
> microcopy rules and the standard labels, words to avoid, claims never to make. Neighbours: the organisation's facts
> (addresses, phones, status) → `content-model.md`; who reads it → `audience.md`; the look → `design.md`; title
> patterns and metadata → `seo.md`; FR typography encoding, catalogs and the typo list → `i18n.md`; the register of new
> strings awaiting approval → `placeholders.md`.

## Identity in three lines

1. **Playful and colourful:** orange and purple, sparkles, line shadows, a 3D house, wardrobe and rocket: a youth
   organisation that does not look like a ministry form [repo: components; `design.md`].
2. **Warm and direct:** it talks to young people and owners as "you" / « vous » and says what it can and can't do.
3. **Serious where trust and money are at stake:** owners get the guarantees, the figures and the legal frame
   (gestion locative sociale, Ministry of Housing) in plain words.

- Tagline (home H2): "Give youth a chance for a better future" / « Donner aux jeunes une chance pour un avenir meilleur ».
- Mission line (About; reusable in the footer): "We help young people transition into independent, fulfilling lives by
  combining access to housing with educational and emotional support." / « Nous aidons les jeunes à faire la transition
  vers une vie indépendante et épanouissante en combinant un accès au logement avec un accompagnement éducatif et
  émotionnel. » [repo: `ourMissionDescriptionAboutUs`]

## Name rules

| Use | Write | Never | Source |
| --- | --- | --- | --- |
| Site name (title suffix, `og:site_name`, `WebSite.name`) | **Youth Work Synergy** | "Youth - Work - Synergy" (Google's invented title), "Youth Work Synergy (YWS) Logo" | brief § P6; [research: seo-structured-data § 1.3] |
| `alternateName` | **YWS** (+ "Youth Work Synergy ASBL") | "YWS" alone in a `<title>` or H1 (autocomplete → "yws lukko") | [research: audiences-keywords F9] |
| Legal name | "Youth Work Synergy ASBL" (footer ©); the registered form is Q1 | an RCS number in copy before Q1 is answered | `content-model.md` |
| Logo alt | "Youth Work Synergy" | "… Logo" | brief § P6 |
| Status | "gestion locative sociale (GLS)" / "social rental management"; the copy's "GLS (Gestion Locative Sociale) status" | "GLS" alone in a title, H1 or description (it means the parcel company) | [research F9] |
| Projects | "We Spark Projects" as the on-page label; FR « Nous donnons vie à des projets » (existing) | "We Spark" as a search target | [research: audiences-keywords § 3] |
| TEC | first mention "Training and Evaluation Cycle (TEC)" / « cycle de formation et d'évaluation (TEC) » (new FR) | "TEC conference" alone in a title (US events) | [research S23, S24] |
| Partners | "Fondation Sommer", "André Losch Fondation", "Erasmus+", "European Solidarity Corps" (new FR: « Corps européen de solidarité »), "Ministry of Housing" / « Ministère du Logement » | "Fondation Summer"; the 2014–20 Erasmus+ logo (Q21) | [repo], HANDOFF § 5 |

## Voice and tone

- **Three words:** warm, direct, hopeful.
- **Address:** EN "you" with contractions ("We're here to help", "we'll contact you"); FR « vous » everywhere, young
  people included. « tu » would change the feel: the client's call, not a default.

| Audience | Register | en (verbatim) | fr (verbatim) |
| --- | --- | --- | --- |
| Young people | a question, reassurance, honest limits | "Are you between 18 and 34 and in need of stable, affordable housing in Luxembourg?" · "We're here to help" · "we can't help everyone right away — but we review each request with care and responsibility." | « Vous avez entre 18 et 34 ans et vous cherchez un logement stable et abordable au Luxembourg ? » · « Nous sommes là pour vous aider » |
| Owners | benefits, money and doing good, confident | "Partnering with us means doing good and making a smart financial choice" · "you receive guaranteed rent every month, no exceptions" | « Louer à YWS signifie sérénité, loyer garanti et utilité sociale de votre bien. » |
| Partners | mission + numbers since a year | "Since 2023, we've already opened 9 shared houses across the country" | « Depuis 2023, nous avons déjà ouvert 9 colocations à travers le pays » |
| Celebration | exclamation marks, playful | "Youth-Led Projects!" · "Cheers to them!" | « Projets menés par des jeunes ! » |

**English, as written:**
- Title Case for section headings ("Why Rent to Us?", "Who Gets Priority?", "Our Selection Process"); sentence case for
  nav and buttons ("Apply for housing", "Rent your property", "Contact us"). New strings follow the same split.
- Questions as headings ("Looking for housing?", "Interested in renting your property to us?").
- A spaced em dash for asides, in both locales (house style).
- Slips fixed as their pages migrate, each listed (`placeholders.md`) [user 2026-10-09]: "aged 18 - 34" (elsewhere "18–34"); "as soon as place becomes
  available" (missing "a"); "If any issue arrives" (arises); French text inside the EN dictionary (3 projects and
  `heroDescriptionJobs`); "We prepare each property for sale, long-term use" ("sale" in a rental offer, both locales: Q25).

**French, as written:**
- Native, not literal, at its best: Affordability → « Loyers accessibles », Coaching → « Accompagnement », "safe,
  reliable & impactful" → « sûr, fiable et utile », "Let's Talk" → « Parlons-en ». New French matches this standard.
- Literal spots are **fixed and listed** (`placeholders.md` § French fixes) [user 2026-10-09]: « Apprendre encore
  plus » → « En savoir plus »; « Louez votre propriété » → « Louez votre bien » (the owner page's word and the slug
  `louer-son-bien`); « Santé à eux ! » (a toast) → « Merci à eux ! »; « Pourquoi nous louer ? » → « Pourquoi nous
  confier votre bien ? ». « Postulez maintenant » stays: « postuler » is the usual verb for a colocation.
- Sentence case; a space before ? ! : ; as in « Qui a la priorité ? » (how it is encoded: `i18n.md`); « 90 % » with a
  space (EN "90%").
- « colocation(s) » for the shared houses (the copy's word and a searched one); « jeunes » for the people.
- Inclusive forms are mixed (« participant·e·s », « Intéressé(e) », « un.e éduacteur.trice »): new French uses the
  middle dot or a neutral rephrase [assumption] (Q30).

## Microcopy rules

1. **CTAs** are a verb + object, existing labels first: "Apply for housing", "Apply now", "Rent your property",
   "Contact us", "Learn more", "See for yourself". Never "Click here", "Submit" (no forms) or "Register" (TEC is past).
2. **One primary action per section**; secondary actions look secondary.
3. **Link text names the destination.** Several "Learn more" on one page keep the visible label and add hidden
   context after it ("Learn more" + sr-only " about Get Your Home"), never a replacing `aria-label` (WCAG 2.5.3, `lessons.md`).
4. **Leaving the site:** Google Forms, socials, partners, tecpractices.eu and Google Maps open in a new tab with a
   visible ↗ (aria-hidden) and hidden "(opens in a new tab)". The Apply button names the destination too.
5. **Phones:** a visible label + the number formatted "+352 28 66 22" / "+352 661 597 312", each its own `tel:` (E.164
   in `content-model.md`). Label "Phone" / « Téléphone » for both until Q2; never invent "Mobile", "Office" or hours.
6. **Email:** the address is the visible text (contact@yws.lu); `mailto:` with a prefilled subject per audience; a
   Copy button beside it. Never `[at]` obfuscation.
7. **Numbers and dates:** figures come from `statistics.ts` or the dictionary with the client's qualifier ("over 40"); never
   round up or add "+". New dates "9 April 2026" / « 9 avril 2026 »; existing dates stay verbatim. Ages: "18–34" in
   titles, "between 18 and 34" / « entre 18 et 34 ans » in sentences (both exist).
8. **Language switcher:** autonyms "English" / "Français"; never flags or a bare "EN/FR" (`lessons.md`).
9. **Emoji** only where the client put them (the credits dialog: "Credits 💖", "✌️"); none in titles, descriptions or buttons.
10. **Legal pages:** formal, numbered, facts only, no brand voice (`compliance-and-data.md`).

## Standard labels

Existing = in the dictionary. New = needs the client's approval; register each in `placeholders.md` (FR marked for review).

| Purpose | en | fr | Status |
| --- | --- | --- | --- |
| Apply button · nav housing | Apply now · Apply for housing | Postulez maintenant · Demander un logement | existing |
| Nav owners · contact | Rent your property · Contact us | Louez votre bien (fixed) · Contactez-nous | existing |
| New tab (hidden) | (opens in a new tab) | (s'ouvre dans un nouvel onglet) | new (in the spike) |
| Apply destination (hidden) | (Google Form, opens in a new tab) | (formulaire Google, s'ouvre dans un nouvel onglet) | new |
| Call · email | Call {number} · Email us | Appeler le {number} · Nous écrire | new |
| Copy | Copy email · Copy address · Copied | Copier l'adresse e-mail · Copier l'adresse · Copiée | new |
| Map facade · map link | Show the map (loads Google Maps) · Open in Google Maps | Afficher la carte (charge Google Maps) · Ouvrir dans Google Maps | new |
| TEC primary | Visit tecpractices.eu | Découvrir tecpractices.eu | new (Q8) |
| Chrome | Menu · Main · Language · Skip to content · Our partners · Call us | Menu · Principale · Langue · Aller au contenu · Nos partenaires · Appelez-nous | new (in the spike) |
| 404 heading · lead · links | Page not found · This page does not exist or has moved. · Where to go from here: | Page introuvable · Cette page n’existe pas ou a été déplacée. · Pour continuer : | new |
| Email subjects | Housing question · Renting my property to YWS · Partnership · TEC Practices | Question sur un logement · Louer mon bien à YWS · Partenariat · TEC Practices | new |

## Words to avoid

| Avoid | Why | Use instead |
| --- | --- | --- |
| "GLS" or "YWS" alone in a title or H1 | ambiguous searches [research F9] | the full name; "gestion locative sociale" |
| "social housing" / « logement social » for YWS's homes | that is the public sector and the RENLA register [research S13] | the copy's "affordable" / « abordable », "shared homes" / « colocations » |
| "student housing" / « logement étudiant » | whether students qualify is Unknown (Q24) | "young people aged 18 to 34" |
| "up to" before the tax figure | ACD: a flat 90 % from tax year 2024 [research F1] | the figure the client confirms (Q17) |
| "risk-free" / « sans risque » | a promise the client never made | the client's "worry-free" / « sans tracas » |
| "Register", "Join us", « Inscrivez-vous » on TEC or past workshops | the dates are past (Q8, Q9) | "took place on", "Visit tecpractices.eu" |
| "Jobs", "We're hiring", « Offres d'emploi » | the page is retired [user 2026-10-09] | — |
| "youngsters", "kids" | the copy says "young people" / « jeunes » (`youngsters` is only a database column) | "young people", "residents" |
| "Click here", "here", "Submit" | no destination; no forms | microcopy rule 1 |

## Claims never to make

- A guaranteed room, place or timeline for young people (the copy says "we can't help everyone right away").
- Two different tax figures on one site ("up to 90%" on home, "90%" on the owner page today), or any figure other than
  the one the client confirms with its legal reference and a "checked on" date (Q17; guichet.lu still says 75 %).
- Tax-deductible donations: YWS is not on the ACD list of approved recipients [research F10].
- Membership of Jugendwunnen, RENLA or a public housing scheme; "approved by" or "funded by" a ministry beyond the
  client's words ("GLS status", "working in collaboration with the Ministry of Housing"); EU funding for a project the
  copy does not name (Q21).
- Prices, waiting or response times, owner counts, testimonials, insurers, lease terms, office hours: client only.
- A TEC recording or resources the client hasn't confirmed (Q8).
- Compliance labels ("GDPR compliant", "fully accessible"): facts only (`compliance-and-data.md`).
- A statistic without its date (the statistics are dated 2025-07-09).
