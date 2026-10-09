# Revamp plan 2026-10 (live checklist)

> The resume point after a compaction: what is done, what is next. The brief is
> `research/2026-10-09-kickoff-prompt.md` (verbatim, § numbers below refer to it). Branch `revamp/2026-10`, never `main`.
> Update a box in the same commit as the work. Owner answers given 2026-10-09: Jobs retired, TEC page kept with internal
> nav, Vercel branch previews allowed (local preferred) [user 2026-10-09].

## P0. Before (no site change)
- [x] Tag `history/baseline-2026-10-09`, branch `revamp/2026-10`, `.case-study/` gitignored
- [x] QA tooling devDeps (Playwright 1.63, axe, lighthouse 13.5, chrome-launcher, sharp, gltf-transform, knip)
- [x] Baseline build (`next build`, log `.case-study/before/next-build.log`)
- [ ] Lighthouse local, 7 pages × mobile+desktop × 3 runs (`scripts/capture/lighthouse.mjs`) — RUNNING in background at the pause (next start on :3100, log `.case-study/before/lighthouse-local.log`; ~5/7 pages done). If it died: rerun with `--only` for the missing pages
- [ ] PSI field data: API quota exhausted anonymously → PSI web UI shots instead (P0.6)
- [ ] axe + SEO audit (local + live) + hosts/redirects (`scripts/capture/browser.mjs --tasks seo,hosts,axe`)
- [ ] Repo metrics (`scripts/capture/repo-metrics.mjs`): public/, images, models, deps, LOC, tsc, lint, knip
- [ ] Screenshots en+fr × 7 widths + reduced motion (`--tasks shots`)
- [ ] Clips (load 5 s, scroll, menu, language switch) (`--tasks clips`)
- [ ] Outside tools: Rich Results Test, Schema validator, PSI UI, OG preview (home + 1 inner)
- [ ] `.case-study/before/README.md` + `metrics.json`; `memory/baseline.md`
- [ ] Commit tooling + capture scripts

## Resume notes (pause 2026-10-09)
- Research done: comparable sites, audiences-keywords. Apply its slugs to `web/src/lib/routes.ts` + `scripts/capture/pages.mjs`: housing youth-housing / logement-jeunes, owners rent-your-property / louer-son-bien, about about-us / a-propos, projects youth-projects / projets-jeunes, tec tec-conference / conference-tec, privacy-policy / politique-de-confidentialite, legal-notice / mentions-legales. Its findings: owner tax exemption 90 % flat from tax year 2024 (ACD; guichet.lu outdated at 75 %) → Q17; RCS F14106 (North Data, confirm on lbr.lu) → Q1; on the Ministry's official GLS list. Running at pause: seo-structured-data, legal, stack, licences agents (their files land in `research/`; check they exist, else rerun).
- Spike WIP in `web/` (Astro 7.3.8 + Lingui 6.9 + lingui-for-astro 0.7.1, not installed yet): config, locales, routes (FR slugs provisional until keyword research), i18n, middleware, BaseLayout, header/footer/background, `scripts/vortex.ts`, `scripts/background.mjs`. Next: housing page + home hero (HouseScene island, poster), catalogs, `bun install` in web/ AFTER Lighthouse finishes, build, measure with `scripts/capture/lighthouse.mjs --phase after --only home,looking-for-housing`.
- Then P0 rest: `browser.mjs --tasks seo,hosts,axe` (local :3100 + live www.yws.lu), `repo-metrics.mjs`, shots, clips, outside tools, before/README + metrics.json, `memory/baseline.md`.

## P1. Framework
- [ ] Research notes (audiences/keywords, comparable sites, SEO/structured data, legal, stack, licences)
- [ ] Wiki pages (README, working-agreement, lessons, open-questions, placeholders, log, product/*, content/*, site/*, design/*, tech/*, legal/*, memory/*)
- [ ] CLAUDE.md, CLAUDE.local.md, hooks installed + routing tested (8 prompts, 3 fr, 1 noise)
- [ ] Skills moved + adapted, `SKILLS/` deleted (never committed)
- [ ] Gates as scripts + package.json commands; one route list
- [ ] wiki-check 0 errors; commit `chore(ai): ...`

## P2. Design system
- [ ] Inventory (colours, type, spacing, radii, shadows, z, breakpoints, motion, components) + contact sheet
- [ ] Tokens consolidated (@theme), AA unit test, duplicates merged
- [ ] `design.md`, `design-quality.md`, specimen page
- [ ] Applied with no visual change (shot diffs), tag `history/design-system-v1`

## P3. Stack
- [ ] Spike Astro + Lingui (housing page + home hero 3D) measured like P0
- [ ] Decision table in `technologies.md`, tag `history/pre-migration`
- [ ] Migration route by route (slices below), Next app removed at parity

## P4-P7. Slices (each: research → build → evaluate → fix → close)
- [ ] 0 Foundation (layout shell, tokens, i18n, SEO infra, gates)
- [ ] 1 Header + language switcher
- [ ] 2 Footer
- [ ] 3 Home
- [ ] 4 Looking for housing
- [ ] 5 Rent your property
- [ ] 6 About us
- [ ] 7 We Spark projects
- [ ] 8 Jobs retired (308s, PDFs) [user 2026-10-09]
- [ ] 9 TEC conference (past event: 9 April 2026)
- [ ] 10 404
- [ ] 11 Legal pages (privacy, legal notice; PLACEHOLDER facts)

## P8. After
- [ ] Full sweep green; P0 capture re-run into `.case-study/after/`; compare folder
- [ ] wiki-lint, log, lessons, placeholders, open questions
- [ ] Commit, tag `history/after-2026-10`; `.case-study/REPORT.md`
