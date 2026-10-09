# Requirements

> Owns: what the site must do for each audience, acceptance criteria, budgets. Why: `project-brief.md`.
> Pages and sections: `structure.md`. Gates that enforce these: `tech/usage/visual-qa.md`.

## Users and roles (detail: `audience.md`)

| Audience | Comes to | One-tap next step |
| --- | --- | --- |
| Young person (18–34) looking for housing in Luxembourg | understand who qualifies, how it works, apply | **Apply** (external Google Form) · email · call |
| Property owner | see the guarantees (rent, tax, maintenance), trust the organisation | **email / call** the team (prefilled subject) |
| Partner, funder, institution | see who YWS is, impact numbers, partners, projects | email · LinkedIn |
| Youth-work practitioner | the TEC conference and its resources | tecpractices.eu |

## Features (no new features: the revamp improves these) [user 2026-10-09]

| id | Feature | Acceptance criteria | Status |
| --- | --- | --- | --- |
| F01 | Pages in en + fr on their own URLs | `/en/…` and `/fr/…` server-rendered, `<html lang>`, reciprocal hreflang + x-default, switcher with text labels keeps the page | todo |
| F02 | Apply for housing | Apply CTA reachable in 1 tap on every page (header), opens the Google Form in a new tab with a "(opens in a new tab)" note | todo |
| F03 | Rent your property contact | email (prefilled subject) + call buttons on the page, `tel:` per number in E.164 | todo |
| F04 | Contact without forms | per-audience next step, copy-to-clipboard for email + address, map behind a click-to-load facade, socials with names | copy built 2026-10-09 (`CopyButton`, e2e in 3 engines); the map loads by itself near the screen [user 2026-10-09] |
| F05 | Impact statistics | typed values (`statistics.ts`) in the HTML; no request to any third party [user 2026-10-09] | todo |
| F06 | Houses pictures | repo assets (`houses.ts`) through the image pipeline, alt text per locale, accessible gallery | todo |
| F07 | We Spark projects | each project with its own heading, photos responsive (≤ 2560 px, AVIF/WebP), links labelled | todo |
| F08 | TEC conference page | indexable summary in en + fr; past event stated truthfully; link to tecpractices.eu | todo |
| F09 | 3D moments | load after the H1, near visibility, poster under reduced motion / no WebGL / small screens, pause offscreen | todo |
| F10 | Credits dialog | lists every CC BY asset with title, author, link, licence, "modified" when optimised | todo |
| F11 | Legal pages | legal notice + privacy policy in en + fr, facts only, client facts marked PLACEHOLDER until approved | todo |
| F12 | 404 | per locale, noindex, links to the main journeys | todo |
| F13 | Old URLs | every PascalCase path 308s to its English page, both hosts, with/without slash, one hop | todo |

## Non-functional

| Area | Requirement | Source |
| --- | --- | --- |
| Performance (lab, Lighthouse mobile median of 3) | perf ≥ 95 target (floor 90); LCP ≤ 2.0 s target (floor 2.5 s); TBT ≤ 100 ms target (floor 200 ms); CLS ≤ 0.05; a11y / best practices / SEO = 100 | [user 2026-10-09 § 7] |
| Weight budgets | initial JS ≤ 150 KB gz per route; fonts ≤ 100 KB; initial page ≤ 1 MB; 3D chunk ≤ ~300 KB gz; 3D assets ≤ 2 MB per scene; every image sized and in a modern format | [user 2026-10-09 § 7] |
| Usability | impressive within 3 s AND usable in 1 tap on a phone; no preloader, gate or scroll-jacking; same content on mobile | [user] |
| Accessibility | WCAG 2.2 AA (axe 0 violations); reduced motion everywhere; 24 px targets; focus visible and never under the sticky header; skip link; DOM text for anything drawn in a canvas | [user], [research] |
| SEO | per page × locale: unique title ≤ ~60 chars, description ≤ ~155, self-canonical, hreflang, OG + Twitter with a 1200×630 image, JSON-LD graph; robots + sitemap; one host | `seo.md` |
| Browsers | last 2 Chrome / Edge / Firefox / Safari; iOS Safari 17+; Android Chrome; widths 320–2560 | [assumption] |
| Privacy | no forms, no tracking, no cookies before consent (map facade); facts in `compliance-and-data.md` | [user] |
| Content truth | no invented numbers, testimonials, dates, partners; placeholders block launch (launch gate) | [user] |

## Explicitly not building

Forms of any kind · chat widget · newsletter · booking · accounts · analytics without the owner's OK · preloaders and intro
gates · scroll-jacking · cursor effects that hide the pointer · new pages except where SEO needs an HTML home for
existing content [user 2026-10-09].
