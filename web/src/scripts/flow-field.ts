import { createNoise3D } from "simplex-noise";

/**
 * Glowing particle streaks drifting along a noise field: the look behind the 2025 housing hero, written from scratch
 * (the 2025 effect was proprietary Aceternity code, so nothing of it is reused; open-questions Q23). Canvas 2D, one
 * draw loop that runs only while the canvas is on screen, never under reduced motion. Wiki: design/design.md § Motion.
 */
export interface FlowFieldOptions {
  /** How many streaks live at once. */
  count: number;
  /** Half-height (px) of the band around the vertical centre where streaks are born. */
  band: number;
  /** First hue of the palette (degrees); streaks take a hue in [hue, hue + 100). */
  hue: number;
}

const NOISE_SCALE = 0.00125;
const TIME_SCALE = 0.0005;
const TURNS = 3;
const MAX_SPEED = 1.5;

interface Field {
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  age: Float32Array;
  life: Float32Array;
  speed: Float32Array;
  width: Float32Array;
  hue: Float32Array;
}

const field = (count: number): Field => ({
  x: new Float32Array(count),
  y: new Float32Array(count),
  vx: new Float32Array(count),
  vy: new Float32Array(count),
  age: new Float32Array(count),
  life: new Float32Array(count),
  speed: new Float32Array(count),
  width: new Float32Array(count),
  hue: new Float32Array(count),
});

export function mountFlowField(canvas: HTMLCanvasElement, options: FlowFieldOptions): void {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const noise = createNoise3D();
  const streaks = field(options.count);
  let time = 0;
  let raf = 0;
  let onScreen = false;

  const spawn = (i: number) => {
    streaks.x[i] = Math.random() * canvas.width;
    streaks.y[i] = canvas.height / 2 + (Math.random() * 2 - 1) * options.band;
    streaks.vx[i] = 0;
    streaks.vy[i] = 0;
    streaks.age[i] = 0;
    streaks.life[i] = 50 + Math.random() * 150;
    streaks.speed[i] = Math.random() * MAX_SPEED;
    streaks.width[i] = 1 + Math.random() * 2;
    streaks.hue[i] = options.hue + Math.random() * 100;
  };

  const fit = () => {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
  };

  const move = (i: number) => {
    const x = streaks.x[i] as number;
    const y = streaks.y[i] as number;
    const angle = noise(x * NOISE_SCALE, y * NOISE_SCALE, time * TIME_SCALE) * TURNS * Math.PI * 2;
    const vx = ((streaks.vx[i] as number) + Math.cos(angle)) / 2;
    const vy = ((streaks.vy[i] as number) + Math.sin(angle)) / 2;
    const speed = streaks.speed[i] as number;
    const nx = x + vx * speed;
    const ny = y + vy * speed;
    const age = (streaks.age[i] as number) + 1;
    const life = streaks.life[i] as number;
    // Fades in, then out, over its life.
    const alpha = 1 - Math.abs((2 * age) / life - 1);

    ctx.lineWidth = streaks.width[i] as number;
    ctx.strokeStyle = `hsl(${streaks.hue[i]} 100% 60% / ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    streaks.x[i] = nx;
    streaks.y[i] = ny;
    streaks.vx[i] = vx;
    streaks.vy[i] = vy;
    streaks.age[i] = age;
    if (age > life || nx < 0 || ny < 0 || nx > canvas.width || ny > canvas.height) spawn(i);
  };

  const frame = () => {
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    for (let i = 0; i < options.count; i++) move(i);
    // Glow: add soft, brightened copies of this frame on top of itself.
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const filter of ["blur(8px) brightness(200%)", "blur(4px) brightness(200%)", "none"]) {
      ctx.filter = filter;
      ctx.drawImage(canvas, 0, 0);
    }
    ctx.restore();
    raf = onScreen ? requestAnimationFrame(frame) : 0;
  };

  fit();
  for (let i = 0; i < options.count; i++) spawn(i);
  new ResizeObserver(fit).observe(canvas);
  new IntersectionObserver(([entry]) => {
    onScreen = entry?.isIntersecting ?? false;
    if (onScreen && !raf) raf = requestAnimationFrame(frame);
  }).observe(canvas);
  canvas.dataset.live = "";
}
