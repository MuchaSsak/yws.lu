# Design references

> Owns: which reference patterns yws.lu adopts per section, with the objective reason, and what it skips. Evidence:
> `research/2026-10-09-comparable-sites.md` (14 sites, 13 analysed, checked 2026-10-09) and Mobbin web searches of
> 2026-10-09 (app names cited, no screenshots saved). Neighbours: art direction, tokens, components → `design.md`; the
> score rubric → `design-quality.md`; sections in order per page → `structure.md`; labels and claims → `brand.md`; who
> each section serves → `audience.md`; features (F01–F13) → `requirements.md`. Research informs; nothing is copied.

## Direction

- **The feel stays:** playful, colourful, 3D, warm, for young people (`project-brief.md` § Constraints). A change to
  the feel is a `comps/` proposal with before/after shots, never silent.
- **The bar in Luxembourg is low and specific:** 11 of 13 sites lose 16–62 % of the first mobile viewport to a cookie
  banner, 4 block zoom, 3 use a contact form; none has a meta description aimed at young people, resident stories,
  partner logos as proof or an event page with structured data [research: comparable-sites § 2g, § 5].
- **Never looks like:** a government service sheet, a Wix template, a SaaS mega footer, a hero behind a consent layer.

## Header + language switcher

- **Adopt nav by journey, in the visitor's words** (existing labels: Apply for housing, Rent your property, About us,
  We Spark Projects, Contact us, TEC Conference), because the visitor self-identifies in one tap without knowing "GLS".
  Seen: Fonds du Logement ("Je cherche à louer"), FEDAIS, logement.lu.
- **Adopt one persistent primary, "Apply for housing", at every width** (F02), because it is one tap from any scroll
  depth and the hierarchy reads at once. Seen: ALJT (sticky "Demande de logement"), Centrepoint, Croix-Rouge.
- **Adopt a phone header ≤ 64 px**, because HUT's 100 px header costs 12 % of an 844 px viewport on every screen.
  Proposal only (`comps/`): a phone action bar ≤ 56 px with Apply + Call (Croix-Rouge's bottom bar), for thumb reach.
- **Adopt two inline text links, "English" / "Français"**, with `lang` + `hreflang`, to the same page in the other
  locale, in header and footer, because flags are not languages, screen readers voice each name in its language and
  two locales need zero extra taps. Seen: Croix-Rouge, guichet.lu; Mobbin: Mistral AI, Canny, Telegram (autonyms).
- **Skip** flags and floating language bubbles (ALJT, Jugendinfo, SNJ); a dropdown or modal for two languages
  (GetYourGuide's grid suits 40); dead-end nav items (Wunnengshëllef's empty booking page; here `/Jobs`); white text
  on `bg-black/25` (fails contrast, baseline).
- **Open (Q26):** header Apply → the Google Form directly (F02), or → the housing page's eligibility first (§ Housing journey).

## Home first viewport

- **Adopt** the owner H1 as it is ("Rent out your property": logement.lu's GLS list sends owners to the bare root
  [research: comparable-sites § 5]) **plus a visible path for young people in the same viewport** (a line + link, or
  audience cards under the 3D moment), because root traffic then reaches its journey in one tap. Seen: Wunnengshëllef
  (4 audience tiles), FEDAIS (3 hero cards), SNHBM (question blocks). It changes the feel: `comps/` proposal.
- **Skip** rotating campaign heroes and an H1 tied to a slide (Croix-Rouge, SNHBM); a donation H1 (FAL; YWS donations
  aren't deductible); a cookie banner (not needed without non-essential cookies; the map facade keeps it so).

## Footer

- **Adopt** an organisation block (logo, the mission line from `brand.md`, "Youth Work Synergy ASBL") and 3–4 labelled
  link columns per journey (Housing · Owners · Organisation · Contact) over one legal row, because it scans in one pass
  with real landmarks and no fake headings. Mobbin: Kajabi, folk, monday.com.
- **Adopt** both addresses with an "Open in Google Maps" link each, each phone its own `tel:`, email as `mailto:`,
  socials with visible names, because each is one tap and named (2025: one broken `tel:` holding two numbers, icon-only
  socials with no accessible name; Mobbin's Bevel and Vanta are icon-only too). Facts: `content-model.md`.
- **Adopt** the language switcher again (Croix-Rouge; monday.com's footer language control) and a legal row: © year
  from the build, privacy policy, legal notice, credits, the RCS number once Q1 is answered (Wunnengshëllef,
  Inter-Actions, SNHBM and Centrepoint show theirs: verifiable for an owner signing a lease).
- **Skip** a sticky blurred footer (covers content); `h4`/`h5` as text and `/60` alpha text (baseline); a mega footer
  (Vanta, monday.com: 7 columns for 6 pages); app badges, a newsletter (no forms), consent settings (no consent tool); a
  hard-coded "©2025"; an accessibility-statement page for now (a new page: the client's call).

## Contact without forms, per audience

- **Adopt a routing block, audience → channel → what to write:** young person → Apply + email; owner → call + email
  with a prefilled subject; partner → email + LinkedIn; practitioner → tecpractices.eu + email. Because the first
  channel is the right one, with no form. Seen: FEDAIS (contact per audience), Centrepoint (two lines), Croix-Rouge
  (hours + "calls are anonymous").
- **Adopt labelled rows: label, value, Copy,** because a phone taps, a desktop without a mail client copies, and the
  label first makes it scannable. Mobbin: Ragged Edge ("Find us / Call us / Email us", each with Copy), Kalstore
  (labelled email cards with a copy icon), Aino Agency ("Open Gmail" + "Copy email").
- **Adopt visible-text `tel:` / `mailto:` with targets ≥ 24 px** (FAL, SNHBM; FEDAIS's tel link is 13 px tall).
- **Adopt the map behind a click-to-load facade** (static image + "Show the map" + "Open in Google Maps"), because no
  request reaches Google and no `NID` cookie is set before the click, and no iframe weighs on load [research: legal].
  Mobbin: Upwork (static map tile + address), Pentagram (address + "Get directions").
- **Skip** any form (rule); a staff email directory (FAL); `[at]` obfuscation (Wunnengshëllef, SNJ); an icon-only phone
  (Croix-Rouge mobile); WhatsApp unless the client has a monitored number (Jugendinfo); the live map iframe (2025).

## Housing journey: eligibility and steps

- **Adopt eligibility before every Apply button**: 18–34 and the priority criteria from the dictionary; the Unknowns
  (price, students, permit) appear only when the client provides them (Q24). Because visitors qualify themselves before
  leaving for the form. Seen: UNHAJ (hero states age + status), Inter-Actions ("conditions d'accès"), FAL.
- **Adopt the four existing steps as an ordered list** (`<ol>`: number, title, one sentence) with the scroll-drawn beam
  as decoration on top, because screen readers read it in order, the numbers show progress and a vertical list
  survives French lengths at 320 px. Mobbin: Railway (numbered vertical steps), United Carriers (number, title, what
  happens), Samara (vertical timeline), PayPal (01/02/03 cards).
- **Adopt "what happens after you send the form"**, with a response time only if the client gives one (United
  Carriers states one: the pattern, not their number), and **the honest limit next to the button** ("we can't help
  everyone right away"), because it sets expectations (750 waiting, 9 houses).
- **Skip** a horizontal 4-column stepper on phones (Sequence; French labels wrap); first-person situation cards
  (Centrepoint) for now (new copy: proposal); an FAQ built for rich results (gone since 2026-05-07 [research: seo]).

## Owners' guarantees page

- **Adopt the argument order: what it is → benefits → proof → a human** (GLS in plain words → the five existing cards
  → proof → call + email), because each objection is answered before the contact. Seen: HUT ("Louez-nous votre bien",
  no form, a named contact), Wunnengshëllef, FEDAIS.
- **Adopt a benefit grid** (icon, short title, 1–2 sentences; 2–3 columns desktop, 1 on phones; equal heights; one CTA
  after it), because it scans and ends in one action. Mobbin: HoneyBook ("What you'll get"), Complex Law, Teak.
- **Adopt the tax figure with its legal basis and a "checked on" date** (ACD, logement.lu) once Q17 is answered,
  because contradicting numbers across sites erode trust [research: comparable-sites § 4].
- **Adopt third-party verification**: a link to logement.lu's GLS list, where YWS is listed (new copy, approval),
  because an official source beats a self-claim. Proof at the decision point: the houses count; an owner
  count or testimonial only from the client (HUT shows "60+ owners").
- **Skip** the offer in PDFs (Croix-Rouge); a "call me back" form; guarantee amounts YWS doesn't offer (Croix-Rouge's €3,000).

## Impact statistics

- **Adopt a stat trio**: big number, one-line label, the copy's own "Since 2023" as eyebrow, rendered in the HTML at
  build from `statistics.ts` (F05), `tabular-nums`, an "as of" date (new copy); the client's sentence stays. Because it reads in
  3 s and is indexable text. Seen: FEDAIS, UNHAJ, ALJT; Mobbin: MasterClass ("Since 2019…" over three figures), monday.com, Amigo.
- **Skip** count-ups from 0 (no-JS and reduced motion would show 0); figures on photos (Zipline: needs a scrim);
  rounding or "+" beyond the client's "over".

## Partner strip

- **Adopt** real partners only (7 today), each logo with the partner's name as alt and a labelled link; the EU marks
  (Erasmus+, ESC) static, outside any marquee, sized per the EU rules (Q21). A static wrapped grid, or the marquee with a
  **visible pause button**, because moving content over 5 s needs a pause control (WCAG 2.2.2) and hover or focus
  pause doesn't reach touch users. Mobbin: Miro (partner card grid), Clay and Mora (bordered logo grids), Square (static row).
- **Skip** logo walls (Customer.io, ~30 logos); the 2014–20 Erasmus+ logo; "Fondation Summer".

## Projects (We Spark)

- **Adopt** an `<h2>` + anchor per project (deep links; one per long-tail query [research: audiences-keywords § 3])
  and a facts box above the client's text (who, when, funder, where, link), because every project then scans the same
  way. Seen: Inter-Actions' service template, guichet.lu's sheet. Past dates read as past without editing the text (Q9);
  link labels per `brand.md` rule 3; responsive photos (F07).
- **Skip** auto-advancing carousels; "Register now" on past workshops; French blocks presented as English (mark
  `lang="fr"` until translated, `i18n.md`).

## TEC Conference (past event)

- **Adopt** a top line "This event took place on 9 April 2026" (Mobbin: Mural's "This event occurred on…" banner over
  its recap), a short recap (project V, TEC, partners, the programme as a record) and **"Visit tecpractices.eu" as the
  one prominent action**; internal nav [user 2026-10-09]. Because the past is stated truthfully and the resources are
  one tap away. A recording card only if one is public (Mobbin: Notion, Patreon past-event cards) (Q8).
- **Skip** Register/Zoom buttons, "Join us", countdowns; `Event` JSON-LD (past; no Event rich results in LU/FR
  [research: seo]); cursor effects that hide the pointer (`requirements.md`); SplashCursor as is (licence, Q23; cost: `design.md`).

## 404

- **Adopt** a real 404 status, `noindex`, per locale: H1 "Page not found", one sentence, links to the main journeys
  (Apply for housing, Rent your property, About us, Contact) and the other locale, because lost visitors (old WordPress
  URLs) reach a journey in one tap. A static playful visual is fine. Mobbin: SpaceXAI ("Helpful links" with one-line
  descriptions), Firecrawl (link list + "Go Back Home"), FREITAG (three cards into the main sections).
- **Skip** a lone "Go back home" (Becane); a giant number that dwarfs two small links (Fiasco); a soft 404 with status 200.

## Anti-patterns seen in the field

Zoom blocked (FAL, Croix-Rouge, Jugendinfo, UNHAJ) · icon-only primary actions (UNHAJ) and 13 px tel links (FEDAIS) ·
wrong or missing `<html lang>`, one title for every locale, locale URLs in another language (Fonds, HUT, SNJ) ·
overflow at 390 px (Inter-Actions) · a consent layer without an equal "reject" (FAL) · platform leftovers, stale © (Wunnengshëllef).
