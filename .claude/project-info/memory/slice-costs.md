# Slice costs: what each closed slice spent of the budgets

> Owns: per-slice measured cost (initial JS gz, LCP/CLS/TBT, final Lighthouse medians) and the accepted Lighthouse
> skips. Budgets: `requirements.md` § Non-functional. The before numbers: `baseline.md`. How to measure: the
> `lighthouse-qa` skill (`bun run lhci`, laptop, median of 3, SwiftShader).

## Budgets (per route)

Initial JS ≤ 150 KB gz · fonts ≤ 100 KB · initial page ≤ 1 MB · 3D chunk ≤ ~300 KB gz (after idle, not initial) ·
3D assets ≤ 2 MB per scene · mobile perf ≥ 95 (floor 90) · LCP ≤ 2.0 s (floor 2.5 s) · TBT ≤ 100 ms (floor 200 ms) ·
CLS ≤ 0.05 · a11y / BP / SEO 100.

## Slices

| Slice | Date | Routes | Initial JS gz (KB) | Page KB (mobile) | LH mobile perf / LCP ms / TBT ms / CLS | a11y · BP · SEO | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0–2 Foundation, header, footer | 2026-10-09 | every route | (in the rows below) | | | | shared by every page; no route below its floors |
| 3 Home | 2026-10-09 | `/en/` · `/fr/` | 2–4 | 183 | 99 / 2027 / 0 / 0 | 100 · 100 · 100 | desktop perf 100, LCP 502 ms, TBT 0 ms |
| 4 Looking for housing | 2026-10-09 | `/en/youth-housing/` · `/fr/logement-jeunes/` | 0 | 123 | 99–100 / 1726–1727 / 6–19 / 0 | 100 · 100 · 100 | desktop perf 100, LCP 442 ms, TBT 0 ms |
| 5 Rent your property | 2026-10-09 | `/en/rent-your-property/` · `/fr/louer-son-bien/` | 0 | 123–124 | 100 / 1426–1427 / 15–28 / 0 | 100 · 100 · 100 | desktop perf 100, LCP 342 ms, TBT 0 ms |
| 6 About us | 2026-10-09 | `/en/about-us/` · `/fr/a-propos/` | 0 | 185–186 | 99 / 1951 / 0–16 / 0 | 100 · 100 · 100 | desktop perf 100, LCP 482 ms, TBT 0 ms |
| 7 We Spark projects | 2026-10-09 | `/en/youth-projects/` · `/fr/projets-jeunes/` | 0 | 360–361 | 99–100 / 1727–1728 / 27–85 / 0 | 100 · 100 · 100 | desktop perf 100, LCP 382–383 ms, TBT 0 ms |
| 9 TEC conference | 2026-10-09 | `/en/tec-conference/` · `/fr/conference-tec/` | 2–3 | 203–204 | 99 / 2101 / 25–52 / 0 | 100 · 100 · 100 | desktop perf 99–100, LCP 502–536 ms, TBT 0 ms |
| 11 Legal notice | 2026-10-09 | `/en/legal-notice/` · `/fr/mentions-legales/` | 0 | 120 | 100 / 1427 / 0–50 / 0 | 100 · 100 · 100 | desktop perf 100, LCP 342 ms, TBT 0 ms |
| 11 Privacy policy | 2026-10-09 | `/en/privacy-policy/` · `/fr/politique-de-confidentialite/` | 0 | 125–126 | 100 / 1426–1430 / 7–88 / 0 | 100 · 100 · 100 | desktop perf 100, LCP 341–342 ms, TBT 0 ms |

The rows: the full `bun run lhci` sweep of 2026-10-09 evening (36 rows, en + fr, mobile + desktop, median of 3, laptop, SwiftShader; the review build with `is-crawlable` skipped). Every row within the floors; 4 target misses, mobile LCP only: home 2027 ms and TEC 2101 ms in both languages (target 2000, floor 2500). The 404 is not in the sweep (`routes.ts` lists indexable pages); the review-only specimen scored 100.

## Load costs found and fixed (2026-10-09)

Lab numbers: `bun run lhci` (median of 3, laptop, SwiftShader), or the one-page probe (single runs, marked). The whole
sweep after the CSS fixes (`lhci-3`): every mobile row perf 94–99, TBT ≤ 148 ms, CLS 0, a11y / BP / SEO 100; every
desktop row 99–100 except home and TEC (below).

| Where | Before | Cause | Fix | After |
| --- | --- | --- | --- | --- |
| home · desktop (≥ 1280 px) | perf 68, TBT 2978 (en) / 3117 (fr) ms; spike: long tasks 2639 ms in React's chunk, 626 ms in the 3D chunk; chunk 1 MB raw, 279 KB transferred | the R3F + drei island: React, R3F, drei and three evaluated, the WebGL context and first frames inside React's commit, on the main thread | plain three.js in a worker on an OffscreenCanvas (`house-scene.ts`, `house.worker.ts`); React, R3F and drei removed from the site | probe: perf 98–100, TBT 0–19 ms; worker chunk 643 KB raw, 159 KB gz, off the main thread |
| TEC · desktop | perf 67–68, TBT 1541 (en) / 1610 (fr) ms; one 1304 ms task in the globe script | cobe compiling its shader and creating the context on the main thread (`getUniformLocation` waits for the compile) | cobe in a worker (`globe.worker.ts`, stand-ins for `window`, the CSS size and `Image`) | probe: perf 96–99, TBT 1–15 ms |
| housing · phones | perf 87, TBT 444 ms (spike); 400–560 ms in `lhci-2`; 4.7 s of 6 s CPU while the hero is on screen | the flow field: 400–700 `stroke()` calls + blurred copies per frame on the main thread | the draw loop in a worker on an OffscreenCanvas (`flow-field.worker.ts`) | probe: perf 96, TBT 123–166 ms; `lhci-3`: 97–99, TBT 95–103 ms |
| projects · phones | TBT 405–1100 ms (`lhci-2`) | 10 cards × sparkles (animated `<svg>` re-styled every frame) + the shine (`background-position`: a repaint per frame) + layout of the whole long page | sparkles as `<span>` transforms, the shine as a translated layer, loops paused off screen, `content-visibility: auto` on cards | `lhci-3`: perf 98–99, TBT 90–103 ms |
| about, owners fr, TEC · phones | TBT 234–681 ms (`lhci-2`) | the same loops and the off-screen layout (font swap re-layout of the whole page) | `content-visibility: auto` on `Section` and the footer | `lhci-3`: TBT 79–148 ms |

How the CSS causes were found: a DevTools trace per task (style-recalc element counts) and a CSS A/B under Lighthouse
(variants of one built page, interleaved, median TBT): `.project-card` content-visibility took TBT 215 → 148 ms.

## Safe-to-skip

| Audit | Where | Why it is accepted |
| --- | --- | --- |
| `is-crawlable` | every review build | review builds are noindex by design; the launch gate checks production robots |
| CrUX field data | every route | no real-user data in the lab; PSI field data is captured separately (`baseline.md`) |
