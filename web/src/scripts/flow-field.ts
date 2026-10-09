import { createFlowField, type FlowFieldOptions } from "./flow-field-core";

/**
 * Glowing particle streaks drifting along a noise field: the look behind the 2025 housing hero, written from scratch
 * (the 2025 effect was proprietary Aceternity code, so nothing of it is reused; open-questions Q23). Canvas 2D, drawn
 * in a worker on an OffscreenCanvas so the page's main thread stays free (on the page's canvas only where a browser
 * lacks OffscreenCanvas); the loop runs only while the canvas is on screen, never under reduced motion. Wiki:
 * design/design.md § Motion.
 */
export type { FlowFieldOptions };

export function mountFlowField(canvas: HTMLCanvasElement, options: FlowFieldOptions): void {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const size = () => {
    const { width, height } = canvas.getBoundingClientRect();
    return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)) };
  };

  if ("transferControlToOffscreen" in canvas) {
    const offscreen = canvas.transferControlToOffscreen();
    const worker = new Worker(new URL("./flow-field.worker.ts", import.meta.url), { type: "module" });
    worker.postMessage({ type: "start", canvas: offscreen, options, ...size() }, [offscreen]);
    new ResizeObserver(() => worker.postMessage({ type: "size", ...size() })).observe(canvas);
    new IntersectionObserver(([entry]) => worker.postMessage({ type: "visible", on: entry?.isIntersecting ?? false })).observe(
      canvas,
    );
  } else {
    const fit = () => Object.assign(canvas, size());
    fit();
    const field = createFlowField(canvas, options);
    if (!field) return;
    let onScreen = false;
    let raf = 0;
    const frame = () => {
      field.frame();
      raf = onScreen ? requestAnimationFrame(frame) : 0;
    };
    new ResizeObserver(fit).observe(canvas);
    new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? false;
      if (onScreen && !raf) raf = requestAnimationFrame(frame);
    }).observe(canvas);
  }
  canvas.dataset.live = "";
}
