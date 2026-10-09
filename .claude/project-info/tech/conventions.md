# Conventions

> Owns: code style, naming, folder rules for `web/`, Astro vs island, CSS/Tailwind, i18n, images and git rules, the
> testing bar and the do-not list. How a session works: [working-agreement](../working-agreement.md). Versions and the
> stack decision: [technologies](technologies.md). Gate commands and the screenshot loop: [visual-qa](usage/visual-qa.md).

## Scope

- The new site lives in `web/` during the migration: Astro 7 static, Lingui 6.9, React 19 islands only for 3D,
  Tailwind 4, Vitest, Playwright + axe, Lighthouse 13.5, bun, Node ≥ 22.19 [repo: web/package.json; pending the spike].
- The 2025 Next app at the repo root is the **reference until parity**: read it, never extend it; each route is deleted
  once its Astro twin passes the gates, then the whole app goes [user 2026-10-09, brief § 6 P3].

## Code style

- **TypeScript strict:** `web/tsconfig.json` extends `astro/tsconfigs/strictest` [repo: web/tsconfig.json]. No `any`,
  no `@ts-ignore`; `satisfies` for lookup tables (the `ROUTES` pattern in `src/lib/routes.ts`).
- **ESLint flat config** (`web/eslint.config.js`, P1): `@eslint/js` + `typescript-eslint` + `eslint-plugin-astro`, and
  for `.tsx` `react-hooks` + `eslint-plugin-lingui`; `consistent-type-imports` (inline), unused vars are errors unless
  `_`-prefixed [assumption: mirrors the portfolio's config].
- **Prettier:** print width 130, `prettier-plugin-astro` + `prettier-plugin-tailwindcss` (class order); `.po` and
  generated files ignored. Run `bun run fmt` before a commit; not a gate [assumption].
- **Imports:** `~/` → `web/src/`, no `../../..`; groups node, packages, `~/`, relative. **Every file opens with a doc
  comment** naming what it is and its wiki page (`wiki: site/structure.md § Home`) [repo: web/src].
- **No dead code:** `knip` clean, no unused dependency, heavy libraries behind a dynamic import [brief § 6 P4]. **LF**
  line endings: no `.gitattributes` yet, add `* text=auto eol=lf` with the gates commit [assumption].

## Naming

| Thing | Rule | Example |
| --- | --- | --- |
| Components | PascalCase file and export | `HousingHero.astro`, `HouseCanvas.tsx` |
| Modules, scripts | lowercase kebab-case | `routes.ts`, `flow-field.ts`, `vercel-config.ts` |
| Fact tables | `UPPER_SNAKE` exports | `ROUTES`, `LEGACY`, `ORGANISATION` |
| Route ids | one short word | `housing`, `owners`, `projects` |
| URL slugs | lowercase kebab, localized, only in `src/lib/routes.ts` | `/fr/logement-jeunes/` |
| JS hooks in markup | `data-*`, never a class | `data-house-scene`, `data-inview` |
| Tokens | `--color-*`, `--radius-*`, `--ease-*` in `@theme` | `--color-primary-strong` |
| e2e specs | `web/e2e/<gate>.spec.ts` | `a11y.spec.ts`, `redirects.spec.ts` |
| Env vars | names only; `PUBLIC_` when the browser may see it | `PUBLIC_SITE_URL` |

## Folders (`web/`)

| Path | Holds | Rule |
| --- | --- | --- |
| `src/pages/` | `[locale]/index.astro`, `[locale]/[page].astro`, root `index.astro`, 404, `robots.txt.ts` | paths only from `pageStaticPaths()` (every route in `routes.ts`); a page picks sections and passes title + description, nothing more |
| `src/layouts/` | `BaseLayout.astro` | the only `<head>` ([astro](usage/astro.md)) |
| `src/components/<page>/` | sections of one page: `home/`, `housing/`, `owners/`, `about/`, `projects/`, `tec/`, `legal/` | used by one page only |
| `src/components/ui/` | shared primitives: `ButtonLink`, the section + section-header pair (the 2025 `XHeader` + `XSection` idea) | a component used by two pages moves here; never a copy |
| `src/components/layout/` | header, footer, background | |
| `src/components/effects/` | `Reveal`, `WordFade`, `LineShadow`, `Sparkles` (CSS, no JS framework) | own code or MIT with a notice |
| `src/components/three/` | the 3D loaders (`.astro`) and `<scene>/mount.tsx` + canvas | the only React in the site |
| `src/data/` | `organisation.ts` (the one source of facts), `statistics.ts`, `houses.ts`, `credits.ts` | a `*.test.ts` checks shapes |
| `src/lib/` | `routes.ts` (one path builder), `locales.ts`, `i18n.ts`, later the JSON-LD graph | |
| `src/locales/{en,fr}/` | `messages.po` + `catalogs.test.ts` | edited after `bun run i18n:extract` |
| `src/styles/` | `global.css` (tokens + the few component classes) + `tokens.test.ts` | |
| `src/scripts/` | client scripts bundled by Astro (`inview.ts`, `flow-field.ts`) | decoration starts after `load` + idle |
| `src/assets/` | images through `astro:assets` | |
| `public/` | served as is: posters, backgrounds, models, favicons, share images, `ms32821332.txt` | generated files name their generator in `design/assets.md` |
| `scripts/` | `serve.mjs`, `vercel-config.ts`, `poster.mjs`, `background.mjs`; QA: `routes`, `shots`, `lighthouse`, `launch-gate`, `og` | node `.mjs`; route lists from `routes.mjs`, never hand-written |
| `e2e/` | Playwright specs + `routes.ts` (the one route list) | |

Repo root (migration only): the Next app, `scripts/capture/` (the P0/P8 case-study capture: not gates, never edited
between the two runs), gitignored `.case-study/`, `screenshots/`, `comps/`.

## Astro vs React islands

- Default: `.astro` + CSS + a small `<script>`. React exists only for WebGL (R3F) [user 2026-10-09, HANDOFF § 2].
- No `client:*` directive: a scene loads through its loader script (idle + near visible + wide enough) that imports
  `mount.tsx`, since `client:only` loads at page load [research: stack § 1.8]. Rules: [three](usage/three.md).
- Menus, carousels, dialogs, tabs: native `<dialog>`, `popover`, `<details>`, CSS scroll-snap and a few lines of script.
- Islands get translated strings as props; no Lingui catalog ships to the browser ([lingui](usage/lingui.md)).
- A component's `<script>` runs once per page: query every instance ([astro](usage/astro.md) § Gotchas).

## CSS and Tailwind

- **Tokens only:** colours, radii, eases and fonts come from `@theme` in `src/styles/global.css`; components use token
  utilities (`bg-primary`, `text-foreground`, `rounded-lg`). No raw hex/rgb/oklch and no Tailwind default palette
  (`text-orange-600`) in components [brief § 6 P2]. Exceptions: `<meta name="theme-color">`, generated images, SVG files.
  Spike debt for P2: `Sparkles` colours, `BodyBackground` `#fafafa`, `HomeHero` `text-orange-600`, `.timeline-beam`.
- Every text/background pair is AA in `tokens.test.ts`; a new pair gets a row there, not a screenshot argument.
- **Scroll-driven CSS in longhands** (`animation-name`, `-duration`, `-timeline`, `-range`), inside
  `@supports (animation-timeline: view())` with a static fallback: the minifier folds an `animation:` shorthand + its
  longhands into one rule Chrome rejects; a unit test checks it (lessons, 2026-10-08). The spike's `.timeline-beam`
  still uses the shorthand [repo: web/src/styles/global.css].
- Reduced motion: every animation has a final state; staged entrances switch off (`animation-delay` survives).
- Sticky header: `--header-h` + `scroll-padding-top`; tall media capped at `100svh - var(--header-h)`.
- Cheap style: animate an HTML wrapper, never an `<svg>`; no inherited custom property toggled on a big subtree.

## i18n

- **Every user-facing string goes through Lingui**, including `alt`, accessible names, `title`, sr-only text, meta
  description and share-image text: `t` from `lingui-for-astro/macro` in `.astro`, `@lingui/core/macro` in `.ts`/`.tsx`.
  Message rules: [lingui](usage/lingui.md). Locales and URLs: `site/i18n.md`.
- Facts (names, emails, phones, addresses, partners' proper names) come from `src/data/`, never inline in a component.
- Internal links only through `pathTo(locale, id)`; never a hand-written `/en/…`.
- Existing French is copied verbatim from `lib/dictionary.tsx`; new French is native and listed in `placeholders.md`.

## Images

- Local images through `astro:assets`: `<Picture formats={["avif","webp"]}>` for photos, `<Image>` for logos, with real
  `widths` and a `sizes` that matches the CSS width; `width`/`height` or `aspect-ratio` always reserved.
- **Only the LCP image** gets `priority` (eager + `fetchpriority="high"`), one per page; usually the H1 is the LCP and
  no image does. Everything else `loading="lazy"` + `decoding="async"`; decoration `fetchpriority="low"`.
- Sources ≤ 2560 px wide; the 25–30 MB originals never ship [brief § 6 P5]. Every image is a repo asset
  under `src/assets/`, optimised at build; no remote images ([astro](usage/astro.md) § Images).
- Meaningful `alt` is a Lingui message; decorative images `alt=""` inside an `aria-hidden` box.

## 3D

Every rule lives in [three](usage/three.md) (text first, poster, idle + visible loader, meshopt, one canvas, budgets).

## Git

- Branch `revamp/2026-10`; **never commit to `main`**: the release Action on `main` turns `feat`/`fix` into a version bump
  and a CHANGELOG entry [repo: .github/workflows/release.yml].
- Conventional Commits, `type(scope): summary`, imperative, ≤ 72 chars. Scopes: `seo`, `perf`, `design`, `i18n`, `a11y`,
  `refactor`, `ai`, `qa`, `home`, `header`, `footer`, `housing`, `owners`, `about`, `projects`, `tec`, `legal`, `404`,
  `wip` (the `commit` skill). One commit per slice (scope = the page) and per phase; a pause is `chore(wip): <where>`.
- Author = the owner's global git identity (MuchaSsak), never Claude; never `--no-verify`; **push only when asked** [user].
- Tag `history/*` before a big change: `baseline-2026-10-09` (exists), `pre-migration`, `design-system-v1`, `after-2026-10`.
- Never commit `.env*` (only `.env.example`, names only), `.case-study/`, `screenshots/*` (except `VISUAL-QA.md`),
  `comps/`, `SKILLS/`, `CLAUDE.local.md`, raw media originals [repo: .gitignore]. `web/bun.lock` is committed (Vercel
  installs from it) [research: stack § 1.7].

## Testing bar and definition of done

- Vitest next to the code: data shapes, routes (+ `vercel.json` current), token contrast, catalogs complete,
  scroll-driven longhands. A bug fix adds a regression test. Playwright gates: `web/e2e/` ([visual-qa](usage/visual-qa.md)).
- **Done = [working-agreement](../working-agreement.md) § 2**: check + build gate + e2e + text fit in en and fr + shots +
  reduced motion + Lighthouse when a score can move + design score ≥ 8 + the wiki page and `log.md` in the same commit.

## Do NOT

| Never | Why |
| --- | --- |
| A form of any kind (contact, apply, newsletter, chat, booking) | owner's rule; contact is email, phone, map, socials [user 2026-10-09] |
| A preloader, intro gate or scroll-jacking | usable in 1 tap, impressive within 3 s [user] |
| A cursor effect that hides or replaces the pointer | [requirements](../product/requirements.md) § Explicitly not building |
| `tabIndex={-1}` on a real control | the 2025 CTAs were keyboard-dead; allowed only on an `aria-hidden` duplicate (the marquee copy) and on `<main>` |
| A link inside a button, or a button inside a link | a CTA that navigates is an `<a>` (`ButtonLink`) |
| An `<h1>` per section | one `<h1>` per page, sections start at `<h2>` |
| Text muted by `opacity` or alpha | falls under 4.5:1 on a moving background |
| Flag emoji | two letters on Windows; the switcher says "English" / "Français" |
| Aceternity, GSAP or React Bits code | licence: rewrite from the idea (Q23, `research/2026-10-09-licences.md`) |
| An entrance animation on the LCP element | the 2025 BoxReveal hid the H1: mobile LCP 49.7 s (HANDOFF § 5) |
| Astro `redirects` for old URLs, `set:html` with copy | meta refresh without status; escape is the default |
| A tracker, cookie or third-party script | owner's OK + `legal/compliance-and-data.md` first |
| Reading `.env*` or secrets, typing a key/id/URL from memory | name env vars only; copy values mechanically |
| Weakening a gate to pass | fix the page [brief § 2] |
