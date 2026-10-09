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
- [ ] Screenshots en+fr × 7 widths + reduced motion (`--tasks shots`)
- [ ] Clips (load 5 s, scroll, menu, language switch) (`--tasks clips`)
- [ ] Outside tools: Rich Results Test, Schema validator, PSI UI, OG preview (home + 1 inner)
- [ ] `.case-study/before/README.md` + `metrics.json`; `memory/baseline.md` (written; README + metrics.json to do)
- [ ] Commit tooling + capture scripts

## Resume notes (stop 2026-10-09, moving PC → laptop)
- **Read [HANDOFF.md](HANDOFF.md) first**: setup on the new machine, decisions, what is done, what was running, the
  ordered next steps, the baseline numbers and findings.
- Lighthouse local: 6/7 pages done; jobs desktop + tec-conference missing (jobs hangs under SwiftShader).

## P1. Framework
- [x] Research notes (audiences/keywords, comparable sites, SEO/structured data, legal, stack, licences)
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
- [ ] Spike Astro + Lingui (housing page + home hero 3D) measured like P0 — code written in `web/`, not installed/built/measured yet
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
