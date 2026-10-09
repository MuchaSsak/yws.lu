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
- [x] Inventory (colours, type, spacing, radii, shadows, z, breakpoints, motion, components):
  `research/2026-10-09-design-inventory.md`
- [x] Tokens consolidated (@theme), AA unit test (17 pairs), duplicates merged
- [x] `design.md`, `design-quality.md`, specimen page (review-only, never in a launch build)
- [ ] ~~Applied with no visual change (shot diffs), tag `history/design-system-v1`~~ superseded: the owner asked for
  visual changes during the port (header, menu, projects, cards), so the shot-diff step and its tag were dropped;
  `history/pre-migration` and `history/after-2026-10` keep the two looks

## P3. Stack
- [x] Spike Astro + Lingui (housing page + home hero 3D) measured like P0 (`.case-study/spike/`): home mobile 98, housing desktop 99; misses = the 3D island (home desktop 67) and the flow field (housing mobile 87)
- [x] Decision table in `technologies.md` (Astro 7 + Lingui 6), tag `history/pre-migration`
- [x] Migration route by route (slices below)
- [x] Next app removed at parity [user 2026-10-09] (tag `history/next-app-final`); the root `package.json` keeps
  only the capture devDeps

## P4-P7. Slices (each: research → build → evaluate → fix → close)
- [x] 0 Foundation (layout shell, tokens, i18n, SEO infra, gates)
- [x] 1 Header + language switcher
- [x] 2 Footer
- [x] 3 Home
- [x] 4 Looking for housing
- [x] 5 Rent your property
- [x] 6 About us
- [x] 7 We Spark projects
- [x] 8 Jobs retired (308s, PDFs) [user 2026-10-09]
- [x] 9 TEC conference (past event: 9 April 2026)
- [x] 10 404
- [x] 11 Legal pages (privacy, legal notice; PLACEHOLDER facts)

Status 2026-10-09 (evening): every slice closed: `check` green (50 unit tests), `e2e` 390/390, `e2e:xb` 516/516, `lhci` 36 rows within the floors, the en+fr review at phone and desktop done page by page with the owner's redesigns (log.md). Numbers: `memory/slice-costs.md`.

## P8. After
- [x] Full sweep green; P0 capture re-run into `.case-study/after/` (Lighthouse en × 3 runs, SEO, axe, shots at 390 + 1440); `.case-study/REPORT.md` compares
- [x] wiki-lint, log, lessons, placeholders, open questions
- [x] Commit, tag `history/after-2026-10` (local); `.case-study/REPORT.md` + `.case-study/handover/`
- Left for the owner: clips and the outside tools (need a public URL), the
  launch steps (`site/seo.md` § Launch), 22 legal placeholders, open questions Q8, Q35, Q40, Q41
