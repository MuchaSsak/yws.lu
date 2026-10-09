# Three.js and React Three Fiber (how this site uses them)

> How 3D and canvas effects load without hurting the first paint, and how models are prepared. Budgets:
> [requirements](../../product/requirements.md) § Non-functional; asset licences: [assets](../../design/assets.md).

## Loading rule (text first)

1. The page paints its heading and copy with **no 3D code**. The 3D box is sized in CSS (no layout shift) and shows a
   still **poster** (WebP, transparent).
2. After `load` + `requestIdleCallback`, an IntersectionObserver (200 px margin) watches the box; on screens where the
   2025 site showed the scene (≥ 1280 px for the hero house) it dynamic-imports `components/three/<scene>/mount.tsx`.
3. `mount.tsx` creates a React root in the box; the scene calls `onReady` once the model is in, and CSS fades the
   canvas in over the poster.
4. Reduced motion: the scene holds its final pose (no intro spin, no auto-rotate); the flow-field streaks don't run.

Why not `client:visible`: R3F/drei touch `window` at import, so the island must be `client:only`, which loads at page
load and can't wait for visibility [research: stack § 1.8]. The loader script does both: idle and visible.

## Scenes

| Scene | Where | Model | Notes |
| --- | --- | --- | --- |
| Hero house | home, `components/three/house/` | `public/models/house.glb` (meshopt) | camera fov 90 at (0, 10, 25), ambient 2, `PresentationControls` polar −π/8..π/3, 2 s expo-out intro spin, then −0.1 rad/s (all as in 2025) |

Canvas 2D effects (not three): `src/scripts/flow-field.ts` (housing hero streaks; own code, Q23).

## Models

- Re-encode with meshopt, never Draco (Draco = ~75 KB gz decoder + a Worker from gstatic; meshopt's 7.7 KB decoder
  ships with drei anyway) [research: stack § 4.2]:
  `bunx gltf-transform optimize in.glb out.glb --compress meshopt --texture-compress webp --texture-size 1024 --simplify false`
- Load with `useGLTF(url, false, true)` (no Draco, meshopt on).
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
- R3F ≥ 9.8 with React 19.3 (9.2's reconciler is React 19.0-era) [research: stack, risk 1].
