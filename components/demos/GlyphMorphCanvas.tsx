"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

// GlyphMorphCanvas — dot-particle field for the Meet Akashic "The platform"
// block. ~500 soft white dots scatter and re-form into one glyph per tab
// (confluence / forecast / answer bubble), SYNCED to the UCSignals tab
// rotation via the `active` prop (user direction 20 Jul 2026 — replaces the
// unsynced wireframe SignalsCanvas). Antigravity-style: eased tweens with
// per-dot stagger, ambient breathing, gentle cursor repulsion.

/* ---------- easing: exact cubic-bezier(0.2,0.8,0.2,1) = ease-settle token ---------- */

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
  { kind: "cubic", pts: [54, 50, 64, 44, 74, 30, 84, 18], density: 0.38 },
  { kind: "star4", c: [87, 15], r: 6.5, emphasis: true },
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
  { kind: "line", pts: [[38, 48], [46, 57], [63, 36]], density: 2, emphasis: true },
];

// Order = the pipeline the section narrates top-to-bottom: the question drops
// in and flows through ingest → store → explore → govern, with the grounded
// answer at the end (user direction 20 Jul 2026). Index-matched to UCSignals'
// TABS — reorder both together or the canvas desyncs.
const GLYPHS: Prim[][] = [UNIFY, PREDICT, ASK, GOVERN];

/* ---------- flatten + sample: exactly n evenly spaced points per glyph ---------- */

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

function weightedLength(prims: Prim[]): number {
  let w = 0;
  for (const ch of prims.flatMap(flattenPrim)) {
    for (let i = 0; i < ch.xs.length - 1; i++) {
      w += Math.hypot(ch.xs[i + 1] - ch.xs[i], ch.ys[i + 1] - ch.ys[i]) * ch.density;
    }
  }
  return w;
}

// densityScale equalizes dot pitch across glyphs (see W_REF at init)
function sampleGlyph(
  prims: Prim[],
  densityScale: number,
  n: number,
  out: { x: Float32Array; y: Float32Array; em: Uint8Array },
) {
  const chains = prims.flatMap(flattenPrim);
  const segs: { x0: number; y0: number; x1: number; y1: number; wl: number; em: boolean }[] = [];
  let W = 0;
  for (const ch of chains) {
    const d = ch.density * densityScale;
    for (let i = 0; i < ch.xs.length - 1; i++) {
      const len = Math.hypot(ch.xs[i + 1] - ch.xs[i], ch.ys[i + 1] - ch.ys[i]);
      if (len < 1e-4) continue;
      segs.push({ x0: ch.xs[i], y0: ch.ys[i], x1: ch.xs[i + 1], y1: ch.ys[i + 1], wl: len * d, em: ch.emphasis });
      W += len * d;
    }
  }
  const wStep = W / n;
  let next = wStep * 0.5;
  let acc = 0;
  let k = 0;
  let lx = 50;
  let ly = 50;
  for (const s of segs) {
    while (acc + s.wl >= next && k < n) {
      const t = (next - acc) / s.wl;
      lx = s.x0 + (s.x1 - s.x0) * t;
      ly = s.y0 + (s.y1 - s.y0) * t;
      out.x[k] = lx;
      out.y[k] = ly;
      out.em[k] = s.em ? 1 : 0;
      k++;
      next += wStep;
    }
    acc += s.wl;
    if (k >= n) break;
  }
  while (k < n) {
    out.x[k] = lx;
    out.y[k] = ly;
    out.em[k] = 0;
    k++;
  }
}

/* ---------- tunables ---------- */

const OMEGA = (Math.PI * 2) / 5.5; // breathing period ~5.5s
const CURSOR_R = 90;
const CURSOR_R2 = CURSOR_R * CURSOR_R;
const MAX_PUSH = 16;
const SPRING_K = 0.08;
const SPRING_DAMP = 0.86;

type Phase = "formed" | "gather";

interface Engine {
  n: number;
  w: number;
  h: number;
  phase: Phase;
  phaseStart: number;
  phaseEnd: number;
  symbol: number; // glyph the field is in / gathering into
  next: number; // glyph requested by the latest tab switch
  seed: number;
  needsRebuild: boolean;
  sx: Float32Array; sy: Float32Array; // tween start
  tx: Float32Array; ty: Float32Array; // tween target
  cx: Float32Array; cy: Float32Array; // current rendered pos (interruption capture)
  delay: Float32Array; dur: Float32Array;
  br: Float32Array; ba: Float32Array; // base radius / alpha (seeded)
  rs: Float32Array; rt: Float32Array; // radius tween start / target
  as: Float32Array; at: Float32Array; // alpha tween start / target
  cr: Float32Array; ca: Float32Array; // current rendered radius / alpha
  ph1: Float32Array; ph2: Float32Array; // breathing phases
  ox: Float32Array; oy: Float32Array; // cursor offset
  ovx: Float32Array; ovy: Float32Array;
  map: Uint32Array;
  gx: Float32Array; gy: Float32Array; gEm: Uint8Array; // active glyph targets (canvas px)
}

function alloc(n: number) {
  return {
    sx: new Float32Array(n), sy: new Float32Array(n),
    tx: new Float32Array(n), ty: new Float32Array(n),
    cx: new Float32Array(n), cy: new Float32Array(n),
    delay: new Float32Array(n), dur: new Float32Array(n),
    br: new Float32Array(n), ba: new Float32Array(n),
    rs: new Float32Array(n), rt: new Float32Array(n),
    as: new Float32Array(n), at: new Float32Array(n),
    cr: new Float32Array(n), ca: new Float32Array(n),
    ph1: new Float32Array(n), ph2: new Float32Array(n),
    ox: new Float32Array(n), oy: new Float32Array(n),
    ovx: new Float32Array(n), ovy: new Float32Array(n),
    map: new Uint32Array(n),
    gx: new Float32Array(n), gy: new Float32Array(n), gEm: new Uint8Array(n),
  };
}

function particleCount(w: number, h: number) {
  return Math.max(480, Math.min(1000, Math.round(Math.min(w, h) * 1.4)));
}

function makeSprite() {
  const s = document.createElement("canvas");
  s.width = 32;
  s.height = 32;
  const c = s.getContext("2d");
  if (!c) return s;
  const g = c.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, "rgba(250,250,251,1)");
  g.addColorStop(0.55, "rgba(250,250,251,0.9)");
  g.addColorStop(1, "rgba(250,250,251,0)");
  c.fillStyle = g;
  c.fillRect(0, 0, 32, 32);
  return s;
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
  const scatterRef = useRef<((next: number) => void) | null>(null);
  const reduced = usePrefersReducedMotion();
  const activeRef = useRef(active);

  // tab switch → scatter & re-form (or instant snap under reduced motion)
  useEffect(() => {
    activeRef.current = active;
    scatterRef.current?.(active);
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sprite = makeSprite();
    const densityScale = GLYPHS.map((g) => weightedLength(g));
    const wRef = Math.max(...densityScale);
    const scales = densityScale.map((w) => wRef / w);
    const pointer = { x: 0, y: 0, on: false };
    let visible = true;

    const rectOf = () => canvas.getBoundingClientRect();

    /* ----- glyph targets: sample in 100-space, bbox-fit to canvas ----- */
    const computeTargets = (eng: Engine, symbol: number) => {
      const tmp = {
        x: new Float32Array(eng.n),
        y: new Float32Array(eng.n),
        em: new Uint8Array(eng.n),
      };
      sampleGlyph(GLYPHS[symbol], scales[symbol], eng.n, tmp);
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (let i = 0; i < eng.n; i++) {
        if (tmp.x[i] < minX) minX = tmp.x[i];
        if (tmp.x[i] > maxX) maxX = tmp.x[i];
        if (tmp.y[i] < minY) minY = tmp.y[i];
        if (tmp.y[i] > maxY) maxY = tmp.y[i];
      }
      const fit = Math.min(eng.w, eng.h) * 0.72;
      const scale = fit / Math.max(maxX - minX, maxY - minY);
      const ccx = eng.w * 0.5;
      const ccy = eng.h * 0.47;
      const ox = ccx - ((minX + maxX) / 2) * scale;
      const oy = ccy - ((minY + maxY) / 2) * scale;
      for (let i = 0; i < eng.n; i++) {
        eng.gx[i] = tmp.x[i] * scale + ox;
        eng.gy[i] = tmp.y[i] * scale + oy;
        eng.gEm[i] = tmp.em[i];
      }
    };

    /* ----- phase transitions ----- */
    const settle = (eng: Engine) => {
      eng.sx.set(eng.tx);
      eng.sy.set(eng.ty);
      eng.rs.set(eng.rt);
      eng.as.set(eng.at);
    };

    const startGather = (eng: Engine, now: number, delayMax = 350, durBase = 1250, durVar = 150) => {
      eng.symbol = eng.next;
      computeTargets(eng, eng.symbol);
      const rng = mulberry32(eng.seed++);
      for (let i = 0; i < eng.n; i++) eng.map[i] = i;
      for (let i = eng.n - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        const t = eng.map[i];
        eng.map[i] = eng.map[j];
        eng.map[j] = t;
      }
      for (let i = 0; i < eng.n; i++) {
        const j = eng.map[i];
        const em = eng.gEm[j] === 1;
        eng.sx[i] = eng.cx[i];
        eng.sy[i] = eng.cy[i];
        eng.tx[i] = eng.gx[j];
        eng.ty[i] = eng.gy[j];
        eng.as[i] = eng.ca[i];
        eng.at[i] = Math.min(0.98, eng.ba[i] * (em ? 1.25 : 1));
        eng.rs[i] = eng.cr[i];
        eng.rt[i] = eng.br[i] * (em ? 1.5 : 1);
        eng.delay[i] = rng() * delayMax;
        eng.dur[i] = durBase + rng() * durVar;
      }
      eng.phase = "gather";
      eng.phaseStart = now;
      eng.phaseEnd = now + delayMax + durBase + durVar;
    };

    const snapTo = (eng: Engine, symbol: number) => {
      eng.symbol = symbol;
      eng.next = symbol;
      computeTargets(eng, symbol);
      for (let i = 0; i < eng.n; i++) {
        const em = eng.gEm[i] === 1;
        eng.tx[i] = eng.gx[i];
        eng.ty[i] = eng.gy[i];
        eng.rt[i] = eng.br[i] * (em ? 1.5 : 1);
        eng.at[i] = Math.min(0.98, eng.ba[i] * (em ? 1.25 : 1));
      }
      settle(eng);
      eng.cx.set(eng.tx);
      eng.cy.set(eng.ty);
      eng.cr.set(eng.rt);
      eng.ca.set(eng.at);
      eng.phase = "formed";
      eng.phaseEnd = 0;
    };

    /* ----- (re)build: init and resize ----- */
    const build = (eng: Engine | null, w: number, h: number, now: number): Engine => {
      const n = particleCount(w, h);
      const rng = mulberry32(7601);
      if (!eng || eng.n !== n) {
        const fresh: Engine = {
          n, w, h,
          phase: "formed", phaseStart: 0, phaseEnd: 0,
          symbol: activeRef.current, next: activeRef.current,
          seed: 11, needsRebuild: false,
          ...alloc(n),
        };
        const ccx = w * 0.5;
        const ccy = h * 0.47;
        const R = Math.min(w, h) * 0.42;
        for (let i = 0; i < n; i++) {
          const a = rng() * Math.PI * 2;
          const rr = Math.sqrt(rng()) * R;
          fresh.cx[i] = ccx + Math.cos(a) * rr;
          fresh.cy[i] = ccy + Math.sin(a) * rr;
          fresh.br[i] = 1.15 + rng() * 1.05;
          fresh.ba[i] = 0.42 + rng() * 0.5;
          fresh.ph1[i] = rng() * Math.PI * 2;
          fresh.ph2[i] = rng() * Math.PI * 2;
          fresh.cr[i] = fresh.br[i] * 0.8;
          fresh.ca[i] = fresh.ba[i] * 0.45;
        }
        if (reduced) snapTo(fresh, fresh.symbol);
        else startGather(fresh, now, 500, 1400, 200); // entrance: form from the field
        return fresh;
      }
      eng.w = w;
      eng.h = h;
      eng.needsRebuild = false;
      if (reduced) {
        snapTo(eng, eng.next);
      } else {
        computeTargets(eng, eng.next);
        const r2 = mulberry32(eng.seed++);
        for (let i = 0; i < eng.n; i++) {
          eng.sx[i] = eng.cx[i];
          eng.sy[i] = eng.cy[i];
          eng.tx[i] = eng.gx[i];
          eng.ty[i] = eng.gy[i];
          eng.as[i] = eng.ca[i];
          eng.at[i] = Math.min(0.98, eng.ba[i] * (eng.gEm[i] === 1 ? 1.25 : 1));
          eng.rs[i] = eng.cr[i];
          eng.rt[i] = eng.br[i] * (eng.gEm[i] === 1 ? 1.5 : 1);
          eng.delay[i] = r2() * 120;
          eng.dur[i] = 750;
        }
        eng.symbol = eng.next;
        eng.phase = "gather";
        eng.phaseStart = now;
        eng.phaseEnd = now + 870;
      }
      return eng;
    };

    /* ----- canvas sizing (house pattern) ----- */
    const resize = () => {
      const rect = rectOf();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
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

    scatterRef.current = (next: number) => {
      const eng = engRef.current;
      if (!eng || eng.next === next) return;
      eng.next = next;
      if (reduced) {
        snapTo(eng, next);
        return;
      }
      // Direct, staggered flow from wherever the dots are right now straight
      // into the next glyph — no scatter-burst in between, so the shape morphs
      // smoothly instead of flashing apart (user direction 20 Jul 2026).
      startGather(eng, performance.now(), 620, 1650, 380);
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
      if (!eng) return;

      if (eng.phase === "gather" && now >= eng.phaseEnd) {
        settle(eng);
        eng.phase = "formed";
      }

      const w = eng.w;
      const h = eng.h;
      const tS = now / 1000;
      const inTween = eng.phase === "gather";
      // Ambient drift never stops — the field keeps breathing even once a glyph
      // is formed, and lifts a little while it flows into the next shape.
      const amp = eng.phase === "gather" ? 1.35 : 0.95;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (visible) ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < eng.n; i++) {
        let prog = 1;
        if (inTween) {
          const local = now - eng.phaseStart - eng.delay[i];
          prog = local <= 0 ? 0 : local >= eng.dur[i] ? 1 : easeSettle(local / eng.dur[i]);
        }
        const bx = eng.sx[i] + (eng.tx[i] - eng.sx[i]) * prog;
        const by = eng.sy[i] + (eng.ty[i] - eng.sy[i]) * prog;
        const r = eng.rs[i] + (eng.rt[i] - eng.rs[i]) * prog;
        const a = eng.as[i] + (eng.at[i] - eng.as[i]) * prog;

        let bxx = 0;
        let byy = 0;
        if (!reduced) {
          bxx = Math.sin(tS * OMEGA + eng.ph1[i]) * amp;
          byy = Math.cos(tS * OMEGA * 0.9 + eng.ph2[i]) * amp;

          let tox = 0;
          let toy = 0;
          if (pointer.on) {
            const dx = bx + bxx - pointer.x;
            const dy = by + byy - pointer.y;
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
        }

        const fx = bx + bxx + eng.ox[i];
        const fy = by + byy + eng.oy[i];
        eng.cx[i] = fx;
        eng.cy[i] = fy;
        eng.cr[i] = r;
        eng.ca[i] = a;

        if (visible) {
          ctx.globalAlpha = a;
          ctx.drawImage(sprite, fx - r, fy - r, r * 2, r * 2);
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
      scatterRef.current = null;
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
