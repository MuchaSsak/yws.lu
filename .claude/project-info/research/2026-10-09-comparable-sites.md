# Comparable sites: Luxembourg housing and youth actors, European youth-housing non-profits

Research for the yws.lu revamp (P1, comparable sites). All sites checked **2026-10-09**. Patterns only: nothing here is a
proposal to copy any site's design or copy.

**Method.** Content and IA through WebFetch (rendered text). Head tags from the raw HTML (curl + a parser: `<title>`,
meta description, canonical, `hreflang`, `<html lang>`, JSON-LD `@type`s, viewport, `<form>` count, `tel:`/`mailto:`
links). Mobile (390×844, touch) and desktop (1440×900) observed with the project's Playwright: fixed/sticky bars,
first-viewport tap targets, horizontal overflow, screenshots. **No clicks, no menus opened, no consent given**, so every
screenshot still shows the cookie banner (which is itself a finding). Screenshots stay in the session scratchpad, not
in the repo.

## 0. Sites studied

| # | Site | Type | Why comparable to yws.lu | Pages checked |
|---|---|---|---|---|
| 1 | fondation-logement.lu (Fondation pour l'Accès au Logement / AIS; ais.lu 302s here) | LU, social rental management (GLS) | The country's largest GLS actor, so the owner and applicant journeys are the same as YWS's | `/agence-immobiliere-sociale/`, `/` |
| 2 | wunnengshellef.lu | LU asbl, GLS + youth housing ("jugend-wunnen") | Same audiences as YWS: owners, applicants, social workers, member organisations | `/`, `/prorpietaire-de-logement`, `/jugend-wunnen`, `/book-online` |
| 3 | inter-actions.lu | LU asbl, social services incl. youth housing | Youth-housing service page (Jugendwunnen Leideleng, ages 18–26) | `/`, `/type_portfolio/jugendwunnen-leideleng/` |
| 4 | hut.lu (Hëllef um Terrain, took over Caritas's social services and its GLS convention in 2024) | LU asbl, social services + GLS | Owner page with no form, NGO JSON-LD, FR/EN/DE | `/`, `/vous-souhaitez-aider/louez-nous-votre-bien`, `/de`, `/en` |
| 5 | croix-rouge.lu | LU, large NGO (also a GLS partner) | Best LU multilingual setup seen; mobile action bar | `/fr/`, `/en/` |
| 6 | snhbm.lu | LU public developer (buy/rent) | Owner/renter routing, legal identity in the footer | `/` |
| 7 | fondsdulogement.lu | LU public landlord | Navigation by audience, in the first person | `/fr`, `/de`, `/en` |
| 8 | logement.public.lu + guichet.public.lu | LU government | Where owners find GLS partners. **Lists YWS** (see § 5) | logement.lu `/fr.html`, `/fr/locataire/gestion-locative-sociale.html`, `/fr/professionnels/gestion-locative-sociale.html`, `/fr/proprietaire/logement-location.html`; guichet "Opter pour la gestion locative sociale" |
| 9 | snj.public.lu (snj.lu 301s here) | LU state youth service | Youth sector, youth-work events (relevant to the YWS conference) | `/`, `/en/`, `/event/foire-vum-jugendsecteur-2/` |
| 10 | jugendinfo.lu | LU youth information | Tone and channels for young people (WhatsApp), topic navigation | `/`, `/de/` |
| 11 | centrepoint.org.uk | UK youth-homelessness charity | Strongest "get help" journey for young people; trust in the footer | `/`, `/do-you-need-help`, `/about-centrepoint/contact-us` |
| 12 | habitatjeunes.org (UNHAJ) | FR, national youth-housing network | Hero that states eligibility, map of residences, stat trio | `/`, `/carte-des-logements/`, one residence page |
| 13 | aljt.com | FR, youth-housing provider (Île-de-France) | Sticky "apply" CTA, audience "spaces", video testimonials | `/` |
| 14 | fedais.be | BE, federation of Brussels AIS | Cleanest navigation by audience (owners / tenant candidates), contact and FAQ split per audience | `/`, `/contacter-une-ais-proprietaire`, `/faq-proprietaire` |

Looked at but not analysed: caritas.lu (a reduced transitional site after the July-2024 fraud, homepage `robots: noindex`,
services moved to HUT), youth.lu (an almost empty Drupal shell, 18 KB, no meta description), anelo.lu (did not resolve).

## 1. Per-site notes

### 1. Fondation pour l'Accès au Logement / AIS (LU)
- **IA:** a long single page. Header: "Contact" anchor + logo + hamburger. Sections by audience, each opening with a
  "Vous êtes … ?" heading: owner ("Vous avez un bien immobilier à louer?"), social service, person in precarity. A
  donation block, team directory, contact.
- **Audience routing:** owners get 5 benefits (guaranteed rent, maintenance, availability, a 90 % tax exemption, support),
  then the phone number. Applicants are told plainly that they **cannot apply directly** (a third-party social service
  must refer them) and get the document list plus a downloadable guide. Social services: official forms only.
- **CTAs:** "Faire un don" twice (the first H1 on the page is the donation appeal); the phone as a large tel link.
- **Contact:** **has a contact form** (a subject dropdown with 9 audiences: owner, housing search, application follow-up,
  land sale, commune/state, developers, social workers, journalists, other) + a staff email directory (10+ individual
  addresses) + extension numbers + address linked to Google Maps.
- **Trust:** a "leader" claim and tax-deductibility info; no figures, logos, testimonials or press.
- **Footer:** © 2026, Mentions légales, GDPR, designer credit. No socials, no languages.
- **Head:** title "Page – Brand" (the home title repeats the brand twice); **no meta description**; canonical OK; Yoast
  WebSite/WebPage only (no Organization); WordPress 5.2.4; viewport `maximum-scale=1` (pinch zoom blocked).
- **Mobile:** the Cookiebot first layer shows "Autoriser tous les cookies" + "Afficher les détails", with **no reject
  button at the same level**; the modal covers most of the first viewport.
- **Better than a typical small NGO site:** explicit audience sections; honest "you can't apply directly, here is the route"; tel links.
  **Worse:** no meta description, a donation H1 above the mission, a form plus a long staff directory instead of routing, zoom blocked.

### 2. Wunnengshëllef (LU)
- **IA:** accueil, infos (submenu: propriétaire de logement / demandeur de logement / travailleur social / organisation /
  liens utiles), services (klassesch-wunnen, jugend-wunnen, etape21), qui sommes-nous, contact, FAQ, "Réservation en
  ligne", JOBS, plus Wix leftovers: **Log In and a shopping cart "0"**.
- **Audience routing:** **4 audience tiles in the hero** (propriétaire / demandeur / travailleur social / organisation)
  + an owner callout on the hero image. The youth page states the eligibility (secondary school, 18+, needs social support)
  and that **the school's social worker (SePAS) makes the request**: a clear "who applies" route.
- **Owner page:** benefits (up to 90 % exemption citing art. 115/22a LIR, guaranteed rent, tenant selection, technical
  service, social support), a 4-step "how it works", phone + email. **URL typo** (`/prorpietaire-de-logement`; the
  correct spelling returns 404).
- **Dead end:** "Réservation en ligne" in the main nav leads to a Wix booking page with nothing to book.
- **Contact:** address; email written as `info [a] …` (not clickable); owner phone as plain text; no form.
- **Trust:** RC number, government approvals, "reconnue d'utilité publique", founded 1988, number of member associations
  and state partners, IBAN. The meta description gives a **different member count** from the page body.
- **Footer:** logo, © 2016–2024 (stale), legal registration, address, email, Facebook, impressum.
- **Head:** Wix; `<html lang="en">` on French content; title "Brand | Luxembourg | Brand asbl"; meta description
  present; JSON-LD LocalBusiness + PostalAddress. FR only (`/en` 404).
- **Mobile:** the Wix mobile layout is 320 px wide; the **first element is an embedded Facebook page widget**, then the
  hamburger, logo, JOBS button and cart; a floating chat bubble.
- **Better:** the audience tiles are the right idea, "who applies" is explicit, legal identity is complete. **Worse:**
  dead-end nav item, platform leftovers, unclickable email, wrong `lang`, stale ©.

### 3. Inter-Actions (LU)
- **IA:** ACCUEIL, INTER-ACTIONS (about), QUARTIERS (18 localities), THEMES (8 themes incl. emergency housing and youth),
  NEWS, JOBS, FORMATIONS. Services can be found two ways (by place, by theme).
- **Service page template (strong):** Objet / Activité / Population cible et conditions d'accès / Heures d'ouverture /
  Nom des responsables / Contact. The Jugendwunnen page gives the age (18–26), how to start (contact the team for a first
  appointment, then bring documents), opening hours, a named lead, phone, email and address. No form.
- **Footer:** address, phone, fax, email, RCS number, Mentions légales, CGU.
- **Head:** **empty `<title>`**, **no `lang` on `<html>`**, no meta description, no JSON-LD. FR only.
- **Mobile:** horizontal overflow (scrollWidth 410 at 390); the news cards are about 570 px tall each.
- **Better:** a consistent "facts box" on each service page (who, conditions, hours, contact). **Worse:** basic SEO
  missing, overflow, home page is a news feed rather than routing.

### 4. HUT – Hëllef um Terrain (LU)
- **IA:** 4 target-group categories (homeless / precarity / refugees & migrants / children, youth & families) + "Qui
  nous sommes" + "Vous souhaitez aider?" (owners, volunteers, donors). Utility: FR/EN, search, "Bénévolat J'agis",
  "je fais un don".
- **Owner page ("Louez-nous votre bien!") with no form:** what GLS is → "win-win" benefits (90 % on net rental income,
  rent guaranteed even when the home is empty, maintenance, the right to take the home back for personal need, no direct
  contact with the occupant) → **a social-proof figure** (60+ owners already trust them) → "Intéressés? Parlons-en!" with
  **a named staff member, direct mobile and email**.
- **CTAs:** a dual band (volunteer / donate) fixed in the header on mobile (header **100 px = 12 % of an 844 px
  viewport**); preset donation amounts on the home page.
- **Contact:** address, phone and email as text in the footer (no `tel:` link on the home page); newsletter form.
- **Trust:** board, founding members, partners & membership page, IBAN + QR, "Signaler un abus", feedback link.
- **Head (best LU NGO head seen):** title "Brand – what they do"; meta description; **`hreflang` fr/en/de + `x-default`**;
  **JSON-LD `NGO` + `PostalAddress`**, BreadcrumbList, NewsArticle. **But** `/de` serves French content under
  `lang="de"` (declared in hreflang, missing from the switcher), the home H1 is "Page d'accueil" (hidden) and the
  visible heading is a generic welcome.
- **Better:** a near-ideal no-form owner journey; structured data. **Worse:** generic hero, untranslated locale, tall fixed header.

### 5. Croix-Rouge luxembourgeoise (LU)
- **IA:** Nos engagements / Nous aidons / Ils ont besoin de vous / Aide humanitaire / Nous rejoindre; tabs "Au
  Luxembourg | À l'international"; utility: Faire un don, Don du sang, the phone number, search, languages.
- **CTAs:** sticky desktop header with the two actions; **mobile: a fixed bottom bar (56 px) with the 2 primary actions**.
  The hero is a 4-slide carousel led by an employer-branding campaign (mission diluted).
- **Contact:** address, PO box, phone with hours (Mon–Fri 7–18) and the reassurance that **calls are anonymous**, IBAN;
  no email on the home page; feedback link.
- **Owner offer:** it exists (a guarantee scheme + GLS, a 90 % exemption, a real-estate email and phone) but was found **only in
  PDFs via search**, not in the navigation.
- **Trust:** the "Don en confiance" code, ethics/conduct code, Stratégie 2030, governance.
- **Languages (best seen):** text labels **"Français | English | Deutsch"** in the header and footer, each link with `lang` +
  `hreflang`; `/fr/ /en/ /de/` prefixes; **reciprocal hreflang + `x-default`**; titles and descriptions localised;
  `og:locale` + `og:locale:alternate`; Yoast Organization/WebSite/Breadcrumb JSON-LD.
- **Worse:** `user-scalable=no` (zoom blocked); owner information in PDFs; carousel.

### 6. SNHBM (LU)
- **IA:** Projets (Vente / Location), Réalisations, Société, Actualités, Jobs, Contact; sticky header that includes socials.
- **Audience routing:** 3 large **question-style blocks** mid-page (buy? rent? parking/shop?), each with a short fact
  (e.g. size of the rental stock).
- **Trust:** "a century of expertise", the share of the population that is eligible, registration numbers (matricule, VAT, RCS).
- **Footer:** sitemap column, useful links (FAQ, eligibility…), contact (address + `tel:` link); legal row incl.
  **consent settings**; 4 socials.
- **Head:** good meta description; Yoast Organization; FR only (`/en/` 404). The home H1 was the current news slide.
- **Better:** question blocks, legal identity. **Worse:** H1 tied to a slide, no email on the home page.

### 7. Fonds du Logement (LU)
- **IA (strong):** main nav **in the first person by intent**: "Je cherche à louer", "Je cherche à acheter", "Je suis
  locataire", "Je suis propriétaire"; secondary utility row (À propos, Actualités, Publications, Biens disponibles,
  Projets, Offres d'emploi, search). Hero: a "Que recherchez-vous ?" box with 3 choices + an eligibility check.
- **Contact:** office hours on the home page; "Contacter le Fonds" link; no phone or email on the home page.
- **Footer:** a single legal row: Contact, Notice légale, **Accessibilité**, Données personnelles, Lanceur d'alerte, Cookies.
- **Head:** title "Page d'accueil | Brand"; **no meta description**, `og:url` only, no JSON-LD; **`/de` and `/en` return
  200 with the French page under `lang="de"`/`"en"`** (same title, not in any switcher, no hreflang): duplicate content.
- **Better:** the first-person audience navigation is the clearest LU example. **Worse:** fake locales, thin head.

### 8. logement.public.lu + guichet.public.lu (LU government)
- **logement.lu:** top-level nav **by audience**: Locataire / Professionnel-Commune / Propriétaire / Observatoire de
  l'habitat. The tenant GLS page lists **29 conventioned partners as outbound links, including "Youth Work Synergy
  a.s.b.l" → `https://yws.lu/`** (opens in a new window). The professionals page gives the state participation per home
  per month and FR/DE flyers (last update 05.02.2026). No canonical or JSON-LD on the home page; generic description.
- **guichet.lu GLS page:** a reusable "service sheet" structure: Personnes concernées → Modalités pratiques → Organismes
  conventionnés → Fonctionnement d'un bail → Avantages (owner / tenant / partner) → Organismes de contact → Démarches et
  liens → feedback; breadcrumb; **"Dernière modification 17.04.2024"**; languages "Français | Deutsch | English". Its
  partner list (≈35 incl. communes) **does not include YWS**, and it states the owner tax exemption as **75 %**, while every
  NGO page seen says 90 %.

### 9. SNJ – Service national de la jeunesse (LU)
- **IA:** a short nav (A propos, Publications, Emploi) + "English". The home page has 4 mission pillars, each with "En
  savoir plus". Audiences are routed to **7 satellite domains** (4 for young people, 3 for professionals).
- **Contact:** address, PO box, phone (**not a tel link**), email (entity-obfuscated `mailto:`), a downloadable access
  map. No form.
- **Footer:** SNJ / Publications / Emploi, Facebook/Instagram/YouTube, ©, Mentions légales, **Déclaration d'accessibilité**.
- **Head:** hreflang fr/en (no x-default), `lang` fr-FR / en-GB, **the same `<title>` in FR and EN**, no meta description,
  no JSON-LD.
- **Event page (Foire vum Jugendsecteur, 13.10.2026):** date, time, venue, address, map download, an external
  registration link, phone/email. **Missing:** programme, audience, price, add-to-calendar, Event JSON-LD, meta description.
- **Better:** a calm, accessible public-sector baseline. **Worse:** domain sprawl, same title across locales, a thin event page.

### 10. Jugendinfo (LU)
- **IA:** topic navigation with icons (money & jobs, **housing**, love & sex, mental health, my rights, school), search,
  "Contact"; tagline in the informal "tu" form.
- **Contact:** **a WhatsApp number as a link** (the channel young people use); contact page.
- **Footer:** about / campaigns / podcast / volunteering / reports / jobs; topic links; 6 socials incl. TikTok, Spotify,
  WhatsApp; legal.
- **Languages:** FR/DE flag + code in the top-left; `/de/` prefix; titles and descriptions localised; **no hreflang in
  `<head>`** (WPML puts hreflang only on the switcher `<a>`).
- **Head:** **no H1** on the home page; `user-scalable=0`; Yoast Organization.
- **Better:** youth tone, a WhatsApp channel, topic-first navigation. **Worse:** no head hreflang, no H1, zoom blocked.

### 11. Centrepoint (UK)
- **IA:** "Do you need help?" / "Ending youth homelessness" / "What we do" / "Support us"; utility: **Donate, Get help,
  helpline number**, search.
- **Audience routing:** the hero has 2 CTAs (get help / donate). The help page uses **situation cards in the first
  person** ("I'm a care leaver", "I'm rough sleeping"…) with photo + one line, a helpline CTA at the top, and the
  eligibility (England, 16–25).
- **Mobile:** **a top bar with "DONATE | GET HELP" + a helpline strip** (tel link) above the logo; a floating **"EXIT
  PAGE" (quick exit) button**, 80×80. The cookie layer has 3 equal-weight buttons (Allow all / Customise / Reject All).
- **Contact:** a "Make an enquiry" **form** for non-urgent questions, routed by team; the helpline for young people;
  supporter phone **with hours**; email; address.
- **Trust:** reach figures in the hero; "Real stories"; research reports; **footer registration numbers (charity,
  company, housing association, VAT)** + the fundraising-regulator badge; safeguarding, accessibility and finances links.
- **Head:** **canonical points to `/node/1`** (a CMS internal path); the home meta description is about volunteering
  (it doesn't match the page); no JSON-LD.
- **Better:** a two-audience header that works in one tap, quick exit, verifiable identity. **Worse:** canonical and
  description bugs; a form for the general contact.

### 12. UNHAJ / Habitat Jeunes (FR)
- **IA:** Logements, Actualités, Ressources, Formation, Offres d'emploi, Presse, Intranet + 3 thematic sections (the
  offer, the values, the movement).
- **Audience routing:** the hero card **qualifies the visitor** (age range 16–30 + status list + "looking for housing?")
  → "chercher un logement" + "Voir la carte" (an interactive map of residences). A residence page is a directory card
  (address, phone, email, website): **you apply at the residence, not on the national site**, like YWS's external form.
- **Trust:** **a stat trio** (young people per year / homes / sites).
- **Footer:** 3 link columns, address, socials, legal row, agency credit. No phone or email on the home page.
- **Head:** the **meta description is the audience question** (it answers "is this for me?" in the SERP); Yoast
  Organization; `maximum-scale=1.0`.
- **Mobile:** the "chercher un logement" CTA is a **36×36 arrow icon** (its label exists only as the accessible name).

### 13. ALJT (FR)
- **IA:** Notre association / Notre accompagnement / Nos résidences / Nous rejoindre. **Audience "spaces"**: Espace
  Jeunes / Espace Partenaires / Espace Candidat·e·s. Residences grouped **by age band** (18–25, 26–32, in training).
- **CTAs:** **"Demande de logement" in a sticky header** + "Mon compte"; a hero search (city / type / price).
- **Trust:** hero figures (young people per year, homes); **"Trajectoires": 4 resident video testimonials**; resident
  life posts.
- **Contact:** a guided form ("can't find an answer"); the application is fully online with an account.
- **Languages:** a floating "GB" bubble bottom-right (flag-style, overlaps content); no hreflang.
- **Head:** title "Espace Jeunes Brand | Logement en Île-de-France"; the meta description carries the figures.

### 14. FEDAIS (BE)
- **IA (cleanest):** Accueil / **Propriétaires** / **Candidats locataires** / À propos / **Contacter une AIS** + FR NL.
- **Audience routing:** 3 hero cards (owners / tenant candidates / list of member AIS). **Separate contact pages per
  audience** ("en tant que propriétaire" / "candidat locataire"), **separate FAQ accordions per audience** (owners: tenant
  choice, tax steps, repairs, time to let, existing leases, contract length, selling during the contract, how rent is set,
  standards, renovation grants) ending in a contact CTA.
- **Contact:** a directory of 24 AIS (name, address, phone with hours, `mailto:`, website, logo); federation phone + email; no form.
- **Trust:** **a stat trio** (homes managed / member AIS / years); "approved and subsidised by the Region"; press
  review page; "20 years of AIS" page.
- **Languages:** FR here, **NL on a separate domain** (fedsvk.be). Wix: `<html lang="en">` + `hreflang="en-us"` on a
  French site.
- **Mobile:** 320 px Wix layout; tel link only 13 px tall.

## 2. Cross-site matrices

### 2a. Audience routing and primary CTAs

| Site | Routing device | Header CTA(s) | Sticky? | Mobile primary action |
|---|---|---|---|---|
| FAL/AIS | "Vous êtes …?" sections on one page | Donate, Contact | no | tel link in the contact section |
| Wunnengshëllef | 4 hero tiles + owner callout | JOBS, (dead) booking | no | none; FB widget first |
| HUT | categories by target group; owner page under "Vous souhaitez aider?" | Volunteer, Donate | yes (mobile 100 px) | dual band |
| Croix-Rouge | engagements / "we help" | Donate, Blood | yes (desktop top; mobile bottom bar) | **bottom bar, 56 px** |
| SNHBM | 3 question blocks | none | header sticky | none above the fold |
| Fonds du Logement | **first-person nav by intent** + "what are you looking for?" | none (nav is the CTA) | no | hero choices |
| logement.lu | nav by audience | none | no | n/a |
| SNJ | 4 pillars → satellite sites | language | no | none |
| Jugendinfo | topic tiles | Contact | yes (desktop) | topics |
| Centrepoint | 2 hero CTAs + **first-person situation cards** | **Donate, Get help, helpline** | top bar | **top bar + quick exit** |
| UNHAJ | **eligibility-qualifying hero** + map | none | no | icon-only arrow |
| ALJT | **audience spaces** + age bands + search | **Demande de logement**, Mon compte | **yes** | menu + search |
| FEDAIS | **nav + hero cards by audience**, contact and FAQ per audience | none | no | menu |

### 2b. Contact presentation

| Site | Form? | Phone | Email | Hours | Map | Named person | Other |
|---|---|---|---|---|---|---|---|
| FAL/AIS | **yes** (9-subject dropdown) | `tel:` + extensions | staff directory | no | Google Maps link | yes (directory) | — |
| Wunnengshëllef | no | text, owner page only | `info [a] …` text | no | no | no | FB widget |
| Inter-Actions | no | text (service pages) | yes | **yes, per service** | no | **yes, per service** | fax |
| HUT | newsletter only | text | `mailto:` | no | no | **yes, owner contact** | IBAN, QR |
| Croix-Rouge | newsletter + feedback | `tel:` (icon-only on mobile) | none on the home page | **yes** + "calls are anonymous" | no | no | IBAN |
| SNHBM | no | `tel:` | none on the home page | no | no | no | — |
| Fonds | search only | none on the home page | none | **yes** | no | no | — |
| SNJ | no | text | obfuscated `mailto:` | no | PDF map | no | — |
| Jugendinfo | search | no | no | no | no | no | **WhatsApp link** |
| Centrepoint | **yes** (non-urgent) + newsletter | `tel:` helpline + supporter line **with hours** | `mailto:` | supporter line | no | no | quick exit |
| UNHAJ | search | per residence | per residence | no | **map of residences** | no | — |
| ALJT | **yes** (guided) + online application | no | no | no | per residence | no | account |
| FEDAIS | no | text/`tel:` | `mailto:` | per AIS | no | no | AIS directory |

Only 3 of the 13 analysed use a general contact form (FAL, Centrepoint, ALJT). The rest of the LU field works without
forms, so yws.lu's rule matches local practice. What separates good from weak is **clickable channels + hours + routing
per audience**.

### 2c. Trust signals

| Signal | Seen on | Note |
|---|---|---|
| Stat trio near the top | FEDAIS, UNHAJ, ALJT, Centrepoint (hero) | 3 figures, one line each, with a unit |
| Audience-specific social proof | HUT owner page ("60+ owners trust us") | placed right before the owner contact |
| Legal identity (RCS, approvals, public-utility status, VAT, charity numbers) | Wunnengshëllef, Inter-Actions, SNHBM, Centrepoint | footer; LU = RCS "F…" number |
| Official third-party listing | logement.lu GLS partner list (links out to each partner, incl. YWS) | strongest verification available to YWS |
| Codes / labels | Croix-Rouge ("Don en confiance"), Centrepoint (fundraising regulator) | — |
| Testimonials / stories | ALJT (video), Centrepoint ("Real stories") | none on any LU housing site |
| Governance / reports | HUT (board), Fonds (interactive annual report), Croix-Rouge (strategy, ethics) | — |
| Accessibility statement | SNJ, Fonds, Centrepoint | footer link |
| Partner/funder logos | barely used (Wunnengshëllef "financial backing" logo) | an open gap in LU |

### 2d. Footer contents

| Site | Link columns | Address | Phone | Email | Socials | Legal row | Languages | Identity |
|---|---|---|---|---|---|---|---|---|
| FAL/AIS | none | yes | yes | yes | — | ©, legal, GDPR | — | — |
| Wunnengshëllef | none | yes | — | text | FB | impressum, privacy | — | RC, approvals, IBAN |
| Inter-Actions | none | yes | yes | yes | — | legal, CGU | — | RCS |
| HUT | categories | yes | yes | yes | 3 | CGU, data, cookies | — | IBAN |
| Croix-Rouge | full nav | yes + PO box | yes | — | 5 | legal, data, sitemap | **text labels** | — |
| SNHBM | **sitemap + useful links + contact** | yes | yes | — | 4 | ©, terms, sitemap, data, **consent settings** | — | matricule, VAT, RCS |
| Fonds | single row | — | — | — | 2 | legal, **accessibility**, data, whistleblower, cookies | — | — |
| SNJ | 3 | yes | yes | yes | 3 | ©, legal, **accessibility** | — | ministry |
| Jugendinfo | about + topics | — | — | — | 6 | legal, cookies | — | — |
| Centrepoint | 3 + badge | yes | yes | yes | 4 | terms, accessibility, cookies, **safeguarding**, privacy, finances | — | **charity/company/HA/VAT numbers** |
| UNHAJ | 3 | yes | — | — | 3 | legal, data, © | — | — |
| ALJT | 3 | — | — | — | 4 | legal, © | flag bubble | — |
| FEDAIS | minimal | — | yes | yes | — | — | FR/NL | — |

### 2e. Languages

| Site | Locales | Switcher | URL scheme | `<link hreflang>` in head | `x-default` | Titles localised |
|---|---|---|---|---|---|---|
| Croix-Rouge | fr en de | **"Français \| English \| Deutsch"** (text, `lang` on links), header + footer | `/fr/ /en/ /de/` | **yes, reciprocal** | **yes** | **yes** |
| HUT | fr en (+ de declared) | "FR" toggle → "Français / English" | `/`, `/en`, `/de` | yes | yes | no (`/de` is French) |
| SNJ | fr en | "English" + flag | `/`, `/en/` | yes | no | **no** (same title) |
| Jugendinfo | fr de | flag + "FR"/"DE" | `/`, `/de/` | **no** | no | yes |
| Fonds | fr (fake de/en) | none | `/fr`, `/de`, `/en` all French | no | no | no |
| guichet.lu | fr de en | "Français \| Deutsch \| English" | `/fr/ /de/ /en/` | not in the fetched HTML | — | yes |
| ALJT | fr en | floating "GB" bubble | — | no | no | — |
| FEDAIS | fr / nl | "FR NL" | **separate domain for NL** | wrong (`en-us`) | yes | — |
| all others | fr only (UNHAJ fr, Centrepoint en) | — | — | — | — | — |

### 2f. SEO head basics (raw HTML, 2026-10-09)

| Site | `<html lang>` | Title pattern | Meta desc | Canonical | JSON-LD types | Zoom blocked? |
|---|---|---|---|---|---|---|
| FAL/AIS | fr-FR | Page – Brand (home: brand ×2) | **no** | yes | WebSite, WebPage | **max-scale=1** |
| Wunnengshëllef | **en** (FR content) | Brand \| Luxembourg \| Brand asbl | yes (stale count) | yes | LocalBusiness, PostalAddress, WebSite | no |
| Inter-Actions | **none** | **empty** | **no** | yes | none | no |
| HUT | fr | Brand – what they do | yes | yes | **NGO, PostalAddress**, Breadcrumb, NewsArticle, WebSite | no |
| Croix-Rouge | fr / en | Page – Brand, tagline | yes, localised | yes | Organization, WebSite, Breadcrumb | **user-scalable=no** |
| SNHBM | fr | Page – Brand – legal name | yes | yes | Organization, WebSite, Breadcrumb | no |
| Fonds | fr (de/en fake) | Page d'accueil \| Brand | **no** | yes | none | no |
| logement.lu | fr | Site – Ministry – Luxembourg | generic | **no** | none | no |
| guichet.lu GLS | fr | Page – Guichet.lu – Luxembourg | yes, specific | not in the fetched HTML | none | no |
| SNJ | fr-FR / en-GB | Brand (same in both) | **no** | yes | none | no |
| Jugendinfo | fr-FR / de-DE | Topic \| Luxembourg | yes | yes | Organization, WebSite | **user-scalable=0** |
| Centrepoint | en | Brand \| Home | yes (**wrong topic**) | **`/node/1`** | none | no |
| UNHAJ | fr-FR | full legal name | yes (**audience question**) | yes | Organization, WebSite | **max-scale=1.0** |
| ALJT | fr-FR | Space Brand \| Logement en region | yes (with figures) | yes | Organization, WebSite | no |
| FEDAIS | **en** (FR content) | Acronym – full name | yes | yes | WebSite, ItemList, VideoObject | no |

### 2g. Mobile (390×844, first viewport, no interaction)

- **Cookie banners covered 16–62 % of the first viewport on 11 of the 13 probed sites** (all except Wunnengshëllef and
  Inter-Actions). FAL's first layer had no reject at the same level as "accept all".
- Persistent action bars: Centrepoint (top: 2 actions + helpline), Croix-Rouge (bottom: 2 actions, 56 px), HUT (top
  dual band, 100 px total header), ALJT (sticky header with the apply CTA).
- Icon-only primary actions: Croix-Rouge phone (38×45, no text), UNHAJ "chercher un logement" (36×36 arrow).
- Undersized tel links: FEDAIS (13 px tall), Centrepoint (22 px; inline).
- Overflow: Inter-Actions (410 px document at 390). Wix sites render a fixed 320 px layout.

## 3. Patterns worth adopting for yws.lu

| # | Pattern | Seen on | Why objectively better | How it maps to yws.lu (no forms) |
|---|---|---|---|---|
| 1 | Main nav labelled **by audience / intent** ("I'm looking for housing", "I own a home") | Fonds du Logement, FEDAIS, logement.lu | The visitor self-identifies in **1 tap** with no need to know the organisation's vocabulary; findability | Top-level items per journey: housing (young people), owners, projects, conference, about; labels in visitor language, localised per locale |
| 2 | **Audience split in the first viewport** (3–4 cards) | Wunnengshëllef, FEDAIS, SNHBM, ALJT | Root traffic, incl. the ministry's GLS list that links to `yws.lu/`, reaches its journey in 1 tap without scrolling | Hero shows 3–4 audience cards (young person / owner / partner-donor / conference) under the 3D moment |
| 3 | **One persistent primary action** in the header for the main audience | ALJT ("apply"), Centrepoint ("get help"), Croix-Rouge | 1 tap from any scroll depth; clear hierarchy (one primary, the rest secondary) | Header CTA "Apply for housing" → the external Google Form, marked as external (icon + accessible "opens Google Forms"); secondary: "Rent us your home" |
| 4 | **Mobile action bar** with 1–2 actions, kept short | Croix-Rouge (bottom, 56 px), Centrepoint (top) | Thumb reach; always visible. HUT's 100 px header shows the cost: keep it ≤ 56–64 px | Bottom bar on phones: Apply (external) + Call/Email; hide on scroll down if it covers content |
| 5 | **State eligibility before the exit to the form** (age band, status, who applies) | UNHAJ hero + meta description, ALJT age bands, Inter-Actions "conditions d'accès", Wunnengshëllef (SePAS route), FAL ("you can't apply directly") | Visitors qualify themselves before leaving the site: fewer wasted applications, no dead ends | Housing page: "Who it's for / what you need / what happens after you send the form / response time", then the Google Form button |
| 6 | **First-person situation cards** for young people | Centrepoint, Jugendinfo topic tiles | Faster scanning, matches how the visitor describes their own situation | 3–6 cards ("I'm a student…", "I'm starting a job…") that lead to the same apply path with the right expectations |
| 7 | **Owner page as an argument, ending in a human contact** (what it is → benefits with the legal basis → social proof → named contact, direct phone + email) | HUT, Wunnengshëllef, FAL, FEDAIS | Trust (verifiable law article, a real person), **1 tap to call/email**, no form needed | Owner page: GLS explained, benefits, "N owners already rent to us", owner contact (person or role, `tel:` + `mailto:`, hours) |
| 8 | **Per-audience FAQ accordion** with a contact CTA at the end | FEDAIS (owners / tenant candidates), Wunnengshëllef FAQ | Answers objections before contact (fewer emails); indexable long-tail content | FAQ per journey (owners: rent level, duration, repairs, taking the home back, tax; young people: eligibility, timing, cost) |
| 9 | **Contact page as a routing table**: audience → channel → hours | FEDAIS (contact per audience), Centrepoint (helpline vs supporter line with hours), Croix-Rouge (hours + "calls are anonymous") | Right channel first time; expectations set; no form | A row per audience (young person, owner, partner, press, jobs): `tel:` / `mailto:` (subject prefilled per audience is OK) / external form; hours; response time |
| 10 | **Every phone and email as a visible-text `tel:`/`mailto:` link**, ≥ 24 px target | FAL, SNHBM, Centrepoint (vs. SNJ, HUT, Wunnengshëllef) | 1 tap vs copy/paste/retype; WCAG 2.2 target size | Each phone its own `tel:` link with a visible number; no `[at]` obfuscation |
| 11 | **Youth-native channel** (WhatsApp link) | Jugendinfo | The channel young people use, and still not a form | Only if YWS has a monitored number (client question) |
| 12 | **Service "facts box"** (who / conditions / hours / contact / address) on each service or project page | Inter-Actions, guichet.lu sheet structure | Same scannable structure on every page; easy to keep up to date | Each housing site and project: a fixed facts block + map link |
| 13 | **Stat trio** near the top + **one audience-specific proof** inside each journey | FEDAIS, UNHAJ, ALJT; HUT (owners) | Trust at a glance; proof placed right at the decision point | Home: 3 real figures (already updated in the last commit); owner page: owners/homes count; housing: young people housed |
| 14 | **Third-party verification**: link to the official GLS partner list | logement.lu lists YWS; Wunnengshëllef links to the government page | An official source beats a self-claim | "Conventioned GLS partner of the Ministry of Housing", linked to logement.lu |
| 15 | **Legal identity in the footer** (RCS F-number, approvals, ASBL status) | Wunnengshëllef, Inter-Actions, SNHBM, Centrepoint | Verifiability; expected by owners signing a lease with an asbl | Footer legal row: ©, privacy, legal notice, RCS, (accessibility statement) |
| 16 | **Accessibility statement + safeguarding** links in the footer | SNJ, Fonds, Centrepoint | Low cost, public-sector norm in LU; trust for youth work | Accessibility statement page; a safeguarding/child-protection note if YWS has a policy |
| 17 | **Text-label language switcher**, each language in its own name, `lang`/`hreflang` on the links, header + footer | Croix-Rouge, guichet.lu | Unambiguous (flags ≠ languages), screen-reader correct, findable from both ends of the page | "English" / "Français" as planned; same switcher in the footer |
| 18 | **Locale-prefixed URLs + reciprocal hreflang + `x-default` + localised title/description/`og:locale`** | Croix-Rouge (complete), HUT (partial) | Each locale indexable and shown to the right searchers | Matches the kickoff plan; the Croix-Rouge set is the LU reference |
| 19 | **JSON-LD `NGO` with `PostalAddress`** | HUT (others only use Yoast Organization) | The most specific schema.org type; entity clarity for the brand SERP | `NGO` + 2 addresses + `contactPoint` per audience; `Event` for the conference |
| 20 | **Meta description that answers "is this for me?"** | UNHAJ (age range + status), ALJT (figures) | Higher SERP relevance for youth queries; self-qualification before the click | Housing page description: age range + city + "apply online" |
| 21 | **Event page essentials** | SNJ Foire (partial) | Fewer "when/where?" emails; calendar saves | Date/time/venue/map/price/audience/programme, external registration link, `.ics` download (a file, not a form), `Event` JSON-LD |
| 22 | **Map or directory when there are several sites** | UNHAJ map, FEDAIS AIS directory | Spatial findability | Both YWS addresses with map links (planned); a map of housing sites only if they can be public |
| 23 | **No non-essential cookies → no banner** | (counter-example: 11 of 13 sites lose 16–62 % of the first mobile viewport) | 0 taps; the hero and its 3D moment actually show on phones | Keep analytics cookieless (or none) so no consent banner is legally needed |
| 24 | Quick exit (optional) | Centrepoint | Safeguarding for young people browsing in unsafe homes | Client's call; only if YWS supports young people leaving unsafe homes |

## 4. Anti-patterns to avoid

| Anti-pattern | Seen on | Cost |
|---|---|---|
| A nav item that leads to a dead end ("online booking": nothing to book) | Wunnengshëllef | Broken promise in the main nav; wasted tap |
| Platform leftovers (cart "0", "Log In", Facebook widget as the first mobile element) | Wunnengshëllef (Wix) | Noise above the fold; signals neglect |
| Email as `name [a] domain`, phones as plain text, icon-only phone | Wunnengshëllef, HUT home, SNJ, Croix-Rouge mobile | Copy/paste on a phone; no accessible name |
| Icon-only primary CTA on mobile | UNHAJ (36×36 arrow) | Label invisible; weak affordance |
| Hero carousel of unrelated campaigns; H1 tied to a slide/news item; donation H1 above the mission; generic "welcome" H1 | Croix-Rouge, SNHBM, FAL, HUT | Diluted hierarchy; weak H1 for SEO |
| Empty `<title>`, missing or wrong `<html lang>` (`en` on French) | Inter-Actions, Wunnengshëllef, FEDAIS | Bad SERP title; wrong hyphenation, screen-reader voice |
| Locale URLs that serve untranslated content under another `lang` | Fonds (`/de`, `/en`), HUT (`/de`) | Duplicate content; misleading hreflang |
| Same `<title>` in every locale; hreflang missing from `<head>` | SNJ; Jugendinfo | Locales compete with each other or go unlinked |
| Language on a separate domain | FEDAIS (NL) | Split authority; the switcher leaves the site |
| Flags as language labels; a floating language bubble over content | ALJT, Jugendinfo, SNJ | Ambiguous; covers content on mobile |
| Canonical to a CMS internal path; meta description about another topic; stale figures in the description | Centrepoint (`/node/1`), Wunnengshëllef | Wrong URL indexed; mismatched snippet |
| Zoom blocked (`maximum-scale=1`, `user-scalable=no`) | FAL, Croix-Rouge, Jugendinfo, UNHAJ | Fails the Lighthouse `meta-viewport` audit / WCAG 1.4.4 |
| Horizontal overflow at 390 px | Inter-Actions | Sideways scroll |
| A consent first layer without an equal "reject" | FAL (Cookiebot) | Dark pattern; GDPR/CNPD risk |
| Owner offer only in PDFs or hidden outside the nav; owner URL typo, correct spelling 404 | Croix-Rouge; Wunnengshëllef | Owners don't find the offer; links break |
| A single long page with a form and a full staff email directory | FAL | Heavy scanning; personal emails exposed to scraping |
| Audiences spread over many satellite domains | SNJ (7) | Fragmented authority; harder navigation |
| Contradictory benefit numbers (owner tax exemption: NGOs say 90 %, guichet.lu says 75 %) | Several | Erodes trust; yws.lu must cite the law article + official page with a "checked on" date |
| Stale © year | Wunnengshëllef (2016–2024) | Looks abandoned |
| A mobile header taller than ~64 px with fixed bands | HUT (100 px) | 12 % of the viewport lost on every screen |

## 5. Facts that touch yws.lu directly

- **logement.public.lu's GLS page lists "Youth Work Synergy a.s.b.l" and links to `https://yws.lu/`** (the root, new
  window), next to Wunnengshëllef, HUT, FAL, Inter-Actions, Croix-Rouge, Solina and others. Owners arriving from the
  ministry therefore land on the root: the root must keep working (redirect by Accept-Language, as planned) and the first
  viewport must offer the owner path.
- **guichet.lu's GLS page (last modified 17.04.2024) does not list YWS**, and it gives the owner tax exemption as 75 %
  where NGOs say 90 %. Two open questions for the client: ask to be added to the guichet.lu list, and confirm which figure
  and legal reference to publish.
- Direct peers for youth-housing queries in LU: Wunnengshëllef (jugend-wunnen, via SePAS), Inter-Actions (Jugendwunnen
  Leideleng, 18–26), Solina, HUT (volunteers helping 18–30-year-olds search). **None** of them has a meta description
  that targets young people, testimonials, or a properly localised EN page. That gap is open for yws.lu (en + fr).
- No LU housing actor seen has partner/funder logos, resident stories or an event page with structured data. These are
  differentiators within reach for yws.lu.

## Sources (all checked 2026-10-09)

- https://www.ais.lu (302 → fondation-logement.lu), https://fondation-logement.lu/agence-immobiliere-sociale/, https://fondation-logement.lu/
- https://www.wunnengshellef.lu/, https://www.wunnengshellef.lu/prorpietaire-de-logement, https://www.wunnengshellef.lu/jugend-wunnen, https://www.wunnengshellef.lu/book-online (and `/proprietaire-de-logement`, `/en` → 404)
- https://inter-actions.lu/, https://inter-actions.lu/type_portfolio/jugendwunnen-leideleng/
- https://hut.lu/, https://hut.lu/vous-souhaitez-aider/louez-nous-votre-bien, https://hut.lu/de, https://hut.lu/en
- https://www.croix-rouge.lu/fr/, https://www.croix-rouge.lu/en/; owner offer via search: https://www.croix-rouge.lu/wp-content/uploads/2023/05/Brochure-Fr-FINAL.pdf (search snippet only)
- https://snhbm.lu/ (and `/en/` → 404)
- https://fondsdulogement.lu/fr, https://fondsdulogement.lu/de, https://fondsdulogement.lu/en
- https://logement.public.lu/fr.html, https://logement.public.lu/fr/locataire/gestion-locative-sociale.html, https://logement.public.lu/fr/professionnels/gestion-locative-sociale.html, https://logement.public.lu/fr/proprietaire/logement-location.html
- https://guichet.public.lu/fr/citoyens/logement/location/contrat-litige/offrir-location-agence-immo-sociale.html
- https://www.snj.public.lu/ (snj.lu 301), https://www.snj.public.lu/en/, https://www.snj.public.lu/event/foire-vum-jugendsecteur-2/
- https://www.jugendinfo.lu/, https://www.jugendinfo.lu/de/
- https://centrepoint.org.uk/, https://centrepoint.org.uk/do-you-need-help, https://centrepoint.org.uk/about-centrepoint/contact-us
- https://www.habitatjeunes.org/, https://www.habitatjeunes.org/carte-des-logements/, https://www.habitatjeunes.org/logements/a-chacun-son-toi-t/
- https://www.aljt.com/
- https://www.fedais.be/, https://www.fedais.be/contacter-une-ais-proprietaire, https://www.fedais.be/faq-proprietaire
- Context: https://www.caritas.lu/ (noindex, transitional), https://youth.lu/, search results on GLS / HUT / Brussels AIS (gouvernement.lu GLS press releases, paperjam.lu GLS articles)

## Not covered:

- Opened menus, hover states and interactions; no consent was given, so below-the-fold sticky behaviour after consent was not observed.
- Lighthouse / Core Web Vitals / axe scores of these sites (only head tags and the viewport meta were checked).
- Individual Brussels AIS sites, the Dutch-language FEDAIS site (fedsvk.be), UK YMCA / Foyer Federation, German Jugendwohnen networks.
- Luxembourgish (lb) pages anywhere; the quality of DE/EN translations beyond title/lang checks.
- Desktop footers were read from the page text, not from screenshots.
- Social profiles, Google Business Profiles, press coverage of these organisations.
- ANELO (domain did not resolve) and youth.lu (empty shell) were not analysed; Caritas only as noted.
- Youth-work conference sites outside the SNJ event page.
- Whether YWS actually holds a current GLS convention (inferred only from the logement.lu list) and which tax-exemption figure applies: both need client confirmation.
