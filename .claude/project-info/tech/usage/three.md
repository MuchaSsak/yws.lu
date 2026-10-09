# Three.js and WebGL (how this site uses them)

> How 3D and canvas effects load without hurting the first paint, and how models are prepared. Budgets:
> [requirements](../../product/requirements.md) § Non-functional; asset licences: [assets](../../design/assets.md).

## Loading rule (text first)

1. The page paints its heading and copy with **no 3D code**. The 3D box is sized in CSS (no layout shift) and shows a
   still **poster** (WebP, transparent).
2. After `load` + `requestIdleCallback`, an IntersectionObserver (200 px margin) watches the box; on screens where the
   2025 site showed the scene (≥ 1280 px for the hero house) it dynamic-imports `components/three/<scene>/mount.ts`.
3. `mount.ts` adds a canvas, hands it to a worker as an OffscreenCanvas (`transferControlToOffscreen`) and from then on
   only posts its size, whether it is on screen, and pointer events; the worker runs three.js, decodes the model,
   draws, and replies `ready` once the model is drawn (CSS fades the canvas in over the poster) and which cursor to
   show. Where OffscreenCanvas or its WebGL is missing (Safari before 17), the worker replies `failed` and the page
   draws with the same scene module. Frames run only while the canvas is on screen.
4. Reduced motion: the poster stays (the final pose, no WebGL loaded); `?poster` forces the scene for `scripts/poster.mjs`, which renders it in its final pose (no intro spin, no auto-rotate); the flow-field streaks don't run.

Why a worker and plain three.js (2026-10-09): the 2025 React Three Fiber + drei island ran React, R3F, drei and three
(1 MB, 279 KB gz) and created the WebGL context inside React's first commit on the main thread: home desktop
Lighthouse perf 68, TBT about 3 s. The scene needs one model, one camera and a drag, so it is a few dozen lines of
three.js; drei's PresentationControls is rewritten with maath's spring reproduced, and React leaves the site.

## Scenes

| Scene | Where | Model | Notes |
| --- | --- | --- | --- |
| Hero house | home, `components/three/house/` (`house-scene.ts`, `house.worker.ts`, `mount.ts`) | `public/models/house.glb` (meshopt, unlit materials) | camera fov 90 at (0, 10, 25) looking at the origin, ACES filmic tone mapping (R3F's default), drag as drei's `PresentationControls` (polar −π/8..π/3, damping 0.25 s, π per box width; grab cursor over the house), 2 s expo-out intro spin, then −0.1 rad/s (all as in 2025; the 2025 ambient light lit nothing, the materials are unlit) |

Canvas 2D effects (not three): `src/scripts/flow-field.ts` (housing hero streaks; own code, Q23). The page creates the
canvas only when motion is allowed, hands it to `flow-field.worker.ts` as an OffscreenCanvas
(`transferControlToOffscreen`) and only posts its size and whether it is on screen; the drawing lives in
`flow-field-core.ts`, shared with a main-thread fallback for browsers without OffscreenCanvas. On the main thread it
cost the housing page 400–560 ms of mobile TBT; in the worker, 123–166 ms for the whole page.

The TEC globe (`components/tec/TecGlobe.astro`) is cobe (MIT, WebGL, 12 KB chunk): no canvas in the markup; on idle and
near visibility `mount-globe.ts` appends one and hands it to `globe.worker.ts` (the same worker pattern, with stand-ins
for the three page APIs cobe touches: `window`, the canvas's CSS size, `Image` for its dot map), with a page fallback;
never under reduced motion (the CSS sphere stays).

## Models

- Re-encode with meshopt, never Draco (Draco = ~75 KB gz decoder + a Worker from gstatic; meshopt's 7.7 KB decoder
  ships with three's add-ons) [research: stack § 4.2]:
  `bunx gltf-transform optimize in.glb out.glb --compress meshopt --texture-compress webp --texture-size 1024 --simplify false`
- Load with three's `GLTFLoader` + `setMeshoptDecoder(MeshoptDecoder)` (no Draco); in a worker it reads textures with
  `ImageBitmapLoader`, so nothing needs the DOM.
- Textures are 91–96 % of the bytes: WebP at 1024 px is the big win; `--simplify` changes shapes (off unless checked
  in screenshots) [research: stack § 4.3].
- Every model keeps its CC BY credit in the credits dialog, with "modified" when re-encoded.

## Posters

`bun run poster` (with `bun run preview` running): Chromium with the GPU on and reduced motion, waits for
`data-ready`, screenshots the box with a transparent background → `public/posters/<scene>.webp`. Re-run after any
change to the model, camera or framing.

## Rules

- One canvas per page (each island is its own WebGL context; browsers cap live contexts).
- Loops render only while on screen; `dpr` capped at 2.
- The canvas is decorative: `aria-hidden` on its box; nothing essential lives only in 3D.
- WebGL draws in a worker (OffscreenCanvas) with a page fallback; the page's main thread only forwards events.
