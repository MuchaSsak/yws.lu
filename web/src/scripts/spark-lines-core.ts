/**
 * Sparks streaming out from behind the owners hero's headline: the look of the 2025 background lines (short warm dashes
 * running along curves, about ten seconds a run, then a pause), written from scratch: the 2025 effect was Aceternity
 * code and nothing of it is reused (open-questions Q23); the curves here are our own, a seeded burst from the centre.
 * Canvas 2D and free of the DOM, so it runs in a worker on an OffscreenCanvas (spark-lines.ts) or on the page's canvas.
 * `frame(now)` paints the dashes where they are at `now` (ms): the motion is set by time, not by frame rate.
 */
export interface SparkLinesOptions {
  /** How many curves (each carries one dash at a time). */
  count: number;
}

type Surface = HTMLCanvasElement | OffscreenCanvas;
type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

/** The 2025 site's warm palette for these lines (Material oranges, reds and yellows). */
const COLORS = [
  "#FF6F00",
  "#FF8F00",
  "#FFA000",
  "#FFD600",
  "#FFB300",
  "#FF5722",
  "#E65100",
  "#F44336",
  "#E53935",
  "#D32F2F",
  "#C62828",
  "#B71C1C",
  "#FFC107",
  "#FF9800",
  "#F57C00",
  "#FF7043",
  "#FF5252",
  "#FF1744",
  "#FFD54F",
];
const SAMPLES = 40;
const LINE_WIDTH = 2.3;
/** A dash is 50 px long as it leaves the centre and 20 px as it reaches the edge (2025: dash array 50 → 20). */
const DASH_FROM = 50;
const DASH_TO = 20;

interface Curve {
  /** Sample points in units of the canvas (0–1 across, 0–1 down); beyond 1 is off the edge. */
  unit: Float32Array;
  /** The same points in CSS pixels, and the distance along the curve to each. */
  px: Float32Array;
  along: Float32Array;
  color: string;
  /** Seconds: the run, the wait before the first run, the pause between runs. */
  run: number;
  delay: number;
  pause: number;
}

/** A small seeded generator, so every load and every screenshot draws the same burst. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function burst(count: number): Curve[] {
  const random = seeded(0x51a7c3);
  const point = (radius: number, angle: number): [number, number] => [
    0.5 + 0.5 * radius * Math.cos(angle),
    0.5 + 0.5 * radius * Math.sin(angle),
  ];
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 + (random() - 0.5) * 0.6;
    const curl = (random() - 0.5) * 1.4;
    const from = 0.12 + random() * 0.18;
    const to = 1.1 + random() * 0.5;
    const p0 = point(from, angle);
    const p1 = point(from + (to - from) * 0.35, angle + curl * 0.15);
    const p2 = point(from + (to - from) * 0.7, angle + curl * 0.6);
    const p3 = point(to, angle + curl);
    const unit = new Float32Array(SAMPLES * 2);
    for (let step = 0; step < SAMPLES; step++) {
      const t = step / (SAMPLES - 1);
      const u = 1 - t;
      const a = u * u * u;
      const b = 3 * u * u * t;
      const c = 3 * u * t * t;
      const d = t * t * t;
      unit[step * 2] = a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0];
      unit[step * 2 + 1] = a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1];
    }
    return {
      unit,
      px: new Float32Array(SAMPLES * 2),
      along: new Float32Array(SAMPLES),
      color: COLORS[Math.floor(random() * COLORS.length)] ?? "#FF6F00",
      run: 9 + random() * 3,
      delay: random() * 10,
      pause: 2 + random() * 10,
    };
  });
}

export function createSparkLines(
  canvas: Surface,
  options: SparkLinesOptions,
): { resize: (width: number, height: number, pixelRatio: number) => void; frame: (now: number) => void } | null {
  const ctx = canvas.getContext("2d") as Context | null;
  if (!ctx) return null;
  const curves = burst(options.count);
  let width = 0;
  let height = 0;
  let start = -1;

  const resize = (nextWidth: number, nextHeight: number, pixelRatio: number) => {
    width = nextWidth;
    height = nextHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const curve of curves) {
      let total = 0;
      for (let step = 0; step < SAMPLES; step++) {
        const x = (curve.unit[step * 2] ?? 0) * width;
        const y = (curve.unit[step * 2 + 1] ?? 0) * height;
        if (step > 0) total += Math.hypot(x - (curve.px[step * 2 - 2] ?? 0), y - (curve.px[step * 2 - 1] ?? 0));
        curve.px[step * 2] = x;
        curve.px[step * 2 + 1] = y;
        curve.along[step] = total;
      }
    }
  };

  /** The point `distance` px along a curve. */
  const at = (curve: Curve, distance: number): [number, number] => {
    let step = 1;
    while (step < SAMPLES - 1 && (curve.along[step] ?? 0) < distance) step++;
    const from = curve.along[step - 1] ?? 0;
    const span = (curve.along[step] ?? 0) - from || 1;
    const t = Math.min(Math.max((distance - from) / span, 0), 1);
    const x0 = curve.px[step * 2 - 2] ?? 0;
    const y0 = curve.px[step * 2 - 1] ?? 0;
    return [x0 + ((curve.px[step * 2] ?? 0) - x0) * t, y0 + ((curve.px[step * 2 + 1] ?? 0) - y0) * t];
  };

  const frame = (now: number) => {
    if (start < 0) start = now;
    const seconds = (now - start) / 1000;
    ctx.clearRect(0, 0, width, height);
    for (const curve of curves) {
      const time = seconds - curve.delay;
      if (time < 0) continue;
      const local = time % (curve.run + curve.pause);
      if (local > curve.run) continue;
      const progress = local / curve.run;
      const length = curve.along[SAMPLES - 1] ?? 0;
      const dash = DASH_FROM + (DASH_TO - DASH_FROM) * progress;
      const head = progress * (length + dash);
      const tail = Math.max(0, head - dash);
      const end = Math.min(head, length);
      if (end <= tail) continue;
      // Fade in as it leaves the centre, out before it leaves the screen.
      ctx.globalAlpha = Math.min(1, progress / 0.1, (1 - progress) / 0.2);
      ctx.strokeStyle = curve.color;
      ctx.beginPath();
      ctx.moveTo(...at(curve, tail));
      for (let step = 1; step < SAMPLES; step++) {
        const distance = curve.along[step] ?? 0;
        if (distance <= tail) continue;
        if (distance >= end) break;
        ctx.lineTo(curve.px[step * 2] ?? 0, curve.px[step * 2 + 1] ?? 0);
      }
      ctx.lineTo(...at(curve, end));
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  return { resize, frame };
}
