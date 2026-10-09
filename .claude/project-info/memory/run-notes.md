# Run notes: measured timings and tool gotchas

> Owns: how long things really take on this project's machines, and gotchas paid for once. Read at the start of a
> coding task (the `code` skill). Numbers from real runs, with the machine and date. Baseline scores: `baseline.md`;
> per-slice budget use: `slice-costs.md`; generic rules: `lessons.md`.

## Machines

| Name | What | Used for |
| --- | --- | --- |
| PC | Windows 11 desktop (2026-10-09 morning session) | first baseline Lighthouse (6 of 7 pages), research |
| Laptop | Windows 11 Pro 26200, Node 22.20.0, bun 1.3.14 (from 2026-10-09 afternoon) | everything since; **the before/after comparison is measured here** |

## Timings (laptop, 2026-10-09)

| Command | Time | Notes |
| --- | --- | --- |
| `bun install` (repo root, cold) | 221 s | 461 packages (Next app + QA devDeps) |
| `cd web && bun install` (cold) | 117 s | 581 packages |
| `bunx playwright install chromium firefox webkit` | ~3 min | background |
| `bun x next build` (2025 app, warm cache) | 84 s | 11 static pages; first run 176 s (it failed: see gotchas) |
| `scripts/capture/lighthouse.mjs` on the 2025 build | ~3.5 min per run | 3D + 25–30 MB JPGs; 42 runs ≈ 2.5 h; a run can hang (SwiftShader + WebGL): `--run-limit 180000` |
| `browser.mjs --tasks seo,axe` (2025 build, 16 URLs) | ~3 min | |
| `browser.mjs --tasks shots` (2025 build, en + fr × 7 widths + reduced) | ~45 min | full-page, GPU; background while doing file work |
| `repo-metrics.mjs` (tsc + next lint + knip) | ~2 min | `next lint` stops at its setup prompt (no ESLint config) |
| `cd web && bunx astro build` (spike, 6 pages) | 4–8 s | three/R3F chunk 1.02 MB raw, 224 KB brotli (loaded after idle) |
| `cd web && bun run check` | ~15 s | astro check + eslint + prettier + lingui check sync + vitest |
| `bun run i18n:extract` / `node scripts/fill-fr.mjs` | 5 s / <1 s | |

## Gotchas

- **The root `tsconfig.json` type-checks `web/`** (`**/*.ts`): `next build` failed on `web/lingui.config.ts` until
  `web` was added to `exclude` (2026-10-09). Keep the two apps' TS configs apart.
- **Laptop ≠ PC:** Lighthouse numbers from the PC are not comparable with the laptop's; the case study compares
  laptop-to-laptop (`baseline.md`).
- **The portfolio path differs per machine:** on the laptop it is `C:\Users\Mucha\Desktop\matmuszarski.space`
  (repo muszarski.com), not `new-portfolio`. Its `context/` stays unopened either way.
- **Vite finds the Next app's `postcss.config.mjs`** at the repo root and fails the Astro build ("Invalid PostCSS
  Plugin"): `astro.config.mjs` sets an inline `css.postcss` so the search stops in `web/` (2026-10-09).
- **`gltf-transform optimize` on an already Draco + WebP model** re-encodes the texture again (lossy) unless
  `--texture-compress false`; meshopt alone kept the brotli size (88 → 94 KB) and dropped the Draco decoder.
- **The laptop's global git identity is "Claude"**; the repo has a local `user.name`/`user.email` set to the owner's
  identity (copied from the branch's history), so commits are the owner's (`commit` skill checks it).
