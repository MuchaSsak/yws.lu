import { createNoise3D } from "simplex-noise";

/**
 * The particle vortex behind the housing hero (the 2025 Aceternity-style Vortex, ported to plain canvas 2D). Same
 * motion and colours; it starts after first paint, draws only while on screen, sizes to its own box (not the window),
 * caps the pixel ratio, and never runs under reduced motion (the hero shows without it). Wiki: design/design.md § Motion.
 */
interface Options {
  particleCount: number;
  rangeY: number;
  baseHue: number;
}

const PROPS = 9;
const BASE_TTL = 50;
const RANGE_TTL = 150;
const RANGE_SPEED = 1.5;
const BASE_RADIUS = 1;
const RANGE_RADIUS = 2;
const RANGE_HUE = 100;
const NOISE_STEPS = 3;
const X_OFF = 0.00125;
const Y_OFF = 0.00125;
const Z_OFF = 0.0005;
const TAU = 2 * Math.PI;

const rand = (n: number) => n * Math.random();
const randRange = (n: number) => n - rand(2 * n);
const fadeInOut = (t: number, m: number) => {
  const hm = 0.5 * m;
  return Math.abs(((t + hm) % m) - hm) / hm;
};
const lerp = (a: number, b: number, speed: number) => (1 - speed) * a + speed * b;

export function mountVortex(canvas: HTMLCanvasElement, options: Options): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const noise3D = createNoise3D();
  const length = options.particleCount * PROPS;
  const particles = new Float32Array(length);
  let tick = 0;
  let centerY = 0;
  let frame = 0;
  let visible = false;

  const resize = () => {
    const box = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(box.width));
    canvas.height = Math.max(1, Math.round(box.height));
    centerY = canvas.height / 2;
  };

  const init = (i: number) => {
    particles.set(
      [
        rand(canvas.width),
        centerY + randRange(options.rangeY),
        0,
        0,
        0,
        BASE_TTL + rand(RANGE_TTL),
        rand(RANGE_SPEED),
        BASE_RADIUS + rand(RANGE_RADIUS),
        options.baseHue + rand(RANGE_HUE),
      ],
      i,
    );
  };

  const step = (i: number) => {
    const x = particles[i] as number;
    const y = particles[i + 1] as number;
    const n = noise3D(x * X_OFF, y * Y_OFF, tick * Z_OFF) * NOISE_STEPS * TAU;
    const vx = lerp(particles[i + 2] as number, Math.cos(n), 0.5);
    const vy = lerp(particles[i + 3] as number, Math.sin(n), 0.5);
    const life = particles[i + 4] as number;
    const ttl = particles[i + 5] as number;
    const speed = particles[i + 6] as number;
    const x2 = x + vx * speed;
    const y2 = y + vy * speed;
    ctx.lineWidth = particles[i + 7] as number;
    ctx.strokeStyle = `hsla(${particles[i + 8]},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    particles[i] = x2;
    particles[i + 1] = y2;
    particles[i + 2] = vx;
    particles[i + 3] = vy;
    particles[i + 4] = life + 1;
    if (x2 > canvas.width || x2 < 0 || y2 > canvas.height || y2 < 0 || life + 1 > ttl) init(i);
  };

  const draw = () => {
    tick++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    for (let i = 0; i < length; i += PROPS) step(i);
    // The glow: the same two blurred, brightened copies the original drew.
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.filter = "blur(8px) brightness(200%)";
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = "blur(4px) brightness(200%)";
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = "none";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
    frame = visible ? requestAnimationFrame(draw) : 0;
  };

  resize();
  for (let i = 0; i < length; i += PROPS) init(i);
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (visible && !frame) frame = requestAnimationFrame(draw);
  }).observe(canvas);
  canvas.classList.add("is-live");
}
