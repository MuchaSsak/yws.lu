import type { ToyCursor } from "./toy-scene";
import type { ToyMessage } from "./toy.worker";
import type { ToyName } from "./toys";

/**
 * Mounts a toy in its box (ToyScene.astro) on top of the poster, and marks the box ready once the model is drawn so CSS
 * fades the canvas in. The toys of a page share one worker and draw there on OffscreenCanvases; where that is missing or
 * has no WebGL (Safari before 17), a toy draws on the page with the same code. Either way it draws only while on screen.
 */
type Reply = { id: number } & ({ type: "ready" | "failed" } | { type: "cursor"; cursor: ToyCursor });
type Send = (message: Exclude<ToyMessage, { type: "start" }>) => void;

let worker: Worker | undefined;
let nextId = 0;
const replies = new Map<number, (reply: Reply) => void>();

const sharedWorker = () => {
  if (!worker) {
    worker = new Worker(new URL("./toy.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = ({ data }: MessageEvent<Reply>) => replies.get(data.id)?.(data);
  }
  return worker;
};

export function mountToy(host: HTMLElement, toy: ToyName, still: boolean): void {
  const pixelRatio = () => Math.min(Math.max(devicePixelRatio, 1), 2);
  const size = (canvas: HTMLCanvasElement) => {
    const { width, height } = canvas.getBoundingClientRect();
    return { width: Math.max(1, Math.round(width)), height: Math.max(1, Math.round(height)), pixelRatio: pixelRatio() };
  };
  const ready = () => {
    host.dataset.ready = "";
  };
  const id = nextId++;

  /** Wires a canvas to a scene, wherever it draws. */
  const connect = (canvas: HTMLCanvasElement, send: Send) => {
    const observers = [
      new ResizeObserver(() => send({ type: "size", id, ...size(canvas) })),
      new IntersectionObserver(([entry]) => send({ type: "visible", id, on: entry?.isIntersecting ?? false })),
    ];
    for (const observer of observers) observer.observe(canvas);
    const forward = (kind: "move" | "down" | "up" | "leave") => (event: PointerEvent) => {
      // Keep the drag when the pointer leaves the box with the button held, as the 2025 controls did.
      if (kind === "down") canvas.setPointerCapture(event.pointerId);
      send({ type: "pointer", id, kind, x: event.offsetX, y: event.offsetY });
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
  const setCursor = (canvas: HTMLCanvasElement) => (cursor: ToyCursor) => {
    canvas.style.cursor = cursor;
  };

  const newCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 size-full";
    host.append(canvas);
    return canvas;
  };

  const onPage = async () => {
    const { createToyScene } = await import("./toy-scene");
    const canvas = newCanvas();
    // The page is the last resort: if the model fails here too, the poster stays.
    const scene = createToyScene(canvas, toy, {
      ...size(canvas),
      still,
      onReady: ready,
      onFailed: () => canvas.remove(),
      onCursor: setCursor(canvas),
    });
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
  const shared = sharedWorker();
  const disconnect = connect(canvas, (message) => shared.postMessage(message));
  const cursor = setCursor(canvas);
  replies.set(id, (reply) => {
    if (reply.type === "ready") ready();
    else if (reply.type === "cursor") cursor(reply.cursor);
    else {
      replies.delete(id);
      disconnect();
      void onPage();
    }
  });
  const start: ToyMessage = { type: "start", id, toy, canvas: offscreen, ...size(canvas), still };
  shared.postMessage(start, [offscreen]);
}
