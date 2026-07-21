"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

// GlyphMorphCanvas — the atom field behind the Meet Akashic "The platform"
// block. ONE population of atoms carries the whole pipeline: a third of them
// drift freely at all times, the rest gather into the active flow tab's glyph,
// then break apart and re-form into the next one, so the four steps read as a
// continuation rather than four separate pictures (user direction 21 Jul 2026).
// Nothing is ever fully still — formed atoms keep wobbling and twinkling.

/* ---------- easing ---------- */

function makeBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x;
      if (Math.abs(err) < 1e-6) return sampleY(t);
      const d = sampleDX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    while (hi - lo > 1e-6) {
      if (sampleX(t) < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sampleY(t);
  };
}

const easeSettle = makeBezier(0.2, 0.8, 0.2, 1);
const easeBurst = (p: number) => 1 - (1 - p) ** 3;

/* ---------- seeded PRNG: deterministic layouts ---------- */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- glyph DSL: stroke primitives in a 100x100 space (y-down) ---------- */

type Prim =
  | { kind: "line"; pts: [number, number][]; density?: number; emphasis?: boolean }
  | { kind: "circle"; c: [number, number]; r: number; a0?: number; a1?: number; density?: number; emphasis?: boolean }
  | { kind: "cubic"; pts: [number, number, number, number, number, number, number, number]; density?: number; emphasis?: boolean }
  | { kind: "disc"; c: [number, number]; r: number; density?: number; emphasis?: boolean }
  | { kind: "star4"; c: [number, number]; r: number; density?: number; emphasis?: boolean };

// Ingest & unify — confluence: six streams merge into one ring + core
const UNIFY: Prim[] = [
  ...([16, 30, 42, 58, 70, 84] as const).map(
    (ys, i): Prim => ({
      kind: "cubic",
      pts: [
        2, ys,
        24, ys,
        46, [42.5, 45.6, 48.2, 51.8, 54.5, 57.5][i],
        [63.4, 61.8, 61.1, 61.1, 61.8, 63.4][i], [42.5, 45.6, 48.2, 51.8, 54.5, 57.5][i],
      ],
    }),
  ),
  { kind: "circle", c: [74, 50], r: 13 },
  { kind: "disc", c: [74, 50], r: 5.5, emphasis: true },
];

// Store & predict — forecast: dense past line, sparse dotted future, spark
const PREDICT: Prim[] = [
  { kind: "line", pts: [[4, 78], [14, 70], [24, 73], [34, 60], [44, 63], [54, 50]] },
  { kind: "cubic", pts: [54, 50, 64, 44, 74, 30, 84, 18], density: 0.42 },
  { kind: "star4", c: [87, 14], r: 8, emphasis: true },
];

// Explore & ask — answer bubble: rounded bubble outline + sparkle inside
const ASK: Prim[] = [
  { kind: "line", pts: [[29, 18], [71, 18]] },
  { kind: "circle", c: [71, 31], r: 13, a0: 270, a1: 360 },
  { kind: "line", pts: [[84, 31], [84, 53]] },
  { kind: "circle", c: [71, 53], r: 13, a0: 0, a1: 90 },
  { kind: "line", pts: [[71, 66], [50, 66]] },
  { kind: "line", pts: [[50, 66], [33, 80]] },
  { kind: "line", pts: [[33, 80], [41, 66]] },
  { kind: "line", pts: [[41, 66], [29, 66]] },
  { kind: "circle", c: [29, 53], r: 13, a0: 90, a1: 180 },
  { kind: "line", pts: [[16, 53], [16, 31]] },
  { kind: "circle", c: [29, 31], r: 13, a0: 180, a1: 270 },
  { kind: "star4", c: [50, 42], r: 12, emphasis: true },
];

// Govern & prove — shield outline with a check struck through it
const GOVERN: Prim[] = [
  { kind: "line", pts: [[26, 18], [74, 18]] },
  { kind: "cubic", pts: [74, 18, 74, 54, 67, 72, 50, 86] },
  { kind: "cubic", pts: [50, 86, 33, 72, 26, 54, 26, 18] },
  { kind: "line", pts: [[38, 48], [46, 57], [63, 36]], density: 1.8, emphasis: true },
];

// Order = the pipeline the section narrates top-to-bottom: the question drops
// in and flows through ingest → store → explore → govern, with the grounded
// answer at the end (user direction 20 Jul 2026). Index-matched to UCSignals'
// TABS — reorder both together or the canvas desyncs.
const GLYPHS: Prim[][] = [UNIFY, PREDICT, ASK, GOVERN];

/* ---------- flatten + sample ---------- */

type Chain = { xs: number[]; ys: number[]; density: number; emphasis: boolean };

function flattenPrim(p: Prim): Chain[] {
  const density = p.density ?? 1;
  const emphasis = p.emphasis ?? false;
  switch (p.kind) {
    case "line":
      return [{ xs: p.pts.map((q) => q[0]), ys: p.pts.map((q) => q[1]), density, emphasis }];
    case "circle": {
      const a0 = ((p.a0 ?? 0) * Math.PI) / 180;
      const a1 = ((p.a1 ?? 360) * Math.PI) / 180;
      const steps = Math.max(10, Math.ceil((Math.abs(a1 - a0) * p.r) / 1.1));
      const xs: number[] = [];
      const ys: number[] = [];
      for (let i = 0; i <= steps; i++) {
        const a = a0 + ((a1 - a0) * i) / steps;
        xs.push(p.c[0] + Math.cos(a) * p.r);
        ys.push(p.c[1] + Math.sin(a) * p.r);
      }
      return [{ xs, ys, density, emphasis }];
    }
    case "cubic": {
      const [x0, y0, x1, y1, x2, y2, x3, y3] = p.pts;
      const steps = 36;
      const xs: number[] = [];
      const ys: number[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const u = 1 - t;
        xs.push(u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3);
        ys.push(u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3);
      }
      return [{ xs, ys, density, emphasis }];
    }
    case "disc":
      // concentric rings for a filled-core read
      return [0.9, p.r / 3, (2 * p.r) / 3, p.r].map(
        (r) => flattenPrim({ kind: "circle", c: p.c, r, density, emphasis })[0],
      );
    case "star4": {
      // astroid (x=a cos^3 t, y=a sin^3 t) = four-point sparkle
      const steps = 48;
      const xs: number[] = [];
      const ys: number[] = [];
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const ca = Math.cos(a);
        const sa = Math.sin(a);
        xs.push(p.c[0] + p.r * ca * ca * ca);
        ys.push(p.c[1] + p.r * sa * sa * sa);
      }
      return [{ xs, ys, density, emphasis }];
    }
  }
}

/* ---------- tunables ---------- */

const FIT = 0.68; // glyph size as a share of the short canvas edge
const PITCH = 5.6; // px of path per atom — wide enough to read as atoms, not a line
const PATH_JITTER = 1.5; // px of scatter off the ideal path, so strokes are bands of atoms
const MIN_FREE = 0.34; // share of the population that never joins the glyph

// Break + build runs ~2.6s of UCSignals' 7s tab dwell, so the glyph stands
// readable for the remaining ~4.4s rather than being in motion half the time.
const BREAK_MS = 520; // one atom's flight out of the old glyph
const BREAK_STAGGER = 320; // the old glyph comes apart in a wave, not all at once
const FLOAT_MS = 160; // free-drift beat between break and build
const GATHER_MS = 940; // one atom's flight into the new glyph
const GATHER_SPREAD = 640; // the new glyph builds up along its own path order

const OMEGA = (Math.PI * 2) / 5.5;
const CURSOR_R = 100;
const CURSOR_R2 = CURSOR_R * CURSOR_R;
const MAX_PUSH = 18;
const SPRING_K = 0.08;
const SPRING_DAMP = 0.86;

const CURL = 0.000012; // slow rotation of the ambient field
const WANDER = 0.022;
const DRIFT_DAMP = 0.99;
const MAX_SPEED = 2.6;
const TAU = Math.PI * 2;

// Atoms are drawn as solid, hard-edged discs — no sprite, no glow. A soft
// radial-gradient sprite read as blur rather than as matter (user direction
// 22 Jul 2026, Google Antigravity as the reference). Per-atom alpha is
// quantised into ALPHA_STEPS buckets so the whole field paints in a couple of
// dozen batched fills instead of a thousand state changes.
const TINTS = ["rgb(250,250,251)", "rgb(125,152,246)"];
const ALPHA_STEPS = 16;

// Fills eng.gx/gy/gEm with the glyph's atom targets in canvas px and returns
// how many atoms it needs — derived from path length, so dot pitch is the same
// on every glyph and a per-stroke `density` still thins or thickens a stroke.
function buildGlyph(
  prims: Prim[],
  w: number,
  h: number,
  cap: number,
  out: { x: Float32Array; y: Float32Array; em: Uint8Array },
  exact = 0,
): number {
  const chains = prims.flatMap(flattenPrim);
  const segs: { x0: number; y0: number; x1: number; y1: number; wl: number; em: boolean }[] = [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let W = 0;
  for (const ch of chains) {
    for (let i = 0; i < ch.xs.length; i++) {
      if (ch.xs[i] < minX) minX = ch.xs[i];
      if (ch.xs[i] > maxX) maxX = ch.xs[i];
      if (ch.ys[i] < minY) minY = ch.ys[i];
      if (ch.ys[i] > maxY) maxY = ch.ys[i];
    }
    for (let i = 0; i < ch.xs.length - 1; i++) {
      const len = Math.hypot(ch.xs[i + 1] - ch.xs[i], ch.ys[i + 1] - ch.ys[i]);
      if (len < 1e-4) continue;
      segs.push({
        x0: ch.xs[i], y0: ch.ys[i],
        x1: ch.xs[i + 1], y1: ch.ys[i + 1],
        wl: len * ch.density, em: ch.emphasis,
      });
      W += len * ch.density;
    }
  }

  const scale = (FIT * Math.min(w, h)) / Math.max(maxX - minX, maxY - minY, 1e-3);
  const ox = w * 0.5 - ((minX + maxX) / 2) * scale;
  const oy = h * 0.48 - ((minY + maxY) / 2) * scale;
  // `exact` re-fits an existing glyph at a new canvas size without changing how
  // many atoms hold it, so a resize moves the shape instead of rebuilding it.
  const n = exact > 0
    ? Math.min(exact, out.x.length)
    : Math.max(48, Math.min(cap, Math.round((W * scale) / PITCH)));

  const rng = mulberry32(0x5eed);
  const step = W / n;
  let next = step * 0.5;
  let acc = 0;
  let k = 0;
  let lx = 50;
  let ly = 50;
  let lem = 0;
  for (const s of segs) {
    while (acc + s.wl >= next && k < n) {
      const t = (next - acc) / s.wl;
      lx = s.x0 + (s.x1 - s.x0) * t;
      ly = s.y0 + (s.y1 - s.y0) * t;
      lem = s.em ? 1 : 0;
      const a = rng() * TAU;
      const rr = Math.sqrt(rng()) * PATH_JITTER;
      out.x[k] = lx * scale + ox + Math.cos(a) * rr;
      out.y[k] = ly * scale + oy + Math.sin(a) * rr;
      out.em[k] = lem;
      k++;
      next += step;
    }
    acc += s.wl;
    if (k >= n) break;
  }
  while (k < n) {
    out.x[k] = lx * scale + ox;
    out.y[k] = ly * scale + oy;
    out.em[k] = lem;
    k++;
  }
  return n;
}

/* ---------- engine ---------- */

// mode: 0 = free-drifting · 1 = in flight to a glyph target · 2 = holding a target
interface Engine {
  n: number;
  w: number;
  h: number;
  symbol: number;
  next: number;
  seed: number;
  needsRebuild: boolean;
  k: number; // atoms currently holding the glyph
  slot: Int32Array; // each atom's glyph target index, -1 while free
  mode: Uint8Array; hasBreak: Uint8Array;
  px: Float32Array; py: Float32Array; // physics position (render adds wobble)
  vx: Float32Array; vy: Float32Array;
  sx: Float32Array; sy: Float32Array; // flight origin
  wx: Float32Array; wy: Float32Array; // scatter waypoint between the two glyphs
  tx: Float32Array; ty: Float32Array; // glyph target
  tb0: Float32Array; tb1: Float32Array; // break window
  tg0: Float32Array; tg1: Float32Array; // gather window
  rs: Float32Array; as: Float32Array; // look at flight origin
  rt: Float32Array; at: Float32Array; // look on the glyph
  fr: Float32Array; fa: Float32Array; // look while free
  baseR: Float32Array; baseA: Float32Array; // seeded look, before emphasis
  cr: Float32Array; ca: Float32Array; // rendered look, read back when a glyph breaks
  ph1: Float32Array; ph2: Float32Array; wf1: Float32Array; wf2: Float32Array;
  amp: Float32Array; tw: Float32Array; tph: Float32Array;
  ox: Float32Array; oy: Float32Array; ovx: Float32Array; ovy: Float32Array;
  tint: Uint8Array;
  order: Uint32Array;
  gx: Float32Array; gy: Float32Array; gEm: Uint8Array;
}

function alloc(n: number) {
  return {
    slot: new Int32Array(n).fill(-1),
    mode: new Uint8Array(n), hasBreak: new Uint8Array(n),
    px: new Float32Array(n), py: new Float32Array(n),
    vx: new Float32Array(n), vy: new Float32Array(n),
    sx: new Float32Array(n), sy: new Float32Array(n),
    wx: new Float32Array(n), wy: new Float32Array(n),
    tx: new Float32Array(n), ty: new Float32Array(n),
    tb0: new Float32Array(n), tb1: new Float32Array(n),
    tg0: new Float32Array(n), tg1: new Float32Array(n),
    rs: new Float32Array(n), as: new Float32Array(n),
    rt: new Float32Array(n), at: new Float32Array(n),
    fr: new Float32Array(n), fa: new Float32Array(n),
    baseR: new Float32Array(n), baseA: new Float32Array(n),
    cr: new Float32Array(n), ca: new Float32Array(n),
    ph1: new Float32Array(n), ph2: new Float32Array(n),
    wf1: new Float32Array(n), wf2: new Float32Array(n),
    amp: new Float32Array(n), tw: new Float32Array(n), tph: new Float32Array(n),
    ox: new Float32Array(n), oy: new Float32Array(n),
    ovx: new Float32Array(n), ovy: new Float32Array(n),
    tint: new Uint8Array(n),
    order: new Uint32Array(n),
    gx: new Float32Array(n), gy: new Float32Array(n), gEm: new Uint8Array(n),
  };
}

// An atom's look once it lands on the glyph — emphasis strokes (the unify core,
// the forecast spark, the sparkle, the check) sit brighter and larger.
const glyphR = (eng: Engine, i: number, em: boolean) => eng.baseR[i] * (em ? 1.5 : 1);
const glyphA = (eng: Engine, i: number, em: boolean) =>
  Math.min(0.97, eng.baseA[i] * (em ? 1.3 : 1));

function particleCount(w: number, h: number) {
  return Math.max(700, Math.min(1500, Math.round(Math.sqrt(w * h) * 1.75)));
}

export default function GlyphMorphCanvas({
  active,
  className = "",
}: {
  active: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engRef = useRef<Engine | null>(null);
  const morphRef = useRef<((next: number) => void) | null>(null);
  const reduced = usePrefersReducedMotion();
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
    morphRef.current?.(active);
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const buckets: (Path2D | null)[] = new Array(TINTS.length * ALPHA_STEPS).fill(null);
    const pointer = { x: 0, y: 0, on: false };
    let visible = true;

    const rectOf = () => canvas.getBoundingClientRect();

    /* ----- assign roles: K atoms to the glyph, the rest to the free field ----- */
    const retarget = (eng: Engine, symbol: number, now: number, withBreak: boolean) => {
      eng.symbol = symbol;
      const cap = Math.floor(eng.n * (1 - MIN_FREE));
      const K = buildGlyph(GLYPHS[symbol], eng.w, eng.h, cap, {
        x: eng.gx, y: eng.gy, em: eng.gEm,
      });
      eng.k = K;

      const rng = mulberry32(eng.seed++);
      for (let i = 0; i < eng.n; i++) eng.order[i] = i;
      for (let i = eng.n - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        const t = eng.order[i];
        eng.order[i] = eng.order[j];
        eng.order[j] = t;
      }

      const ccx = eng.w * 0.5;
      const ccy = eng.h * 0.48;
      const gatherBase = now + (withBreak ? BREAK_STAGGER + BREAK_MS + FLOAT_MS : FLOAT_MS * 0.5);

      for (let j = 0; j < eng.n; j++) {
        const i = eng.order[j];
        const dx = eng.px[i] - ccx;
        const dy = eng.py[i] - ccy;
        const away = dx === 0 && dy === 0 ? rng() * TAU : Math.atan2(dy, dx);

        if (j >= K) {
          // released back into the ambient field, with a nudge outward
          if (eng.mode[i] !== 0) {
            const sp = 0.7 + rng() * 1.5;
            eng.vx[i] = Math.cos(away) * sp;
            eng.vy[i] = Math.sin(away) * sp;
          }
          eng.mode[i] = 0;
          eng.slot[i] = -1;
          continue;
        }

        eng.slot[i] = j;
        const em = eng.gEm[j] === 1;
        const breaking = withBreak && eng.mode[i] !== 0;
        eng.hasBreak[i] = breaking ? 1 : 0;
        eng.sx[i] = eng.px[i];
        eng.sy[i] = eng.py[i];

        if (breaking) {
          const a = away + (rng() - 0.5) * 0.9;
          const dist = 60 + rng() * 190;
          eng.wx[i] = eng.px[i] + Math.cos(a) * dist;
          eng.wy[i] = eng.py[i] + Math.sin(a) * dist;
          const sp = 0.15 + rng() * 0.3;
          eng.vx[i] = Math.cos(a) * sp;
          eng.vy[i] = Math.sin(a) * sp;
          eng.rs[i] = eng.cr[i];
          eng.as[i] = eng.ca[i];
          eng.tb0[i] = now + rng() * BREAK_STAGGER;
          eng.tb1[i] = eng.tb0[i] + BREAK_MS * (0.8 + rng() * 0.4);
        } else {
          eng.wx[i] = eng.px[i];
          eng.wy[i] = eng.py[i];
          eng.rs[i] = eng.fr[i];
          eng.as[i] = eng.fa[i];
          eng.tb0[i] = now;
          eng.tb1[i] = now;
        }

        eng.tx[i] = eng.gx[j];
        eng.ty[i] = eng.gy[j];
        eng.rt[i] = glyphR(eng, i, em);
        eng.at[i] = glyphA(eng, i, em);
        // build-up order: mostly along the glyph's own path, part random
        const ord = 0.62 * (j / K) + 0.38 * rng();
        eng.tg0[i] = gatherBase + ord * GATHER_SPREAD;
        eng.tg1[i] = eng.tg0[i] + GATHER_MS * (0.85 + rng() * 0.3);
        eng.mode[i] = 1;
      }
    };

    const snapTo = (eng: Engine, symbol: number) => {
      eng.symbol = symbol;
      eng.next = symbol;
      const cap = Math.floor(eng.n * (1 - MIN_FREE));
      const K = buildGlyph(GLYPHS[symbol], eng.w, eng.h, cap, {
        x: eng.gx, y: eng.gy, em: eng.gEm,
      });
      eng.k = K;
      for (let i = 0; i < eng.n; i++) {
        eng.slot[i] = i < K ? i : -1;
        if (i < K) {
          const em = eng.gEm[i] === 1;
          eng.mode[i] = 2;
          eng.px[i] = eng.gx[i];
          eng.py[i] = eng.gy[i];
          eng.tx[i] = eng.gx[i];
          eng.ty[i] = eng.gy[i];
          eng.rt[i] = glyphR(eng, i, em);
          eng.at[i] = glyphA(eng, i, em);
          eng.cr[i] = eng.rt[i];
          eng.ca[i] = eng.at[i];
        } else {
          eng.mode[i] = 0;
          eng.vx[i] = 0;
          eng.vy[i] = 0;
          eng.cr[i] = eng.fr[i];
          eng.ca[i] = eng.fa[i];
        }
      }
    };

    // A resize moves the glyph, it does not re-animate it: the same atoms keep
    // their targets, re-fitted to the new box. Restarting the gather here is
    // what made the shape never settle while the step rail changed height.
    const refit = (eng: Engine, now: number) => {
      if (eng.k <= 0) {
        retarget(eng, eng.next, now, false);
        return;
      }
      buildGlyph(
        GLYPHS[eng.next],
        eng.w,
        eng.h,
        Math.floor(eng.n * (1 - MIN_FREE)),
        { x: eng.gx, y: eng.gy, em: eng.gEm },
        eng.k,
      );
      for (let i = 0; i < eng.n; i++) {
        const j = eng.slot[i];
        if (j < 0) continue;
        eng.tx[i] = eng.gx[j];
        eng.ty[i] = eng.gy[j];
        if (eng.mode[i] === 2) {
          eng.px[i] = eng.tx[i];
          eng.py[i] = eng.ty[i];
        }
      }
    };

    /* ----- (re)build: init and resize ----- */
    const build = (prev: Engine | null, w: number, h: number, now: number): Engine => {
      const n = particleCount(w, h);
      if (prev && prev.n === n) {
        prev.w = w;
        prev.h = h;
        prev.needsRebuild = false;
        if (reduced) snapTo(prev, prev.next);
        else refit(prev, now);
        return prev;
      }

      const rng = mulberry32(7601);
      const eng: Engine = {
        n, w, h,
        symbol: activeRef.current,
        next: activeRef.current,
        seed: 11,
        needsRebuild: false,
        k: 0,
        ...alloc(n),
      };

      for (let i = 0; i < n; i++) {
        const a = rng() * TAU;
        const rr = Math.sqrt(rng()) * Math.min(w, h) * 0.46;
        eng.px[i] = w * 0.5 + Math.cos(a) * rr;
        eng.py[i] = h * 0.48 + Math.sin(a) * rr;
        eng.vx[i] = (rng() - 0.5) * 0.3;
        eng.vy[i] = (rng() - 0.5) * 0.3;
        eng.baseR[i] = 1.2 + rng() * 0.95;
        eng.baseA[i] = 0.74 + rng() * 0.26;
        eng.fr[i] = 0.65 + rng() * 0.8;
        eng.fa[i] = 0.18 + rng() * 0.3;
        eng.cr[i] = eng.fr[i];
        eng.ca[i] = eng.fa[i];
        eng.ph1[i] = rng() * TAU;
        eng.ph2[i] = rng() * TAU;
        eng.wf1[i] = 0.55 + rng() * 0.95;
        eng.wf2[i] = 0.55 + rng() * 0.95;
        eng.amp[i] = 0.7 + rng() * 1.1;
        eng.tw[i] = 0.4 + rng() * 1.1;
        eng.tph[i] = rng() * TAU;
        eng.tint[i] = rng() < 0.14 ? 1 : 0;
        eng.mode[i] = 0;
      }

      if (reduced) snapTo(eng, eng.symbol);
      else retarget(eng, eng.symbol, now, false);
      return eng;
    };

    /* ----- canvas sizing (house pattern) ----- */
    // Only a real size change may rebuild. ResizeObserver also fires on observe
    // and on no-op notifications, and the left column grows and shrinks by a few
    // px every time a step's description opens or closes — rebuilding on those
    // restarts the gather mid-flight, so the glyph never finishes forming.
    const resize = () => {
      const rect = rectOf();
      const cw = Math.max(1, Math.round(rect.width * dpr));
      const ch = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width === cw && canvas.height === ch) return;
      canvas.width = cw;
      canvas.height = ch;
      const eng = engRef.current;
      if (eng) eng.needsRebuild = true;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      pointer.x = e.offsetX;
      pointer.y = e.offsetY;
      pointer.on = true;
    };
    const onLeave = () => { pointer.on = false; };
    if (!reduced) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }

    // Tab switch: the standing glyph breaks apart and the same atoms build the
    // next one, so the four steps read as one continuous field.
    morphRef.current = (next: number) => {
      const eng = engRef.current;
      if (!eng || eng.next === next) return;
      eng.next = next;
      if (reduced) snapTo(eng, next);
      else retarget(eng, next, performance.now(), true);
    };

    /* ----- frame loop ----- */
    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      let eng = engRef.current;
      if (!eng || eng.needsRebuild) {
        const rect = rectOf();
        eng = build(eng, rect.width, rect.height, now);
        engRef.current = eng;
      }
      // Off-screen (and the display:none mobile twin) costs nothing: the field
      // freezes and resumes where it left off, or lands settled if a tab
      // rotated past while it was away.
      if (!eng || eng.w < 2 || eng.h < 2 || !visible) return;

      const w = eng.w;
      const h = eng.h;
      const ccx = w * 0.5;
      const ccy = h * 0.48;
      const rxs = w * 0.54;
      const rys = h * 0.56;
      const tS = now / 1000;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      buckets.fill(null);

      for (let i = 0; i < eng.n; i++) {
        const m = eng.mode[i];
        let tr: number;
        let ta: number;
        let wob = 1;

        if (m === 2) {
          eng.px[i] = eng.tx[i];
          eng.py[i] = eng.ty[i];
          tr = eng.rt[i];
          ta = eng.at[i];
        } else if (m === 1) {
          if (now < eng.tg0[i]) {
            // the waypoint itself keeps drifting, so the loose cloud is alive
            eng.wx[i] += eng.vx[i];
            eng.wy[i] += eng.vy[i];
            eng.vx[i] *= DRIFT_DAMP;
            eng.vy[i] *= DRIFT_DAMP;
          }
          if (eng.hasBreak[i] === 1 && now < eng.tb1[i]) {
            const span = Math.max(1, eng.tb1[i] - eng.tb0[i]);
            const p = now <= eng.tb0[i] ? 0 : easeBurst((now - eng.tb0[i]) / span);
            eng.px[i] = eng.sx[i] + (eng.wx[i] - eng.sx[i]) * p;
            eng.py[i] = eng.sy[i] + (eng.wy[i] - eng.sy[i]) * p;
            tr = eng.rs[i] + (eng.fr[i] - eng.rs[i]) * p;
            ta = eng.as[i] + (eng.fa[i] - eng.as[i]) * p;
            wob = 1.5;
          } else if (now < eng.tg0[i]) {
            eng.px[i] = eng.wx[i];
            eng.py[i] = eng.wy[i];
            tr = eng.fr[i];
            ta = eng.fa[i];
            wob = 1.6;
          } else if (now < eng.tg1[i]) {
            const span = Math.max(1, eng.tg1[i] - eng.tg0[i]);
            const p = easeSettle((now - eng.tg0[i]) / span);
            eng.px[i] = eng.wx[i] + (eng.tx[i] - eng.wx[i]) * p;
            eng.py[i] = eng.wy[i] + (eng.ty[i] - eng.wy[i]) * p;
            tr = eng.fr[i] + (eng.rt[i] - eng.fr[i]) * p;
            ta = eng.fa[i] + (eng.at[i] - eng.fa[i]) * p;
            wob = 1.6 - 0.6 * p;
          } else {
            eng.mode[i] = 2;
            eng.px[i] = eng.tx[i];
            eng.py[i] = eng.ty[i];
            tr = eng.rt[i];
            ta = eng.at[i];
          }
        } else {
          // free atom: slow curl around the frame, random wander, soft bounds
          const dx = eng.px[i] - ccx;
          const dy = eng.py[i] - ccy;
          eng.vx[i] += -dy * CURL + (Math.random() - 0.5) * WANDER;
          eng.vy[i] += dx * CURL + (Math.random() - 0.5) * WANDER;
          const rx = dx / rxs;
          const ry = dy / rys;
          const d = Math.hypot(rx, ry);
          if (d > 1) {
            const f = (d - 1) * 0.05;
            eng.vx[i] -= rx * f;
            eng.vy[i] -= ry * f;
          }
          eng.vx[i] *= DRIFT_DAMP;
          eng.vy[i] *= DRIFT_DAMP;
          const sp = Math.hypot(eng.vx[i], eng.vy[i]);
          if (sp > MAX_SPEED) {
            eng.vx[i] *= MAX_SPEED / sp;
            eng.vy[i] *= MAX_SPEED / sp;
          }
          eng.px[i] += eng.vx[i];
          eng.py[i] += eng.vy[i];
          tr = eng.fr[i];
          ta = eng.fa[i];
          wob = 1.15;
        }

        let fx = eng.px[i];
        let fy = eng.py[i];

        if (!reduced) {
          // nothing ever sits perfectly still, formed or not
          const a1 = eng.amp[i] * wob;
          fx += Math.sin(tS * OMEGA * eng.wf1[i] + eng.ph1[i]) * a1;
          fy += Math.cos(tS * OMEGA * eng.wf2[i] + eng.ph2[i]) * a1;

          let tox = 0;
          let toy = 0;
          if (pointer.on) {
            const dx = fx - pointer.x;
            const dy = fy - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < CURSOR_R2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / CURSOR_R) ** 2 * MAX_PUSH;
              tox = (dx / d) * f;
              toy = (dy / d) * f;
            }
          }
          eng.ovx[i] = (eng.ovx[i] + (tox - eng.ox[i]) * SPRING_K) * SPRING_DAMP;
          eng.ovy[i] = (eng.ovy[i] + (toy - eng.oy[i]) * SPRING_K) * SPRING_DAMP;
          eng.ox[i] += eng.ovx[i];
          eng.oy[i] += eng.ovy[i];
          fx += eng.ox[i];
          fy += eng.oy[i];
          ta *= 0.9 + 0.1 * Math.sin(tS * eng.tw[i] + eng.tph[i]);
        }

        eng.cr[i] = tr;
        eng.ca[i] = ta;

        if (tr > 0.05 && ta > 0.02) {
          const step = Math.min(ALPHA_STEPS - 1, (ta * ALPHA_STEPS) | 0);
          const slot = eng.tint[i] * ALPHA_STEPS + step;
          let path = buckets[slot];
          if (!path) {
            path = new Path2D();
            buckets[slot] = path;
          }
          path.moveTo(fx + tr, fy);
          path.arc(fx, fy, tr, 0, TAU);
        }
      }

      for (let t = 0; t < TINTS.length; t++) {
        ctx.fillStyle = TINTS[t];
        for (let s = 0; s < ALPHA_STEPS; s++) {
          const path = buckets[t * ALPHA_STEPS + s];
          if (!path) continue;
          ctx.globalAlpha = (s + 0.5) / ALPHA_STEPS;
          ctx.fill(path);
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      morphRef.current = null;
      engRef.current = null;
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 block h-full w-full ${className}`}
    />
  );
}
