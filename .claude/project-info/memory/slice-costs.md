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

## Safe-to-skip

| Audit | Where | Why it is accepted |
| --- | --- | --- |
| `is-crawlable` | every review build | review builds are noindex by design; the launch gate checks production robots |
| CrUX field data | every route | no real-user data in the lab; PSI field data is captured separately (`baseline.md`) |
