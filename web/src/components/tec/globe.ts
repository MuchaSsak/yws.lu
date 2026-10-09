import createGlobe, { type Marker } from "cobe";

/**
 * The TEC globe: cobe (MIT) with the 2025 Magic UI settings, marking the partner countries. Shared by the worker that
 * normally draws it (globe.worker.ts) and the page, which draws it only where a worker can't (TecGlobe.astro).
 */
/** Europe in front (cobe's angles for a longitude: π − (λ − π/2)), tilted to show the north as in 2025. */
const START_PHI = Math.PI - ((10 * Math.PI) / 180 - Math.PI / 2);

/** `size` is the canvas's CSS width (it is square); cobe draws at twice that, as in 2025. */
export function createTecGlobe(canvas: HTMLCanvasElement | OffscreenCanvas, markers: Marker[], size: () => number) {
  let phi = START_PHI;
  return createGlobe(canvas as HTMLCanvasElement, {
    devicePixelRatio: 2,
    width: size() * 2,
    height: size() * 2,
    phi,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1, 1, 1],
    markers,
    onRender: (state) => {
      phi += 0.005;
      state.phi = phi;
      state.width = size() * 2;
      state.height = size() * 2;
    },
  });
}
