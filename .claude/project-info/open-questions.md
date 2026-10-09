# Open questions

> Every Unknown, who can answer it, what it blocks, and the default used meanwhile (`[assumption]`). Answered
> questions keep their row with the answer and the date.

| # | Question | Blocks | Who | Default if unanswered | Status |
| --- | --- | --- | --- | --- | --- |
| Q1 | Registered legal name, RCS / LBR number (`F…`), legal representative (president) | legal notice, `Organization.legalName` / `identifier` JSON-LD | client | legal notice shows `PLACEHOLDER` fields; JSON-LD omits them | open |
| Q2 | The two phones: which is landline/mobile, what each is for, office hours? | contact buttons' labels, `ContactPoint` | client | both shown as "Phone" with the number; no hours | open |
| Q3 | German and/or Luxembourgish versions? | locales | client | en + fr only; adding one = a catalog + a config line (`i18n.md`) | open |
| Q4 | May the site credit the developer (a "site by" link, `creator` markup, humans.txt name)? | footer, humans.txt | owner + client | keep only the existing credits dialog [user 2026-10-09] | open |
| Q5 | Analytics? (needs a privacy-policy section first) | `analytics.md` | owner | none [assumption] | open |
| Q6 | Jobs page: offers still open? | `/jobs` | owner | — | **answered 2026-10-09: retire it** (308 → About us, no JobPosting) [user] |
| Q7 | TEC conference nav: internal page or tecpractices.eu? | nav, TEC page | owner | — | **answered 2026-10-09: keep the page, nav internal, link to tecpractices.eu** [user] |
| Q8 | The TEC conference took place on 9 April 2026: may the page say so (past tense, recording/resources at tecpractices.eu) instead of "Register on Zoom"? | TEC copy | client | page states the date as past; Register buttons become "Visit tecpractices.eu"; new copy listed for approval [assumption] | open |
| Q9 | Safe Paths workshops (April–May 2026) and other projects with past dates: keep as a portfolio of past projects? | We Spark copy | client | kept as written (they are a record of projects); dates unchanged [assumption] | open |
| Q10 | Rights to the photos of young people (project galleries, group photo): consent on file? | imagery | client | photos kept as published today [assumption] | open |
| Q11 | Partner logos: permission and the EU emblem rules for Erasmus+ / ESC | partner strip | client | kept as published today [assumption] | open |
| Q12 | Google Business Profile: does one exist for the office? NAP must match the site | local SEO | client / owner | runbook step for the owner (`seo.md` § Launch) | open |
| Q13 | Who updates Supabase statistics and how often? (decides the refresh path) | build-time data | client / owner | build-time fetch + client refresh [assumption] | open |
| Q14 | The brochure PDF (`public/files/brochure.pdf`) was linked only from dead code (`BedroomModel`): keep and link, or drop? | assets | client | not linked; file kept in git history [assumption] | open |
| Q15 | Is the LinkedIn URL (`/in/ywslu/`, a personal-profile URL) the organisation's official page? | `sameAs` | client | used as is [assumption] | open |
| Q16 | Vercel: which domain is primary in the project settings? (evidence: apex 308 → www) | canonical host | owner | `www.yws.lu` [assumption, verified by curl 2026-10-09] | open |
| Q17 | Owner tax exemption: guichet.lu says 75 % of net rental income for gestion locative sociale, the site and other NGOs say 90 %. Which figure and legal reference? | Rent your property copy | client | keep the client's "90 %" wording; flag in report [assumption] | open |
| Q18 | guichet.lu's page on gestion locative sociale (modified 17.04.2024) doesn't list YWS; logement.lu's partner list links to the bare https://yws.lu/. Ask to be listed / keep `/` working | trust, links | client | `/` keeps answering (307 by language) [research: comparable-sites] | open |
| Q19 | `x-default` hreflang: English or French? The keyword research says FR (main search market); the 2025 site defaulted to English and its copy was written in English first | hreflang, the `/` redirect fallback | owner | **English** [assumption 2026-10-09]: original copy, the old default, and the language most non-FR, non-EN residents (PT, DE, IT…) of the young audience read; one constant (`DEFAULT_LOCALE`) flips it | open |
| Q20 | Who owns the website code (developer or YWS)? The root `LICENSE` is Babel's MIT text ("Sebastian McKenzie"), and the public repo hands out client photos and logos under it. Fix the holder, scope MIT to original code, keep the repo public? | `LICENSE`, `THIRD_PARTY_NOTICES.md` | owner + client | LICENSE unchanged until answered; `THIRD_PARTY_NOTICES.md` added; no new third-party source files with redistribution limits [research: licences] | open |
| Q21 | EU funding: which projects are Erasmus+ / ESC funded? The 2021-27 rules want the "Co-funded by the European Union" emblem shown statically (not in a marquee) and as large as the biggest other logo; `erasmus.svg` is the old 2014-20 logo | partner strip, project pages | client (Anefore for the disclaimer) | partner strip kept, ESC and Erasmus+ logos shown statically, old logo flagged; emblem added only once the client confirms which projects [assumption] | open |
| Q22 | Source and rights of the poster illustrations (Safe Paths, TEC banner) and of the photos (project, group, houses); consent of the people shown | imagery | client | kept as published today, listed in `design/assets.md` as "client material, unconfirmed" [assumption] (see Q10) | open |
| Q23 | Aceternity UI (proprietary), GSAP (Webflow no-charge licence) and React Bits (MIT + Commons Clause) are outside the licence list | effects | owner | **replaced by own code** (the licence rule: not on the list = not used); same look, rewritten, never ported line by line [rule, 2026-10-09] | decided |
