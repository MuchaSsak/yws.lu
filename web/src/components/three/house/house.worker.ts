import { createHouseScene, type HouseScene } from "./house-scene";

/**
 * The house scene off the main thread (mount.ts): the page hands over its canvas as an OffscreenCanvas, then only
 * forwards its size, whether it is on screen, and pointer events. three.js, the model's decoding, the WebGL context and
 * every frame run here: on the main thread the 2025 React Three Fiber island cost the home page about 3 s of blocking
 * time on a desktop Lighthouse run. Replies: `ready` (the model is drawn), `cursor`, `failed` (no WebGL here: the page
 * draws it itself).
 */
export type HouseMessage =
  | { type: "start"; canvas: OffscreenCanvas; width: number; height: number; pixelRatio: number; still: boolean }
  | { type: "size"; width: number; height: number; pixelRatio: number }
  | { type: "visible"; on: boolean }
  | { type: "pointer"; kind: "move" | "down" | "up" | "leave"; x: number; y: number };

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<HouseMessage>) => void) | null;
  postMessage: (message: unknown) => void;
};
let house: HouseScene | undefined;

scope.onmessage = ({ data }) => {
  if (data.type === "start") {
    try {
      house = createHouseScene(data.canvas, {
        ...data,
        onReady: () => scope.postMessage({ type: "ready" }),
        onCursor: (cursor) => scope.postMessage({ type: "cursor", cursor }),
      });
    } catch {
      scope.postMessage({ type: "failed" });
    }
  } else if (data.type === "size") house?.resize(data.width, data.height, data.pixelRatio);
  else if (data.type === "visible") house?.visible(data.on);
  else house?.pointer(data.kind, data.x, data.y);
};
