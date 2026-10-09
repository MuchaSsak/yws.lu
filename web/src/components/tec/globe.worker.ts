import type { Marker } from "cobe";

import { createTecGlobe } from "./globe";

/**
 * The TEC globe off the main thread (TecGlobe.astro): the page hands over its canvas as an OffscreenCanvas, then only
 * says how big it is and whether it is on screen. cobe and its renderer (phenomenon) were written for the page and
 * touch three page things, so the worker lends them stand-ins: `window` (a resize listener), the canvas's CSS size
 * (`clientWidth`, `clientHeight`), and `Image` for the dot map, a data URL decoded into an ImageBitmap, the kind of
 * image `texImage2D` takes in a worker. On the page, its shader compile and frames cost the TEC page about 1.5 s of
 * blocking time on a desktop Lighthouse run. Replies: `ready`, `failed` (no WebGL here: the page draws it itself).
 */
export type GlobeMessage =
  | { type: "start"; canvas: OffscreenCanvas; size: number; markers: Marker[] }
  | { type: "size"; size: number }
  | { type: "visible"; on: boolean };

const scope = self as unknown as Record<string, unknown> & {
  onmessage: ((event: MessageEvent<GlobeMessage>) => void) | null;
  postMessage: (message: unknown) => void;
  dispatchEvent: (event: Event) => boolean;
};
const bitmaps = new WeakMap<object, ImageBitmap>();
const patched = new WeakSet<object>();
scope.window ??= self;
scope.requestAnimationFrame ??= (callback: (now: number) => void) => setTimeout(() => callback(performance.now()), 16);
scope.Image ??= class {
  onload: (() => void) | null = null;
  set src(url: string) {
    void fetch(url)
      .then((response) => response.blob())
      .then((blob) => createImageBitmap(blob))
      .then((bitmap) => {
        bitmaps.set(this, bitmap);
        this.onload?.();
      });
  }
};

let size = 1;
let globe: ReturnType<typeof createTecGlobe> | undefined;

/** The canvas as cobe expects it: a CSS size, and a context whose `texImage2D` takes the stand-in images. */
function prepare(canvas: OffscreenCanvas): OffscreenCanvas {
  Object.defineProperties(canvas, { clientWidth: { get: () => size }, clientHeight: { get: () => size } });
  const getContext = canvas.getContext.bind(canvas) as (type: string, attributes?: unknown) => unknown;
  Object.defineProperty(canvas, "getContext", {
    value: (type: string, attributes?: unknown) => {
      const gl = getContext(type, attributes) as WebGLRenderingContext | null;
      if (gl && !patched.has(gl)) {
        patched.add(gl);
        const upload = gl.texImage2D.bind(gl) as (...args: unknown[]) => void;
        gl.texImage2D = ((...args: unknown[]) =>
          upload(
            ...args.map((arg) => (typeof arg === "object" && arg ? (bitmaps.get(arg) ?? arg) : arg)),
          )) as typeof gl.texImage2D;
      }
      return gl;
    },
  });
  return canvas;
}

scope.onmessage = ({ data }) => {
  if (data.type === "start") {
    size = data.size;
    try {
      globe = createTecGlobe(prepare(data.canvas), data.markers, () => size);
      globe.toggle(false);
      scope.postMessage({ type: "ready" });
    } catch {
      scope.postMessage({ type: "failed" });
    }
  } else if (data.type === "size") {
    size = data.size;
    scope.dispatchEvent(new Event("resize"));
  } else globe?.toggle(data.on);
};
