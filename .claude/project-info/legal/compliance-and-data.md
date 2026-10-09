# Compliance and data (facts, not legal advice)

> Owns: the site's data touchpoints, storage on the visitor's device, processors and other recipients, the legal
> notice's mentions, the privacy policy's required contents, the digital-consent age and rights to photos of people.
> Evidence: `research/2026-10-09-legal-asbl-luxembourg.md` (statutes, CNPD, EDPB, CJEU, vendor pages; source ids
> [Sx], all read 2026-10-09). Nothing here is a compliance claim; the client (and a Luxembourg lawyer, if they wish)
> approves the legal texts before launch. Asset licences: [assets](../design/assets.md). Legal pages' indexing:
> [seo](../site/seo.md).

## Scope

| Topic | Fact | Source |
| --- | --- | --- |
| GDPR | applies: the site and its channels handle personal data (emails, calls, housing applications on Google Forms, photos of identifiable people, hosting logs) | [research: legal § 2] |
| Controller | Youth Work Synergy ASBL; registered name, seat and RCS number **Unknown** (Q1) | [repo: lib/constants.ts], open-questions Q1 |
| DPO | mandatory for an association only in 3 cases (public body; large-scale monitoring; large-scale special-category or criminal data); CNPD: "très rare dans ce domaine". Whether YWS has one: **Unknown** | [research: legal § 2.2, S11] |
| Supervisory authority | Commission nationale pour la protection des données (CNPD), 1, avenue du Rock'n'roll, L-4361 Esch-sur-Alzette, tel. (+352) 26 10 60-1 | [research: legal § 2.1, S42] |
| Device storage | Loi modifiée du 30 mai 2005, art. 4(3)(e) (below) | [research: legal § 3.1, S23] |
| Legal notice | Loi du 7 août 2023 (ASBL) art. 20; Loi modifiée du 14 août 2000 art. 5 (scope: "normalement contre rémunération", interpretation); Loi modifiée du 8 juin 2004 arts. 62–63 (whether yws.lu is a "publication" by an "éditeur": interpretation) | [research: legal § 1] |
| Accessibility law | Loi du 28 mai 2019 (public-sector bodies; NGO exclusion) and Loi du 8 mars 2023 (EAA; micro-enterprise exemption): whether either applies depends on YWS's funding, governance, headcount and turnover (client facts). WCAG 2.2 AA is the project's quality bar either way | [research: legal § 4], [requirements](../product/requirements.md) |
| By design | **no forms** of any kind, no accounts, no analytics, no ads, no chat [user 2026-10-09]; the site itself collects nothing; contact = email, phone, map, socials | [research: kickoff § 2] |

## Data touchpoints

2025 = the live Next site; revamp = the Astro site in `web/` (static output, no serverless functions, no Vercel
adapter [research: stack]).

| Surface | Data | Goes to | 2025 | Revamp | Source |
| --- | --- | --- | --- | --- | --- |
| Any page view | IP, IP-derived location, system configuration, traffic logs (Vercel's list) | Vercel Inc. (hosting, CDN) | static + SSR pages; no `Set-Cookie` on the HTML (curl 2026-10-09) | static files only; `Referrer-Policy: strict-origin-when-cross-origin` and `Permissions-Policy: camera=(), microphone=(), geolocation=()` on every path | [research: legal § 0, § 2.2, S7], [repo: vercel.json] |
| Log retention | — | Vercel | **Unknown** (plan and settings: owner) | same | Q36 |
| Language | the visitor's choice | the browser | `localStorage["language"]` written on every visit (JSON string) | locale in the URL (`/en/`, `/fr/`); `/` answers 307 from the `Accept-Language` header (a Vercel rule); nothing stored | [repo: contexts/LanguageContext.tsx], [repo: vercel.json] |
| Fonts | none | — | Montserrat + Noto Color Emoji via `next/font/google`, self-hosted at build | Montserrat from `@fontsource-variable/montserrat`, bundled; no request to Google Fonts; emoji font dropped (text labels) | [repo: lib/fonts.ts], [repo: web/src/layouts/BaseLayout.astro] |
| 3D models | IP (request) | own origin; 2025 also **www.gstatic.com** (Google) | drei `useGLTF` fetches the Draco decoder from `https://www.gstatic.com/draco/versioned/decoders/1.5.5/` for the Draco models (`house.glb`, `bedroom.glb`) | meshopt with three's bundled decoder (`GLTFLoader` in a worker): no third-party request | [repo: web/src/components/three/house/house-scene.ts] |
| Statistics + house pictures | none personal (3 counters; 7 house photos named by town) | Supabase Pte. Ltd, via Cloudflare | read **in the browser** on page load; `tsgaliwebpcrjwtcxzdp.supabase.co` answers through Cloudflare and set `__cf_bm` (domain `supabase.co`, 30 min) | static in the repo since Supabase was removed [user 2026-10-09]: no third party involved | [research: legal § 0, § 2.2, S14], [content-model](../content/content-model.md) |
| Supabase middleware | cookies read (none set without a session) | Supabase Auth (server side) | `auth.getUser()` on every request | removed (no auth, static site) | [repo: middleware.ts, services/supabase/middleware.ts] |
| Apply for housing | whatever the form asks (fields not reviewed) | Google Forms, under YWS's Google account | external link | same link, `rel` + "opens in a new tab" text | [repo: web/src/data/organisation.ts], [research: legal § 2.2] |
| Project links | as above | Google Forms (Get your home, Safe Paths), Google Drive (Locked out) | external links | same | [content-model](../content/content-model.md) |
| TEC registration | registrant data | Zoom (`us06web.zoom.us`) | "Register" link | event past (9 Apr 2026): link to tecpractices.eu instead (Q8) | [repo: web/src/data/organisation.ts], open-questions Q8 |
| Email | what the visitor writes | YWS mailbox `contact@yws.lu`; MX `mx001`–`mx004.dclux.xion.oxcs.net`, SPF `include:spf.cloudeu.xion.oxcs.net`; operator **Unknown** | footer/contact spans and links | `mailto:` links (prefilled subject per audience, P7) + copy-to-clipboard (Clipboard API, nothing leaves the device) | [own DNS lookup 2026-10-09], [research: kickoff § P7] |
| Phone | the call | YWS phones (+352 28 66 22, +352 661 597 312; roles Q2) | one broken `tel:` with both numbers | one `tel:` per number (E.164) | [repo: web/src/data/organisation.ts], HANDOFF § 5 |
| Office map | IP, Google cookies | Google | Maps **place** embed (`/maps?q=…&output=embed`) loads lazily **without a click** on the home contact section; no `Set-Cookie` in its HTTP responses, JS storage untested | **loads by itself, lazily** (`loading="lazy"` in the markup, as in 2025) [user 2026-10-09]: nothing from Google on load (e2e); once the contact section nears the screen Google receives the IP and may store or read data; a caption links the privacy policy; "Open in Google Maps" link below | [repo: app/(components)/contact/ContactMap.tsx], [research: legal § 3.4] |
| Houses map | IP, Google cookies | Google | My Maps embed component exists, **not rendered**; its first response sets `NID` (`.google.com`, expiry Apr 2027, `SameSite=none`) | only behind the facade, if shown at all (Q31: it locates homes where young people live) | [repo: app/AboutUs/(components)/realImpact/RealImpactMap.tsx], [research: legal § 3.4] |
| Socials, partners, credits | none until clicked | Meta, LinkedIn, partner sites, Sketchfab, creativecommons.org | links | links; no SDK, plugin or embed | [repo] |
| Analytics | — | — | none | none (Q5: needs a privacy-policy section first) | [research: kickoff § 4] |
| Verification | none from visitors | Microsoft (`public/ms32821332.txt`), Google Search Console / Bing (DNS TXT or meta from env vars) | file served | file carried to `web/public/` | HANDOFF § 5, [seo](../site/seo.md) |
| TanStack Query devtools | Unknown (whether it writes storage in production was not verified) | — | mounted in `Providers.tsx` | removed | [repo: components/layout/Providers.tsx] |

## Storage on the visitor's device (Luxembourg)

- **Statute** (art. 4(3)(e), loi modifiée du 30 mai 2005): storing or reading information on the terminal needs the
  user's agreement "après avoir reçu une information claire et complète", except technical storage "visant
  exclusivement à effectuer la transmission d'une communication" or "strictement nécessaires au fournisseur pour la
  fourniture d'un service de la société de l'information expressément demandé". Penalty (art. 4(4)): 8 days to 1 year
  and/or EUR 251–125,000. [S23]
- **CNPD (03.01.2022)**: no consent for the cookie-choice record, authentication, cart, form answers, display and
  language personalisation, security for the publisher alone; streaming "Non, à condition que l'utilisateur ait
  clairement indiqué sa volonté d'accéder au contenu"; a feature cookie only "à partir du moment où l'utilisateur indique
  sa volonté d'utiliser le service". Essential cookies are still disclosed (Art. 13 information if personal data). [S25]
- **EU**: pre-ticked boxes are not consent (C-673/17 *Planet49*); scrolling is not consent, cookie walls are not free
  (EDPB 05/2020); a banner needs reject wherever it has accept (taskforce 2023); Art. 5(3) covers JS-triggered requests,
  pixels and IP-based tracking (EDPB 2/2023 v2). The "Digital Omnibus" (Nov 2025) is a proposal, not adopted. [S24, S26–S29]
- **Facades**: no CNPD or EDPB text names "click-to-load"; technically nothing reaches Google before the click. Whether
  the click is consent to Google's cookies or a "service expressément demandé" is **not settled** in the sources. [§ 3.4]

| Key | Set by | When | 2025 | Revamp |
| --- | --- | --- | --- | --- |
| `language` (localStorage) | the site | every visit | yes | gone (locale in the URL) |
| `__cf_bm` (cookie, `supabase.co`, 30 min; Cloudflare: "strictly necessary", no user id) | Cloudflare in front of Supabase | browser calls to Supabase | yes | no: Supabase removed |
| `NID` (`.google.com`, 6 months from last use per Google) | Google | My Maps iframe load | component not rendered | only after the facade click |
| Google Maps place embed storage | Google | iframe load | lazy, no click | lazy, no click [user 2026-10-09]; **Unknown** what JS stores |
| Draco decoder request (no storage; IP to Google) | gstatic.com | 3D load ≥ 1280 px | yes | gone |

**Revamp rule:** nothing is stored on or read from the device when a page loads, and no third party is contacted on
load. **One exception, the owner's decision [user 2026-10-09]:** the home office map loads Google's embed by itself when
the contact section nears the screen (the click-to-load facade was removed). Risk, stated to the owner: under art.
4(3)(e) and EDPB 2/2023, whatever Google stores or reads on the device then happens before any consent, and the IP goes
to Google (a US recipient) on scroll; the privacy policy discloses it (joint responsibility for the transmission,
*Fashion ID* C-40/17). If the client or a lawyer wants consent first, the facade comes back (git history,
`ContactSection.astro` before 2026-10-09). An e2e check dumps cookies + `localStorage` + third-party requests after load on every route
(proposed; `tech/usage/visual-qa.md`).

## Processors and other recipients

| Who | Role for yws.lu | Address / contact | Transfer basis (as the vendor states it) | Open |
| --- | --- | --- | --- | --- |
| Vercel Inc. | hosting + CDN; processor "subject to our Data Processing Addendum" | 440 N Barranca Avenue #4133 Covina, CA 91723 United States; privacy@vercel.com (policy updated 1 June 2026); DPA: "Vercel Inc., a Delaware corporation" (updated 17 Mar 2026, effective 31 Mar 2026) | EU-US DPF self-certification (per Vercel); DPA incorporates SCCs 2021/914 Module Two | plan (Hobby/Pro) and whether the DPA covers it: **Unknown**; the owner's portfolio research recorded the DPA as Pro/Enterprise only (not re-checked here) [file: portfolio legal/compliance-and-data.md] |
| Supabase Pte. Ltd (**2025 site only**: removed from the revamp, project to be deleted after the launch) | database + storage (no personal data read by the site) | 65 Chulia Street #38-02/03, OCBC Centre, Singapore 049513 (DPA "Version 1 — August 1, 2026") | SCCs (US, Singapore; Singapore has no adequacy decision); data in the region the customer picks | project region **Unknown**; subprocessors (1 June 2026) include AWS, Cloudflare, Google, Fly.io, Vercel |
| Cloudflare | in front of Supabase (`__cf_bm`), 2025 site only | — | — | not a recipient in the revamp |
| Google | Forms (housing, projects), Drive (Locked out), the home office map (loads near the screen) | — | Google LLC on the DPF list (status from a search snippet; page did not render) | Workspace (Cloud Data Processing Addendum) or personal account: **Unknown**; form fields, special-category data, who sees the answers: **Unknown** |
| Mailbox provider | receives `contact@yws.lu` | MX `*.dclux.xion.oxcs.net` | Unknown | operator and DPA: **Unknown** |
| Zoom | TEC registration (past event) | — | not checked | link goes (Q8) |
| Meta, LinkedIn | link targets only | — | — | — |

Transfers context (2026-10-09): the Commission's adequacy list (updated 23 July 2026) includes US DPF participants;
appeal C-703/25 P (lodged 31 Oct 2025) pending; EDPB letter of 31 July 2026 asks the Commission to assess *Trump v.
Slaughter*; no suspension found. [research: legal § 2.3]

## Legal notice (mentions légales): what to show

Pages `legal-notice` / `mentions-legales` [HANDOFF § 2]; linked from the footer's legal row on every page. Every
unknown value ships as `PLACEHOLDER` (logged in [placeholders](../placeholders.md); the launch gate blocks production).
**Built 2026-10-09** as `web/src/content/legal/{en,fr}/legal.md` (sections: publisher, contact, host, credits,
copyright, links), noindex; the client fills the `PLACEHOLDER` rows below.

| Mention | Rule | Value | Status |
| --- | --- | --- | --- |
| Name (dénomination) | 2023 law art. 20(1) 1° | `PLACEHOLDER` (footer writes "Youth Work Synergy ASBL"; North Data, a mirror of LBR, shows "Youth Work Synergy ASBL", not confirmed on lbr.lu) | Q1 |
| "association sans but lucratif" or "a.s.b.l.", right before or after the name | art. 20(1) 2° | "a.s.b.l." | known |
| Precise seat address (siège) | art. 20(1) 3° | `PLACEHOLDER` (code: "Siège (adresse postale) YWS a.s.b.l. : 16, rue Pierre Weydert, L-5891 Fentange"; statutory seat to confirm) | Q1 |
| "Registre de commerce et des sociétés, Luxembourg" or "R.C.S. Luxembourg" + number | art. 20(1) 4° | "R.C.S. Luxembourg" + `PLACEHOLDER` (secondary source shows F14106; not confirmed on lbr.lu [research: audiences-keywords S16]) | Q1 |
| Geographic address, contact incl. email | e-commerce law art. 5(1)(b)(c) | office 136-138, rue Adolphe Fischer, L-1521 Luxembourg; contact@yws.lu; both phones | known (phone roles Q2) |
| VAT number, authorisation and its authority | art. 5(1)(d) "le cas échéant" | `PLACEHOLDER` (if any; e.g. an agrément) | client |
| Legal representative / publisher (éditeur), person responsible for content | media law arts. 62–63 (applicability: interpretation); shown by all 4 ASBL sites studied | `PLACEHOLDER` | Q1 |
| Host | not in art. 5; common practice | Vercel Inc., 440 N Barranca Avenue #4133 Covina, CA 91723 United States | known |
| Credits | CC BY 4.0 § 3(a); MIT/OFL notices | link to the credits dialog and `THIRD_PARTY_NOTICES.md` | known |
| Copyright, image use, external-link disclaimer | practice (Inter-Actions, Cercle) | © year + name `PLACEHOLDER`; photo removal contact | Q10/Q22 |
| Accessibility statement | only if the 2019 law applies | **Unknown** (client facts) | open |

- Art. 20 lists "actes, factures, annonces, publications et autres pièces"; it does not name websites (interpretation;
  not settled). Art. 20(2): a person acting for the ASBL on a document missing a mention can be held personally liable.
- Law in force 23 Sept 2023; amended 4 Dec 2024 (arts. 7 and 77 only, art. 20 untouched). [S1–S3]

## Privacy policy: required contents (GDPR art. 13, CNPD guide for associations)

Pages `privacy-policy` / `politique-de-confidentialite`; footer link on every page; en + fr say the same thing
(client review of both). Plain language (art. 12), which matters for a young audience. **Rewritten 2026-10-09 as a formal notice
for the Website only** [user 2026-10-09: "lawyer grade", purely legal, not indexed] in
`web/src/content/legal/{en,fr}/privacy.md`, 14 numbered sections: scope (data given through Google Forms or by other
channels is outside it, with its own art. 13/14 information), framework (GDPR; the laws of 1 August 2018 and 30 May
2005, titles copied from cnpd.public.lu), controller, the Website's characteristics, five activities each with data,
purposes, basis, recipients and retention criteria (hosting; the Google map with joint control limited to collection
and transmission, *Fashion ID*; correspondence via `mailto:`/`tel:`; links; photos of people), recipients, transfers,
device storage, security (the headers in `vercel.json`), rights (arts. 15–20, 7(3), 12(3)(5)(6), 26(3)) with the right
to object set apart (art. 21(4), a callout), complaint (art. 77, CNPD), art. 22, children, changes, French prevailing,
Luxembourg law. Proposed bases and retention criteria are drafting choices for the client's approval
(`placeholders.md`); 5 markers per locale remain. Not legal advice: a Luxembourg lawyer may review before launch.

| Art. 13 item | yws.lu content | Status |
| --- | --- | --- |
| (1)(a) controller identity + contact | legal name, seat, contact@yws.lu; a dedicated privacy contact is what the CNPD asks for | `PLACEHOLDER` (Q1; privacy email Unknown) |
| (1)(b) DPO | contact if appointed | Unknown |
| (1)(c)(d) purposes + legal basis (+ legitimate interest if 6(1)(f)) | per activity: hosting logs; email/phone contact; housing applications and project sign-ups on Google Forms/Drive; photos of people; the office map | basis chosen and documented by YWS (art. 5(2)); **not picked here** |
| (1)(e) recipients | Vercel, Google, mailbox provider, Zoom (past) | mailbox operator Unknown |
| (1)(f) third-country transfers + safeguards | US (Vercel: DPF + SCCs; Google: DPF) | known |
| (2)(a) retention or criteria | per activity | `PLACEHOLDER` (client sets; never invented) |
| (2)(b)(c)(d) rights, withdrawal, complaint | access, rectification, erasure, restriction, objection, portability; withdraw consent where consent is the basis; complaint to the CNPD (address above); answer within 1 month (art. 12(3)) | known |
| (2)(e) statutory/contractual requirement | browsing: none; applications: client | client |
| (2)(f) automated decisions | none on the site; the application process: client | client |
| Device storage section | none by the site; what Google's map may store once it loads | known |
| Photos of people | basis, opt-out and removal contact | Q10/Q22 |
| Version date, changes | dated, both languages | — |

The CNPD allows a short first layer at the end of a form linking to the full policy [S11]: the Google Form's
description can link the site's policy (a client step; the form is outside the site).

## Ages

- **Digital consent age in Luxembourg: 16** (GDPR art. 8(1) default; the Loi du 1er août 2018 has no age provision; CNPD:
  "le consentement des mineurs d'au moins 16 ans est suffisant"). Art. 8 covers consent to information-society
  services offered directly to a child; the site runs no consent-based service. [S10, S42, S43]
- Housing audience: 18–34 [repo: lib/dictionary.tsx]. Youth projects may involve minors (Unknown per project).

## Rights to photos of people (Q10, Q22)

| Rule (Luxembourg) | Source |
| --- | --- |
| No statute; case law protects the image (Loi du 11 août 1982 art. 1, ECHR art. 8) | [S11, S42] |
| Two consents: to be photographed and to be published; per medium (print ≠ web ≠ social); silence = refusal; the publisher carries the proof | [S42] |
| Minors: the legal representatives' consent; from about 13 the minor's too (recommended); an annual consent form per purpose and medium, withdrawable | [S11, S42] |
| Public events the association organises: photos allowed on freedom-of-expression grounds; remove or blur on objection "dans la mesure du possible" | [S11] |
| GDPR: a tacit image-rights consent is not GDPR consent; another basis may be needed | [S42] |

| Image | People | Known | Revamp |
| --- | --- | --- | --- |
| `yws_group_photo.jpg` (About us hero) | yes | source and consent Unknown; no EXIF | kept as published (Q10 default), re-encoded |
| `projects/get-your-home/1–6.JPG` | per research, yes | EXIF: Sony ILCE-7RM2, taken 2025-09-30, `Artist` tag set (a photographer's handle), no GPS | kept (Q10 default); credit to the photographer if the client wants one |
| `projects/locked-out/1–4.JPG` | per research, yes | EXIF: Fujifilm X-E5, taken 2025-11-29, no GPS | kept (Q10 default) |
| Safe Paths posters, TEC banner | illustrations | illustration source Unknown (Q22) | kept as published (Q22 default) |
| House photos (`web/src/assets/houses/`) | houses | no people known | kept; no village named (Q40) |

Re-encoding through `astro:assets` (sharp) drops metadata by default [assumption: sharp default; check one output on
the first build]. A removal request contact goes in the privacy policy.
