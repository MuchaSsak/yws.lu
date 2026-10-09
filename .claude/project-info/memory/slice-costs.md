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
| — | | | | | | | none closed yet |

## Known costs to fix in their slice (measured on the spike, 2026-10-09)

| Where | Cost | Cause | Plan |
| --- | --- | --- | --- |
| home · desktop (≥ 1280 px) | perf 67, TBT 3173 ms (long tasks 2639 ms in React's chunk at 0.9 s, 626 ms in the 3D chunk at 3.6 s); 3D chunk 224 KB br | the R3F house island: WebGL context + first scene compile inside React's commit, under SwiftShader | measure each step with marks; compile with `compileAsync` (`KHR_parallel_shader_compile`), split the mount across tasks, consider mounting on first intent (pointer/scroll); keep the poster as the static state |
| housing · phones | perf 87, TBT 444 ms; 4.7 s of 6 s CPU while the hero is on screen | the flow field: 400–700 `stroke()` calls + two full-canvas `blur()` copies per frame | batch strokes by hue/alpha bucket, 30 fps, fewer streaks on phones, glow from a CSS-filtered copy instead of canvas blur |

## Safe-to-skip

| Audit | Where | Why it is accepted |
| --- | --- | --- |
| `is-crawlable` | every review build | review builds are noindex by design; the launch gate checks production robots |
| CrUX field data | every route | no real-user data in the lab; PSI field data is captured separately (`baseline.md`) |
