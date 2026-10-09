# Audience

> Owns: who the site serves, what each audience searches for, what they need in one tap, their objections with the
> evidence the site has or lacks, and their next step. Evidence: `research/2026-10-09-audiences-keywords.md`
> (Google autocomplete gl=lu, no volume data) and `research/2026-10-09-comparable-sites.md`. Neighbours: the
> organisation's facts → `content-model.md`; voice, names and claims → `brand.md`; the target query per page × locale →
> `seo.md`; features and budgets → `requirements.md`; sections per page → `structure.md`.

## At a glance

| | Audience | Arrives from | Needs in one tap | Next step (never a form) |
| --- | --- | --- | --- | --- |
| A | Young people 18–34 looking for housing in Luxembourg | Google (FR first, EN for newcomers), the CRIJE/JIP youth housing guide (Nov 2025, lists YWS) | am I eligible, how it works, Apply | **Apply** (external Google Form, new tab) · email · call |
| B | Property owners | logement.lu's GLS partner list (links to the bare `https://yws.lu/`), Google | guarantees, tax, who signs, a human | **Call** · **email** with a prefilled subject |
| C | Partners, funders, institutions | brand query, EU Youth Portal (ESC), partner sites | who YWS is, dated impact, projects and funders | email · LinkedIn |
| D | Youth-work practitioners (TEC) | tecpractices.eu, ESC/SALTO networks | what the conference was, the resources | **tecpractices.eu** · email |
| — | Job applicants | — | **retired**: `/Jobs` 308 → About us, no JobPosting [user 2026-10-09] | — |

Sources for "arrives from": [research: audiences-keywords S10, S17, S22], [research: comparable-sites § 5].
Search languages: FR is the main market (richest autocomplete); EN serves newcomers and expats; DE is notes only; LB
speakers mostly search in FR or DE (inference) [research: audiences-keywords § 2]. Built locales: en + fr (Q3).

## A. Young people (18–34) looking for housing

**What the site says (dictionary only, `lib/dictionary.tsx`):**
- Fully furnished rooms in shared homes, "with support, coaching, and a safe environment" (`lookingForHousingDescriptionHomepage`).
- For people "between 18 and 34" needing stable, affordable housing in Luxembourg (`heroDescriptionLookingForHousing`).
- Educational support toward independence; youth educators coach residents toward jobs, training or school
  (`whoWeAreDescriptionHomepage`, `ourMissionCardOneDescriptionAboutUs`).
- Priority: urgent situations (eviction, sudden loss of income); a check for basic financial stability; a balanced
  house "including gender diversity when possible"; "we can't help everyone right away" (`whoGetsPriorityDescriptionLookingForHousing`).
- Process: form → a call to schedule a meeting → personal interview → selection on "urgency, motivation, and
  readiness for communal living" (`timeline*DescriptionLookingForHousing`).
- **Unknown, never invented** (Q24, proposed): rent per room, whether students qualify, income or contract (CDI)
  rule, residence permit, response time, waiting time, house locations.

**Searches** (verbatim autocomplete, gl=lu, 2026-10-09):

| Locale | Queries |
| --- | --- |
| fr | logement jeunes luxembourg · logement pour jeunes adultes luxembourg · logement jeunes actifs luxembourg · colocation luxembourg pas cher · chambre meublée luxembourg · foyer jeunes travailleurs luxembourg · logement urgence luxembourg |
| en | affordable housing luxembourg · room for rent luxembourg · furnished rooms luxembourg · shared house luxembourg · coliving luxembourg · housing support luxembourg · housing in luxembourg for foreigners |
| de | wg zimmer luxemburg · günstige wohnung luxemburg · bezahlbarer wohnraum luxemburg |
| lb | jugendwunnen · wunneng ze verlounen (LB autocomplete is almost empty) |

FR "logement jeune(s)" suggestions are dominated by *logement étudiant*; EN adds "reddit" (people want honest specifics).

| Objection | Evidence the site has | Evidence it lacks |
| --- | --- | --- |
| "Am I eligible?" | 18–34; the priority criteria above | the Unknowns above (Q24) |
| "Is this real? The application is a bare Google Form" | ASBL with GLS status, "working in collaboration with the Ministry of Housing" (`heroDescriptionAboutUs`); partner logos | a link to logement.lu's GLS list, where YWS is listed [research: audiences-keywords F3] (new copy); RCS in the legal notice (Q1); what the form collects (`compliance-and-data.md`) |
| "Will I get a place, and when?" | the honest limit sentence; 9 houses, 40 housed, 750 requests waiting (statistics of 2025-07-09, `content-model.md`) | response and waiting times (Q24) |
| "What happens after I send the form?" | 4 named steps: Fill Out the Form → Let's Talk → Personal Interview → Our Selection Process | how long each step takes (Q24) |
| "What does it cost, what is included?" | furnished, shared, coaching, quality second-hand furniture (`ourMissionCardThreeDescriptionAboutUs`) | rent range (Q24) |
| "Is it RENLA, Jugendwunnen or student housing?" | — | one line on what YWS is not (new copy); RENLA is the national register since Sept 2025 [research S13] |
| "Where are the houses?" | "across the country"; 7 house photos | a map: `RealImpactMap` exists but is not rendered; showing locations is the client's call |

**Next step:** Apply (Google Form, opens in a new tab) after the eligibility facts on the housing page, and from the
header (F02). Questions: email (prefilled subject) or call. No form on the site, ever [user 2026-10-09].

## B. Property owners

**What the site says (dictionary only):**
- YWS rents "any type of residential property — whether it's a house, apartment, or individual room" (`heroDescriptionRentYourProperty`).
- Guaranteed rent every month "even if the property is temporarily vacant", by signing a lease with YWS (`whyRentToUsGuaranteedRentRentYourProperty`).
- Tax: "a 90% tax exemption on net rental income" on the owner page, "up to 90%" in the home hero (Q17); rent
  "typically 30-40% lower than private market rates" (`whyRentToUsTaxBenefitsRentYourProperty`).
- Tenants followed by trained social workers; the home can be reclaimed for personal use; partner organisations'
  technical teams maintain it; renovation "at fair cost, always with your agreement"; full insurance cover (`whyRentToUs*`).
- No owner form: `YWS_RENT_YOUR_PROPERTY_GOOGLE_FORM_LINK = ""` [repo: lib/constants.ts].

| Locale | Queries |
| --- | --- |
| fr | gestion locative sociale luxembourg · louer son bien à une association · louer son appartement à une association · louer son appartement sans risques · imposition revenus locatifs luxembourg · garantie loyer luxembourg |
| en | social rental management luxembourg (guichet.lu's term) · rental income tax luxembourg · rent out property luxembourg · guaranteed rent scheme |
| de | soziale mietverwaltung luxemburg · wohnung vermieten luxemburg · steuern mieteinnahmen luxemburg · wohnung an verein vermieten |
| lb | "gestioun locative sociale" falls back to the French term |

"GLS" alone returns the parcel company; "agence immobilière sociale" returns Belgian agencies [research F9].

| Objection | Evidence the site has | Evidence it lacks |
| --- | --- | --- |
| Lower rent than the market | the 90 % exemption claim | one figure with its legal basis and a "checked on" date: ACD and logement.lu say 90 % from tax year 2024, guichet.lu still says 75 % [research F1, F2] (Q17) |
| Damage risk with young tenants | insurance, social workers, maintenance teams (client claims) | the cover named; how damage is handled (client) |
| Lease length, lock-in, taking the home back | "Property Flexibility" (reclaim for personal use) | lease length and notice terms (client; not on government pages) |
| "A young organisation (2023) vs Croix-Rouge or FAL?" | "Since 2023…" and 9 houses | the logement.lu list link (new copy); RCS (Q1); an owner count or testimonial (client only, never invented) |
| "Who do I talk to?" | email and phones, as plain text today | `tel:` / `mailto:` links (F03); which number is for what (Q2); a named role (client's call) |

**Next step:** call or email with a prefilled subject right after the benefits (F03). logement.lu sends owners to the
root, so the owner path stays in the home's first viewport (`design-references.md` § Home first viewport).

## C. Partners, funders, institutions

- **Named in the copy:** Ministry of Housing (GLS), Ministry of Justice (Safe Paths), Fondation Sommer (Locked Out),
  Erasmus+ (Get Your Home; the KA210 Mobile Learning project with NINFEA and KulturNest e.V.), European Solidarity Corps
  (Girlssective, The Self Chronicle), André Losch Fondation (partner strip) [repo: dictionary, `PartnerStrip.astro`].
- **Searches:** youth work synergy (luxembourg / asbl) · youth work luxembourg · asbl logement luxembourg · association
  jeunes luxembourg · european solidarity corps luxembourg · erasmus+ ka210.
- **Needs:** who YWS is and its model, dated impact numbers, projects with their funders, governance, a contact.

| Objection | Evidence the site has | Evidence it lacks |
| --- | --- | --- |
| Young organisation | "Since 2023"; 7 projects on We Spark | governance (board, statutes, filed accounts are public at the RCS [research F4]): the client's call to show |
| "Are the numbers measured?" | the client's counts (`statistics.ts`) | the date of the figures on the page (new copy; who updates them: Q13) |
| EU visibility | ESC and Erasmus+ logos | the 2021–27 "Co-funded by the European Union" emblem on the funded projects (Q21) |
| Outside proof | — | ESC Quality Label (OID E10339604, to 31/12/2027), Anna Lindh Foundation membership, CRIJE listing [research]: on the site only with client approval |

**Next step:** email (prefilled subject, new copy); LinkedIn (Q15: the URL is a personal-profile type).

## D. Youth-work practitioners (TEC)

- **Who:** TEC trainers, youth workers, adult educators and volunteers "working with people on the move" (`tecConferenceMetadata`). TEC = the ESC Training and Evaluation Cycle [research S23].
- **What happened:** the closing conference of "V - Comprehensive Guide to Best Practices in Mobile Learning for
  Adults" (Erasmus+ KA210, September 2024 to October 2025, coordinated by YWS with NINFEA and KulturNest e.V.), online,
  9 April 2026, 14:30–15:30 [repo: `app/TecConference/`, dictionary]. **Past** [user 2026-10-09].
- **Searches:** tec practices · training and evaluation cycle · cycle de formation et d'évaluation (EU portal FR term).
  "TEC conference" alone returns US events [research F9].
- **Objections:** "Is it still on?" → the page states the date as past (Q8). "Is there a recording?" → the old copy
  promised one to registrants; public availability is Unknown (Q8). "In French?" → EN-only today; FR is new copy (F08).
- **Next step:** Visit tecpractices.eu (the primary, prominent action); questions by email.

## Retired: job applicants

- `/Jobs` and its two PDFs 308 → About us; no JobPosting, no "we're hiring"; offers "no longer needed" since
  2026-05-11 (commit 87b18ab) [user 2026-10-09]. A future offer gets an HTML page + JobPosting only while open (brief § P6).

## Not for

- Housing: people under 18 or over 34 [repo]. Projects have their own ranges (Girlssective 16–35, The Self Chronicle
  12–30, the sport project 15–25): never generalise one range to the other [repo: dictionary].
- Donors wanting a tax deduction: YWS is not on the ACD list of approved recipients (list of 03/08/2026) [research F10].

## Evidence notes

- No search volumes (no Search Console or Keyword Planner): autocomplete shows that demand exists, not how much.
- Reddit read through one mirror thread only; Facebook and Instagram content not verifiable (login walls) [research].
