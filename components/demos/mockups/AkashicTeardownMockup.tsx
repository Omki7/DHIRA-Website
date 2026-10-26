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
 * Plate faces carry each module's focused screen (AkashicPlateScreensMockup,
 * user, 26 Oct 2026): no app chrome, one core view per module, drawn at
 * plate size over the abstract sketches that stood alone from Jul 2026. The
 * screens' figures are the one demo world (AkashicScreenKitMockup).
 * Source-dot colours from AkashicModules.
 * Inline styles here are computed 3D geometry — the Rule 8 mockup
 * exception, same as HeroProductsMockup / AkashicModuleScreensMockup.
 */

import { useEffect, useRef } from "react";
import AkashicWordmark from "@/components/icons/AkashicWordmark";
import AkashicPlateScreensMockup, { FACE_H, FACE_W } from "@/components/demos/mockups/AkashicPlateScreensMockup";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import PreviewTag from "@/components/ui/PreviewTag";
import type { AkashicPage } from "@/content/pages/akashic";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

/* intro + 7 modules + modular pick + close, in vh of scroll each */
const TEARDOWN_SEGS_VH = [60, 90, 90, 90, 90, 90, 90, 90, 120, 200];
export const TEARDOWN_TRACK_VH = TEARDOWN_SEGS_VH.reduce((a, b) => a + b, 0);

const ACC = "rgb(var(--blue))";


const W = 560;
const H = 400;
const TH = 16; // plate thickness
const SEAL = 3; // sealed gap between plates
const OPEN = 88; // exploded gap between plates

const HUD_NAMES = ["DATA PIPELINES", "MASTER DATA", "DATA WAREHOUSE", "MACHINE LEARNING", "ASK AKASHIC", "BUSINESS INTELLIGENCE", "GOVERNANCE"];


const PLATE_TAGS = [
  "A-01 · Data Pipelines · ingest / validate",
  "A-02 · Master Data · hierarchies / stewardship",
  "A-03 · Data Warehouse · modelled storage",
  "A-04 · Machine Learning · train / deploy / monitor",
  "A-05 · Ask Akashic · natural language",
  "A-06 · Business Intelligence · decision surface",
];


/* source chips share AkashicModules' dot colours */
const PIPE_SOURCES = [
  { label: "CRM", dot: "#00A1E0", style: { left: 14, top: 92 } },
  { label: "ERP", dot: "#1F2A44", style: { left: 14, top: 272 } },
  { label: "PDF", dot: "#E8491D", style: { right: 14, top: 122 } },
  { label: "STREAM", dot: "rgb(var(--blue))", style: { right: 14, top: 282 } },
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

/* "start anywhere" drawer combos for the close chapter: [plate, pull
   direction]. Index-matched to content howItWorks.combos (the captions). */
const COMBO_SETS: [number, number][][] = [
  [[0, 1]],
  [[1, 1], [4, -1]],
  [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]],
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
// Assigning textContent replaces the node even when the string is the same,
// which costs a relayout on every frame of the scroll loop.
const setText = (el: HTMLElement, text: string) => {
  if (el.textContent !== text) el.textContent = text;
};

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)" };
const inkA = (a: number) => `rgb(var(--ink) / ${a})`;
const accA = (a: number) => `rgb(var(--blue) / ${a})`;

/* ---------------------------------------------------------------- */
/*  Plate shell                                                      */
/* ---------------------------------------------------------------- */

/* Each module's focused screen (AkashicPlateScreensMockup), drawn at the
   plate's own size inside its inner border (inset 12), so the content reads
   instead of shrinking with a whole app window. It sits in the face layer,
   so it fades in with the plate as that module opens. The abstract sketch
   the scroll code still drives stays mounted underneath but hidden (user,
   26 Oct 2026: wireframes on the plates, then "remove the top and left bar
   ... the focus should be on the things we want to show"). */
function PlateScreen({ i }: { i: number }) {
  return (
    <div style={{ position: "absolute", left: (W - FACE_W) / 2, top: (H - FACE_H) / 2 }}>
      <AkashicPlateScreensMockup index={i} />
    </div>
  );
}

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
        style={{ position: "absolute", inset: -6, borderRadius: 20, background: "transparent", transform: "translateZ(-9px)", opacity: 0 }}
      />
      {side("n", { left: 0, top: 0, width: W, height: TH, transform: `translateZ(${TH}px) rotateX(-90deg)`, background: "rgb(var(--plate-north))" })}
      {side(
        "s",
        { left: 0, top: H, width: W, height: TH, transform: `translateZ(${TH}px) rotateX(-90deg)`, background: "rgb(var(--plate-south))" },
        <span
          data-ak-led={i}
          style={{ position: "absolute", left: W / 2 - 9, top: 6.5, width: 18, height: 3, borderRadius: 2, background: ACC, opacity: 0.3 }}
        />,
      )}
      {side("w", { left: 0, top: 0, width: TH, height: H, transform: `translateZ(${TH}px) rotateY(90deg)`, background: "rgb(var(--plate-west))" })}
      {side("e", { left: W, top: 0, width: TH, height: H, transform: `translateZ(${TH}px) rotateY(90deg)`, background: "rgb(var(--plate-east))" })}
      <div
        data-ak={`top-${i}`}
        style={{ position: "absolute", inset: 0, borderRadius: 14, transform: `translateZ(${TH}px)`, border: `1px solid ${inkA(0.36)}`, boxShadow: "none", overflow: "hidden" }}
      >
        <div data-ak={`surf-${i}`} style={{ position: "absolute", inset: 0, borderRadius: 13, background: "rgb(var(--plate-top))" }} />
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
            style={{ position: "absolute", left: p[0], top: p[1], width: 6, height: 6, borderRadius: "50%", border: `1px solid ${inkA(0.28)}`, background: "rgb(var(--background))" }}
          />
        ))}
        {extra}
        <div data-ak={`sch-${i}`} style={{ position: "absolute", inset: 0, opacity: 0 }}>
          {/* The sketch stays mounted for the scroll code, out of sight. */}
          <div style={{ position: "absolute", inset: 0, visibility: "hidden" }}>{children}</div>
          <PlateScreen i={i} />
        </div>
      </div>
      <div
        data-ak={`tag-${i}`}
        style={{ position: "absolute", left: 2, top: H + 10, transform: `translateZ(${TH}px)`, ...mono, fontSize: 11.5, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: inkA(0.8), opacity: 0 }}
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
      style={{ position: "absolute", display: "flex", alignItems: "center", gap: 6, height: 23, padding: "0 9px", borderRadius: 999, border: "1px solid rgb(var(--subtle-stroke))", background: "rgb(var(--background) / 0.92)", ...style }}
    >
      {dot && <span style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: dot }} />}
      <span style={{ ...mono, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.1em", color: inkA(0.85) }}>{label}</span>
    </div>
  );
}

/* module bullet glyphs — house icon family (24×24). No checkmarks (Rule 2). */
const POINT_GLYPHS: Record<string, React.ReactNode> = {
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  funnel: <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />,
  stream: (
    <>
      <path d="M17 2l4 4-4 4" />
      <path d="M21 6H8a5 5 0 0 0-5 5" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M3 18h13a5 5 0 0 0 5-5" />
    </>
  ),
  merge: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M6 9v3a6 6 0 0 0 6 6h3" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <path d="M1 14h6M9 8h6M17 16h6" />
    </>
  ),
  graph: (
    <>
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="19" cy="15" r="2.5" />
      <path d="M6.5 17L10.5 8M14 7.5l3.5 6M7.5 18.6l9-3.2" />
    </>
  ),
  cube: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  cpu: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  trace: (
    <>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H12" />
    </>
  ),
  quote: (
    <>
      <path d="M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6c0 2-1 3.5-3 4.5" />
      <path d="M20 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6c0 2-1 3.5-3 4.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  sparkle: <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />,
  bell: (
    <>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.83 3.98" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  key: (
    <>
      <circle cx="7.5" cy="16.5" r="4.5" />
      <path d="M10.7 13.3L21 3M15 4l3 3M18 7l2 2" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 12.9L17 22l-5-3-5 3 1.5-9.1" />
    </>
  ),
};

function PointIcon({ glyph }: { glyph: string }) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {POINT_GLYPHS[glyph]}
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/*  Component                                                        */
/* ---------------------------------------------------------------- */

/* Only hashes no element on the page owns. The full module ids
   (#data-pipelines, #modules-governance...) are anchors in AkashicModules,
   where the nav, glossary and sector pages send people; claiming them here
   yanked every such link 9,000px back up to this scene (15 Oct 2026). */
const HASH_MODULE_MAP: Record<string, number> = {
  "#pipelines": 0,
  "#warehouse": 2,
  "#ml": 3,
  "#ask": 4,
  "#bi": 5,
};

const MODULE_HASHES = [
  "#data-pipelines",
  "#master-data",
  "#data-warehousing",
  "#machine-learning",
  "#ask-ai",
  "#business-intelligence",
  "#governance",
];

type Props = {
  content: AkashicPage["howItWorks"];
  trackRef: React.RefObject<HTMLDivElement | null>;
  curtainHeight: number;
};

export default function AkashicTeardownMockup({ content, trackRef, curtainHeight }: Props) {
  const MODULES = content.modules;
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef(curtainHeight);
  const boundsRef = useRef<number[]>([0]);
  const geomRef = useRef({ trackTop: 0, trackH: 1, vh: 800 });
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  const lastHashRef = useRef("");
  const initialCheckedRef = useRef(false);
  const measureRef = useRef<() => void>(() => {});

  /* Scrolls to module c's rest position (rail clicks and #hash links). Reads
     refs only, so the scroll effect below can call it. */
  const goToModule = (c: number) => {
    if (measureRef.current) measureRef.current();
    const b = boundsRef.current;
    if (!b || b.length < c + 3) return;
    const dest = geomRef.current.trackTop + curtainRef.current + b[c + 1] + (b[c + 2] - b[c + 1]) * 0.5;
    const hash = MODULE_HASHES[c];
    if (hash && typeof window !== "undefined" && window.location.hash !== hash) {
      lastHashRef.current = hash;
      window.history.replaceState(null, "", hash);
    }
    window.scrollTo({ top: dest, behavior: "smooth" });
  };

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
    measureRef.current = measure;
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
          const entry = COMBO_SETS[comboIdx].find((e) => e[0] === i);
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
        /* schematic completes by mid-segment, while the text is being read,
           not as the visitor leaves (user feedback, Jul 2026) */
        const g = ss(cpos, 1.08 + i, 1.5 + i);
        gArr.push(g);
        aliveArr.push(alive);
        FArr.push(F);
        const drawn = Math.abs(pull[i]) / 140;
        /* PRESENCE (22 Sep 2026): a plate the walkthrough has not reached
           yet is a bare wireframe, not a frosted sheet. Those plates sit
           ABOVE the one being read, and at the old 22% white surface + ghost
           grid + cast shadow + edge tag, three of them stacked roughly halved
           the focused plate's contrast: its labels were unreadable and the
           whole unit read as haze (user feedback). P is 1 while sealed and
           once a plate is reached, 0 for an unreached plate once open. */
        const P = Math.max(1 - X, alive);
        get(`plate-${i}`).style.transform = `translateZ(${(i * step + 26 * F + 10 * drawn).toFixed(1)}px) translateX(${pull[i].toFixed(1)}px)`;
        get(`surf-${i}`).style.opacity = `${P * (1 - 0.42 * dim[i])}`;
        get(`ghost-${i}`).style.opacity = ((1 - P) * X * 0.4).toFixed(3);
        const top = get(`top-${i}`);
        top.style.borderColor = inkA(0.14 + 0.22 * S);
        /* focus is a hard 1.5px accent edge only; the 58px blue bloom that
           used to ride with it is gone (it tinted the plates around it) */
        const effF = Math.max(F, ring[i] * 0.85);
        top.style.outline = effF > 0.01 ? `1.5px solid ${ACC}` : "none";
        const sOp = `${(0.1 + 0.9 * P) * (1 - 0.35 * dim[i])}`;
        for (const sd of sides[i]) sd.style.opacity = sOp;
        leds[i].style.opacity = (
          Math.min(1, sealedW * (0.28 + 0.22 * (1 + Math.sin(tAnim * 2 + i * 0.8)) * 0.5) + ring[i]) * (1 - 0.65 * dim[i])
        ).toFixed(3);
        get(`shadow-${i}`).style.opacity = (X * 0.45 * P).toFixed(3);
        /* Edge tag: only the focused plate (or a pulled drawer) carries one.
           Unreached plates' tags landed across the focused plate's face,
           and a south-edge tag printed over the content of the plate below
           ("A-03 · WAREHOUSE" through "ONE GOLDEN RECORD"). While the stack
           is open the tag rides the NORTH edge, where only the wireframes
           above sit behind it; it returns to the south edge for the drawer
           close (from cpos 8, when it is invisible anyway, so no jump),
           where that edge is the one clear of the sealed stack. */
        const tag = get(`tag-${i}`);
        tag.style.top = `${cpos < 8 ? -30 : H + 10}px`;
        tag.style.opacity = Math.max(X * alive * F, drawn).toFixed(3);
        tag.style.color = ACC;
        let schOp = alive * (0.5 + 0.5 * F);
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
        if (comboIdx >= 0) combo.textContent = `${comboIdx + 1} / ${COMBO_SETS.length} · ${content.combos[comboIdx]}`;
        capAlpha = 0; // restart the fade so each state announces itself
        lastCombo = comboIdx;
      }
      capAlpha += ((comboIdx >= 0 ? 1 : 0) - capAlpha) * (reducedRef.current ? 1 : 0.1);
      combo.style.opacity = capAlpha.toFixed(3);

      const depth = Math.min(100, Math.round((cpos / 10) * 100));
      setText(get("pct"), `${String(depth).padStart(3, "0")}%`);
      get("prog").style.width = `${depth}%`;
      const mi = Math.floor(cpos);
      setText(get("hudmod"), mi === 0 ? content.hud.sealed : mi >= 8 ? content.hud.modular : HUD_NAMES[mi - 1]);
      for (let c = 0; c < 7; c++) {
        const on = mi - 1 === c;
        tickLines[c].style.background = on ? ACC : inkA(0.4);
        tickLines[c].style.height = on ? "22px" : "16px";
        tickNums[c].style.color = on ? ACC : inkA(0.72);
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
          d.el.style.background = u > 0.62 ? ACC : inkA(0.5);
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
      const n = Math.round(ss(gArr[4], 0.15, 0.55) * content.askQuestion.length);
      if (n !== lastQN) {
        get("ask-q").textContent = content.askQuestion.slice(0, n);
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
      setText(get("kpi"), `${(94.2 * ss(gArr[5], 0.25, 0.7)).toFixed(1)}%`);
    };

    /* Gentle module nudge: a slow downward scroll that parks in the
       crossfade dead zone near a module boundary glides on to the next
       module's rest, so nobody strands between panels. Only fires once
       the smoothed position has settled, never on upward or fast
       scrolls, and any wheel/touch input aborts an in-flight glide. */
    let nudgeLastY = window.scrollY;
    let nudgeLastMove = performance.now();
    let nudgeDir = 0;
    let nudgeCooldownUntil = 0;
    let nudgeSnappingUntil = 0;
    let nudgeHandled = false;
    let glideRaf = 0;

    /* Hand-driven glide, not native smooth scroll: the browser's smooth
       burst covers the distance in ~300ms with a hard launch, which
       compresses the plate/text evolution into a visible snap. Duration
       scales with distance and eases in-out, so the lift reads as one
       continuous motion (same reasoning as [01]'s pull-to-pop). */
    const glideTo = (targetY: number) => {
      const startY = window.scrollY;
      const dist = targetY - startY;
      if (Math.abs(dist) < 2) return;
      const dur = clamp(500 + Math.abs(dist) * 0.55, 600, 1200);
      const t0 = performance.now();
      nudgeSnappingUntil = t0 + dur + 80;
      nudgeCooldownUntil = t0 + dur + 900;
      const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const step = (now: number) => {
        if (performance.now() >= nudgeSnappingUntil) return; // aborted or done
        const p = Math.min((now - t0) / dur, 1);
        window.scrollTo(0, startY + dist * easeInOut(p));
        if (p < 1) glideRaf = requestAnimationFrame(step);
      };
      glideRaf = requestAnimationFrame(step);
    };

    const nudgeAbort = () => {
      if (performance.now() < nudgeSnappingUntil) {
        cancelAnimationFrame(glideRaf);
        nudgeSnappingUntil = 0;
        nudgeCooldownUntil = performance.now() + 1400;
        nudgeHandled = true;
      }
    };
    window.addEventListener("wheel", nudgeAbort, { passive: true });
    window.addEventListener("touchstart", nudgeAbort, { passive: true });

    const maybeNudge = (cpos: number, y: number, settled: boolean) => {
      const nowMs = performance.now();
      if (Math.abs(y - nudgeLastY) > 0.5) {
        nudgeDir = y > nudgeLastY ? 1 : -1;
        nudgeLastY = y;
        nudgeLastMove = nowMs;
        nudgeHandled = false;
      }
      if (
        reducedRef.current || nudgeHandled || nudgeDir <= 0 || !settled ||
        nowMs - nudgeLastMove < 260 || nowMs < nudgeCooldownUntil || nowMs < nudgeSnappingUntil ||
        cpos <= 0.82 || cpos >= 7.95
      )
        return;
      const frac = cpos - Math.floor(cpos);
      const m = Math.floor(cpos) - 1; // current module index; -1 while still in the intro
      let dest = -1;
      if (frac > 0.82 && m < 6) dest = m + 1; // parked at a boundary: lift to the next module
      else if (frac < 0.18 && m >= 0) dest = m; // just across a boundary: settle on this one
      if (dest >= 0) {
        nudgeHandled = true;
        const bb = boundsRef.current;
        glideTo(
          geomRef.current.trackTop + curtainRef.current + bb[dest + 1] + (bb[dest + 2] - bb[dest + 1]) * 0.5,
        );
      }
    };

    const checkHash = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash !== lastHashRef.current) {
        lastHashRef.current = hash;
        if (hash in HASH_MODULE_MAP) {
          const modIdx = HASH_MODULE_MAP[hash];
          if (!initialCheckedRef.current) {
            initialCheckedRef.current = true;
            setTimeout(() => {
              goToModule(modIdx);
            }, 500);
          } else {
            goToModule(modIdx);
          }
        }
      }
    };

    const onHashChange = () => checkHash();
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);

    // The loop only runs while the stage is in range. Out of range it stops
    // outright (a scroll back restarts it), and a slow poll stands in for
    // the per-frame hash check: Next's hash links use pushState, which
    // fires no event.
    const inRangeAt = (y: number) => {
      const { trackTop, vh, trackH } = geomRef.current;
      return y > trackTop - vh * 1.5 && y < trackTop + trackH + vh * 0.5;
    };
    const wake = () => {
      if (!raf && inRangeAt(window.scrollY)) raf = requestAnimationFrame(frame);
    };
    window.addEventListener("scroll", wake, { passive: true });
    const hashPoll = window.setInterval(() => {
      if (!raf) checkHash();
    }, 250);

    const frame = (tms: number) => {
      raf = requestAnimationFrame(frame);
      checkHash();
      const { trackTop, vh } = geomRef.current;
      if (geomRef.current.trackH <= 1) measure();
      const trackH = geomRef.current.trackH;
      const y = window.scrollY;
      const inRange = y > trackTop - vh * 1.5 && y < trackTop + trackH + vh * 0.5;
      if (!inRange && painted) {
        cancelAnimationFrame(raf);
        raf = 0;
        return;
      }

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
      maybeNudge(s + t, y, sy === target);
      painted = true;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(glideRaf);
      window.clearInterval(hashPoll);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", nudgeAbort);
      window.removeEventListener("touchstart", nudgeAbort);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, [trackRef, content]);

  return (
    <div ref={rootRef} className="relative h-full w-full select-none overflow-hidden bg-primary-bg text-ink">
      {/* backdrop: dot grid only (homepage vocabulary). A 760px blue radial
          wash sat behind the stack until 22 Sep 2026 and was cut by user
          direction: it tinted every plate lavender and made the unit read
          soft. The accent now appears only as hard lines, never as haze. */}
      

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
            style={{ position: "absolute", left: -410, top: -310, width: 820, height: 620, transform: "translateZ(-25px)", background: "transparent", opacity: 0.5 }}
          />

          {/* governance rails */}
          {[[-292, -212], [292, -212], [-292, 212], [292, 212]].map((p, i) => (
            <div
              key={i}
              data-ak={`rail-${i}`}
              style={{ position: "absolute", left: p[0], top: p[1], width: 1, height: 600, transformOrigin: "0 0", transform: "rotateX(90deg) scaleY(0.06)", background: ACC, opacity: 0.06 }}
            />
          ))}

          {/* audit scan plane */}
          <div
            data-ak="scan"
            style={{ position: "absolute", left: -296, top: -216, width: 592, height: 432, border: `1px solid ${ACC}`, borderRadius: 18, background: "transparent", transform: "translateZ(0px)", opacity: 0 }}
          >
            <div style={{ position: "absolute", left: 8, top: -18, ...mono, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.16em", color: ACC }}>AUDIT SWEEP</div>
          </div>

          {/* grounding beam */}
          <div
            data-ak="beam"
            style={{ position: "absolute", left: -1, top: 0, width: 2, height: 560, transformOrigin: "0 0", transform: "translateZ(76px) rotateX(-90deg) scaleY(0)", background: ACC, opacity: 0 }}
          />

          {/* governance billboard labels */}
          {["ACCESS", "LINEAGE", "AUDIT"].map((label, i) => (
            <div
              key={label}
              data-ak={`gov-${i}`}
              style={{ position: "absolute", left: 306, top: 216, width: 170, ...mono, fontSize: 11.5, fontWeight: 500, letterSpacing: "0.16em", color: inkA(0.85), opacity: 0, display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ display: "block", width: 22, height: 1, background: ACC }} />
              <span>{label}</span>
            </div>
          ))}

          {/* -------- plate 0 · pipelines -------- */}
          <PlateShell i={0}>
            <div style={{ position: "absolute", left: 172, top: 159, width: 216, height: 82, border: `1px dashed ${accA(0.5)}`, borderRadius: 10 }} />
            <div style={{ position: "absolute", left: 185, top: 172, width: 190, height: 56, border: `1px solid rgb(var(--blue-border))`, borderRadius: 6, background: "rgb(var(--blue-subtle))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "none" }}>
              <span style={{ ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", color: ACC }}>INGEST · VALIDATE</span>
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
                    style={{ position: "absolute", left: -2.5, top: -2.5, width: 5.5, height: 5.5, borderRadius: "50%", background: inkA(0.5), opacity: 0 }}
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
                    style={{ position: "absolute", left: 0, top: 0, width: 52, height: 34, border: `1px solid ${inkA(0.5)}`, borderRadius: 4, background: "rgb(var(--background) / 0.94)", boxSizing: "border-box", padding: "5px 6px", boxShadow: "none" }}
                  >
                    <div style={{ height: 4, width: `${56 + ((i * 13) % 4) * 8}%`, background: inkA(0.28), borderRadius: 2 }} />
                    <div style={{ height: 4, width: `${30 + ((i * 7) % 4) * 8}%`, background: inkA(0.18), borderRadius: 2, marginTop: 5 }} />
                  </div>
                );
              })}
              <div
                data-ak="gold"
                style={{ position: "absolute", left: 213, top: 184, width: 52, height: 34, border: `1.5px solid ${ACC}`, borderRadius: 5, background: "rgb(var(--background) / 0.96)", boxSizing: "border-box", padding: "5px 6px", boxShadow: "none", opacity: 0 }}
              >
                <div style={{ height: 4, width: "72%", background: accA(0.55), borderRadius: 2 }} />
                <div style={{ height: 4, width: "46%", background: accA(0.3), borderRadius: 2, marginTop: 5 }} />
              </div>
              <div
                data-ak="goldlab"
                style={{ position: "absolute", left: 0, top: 290, width: "100%", textAlign: "center", ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: ACC, opacity: 0 }}
              >
                ONE GOLDEN RECORD · LINEAGE KEPT
              </div>
            </div>
          </PlateShell>

          {/* -------- plate 2 · warehouse -------- */}
          <PlateShell i={2}>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }} fill="none">
              <g data-ak="wh-g0" style={{ opacity: 0 }}>
                <path data-ak="wh-l0" d="M210,110 C268,110 272,138 330,138" stroke={ACC} strokeWidth="1.8" />
                <circle cx="210" cy="110" r="2.5" fill={ACC} />
                <circle cx="330" cy="138" r="2.5" fill={ACC} />
              </g>
              <g data-ak="wh-g1" style={{ opacity: 0 }}>
                <path data-ak="wh-l1" d="M415,192 C415,244 322,282 250,282" stroke={ACC} strokeWidth="1.8" />
                <circle cx="415" cy="192" r="2.5" fill={ACC} />
                <circle cx="250" cy="282" r="2.5" fill={ACC} />
              </g>
              <g data-ak="wh-g2" style={{ opacity: 0 }}>
                <path data-ak="wh-l2" d="M135,156 C135,198 175,196 175,236" stroke={ACC} strokeWidth="1.8" />
                <circle cx="135" cy="156" r="2.5" fill={ACC} />
                <circle cx="175" cy="236" r="2.5" fill={ACC} />
              </g>
            </svg>
            {[
              { id: "wh-t0", left: 60, top: 64, w: 150, h: 92, name: "DIM_CUSTOMER", fact: false, cols: ["customer_id", "name", "region"] },
              { id: "wh-t1", left: 330, top: 84, w: 170, h: 108, name: "FCT_ORDERS", fact: true, cols: ["order_id", "customer_id", "net_amount", "order_date"] },
              { id: "wh-t2", left: 100, top: 236, w: 150, h: 92, name: "DIM_VENDOR", fact: false, cols: ["vendor_id", "name", "terms"] },
            ].map((t) => (
              <div
                key={t.id}
                data-ak={t.id}
                style={{ position: "absolute", left: t.left, top: t.top, width: t.w, height: t.h, border: `1px solid ${t.fact ? "rgb(var(--blue-border))" : inkA(0.5)}`, borderRadius: 6, background: "rgb(var(--background) / 0.96)", overflow: "hidden", opacity: 0, boxShadow: "none" }}
              >
                <div style={{ height: 24, borderBottom: `1px solid ${t.fact ? "rgb(var(--blue-border))" : inkA(0.18)}`, background: t.fact ? "rgb(var(--blue-subtle))" : inkA(0.045), display: "flex", alignItems: "center", padding: "0 9px", ...mono, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", color: t.fact ? ACC : inkA(0.88) }}>
                  {t.name}
                </div>
                <div style={{ padding: "7px 9px", display: "flex", flexDirection: "column", gap: 4 }}>
                  {t.cols.map((col, ci) => (
                    <div key={col} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ display: "block", width: 4, height: 4, borderRadius: "50%", background: t.fact && ci === 0 ? accA(0.6) : inkA(0.25), flex: "none" }} />
                      <span style={{ ...mono, fontSize: 10, lineHeight: "13px", letterSpacing: "0.02em", color: inkA(0.8) }}>{col}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ position: "absolute", right: 20, bottom: 16, ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", color: inkA(0.78) }}>RELATIONSHIPS BUILT IN</div>
          </PlateShell>

          {/* -------- plate 3 · ml -------- */}
          <PlateShell i={3}>
            <div data-ak="ml-dots" style={{ position: "absolute", inset: 0, opacity: 0 }}>
              {Array.from({ length: 60 }, (_, i) => (
                <span
                  key={i}
                  style={{ position: "absolute", left: 58 + (i % 10) * 48, top: 78 + Math.floor(i / 10) * 46, width: 3, height: 3, borderRadius: "50%", background: (i * 7) % 4 === 0 ? accA(0.55) : inkA(0.26) }}
                />
              ))}
            </div>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }} fill="none">
              <path data-ak="ml-band" d="M452,118 L536,84 L536,116 L452,148 Z" fill={accA(0.1)} style={{ opacity: 0 }} />
              <path data-ak="ml-fit" d="M56,308 C150,296 192,198 292,168 C360,148 418,140 452,132" stroke={inkA(0.82)} strokeWidth="2" />
              <path data-ak="ml-fc" d="M452,132 C486,124 512,112 534,100" stroke={ACC} strokeWidth="2" strokeDasharray="5 5" style={{ opacity: 0 }} />
            </svg>
            <div style={{ position: "absolute", left: 26, top: 22, ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", color: inkA(0.8) }}>FORECAST MODEL</div>
            <FaceChip label="DEPLOYED" dot={ACC} style={{ right: 20, top: 16 }} />
            <div style={{ position: "absolute", left: 26, bottom: 20, ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", color: inkA(0.78) }}>TRAINED ON GOVERNED DATA · NO EXPORTS</div>
            <div data-ak="ml-fclab" style={{ position: "absolute", right: 22, top: 58, ...mono, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.16em", color: ACC, opacity: 0 }}>FORECAST</div>
          </PlateShell>

          {/* -------- plate 4 · ask -------- */}
          <PlateShell i={4}>
            <div style={{ position: "absolute", left: 100, top: 132, width: 360, height: 56, border: `1px solid rgb(var(--blue-border))`, borderRadius: 10, background: "rgb(var(--background))", boxShadow: "none", display: "flex", alignItems: "center", gap: 11, padding: "0 18px", boxSizing: "border-box" }}>
              <span style={{ display: "block", width: 8, height: 8, borderRadius: "50%", background: ACC, flex: "none" }} />
              <span data-ak="ask-q" style={{ fontSize: 14.5, letterSpacing: "-0.01em", color: "rgb(var(--ink))", whiteSpace: "nowrap", overflow: "hidden" }} />
              <span className="animate-[ps-caret-blink_1.1s_step-end_infinite]" style={{ display: "block", width: 1.5, height: 20, background: "rgb(var(--ink))" }} />
            </div>
            <div data-ak="ask-a" style={{ position: "absolute", left: 100, top: 206, width: 360, opacity: 0, borderLeft: `2px solid ${accA(0.5)}`, paddingLeft: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 3 }}>
                <div style={{ height: 5, width: "88%", background: inkA(0.32), borderRadius: 2.5 }} />
                <div style={{ height: 5, width: "62%", background: inkA(0.22), borderRadius: 2.5 }} />
              </div>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", color: ACC }}>
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
                
                <div style={{ position: "absolute", left: 12, top: 12, bottom: 12, width: 3, borderRadius: 2, background: ACC }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 13 }}>
                  {/* The designed wordmark, nothing redrawn (user, 26 Oct 2026). */}
                  <AkashicWordmark className="text-[34px] font-semibold tracking-tight text-ink" primaryColor="rgb(var(--ink))" />
                  <div style={{ ...mono, fontSize: 10.5, letterSpacing: "0.22em", color: "rgb(var(--secondary-text))" }}>UNIFIED DATA &amp; AI PLATFORM</div>
                </div>
                <div style={{ position: "absolute", left: 26, top: 22, ...mono, fontSize: 10, letterSpacing: "0.16em", color: 'rgb(var(--secondary-text))' }}>DHIRA · DATA SYSTEMS</div>
                <div style={{ position: "absolute", right: 26, top: 22, ...mono, fontSize: 10, letterSpacing: "0.16em", color: 'rgb(var(--secondary-text))' }}>UNIT 07</div>
                <div style={{ position: "absolute", left: 26, bottom: 20, ...mono, fontSize: 10, letterSpacing: "0.16em", color: 'rgb(var(--secondary-text))' }}>07 MODULES · ONE FOUNDATION</div>
                <div style={{ position: "absolute", right: 26, bottom: 20, display: "flex", alignItems: "center", gap: 7 }}>
                  <span data-ak="faceled" style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: ACC }} />
                  <span style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", color: ACC }}>GOVERNED</span>
                </div>
              </div>
            }
          >
            <div style={{ position: "absolute", left: 36, top: 44, width: 150, height: 112, border: `1px solid ${inkA(0.28)}`, borderRadius: 8, background: "rgb(var(--background) / 0.92)", padding: "12px 14px", boxSizing: "border-box" }}>
              <div style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", color: inkA(0.72) }}>ON-TIME DELIVERY</div>
              <div data-ak="kpi" style={{ marginTop: 12, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", color: "rgb(var(--ink))" }}>0.0%</div>
              <div style={{ marginTop: 8, display: "inline-block", padding: "2px 6px", borderRadius: 4, background: "rgb(var(--blue-subtle))", ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: ACC }}>+2.4 PTS · QTD</div>
            </div>
            <div style={{ position: "absolute", left: 210, top: 44, width: 160, height: 112, border: `1px solid ${inkA(0.28)}`, borderRadius: 8, background: "rgb(var(--background) / 0.92)", padding: "12px 14px", boxSizing: "border-box" }}>
              <div style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", color: inkA(0.72) }}>ORDERS / WEEK</div>
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
            <div style={{ position: "absolute", left: 394, top: 44, width: 130, height: 112, border: `1px solid ${inkA(0.28)}`, borderRadius: 8, background: "rgb(var(--background) / 0.92)", padding: "12px 14px", boxSizing: "border-box" }}>
              <div style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", color: inkA(0.72) }}>MARGIN TREND</div>
              <svg width="102" height="60" viewBox="0 0 102 60" style={{ position: "absolute", left: 14, bottom: 12 }} fill="none">
                <path data-ak="spark" d="M4,48 L22,32 L40,38 L58,18 L76,26 L98,10" stroke={ACC} strokeWidth="2" />
              </svg>
            </div>
            <div style={{ position: "absolute", left: 36, top: 190, width: 488, height: 58, border: `1px solid rgb(var(--blue-border))`, borderRadius: 8, background: accA(0.04), display: "flex", alignItems: "center", justifyContent: "center", gap: 10, ...mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", color: inkA(0.75) }}>
              <span style={{ padding: "2px 6px", borderRadius: 4, background: "rgb(var(--blue-subtle))", color: ACC }}>METRIC</span>
              <span>ON_TIME_RATE · DEFINED ONCE · USED EVERYWHERE</span>
            </div>
            <div style={{ position: "absolute", right: 20, bottom: 16, ...mono, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", color: inkA(0.78) }}>SAME NUMBER · EVERY SURFACE</div>
          </PlateShell>
        </div>
      </div>

      {/* ============ narrative rail ============ */}
      <div className="pointer-events-none absolute left-[6%] right-[6%] top-[15%] md:right-auto md:left-[7%] md:top-[46%] md:w-[470px] md:-translate-y-[40%]">
        <div data-ak="txt-0">
          {/* The site's eyebrow, without its rail: this text floats over a
              pinned scene, where a ruled band has nothing to span. */}
          <FigureEyebrow num={content.eyebrow.number} label={content.eyebrow.label} bare />
          {/* Gain-led headline (14 Oct 2026): adopt one module, grow into
              the platform, which is where the walkthrough ends ("run
              Data Pipelines on its own / or the whole platform"). The lede
              keeps how the seven modules come together. */}
          <h2 className="mt-6 text-[30px] font-medium leading-[1.06] tracking-tighter text-ink md:text-[44px]">
            <span className="text-inkSoft">{content.title.setup}</span> <span className="md:block">{content.title.payoff}</span>
          </h2>
          <p className="mt-5 max-w-[430px] text-[15px] leading-relaxed text-inkSoft md:text-[16.5px]">
            {content.lede}
          </p>
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
              className="pointer-events-none absolute -left-2 -top-12 select-none font-mono text-[110px] font-semibold leading-none text-ink/[0.045] md:-top-16 md:text-[150px]"
            >
              0{i + 1}
            </span>
            <p className="relative flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow">
              <span className="text-blue">0{i + 1} / {String(MODULES.length).padStart(2, "0")}</span>
              <span className="block h-px w-8 bg-line" aria-hidden />
              <span className="rounded-[5px] border border-blue-border bg-blue-subtle px-2 py-[3px] text-[9.5px] text-blue">
                {m.kicker}
              </span>
            </p>
            <h3 className="relative mt-4 text-[27px] font-medium leading-[1.05] tracking-tighter text-ink md:text-[38px]">{m.name}</h3>
            <p className="relative mt-3 text-[16px] font-medium tracking-tight text-ink md:text-[19px]">{m.lede}</p>
            <ul className="relative mt-4 flex flex-col gap-2 md:gap-2.5">
              {m.points.map((pt) => (
                <li
                  key={pt.text}
                  className="flex items-start gap-2.5 text-[13px] leading-snug text-inkSoft md:text-[14.5px]"
                >
                  <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-tile bg-blue-subtle text-blue">
                    <PointIcon glyph={pt.icon} />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    {pt.text}
                    {pt.preview && <PreviewTag className="ml-2 align-[1px]" />}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* close chapter: text above, unit below, drawer combos in between */}
      <div className="pointer-events-none absolute left-1/2 top-[8%] w-[min(92vw,760px)] -translate-x-1/2 text-center md:top-[10%]">
        <div data-ak="txt-8" style={{ opacity: 0 }}>
          <p className="flex items-center justify-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-blue">{content.close.kicker[0]}</span>
            <span className="block h-px w-8 bg-line" aria-hidden />
            <span className="text-inkSoft">{content.close.kicker[1]}</span>
          </p>
          <h3 className="mx-auto mt-5 max-w-[16em] text-[28px] font-medium leading-[1.08] tracking-tighter text-ink md:text-[42px]">
            {content.close.title}
          </h3>
          <p className="mx-auto mt-4 max-w-[36em] text-[15px] leading-relaxed text-inkSoft md:text-[16.5px]">
            {content.close.body}
          </p>
          {/* Its "Deploy it where your data lives" button pointed at the next
              section; removed 20 Oct 2026 (no next-section buttons). */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-secondary-text">
              {content.close.tagline}
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
        <span className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary-text">
          <span className="block h-1.5 w-1.5 animate-[ps-pulse_2s_infinite] rounded-full bg-blue" aria-hidden />
          {content.frameLabel}
        </span>
      </div>

      <div
        data-ak="hud"
        className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-between border-t border-lineSoft bg-primary-bg px-[6%] md:px-[7%]"
      >
        <div className="hidden w-[270px] items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] md:flex">
          <span className="text-secondary-text">{content.hud.module}</span>
          <span data-ak="hudmod" className="text-ink">{content.hud.sealed}</span>
        </div>
        <div className="flex items-end gap-4 md:gap-[22px]">
          {HUD_NAMES.map((name, c) => (
            <button
              key={name}
              type="button"
              title={`${content.hud.module} 0${c + 1}: ${name}`}
              aria-label={`${content.hud.goTo} 0${c + 1}: ${name.toLowerCase()}`}
              onClick={() => goToModule(c)}
              className="group flex flex-col items-center gap-[7px] px-1 py-1.5 cursor-pointer transition-transform duration-150 hover:scale-110 focus-visible:outline-none"
            >
              <span data-ak-tickline className="block w-px transition-none" style={{ height: 16, background: inkA(0.4) }} />
              <span data-ak-ticknum className="font-mono text-[10px] tracking-[0.1em]" style={{ color: inkA(0.72) }}>
                0{c + 1}
              </span>
            </button>
          ))}
        </div>
        <div className="hidden w-[190px] items-center justify-end gap-3 font-mono text-[10px] uppercase tracking-[0.16em] md:flex">
          <span className="text-secondary-text">{content.hud.depth}</span>
          <span data-ak="pct" className="text-ink">000%</span>
        </div>
        <span
          data-ak="prog"
          className="absolute bottom-0 left-0 h-[2px] bg-blue"
          style={{ width: "0%" }}
          aria-hidden
        />
      </div>
    </div>
  );
}
