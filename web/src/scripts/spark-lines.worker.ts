import { createSparkLines, type SparkLinesOptions } from "./spark-lines-core";

/**
 * The spark lines' draw loop off the main thread (spark-lines.ts): the page hands over its canvas as an OffscreenCanvas,
 * then only says how big it is and when it is on screen. Same pattern as the flow field (flow-field.worker.ts).
 */
type Message =
  | { type: "start"; canvas: OffscreenCanvas; width: number; height: number; pixelRatio: number; options: SparkLinesOptions }
  | { type: "size"; width: number; height: number; pixelRatio: number }
  | { type: "visible"; on: boolean };

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<Message>) => void) | null;
  requestAnimationFrame?: (callback: (now: number) => void) => number;
};
const nextFrame = (callback: (now: number) => void) =>
  scope.requestAnimationFrame ? scope.requestAnimationFrame(callback) : setTimeout(() => callback(performance.now()), 16);

let lines: ReturnType<typeof createSparkLines> = null;
let onScreen = false;
let running = false;

const tick = (now: number) => {
  if (!onScreen || !lines) {
    running = false;
    return;
  }
  lines.frame(now);
  nextFrame(tick);
};
const play = () => {
  if (onScreen && lines && !running) {
    running = true;
    nextFrame(tick);
  }
};

scope.onmessage = ({ data }) => {
  if (data.type === "start") {
    lines = createSparkLines(data.canvas, data.options);
    lines?.resize(data.width, data.height, data.pixelRatio);
  } else if (data.type === "size") {
    lines?.resize(data.width, data.height, data.pixelRatio);
  } else {
    onScreen = data.on;
  }
  play();
};
