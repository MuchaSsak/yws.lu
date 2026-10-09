# Technologies

> The stack, its pinned versions, the framework decision with its numbers, hosting, env var names and every command.
> How Astro is used day to day: [astro](usage/astro.md); Lingui: [lingui](usage/lingui.md); 3D: [three](usage/three.md);
> the gates: [visual-qa](usage/visual-qa.md); code rules: [conventions](conventions.md). Evidence:
> `research/2026-10-09-stack.md` [research: stack].

## Stack (the new site, `web/`)

| Layer | Package | Pin | Why |
| --- | --- | --- | --- |
| Framework | astro | 7.3.8 | static output, HTML first, ≥ 7.2.8 for the AVIF RCE fix [research: stack § 0] |
| Islands | none: no UI framework ships | — | React, R3F and drei were the 3D island until 2026-10-09; the scenes are plain three.js and cobe in workers ([three](usage/three.md)) |
| 3D | three (+ `GLTFLoader`, meshopt decoder), cobe | 0.186.1, 0.6.5 | drawn in workers on OffscreenCanvas, a page fallback where a worker has no WebGL |
| i18n | @lingui/core, cli, conf, format-po, vite-plugin + lingui-for-astro | 6.9.0 + 0.7.1 | `.po` catalogs, macros in `.astro` ([lingui](usage/lingui.md)) |
| Macros | @lingui/native-tools | 0.1.6 | native binary, no WASM fallback: `bun.lock` must hold the linux-x64-gnu build for Vercel |
| CSS | tailwindcss + @tailwindcss/vite | 4.3.3 | `@theme` tokens in `src/styles/global.css` |
| Sitemap | @astrojs/sitemap | 3.7.4 | hreflang alternates |
| Images | sharp | 0.35.5 | < 0.35.5 has the librsvg advisory |
| Font | @fontsource-variable/montserrat | 5.3.0 | OFL, self-hosted, the Latin file preloaded |
| Types / checks | typescript ~6.0.3, @astrojs/check 0.9.10 | | `@astrojs/check` peers TS ≤ 6 |
| Tests | vitest 5.0.3, @playwright/test 1.63.0, @axe-core/playwright 4.13.0, lighthouse 13.5.0 | | the gates |
| Runtime | Node ≥ 22.19.0 (local 22.20), bun 1.3.14 | | Lingui 6 and Lighthouse need ≥ 22.19 |

Pins are exact (no `^`) and `bun.lock` is frozen on Vercel. A version bump is its own commit with the build, `check`
and `e2e` green.

## The 2025 site (root, until parity)

Next.js 15.3.8 App Router, React 19.2.6, a client-side dictionary (`lib/dictionary.tsx`), Supabase (read in the browser) for the statistics
row and the house pictures, GSAP/motion/R3F for effects. **31 advisories open on 15.3.8** (2 critical, 11 high), and
15.x support ends about 2026-10-21 [research: stack § 3.3]. It stays buildable at the repo root until every route is
migrated, then it is removed (P3).

## Decision: Astro 7 + Lingui 6 (2026-10-09, P3)

Measured on the laptop with the same script, settings and runs as the baseline (`scripts/capture/lighthouse.mjs`,
Lighthouse 13.5, median of 3, SwiftShader, en): the 2025 site from `next start` vs the spike from `scripts/serve.mjs`
(the spike home = hero + partner strip only; housing = the full page). Files: `.case-study/spike/lighthouse/`.

| Page · mode | Perf 2025 → spike | LCP ms | TBT ms | CLS | Transfer KB | JS KB |
| --- | --- | --- | --- | --- | --- | --- |
| home · mobile | 26 → **98** | 49918 → **1577** | 4850 → **145** | 0.012 → 0 | 9097 → 153 | 974 → 2 |
| home · desktop | 23 → 67 | 9095 → 752 | 7664 → 3173 | 0.168 → 0 | 9195 → 588 | 1070 → 279 |
| housing · mobile | 26 → 87 | 11815 → 1505 | 17401 → 444 | 0.036 → 0 | 5303 → 121 | 539 → 0 |
| housing · desktop | 45 → **99** | 2501 → 344 | 4171 → 0 | 0.006 → 0 | 4890 → 134 | 637 → 0 |

Accessibility 100 on all four (2025: 78–81). SEO 69 is the review build's `noindex` on purpose (`is-crawlable`, the
only failed SEO audit); BP 96 was the stretched background `<img>` (now a CSS background).

| Criterion | Next 15.3.8 (2025) | **Astro 7 + Lingui 6** | Next 16.3.8 + Lingui SWC 6.6.0 (fallback) |
| --- | --- | --- | --- |
| Page-level JS on a text page | 533–974 KB | **0–2 KB** (React only inside the 3D island) | RSC runtime + hydration on every page |
| Server-rendered metadata | none | static HTML | `generateMetadata` |
| Locales on real URLs | no | `/en/…`, `/fr/…` | `[locale]` segment |
| Security | 31 open advisories, 15.x support ends ~2026-10-21 | static files, no server runtime | patched, but the SWC plugin must match swc_core (6.7.0 breaks 16.3) |
| Proven by the owner | this repo | the portfolio (same stack, static on Vercel) | no |
| Risk | — | lingui-for-astro is pre-1.0, single maintainer: keep `.astro` copy as plain `t` calls | plugin/swc churn, Turbopack |

**Why Astro:** every framework-level number meets the budget (LCP 0.3–1.6 s, CLS 0, 0–2 KB page JS); the fallback
could not beat 0 KB of framework JS. **The two misses are effects, not the stack**, and cost the same on any
framework: the R3F house island on desktop (a 2.6 s task while React creates the WebGL scene under SwiftShader, then
0.6 s; TBT 3.2 s) and the housing flow field on phones (400–700 strokes + two full-canvas blurs per frame: 4.7 s of
6 s CPU while visible). Both are fixed (2026-10-09), with the numbers in `memory/slice-costs.md`: the
flow field draws in a worker, and the house is plain three.js in a worker (React, R3F and drei removed). Tag `history/pre-migration` marks the last commit before the migration.

## Hosting (Vercel, static, no adapter)

- **Static output, no `@astrojs/vercel`.** What a static site can't do lives in `vercel.json`: the `/` 307 by
  `Accept-Language`, the legacy 308s, `trailingSlash: true`, cache and security headers ([astro](usage/astro.md)
  § Hosting, [seo](../site/seo.md) § Redirects).
- **`vercel.json` sits at the repo root**, generated by `web/scripts/vercel-config.ts` from `web/src/lib/routes.ts`,
  so the owner never changes the project's Root Directory: `installCommand` `cd web && bun install --frozen-lockfile`,
  `buildCommand` `cd web && bun run build`, `outputDirectory` `web/dist`, `framework` `astro`. On `main` before the
  merge there is no root `vercel.json`, so production keeps building the Next app until the branch is merged.
- **Node** on Vercel: `engines.node >=22.19.0` resolves to 24.x (Node 20 deployments error since 2026-10-01).
  **Bun** on Vercel: "Bun 1" from `bun.lock`; Astro itself runs on Node through its bin shebang.
- **Previews:** branch previews of `revamp/2026-10` are allowed when a public URL is needed; local first
  (`bun run preview` behaves like Vercel) [user 2026-10-09].
- **Production settings are owner steps**: domains, env vars, deploy hooks, DNS ([seo](../site/seo.md) § Launch).

## Data: static, no backend

No database or API at build or run time. Supabase (one statistics row + a 7-picture bucket) was removed [user
2026-10-09]: the numbers are typed in `web/src/data/statistics.ts` and the pictures are repo assets listed in
`web/src/data/houses.ts` ([content model](../content/content-model.md) § Statistics). The 2025 app's TanStack Query
and Supabase client leave with the Next app at parity (P3).

## Env var names (values never in the repo or the wiki)

| Name | Read by | Effect |
| --- | --- | --- |
| `VERCEL_ENV` | `scripts/launch.mjs` | `production` = launch build (indexable, placeholders block) |
| `IS_FULL_PRODUCTION` | `scripts/launch.mjs` | `true` = launch build outside Vercel |
| `PUBLIC_SITE_URL` | `astro.config.mjs`, `scripts/launch.mjs` | overrides the origin (default `https://www.yws.lu`) |
| `VERCEL_URL` | `scripts/launch.mjs` | preview origin for review builds |
| `GOOGLE_SITE_VERIFICATION` | `BaseLayout.astro` | `google-site-verification` meta, only when set |
| `BING_SITE_VERIFICATION` | `BaseLayout.astro` | `msvalidate.01` meta, only when set |
| `PSI_API_KEY` | `scripts/capture/` | PageSpeed Insights API quota (optional) |
| `CHROME_PATH`, `CI` | capture and gate scripts | which Chrome; CI behaviour |

`.env.example` lists the names with empty values.

## Commands

Run from `web/` unless marked root. Serve before browser gates: `bun run preview` (port 4322).

| Do | Run | Notes |
| --- | --- | --- |
| Install | `bun install` | 117 s cold on the laptop ([run notes](../memory/run-notes.md)) |
| Dev server | `bun run dev` | port 4321; never for measuring |
| Static checks | `bun run check` | `astro check` + ESLint + Vitest |
| Unit only | `bun run test` | Vitest |
| Lint / format | `bun run lint` · `bun run format` | ESLint flat config · Prettier |
| Build + gates | `bun run build` | `scripts/build.mjs`: stale `vercel.json` check → `astro build` → `scripts/launch-gate.mjs` |
| Launch build | `bun run build --launch` | as production (`IS_FULL_PRODUCTION=true` for every step): placeholders and robots rules enforced |
| Serve like Vercel | `bun run preview` | `scripts/serve.mjs --port 4322` |
| e2e / cross-browser | `bun run e2e` · `bun run e2e:xb` | Chromium · Firefox + WebKit |
| Lighthouse gate | `bun run lhci` | median of 3, mobile + desktop, exits 1 under the floors |
| Shots | `bun run shots` | `--all`, `--full`, `--reduced`, `--accept` |
| Share images | `bun run og` | 1200×630 PNGs into `public/og/` + manifest |
| Posters / background | `bun run poster` · `node scripts/background.mjs` | committed outputs in `public/` |
| Catalogs | `bun run i18n:extract` · `node scripts/fill-fr.mjs` | extract, then fill existing French verbatim |
| `vercel.json` | `bun run vercel:config` | after any change to `src/lib/routes.ts` |
| Case-study capture (root) | `node scripts/capture/lighthouse.mjs …` · `node scripts/capture/browser.mjs …` | P0 before / P8 after |
| Wiki lint (root) | `node .claude/hooks/wiki-check.mjs` | 0 errors before a commit |
