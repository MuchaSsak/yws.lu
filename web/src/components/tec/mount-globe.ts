import type { Marker } from "cobe";

import type { GlobeMessage } from "./globe.worker";

/**
 * Puts the TEC globe's canvas in its box (TecGlobe.astro) and marks the box ready, so CSS swaps the CSS sphere for it.
 * cobe draws in a worker on an OffscreenCanvas; where that is missing or has no WebGL (Safari before 17), it draws on
 * the page as in 2025. The returned toggle runs or pauses its loop.
 */
export function mountGlobe(host: HTMLElement, markers: Marker[]): (on: boolean) => void {
  let onScreen = false;
  let toggle: (on: boolean) => void = () => {};
  const ready = () => requestAnimationFrame(() => (host.dataset.ready = ""));
  const newCanvas = () => host.appendChild(document.createElement("canvas"));
  const sizeOf = (canvas: HTMLCanvasElement) => Math.max(1, canvas.offsetWidth);

  const onPage = async () => {
    const { createTecGlobe } = await import("./globe");
    const canvas = newCanvas();
    let size = sizeOf(canvas);
    new ResizeObserver(() => (size = sizeOf(canvas))).observe(canvas);
    const globe = createTecGlobe(canvas, markers, () => size);
    toggle = (on) => globe.toggle(on);
    toggle(onScreen);
    ready();
  };

  const canvas = newCanvas();
  if (typeof canvas.transferControlToOffscreen !== "function") {
    canvas.remove();
    void onPage();
  } else {
    const offscreen = canvas.transferControlToOffscreen();
    const worker = new Worker(new URL("./globe.worker.ts", import.meta.url), { type: "module" });
    const send = (message: GlobeMessage, transfer: Transferable[] = []) => worker.postMessage(message, transfer);
    const resize = new ResizeObserver(() => send({ type: "size", size: sizeOf(canvas) }));
    resize.observe(canvas);
    toggle = (on) => send({ type: "visible", on });
    worker.onmessage = ({ data }: MessageEvent<{ type: "ready" | "failed" }>) => {
      if (data.type === "ready") {
        toggle(onScreen);
        ready();
      } else {
        worker.terminate();
        resize.disconnect();
        canvas.remove();
        toggle = () => {};
        void onPage();
      }
    };
    send({ type: "start", canvas: offscreen, size: sizeOf(canvas), markers }, [offscreen]);
  }
  return (on) => {
    onScreen = on;
    toggle(on);
  };
}
