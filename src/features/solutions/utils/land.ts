/* The land under the Akashic Life drawings ([01]'s long road, [04]'s road
   to the health centre): hills drawn as wobbling contour rings. Seeded, so
   the server and the browser draw the same rings. */

export type Point = [number, number];

export interface Hill {
  /** Centre of the hill in the drawing's own units. */
  c: Point;
  /** Radii of the outer ring. */
  r: Point;
  rings: number;
}

/** A small seeded random generator: the same numbers on server and browser. */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/* One ring: a closed Catmull-Rom curve through wobbled points on an
   ellipse, written as cubic Béziers. */
function ring(cx: number, cy: number, rx: number, ry: number, rand: () => number) {
  const steps = 14;
  const wobble = Array.from({ length: steps }, () => 0.92 + rand() * 0.16);
  const pts: Point[] = wobble.map((k, i) => {
    const a = (i / steps) * Math.PI * 2;
    return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k];
  });
  let d = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
  for (let i = 0; i < steps; i++) {
    const p0 = pts[(i - 1 + steps) % steps];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % steps];
    const p3 = pts[(i + 2) % steps];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${r1(c1[0])} ${r1(c1[1])}, ${r1(c2[0])} ${r1(c2[1])}, ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return d;
}

/** Every ring of every hill, as SVG path data, outer ring first. */
export function contours(hills: Hill[], seed = 258): string[] {
  const rand = mulberry32(seed);
  return hills.flatMap(({ c, r, rings }) =>
    Array.from({ length: rings }, (_, i) => {
      const k = 1 - i * (0.78 / rings);
      return ring(c[0], c[1], r[0] * k, r[1] * k, rand);
    }),
  );
}

/** Length of a path made of one M and any number of C commands, so a
    drawing can pace its pen by distance. */
export function measurePath(d: string) {
  const nums = (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
  let [x, y] = [nums[0], nums[1]];
  let length = 0;
  for (let i = 2; i + 5 < nums.length; i += 6) {
    const [x1, y1, x2, y2, x3, y3] = nums.slice(i, i + 6);
    let [px, py] = [x, y];
    for (let s = 1; s <= 24; s++) {
      const t = s / 24;
      const u = 1 - t;
      const qx = u * u * u * x + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3;
      const qy = u * u * u * y + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3;
      length += Math.hypot(qx - px, qy - py);
      [px, py] = [qx, qy];
    }
    [x, y] = [x3, y3];
  }
  return length;
}

/** The pen's pace on every Akashic Life road, in drawing units a second. */
export const PEN_PACE = 800;
