# Three.js and WebGL (how this site uses them)

> How 3D and canvas effects load without hurting the first paint, and how models are prepared. Budgets:
> [requirements](../../product/requirements.md) § Non-functional; asset licences: [assets](../../design/assets.md).

## Loading rule (text first)

1. The page paints its heading and copy with **no 3D code**. The 3D box is sized in CSS (no layout shift) and shows a
   still **poster** (WebP, transparent).
2. After `load` + `requestIdleCallback`, an IntersectionObserver (200 px margin) watches each toy's box
   (`ToyScene.astro`, `data-toy`); on screens where the 2025 site showed the scenes (≥ 1280 px) it dynamic-imports
   `components/three/mount.ts`.
3. `mount.ts` adds a canvas, hands it to the page's one toy worker as an OffscreenCanvas (`transferControlToOffscreen`)
   and from then on only posts its size, whether it is on screen, and pointer events, each tagged with the toy's id;
   the worker runs three.js once for all toys, decodes the models, draws, and replies `ready` once a model is drawn
   (CSS fades its canvas in over the poster) and which cursor to show. Where OffscreenCanvas, its WebGL or image
   decoding in a worker is missing (Safari before 17), the worker replies `failed` for that toy and the page draws it
   with the same scene module. Frames run only while a canvas is on screen.
4. Reduced motion: the poster stays (the final pose, no WebGL loaded); `?poster` forces the scene for `scripts/poster.mjs`, which renders it in its final pose (no intro spin, no auto-rotate); the flow-field streaks don't run.

Why a worker and plain three.js (2026-10-09): the 2025 React Three Fiber + drei island ran React, R3F, drei and three
(1 MB, 279 KB gz) and created the WebGL context inside React's first commit on the main thread: home desktop
Lighthouse perf 68, TBT about 3 s. The scene needs one model, one camera and a drag, so it is a few dozen lines of
three.js; drei's PresentationControls is rewritten with maath's spring reproduced, and React leaves the site.

## Scenes

| Scene | Where | Model | Notes |
| --- | --- | --- | --- |
| Hero house | home hero | `public/models/house.glb` (meshopt, unlit materials) | camera fov 90 at (0, 10, 25) looking at the origin, ACES filmic tone mapping (R3F's default), drag as drei's `PresentationControls` (polar −π/8..π/3, damping 0.25 s, π per box width; grab cursor over the house), 2 s expo-out intro spin, then −0.1 rad/s (all as in 2025; the 2025 ambient light lit nothing, the materials are unlit) |
| Wardrobe | home "Looking for housing?", left of the header | `public/models/wardrobe.glb` (meshopt, WebP 1024; 178 KB from 1.46 MB) | camera (0, 5, 25), ambient 4, scale 0.1 at y −10, swings `rotation.y = sin(t × 0.35)`, drag with drei's `snap` (springs back on release) |
| Rocket | home "Youth-Led Projects!", right of the header | `public/models/rocket.glb` (meshopt, WebP 1024; 667 KB from 6.10 MB) | camera (0, 7.5, 15), ambient 2 + directional orangered 4 at (−3, −3, 3) + white 2.5 at (10, 10, 1), scale 0.075 at (1, −7.5, 0), rotation (1.92π, 0, 0.05π), plays its clip "Take 001"; no drag |

All three: `components/three/` — `toys.ts` (the numbers above, plain data), `toy-scene.ts` (one scene module),
`toy.worker.ts` (one worker for the page's toys), `mount.ts`, `ToyScene.astro` (box, poster, loader).

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

- One worker per page for the toys; one WebGL context per toy, created only near the screen (browsers cap live contexts at about 16; the home has three).
- Loops render only while on screen; `dpr` capped at 2.
- The canvas is decorative: `aria-hidden` on its box; nothing essential lives only in 3D.
- WebGL draws in a worker (OffscreenCanvas) with a page fallback; the page's main thread only forwards events.
