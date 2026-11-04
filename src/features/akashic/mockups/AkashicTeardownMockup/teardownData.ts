import type { CSSProperties } from "react";

/* intro + 7 modules + modular pick + close, in vh of scroll each */
export const TEARDOWN_SEGS_VH = [60, 90, 90, 90, 90, 90, 90, 90, 120, 200];
export const TEARDOWN_TRACK_VH = TEARDOWN_SEGS_VH.reduce((a, b) => a + b, 0);

export const ACC = "rgb(var(--blue))";

export const W = 560;
export const H = 400;
export const TH = 16; // plate thickness
export const SEAL = 3; // sealed gap between plates
export const OPEN = 88; // exploded gap between plates

export const HUD_NAMES = [
  "DATA PIPELINES",
  "MASTER DATA",
  "DATA WAREHOUSE",
  "MACHINE LEARNING",
  "ASK AKASHIC",
  "BUSINESS INTELLIGENCE",
  "GOVERNANCE",
];

export const PLATE_TAGS = [
  "A-01 · Data Pipelines · ingest / validate",
  "A-02 · Master Data · hierarchies / stewardship",
  "A-03 · Data Warehouse · modelled storage",
  "A-04 · Machine Learning · train / deploy / monitor",
  "A-05 · Ask Akashic · natural language",
  "A-06 · Business Intelligence · decision surface",
];

/* source chips share AkashicModules' dot colours */
export const PIPE_SOURCES = [
  { label: "CRM", dot: "#00A1E0", style: { left: 14, top: 92 } },
  { label: "ERP", dot: "#1F2A44", style: { left: 14, top: 272 } },
  { label: "PDF", dot: "#E8491D", style: { right: 14, top: 122 } },
  { label: "STREAM", dot: "rgb(var(--blue))", style: { right: 14, top: 282 } },
  { label: "CSV", dot: "#30A46C", style: { left: 122, top: 8 } },
  { label: "DOCS", dot: "#C0883A", style: { left: 356, top: 370 } },
];

export const PIPE_STREAMS = [
  { p: [0, 110], q: [188, 186] },
  { p: [0, 290], q: [188, 214] },
  { p: [560, 140], q: [372, 190] },
  { p: [560, 300], q: [372, 214] },
  { p: [150, 0], q: [262, 175] },
  { p: [390, 400], q: [300, 225] },
];

export const FRAG_SCATTER = [
  [64, 56],
  [420, 44],
  [96, 296],
  [372, 316],
  [42, 178],
  [470, 200],
  [206, 34],
  [300, 338],
  [478, 96],
  [148, 338],
  [330, 26],
  [30, 260],
];
export const FRAG_ROTS = [-12, 9, -7, 14, -10, 6, 11, -13, 8, -6, 12, -9];
export const FRAG_GRID: number[][] = [];
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 4; c++) {
    FRAG_GRID.push([145 + c * 68, 140 + r * 44]);
  }
}

/* "start anywhere" drawer combos for the close chapter: [plate, pull
   direction]. Index-matched to content howItWorks.combos (the captions). */
export const COMBO_SETS: [number, number][][] = [
  [[0, 1]],
  [
    [1, 1],
    [4, -1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
  ],
];

export const HASH_MODULE_MAP: Record<string, number> = {
  "#data-pipelines": 0,
  "#pipelines": 0,
  "#master-data": 1,
  "#master": 1,
  "#data-warehouse": 2,
  "#warehouse": 2,
  "#machine-learning": 3,
  "#ml": 3,
  "#ask-akashic": 4,
  "#ask": 4,
  "#business-intelligence": 5,
  "#bi": 5,
  "#governance": 6,
};

export const MODULE_HASHES = [
  "#data-pipelines",
  "#master-data",
  "#data-warehouse",
  "#machine-learning",
  "#ask-akashic",
  "#business-intelligence",
  "#governance",
];

export const MODULE_ANCHOR_ALIASES: string[][] = [
  ["data-pipelines", "pipelines"],
  ["master-data", "master"],
  ["data-warehouse", "warehouse"],
  ["machine-learning", "ml"],
  ["ask-akashic", "ask"],
  ["business-intelligence", "bi"],
  ["governance"],
];

export const ss = (x: number, a: number, b: number) => {
  const u = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return u * u * (3 - 2 * u);
};
export const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
export const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

export const setText = (el: HTMLElement, text: string) => {
  if (el.textContent !== text) el.textContent = text;
};

export const mono: CSSProperties = { fontFamily: "var(--font-mono)" };
export const inkA = (a: number) => `rgb(var(--ink) / ${a})`;
export const accA = (a: number) => `rgb(var(--blue) / ${a})`;
