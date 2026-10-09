import { createToyScene, type ToyScene } from "./toy-scene";
import type { ToyName } from "./toys";

/**
 * The page's toys off the main thread (mount.ts), all in this one worker so three.js loads once: the page hands over
 * each canvas as an OffscreenCanvas, then only forwards its size, whether it is on screen, and pointer events. three.js,
 * the models' decoding, the WebGL contexts and every frame run here: on the main thread the 2025 React Three Fiber
 * island cost the home page about 3 s of blocking time on a desktop Lighthouse run. Replies, per toy id: `ready` (the
 * model is drawn), `cursor`, `failed` (no WebGL or image decoding here: the page draws that toy itself).
 */
export type ToyMessage =
  | {
      type: "start";
      id: number;
      toy: ToyName;
      canvas: OffscreenCanvas;
      width: number;
      height: number;
      pixelRatio: number;
      still: boolean;
    }
  | { type: "size"; id: number; width: number; height: number; pixelRatio: number }
  | { type: "visible"; id: number; on: boolean }
  | { type: "pointer"; id: number; kind: "move" | "down" | "up" | "leave"; x: number; y: number };

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<ToyMessage>) => void) | null;
  postMessage: (message: unknown) => void;
};
const toys = new Map<number, ToyScene>();

scope.onmessage = ({ data }) => {
  const { id } = data;
  if (data.type === "start") {
    const failed = () => {
      toys.delete(id);
      scope.postMessage({ type: "failed", id });
    };
    try {
      toys.set(
        id,
        createToyScene(data.canvas, data.toy, {
          ...data,
          onReady: () => scope.postMessage({ type: "ready", id }),
          onFailed: failed,
          onCursor: (cursor) => scope.postMessage({ type: "cursor", id, cursor }),
        }),
      );
    } catch {
      failed();
    }
  } else if (data.type === "size") toys.get(id)?.resize(data.width, data.height, data.pixelRatio);
  else if (data.type === "visible") toys.get(id)?.visible(data.on);
  else toys.get(id)?.pointer(data.kind, data.x, data.y);
};
