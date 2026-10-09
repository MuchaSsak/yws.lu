import type { HouseCursor } from "./house-scene";
import type { HouseMessage } from "./house.worker";

/**
 * Mounts the house scene in its box (HouseScene.astro) on top of the poster, and marks the box ready once the model is
 * drawn so CSS fades the canvas in. The scene draws in a worker on an OffscreenCanvas; where that is missing or has no
 * WebGL (Safari before 17), it draws on the page with the same code. Either way it draws only while on screen.
 */
export function mountHouse(host: HTMLElement, still: boolean): void {
  const pixelRatio = () => Math.min(Math.max(devicePixelRatio, 1), 2);
  const size = (canvas: HTMLCanvasElement) => {
    const { width, height } = canvas.getBoundingClientRect();
    return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)), pixelRatio: pixelRatio() };
  };
  const ready = () => {
    host.dataset.ready = "";
  };

  /** Wires a canvas to a scene, wherever it draws. */
  const connect = (canvas: HTMLCanvasElement, send: (message: Exclude<HouseMessage, { type: "start" }>) => void) => {
    const observers = [
      new ResizeObserver(() => send({ type: "size", ...size(canvas) })),
      new IntersectionObserver(([entry]) => send({ type: "visible", on: entry?.isIntersecting ?? false })),
    ];
    for (const observer of observers) observer.observe(canvas);
    const forward = (kind: "move" | "down" | "up" | "leave") => (event: PointerEvent) => {
      // Keep the drag when the pointer leaves the box with the button held, as the 2025 controls did.
      if (kind === "down") canvas.setPointerCapture(event.pointerId);
      send({ type: "pointer", kind, x: event.offsetX, y: event.offsetY });
    };
    canvas.addEventListener("pointermove", forward("move"));
    canvas.addEventListener("pointerdown", forward("down"));
    canvas.addEventListener("pointerup", forward("up"));
    canvas.addEventListener("pointercancel", forward("up"));
    canvas.addEventListener("pointerleave", forward("leave"));
    return () => {
      for (const observer of observers) observer.disconnect();
      canvas.remove();
    };
  };
  const setCursor = (canvas: HTMLCanvasElement) => (cursor: HouseCursor) => {
    canvas.style.cursor = cursor;
  };

  const newCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 size-full";
    host.append(canvas);
    return canvas;
  };

  const onPage = async () => {
    const { createHouseScene } = await import("./house-scene");
    const canvas = newCanvas();
    const scene = createHouseScene(canvas, { ...size(canvas), still, onReady: ready, onCursor: setCursor(canvas) });
    connect(canvas, (message) => {
      if (message.type === "size") scene.resize(message.width, message.height, message.pixelRatio);
      else if (message.type === "visible") scene.visible(message.on);
      else scene.pointer(message.kind, message.x, message.y);
    });
  };

  const canvas = newCanvas();
  if (typeof canvas.transferControlToOffscreen !== "function") {
    canvas.remove();
    void onPage();
    return;
  }
  const offscreen = canvas.transferControlToOffscreen();
  const worker = new Worker(new URL("./house.worker.ts", import.meta.url), { type: "module" });
  const disconnect = connect(canvas, (message) => worker.postMessage(message));
  const cursor = setCursor(canvas);
  worker.onmessage = ({ data }: MessageEvent<{ type: "ready" | "failed" } | { type: "cursor"; cursor: HouseCursor }>) => {
    if (data.type === "ready") ready();
    else if (data.type === "cursor") cursor(data.cursor);
    else {
      worker.terminate();
      disconnect();
      void onPage();
    }
  };
  const start: HouseMessage = { type: "start", canvas: offscreen, ...size(canvas), still };
  worker.postMessage(start, [offscreen]);
}
