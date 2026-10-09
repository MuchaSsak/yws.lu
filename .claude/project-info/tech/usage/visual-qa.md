# Visual QA and the gates (the evaluate step)

> Owns: step 3 "Evaluate" of every slice ([working-agreement](../../working-agreement.md) § 9): the gate commands and
> what fails them, the screenshot loop, what to read in a shot, scoring, Lighthouse rules, accepting proof, the Windows
> gotchas. Budgets: [requirements](../../product/requirements.md). Rubric: `design/design-quality.md`. Lighthouse loop:
> the `lighthouse-qa` skill. Measured timings: `memory/run-notes.md`.

## Status

The commands below are in `web/package.json` (2026-10-09). `bun run check` is green; `launch-gate.mjs` runs and fails,
as it should, until every route is migrated (links to unbuilt pages, share images); `bun run e2e`, `lhci`, `shots` and
`og` are wired but not yet run against a full build [repo: web/package.json]. Every command runs from `web/` against a fresh
`bun run build`, served by `bun run preview` (`scripts/serve.mjs` on 4322: Vercel's redirects, headers, trailing slash,
brotli, 404 status), never `astro dev` or `astro preview` ([astro](astro.md) § Local preview).

## The gates (machine)

| Gate | Command | Fails on |
| --- | --- | --- |
| static | `bun run check` | `astro check` type errors; ESLint (flat config); Vitest unit: data shapes, routes + `vercel.json` current, token pairs AA, catalogs complete and in sync (fr has every en id, no empty msgstr, same placeholders), scroll-driven CSS written in longhands |
| build + SEO/launch | `bun run build` | Lingui strict compile (a message missing from fr, a compile error); stale `vercel.json`; then `scripts/launch-gate.mjs` on `dist/`: a broken internal link, asset or `#anchor`; no title, description or canonical, or one over its hard cap (65 / 160 chars); not exactly one `<h1>`; more than one origin across canonical, hreflang, `og:url`, sitemap; hreflang not reciprocal; JSON-LD that doesn't parse; no `og:image` or its alt; a new-tab link that doesn't say so; a raster that isn't WebP/AVIF (favicons, share PNGs aside); any `<form>`. Launch build only (`IS_FULL_PRODUCTION` or `--launch`): any `PLACEHOLDER`, robots not as `site/seo.md` says [repo: web/scripts/launch-gate.mjs] |
| browser | `bun run e2e` (Chromium) | **a11y:** axe WCAG 2.2 AA on every route × locale + the 404s, skip link first tab stop and lands on `main`. **layout:** horizontal overflow at 320–2560, text wider than the content cap at ultrawide. **chrome:** a header control spilling or overlapping, the menu (keyboard open, every journey, Escape), footer (landmarks, one `tel:` per number, named socials), focus under the sticky header. **i18n:** `<html lang>`, title, self-canonical, hreflang en/fr/x-default, the switcher keeps the page, console errors and CSP violations. **motion:** under reduced motion the final state, nothing hidden (opacity 1, no transform). **redirects:** every `LEGACY` URL 308 in one hop to its English page, with and without slash; `/` 307 by `Accept-Language`. **text fit:** next row |
| text fit | in `bun run e2e` | in **every locale**, at every gate width, first paint and every switchable state (menu, carousel, dialog, tabs): text spilling out of its box, clipped, past the screen edge (in a swipe strip marked `data-scroller`: past the strip's scrollable width, and the strip inside the screen), a word split across lines, text on text (within one paint layer; text in a fixed layer that blurs or hides its backdrop, the header and the open menu, does not count against page text scrolling under it) [brief § 7] |
| cross-browser | `bun run e2e:xb` | Firefox: functional + axe + text fit. WebKit: functional + layout (Windows WebKit is not Safari: § Windows) |
| Lighthouse | `bun run lhci` | median of 3, mobile + desktop, every built route: **exits 1** on a11y / BP / SEO < 100, CLS > 0.05, or perf < 90, LCP > 2500 ms, TBT > 200 ms (the floors). Perf < 95, LCP > 2000, TBT > 100 (the targets) print as misses: a plateau between target and floor needs its reason in `memory/slice-costs.md` [repo: web/scripts/lighthouse.mjs] |
| share images | `bun run og` | writes the 1200×630 PNG per page × locale from `dist/` (localized title); the build gate fails while one is missing |
| shots | `bun run shots` | not pass/fail: prints `OVERFLOW <n>px` per shot; the eyes judge (§ The eyes) |

- **One route list:** the route map `src/lib/routes.ts` (`ROUTES` = every page Astro builds, `LEGACY` = the old URLs;
  the migration-era `READY` subset was removed once every route was built). Playwright specs import it through
  `e2e/routes.ts` (+ `WIDTHS = [320, 390, 768, 1024, 1440, 1920, 2560]`); the node scripts (`lhci`, `shots --all`,
  `og`) read the same list back from `dist/` with `builtRoutes()` in `scripts/routes.mjs`, so no TypeScript import and
  no second list [repo: web/scripts/routes.mjs]. A new route goes into `ROUTES`, and every gate sweeps it the same day.
- `scripts/capture/` at the repo root is the case-study capture (P0 before, P8 after), not a gate: it keeps its own
  frozen manifest (`pages.mjs`) so both runs measure the same pages [repo: scripts/capture/pages.mjs].
- Never weaken a gate to pass: fix the page [brief § 2]. Read every gate's output, not only the last one.

## The eyes (screenshot loop)

1. Build, then `bun run preview` in the background (port 4322).
2. `MSYS_NO_PATHCONV=1 bun run shots -- --paths /en/,/fr/ --widths 390,1024,1440,1920 [--full] [--reduced] [--accept]`
   (`--all` = every built route), then the 320, 768 and 2560 sweep. Scratch PNGs land in the repo-root
   `screenshots/.work/<path slug>/<width>[-rm][-full].png`, e.g. `fr_logement-jeunes/390.png` (gitignored)
   [repo: web/scripts/shots.mjs].
3. Put **en and fr side by side** for the same route and width; French runs longer, so boxes are sized for French.
4. Read each shot (table below), score it, fix the weakest point, rebuild, re-shoot. Loop until ≥ 8 and one more pass
   finds nothing worth fixing.
5. A `--reduced` pass at 390 and 1440 whenever anything animates: the final state, nothing hidden.

| Setting | Rule | Why |
| --- | --- | --- |
| GPU | shots, clips, posters: `--use-angle=d3d11 --enable-gpu --ignore-gpu-blocklist` (`shots.mjs`; `SHOT_FLAGS` in the capture) | SwiftShader frames of the 3D and shaders look broken (lessons, 2026-10-08) |
| Lighthouse | SwiftShader: `--use-angle=swiftshader --enable-unsafe-swiftshader` (`CHROME_FLAGS`) | deterministic, the same before and after [repo: scripts/capture/pages.mjs] |
| Long pages | full-page shots at device scale 1 (phones' fold shot at 2), or segments stitched | past ~16,384 device px the shot goes black |
| Reveals | scroll to the bottom and back (or `--settle`) before a full-page shot | in-view fades show as a visitor sees them |
| Phones | the case-study capture shoots < 768 px with a mobile user agent + touch; `shots.mjs` sets the viewport only | tap paths and the menu are e2e's job |

## What to read in a shot

| Look for | Where it usually bites |
| --- | --- |
| Horizontal overflow | 320 px, long French words, the partner marquee, tables |
| Text under fixed chrome | the sticky header after an anchor jump (`#contact`), a fixed element over the footer |
| Unreadable text over media | text over the aurora glow, the 3D scene or photos without a scrim |
| Orphans | one word alone on the last line of a heading or a button |
| Uneven cards | cards in one row with different heights or ragged CTAs |
| A label on two lines in one locale only | French nav items and buttons; size the box for French, never the English word |
| Ultrawide emptiness | 2560: content smeared edge to edge, or one lonely column in a sea of background |
| Clipped or overlapping text | fixed heights, `overflow: hidden` wrappers (`Reveal`), text on text |
| Focus and targets | focus ring visible on every control, targets ≥ 24 px on phones |
| Generic look | does it still feel like yws (playful, colourful, 3D, warm)? A feel change goes to `comps/`, not into the loop |

## Scoring

- Score each view with `design/design-quality.md`: **≥ 8/10**, and name the weakest point in the report and the log
  [user 2026-10-09]. An instant fail in the rubric caps the score whatever else is good.
- Objective fixes ship directly; a change to the feel is a proposal in `comps/` (current vs proposed, desktop + phone),
  shipped only if it scores higher and keeps the identity ([working-agreement](../../working-agreement.md) § 2).

## Lighthouse rules

- **Run it alone:** no build, shots, e2e, installs or agents' scripts in parallel; check the machine is quiet, rerun a
  suspicious median (a busy machine fakes regressions, lessons 2026-10-07).
- Median of 3, mobile + desktop, against `serve.mjs` on 4322; numbers from another machine are not comparable with the
  baseline (HANDOFF § 6). Review builds are `noindex`: `is-crawlable` is skipped, the launch gate checks robots.
- **Fix structurally, then stop tuning** (`lighthouse-qa` skill): two real structural passes (an island that should be
  HTML, 3D on the LCP path, an unsized image, an unsubset font, an offscreen loop), then record what is left and why.
- Record the slice's cost (JS KB gz, LCP/CLS/TBT delta, scores) in `memory/slice-costs.md`; timings in `memory/run-notes.md`.

## Accepting proof

- `--accept` copies the accepted 1920 and 390 views (en and fr) as WebP to `screenshots/<route>/`; like every shot they
  stay **local and gitignored**: only images the site ships are committed (lessons, 2026-10-08) [repo: .gitignore].
- Add one row per accepted view to `screenshots/VISUAL-QA.md` (the only committed file there): date, route, locale,
  widths, score, weakest point, commit.

## Windows gotchas that apply here

| Gotcha | Do |
| --- | --- |
| Git Bash rewrites `/en/` into `P:/Git/en/` | prefix any command with URL paths: `MSYS_NO_PATHCONV=1` |
| Node reads `/c/Users/...` as `C:\c\Users\...` | give node scripts `C:/...` paths |
| Stopping a server | by its port's PID: `netstat -ano \| grep :4322` → `taskkill //F //PID <pid>` (PowerShell: `Get-NetTCPConnection -LocalPort 4322`); never by image name, never a process you didn't start |
| Ports | 3100 the Next baseline (`next start -p 3100`), 4321 `astro dev`, 4322 the preview; the owner may run `next dev` on 3000 |
| Long commands | preview, e2e, lhci in the background; no foreground sleep loop |
| Playwright WebKit on Windows | not Safari (fonts, AV1, CSP noise): check a WebKit-only finding against the live site; real Safari is "not verified" until a Mac or iPhone looks |
| e2e role queries | match substrings: pass `exact: true` for short names |
| Reduced-motion 0.01 ms transitions | a value read right after a change is the old one: poll in tests |
