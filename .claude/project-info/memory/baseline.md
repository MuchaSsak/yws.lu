# Baseline (the "before" numbers)

> The 2025 Next.js site measured before any change, so every slice and the case study compare against real numbers.
> Raw files: `.case-study/before/` (gitignored, local). How it was measured: `scripts/capture/` (frozen manifest
> `pages.mjs`, the same for P8). Targets: [requirements](../product/requirements.md) § Non-functional. Timings and
> gotchas: [run notes](run-notes.md).

## Lighthouse, laptop (the reference for before/after)

`next build` + `next start -p 3100` on the laptop (Windows 11), Lighthouse 13.5.0, median of 3 runs, SwiftShader WebGL,
mobile = simulated Moto G Power + slow 4G, desktop preset, en, 2026-10-09 (finished 11:07 UTC). Run alone, 180 s limit
per run. File: `.case-study/before/lighthouse-laptop/summary.json` (+ each median run's JSON, filmstrip, final shot).
**The whole baseline was rerun on the laptop** so P8 compares like with like; the PC numbers are kept below.

| Page | Mode | Runs | Perf | A11y | BP | SEO | FCP ms | LCP ms | CLS | TBT ms | SI ms | KB | Req | JS KB |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | mobile | 3 | 26 | 78 | 100 | 82 | 6224 | 49918 | 0.012 | 4850 | 12229 | 9097 | 57 | 974 |
| home | desktop | 3 | 23 | 78 | 100 | 82 | 1429 | 9095 | 0.168 | 7664 | 6242 | 9195 | 70 | 1070 |
| looking-for-housing | mobile | 3 | 26 | 81 | 100 | 82 | 5006 | 11815 | 0.036 | 17401 | 11793 | 5303 | 35 | 539 |
| looking-for-housing | desktop | 3 | 45 | 81 | 100 | 82 | 1125 | 2501 | 0.006 | 4171 | 3999 | 4890 | 44 | 637 |
| rent-your-property | mobile | 3 | 28 | 84 | 100 | 82 | 5180 | 11681 | 0.021 | 7767 | 8802 | 6418 | 33 | 541 |
| rent-your-property | desktop | 3 | 36 | 84 | 100 | 82 | 959 | 4592 | 0 | 4263 | 4084 | 6042 | 44 | 637 |
| about-us | mobile | **2** | 27 | 82 | 100 | 82 | 4985 | 25956 | 0.019 | 11914 | 11530 | 9124 | 46 | 609 |
| about-us | desktop | 3 | 35 | 82 | 100 | 82 | 968 | 6242 | 0.03 | 3290 | 4555 | 3459 | 49 | 637 |
| we-spark-projects | mobile | 3 | 26 | 81 | 100 | 82 | 5050 | 25097 | 0.005 | 26703 | 19731 | 4578 | 46 | 533 |
| we-spark-projects | desktop | 3 | 32 | 81 | 100 | 82 | 1365 | 8614 | 0 | 8220 | 7858 | 7722 | 57 | 637 |
| jobs | mobile | **0** | hung | | | | | | | | | | | |
| jobs | desktop | **1** | 43 | 80 | 100 | 82 | 952 | 2896 | 0.037 | 4476 | 6386 | 8670 | 48 | 646 |
| tec-conference | mobile | 3 | 23 | 78 | 100 | 82 | 4977 | 11737 | 0.101 | 24843 | 19165 | 7338 | 39 | 557 |
| tec-conference | desktop | 3 | 34 | 78 | 100 | 82 | 1021 | 5742 | 0.011 | 12981 | 17711 | 8780 | 50 | 660 |

- **Hung runs (a finding):** Jobs never finished on mobile (3/3 > 180 s) and finished 1/3 on desktop; About us lost 1
  mobile run. WebGL that never settles under SwiftShader. Many runs also logged `PROTOCOL_TIMEOUT` and still finished.
- **The laptop is much slower than the PC** on main-thread work: TBT is 3–9× the PC's (home mobile 4850 vs 681 ms,
  housing 17401 vs 1950 ms), so perf is lower (home mobile 26 vs 41). Compare only laptop with laptop.
- **LCP** is late on every mobile page (11.7–49.9 s): the H1 sits behind the BoxReveal animation and JS hydration.
- Targets for the new site: mobile perf ≥ 95 (floor 90), LCP ≤ 2.0 s, TBT ≤ 100 ms, CLS ≤ 0.05, a11y/BP/SEO 100.

## Lighthouse, PC (secondary, not comparable)

Same settings on the PC, 2026-10-09 (`.case-study/before/lighthouse-local/`). Median mobile / desktop perf: home 41 /
30, housing 35 / 65, owners 36 / 68, about 30 / 60, projects 34 / 66, jobs 27 (1 run) / missing, tec missing. Table:
`HANDOFF.md` § 6.

## SEO and crawl (local `next start` and live www.yws.lu, same results)

`scripts/capture/browser.mjs --tasks seo,hosts`; files `.case-study/before/seo-*.json`, `browser-*.log`.

| Check | Result |
| --- | --- |
| Server-rendered `<title>` / description / canonical / hreflang | **none on any page** (client-only metadata) |
| `<h1>` per page | home 5, housing 3, owners 3, about 3, projects 1, jobs 4, tec 7 |
| JSON-LD | none |
| `<html lang>` | `en` on every page, also in French |
| French URLs | none: one URL per page, language from the browser / `localStorage` |
| robots.txt, sitemap.xml | 404 (both hosts) |
| Hosts | `http://yws.lu/` → 308 → 308 → 200; `https://yws.lu/` → 308 www; `/AboutUs/` → 308; `/aboutus` 404 |
| 404 | real 404, title "404: This page could not be found." (Next default), English only |
| Favicon | `/favicon.ico` = the **Next.js default triangle** (byte-identical to `app/favicon.ico`), linked next to the real 32 px "y" (`/favicon.png`) |

## Accessibility (axe 4.13, WCAG 2.2 AA tags, en + fr at 390 and 1440)

`.case-study/before/axe/axe.json`. 5–8 rules fail per page; pages = the 7 routes + the 404, nodes summed over the 4
runs per page.

| Rule | Impact | WCAG | Pages | Nodes |
| --- | --- | --- | --- | --- |
| button-name | critical | 4.1.2 | 8 | 48 |
| link-name | serious | 2.4.4, 4.1.2 | 8 | 96 |
| document-title | serious | 2.4.2 | 7 | 28 |
| color-contrast | serious | 1.4.3 | 5 | 70 |
| nested-interactive | serious | 4.1.2 | 3 | 28 |
| target-size | serious | 2.5.8 | 1 | 1 |
| list | serious | 1.3.1 | 1 | 4 |
| heading-order | moderate | best practice | 8 | 48 |
| region | moderate | best practice | 8 | 415 |
| landmark-one-main | moderate | best practice | 6 | 20 |

## Repo (`scripts/capture/repo-metrics.mjs`, `.case-study/before/repo-metrics.json`)

| Metric | Value |
| --- | --- |
| `public/` | **277.7 MB**; images 264.7 MB in 35 files; models 12.3 MB (rocket 5956 KB, bedroom 5163 KB (dead code), wardrobe 1421 KB, house 88 KB) |
| Dependencies | 34 prod, 7 dev at the baseline tag (14 dev now: P0 added the QA tools) |
| Lines of code | 13,004 (.ts/.tsx/.js/.mjs/.css in the app folders; includes P0's `scripts/capture/`) |
| `tsc --noEmit` | 0 errors |
| Lint | not configured: `next lint` stops at its setup prompt |
| knip | 51 unused files, 8 unused deps (`@react-three/postprocessing`, `face-api.js`, `mini-svg-data-uri`, `ogl`, `postprocessing`, `react-intersection-observer`, `rough-notation`, `split-type`), 4 unused devDeps, 5 unlisted, 28 unused exports |
| Next.js | 15.3.8: 31 open advisories (2 critical, 11 high) [research: stack § 3.3] |

## Still to capture (P0)

Screenshots en + fr × 7 widths + reduced motion, clips, outside tools (Rich Results Test, Schema validator, PSI web UI,
an OG preview), the owner's screenshots in `.case-study/before/owner/`. PSI field data: the API quota is exhausted
without a key (`.case-study/before/psi-live.log`).
