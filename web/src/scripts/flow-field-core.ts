import { createNoise3D } from "simplex-noise";

/**
 * The flow field's drawing, free of the DOM so it runs in a worker on an OffscreenCanvas (flow-field.ts) or, where
 * that is missing, on the page's canvas. One call to `frame()` moves every streak and paints one frame.
 */
export interface FlowFieldOptions {
  /** How many streaks live at once. */
  count: number;
  /** Half-height (px) of the band around the vertical centre where streaks are born. */
  band: number;
  /** First hue of the palette (degrees); streaks take a hue in [hue, hue + 100). */
  hue: number;
}

type Surface = HTMLCanvasElement | OffscreenCanvas;
type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

const NOISE_SCALE = 0.00125;
const TIME_SCALE = 0.0005;
const TURNS = 3;
const MAX_SPEED = 1.5;

export function createFlowField(canvas: Surface, options: FlowFieldOptions): { frame: () => void } | null {
  const ctx = canvas.getContext("2d") as Context | null;
  if (!ctx) return null;

  const noise = createNoise3D();
  const { count } = options;
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const vx = new Float32Array(count);
  const vy = new Float32Array(count);
  const age = new Float32Array(count);
  const life = new Float32Array(count);
  const speed = new Float32Array(count);
  const width = new Float32Array(count);
  const hue = new Float32Array(count);
  let time = 0;

  const spawn = (i: number) => {
    x[i] = Math.random() * canvas.width;
    y[i] = canvas.height / 2 + (Math.random() * 2 - 1) * options.band;
    vx[i] = 0;
    vy[i] = 0;
    age[i] = 0;
    life[i] = 50 + Math.random() * 150;
    speed[i] = Math.random() * MAX_SPEED;
    width[i] = 1 + Math.random() * 2;
    hue[i] = options.hue + Math.random() * 100;
  };

  const move = (i: number) => {
    const x0 = x[i] as number;
    const y0 = y[i] as number;
    const angle = noise(x0 * NOISE_SCALE, y0 * NOISE_SCALE, time * TIME_SCALE) * TURNS * Math.PI * 2;
    const nvx = ((vx[i] as number) + Math.cos(angle)) / 2;
    const nvy = ((vy[i] as number) + Math.sin(angle)) / 2;
    const nx = x0 + nvx * (speed[i] as number);
    const ny = y0 + nvy * (speed[i] as number);
    const nage = (age[i] as number) + 1;
    const span = life[i] as number;
    // Fades in, then out, over its life.
    const alpha = 1 - Math.abs((2 * nage) / span - 1);

    ctx.lineWidth = width[i] as number;
    ctx.strokeStyle = `hsl(${hue[i]} 100% 60% / ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    x[i] = nx;
    y[i] = ny;
    vx[i] = nvx;
    vy[i] = nvy;
    age[i] = nage;
    if (nage > span || nx < 0 || ny < 0 || nx > canvas.width || ny > canvas.height) spawn(i);
  };

  for (let i = 0; i < count; i++) spawn(i);

  return {
    frame() {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";
      for (let i = 0; i < count; i++) move(i);
      // Glow: add soft, brightened copies of this frame on top of itself.
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const filter of ["blur(8px) brightness(200%)", "blur(4px) brightness(200%)", "none"]) {
        ctx.filter = filter;
        ctx.drawImage(canvas, 0, 0);
      }
      ctx.restore();
    },
  };
}
