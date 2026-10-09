---
name: lighthouse-qa
description: "Performance/SEO/accessibility/best-practices QA for yws.lu. Runs Lighthouse (median of 3, mobile + desktop) against the built Astro site served on 4322 and fixes issues in a loop until every route is within budget, or plateaued at/above the floor with the reason recorded. Use in every slice's evaluate step, whenever a change can move a score, and in the full sweep before launch. Triggers: 'lighthouse', 'pagespeed', 'core web vitals', 'performance score', 'accessibility audit', 'LCP', 'TBT'."
argument-hint: "[optional: routes, e.g. /en/ /fr/logement-jeunes/]"
---

# /lighthouse-qa

Audit the built site (`web/dist/`, Astro static output) with Lighthouse and fix issues in a loop until every route is
fast, accessible, best-practice and SEO-complete. The objective twin of the visual loop (`tech/usage/visual-qa.md`).

## When to run

- Every slice's evaluate step (`working-agreement.md` § 9): the routes the slice touched, both locales.
- Whenever a change can move a score: media, fonts, metadata, a new route, an embed, a React island, the 3D scenes.
- The full sweep of every route × locale before launch (P8).

## Lighthouse vs PageSpeed Insights vs the case study

- **`bun run lhci`** (from `web/`, `scripts/lighthouse.mjs`): the gate. Builds nothing: run `bun run build` first.
  Serves through the Vercel-like server on 4322 (`scripts/serve.mjs`: redirects, headers, trailing slash, brotli),
  reusing it when up. Mobile median of 3 + desktop; prints a table, writes `web/lighthouse/summary.json` (gitignored),
  **exits 1 on any budget miss**.
- **`scripts/capture/lighthouse.mjs`** (repo root): the case-study capture (P0 "before", P8 "after"), same settings
  both times; keeps reports and filmstrips in `.case-study/`. Not a gate.
- **PageSpeed Insights:** Lighthouse on a public URL + CrUX field data. A post-deploy sanity check on the preview or
  live URL (the API needs `PSI_API_KEY`; without it use the web UI). Lab and field are always labelled.

Settings that keep numbers honest (`lessons.md`): **run Lighthouse alone** (no builds, shots, installs or agents'
scripts in parallel); WebGL through SwiftShader (`--use-angle=swiftshader --enable-unsafe-swiftshader`), so the 3D
really renders; compare medians, never one run; numbers from another machine are not comparable.

```bash
cd web && bun run build
MSYS_NO_PATHCONV=1 bun run lhci                                  # every route × locale, mobile + desktop
MSYS_NO_PATHCONV=1 node scripts/lighthouse.mjs /en/ /fr/logement-jeunes/ --runs 3
```

Single-route deep audit (the scalpel): `bunx lighthouse http://localhost:4322/en/ --only-categories=performance
--chrome-flags="--headless=new --use-angle=swiftshader --enable-unsafe-swiftshader" --output=json --output-path=lighthouse/en-perf.json`
(set `CHROME_PATH` to Playwright's Chromium if it can't find Chrome).

## Budgets (`product/requirements.md` § Non-functional)

| Metric (median) | Target | Floor | Notes |
| --- | --- | --- | --- |
| Performance (mobile) | 95 | 90 | the only score allowed to plateau between floor and target |
| Accessibility / Best Practices / SEO | 100 | 100 | no plateau: anything under 100 is a real issue |
| LCP | ≤ 2000 ms | ≤ 2500 ms | the H1 is the LCP element |
| CLS | ≤ 0.05 | ≤ 0.05 | |
| TBT | ≤ 100 ms | ≤ 200 ms | |
| Weight | initial JS ≤ 150 KB gz/route, fonts ≤ 100 KB, page ≤ 1 MB, 3D chunk ≤ ~300 KB gz, 3D assets ≤ 2 MB/scene | | |

Review builds are `noindex` on purpose: the gate scores SEO without `is-crawlable`, and the launch gate inside
`bun run build` checks the production robots. Never flip a review build to indexable to move a number.

## Performance: two structural passes, then stop

Lab numbers jitter; compare medians against `memory/baseline.md`, `memory/run-notes.md` and `memory/slice-costs.md`.
Fix only structural causes: an island that should be HTML, a `client:load` that should be idle/visible, the 3D chunk
on the LCP path, an unsized or unoptimised image, an unsubset font, a blocking script, a live CSS blur on a fixed
full-screen layer, a loop that animates offscreen. After two real structural passes, record what is left and why.

## Fix playbook (root cause, never weaken a signal)

- **LCP: diagnose first.** SI good but LCP bad → the H1 or lead is hidden by an entrance animation (the 2025 site's
  BoxReveal hid the H1 until hydration: LCP 49.7 s on mobile). Check the built HTML for `opacity:0` on the H1; take the
  entrance off the LCP candidate. FCP also bad → render-blocking CSS or fonts. Only then suspect an image.
- **Above-the-fold image** → `astro:assets` `<Picture>` with real `widths`/`sizes`, eager + `fetchpriority="high"`;
  everything below the fold lazy.
- **TBT** → read `dist/_astro/*.js` gzip sizes; usual offenders: an island that needs no interaction, R3F/three
  loading before idle, shader compile on the main thread (keep programs small, measure the longest frame gap cold),
  a canvas loop running offscreen.
- **CLS** → reserve space (`width`/`height`, `aspect-ratio`), no content injected above existing content, metric-matched
  font fallback.
- **Fonts** → Montserrat self-hosted woff2 subset, preloaded from `BaseLayout.astro`, `font-display: swap` with a
  matched fallback; no flag-emoji font (the switcher uses text labels).
- **Third parties** → Google Maps behind a click-to-load facade, nothing third-party on the LCP path.
- **SEO** → every page passes title + description (Lingui) to `BaseLayout.astro`; canonical and hreflang come from
  `alternates()`/`pathTo()` in `web/src/lib/routes.ts`; navigation is real `<a href>`; meaningful `alt`.
- **Accessibility** → contrast: fix the token in `web/src/styles/global.css` (the tokens test checks AA) or add a
  scrim; names: visible label first (WCAG 2.5.3); one `<h1>`; targets ≥ 24 px; never `tabIndex=-1` on a real control.
- **Best practices** → a clean console (no 404 assets, no CSP violations), correct aspect ratios, HTTPS only.

## Safe-to-skip (record each under `## Safe-to-skip` in `memory/slice-costs.md`)

- `is-crawlable` on a review build (the launch gate checks production robots).
- CrUX "no field data" before launch.
- A point or two of performance lost to a 3D moment that already loads after LCP, near visibility, with a poster and a
  reduced-motion path, inside its chunk budget. Never an excuse for an unoptimised asset.

## Definition of done

- [ ] Fresh `bun run build`, then `bun run lhci` on every touched route in en and fr; `web/lighthouse/summary.json` holds the numbers.
- [ ] a11y / best practices / SEO at 100; performance ≥ 95 or plateaued ≥ 90 with the reason recorded; LCP/CLS/TBT within the floors.
- [ ] Every remaining audit fixed or listed under `## Safe-to-skip`.
- [ ] The slice's cost (JS KB gz, LCP/CLS/TBT delta, final scores) in `memory/slice-costs.md`.
- [ ] `bun run check` and `bun run e2e` still green.
- [ ] One `log.md` line: `## [YYYY-MM-DD] <area> | Lighthouse QA (perf/a11y/bp/seo <scores>, <fixes>)`.
