# Project brief

> Owns: why the site exists, the 2026-10 revamp's goals, scope and constraints. Requirements and budgets:
> `requirements.md`. Audiences: `audience.md`. The full revamp brief: `research/2026-10-09-kickoff-prompt.md`.

## One-liner

yws.lu is the website of **Youth Work Synergy ASBL**, a Luxembourg non-profit that rents homes from private owners and
sublets furnished rooms in shared houses to young people (18–34), with coaching and educational support
[repo: lib/dictionary.tsx `whoWeAreDescriptionHomepage`]. Built in 2025 by Mateusz Muszarski in under a week
[repo: README.md]; live at https://www.yws.lu on Vercel [web: curl 2026-10-09].

## Problem and why now (measured 2026-10-09, `memory/baseline.md`)

- **Google can't read it:** no `<title>`, description, canonical or JSON-LD is rendered (the metadata helper returns
  `undefined` on the server); Google titles the home page with the logo's alt text "Youth Work Synergy (YWS) Logo" and
  quotes the footer address as the About us snippet [user screenshot 2026-10-09].
- **French is invisible:** the language comes from `navigator.language` on one URL; `<html lang="en">` everywhere.
- **No robots.txt / sitemap.xml** (both 404), no link-preview card (Discord shows nothing) [user 2026-10-09].
- **Slow:** ~265 MB of images in `public/` (25–30 MB JPGs), 13 MB of 3D models, 480 kB first-load JS on home
  [file: .case-study/before/next-build.log]; mobile Lighthouse in the 30s–50s.
- **Hard to act on:** the contact email and phone are plain text (not links) on home and Rent your property; the phone
  link in the footer is broken; several CTAs are buttons wrapping `tabIndex=-1` links (keyboard can't follow them).

## Goals (priority order) [user 2026-10-09]

| # | Goal | Done when |
| --- | --- | --- |
| 1 | AI working framework (wiki, router, hooks, lessons, skills, gates) | `wiki-check` 0 errors, hooks route, gates run from `package.json` |
| 2 | Best achievable SEO, ready for Google Search Console + Bing | launch/SEO gate green inside `build`; runbook in `seo.md` § Launch |
| 3 | Performance + accessibility within budgets | `requirements.md` § Non-functional, Lighthouse gate green on every route |
| 4 | A documented, consolidated design system | `design.md` + specimen page + AA token test |
| 5 | Objective visual/UX improvements on every page, keeping the feel | design score ≥ 8 per view (`design-quality.md`) |
| 6 | Cleaner, scalable code (Astro + Lingui if the spike wins) | `technologies.md` § Decisions; knip clean |
| 7 | Evidence: before/after numbers, shots, clips, report | `.case-study/REPORT.md` |

## Scope

- **In:** every existing page (home, looking for housing, rent your property, about us, We Spark projects, TEC
  conference), 404, legal pages (privacy, legal notice) with facts only, SEO infrastructure, i18n en + fr on real URLs,
  performance, accessibility, design system, code structure, QA gates.
- **Retired:** `/Jobs` (both offers closed: "no longer needed" since 2026-05-11, commit 87b18ab) → 308 to About us,
  no JobPosting [user 2026-10-09].
- **Out of scope:** forms of any kind (contact, application, newsletter, chat, booking) [user 2026-10-09: "we
  deliberately decided not to have internal forms"]; new features; analytics (until the owner OKs it with a privacy
  policy); new locales (de / lb are the client's call, `open-questions.md`).

## Constraints

- **The feel stays:** playful, colourful, 3D, warm, for young people. Feel changes are proposals with before/after
  shots, never silent (`design.md`).
- **Truth:** client facts and statistics come from the client (constants, dictionary, the statistics they entered). New copy is factual,
  close to the client's words, listed for approval (`placeholders.md`).
- **Licences:** commercial-use-free or the client's own (`assets.md`).
- **Production untouched:** branch `revamp/2026-10`; Vercel / DNS / Supabase changes are owner steps (`seo.md` § Launch).

## Stakeholders and decision rights

| Who | Decides |
| --- | --- |
| Youth Work Synergy ASBL (the client) | content, statistics, new copy approval, French review, legal texts, new locales, author credit |
| Mateusz Muszarski (owner/developer) | stack, design system, merges, deploys, Vercel/DNS/Supabase settings |

## Risks

| Risk | Mitigation |
| --- | --- |
| Migration breaks a 3D moment or effect | per-route parity checklist, shot diffs, Next app kept until parity |
| Old URLs lose rankings | 308 for every old path (both hosts, with/without slash), e2e-tested |
| Statistics go stale | typed values with their date; the client sends new numbers, a commit updates them (`content-model.md` § Statistics) |
| New copy not approved | every new string listed in `placeholders.md` / the report |
