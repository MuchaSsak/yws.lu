import { createSparkLines, type SparkLinesOptions } from "./spark-lines-core";

/**
 * Warm sparks streaming out from behind the owners hero's headline (spark-lines-core.ts; the 2025 background lines,
 * rewritten). Canvas 2D, drawn in a worker on an OffscreenCanvas so the page's main thread stays free (on the page's
 * canvas only where a browser lacks OffscreenCanvas); the loop runs only while the canvas is on screen, and the page
 * never mounts it under reduced motion. Wiki: design/design.md § Motion.
 */
export function mountSparkLines(canvas: HTMLCanvasElement, options: SparkLinesOptions): void {
  const size = () => {
    const { width, height } = canvas.getBoundingClientRect();
    return {
      width: Math.max(1, Math.round(width)),
      height: Math.max(1, Math.round(height)),
      pixelRatio: Math.min(Math.max(devicePixelRatio, 1), 2),
    };
  };

  if (typeof canvas.transferControlToOffscreen === "function") {
    const offscreen = canvas.transferControlToOffscreen();
    const worker = new Worker(new URL("./spark-lines.worker.ts", import.meta.url), { type: "module" });
    worker.postMessage({ type: "start", canvas: offscreen, options, ...size() }, [offscreen]);
    new ResizeObserver(() => worker.postMessage({ type: "size", ...size() })).observe(canvas);
    new IntersectionObserver(([entry]) => worker.postMessage({ type: "visible", on: entry?.isIntersecting ?? false })).observe(
      canvas,
    );
  } else {
    const lines = createSparkLines(canvas, options);
    if (!lines) return;
    const fit = () => {
      const { width, height, pixelRatio } = size();
      lines.resize(width, height, pixelRatio);
    };
    fit();
    let onScreen = false;
    let raf = 0;
    const frame = (now: number) => {
      lines.frame(now);
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
