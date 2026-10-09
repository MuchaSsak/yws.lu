import { createRoot } from "react-dom/client";

import { HouseCanvas } from "./HouseCanvas";

/** Mounts the house scene into its box and marks the box ready once the model is in the scene. */
export function mountHouse(host: HTMLElement): void {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const onReady = () => {
    host.dataset.ready = "";
  };
  createRoot(host).render(<HouseCanvas reducedMotion={reducedMotion} onReady={onReady} />);
}
