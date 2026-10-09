# YWS.lu revamp: audiences, search intent and per-locale SEO targets (EN + FR, DE/LB notes)

Research date: 2026-10-09. All sources checked on 2026-10-09 unless a different date is shown. Repo inputs: `lib/dictionary.tsx` (en/fr copy), `lib/constants.ts` (links/addresses only; no key copied), `app/**` (routes, partner logos).

**About search volume:** I have **no search-volume data** (no Search Console, Ads Keyword Planner, Semrush or Ahrefs access). Demand evidence below comes from **Google autocomplete** (fetched live with `hl` = fr/en/de/lb and `gl=lu`), wording on government and agency sites, and one Reddit thread. When a query shows up in autocomplete, it means *some* people search it. It does not tell you how many. An empty autocomplete means volume is probably low, not that it is zero.

Legend: **AC** = seen in Google autocomplete (gl=lu) on 2026-10-09 · **GOV** = wording used by guichet.lu / logement.lu / ACD · **SITE** = wording on other Luxembourg orgs' sites or flyers · **–** = no evidence found (a guess).

---

## 0. Key facts that change the plan (read first)

| # | Finding | Evidence |
|---|---|---|
| F1 | **The owner tax rule is a flat 90% exemption on net rental income, from tax year 2024.** It was 75% for 2023 and 50% for 2017–2022. Legal basis: art. 49 of the amended law of 7 Aug 2023 on affordable housing (ACD also cites circular L.I.R. n°115/10 of 18 Aug 2023). The home hero's "**up to** 90%" wording is inaccurate: it is 90%, not "up to". | ACD page (modified 24/02/2026) [S2]; logement.lu (updated 23.09.2026) [S1]; announced 16 Mar 2024 [S6] |
| F2 | **guichet.lu still says 75%** (FR and EN pages last updated 17.04.2024). Owners who check guichet will see a number that contradicts YWS. The owner page should cite the ACD page and logement.lu (both say 90%) to settle it. | [S3][S4] vs [S1][S2] |
| F3 | **YWS is an officially approved GLS organisation.** "Youth Work Synergy a.s.b.l" is on the Ministry of Housing list of *organismes conventionnés* (33 orgs listed, alongside Croix-Rouge, FAL, Wunnengshëllef, etc.). This is the strongest trust signal YWS has for owners, and the site should link to it. | [S1] |
| F4 | **Registered entity:** "Youth Work Synergy ASBL", **RCS F14106**, EUID LURCSL.F14106, registered 26/05/2023, seat in Fentange. Source is North Data, which mirrors LBR/RESA publications. Not yet confirmed on lbr.lu itself (that search is interactive). | [S16] |
| F5 | **The live site sends no `<title>` and no meta description to anyone, Googlebot included.** `generateTranslatedMetadata()` (`lib/utils.ts`) returns `undefined` on the server (`typeof window === "undefined"`). The language is picked client-side from `navigator.language`, so `<html lang="en">` is always sent and the **French copy is not indexable at any URL**. Google shows a made-up title for the home page: "Youth - Work - Synergy". `robots.txt` and `sitemap.xml` both return 404. The code's canonical is `https://yws.lu`, but that URL 308-redirects to `https://www.yws.lu/`. | curl with browser and Googlebot UAs [S27]; search index titles [S31] |
| F6 | **Old WordPress URLs now 404** with no redirect: `/our-story/`, `/our-accommodations/`, `/our-projects/`, `/contact/`, `/cash-donation/`, `/donation-in-kind/`, `/news-event/`, `/legal-notices/`, `/privacy-policy/`, `/wp-content/uploads/2024/12/New-Brochure.pdf` (now 403). The current PascalCase routes (`/AboutUs`, `/LookingForHousing`, `/RentYourProperty`, `/WeSparkProjects`, `/TecConference`, `/Jobs`) are archived and indexed too. All of these need 301s to the new slugs. | Wayback CDX [S28]; live curl [S27] |
| F7 | **The TEC conference is over.** It was a one-hour online event on **9 April 2026, 14:30–15:30** (repo copy), and the nav already links out to `tecpractices.eu/web/`. The `/tec-conference` page should become a short archive page with results and links, not an event promo. | repo `app/TecConference/**`; [S22] |
| F8 | **NAP (name, address, phone) is inconsistent across the web.** Office: 136-138 rue Adolphe Fischer, L-1521 (site). Seat: 16 rue Pierre Weydert, L-5891 Fentange (site, RCS, ESC, ALF). The **CRIJE youth housing guide (Nov 2025) lists 11C Av. de la Porte-Neuve, L-2227**. Phones: site footer "286622 • 661597312" (the `tel:` link is broken); CRIJE "661 597 312"; ESC/ALF "+352 691 597 315". | [S10][S17][S18]; repo footer |
| F9 | **Several ambiguous terms to avoid as head terms:** "GLS" alone (AC returns the GLS parcel company: "gls luxembourg tracking"); "agence immobilière sociale" (FR SERPs dominated by **Belgian** AIS, e.g. "ais province luxembourg"); "TEC conference" and "We Spark" (unrelated US events and brands in AC); "YWS" alone (AC → "yws lukko"); bare "Luxembourg" in FR (mixes in the Belgian province and Paris' *Jardin du Luxembourg*). | AC [S15] |
| F10 | **Donations to YWS are not tax-deductible.** YWS is not on the ACD list of approved recipients (list updated 03/08/2026). The site should not promise deductibility. | [S25] |

---

## 1. Audiences

Age note: the org serves **18–34** (site copy, RCS corporate purpose, CRIJE listing), not 18–30. The state *Jugendwunnen* scheme is 18–31, and applicants must be under 26 when the room is allocated (a bill would raise this to 28) [S9].

### (a) Young people looking for affordable or transitional housing (18–34)

| | |
|---|---|
| Who | Young workers on short contracts or with no CDI, newcomers and expats, beneficiaries of international protection, young people leaving the family home or facing eviction or loss of income. The site's priority rules: urgency, motivation, readiness for shared living, basic financial stability. Context: 59% of people in shared housing are young adults, and 60% of young renters are dissatisfied with their housing [S11][S12]. |
| One tap | **"Apply" (Google Form)**, plus a 4-line eligibility box (age 18–34, minimum income or stability, residence permit?, are students eligible?), the price range per room, a map of the houses (the My Maps link exists in constants), what is included (furnished, coaching), a realistic wait time, and what happens after you submit. |
| Objections | "Is this a real organisation or a scam?" (a bare Google Form looks informal). "Will I ever get a place?" (750 on the waitlist vs 9 houses, per the default stats). "Do I need a CDI?" (landlords usually demand one [S14]). "Is it student housing?" (AC for "logement jeune(s) luxembourg" is dominated by *logement étudiant*). "Do I have to join workshops?" "Mixed-gender house rules?" "Is this the same as the RENLA / affordable housing register?" (it isn't; RENLA has been the national register since Sept 2025 [S13]). |
| Trust signals | GLS approval with a link to logement.lu [S1]; the Ministry of Housing; real house photos; resident testimonials and resident-led projects; a phone number that works; a privacy notice explaining what the Google Form collects (GDPR); listings by CRIJE/JIP and ESC [S10][S17]. |

### (b) Private owners thinking about renting to a social or youth organisation

| | |
|---|---|
| Who | Owners of empty or under-used homes, inherited houses, or properties needing renovation. Also owners wanting a hassle-free let or a social-impact choice. Many compare YWS with Croix-Rouge "service immobilier", FAL/AIS, Wunnengshëllef and the communal social offices, all on the same GLS list [S1][S7][S8]. |
| One tap | **Call or "be called back"** (note: `YWS_RENT_YOUR_PROPERTY_GOOGLE_FORM_LINK` is an empty string, so there is no owner form today). Also the **90% exemption** (cite ACD), **guaranteed rent even when vacant**, **rent about 30–40% below market** (logement.lu's own figure), who signs the lease (YWS), what YWS covers (maintenance, insurance, tenant follow-up), and how to take the property back. |
| Objections | Lower rent ("30–40% below market"). Damage risk with young people in shared housing. Lock-in period and lease length (no minimum found on gov pages; YWS must state its own terms). Conflicting tax info (guichet says 75%, see F2). "A young org (registered 2023) vs the Red Cross?" "Who pays for renovation?" (repo copy: "at fair cost, always with your agreement"). |
| Trust signals | The logement.lu GLS list entry [S1]; the Ministry of Housing convention; the number of houses and owners already working with YWS; an owner testimonial; the insurance policy named; a lease template or FAQ; RCS F14106 in the legal notice. Competitor benchmark: Croix-Rouge highlights guaranteed rent, 90% exemption, tenant support and maintenance, plus a €3,000 damage guarantee in its separate guarantor scheme [S7]. |

Verified tax rule (for the copy). **FR:** « exonération de 90 % des revenus locatifs nets (depuis l'année d'imposition 2024 ; 75 % pour 2023, 50 % pour 2017–2022) pour les biens loués via un organisme conventionné de gestion locative sociale ». **EN:** "90% of net rental income is tax-exempt (tax years 2024+) when let through an approved social rental management organisation." Sources: [S2][S1].

### (c) Partners and funders

| | |
|---|---|
| Who | Ministry of Housing and Spatial Planning (GLS convention); Ministry of Justice (Safe Paths); Fondation Sommer (Locked Out; the repo alt text misspells it "Fondation Summer"); André Losch Fondation (e.g. the "Up to Youth" call, €50–100k projects for ages 0–30 [S26]); Erasmus+ (KA210 project 2024-1-LU01-KA210-ADU-000255773 [S22]); European Solidarity Corps (Girlssective, The Self Chronicle); communes (the Jugendwunnen call for projects targets ASBLs as promoter or social landlord [S9]). |
| One tap | A one-page "who we are / model / impact" with **dated numbers**, **governance** (board, statutes, RCS F14106, annual accounts filed 24 Jun 2025 per [S16]), an annual report PDF, the list of funded projects with funder and EU visibility, and a contact person. |
| Objections | Young organisation (since 2023) and started out volunteer-run [S18]. Sustainability. How YWS differs from Jugendwunnen and other GLS actors. Whether impact figures are measured and how. |
| Trust signals | GLS approval [S1]; **ESC Quality Label (hosting + supporting) valid until 31/12/2027, OID E10339604** [S17]; Anna Lindh Foundation network member [S18]; CRIJE listing [S10]; partner logos (already on the home page); the Erasmus+ "Co-funded by the European Union" mark on funded project pages. |

### (d) Conference and TEC attendees (youth work practitioners)

| | |
|---|---|
| Who | ESC TEC trainers (on-arrival and mid-term training), youth workers, adult educators and volunteers working with "people on the move" (repo metadata). Partners: NINFEA (Italy), KulturNest e.V. (Germany) [S22]. TEC = the ESC **Training and Evaluation Cycle** (pre-departure, on-arrival, mid-term, annual event) [S23]. |
| One tap | Now that the event is over: **the recording or slides, the guide or platform (tecpractices.eu)**, the programme, the speakers and the project number. Before an event: date and time *with time zone*, format (Zoom), language, a free registration link. |
| Objections | "Is this relevant to my TEC role?", language, time cost. |
| Trust signals | Erasmus+ co-funding with the project number; partner names; SALTO/ESC terminology; CC BY-SA licensing of the outputs [S22]. |

---

## 2. What each audience searches (per language)

Intent: **I** = informational, **N** = navigational, **T** = transactional or action (apply, contact). "Who" = audience a/b/c/d.

### French (main market)

| Query (verbatim) | Who | Intent | Evidence |
|---|---|---|---|
| logement jeunes luxembourg / logement jeune luxembourg | a | I/T | AC (suggestions dominated by *logement étudiant…*) |
| logement pour jeunes adultes luxembourg | a | I | AC |
| logement jeunes actifs luxembourg (ville) / logement jeune travailleur luxembourg | a | I | AC |
| foyer jeunes travailleurs luxembourg / foyer jeune luxembourg | a | I/N | AC |
| logement encadré pour jeunes luxembourg | a | I | AC; GOV/SITE term (CRIJE "Logement Encadré", SLEMO) |
| colocation luxembourg pas cher / colocation au luxembourg / chambre en colocation au luxembourg / recherche colocation luxembourg | a | T | AC |
| chambre à louer luxembourg pas cher / chambre meublée luxembourg / location chambre meublée luxembourg | a | T | AC |
| logement pas cher luxembourg / loyer pas cher luxembourg | a | T | AC |
| logement social luxembourg (conditions / prix) / comment obtenir un logement social au luxembourg / demande logement social luxembourg | a | I | AC |
| logement abordable luxembourg / renla inscription / renla demande | a | I/N | AC; GOV (RENLA) |
| aide logement jeune luxembourg / subvention de loyer luxembourg | a | I | AC; GOV |
| logement urgence luxembourg / logement temporaire luxembourg | a | I | AC |
| comment trouver un logement au luxembourg / site pour trouver un logement au luxembourg | a | I | AC |
| jugendwunnen (luxembourg) | a | N | AC (FR locale as well) |
| gestion locative sociale luxembourg / gestion locative sociale définition / loi gestion locative sociale | b | I | AC; GOV |
| louer son appartement à une association / louer son bien à une association / comment louer son appartement à une association | b | I/T | AC |
| louer son appartement à un organisme social / louer son appartement à l'état | b | I | AC (France-skewed) |
| louer son appartement sans risques / louer son appartement sans payer d'impôts / louer son appartement impôts | b | I | AC |
| revenus locatifs luxembourg / imposition revenus locatifs luxembourg / declaration revenus locatifs luxembourg | b | I | AC |
| assurance loyer impayé luxembourg / garantie loyer luxembourg | b | I | AC (careful: *garantie locative* is the tenant deposit aid) |
| agence immobilière sociale luxembourg / fondation pour l'accès au logement | b | N | AC (mostly Belgian AIS; FAL is the GD AIS [S8]) |
| asbl logement luxembourg / association jeunes luxembourg | b/c | N/I | AC |
| youth work synergy (luxembourg / asbl / asbl photos) | all | N | AC (the "photos" suffix hints at a Maps/GBP entity; not verified) |
| corps européen de solidarité luxembourg / erasmus plus luxembourg | c/d | I | AC (erasmus); – (CES) |
| cycle de formation et d'évaluation (TEC) | d | I | EU portal FR term [S24]; – AC |
| mentions légales / politique de confidentialité (+ youth work synergy) | all | N | AC (generic only) |

### English (expats and international youth)

| Query (verbatim) | Who | Intent | Evidence |
|---|---|---|---|
| affordable housing luxembourg / affordable housing in luxembourg / low income housing luxembourg | a | I | AC |
| social housing luxembourg / subsidized housing luxembourg / government housing luxembourg | a | I | AC |
| room for rent luxembourg (city) / cheap room for rent in luxembourg (under 500) / single room for rent in luxembourg / shared room for rent in luxembourg | a | T | AC |
| furnished rooms luxembourg / shared house luxembourg / shared accommodation luxembourg / house share luxembourg | a | T | AC |
| coliving luxembourg (city / reddit) / co living luxembourg | a | T/I | AC |
| housing help luxembourg / housing support luxembourg / housing assistance luxembourg / housing aid luxembourg | a | I | AC |
| temporary housing luxembourg | a | I | AC |
| housing in luxembourg for foreigners / housing in luxembourg reddit / living in luxembourg reddit | a | I | AC |
| how to find housing in luxembourg / how to find accommodation in luxembourg | a | I | AC |
| rent subsidy luxembourg (calculator / reddit) / rent allowance luxembourg | a | I | AC; GOV |
| renting an apartment without CDI (forum phrasing) | a | I | Reddit, 24 Apr 2026 [S14] |
| youth housing (programs / support) | a | I | AC (not LU-specific) |
| social rental management (luxembourg) | b | I | GOV EN title "Opting for social rental management" [S4]; – AC |
| rental income tax luxembourg | b | I | AC |
| landlord luxembourg / rent out property luxembourg | b | I | AC (weak; mostly tenant intent) |
| guaranteed rent scheme (for landlords) | b | I | AC (UK-centric; use as wording only) |
| youth work luxembourg / youth work synergy luxembourg | c/all | N/I | AC |
| european solidarity corps luxembourg / erasmus+ ka210 (small scale partnerships) | c/d | I | AC |
| training and evaluation cycle / tec practices | d | N/I | AC; [S22][S23] |
| youth work conference 2026 / european youth work convention 2026 | d | I | AC (generic) |
| privacy policy / legal notice | all | N | AC (generic; "legal notice" in LU AC = *employment notice period*) |

### German (notes only, not built now)

| Query | Who | Evidence |
|---|---|---|
| wg zimmer luxemburg (stadt) / wg zimmer mieten luxemburg / luxemburg wg gesucht / zimmer mieten luxemburg | a | AC |
| günstige wohnung (in) luxemburg (mieten) / bezahlbarer wohnraum luxemburg / sozialwohnung luxemburg / wohnungsnot luxemburg | a | AC |
| jugendwunnen (snj / croix rouge / esch) | a | AC (state scheme name; don't imply YWS is part of it) |
| soziale mietverwaltung luxemburg | b | AC; GOV DE title "Soziale Mietverwaltung" [S5] |
| wohnung vermieten luxemburg / steuern mieteinnahmen luxemburg / mietgarantie luxemburg / wohnung an verein vermieten | b | AC |
| impressum / datenschutzerklärung | all | AC (generic) |

### Luxembourgish (notes only)

- Autocomplete with `hl=lb` gives almost nothing in Luxembourgish. "wunneng" → *wunnengshëllef*, *sozial wunnengen*, *wunneng ze verlounen*, *escher wunneng*. "jugendwunnen" works. "gestioun locative sociale" falls back to the French "gestion locative sociale". [S15]
- Takeaway (inference): LB speakers mostly search in **FR or DE**. LB pages would get little search traffic. If added later, they matter more for trust and identity than for SEO. A native speaker should check any LB slugs and copy.

---

## 3. Page × locale targets and slugs

URL pattern: `/{locale}/{slug}` for both languages (e.g. `/fr/logement-jeunes`, `/en/youth-housing`). Reciprocal `hreflang` fr / en plus `x-default`, which should point at `/fr/` because FR is the main market. Self-canonical on the **www** host, or switch the primary host to the apex: pick one. Server-rendered `<title>`, description and `lang` per locale (fixes F5). 301 every legacy URL (F6). Legacy PascalCase and WordPress URLs should go to the **EN** equivalents, because that is the content Google indexed under them.

### Slugs

| Page | EN slug | FR slug | Why |
|---|---|---|---|
| Home | `/en` | `/fr` | Locale root; the home page targets the brand plus the umbrella topic |
| Looking for housing (apply) | `youth-housing` | `logement-jeunes` | FR mirrors the head query "logement jeunes luxembourg" (AC). EN "youth housing" is the standard category term (AC), shorter than "looking-for-housing" and neutral on student vs worker |
| Rent your property (owners) | `rent-your-property` | `louer-son-bien` | FR: autocomplete has "louer **son** bien a une association" and "louer son appartement à une association"; "louer **mon** appartement luxembourg" returned nothing. Option: `proprietaires`. EN: keep the existing wording (a clean 1:1 redirect from `/RentYourProperty`); no stronger EN query exists |
| About us | `about-us` | `a-propos` | Standard and short. `qui-sommes-nous` is a fine alternative; neither is searched, so choose for consistency |
| We Spark projects | `youth-projects` | `projets-jeunes` | "We Spark" is ambiguous in AC (We Spark school, health institute, etc.) and nobody types it. Describe the content in the slug and keep "We Spark Projects" as the on-page brand label |
| TEC conference | `tec-conference` | `conference-tec` | TEC is the known acronym (SALTO/ESC). The page becomes an archive linking to tecpractices.eu. Target "TEC Practices" or "Training and Evaluation Cycle", not "TEC conference" (US-dominated AC) |
| Privacy policy | `privacy-policy` | `politique-de-confidentialite` | Conventional; matches what users type; no accents |
| Legal notice | `legal-notice` | `mentions-legales` | FR convention ("mentions légales luxembourg" is in AC). EN "legal notice" collides with employment notice periods in LU AC, but it is still the right label for a navigational page |
| *(bonus) Jobs* | `jobs` | `emplois` | The `/Jobs` route exists and the FR copy says "Emplois" / "Offres d'emploi" |

### Query targets

| Page | Locale | Primary query | Secondary (2–4) | Notes |
|---|---|---|---|---|
| Home | FR | Youth Work Synergy (asbl), N | logement jeunes Luxembourg (point to the housing page; avoid competing with it); asbl logement Luxembourg (AC); colocation pour jeunes au Luxembourg; gestion locative sociale (point to the owner page) | Two equal CTAs, young people and owners. Title idea: « Youth Work Synergy asbl – Logement abordable pour jeunes au Luxembourg » |
| Home | EN | Youth Work Synergy (N; AC "youth work synergy luxembourg") | affordable housing for young people in Luxembourg; youth housing Luxembourg; social rental management Luxembourg | |
| Housing | FR | logement jeunes Luxembourg (AC) | logement pour jeunes adultes Luxembourg (AC); colocation pas cher Luxembourg (AC); chambre meublée Luxembourg (AC); logement jeunes actifs Luxembourg (AC) | Say clearly whether students are eligible (AC is dominated by students), the price range, and "not RENLA". Add an FAQ: CDI?, waiting time, age |
| Housing | EN | affordable housing for young people in Luxembourg (parts in AC: "affordable housing luxembourg") | cheap room for rent in Luxembourg (AC); furnished room / shared house Luxembourg (AC); coliving Luxembourg (AC); housing support Luxembourg (AC) | Expats add "reddit" (AC), so honest, specific answers (prices, rules) earn links and mentions there |
| Owners | FR | gestion locative sociale Luxembourg (AC, GOV) | louer son appartement à une association (AC); exonération fiscale 90 % revenus locatifs (GOV wording; – AC); loyer garanti même si le logement est vide (GOV/SITE wording); louer son bien sans risques (AC) | Spell out "gestion locative sociale" and never write "GLS" alone in title or H1 (F9). Cite ACD for 90% and add a link to the logement.lu list |
| Owners | EN | social rental management Luxembourg (GOV) | rent your property to a non-profit in Luxembourg (–); rental income tax Luxembourg 90% exemption (AC: "rental income tax luxembourg"); guaranteed rent for landlords (AC generic) | |
| About | FR | Youth Work Synergy asbl (N) | asbl logement jeunes Luxembourg; travail de jeunesse Luxembourg (–); équipe et impact (on-page) | Put RCS F14106, the GLS approval, the ESC label and dated impact numbers here |
| About | EN | Youth Work Synergy (N) | youth work Luxembourg (AC); youth housing non-profit Luxembourg (–) | |
| Projects | FR | projets jeunes Luxembourg (–) | atelier logement jeunes (Get Your Home; –); documentaire crise du logement jeunes (Locked Out; –); projet de solidarité Corps européen de solidarité Luxembourg (–); Safe Paths Luxembourg (N) | Low demand. The value is funder proof and long-tail; give each project its own anchor or page and title |
| Projects | EN | youth-led projects Luxembourg (–) | European Solidarity Corps Luxembourg (AC); Erasmus+ KA210 small-scale partnership (AC); housing workshop for young people (–) | |
| TEC | EN | TEC Practices (N) / Training and Evaluation Cycle (AC) | ESC on-arrival training best practices (–); mobile learning for adults guide (–); TEC trainers (–) | Event is past. Add an archive summary, a link to tecpractices.eu and the project number; Event schema only if a new date is announced |
| TEC | FR | conférence TEC Practices (N) | cycle de formation et d'évaluation (CES) [S24]; formation à l'arrivée Corps européen de solidarité (–) | Currently all EN copy; translate or set FR to point to EN |
| Privacy | FR / EN | Youth Work Synergy politique de confidentialité / privacy policy (N) | – | Must cover Google Forms (housing and Safe Paths), the Supabase stats fetch, cookies/analytics if any. Indexable but low priority |
| Legal notice | FR / EN | Youth Work Synergy mentions légales / legal notice (N) | – | Legal name "Youth Work Synergy ASBL", seat, RCS F14106 (confirm on lbr.lu), contact, publisher, host (Vercel). I did not verify the exact legal list required for an ASBL website |

---

## 4. Brand and entity naming (facts only)

| Where | Name as written | Extra facts | Source |
|---|---|---|---|
| RCS (via North Data) | **Youth Work Synergy ASBL** | **RCS F14106**, EUID LURCSL.F14106; registered 26/05/2023; Fentange; purpose: "network of youth associations… affordable housing for young people aged 18 to 34 within the framework of social rental management…"; publications 15 Apr 2024 (board), 29/01/2025 (NACE update), 2 Jun 2025 (articles), 24 Jun 2025 (annual accounts). Board names are public there; not copied here | [S16] |
| Ministry of Housing GLS list | Youth Work Synergy a.s.b.l | Approved GLS organisation | [S1] |
| EU Youth Portal (ESC) | Youth Work Synergy | OID **E10339604**; ESC Quality Label, hosting + supporting, valid to 31/12/2027; address "Rue Pierre Weydert, 16"; phone +352691597315 | [S17] |
| Anna Lindh Foundation | Youth Work Synergy asbl | Founded 2023; network member; mentions partners Life asbl / WG-Projet | [S18] |
| CRIJE / JIP youth housing guide (Nov 2025) | Youth Work Synergy | "Homes for 18–34 year olds at affordable prices"; 11C Av. de la Porte-Neuve L-2227; 661 597 312 | [S10] |
| editus.lu | Youth Work Synergy Asbl (non-profit organisation, Fentange) | Search-result title only; site refused connection | [S19] |
| tecpractices.eu | Youth Work Synergy (Luxembourg) | Partner of Erasmus+ 2024-1-LU01-KA210-ADU-000255773; links to yws.lu | [S22] |
| LinkedIn | "Youth Work Synergy Affordable Housing - Mental Wellness - Youth Work Synergy" | URL is **`/in/ywslu`, a personal-profile type, not a Company Page**. `/company/youth-work-synergy/` returns 404 | [S20] |
| Instagram | @yws.lu | URL resolves (200) but content is behind login; not verified | [S21] |
| Facebook | (profile id 61557997643374) | `profile.php?id=` URL, no vanity name; content not verifiable without login | [S21] |
| Google Business Profile | not confirmed | AC "youth work synergy asbl photos" suggests a Maps entity exists (inference) | [S15] |
| Google index (yws.lu) | "Youth - Work - Synergy" (home), "We Spark Projects" / "Yws" (/WeSparkProjects) | Titles generated by Google because the HTML has none (F5) | [S31] |
| Site itself | "Youth Work Synergy ASBL" (footer ©), "YWS a.s.b.l." (addresses), "Youth Work Synergy (YWS)" (copy) | – | repo |
| Press | **No press articles found** in wort.lu, lessentiel.lu, RTL, Luxembourg Times, Paperjam, Virgule or Reporter (2 searches) | – | [S32] |

**Naming recommendation:**
- Display name: "**Youth Work Synergy**". Legal name: "Youth Work Synergy ASBL".
- `alternateName`: "YWS", "YWS asbl".
- Use it identically in Organization/NGO JSON-LD, the footer, legal notice, LinkedIn, Facebook and GBP.
- Fix NAP to one address and one phone everywhere (F8).
- Create a LinkedIn Company Page and a Facebook vanity URL.
- Add the RCS number and the GLS list URL to `sameAs` / `identifier`.

---

## 5. Sources (all checked 2026-10-09)

- [S1] logement.public.lu, Gestion locative sociale (page updated 23.09.2026): https://logement.public.lu/fr/proprietaire/logement-location/gestion-locative-sociale.html
- [S2] ACD, Immeuble… donné en location (GLS 90%/75%/50%; modified 24/02/2026): https://impotsdirects.public.lu/fr/az/l/logem_loc.html · circular L.I.R. 115/10: https://impotsdirects.public.lu/dam-assets/fr/legislation/circulaires/lir-115-10-du-1882023.pdf
- [S3] guichet.lu FR « Opter pour la gestion locative sociale » (75%, updated 17.04.2024): https://guichet.public.lu/fr/citoyens/logement/location/contrat-litige/offrir-location-agence-immo-sociale.html
- [S4] guichet.lu EN "Opting for social rental management" (75%, 17.04.2024): https://guichet.public.lu/en/citoyens/logement/location/contrat-litige/offrir-location-agence-immo-sociale.html
- [S5] guichet.lu DE "Soziale Mietverwaltung" (search-result title): https://guichet.public.lu/de/citoyens/logement/location/contrat-litige/offrir-location-agence-immo-sociale.html
- [S6] Chronicle.lu, 16 Mar 2024, 75%→90%: https://chronicle.lu/category/at-home/49017-luxembourg-to-raise-tax-exemption-to-90-for-social-rental-management
- [S7] Croix-Rouge owner brochure (EN, 2025): https://www.croix-rouge.lu/wp-content/uploads/2025/03/immo-Brochure-En.pdf
- [S8] guichet.lu, Agence immobilière sociale (service of FAL; search result): https://guichet.public.lu/fr/citoyens/organismes/organismes_citoyens/agence-immobiliere-sociale.html
- [S9] SNJ/MENEJ/MLOGAT brochure « Ensemble pour plus de logements pour jeunes » (Jugendwunnen, Nov 2025): https://www.snj.public.lu/wp-content/uploads/2025/11/2508042_brochure_SNJ_Jugendwunnen_web.pdf
- [S10] CRIJE/JIP "Youth Housing" guide (Nov 2025; lists YWS): https://crije.lu/wp-content/uploads/2025/11/PDF-Logement-JIP.pdf
- [S11] Gouvernement.lu, Observatoire de l'habitat Note 38 (Sept 2024): https://gouvernement.lu/fr/actualites/toutes_actualites/communiques/2024/09-septembre/26-observatoire-habitat-note.html
- [S12] Chronicle.lu, 28 Sep 2024, 60% of young tenants dissatisfied: https://chronicle.lu/category/surveys-reports/51610-60-of-young-tenants-dissatisfied-with-rental-conditions-in-luxembourg
- [S13] guichet.lu, RENLA registration (updated 01.04.2026): https://guichet.public.lu/en/citoyens/aides/logement-construction/logements-abordables/candidature-locataire.html
- [S14] r/Luxembourg "Renting an apartment without CDI", 24 Apr 2026 (snapshot mirror; reddit.com itself is blocked to my tools): https://reddit.sentinel-team.org/posts/1su8dce/snapshots/2026-04-24T23%3A14%3A30.5608Z
- [S15] Google autocomplete, fetched live: `https://suggestqueries.google.com/complete/search?client=firefox&hl={fr|en|de|lb}&gl=lu&q=<seed>`, about 260 seeds including a–z expansions of 8 core seeds. Raw output is in the session scratchpad (not in the repo)
- [S16] North Data, Youth Work Synergy ASBL, RCS F14106: https://www.northdata.com/Youth%20Work%20Synergy%20ASBL,%20Fentange/F14106 (confirm on https://www.lbr.lu)
- [S17] EU Youth Portal organisation 83530: https://youth.europa.eu/volunteering/organisation/83530_en
- [S18] Anna Lindh Foundation member page: https://alf.website/en/?members=youth-work-synergy-asbl (mirror https://dev.annalindhfoundation.org/node/13386 returned 503)
- [S19] editus.lu listing (search result only): https://www.editus.lu/en/youth-work-synergy-asbl-fentange-2097655
- [S20] LinkedIn: https://www.linkedin.com/in/ywslu/ (HTTP 999 to bots; title from search index); https://www.linkedin.com/company/youth-work-synergy/ (404)
- [S21] https://www.instagram.com/yws.lu/ (200, login wall); https://www.facebook.com/profile.php?id=61557997643374 (not fetchable)
- [S22] TEC Practices: https://tecpractices.eu/web/
- [S23] SALTO, About the TEC: https://www.salto-youth.net/rc/solidarity/training-support-community/tec/about/
- [S24] EU Youth Portal FR, training support (« cycle de formation et d'évaluation »; search result): https://youth.europa.eu/solidarity/organisations/training-support_fr
- [S25] ACD, organismes agréés (donations; updated 03/08/2026; YWS not listed): https://impotsdirects.public.lu/fr/az/l/libera_dons/organismes-agrees.html
- [S26] André Losch Fondation "Up to Youth" call: https://paperjam.lu/article/up-to-youth-appel-a-projets · https://chronicle.lu/category/charity-volunteering/49146-up-to-youth-group-launches-call-for-social-inclusion-mental-health-projects
- [S27] Live checks with curl (browser and Googlebot UA): https://www.yws.lu/ (+ /AboutUs, /LookingForHousing, /RentYourProperty, /WeSparkProjects, /TecConference, /Jobs, /robots.txt, /sitemap.xml); https://yws.lu → 308 → www
- [S28] Wayback CDX list of archived URLs: https://web.archive.org/cdx/search/cdx?url=yws.lu*
- [S29] Chronicle.lu, Jugendwunnen call for projects (search result): https://www.chronicle.lu/category/at-home/53465-luxembourg-launches-call-for-projects-to-increase-housing-for-young-people
- [S30] Paperjam EN, affordable housing for young people (18–26, may extend to 28; search snippet): https://en.paperjam.lu/article/government-aim-to-create-affordable-housing-for-young-people
- [S31] Web search index titles for www.yws.lu (search results, 2026-10-09)
- [S32] Press searches (standard + extended web search, 2026-10-09): no YWS press article returned

---

## Not covered:

- **Search volumes, keyword difficulty and SERP rank data.** No GSC, Keyword Planner or third-party SEO tool access. Autocomplete shows that demand exists, not how much.
- **Reddit at scale.** reddit.com is blocked to my fetch tools; only one thread was read, via a mirror. No Facebook groups ("Luxembourg housing" / colocation groups) or other forums were read.
- **LBR primary record.** RCS F14106 comes from North Data and was not opened on lbr.lu. Board names and annual accounts were not read.
- **Google Business Profile.** Not confirmed (no Maps access). Instagram and Facebook content, followers and activity not verified (login walls).
- **Legal content requirements.** The mandatory content of an ASBL legal notice and the privacy obligations (law of 7 Aug 2023 on ASBLs, e-commerce law, GDPR, the CNPD stance on Google Forms) need a separate legal check.
- **GLS contract terms.** Lease length, rent caps and renovation financing for GLS were not checked (the model convention PDF on data.public.lu was not read). YWS must provide its own terms.
- **German and Luxembourgish slugs and copy.** Notes only. LB orthography needs a native check. Suggested DE slugs if built: `wohnen-fuer-junge-menschen`, `wohnung-vermieten`, `ueber-uns`, `projekte`, `tec-konferenz`, `datenschutz`, `impressum`.
- **Competitor SERP snapshots** (who ranks today for each primary query) and backlink audit. Not done; only autocomplete and official sources.
- **Jobs page.** Only a slug suggestion. No keyword research on youth-work job queries.
- **Copy issues spotted but not audited:** the EN locale shows French text in `heroDescriptionJobs`; typo "éduacteur" in both locales; partner alt text "Fondation Summer" should be "Fondation Sommer"; the home hero says "up to 90%" instead of 90%.
