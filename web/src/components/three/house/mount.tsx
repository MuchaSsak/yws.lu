import { createRoot } from "react-dom/client";

import { HouseCanvas } from "./HouseCanvas";

/**
 * Mounts the house scene into its own layer inside the box (React clears its container, and the poster must stay
 * until the canvas has faded in) and marks the box ready once the model is in the scene.
 */
export function mountHouse(host: HTMLElement): void {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const layer = document.createElement("div");
  layer.className = "absolute inset-0";
  host.append(layer);
  const onReady = () => {
    host.dataset.ready = "";
  };
  createRoot(layer).render(<HouseCanvas reducedMotion={reducedMotion} onReady={onReady} />);
}
