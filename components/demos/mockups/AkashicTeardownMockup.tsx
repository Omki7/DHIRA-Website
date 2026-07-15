"use client";

/*
 * SIMULATED PRODUCT UI — Akashic modular teardown (AGENTS.md §8a).
 * The /akashic [02] "Introducing Akashic" stage: a machined product unit
 * (faceplate wordmark, edge status LEDs, blue seam accents) opens into
 * six plates (pipelines → BI) over an always-on governance frame, then
 * reseals for the "start anywhere" close where individual plates pull
 * out like drawers to show any subset works on its own. Driven entirely
 * by native scroll; AkashicModular owns the tall track + curtain, this
 * component reads track position per frame, smooths it, and writes
 * transforms/opacities imperatively (no per-frame React renders).
 * Demo data stays in the site's canned world: customer 9042 / Meridian
 * Retail / demand-forecast v3, source-dot colours from AkashicModules.
 * Inline styles here are computed 3D geometry — the Rule 8 mockup
 * exception, same as HeroProductsMockup / AkashicModuleScreensMockup.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import AkashicLogo from "@/components/icons/AkashicLogo";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";

/* intro + 7 modules + modular pick + close, in vh of scroll each */
export const TEARDOWN_SEGS_VH = [60, 90, 90, 90, 90, 90, 90, 90, 120, 200];
export const TEARDOWN_TRACK_VH = TEARDOWN_SEGS_VH.reduce((a, b) => a + b, 0);

const ACC = "#3E63DD";
const ACC_RGB = "62,99,221";
const INK_RGB = "26,28,29";

const W = 560;
const H = 400;
const TH = 16; // plate thickness
const SEAL = 3; // sealed gap between plates
const OPEN = 88; // exploded gap between plates

const HUD_NAMES = ["PIPELINES", "MASTER DATA", "WAREHOUSE", "ML", "ASK", "BI", "GOVERNANCE"];

const MODULES = [
  {
    kicker: "Ingestion",
    name: "Akashic Pipelines",
    lede: "Every source, ingested and validated.",
    body: "Structured or unstructured: CRMs, ERPs, PDFs, spreadsheets, live feeds. Validated the moment it arrives, so nothing downstream inherits a problem. This is where the complete record starts.",
  },
  {
    kicker: "Entity resolution",
    name: "Akashic Master Data",
    lede: "One golden record. No duplicates.",
    body: "Every version of a customer, vendor, or location collapses into one golden record: the version the whole platform treats as real. Master data management that settles which record wins on its own, and where the knowledge graph starts, linking each record to the ones it belongs with.",
  },
  {
    kicker: "Modelled storage",
    name: "Akashic Warehouse",
    lede: "Structured, modelled, ready to query.",
    body: "Mastered records become dimensional models built for fast, reliable queries. A metric is defined once here and stored once: this is the governed metric layer, and it is why “revenue” means the same thing to a dashboard, a model, and a question.",
  },
  {
    kicker: "Prediction",
    name: "Akashic ML",
    lede: "Predictive intelligence on trusted data.",
    body: "Train, deploy, and monitor models directly on governed data. No exports, no separate environment, no copies to reconcile. MLOps where the data already lives.",
  },
  {
    kicker: "Natural language",
    name: "Ask Akashic",
    lede: "Plain-language answers, grounded.",
    body: "Ask in plain language and get an answer sourced from your governed metric layer and knowledge graph, not a guess. You’ve just seen everything underneath it. That’s why it works.",
  },
  {
    kicker: "Decision surface",
    name: "Akashic BI",
    lede: "Dashboards and metrics, defined once.",
    body: "Every metric means the same thing every time it’s used. For a team that needs answers now, not a BI project that takes a quarter to stand up.",
  },
  {
    kicker: "Always on",
    name: "Akashic Governance",
    lede: "It’s been running the whole time.",
    body: "Access control, lineage, and audit trails have been active since the first module you deployed, underneath everything you just watched. Governance isn’t added later. It’s the frame the platform is built in.",
  },
];

const PLATE_TAGS = [
  "A-01 · Pipelines · ingest / validate",
  "A-02 · Master data · entity resolution",
  "A-03 · Warehouse · modelled storage",
  "A-04 · ML · train / deploy / monitor",
  "A-05 · Ask · natural language",
  "A-06 · BI · decision surface",
];

const ASK_Q = "What’s customer 9042’s forecasted demand next quarter?";

/* source chips share AkashicModules' dot colours */
const PIPE_SOURCES = [
  { label: "CRM", dot: "#00A1E0", style: { left: 14, top: 92 } },
  { label: "ERP", dot: "#1F2A44", style: { left: 14, top: 272 } },
  { label: "PDF", dot: "#E8491D", style: { right: 14, top: 122 } },
  { label: "STREAM", dot: "#3E63DD", style: { right: 14, top: 282 } },
  { label: "CSV", dot: "#30A46C", style: { left: 122, top: 8 } },
  { label: "DOCS", dot: "#C0883A", style: { left: 356, top: 370 } },
];

const PIPE_STREAMS = [
  { p: [0, 110], q: [188, 186] },
  { p: [0, 290], q: [188, 214] },
  { p: [560, 140], q: [372, 190] },
  { p: [560, 300], q: [372, 214] },
  { p: [150, 0], q: [262, 175] },
  { p: [390, 400], q: [300, 225] },
];

const FRAG_SCATTER = [
  [64, 56], [420, 44], [96, 296], [372, 316], [42, 178], [470, 200],
  [206, 34], [300, 338], [478, 96], [148, 338], [330, 26], [30, 260],
];
const FRAG_ROTS = [-12, 9, -7, 14, -10, 6, 11, -13, 8, -6, 12, -9];
const FRAG_GRID: number[][] = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) FRAG_GRID.push([145 + c * 68, 140 + r * 44]);

/* "start anywhere" drawer combos for the close chapter: [plate, pull direction] */
const COMBOS: { set: [number, number][]; label: string }[] = [
  { set: [[0, 1]], label: "RUN PIPELINES ON ITS OWN" },
  { set: [[1, 1], [4, -1]], label: "OR MASTER DATA + ASK AKASHIC" },
  { set: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]], label: "OR THE WHOLE PLATFORM" },
];

/* ---------------------------------------------------------------- */
/*  Static helpers                                                   */
/* ---------------------------------------------------------------- */

const ss = (x: number, a: number, b: number) => {
  const u = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return u * u * (3 - 2 * u);
};
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)" };
const inkA = (a: number) => `rgba(${INK_RGB},${a})`;
const accA = (a: number) => `rgba(${ACC_RGB},${a})`;

/* ---------------------------------------------------------------- */
/*  Plate shell                                                      */
/* ---------------------------------------------------------------- */

function PlateShell({ i, extra, children }: { i: number; extra?: React.ReactNode; children: React.ReactNode }) {
  const side = (key: string, st: React.CSSProperties, child?: React.ReactNode) => (
    <div key={key} data-ak-side={i} style={{ position: "absolute", transformOrigin: "0 0", ...st }}>
      {child}
    </div>
  );
  return (
    <div
      data-ak={`plate-${i}`}
      style={{ position: "absolute", left: -W / 2, top: -H / 2, width: W, height: H, transformStyle: "preserve-3d", transform: `translateZ(${i * (TH + SEAL)}px)` }}
    >
      <div
        data-ak={`shadow-${i}`}
        style={{ position: "absolute", inset: -6, borderRadius: 20, background: `radial-gradient(closest-side, ${inkA(0.28)}, ${inkA(0)} 76%)`, transform: "translateZ(-9px)", opacity: 0 }}
      />
      {side("n", { left: 0, top: 0, width: W, height: TH, transform: `translateZ(${TH}px) rotateX(-90deg)`, background: "#D7DAE0" })}
      {side(
        "s",
        { left: 0, top: H, width: W, height: TH, transform: `translateZ(${TH}px) rotateX(-90deg)`, background: "linear-gradient(180deg,#D2D5DC,#C1C5CD)" },
        <span
          data-ak-led={i}
          style={{ position: "absolute", left: W / 2 - 9, top: 6.5, width: 18, height: 3, borderRadius: 2, background: ACC, boxShadow: `0 0 7px ${accA(0.85)}`, opacity: 0.3 }}
        />,
      )}
      {side("w", { left: 0, top: 0, width: TH, height: H, transform: `translateZ(${TH}px) rotateY(90deg)`, background: "#CDD1D8" })}
      {side("e", { left: W, top: 0, width: TH, height: H, transform: `translateZ(${TH}px) rotateY(90deg)`, background: "#C7CBD3" })}
      <div
        data-ak={`top-${i}`}
        style={{ position: "absolute", inset: 0, borderRadius: 14, transform: `translateZ(${TH}px)`, border: `1px solid ${inkA(0.36)}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)", overflow: "hidden" }}
      >
        <div data-ak={`surf-${i}`} style={{ position: "absolute", inset: 0, borderRadius: 13, background: "linear-gradient(165deg,#FDFDFE,#EEF0F3)" }} />
        <div
          data-ak={`ghost-${i}`}
          style={{
            position: "absolute", inset: 0, opacity: 0,
            backgroundImage: `repeating-linear-gradient(0deg, ${inkA(0.06)} 0px, ${inkA(0.06)} 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, ${inkA(0.06)} 0px, ${inkA(0.06)} 1px, transparent 1px, transparent 24px)`,
          }}
        />
        <div style={{ position: "absolute", inset: 12, border: `1px solid ${inkA(0.1)}`, borderRadius: 8 }} />
        {[[9, 9], [536, 9], [9, 376], [536, 376]].map((p) => (
          <div
            key={`${p[0]}-${p[1]}`}
            style={{ position: "absolute", left: p[0], top: p[1], width: 6, height: 6, borderRadius: "50%", border: `1px solid ${inkA(0.28)}`, background: "radial-gradient(circle at 35% 35%, #FFFFFF, #DFE2E7)" }}
          />
        ))}
        {extra}
        <div data-ak={`sch-${i}`} style={{ position: "absolute", inset: 0, opacity: 0 }}>
          {children}
        </div>
      </div>
      <div
        data-ak={`tag-${i}`}
        style={{ position: "absolute", left: 2, top: H + 10, transform: `translateZ(${TH}px)`, ...mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: inkA(0.5), opacity: 0 }}
      >
        {PLATE_TAGS[i]}
      </div>
    </div>
  );
}

/* small chip used on plate faces */
function FaceChip({ label, dot, style }: { label: string; dot?: string; style: React.CSSProperties }) {
  return (
    <div
      style={{ position: "absolute", display: "flex", alignItems: "center", gap: 5, height: 20, padding: "0 8px", borderRadius: 999, border: "1px solid #EEEFF1", background: "rgba(255,255,255,0.92)", boxShadow: `0 2px 6px ${inkA(0.05)}`, ...style }}
    >
      {dot && <span style={{ display: "block", width: 5, height: 5, borderRadius: "50%", background: dot }} />}
      <span style={{ ...mono, fontSize: 8.5, letterSpacing: "0.1em", color: inkA(0.62) }}>{label}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Component                                                        */
/* ---------------------------------------------------------------- */

type Props = {
  trackRef: React.RefObject<HTMLDivElement | null>;
  curtainHeight: number;
};

export default function AkashicTeardownMockup({ trackRef, curtainHeight }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef(curtainHeight);
  const boundsRef = useRef<number[]>([0]);
  const geomRef = useRef({ trackTop: 0, trackH: 1, vh: 800 });
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);

  useEffect(() => {
    curtainRef.current = curtainHeight;
    geomRef.current.trackH = 1; // force remeasure on next frame
  }, [curtainHeight]);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* -------- collect elements -------- */
    const el: Record<string, HTMLElement | SVGElement> = {};
    root.querySelectorAll<HTMLElement>("[data-ak]").forEach((n) => {
      el[n.dataset.ak as string] = n;
    });
    const get = (k: string) => el[k] as HTMLElement;
    const sides: HTMLElement[][] = [];
    const leds: HTMLElement[] = [];
    for (let i = 0; i < 6; i++) {
      sides.push(Array.from(root.querySelectorAll<HTMLElement>(`[data-ak-side="${i}"]`)));
      leds.push(root.querySelector<HTMLElement>(`[data-ak-led="${i}"]`) as HTMLElement);
    }
    const pipeDots = Array.from(root.querySelectorAll<HTMLElement>("[data-ak-dot]")).map((n) => ({
      el: n,
      px: +(n.dataset.px as string), py: +(n.dataset.py as string),
      qx: +(n.dataset.qx as string), qy: +(n.dataset.qy as string),
      phase: +(n.dataset.phase as string),
    }));
    const frags = Array.from(root.querySelectorAll<HTMLElement>("[data-ak-frag]")).map((n) => ({
      el: n,
      x0: +(n.dataset.x0 as string), y0: +(n.dataset.y0 as string),
      x1: +(n.dataset.x1 as string), y1: +(n.dataset.y1 as string),
      r0: +(n.dataset.r0 as string), merge: n.dataset.merge === "1",
    }));
    const tickLines = Array.from(root.querySelectorAll<HTMLElement>("[data-ak-tickline]"));
    const tickNums = Array.from(root.querySelectorAll<HTMLElement>("[data-ak-ticknum]"));

    const whL = [0, 1, 2].map((i) => el[`wh-l${i}`] as SVGPathElement);
    const whLen = whL.map((p) => p.getTotalLength());
    whL.forEach((p, i) => {
      p.style.strokeDasharray = `${whLen[i]}`;
      p.style.strokeDashoffset = `${whLen[i]}`;
    });
    const mlFit = el["ml-fit"] as SVGPathElement;
    const fitLen = mlFit.getTotalLength();
    mlFit.style.strokeDasharray = `${fitLen}`;
    mlFit.style.strokeDashoffset = `${fitLen}`;
    const spark = el["spark"] as SVGPathElement;
    const sparkLen = spark.getTotalLength();
    spark.style.strokeDasharray = `${sparkLen}`;
    spark.style.strokeDashoffset = `${sparkLen}`;

    /* -------- measurement -------- */
    let fit = 1;
    let mobile = false;

    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      mobile = vw < 768;
      fit = mobile ? clamp(vw / 700, 0.4, 0.8) : clamp(Math.min(vw / 1500, vh / 950), 0.42, 1.05);
      (el["scene"] as HTMLElement).style.perspectiveOrigin = mobile ? "50% 40%" : "62% 44%";
      const track = trackRef.current;
      if (track) {
        geomRef.current.trackTop = track.getBoundingClientRect().top + window.scrollY;
        geomRef.current.trackH = track.offsetHeight;
      }
      geomRef.current.vh = vh;
      const b = [0];
      let acc = 0;
      for (const s of TEARDOWN_SEGS_VH) {
        acc += (s * vh) / 100;
        b.push(acc);
      }
      boundsRef.current = b;
    };
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    /* -------- per-frame layout -------- */
    let sy = 0;
    let lastQN = -1;
    let lastCombo = -1;
    let capAlpha = 0;
    const pullCur = [0, 0, 0, 0, 0, 0];
    const ringCur = [0, 0, 0, 0, 0, 0];
    const dimCur = [0, 0, 0, 0, 0, 0];
    let painted = false;
    let raf = 0;

    const layout = (cpos: number, time: number) => {
      const tAnim = reducedRef.current ? 0 : time;
      const X = ss(cpos, 0.55, 1.4) * (1 - ss(cpos, 8.02, 8.5));
      const gap = lerp(SEAL, OPEN, X);
      const step = TH + gap;

      let fpos: number;
      if (cpos < 1) fpos = 0;
      else if (cpos < 7) {
        const c = Math.floor(cpos - 1);
        const tt = cpos - 1 - c;
        fpos = c === 0 ? 0 : c - 1 + ss(tt, 0, 0.34);
      } else if (cpos < 8) fpos = lerp(5, 2.5, ss(cpos - 7, 0, 0.5));
      else fpos = 2.5;

      const FW = ss(cpos, 0.8, 1.2) * (1 - ss(cpos, 6.85, 7.35));
      const G = ss(cpos, 7.08, 7.5);
      const Gout = 1 - ss(cpos, 8.02, 8.45);
      const Z8 = ss(cpos, 8.0, 8.55); // move to the close position

      /* drawer combos (close chapter): discrete scroll states, time-eased
         deployment — every state is a fully-pulled, readable pose */
      const comboIdx = cpos >= 9.5 ? 2 : cpos >= 9.0 ? 1 : cpos >= 8.5 ? 0 : -1;
      const ease = reducedRef.current ? 1 : 0.13;
      for (let i = 0; i < 6; i++) {
        let pullT = 0, ringT = 0, dimT = 0;
        if (comboIdx >= 0) {
          const entry = COMBOS[comboIdx].set.find((e) => e[0] === i);
          if (entry) {
            pullT = 140 * entry[1];
            ringT = comboIdx === 2 ? 0.6 : 1;
          } else dimT = 1;
        }
        pullCur[i] += (pullT - pullCur[i]) * ease;
        ringCur[i] += (ringT - ringCur[i]) * ease;
        dimCur[i] += (dimT - dimCur[i]) * ease;
      }
      const pull = pullCur;
      const ring = ringCur;
      const dim = dimCur;

      const rotX = 58 - 2.5 * ss(cpos, 1, 7) + 3 * ss(cpos, 7.05, 7.7);
      const rotZ = -42 + 7 * ss(cpos, 0.6, 7.6) - 4 * ss(cpos, 8, 8.7);
      const scale = (0.94 + 0.1 * ss(cpos, 0.6, 1.5) - 0.26 * ss(cpos, 7.0, 7.7) - 0.06 * Z8) * fit;
      const sinX = Math.sin((rotX * Math.PI) / 180);
      const idleW = Math.max(1 - ss(cpos, 0.35, 0.75), ss(cpos, 9.72, 9.95));
      const bob = Math.sin(tAnim * 1.5) * 4 * idleW;
      const ty = (fpos * step + TH) * sinX * scale - 30 + bob;

      const rig = get("rig");
      const baseLeft = mobile ? 50 : 62;
      const baseTop = mobile ? 63 : 54;
      const closeTop = mobile ? 74 : 70;
      rig.style.left = `${lerp(baseLeft, 50, Z8)}%`;
      rig.style.top = `${lerp(baseTop, closeTop, Z8)}%`;
      rig.style.transform = `translate3d(0px,${ty.toFixed(1)}px,0px) rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale3d(${scale.toFixed(3)},${scale.toFixed(3)},${scale.toFixed(3)})`;

      const sealedW = 1 - X;
      const gArr: number[] = [];
      const aliveArr: number[] = [];
      const FArr: number[] = [];
      for (let i = 0; i < 6; i++) {
        const alive = ss(cpos, 1.06 + i, 1.42 + i);
        const S = Math.max(1 - 0.88 * X, alive);
        let F = FW * Math.max(0, 1 - Math.abs(fpos - i));
        F = F * F * (3 - 2 * F);
        const g = ss(cpos, 1.12 + i, 1.85 + i);
        gArr.push(g);
        aliveArr.push(alive);
        FArr.push(F);
        const drawn = Math.abs(pull[i]) / 140;
        get(`plate-${i}`).style.transform = `translateZ(${(i * step + 26 * F + 10 * drawn).toFixed(1)}px) translateX(${pull[i].toFixed(1)}px)`;
        get(`surf-${i}`).style.opacity = `${(0.1 + 0.9 * S) * (1 - 0.42 * dim[i])}`;
        get(`ghost-${i}`).style.opacity = ((1 - S) * X * 0.9).toFixed(3);
        const top = get(`top-${i}`);
        top.style.borderColor = inkA(0.14 + 0.22 * S);
        const effF = Math.max(F, ring[i] * 0.85);
        top.style.boxShadow =
          effF > 0.01
            ? `0 0 0 1.5px ${accA(0.7 * effF)}, 0 0 ${(58 * effF).toFixed(0)}px ${accA(0.2 * effF)}, inset 0 1px 0 rgba(255,255,255,0.9)`
            : "inset 0 1px 0 rgba(255,255,255,0.9)";
        const sOp = `${(0.15 + 0.85 * S) * (1 - 0.35 * dim[i])}`;
        for (const sd of sides[i]) sd.style.opacity = sOp;
        leds[i].style.opacity = (
          Math.min(1, sealedW * (0.28 + 0.22 * (1 + Math.sin(tAnim * 2 + i * 0.8)) * 0.5) + ring[i]) * (1 - 0.65 * dim[i])
        ).toFixed(3);
        get(`shadow-${i}`).style.opacity = (X * 0.45 * (0.4 + 0.6 * S)).toFixed(3);
        const tag = get(`tag-${i}`);
        tag.style.opacity = Math.max(X * (0.2 + 0.45 * S + 0.35 * F), drawn * 0.95).toFixed(3);
        tag.style.color = F > 0.5 || drawn > 0.5 ? ACC : inkA(0.5);
        let schOp = alive * (0.3 + 0.7 * F);
        if (i === 5) schOp *= X;
        else schOp = Math.min(1, schOp + 0.55 * ring[i]);
        get(`sch-${i}`).style.opacity = schOp.toFixed(3);
      }
      const word = get("word");
      word.style.opacity = sealedW.toFixed(3);
      get("faceled").style.opacity = (0.45 + 0.55 * (1 + Math.sin(tAnim * 2.2)) * 0.5).toFixed(3);

      const railLen = 5 * step + TH + 26;
      const railOp = 0.06 * X + 0.92 * G * Gout;
      for (let i = 0; i < 4; i++) {
        const r = get(`rail-${i}`);
        r.style.opacity = Math.min(1, railOp * (1 - i * 0.06)).toFixed(3);
        r.style.transform = `rotateX(90deg) scaleY(${(railLen / 600).toFixed(4)})`;
      }
      const st = ss(cpos, 7.2, 7.9);
      const scan = get("scan");
      scan.style.opacity = (Math.sin(st * Math.PI) * 0.9 * G).toFixed(3);
      scan.style.transform = `translateZ(${(st * (5 * step + TH)).toFixed(1)}px)`;
      for (let i = 0; i < 3; i++) {
        const gv = get(`gov-${i}`);
        gv.style.opacity = (ss(G, 0.35 + i * 0.18, 0.6 + i * 0.18) * Gout).toFixed(3);
        gv.style.transform = `translate3d(0px,0px,${((1.1 + i * 1.5) * step).toFixed(1)}px) rotateZ(${(-rotZ).toFixed(2)}deg) rotateX(${(-rotX).toFixed(2)}deg)`;
      }
      get("floorshadow").style.opacity = (0.4 + 0.25 * X).toFixed(3);

      const bg = ss(cpos, 5.45, 5.8) * (1 - ss(cpos, 6.2, 6.55));
      const beam = get("beam");
      beam.style.opacity = bg.toFixed(3);
      beam.style.transform = `translateZ(${(4 * step).toFixed(1)}px) rotateX(-90deg) scaleY(${(((4 * step - 6) / 560) * bg).toFixed(4)})`;

      for (let b = 0; b <= 8; b++) {
        const t = get(`txt-${b}`);
        let op: number, y: number;
        if (b === 0) {
          const o = ss(cpos, 0.5, 0.92);
          op = 1 - o;
          y = -o * 44;
        } else if (b === 8) {
          const iIn = ss(cpos, 8.3, 8.72);
          op = iIn;
          y = (1 - iIn) * 26;
        } else {
          const d = cpos - b;
          const iIn = ss(d, 0.12, 0.32);
          const iOut = ss(d, 0.86, 1.06);
          op = iIn * (1 - iOut);
          y = (1 - iIn) * 34 - iOut * 34;
        }
        t.style.opacity = op.toFixed(3);
        t.style.transform = `translateY(${y.toFixed(1)}px)`;
        t.style.pointerEvents = op > 0.5 ? "auto" : "none";
      }

      const combo = get("combo");
      if (comboIdx !== lastCombo) {
        if (comboIdx >= 0) combo.textContent = `${comboIdx + 1} / 3 · ${COMBOS[comboIdx].label}`;
        capAlpha = 0; // restart the fade so each state announces itself
        lastCombo = comboIdx;
      }
      capAlpha += ((comboIdx >= 0 ? 1 : 0) - capAlpha) * (reducedRef.current ? 1 : 0.1);
      combo.style.opacity = capAlpha.toFixed(3);

      const depth = Math.min(100, Math.round((cpos / 10) * 100));
      get("pct").textContent = `${String(depth).padStart(3, "0")}%`;
      get("prog").style.width = `${depth}%`;
      const mi = Math.floor(cpos);
      get("hudmod").textContent = mi === 0 ? "SEALED" : mi >= 8 ? "MODULAR" : HUD_NAMES[mi - 1];
      for (let c = 0; c < 7; c++) {
        const on = mi - 1 === c;
        tickLines[c].style.background = on ? ACC : inkA(0.3);
        tickLines[c].style.height = on ? "22px" : "16px";
        tickNums[c].style.color = on ? ACC : inkA(0.5);
      }

      const hud = get("hud");
      if (hud) {
        const isStartAnywhere = cpos >= 8.0;
        hud.style.opacity = isStartAnywhere ? "0" : "1";
        hud.style.pointerEvents = isStartAnywhere ? "none" : "auto";
      }

      /* schematics */
      if (aliveArr[0] > 0.02) {
        for (const d of pipeDots) {
          const u = (d.phase + gArr[0] * 0.9 + tAnim * 0.12 * (0.25 + 0.75 * Math.max(FArr[0], ring[0]))) % 1;
          d.el.style.transform = `translate(${lerp(d.px, d.qx, u).toFixed(1)}px,${lerp(d.py, d.qy, u).toFixed(1)}px)`;
          d.el.style.background = u > 0.62 ? ACC : inkA(0.35);
          d.el.style.opacity = u < 0.04 || u > 0.97 ? "0" : "0.9";
        }
      }
      if (aliveArr[1] > 0.02) {
        const e = ss(gArr[1], 0.05, 0.9);
        for (const f of frags) {
          f.el.style.transform = `translate(${lerp(f.x0, f.x1, e).toFixed(1)}px,${lerp(f.y0, f.y1, e).toFixed(1)}px) rotate(${lerp(f.r0, 0, e).toFixed(1)}deg)`;
          f.el.style.opacity = f.merge ? `${1 - ss(gArr[1], 0.72, 0.88)}` : "1";
        }
        const go = ss(gArr[1], 0.78, 0.96);
        const gold = get("gold");
        gold.style.opacity = go.toFixed(3);
        gold.style.transform = `scale(${(0.85 + 0.15 * go).toFixed(3)})`;
        get("goldlab").style.opacity = go.toFixed(3);
      }
      for (let j = 0; j < 3; j++) {
        const tj = ss(gArr[2], 0.05 + j * 0.1, 0.35 + j * 0.1);
        const tEl = get(`wh-t${j}`);
        tEl.style.opacity = tj.toFixed(3);
        tEl.style.transform = `translateY(${((1 - tj) * 14).toFixed(1)}px)`;
        const lj = ss(gArr[2], 0.42 + j * 0.14, 0.72 + j * 0.14);
        get(`wh-g${j}`).style.opacity = Math.min(1, lj * 1.4).toFixed(3);
        whL[j].style.strokeDashoffset = ((1 - lj) * whLen[j]).toFixed(1);
      }
      get("ml-dots").style.opacity = (ss(gArr[3], 0.02, 0.3) * 0.9).toFixed(3);
      mlFit.style.strokeDashoffset = ((1 - ss(gArr[3], 0.08, 0.6)) * fitLen).toFixed(1);
      const fco = ss(gArr[3], 0.6, 0.85);
      get("ml-fc").style.opacity = fco.toFixed(3);
      get("ml-fclab").style.opacity = fco.toFixed(3);
      get("ml-band").style.opacity = ss(gArr[3], 0.72, 0.95).toFixed(3);
      const n = Math.round(ss(gArr[4], 0.15, 0.55) * ASK_Q.length);
      if (n !== lastQN) {
        get("ask-q").textContent = ASK_Q.slice(0, n);
        lastQN = n;
      }
      const ao = ss(gArr[4], 0.62, 0.8);
      const aska = get("ask-a");
      aska.style.opacity = ao.toFixed(3);
      aska.style.transform = `translateY(${((1 - ao) * 10).toFixed(1)}px)`;
      for (let j = 0; j < 6; j++) {
        get(`bar-${j}`).style.transform = `scaleY(${ss(gArr[5], 0.1 + j * 0.07, 0.42 + j * 0.07).toFixed(3)})`;
      }
      spark.style.strokeDashoffset = ((1 - ss(gArr[5], 0.35, 0.75)) * sparkLen).toFixed(1);
      get("kpi").textContent = `${(94.2 * ss(gArr[5], 0.25, 0.7)).toFixed(1)}%`;
    };

    let lastHash = "";
    let initialChecked = false;

    // After 1 second, the initial page layout is settled, so any further hash updates can scroll instantly.
    setTimeout(() => {
      initialChecked = true;
    }, 1000);

    const checkHash = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash !== lastHash) {
        lastHash = hash;
        const map: Record<string, number> = {
          "#data-pipelines": 0,
          "#master-data": 1,
          "#data-warehousing": 2,
          "#machine-learning": 3,
          "#ask-ai": 4,
          "#business-intelligence": 5,
          "#governance": 6,
        };
        if (hash in map) {
          if (!initialChecked) {
            initialChecked = true;
            setTimeout(() => {
              goToModule(map[hash]);
            }, 600);
          } else {
            goToModule(map[hash]);
          }
        }
      }
    };

    const frame = (tms: number) => {
      raf = requestAnimationFrame(frame);
      checkHash();
      const { trackTop, vh } = geomRef.current;
      if (geomRef.current.trackH <= 1) measure();
      const trackH = geomRef.current.trackH;
      const y = window.scrollY;
      const inRange = y > trackTop - vh * 1.5 && y < trackTop + trackH + vh * 0.5;
      if (!inRange && painted) return;

      const passed = clamp(y - trackTop, 0, Math.max(1, trackH - vh));
      const target = Math.max(0, passed - curtainRef.current);
      sy += (target - sy) * (reducedRef.current ? 1 : 0.16);
      if (Math.abs(target - sy) < 0.4) sy = target;

      const b = boundsRef.current;
      let s = 0;
      while (s < 9 && sy >= b[s + 1]) s++;
      let len = b[s + 1] - b[s];
      if (s === 9) len = Math.max(1, len - vh);
      const t = clamp((sy - b[s]) / len, 0, 1);
      layout(s + t, tms / 1000);
      painted = true;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [trackRef]);

  const goToModule = (c: number) => {
    const b = boundsRef.current;
    const dest = geomRef.current.trackTop + curtainRef.current + b[c + 1] + (b[c + 2] - b[c + 1]) * 0.5;
    window.scrollTo({ top: dest, behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className="relative h-full w-full select-none overflow-hidden bg-primary-bg text-ink">
      {/* backdrop: dot grid + blue ambience (homepage vocabulary) */}
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-60"
        style={{
          WebkitMaskImage: "radial-gradient(880px at 62% 46%, black 20%, transparent 78%)",
          maskImage: "radial-gradient(880px at 62% 46%, black 20%, transparent 78%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(760px at 62% 48%, ${accA(0.08)}, transparent 70%)` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/60 via-blue/25 to-transparent" aria-hidden />

      {/* ============ 3D scene ============ */}
      <div data-ak="scene" className="pointer-events-none absolute inset-0" style={{ perspective: 1900, perspectiveOrigin: "62% 44%" }}>
        <div
          data-ak="rig"
          style={{ position: "absolute", left: "62%", top: "54%", width: 0, height: 0, transformStyle: "preserve-3d", transform: "translate3d(0,-30px,0) rotateX(58deg) rotateZ(-42deg) scale3d(0.94,0.94,0.94)", willChange: "transform" }}
        >
          {/* floor */}
          <div
            style={{
              position: "absolute", left: -650, top: -500, width: 1300, height: 1000, transform: "translateZ(-26px)",
              backgroundImage: `repeating-linear-gradient(0deg, ${inkA(0.05)} 0px, ${inkA(0.05)} 1px, transparent 1px, transparent 56px), repeating-linear-gradient(90deg, ${inkA(0.05)} 0px, ${inkA(0.05)} 1px, transparent 1px, transparent 56px)`,
              WebkitMaskImage: "radial-gradient(closest-side, black 30%, transparent 92%)",
              maskImage: "radial-gradient(closest-side, black 30%, transparent 92%)",
            }}
          />
          <div
            data-ak="floorshadow"
            style={{ position: "absolute", left: -410, top: -310, width: 820, height: 620, transform: "translateZ(-25px)", background: `radial-gradient(closest-side, ${inkA(0.16)}, ${inkA(0)} 70%)`, opacity: 0.5 }}
          />

          {/* governance rails */}
          {[[-292, -212], [292, -212], [-292, 212], [292, 212]].map((p, i) => (
            <div
              key={i}
              data-ak={`rail-${i}`}
              style={{ position: "absolute", left: p[0], top: p[1], width: 1, height: 600, transformOrigin: "0 0", transform: "rotateX(90deg) scaleY(0.06)", background: `linear-gradient(0deg, ${ACC}, ${accA(0.2)})`, opacity: 0.06 }}
            />
          ))}

          {/* audit scan plane */}
          <div
            data-ak="scan"
            style={{ position: "absolute", left: -296, top: -216, width: 592, height: 432, border: `1px solid ${ACC}`, borderRadius: 18, background: accA(0.05), transform: "translateZ(0px)", opacity: 0 }}
          >
            <div style={{ position: "absolute", left: 8, top: -18, ...mono, fontSize: 9, letterSpacing: "0.16em", color: ACC }}>AUDIT SWEEP</div>
          </div>

          {/* grounding beam */}
          <div
            data-ak="beam"
            style={{ position: "absolute", left: -1, top: 0, width: 2, height: 560, transformOrigin: "0 0", transform: "translateZ(76px) rotateX(-90deg) scaleY(0)", background: `linear-gradient(180deg, ${ACC}, ${accA(0)})`, opacity: 0 }}
          />

          {/* governance billboard labels */}
          {["ACCESS", "LINEAGE", "AUDIT"].map((label, i) => (
            <div
              key={label}
              data-ak={`gov-${i}`}
              style={{ position: "absolute", left: 306, top: 216, width: 150, ...mono, fontSize: 10, letterSpacing: "0.16em", color: inkA(0.75), opacity: 0, display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ display: "block", width: 22, height: 1, background: ACC }} />
              <span>{label}</span>
            </div>
          ))}

          {/* -------- plate 0 · pipelines -------- */}
          <PlateShell i={0}>
            <div style={{ position: "absolute", left: 172, top: 159, width: 216, height: 82, border: `1px dashed ${accA(0.5)}`, borderRadius: 10 }} />
            <div style={{ position: "absolute", left: 185, top: 172, width: 190, height: 56, border: `1px solid #C8D2F5`, borderRadius: 6, background: "#EEF1FC", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 16px ${accA(0.12)}` }}>
              <span style={{ ...mono, fontSize: 9, letterSpacing: "0.2em", color: ACC }}>INGEST · VALIDATE</span>
            </div>
            {PIPE_SOURCES.map((s) => (
              <FaceChip key={s.label} label={s.label} dot={s.dot} style={s.style} />
            ))}
            <div style={{ position: "absolute", inset: 0 }}>
              {PIPE_STREAMS.flatMap((s, si) =>
                Array.from({ length: 5 }, (_, j) => (
                  <span
                    key={`${si}-${j}`}
                    data-ak-dot
                    data-px={s.p[0]} data-py={s.p[1]} data-qx={s.q[0]} data-qy={s.q[1]}
                    data-phase={(j / 5 + si * 0.137).toFixed(3)}
                    style={{ position: "absolute", left: -2.5, top: -2.5, width: 5, height: 5, borderRadius: "50%", background: inkA(0.35), opacity: 0 }}
                  />
                )),
              )}
            </div>
          </PlateShell>

          {/* -------- plate 1 · master data -------- */}
          <PlateShell i={1}>
            <div style={{ position: "absolute", left: 137, top: 132, width: 296, height: 140, border: `1px dashed ${inkA(0.22)}`, borderRadius: 8 }} />
            <div style={{ position: "absolute", inset: 0 }}>
              {FRAG_SCATTER.map((p, i) => {
                const merge = i >= 10;
                const end = merge ? FRAG_GRID[i === 10 ? 5 : 6] : FRAG_GRID[i];
                return (
                  <div
                    key={i}
                    data-ak-frag
                    data-x0={p[0]} data-y0={p[1]} data-x1={end[0]} data-y1={end[1]} data-r0={FRAG_ROTS[i]}
                    data-merge={merge ? "1" : "0"}
                    style={{ position: "absolute", left: 0, top: 0, width: 52, height: 34, border: `1px solid ${inkA(0.35)}`, borderRadius: 4, background: "rgba(255,255,255,0.9)", boxSizing: "border-box", padding: "5px 6px", boxShadow: `0 3px 8px ${inkA(0.06)}` }}
                  >
                    <div style={{ height: 4, width: "70%", background: inkA(0.18), borderRadius: 2 }} />
                    <div style={{ height: 4, width: "45%", background: inkA(0.12), borderRadius: 2, marginTop: 5 }} />
                  </div>
                );
              })}
              <div
                data-ak="gold"
                style={{ position: "absolute", left: 213, top: 184, width: 52, height: 34, border: `1.5px solid ${ACC}`, borderRadius: 5, background: accA(0.12), boxShadow: `0 0 0 4px ${accA(0.12)}, 0 0 22px ${accA(0.28)}`, opacity: 0 }}
              />
              <div
                data-ak="goldlab"
                style={{ position: "absolute", left: 0, top: 290, width: "100%", textAlign: "center", ...mono, fontSize: 9, letterSpacing: "0.18em", color: ACC, opacity: 0 }}
              >
                GOLDEN RECORD · CU-9042
              </div>
            </div>
          </PlateShell>

          {/* -------- plate 2 · warehouse -------- */}
          <PlateShell i={2}>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }} fill="none">
              <g data-ak="wh-g0" style={{ opacity: 0 }}>
                <path data-ak="wh-l0" d="M210,110 C268,110 272,138 330,138" stroke={ACC} strokeWidth="1.2" />
                <circle cx="210" cy="110" r="2.5" fill={ACC} />
                <circle cx="330" cy="138" r="2.5" fill={ACC} />
              </g>
              <g data-ak="wh-g1" style={{ opacity: 0 }}>
                <path data-ak="wh-l1" d="M415,192 C415,244 322,282 250,282" stroke={ACC} strokeWidth="1.2" />
                <circle cx="415" cy="192" r="2.5" fill={ACC} />
                <circle cx="250" cy="282" r="2.5" fill={ACC} />
              </g>
              <g data-ak="wh-g2" style={{ opacity: 0 }}>
                <path data-ak="wh-l2" d="M135,156 C135,198 175,196 175,236" stroke={ACC} strokeWidth="1.2" />
                <circle cx="135" cy="156" r="2.5" fill={ACC} />
                <circle cx="175" cy="236" r="2.5" fill={ACC} />
              </g>
            </svg>
            {[
              { id: "wh-t0", left: 60, top: 64, w: 150, h: 92, name: "DIM_CUSTOMER", fact: false, rows: ["72%", "54%", "63%"] },
              { id: "wh-t1", left: 330, top: 84, w: 170, h: 108, name: "FCT_ORDERS", fact: true, rows: ["78%", "60%", "68%", "46%"] },
              { id: "wh-t2", left: 100, top: 236, w: 150, h: 92, name: "DIM_VENDOR", fact: false, rows: ["66%", "50%", "70%"] },
            ].map((t) => (
              <div
                key={t.id}
                data-ak={t.id}
                style={{ position: "absolute", left: t.left, top: t.top, width: t.w, height: t.h, border: `1px solid ${t.fact ? "#C8D2F5" : inkA(0.35)}`, borderRadius: 6, background: "rgba(255,255,255,0.92)", overflow: "hidden", opacity: 0, boxShadow: `0 4px 12px ${inkA(0.06)}` }}
              >
                <div style={{ height: 22, borderBottom: `1px solid ${t.fact ? "#C8D2F5" : inkA(0.18)}`, background: t.fact ? "#EEF1FC" : inkA(0.045), display: "flex", alignItems: "center", padding: "0 8px", ...mono, fontSize: 8.5, letterSpacing: "0.1em", color: t.fact ? ACC : inkA(0.7) }}>
                  {t.name}
                </div>
                <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 7 }}>
                  {t.rows.map((wRow, ri) => (
                    <div key={ri} style={{ height: 5, width: wRow, background: inkA(0.12), borderRadius: 2 }} />
                  ))}
                </div>
              </div>
            ))}
            <div style={{ position: "absolute", right: 20, bottom: 16, ...mono, fontSize: 9, letterSpacing: "0.14em", color: inkA(0.45) }}>RELATIONSHIPS BUILT IN</div>
          </PlateShell>

          {/* -------- plate 3 · ml -------- */}
          <PlateShell i={3}>
            <div data-ak="ml-dots" style={{ position: "absolute", inset: 0, opacity: 0 }}>
              {Array.from({ length: 60 }, (_, i) => (
                <span
                  key={i}
                  style={{ position: "absolute", left: 58 + (i % 10) * 48, top: 78 + Math.floor(i / 10) * 46, width: 2.5, height: 2.5, borderRadius: "50%", background: (i * 7) % 4 === 0 ? accA(0.35) : inkA(0.16) }}
                />
              ))}
            </div>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }} fill="none">
              <path data-ak="ml-band" d="M452,118 L536,84 L536,116 L452,148 Z" fill={accA(0.1)} style={{ opacity: 0 }} />
              <path data-ak="ml-fit" d="M56,308 C150,296 192,198 292,168 C360,148 418,140 452,132" stroke={inkA(0.7)} strokeWidth="1.6" />
              <path data-ak="ml-fc" d="M452,132 C486,124 512,112 534,100" stroke={ACC} strokeWidth="1.6" strokeDasharray="5 5" style={{ opacity: 0 }} />
            </svg>
            <div style={{ position: "absolute", left: 26, top: 22, ...mono, fontSize: 9, letterSpacing: "0.16em", color: inkA(0.55) }}>MODEL · DEMAND_FORECAST_V3</div>
            <FaceChip label="DEPLOYED" dot={ACC} style={{ right: 20, top: 16 }} />
            <div style={{ position: "absolute", left: 26, bottom: 20, ...mono, fontSize: 9, letterSpacing: "0.16em", color: inkA(0.45) }}>TRAINED ON GOVERNED DATA · NO EXPORTS</div>
            <div data-ak="ml-fclab" style={{ position: "absolute", right: 22, top: 58, ...mono, fontSize: 9, letterSpacing: "0.16em", color: ACC, opacity: 0 }}>FORECAST</div>
          </PlateShell>

          {/* -------- plate 4 · ask -------- */}
          <PlateShell i={4}>
            <div style={{ position: "absolute", left: 100, top: 132, width: 360, height: 56, border: `1px solid #C8D2F5`, borderRadius: 10, background: "#FFFFFF", boxShadow: `0 8px 24px ${accA(0.14)}`, display: "flex", alignItems: "center", gap: 11, padding: "0 18px", boxSizing: "border-box" }}>
              <span style={{ display: "block", width: 8, height: 8, borderRadius: "50%", background: ACC, flex: "none" }} />
              <span data-ak="ask-q" style={{ fontSize: 14.5, letterSpacing: "-0.01em", color: "#1A1C1D", whiteSpace: "nowrap", overflow: "hidden" }} />
              <span className="animate-[ps-caret-blink_1.1s_step-end_infinite]" style={{ display: "block", width: 1.5, height: 20, background: "#1A1C1D" }} />
            </div>
            <div data-ak="ask-a" style={{ position: "absolute", left: 100, top: 206, width: 360, opacity: 0, borderLeft: `2px solid ${accA(0.5)}`, paddingLeft: 14 }}>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, color: inkA(0.78) }}>
                Customer 9042 forecasts at &asymp; 12,400 units next quarter: up 9% on last quarter, at p85 confidence.
              </div>
              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, ...mono, fontSize: 9, letterSpacing: "0.14em", color: ACC }}>
                <span style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: ACC }} />
                <span>GROUNDED · LINEAGE VERIFIED · 3 SOURCES</span>
              </div>
            </div>
          </PlateShell>

          {/* -------- plate 5 · bi (carries the sealed faceplate) -------- */}
          <PlateShell
            i={5}
            extra={
              <div data-ak="word" style={{ position: "absolute", inset: 0 }}>
                <div className="dot-grid" style={{ position: "absolute", inset: 12, borderRadius: 8, opacity: 0.5 }} />
                <div style={{ position: "absolute", left: 12, top: 12, bottom: 12, width: 3, borderRadius: 2, background: `linear-gradient(180deg, ${ACC}, ${accA(0)})` }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 13 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <AkashicLogo className="h-9 w-9" primaryColor="#1A1C1D" />
                    <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: "0.32em", color: inkA(0.82), textIndent: 0, fontFamily: "var(--font-heading)" }}>AKASHIC</span>
                  </div>
                  <div style={{ ...mono, fontSize: 9, letterSpacing: "0.22em", color: inkA(0.42) }}>UNIFIED DATA &amp; AI PLATFORM</div>
                </div>
                <div style={{ position: "absolute", left: 26, top: 22, ...mono, fontSize: 8.5, letterSpacing: "0.16em", color: inkA(0.4) }}>DHIRA · DATA SYSTEMS</div>
                <div style={{ position: "absolute", right: 26, top: 22, ...mono, fontSize: 8.5, letterSpacing: "0.16em", color: inkA(0.4) }}>UNIT 07</div>
                <div style={{ position: "absolute", left: 26, bottom: 20, ...mono, fontSize: 8.5, letterSpacing: "0.16em", color: inkA(0.4) }}>07 MODULES · ONE FOUNDATION</div>
                <div style={{ position: "absolute", right: 26, bottom: 20, display: "flex", alignItems: "center", gap: 7 }}>
                  <span data-ak="faceled" style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: ACC, boxShadow: `0 0 8px ${accA(0.9)}` }} />
                  <span style={{ ...mono, fontSize: 8.5, letterSpacing: "0.16em", color: ACC }}>GOVERNED</span>
                </div>
              </div>
            }
          >
            <div style={{ position: "absolute", left: 36, top: 44, width: 150, height: 112, border: `1px solid ${inkA(0.28)}`, borderRadius: 8, background: "rgba(255,255,255,0.92)", padding: "12px 14px", boxSizing: "border-box", boxShadow: `0 4px 12px ${inkA(0.06)}` }}>
              <div style={{ ...mono, fontSize: 8.5, letterSpacing: "0.12em", color: inkA(0.5) }}>ON-TIME DELIVERY</div>
              <div data-ak="kpi" style={{ marginTop: 12, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", color: "#1A1C1D" }}>0.0%</div>
              <div style={{ marginTop: 8, display: "inline-block", padding: "2px 6px", borderRadius: 4, background: "#EEF1FC", ...mono, fontSize: 9, letterSpacing: "0.1em", color: ACC }}>+2.4 PTS · QTD</div>
            </div>
            <div style={{ position: "absolute", left: 210, top: 44, width: 160, height: 112, border: `1px solid ${inkA(0.28)}`, borderRadius: 8, background: "rgba(255,255,255,0.92)", padding: "12px 14px", boxSizing: "border-box", boxShadow: `0 4px 12px ${inkA(0.06)}` }}>
              <div style={{ ...mono, fontSize: 8.5, letterSpacing: "0.12em", color: inkA(0.5) }}>ORDERS / WEEK</div>
              <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, height: 60, display: "flex", alignItems: "flex-end", gap: 8 }}>
                {[
                  { h: 26, c: accA(0.25) }, { h: 38, c: accA(0.35) }, { h: 31, c: accA(0.45) },
                  { h: 47, c: accA(0.6) }, { h: 42, c: accA(0.75) }, { h: 58, c: ACC },
                ].map((bar, j) => (
                  <span
                    key={j}
                    data-ak={`bar-${j}`}
                    style={{ display: "block", flex: 1, height: bar.h, background: bar.c, borderRadius: "2px 2px 0 0", transform: "scaleY(0)", transformOrigin: "bottom" }}
                  />
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", left: 394, top: 44, width: 130, height: 112, border: `1px solid ${inkA(0.28)}`, borderRadius: 8, background: "rgba(255,255,255,0.92)", padding: "12px 14px", boxSizing: "border-box", boxShadow: `0 4px 12px ${inkA(0.06)}` }}>
              <div style={{ ...mono, fontSize: 8.5, letterSpacing: "0.12em", color: inkA(0.5) }}>MARGIN TREND</div>
              <svg width="102" height="60" viewBox="0 0 102 60" style={{ position: "absolute", left: 14, bottom: 12 }} fill="none">
                <path data-ak="spark" d="M4,48 L22,32 L40,38 L58,18 L76,26 L98,10" stroke={ACC} strokeWidth="1.6" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 36, top: 190, width: 488, height: 58, border: `1px solid #C8D2F5`, borderRadius: 8, background: accA(0.04), display: "flex", alignItems: "center", justifyContent: "center", gap: 10, ...mono, fontSize: 9, letterSpacing: "0.16em", color: inkA(0.55) }}>
              <span style={{ padding: "2px 6px", borderRadius: 4, background: "#EEF1FC", color: ACC }}>METRIC</span>
              <span>ON_TIME_RATE · DEFINED ONCE · USED EVERYWHERE</span>
            </div>
            <div style={{ position: "absolute", right: 20, bottom: 16, ...mono, fontSize: 9, letterSpacing: "0.14em", color: inkA(0.45) }}>SAME NUMBER · EVERY SURFACE</div>
          </PlateShell>
        </div>
      </div>

      {/* ============ narrative rail ============ */}
      <div className="pointer-events-none absolute left-[6%] right-[6%] top-[15%] md:right-auto md:left-[7%] md:top-[46%] md:w-[470px] md:-translate-y-[40%]">
        <div data-ak="txt-0">
          <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[02]</span>
            <span className="block h-px w-8 bg-line" aria-hidden />
            <span className="text-inkSoft">How it works</span>
          </p>
          <h2 className="mt-5 text-[30px] font-semibold leading-[1.06] tracking-tighter text-ink md:text-[44px]">
            That answer took seven modules. Here they are.
          </h2>
          <p className="mt-5 max-w-[430px] text-[15px] leading-relaxed text-inkSoft md:text-[16.5px]">
            Everything between raw data and a defensible decision, sealed into one governed
            foundation. Scroll to take it apart, module by module.
          </p>
          <div className="mt-8 flex items-center gap-3.5">
            <span className="relative block h-[26px] w-px overflow-hidden bg-ink/15">
              <span className="absolute left-0 top-0 h-2 w-px animate-[ak-drop_1.8s_ease-in-out_infinite] bg-blue" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkSoft">
              Scroll · open the platform
            </span>
          </div>
        </div>
      </div>

      {MODULES.map((m, i) => (
        <div
          key={m.name}
          className="pointer-events-none absolute left-[6%] right-[6%] top-[12%] md:right-auto md:left-[7%] md:top-1/2 md:w-[420px] md:-translate-y-[40%]"
        >
          <div data-ak={`txt-${i + 1}`} className="relative" style={{ opacity: 0 }}>
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-12 select-none font-mono text-[110px] font-semibold leading-none text-blue/[0.07] md:-top-16 md:text-[150px]"
            >
              0{i + 1}
            </span>
            <p className="relative flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow">
              <span className="text-blue">0{i + 1} / 07</span>
              <span className="block h-px w-8 bg-line" aria-hidden />
              <span className="rounded-[5px] border border-blue-border bg-blue-subtle px-2 py-[3px] text-[9.5px] text-blue">
                {m.kicker}
              </span>
            </p>
            <h3 className="relative mt-4 text-[27px] font-semibold leading-[1.05] tracking-tighter text-ink md:text-[38px]">{m.name}</h3>
            <p className="relative mt-3 text-[16px] font-medium tracking-tight text-ink md:text-[19px]">{m.lede}</p>
            <p className="relative mt-3 hidden text-[15px] leading-relaxed text-inkSoft sm:block">{m.body}</p>
          </div>
        </div>
      ))}

      {/* close chapter: text above, unit below, drawer combos in between */}
      <div className="pointer-events-none absolute left-1/2 top-[8%] w-[min(92vw,760px)] -translate-x-1/2 text-center md:top-[10%]">
        <div data-ak="txt-8" style={{ opacity: 0 }}>
          <p className="flex items-center justify-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-blue">Start anywhere</span>
            <span className="block h-px w-8 bg-line" aria-hidden />
            <span className="text-inkSoft">Scale everywhere</span>
          </p>
          <h3 className="mx-auto mt-5 max-w-[16em] text-[28px] font-semibold leading-[1.08] tracking-tighter text-ink md:text-[42px]">
            Every module works on its own. Together, they&rsquo;re the whole platform.
          </h3>
          <p className="mx-auto mt-4 max-w-[36em] text-[15px] leading-relaxed text-inkSoft md:text-[16.5px]">
            Pick the modules that solve today&rsquo;s problem: they run alongside whatever you
            already have. Add the rest when you&rsquo;re ready. The foundation never changes.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
            <Link href="#architecture" className="btn-primary pointer-events-auto px-6">
              Deploy it where your data lives
              <span className="font-mono text-[13px]" aria-hidden>&rarr;</span>
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-overcast">
              Seven modules · one platform
            </span>
          </div>
        </div>
      </div>

      {/* drawer-combo caption, on top of the unit */}
      <div
        data-ak="combo"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-blue-border bg-blue-subtle px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-blue top-[50%] md:top-[46%]"
        style={{ opacity: 0 }}
      />

      {/* ============ frame chrome ============ */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[54px] items-center justify-between border-b border-lineSoft px-[6%] md:px-[7%]">
        <span className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-inkSoft">
          <span className="block h-1.5 w-1.5 animate-[ps-pulse_2s_infinite] rounded-full bg-blue" aria-hidden />
          [02] Introducing Akashic · seven modules
        </span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-overcast md:block">
          Akashic · platform architecture
        </span>
      </div>

      <div
        data-ak="hud"
        className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-between border-t border-lineSoft bg-primary-bg/75 px-[6%] backdrop-blur-md md:px-[7%]"
      >
        <div className="hidden w-[190px] items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] md:flex">
          <span className="text-overcast">Module</span>
          <span data-ak="hudmod" className="text-ink">SEALED</span>
        </div>
        <div className="flex items-end gap-4 md:gap-[22px]">
          {HUD_NAMES.map((name, c) => (
            <button
              key={name}
              type="button"
              aria-label={`Go to module 0${c + 1}: ${name.toLowerCase()}`}
              onClick={() => goToModule(c)}
              className="flex flex-col items-center gap-[7px] px-0.5 py-1.5"
            >
              <span data-ak-tickline className="block w-px transition-none" style={{ height: 16, background: inkA(0.3) }} />
              <span data-ak-ticknum className="font-mono text-[9px] tracking-[0.1em]" style={{ color: inkA(0.5) }}>
                0{c + 1}
              </span>
            </button>
          ))}
        </div>
        <div className="hidden w-[190px] items-center justify-end gap-3 font-mono text-[10px] uppercase tracking-[0.16em] md:flex">
          <span className="text-overcast">Depth</span>
          <span data-ak="pct" className="text-ink">000%</span>
        </div>
        <span
          data-ak="prog"
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue via-blue to-blue/40"
          style={{ width: "0%" }}
          aria-hidden
        />
      </div>
    </div>
  );
}
