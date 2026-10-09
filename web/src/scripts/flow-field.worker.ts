import { createFlowField, type FlowFieldOptions } from "./flow-field-core";

/**
 * The flow field's draw loop off the main thread (flow-field.ts): the page hands over its canvas as an OffscreenCanvas,
 * then only says when it is on screen and how big it is. 400–700 strokes and three blurred copies a frame cost the
 * housing page 400–560 ms of blocking time on a throttled phone when they ran on the main thread.
 */
type Message =
  | { type: "start"; canvas: OffscreenCanvas; width: number; height: number; options: FlowFieldOptions }
  | { type: "size"; width: number; height: number }
  | { type: "visible"; on: boolean };

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<Message>) => void) | null;
  requestAnimationFrame?: (callback: () => void) => number;
};
const nextFrame = (callback: () => void) =>
  scope.requestAnimationFrame ? scope.requestAnimationFrame(callback) : setTimeout(callback, 16);

let canvas: OffscreenCanvas | undefined;
let field: ReturnType<typeof createFlowField> = null;
let onScreen = false;
let running = false;

const tick = () => {
  if (!onScreen || !field) {
    running = false;
    return;
  }
  field.frame();
  nextFrame(tick);
};
const play = () => {
  if (onScreen && field && !running) {
    running = true;
    nextFrame(tick);
  }
};

scope.onmessage = ({ data }) => {
  if (data.type === "start") {
    canvas = data.canvas;
    canvas.width = data.width;
    canvas.height = data.height;
    field = createFlowField(canvas, data.options);
  } else if (data.type === "size" && canvas) {
    canvas.width = data.width;
    canvas.height = data.height;
  } else if (data.type === "visible") {
    onScreen = data.on;
  }
  play();
};
