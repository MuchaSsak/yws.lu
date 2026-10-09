/**
 * The three 2025 home-page toys (wiki: tech/usage/three.md § Scenes) with the numbers their React Three Fiber scenes
 * used: camera, model placement, lights, motion and drag. Models: CC BY 4.0, credited in the credits dialog
 * (design/assets.md). Plain data, so the page can name a toy without loading three.js.
 */
export type ToyName = "house" | "wardrobe" | "rocket";

type Vector = [number, number, number];

export interface Toy {
  model: string;
  /** A perspective camera (fov 90, near 0.1, far 50) here, looking at the origin as R3F's default camera does. */
  camera: Vector;
  scale: number;
  position: Vector;
  rotation?: Vector;
  /** Ambient light intensity; the house's materials are unlit, so its 2025 light changed nothing and it has none. */
  ambient?: number;
  directional?: { color: string; intensity: number; position: Vector }[];
  /**
   * spin: a two-second intro spin, then a slow turn (house); sway: swings left and right (wardrobe); clip: plays the
   * model's own animation (rocket).
   */
  motion: "spin" | "sway" | "clip";
  /** drei's PresentationControls: the toy stays where it is dropped (free) or springs back (snap); none: no drag. */
  drag?: "free" | "snap";
}

export const TOYS: Record<ToyName, Toy> = {
  house: { model: "/models/house.glb", camera: [0, 10, 25], scale: 1.2, position: [0, -5, 0], motion: "spin", drag: "free" },
  wardrobe: {
    model: "/models/wardrobe.glb",
    camera: [0, 5, 25],
    scale: 0.1,
    position: [0, -10, 0],
    ambient: 4,
    motion: "sway",
    drag: "snap",
  },
  rocket: {
    model: "/models/rocket.glb",
    camera: [0, 7.5, 15],
    scale: 0.075,
    position: [1, -7.5, 0],
    rotation: [Math.PI * 1.92, 0, Math.PI * 0.05],
    ambient: 2,
    directional: [
      { color: "orangered", intensity: 4, position: [-3, -3, 3] },
      { color: "white", intensity: 2.5, position: [10, 10, 1] },
    ],
    motion: "clip",
  },
};
