# Revamp plan 2026-10 (live checklist)

> The resume point after a compaction: what is done, what is next. The brief is
> `research/2026-10-09-kickoff-prompt.md` (verbatim, § numbers below refer to it). Branch `revamp/2026-10`, never `main`.
> Update a box in the same commit as the work. Owner answers given 2026-10-09: Jobs retired, TEC page kept with internal
> nav, Vercel branch previews allowed (local preferred) [user 2026-10-09].

## P0. Before (no site change)
- [x] Tag `history/baseline-2026-10-09`, branch `revamp/2026-10`, `.case-study/` gitignored
- [x] QA tooling devDeps (Playwright 1.63, axe, lighthouse 13.5, chrome-launcher, sharp, gltf-transform, knip)
- [x] Baseline build (`next build`, log `.case-study/before/next-build.log`)
- [x] Lighthouse local, 7 pages × mobile+desktop × 3 runs: **rerun on the laptop** (`.case-study/before/lighthouse-laptop/`); Jobs mobile hung 3/3, desktop 1/3 (a finding); PC numbers kept as secondary
- [ ] PSI field data: API quota exhausted anonymously → PSI web UI shots instead (P0.6)
- [x] axe + SEO audit (local + live) + hosts/redirects (`scripts/capture/browser.mjs --tasks seo,hosts,axe`)
- [x] Repo metrics (`scripts/capture/repo-metrics.mjs`): public/, images, models, deps, LOC, tsc, lint, knip
- [x] Screenshots en+fr × 7 widths + reduced motion (`--tasks shots`): 21 views overflow horizontally
- [ ] Clips (load 5 s, scroll, menu, language switch) (`--tasks clips`)
- [ ] Outside tools: Rich Results Test, Schema validator, PSI UI, OG preview (home + 1 inner)
- [x] `.case-study/before/README.md` + `metrics.json`; `memory/baseline.md`
- [x] Commit tooling + capture scripts

## Resume notes
- Moving machines: [HANDOFF.md](HANDOFF.md) (setup, decisions, findings). The laptop is the measuring machine now.
- P0 left: clips, outside tools (Rich Results, Schema validator, PSI UI, OG preview), owner screenshots (ask in P8).

## P1. Framework
- [x] Research notes (audiences/keywords, comparable sites, SEO/structured data, legal, stack, licences)
- [x] Wiki pages (README, working-agreement, lessons, open-questions, placeholders, log, product/*, content/*, site/*, design/*, tech/*, legal/*, memory/*)
- [x] CLAUDE.md, CLAUDE.local.md, hooks installed + routing tested (8 prompts, 3 fr, 1 noise: 8/8 after adding LCP/TBT/CLS and « traduction » synonyms)
- [x] Skills built from the portfolio originals (`SKILLS/` was not carried to the laptop, never committed)
- [x] Gates as scripts + package.json commands; one route list (`check` green; e2e/lhci/shots/og wired, run in slice 0)
- [x] wiki-check 0 errors; committed

## P2. Design system
- [ ] Inventory (colours, type, spacing, radii, shadows, z, breakpoints, motion, components) + contact sheet
- [ ] Tokens consolidated (@theme), AA unit test, duplicates merged
- [ ] `design.md`, `design-quality.md`, specimen page
- [ ] Applied with no visual change (shot diffs), tag `history/design-system-v1`

## P3. Stack
- [ ] Spike Astro + Lingui (housing page + home hero 3D) measured like P0: built, poster rendered, Lighthouse running (`.case-study/spike/`)
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
