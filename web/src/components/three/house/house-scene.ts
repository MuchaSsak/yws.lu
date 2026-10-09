import { ACESFilmicToneMapping, Group, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from "three";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * The 2025 hero house (CC BY 4.0, credited in the credits dialog; wiki: design/assets.md) with the 2025 camera, colour
 * and motion: a two-second intro spin, then a slow turn, draggable within limits. Plain three.js on any canvas, so it
 * runs in a worker on an OffscreenCanvas (house.worker.ts) or, where that fails, on the page (mount.ts). It replaces
 * the 2025 React Three Fiber + drei scene; the numbers below are the ones that scene used, and the drag is drei's
 * PresentationControls rewritten (its spring is maath's `damp`, reproduced here). Wiki: tech/usage/three.md.
 */
const MODEL = "/models/house.glb";
const INTRO_SECONDS = 2;
const INTRO_FROM = -Math.PI * 4;
const INTRO_TO = -Math.PI * 6.2;
const TURN_PER_SECOND = 0.1;
/** PresentationControls: polar limits, unlimited azimuth, damping 0.25 s, a full drag across the box = π. */
const POLAR: [number, number] = [-Math.PI / 8, Math.PI / 3];
const DAMPING = 0.25;

/** The 2025 intro used GSAP's "expo.out". */
const expoOut = (progress: number) => (progress >= 1 ? 1 : 1 - 2 ** (-10 * progress));
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
/** Workers without `requestAnimationFrame` (older Firefox and Safari) step at about 60 fps. */
const nextFrame = (callback: (now: number) => void): number =>
  typeof requestAnimationFrame === "function"
    ? requestAnimationFrame(callback)
    : (setTimeout(() => callback(performance.now()), 16) as unknown as number);

/** maath's critically damped spring (`easing.damp` with its default `exp` easing), which drei's controls run on. */
function damp(state: { value: number; velocity: number }, target: number, delta: number): void {
  if (Math.abs(state.value - target) <= 0.001) {
    state.value = target;
    return;
  }
  const omega = 2 / DAMPING;
  const x = omega * delta;
  const ease = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = state.value - target;
  const temp = (state.velocity + omega * change) * delta;
  state.velocity = (state.velocity - omega * temp) * ease;
  let output = target + (change + temp) * ease;
  if (target - state.value > 0 === output > target) {
    output = target;
    state.velocity = (output - target) / delta;
  }
  state.value = output;
}
/** maath's `dampAngle`: springs along the shorter way round. */
function dampAngle(state: { value: number; velocity: number }, target: number, delta: number): void {
  const turn = Math.PI * 2;
  let difference = clamp(target - state.value - Math.floor((target - state.value) / turn) * turn, 0, turn);
  if (difference > Math.PI) difference -= turn;
  damp(state, state.value + difference, delta);
}

export type HouseCursor = "" | "grab" | "grabbing";

export interface HouseSceneOptions {
  width: number;
  height: number;
  pixelRatio: number;
  /** The final pose, no intro, no turn, no drag: reduced motion with `?poster` (scripts/poster.mjs). */
  still: boolean;
  onReady: () => void;
  /** The cursor to show over the canvas. */
  onCursor: (cursor: HouseCursor) => void;
}

export interface HouseScene {
  resize: (width: number, height: number, pixelRatio: number) => void;
  /** Draw only while on screen. */
  visible: (on: boolean) => void;
  /** Pointer events in CSS pixels from the canvas's top-left corner. */
  pointer: (kind: "move" | "down" | "up" | "leave", x: number, y: number) => void;
}

export function createHouseScene(canvas: HTMLCanvasElement | OffscreenCanvas, options: HouseSceneOptions): HouseScene {
  let { width, height } = options;
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  // React Three Fiber's defaults, which the 2025 colours were seen through.
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setPixelRatio(options.pixelRatio);
  renderer.setSize(width, height, false);

  const camera = new PerspectiveCamera(90, width / height, 0.1, 50);
  camera.position.set(0, 10, 25);
  camera.lookAt(0, 0, 0);
  // The model's materials are unlit (KHR_materials_unlit), so the 2025 ambient light changed nothing: there is none.
  const scene = new Scene();
  const controls = new Group();
  const house = new Group();
  controls.add(house);
  scene.add(controls);

  const turn = { polar: { value: 0, velocity: 0 }, azimuth: { value: 0, velocity: 0 } };
  const target = { polar: 0, azimuth: 0 };
  const raycaster = new Raycaster();
  const ndc = new Vector2();
  let drag: { x: number; y: number } | undefined;
  let cursor: HouseCursor = "";
  let loaded = false;
  let onScreen = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;

  const hits = (x: number, y: number) => {
    if (!loaded) return false;
    ndc.set((x / width) * 2 - 1, -(y / height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    return raycaster.intersectObject(house, true).length > 0;
  };

  const draw = (now: number) => {
    // Seconds since the last frame; a pause off screen does not count.
    const delta = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    elapsed += delta;
    if (options.still) house.rotation.y = INTRO_TO;
    else if (elapsed < INTRO_SECONDS) house.rotation.y = INTRO_FROM + (INTRO_TO - INTRO_FROM) * expoOut(elapsed / INTRO_SECONDS);
    else house.rotation.y -= delta * TURN_PER_SECOND;
    if (delta > 0) {
      dampAngle(turn.polar, target.polar, delta);
      dampAngle(turn.azimuth, target.azimuth, delta);
    }
    controls.rotation.set(turn.polar.value, turn.azimuth.value, 0);
    renderer.render(scene, camera);
  };
  const loop = (now: number) => {
    draw(now);
    frame = onScreen ? nextFrame(loop) : 0;
  };
  const play = () => {
    if (onScreen && loaded && !frame) {
      last = 0;
      frame = nextFrame(loop);
    }
  };

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  void loader.loadAsync(MODEL).then((gltf) => {
    gltf.scene.scale.setScalar(1.2);
    gltf.scene.position.y = -5;
    house.add(gltf.scene);
    loaded = true;
    draw(performance.now());
    options.onReady();
    play();
  });

  return {
    resize(nextWidth, nextHeight, pixelRatio) {
      width = nextWidth;
      height = nextHeight;
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (loaded && !frame) renderer.render(scene, camera);
    },
    visible(on) {
      onScreen = on;
      play();
    },
    pointer(kind, x, y) {
      if (options.still) return;
      if (kind === "down" && hits(x, y)) drag = { x, y };
      else if (kind === "up") drag = undefined;
      else if (kind === "move" && drag) {
        // drei: a drag across the whole box turns the house by π; the tilt stays within its limits.
        target.azimuth += ((x - drag.x) / width) * Math.PI;
        target.polar = clamp(target.polar + ((y - drag.y) / height) * Math.PI, POLAR[0], POLAR[1]);
        drag = { x, y };
      }
      // drei's cursor: "grab" over the house, "grabbing" while dragging, the page's own elsewhere.
      const next = drag ? "grabbing" : kind !== "leave" && hits(x, y) ? "grab" : "";
      if (next !== cursor) options.onCursor((cursor = next));
    },
  };
}
