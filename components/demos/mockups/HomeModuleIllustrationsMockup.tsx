"use client";

/**
 * SIMULATED PRODUCT UI: the small product fragments around the homepage pitch.
 *
 * Refined 22 Oct 2026 (user: "more elegant for 2026 platform UI standards and
 * a little smaller"). The grammar, so the next edit keeps it:
 *   1. One shell for all seven (HomeHeroTeasersMockup): hairline border, one
 *      surface, a mono header row naming the module and one live detail.
 *   2. One type scale: a 24px figure in tabular numerals, 12px body, 9.5px
 *      mono labels. Nothing competes with the headline beside it.
 *   3. Hairline drawings in ink and one blue. Colour only marks a source
 *      system or the single thing that matters (the selected row, the lead).
 *   4. No icon tiles, no chunky bars, no badges stacked on badges.
 *   5. Figures come from the one demo world ($25.4 million net revenue up
 *      6.4%, 98% of plan, 82,401 orders, 214 locations, Online up 18% to 22%
 *      of revenue, about 12,400 units next quarter, $308 per order).
 *      Parties are named by what they are, never invented brands.
 */
import type { ReactNode } from "react";
import type { HomeHeroModuleKind } from "@/content/pages/home";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

/* Source systems keep one colour wherever they appear (Rule 8: SVG hex). */
const SRC = { salesforce: "#2A9BE0", netsuite: "#7C5CFC", plan: "#E0A93B" };

const mono = "font-mono text-[9.5px] uppercase tracking-[0.1em]";
const figure = "font-heading text-[24px] font-medium leading-none tracking-tight tabular-nums text-ink";

function Figure({ value, unit, aside }: { value: string; unit?: string; aside?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-2">
      <p className={figure}>
        {value}
        {unit && <span className="ml-1 font-sans text-[12px] font-normal tracking-normal text-secondary-text">{unit}</span>}
      </p>
      {aside}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Master Data: the organisation as a hierarchy                      */
/* ---------------------------------------------------------------- */
function MasterDataTeaser() {
  const regions = [
    { name: "North region", detail: "Stores · Distribution", on: true },
    { name: "West region", on: false },
  ];
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-[7px] border border-card-line text-ink">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" aria-hidden>
            <path d="M3 14V3.5L8 2l5 1.5V14M1.5 14h13M6.5 14v-3h3v3" />
          </svg>
        </span>
        <span className="text-[12.5px] font-medium tracking-tight text-ink">Your organisation</span>
      </div>
      <div className="relative ml-3 mt-2 border-l border-line pl-4">
        {regions.map((r) => (
          <div key={r.name} className="relative py-1">
            <span className={"absolute -left-4 top-1/2 h-px w-3.5 " + (r.on ? "bg-blue" : "bg-line")} />
            <div className={"rounded-[8px] px-2.5 py-1.5 " + (r.on ? "bg-blue-subtle" : "")}>
              <div className="flex items-center justify-between">
                <span className={"text-[12px] " + (r.on ? "font-medium text-ink" : "text-secondary-text")}>{r.name}</span>
                {r.on && <span className="h-1.5 w-1.5 rounded-full bg-blue" />}
              </div>
              {r.detail && <p className={"mt-0.5 text-tertiary-text " + mono}>{r.detail}</p>}
            </div>
          </div>
        ))}
        <div className="relative py-1">
          <span className="absolute -left-4 top-1/2 h-px w-3.5 bg-line" />
          <span className="px-2.5 text-[11.5px] text-tertiary-text">3 more regions</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Business Intelligence: the quarter, week by week, against plan    */
/* ---------------------------------------------------------------- */
/* Thirteen weeks summing to $25.4 million at 98% of a flat plan (the same
   series as the /akashic outcome card). */
const WEEKS = [1.78, 1.86, 1.92, 1.84, 1.95, 2.03, 1.93, 1.97, 1.99, 1.9, 2.05, 2.1, 2.08];
const PLAN = 25.4 / 0.98 / WEEKS.length;
const SPARK = { w: 208, h: 44, lo: 1.7, hi: 2.14 };
const sy = (v: number) => SPARK.h - ((v - SPARK.lo) / (SPARK.hi - SPARK.lo)) * SPARK.h;
const sx = (i: number) => (i * SPARK.w) / (WEEKS.length - 1);
const SPARK_LINE = WEEKS.map((v, i) => `${i ? "L" : "M"} ${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(" ");
const SPARK_AREA = `${SPARK_LINE} L ${SPARK.w} ${SPARK.h} L 0 ${SPARK.h} Z`;

function BusinessIntelligenceTeaser() {
  const last = WEEKS.length - 1;
  return (
    <div>
      <p className="text-[11px] text-secondary-text">Net revenue</p>
      <div className="mt-1.5">
        <Figure value="$25.4" unit="million" aside={<span className="pb-0.5 text-[11px] font-medium text-blue">+6.4%</span>} />
      </div>
      <svg viewBox={`0 0 ${SPARK.w} ${SPARK.h}`} className="mt-3 h-11 w-full overflow-visible" fill="none" aria-hidden>
        <path d={SPARK_AREA} className="fill-blue-subtle" />
        <path d={`M 0 ${sy(PLAN)} H ${SPARK.w}`} className="stroke-inkSoft" strokeOpacity={0.5} strokeDasharray="2 3" />
        <path d={SPARK_LINE} className="stroke-blue" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={sx(last)} cy={sy(WEEKS[last])} r={2.5} className="fill-blue" />
      </svg>
      <div className={"mt-2 flex justify-between text-tertiary-text " + mono}>
        <span>98% of plan</span>
        <span>Up 2 points</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Governance: one report, a different view for each role            */
/* ---------------------------------------------------------------- */
function GovernanceTeaser() {
  const roles = [
    { role: "Finance", scope: "All regions", open: true },
    { role: "Regional head", scope: "Own region", open: true },
    { role: "Analyst", scope: "Tax ID masked", open: false },
  ];
  return (
    <div className="divide-y divide-lineSoft">
      {roles.map((r) => (
        <div key={r.role} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
          <span className="text-[12px] text-ink">{r.role}</span>
          <span className={"flex items-center gap-1.5 " + mono + " " + (r.open ? "text-blue" : "text-tertiary-text")}>
            {!r.open && (
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden>
                <rect x="2.5" y="5.5" width="7" height="5" rx="1.2" />
                <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
              </svg>
            )}
            {r.scope}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Ask Akashic: a plain question, a cited answer                     */
/* ---------------------------------------------------------------- */
function AskTeaser() {
  return (
    <div>
      <p className="ml-8 rounded-[12px] rounded-br-[4px] border border-lineSoft bg-primary-bg px-3 py-2 text-[12px] leading-snug text-secondary-text">
        Which channel is growing fastest?
      </p>
      <div className="mt-3 flex gap-2.5">
        <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-subtle">
          <span className="h-1.5 w-1.5 rounded-full bg-blue" />
        </span>
        <p className="text-[13px] leading-snug text-ink">
          Online, up <span className="font-medium text-blue">18%</span> this quarter. Now 22% of revenue.
          <span className="ml-1 align-top font-mono text-[9px] text-blue">[1]</span>
        </p>
      </div>
      <p className={"mt-3 border-t border-lineSoft pt-2.5 text-tertiary-text " + mono}>[1] Sales records</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Data Pipelines: three systems arrive as one view                  */
/* ---------------------------------------------------------------- */
const LANES = [
  { y: 10, name: "Salesforce", colour: SRC.salesforce },
  { y: 36, name: "NetSuite", colour: SRC.netsuite },
  { y: 62, name: "Sales plan", colour: SRC.plan },
];
const JOIN = { x: 168, y: 36 };
const lane = (y: number) => (y === JOIN.y ? `M 78 ${y} H ${JOIN.x}` : `M 78 ${y} H 112 C 142 ${y}, 140 ${JOIN.y}, ${JOIN.x} ${JOIN.y}`);

function PipelinesTeaser() {
  const reduced = usePrefersReducedMotion();
  return (
    <div>
      <svg viewBox="0 0 208 72" className="h-[72px] w-full overflow-visible" fill="none" aria-hidden>
        {LANES.map((l) => (
          <g key={l.name}>
            <circle cx={4} cy={l.y} r={3} fill={l.colour} />
            <text x={13} y={l.y + 3.8} className="fill-ink font-sans text-[11px]">
              {l.name}
            </text>
            <path d={lane(l.y)} stroke={l.colour} strokeOpacity={0.55} strokeWidth={1.2} />
          </g>
        ))}
        <path d={`M ${JOIN.x} ${JOIN.y} H 208`} className="stroke-blue" strokeWidth={1.4} />
        <circle cx={JOIN.x} cy={JOIN.y} r={7} className="stroke-blue-border" />
        <circle cx={JOIN.x} cy={JOIN.y} r={3} className="fill-blue" />
        {/* Records travel; the global gate rests SMIL off screen (Rule 6a). */}
        {!reduced &&
          LANES.map((l, i) => (
            <circle key={l.name} r={2} fill={l.colour}>
              <animateMotion dur="2.6s" begin={`-${i * 0.85}s`} repeatCount="indefinite" path={lane(l.y)} />
            </circle>
          ))}
      </svg>
      <div className="mt-2.5 flex items-baseline justify-between border-t border-lineSoft pt-2.5">
        <span className="text-[12px] text-ink">
          <span className="font-medium tabular-nums">82,401</span> orders
        </span>
        <span className={"text-tertiary-text " + mono}>0 rejected</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Machine Learning: next quarter, with its likely range             */
/* ---------------------------------------------------------------- */
const HISTORY = [812, 840, 826, 868, 851, 889, 874, 902, 893, 921, 905, 934, 918, 940];
const FORECAST = [942, 946, 940, 951, 955, 948, 958, 962, 955, 966, 970, 964];
const CHART = { w: 240, h: 56, today: 150 };
const fy = (v: number) => CHART.h - ((v - 790) / 200) * CHART.h;
const hx = (i: number) => (i * CHART.today) / (HISTORY.length - 1);
const fx = (j: number) => CHART.today + ((j + 1) * (CHART.w - CHART.today)) / FORECAST.length;
const HIST_LINE = HISTORY.map((v, i) => `${i ? "L" : "M"} ${hx(i).toFixed(1)} ${fy(v).toFixed(1)}`).join(" ");
const START = `M ${CHART.today} ${fy(HISTORY[HISTORY.length - 1]).toFixed(1)}`;
const FC_LINE = `${START} ` + FORECAST.map((v, j) => `L ${fx(j).toFixed(1)} ${fy(v).toFixed(1)}`).join(" ");
const band = (j: number) => 2 + 1.1 * (j + 1);
const FC_BAND =
  `${START} ` +
  FORECAST.map((v, j) => `L ${fx(j).toFixed(1)} ${(fy(v) - band(j)).toFixed(1)}`).join(" ") +
  " " +
  [...FORECAST.keys()]
    .reverse()
    .map((j) => `L ${fx(j).toFixed(1)} ${(fy(FORECAST[j]) + band(j)).toFixed(1)}`)
    .join(" ") +
  " Z";

function ForecastTeaser() {
  return (
    <div>
      <Figure value="12,400" unit="units next quarter" />
      <svg viewBox={`0 0 ${CHART.w} ${CHART.h + 12}`} className="mt-3 h-[68px] w-full overflow-visible" fill="none" aria-hidden>
        <path d={FC_BAND} className="fill-blue-subtle" />
        <path d={HIST_LINE} className="stroke-ink" strokeOpacity={0.7} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
        <path d={FC_LINE} className="stroke-blue" strokeWidth={1.5} strokeDasharray="3 3" strokeLinecap="round" />
        <path d={`M ${CHART.today} 0 V ${CHART.h}`} className="stroke-line" strokeDasharray="2 2" />
        <circle cx={CHART.today} cy={fy(HISTORY[HISTORY.length - 1])} r={2.5} className="fill-ink" />
        <text x={CHART.today} y={CHART.h + 11} textAnchor="middle" className="fill-tertiary-text font-mono text-[8.5px] uppercase tracking-[0.1em]">
          Today
        </text>
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Warehouse: one number, defined once, with its drivers             */
/* ---------------------------------------------------------------- */
function WarehouseTeaser() {
  return (
    <div>
      <p className="text-[11px] text-secondary-text">Net revenue</p>
      <div className="mt-1.5">
        <Figure value="$25.4" unit="million" />
      </div>
      <div className="mt-3 flex items-end gap-2 border-t border-lineSoft pt-3">
        <div className="min-w-0 flex-1">
          <p className={"text-tertiary-text " + mono}>Orders</p>
          <p className="mt-1 text-[13px] font-medium tabular-nums text-ink">82,401</p>
        </div>
        <span className="pb-px text-[13px] text-blue" aria-hidden>
          ×
        </span>
        <div className="min-w-0 flex-1 text-right">
          <p className={"whitespace-nowrap text-tertiary-text " + mono}>Order value</p>
          <p className="mt-1 text-[13px] font-medium tabular-nums text-ink">$308</p>
        </div>
      </div>
    </div>
  );
}

/* The live detail on each card's header row, beside the module name. */
export const TEASER_META: Record<HomeHeroModuleKind, ReactNode> = {
  "master-data": "214 locations",
  bi: "Quarter 2",
  governance: "Audited",
  ask: "Cited",
  pipelines: (
    <span className="flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 animate-[softpulse_2.4s_infinite] rounded-full bg-positive motion-reduce:animate-none" />6 min ago
    </span>
  ),
  ml: "Next 12 weeks",
  warehouse: "Defined once",
};

const DRAWINGS: Record<HomeHeroModuleKind, () => ReactNode> = {
  "master-data": MasterDataTeaser,
  bi: BusinessIntelligenceTeaser,
  governance: GovernanceTeaser,
  ask: AskTeaser,
  pipelines: PipelinesTeaser,
  ml: ForecastTeaser,
  warehouse: WarehouseTeaser,
};

export default function HomeModuleIllustrationsMockup({ kind }: { kind: HomeHeroModuleKind }) {
  const Draw = DRAWINGS[kind];
  return <Draw />;
}
