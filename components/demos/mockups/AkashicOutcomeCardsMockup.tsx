"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * The homepage [02] stage (the /akashic hero's until 23 Oct 2026, when the
 * user swapped the two): one OUTCOME CARD per module, in the fan the
 * founder approved on 20 Oct 2026, with the context tentacles beneath as the
 * index.
 *
 * HISTORY. Full app windows until 15 Oct 2026; one-moment drawings 15 to 20
 * Oct (now homepage [02]); the seven module screens at 0.56 scale 20 to 22
 * Oct (AkashicModuleScreensMockup). On 22 Oct 2026 the founder said those
 * screens still showed too much: the stage must be end-user and executive
 * friendly and about outcomes a reader recognises, not the product's layout.
 *
 * THE GRAMMAR, taken from how ThoughtSpot, Hex and Cube show their product
 * to business readers (measured 22 Oct 2026), so the next edit keeps it:
 *   1. A person asks. Every card opens with a role and the plain question
 *      that role brings, typed in (Hex's prompt pills, ThoughtSpot's
 *      "Ask Data" bar).
 *   2. One legible outcome. The answer is the largest line on the card and
 *      the drawing proves it. Nothing else competes (ThoughtSpot's lifted
 *      callout, Hex's one big figure).
 *   3. No app chrome. No window bar, module rail, sidebar, toolbar, avatar or
 *      run number: the product shows through its answer, not its layout.
 *   4. Builder modules are drawn, not screenshotted. Pipelines, matching,
 *      definitions and lineage are hairline drawings in the site's own line
 *      language: sources enter from beyond the card's edge, colour encodes
 *      the source system, blue is what Akashic produced.
 *   5. Provenance closes every card in one mono line. Traceability is
 *      Akashic's difference, so every card carries it.
 *
 * Second pass, same day (user: "more intuitive and creative"): each drawing
 * is now a picture a business reader already knows. Master Data is a
 * customer's family tree rolling up, not deduplication; Warehouse is the
 * metric tree behind one number; Business Intelligence is the quarter's gap
 * to plan with the alert it raised; Governance is one report seen by two
 * roles.
 *
 * The ONE demo world (Sales Performance, quarter 2 of financial year 2026,
 * USD) comes from the module screens these cards replaced: $25.4 million
 * net revenue up 6.4%, 82,401 orders up 2,113, 98% of plan up 2 points,
 * the top customer account at $4.2 million, regions North 106 to South 92,
 * channels 46 / 32 / 22. Derived here: $308 per order, up 3.7%.
 * Illustrative and consistent with it: the top account's split across its
 * group ($2.1 / $1.4 / $0.7 million) and stores, and the weekly revenue
 * shape. South's attainment is never stated: /akashic [01] owns that story.
 *
 * NAMES. No invented brands or people (user, 22 Oct 2026: no "generic AI
 * slop names"). A party is named by what it is to the reader ("largest
 * customer group", "India subsidiary", "West regional head"); only real
 * systems keep proper names (Salesforce, NetSuite, Shopify).
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import ContextTentacles from "@/components/demos/akashic/ContextTentacles";
import { useUi } from "@/components/providers/UiProvider";
import MotionToggle from "@/components/ui/MotionToggle";
import type { OutcomeShowcase } from "@/content/pages/akashic";
import useOnScreen from "@/hooks/useOnScreen";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

/* ---------------------------------------------------------------- */
/* Drawing kit                                                       */
/* ---------------------------------------------------------------- */

/* Source systems keep one colour on every card (Rule 8: SVG hex). */
const SRC = {
  salesforce: "#2A9BE0",
  netsuite: "#7C5CFC",
  plan: "#E0A93B",
  invoice: "#E5547B",
  shopify: "#3E9E6B",
};
const T = {
  ink: "rgb(var(--ink))",
  body: "rgb(var(--secondary-text))",
  mute: "rgb(var(--tertiary-text))",
  blue: "rgb(var(--blue))",
  blueSoft: "rgb(var(--blue-subtle))",
  blueLine: "rgb(var(--blue-border))",
  line: "rgb(var(--card-line))",
  hair: "rgb(var(--lineSoft))",
  track: "rgb(var(--tertiary-bg))",
  card: "rgb(var(--screen-surface))",
  panel: "rgb(var(--primary-bg))",
  red: "rgb(var(--red))",
};
const EASE = "cubic-bezier(0.2,0.8,0.2,1)";

/* The drawing's box: the card's width less its 24px gutters. */
const W = 472;
const H = 150;

type Play = { on: boolean; t: number };

/* One entrance, played only while the card is at the front. */
const enter = ({ on, t }: Play, name: string, delay = 0, dur = 560, origin?: string): CSSProperties | undefined =>
  on
    ? {
        animation: `${name} ${dur}ms ${EASE} ${t + delay}ms both`,
        ...(origin ? { transformBox: "fill-box", transformOrigin: origin } : {}),
      }
    : undefined;

/* A card-coloured cover that shrinks to the right: lines draw left to
   right with transform alone (Rule 6a). */
function Wipe({ play, x = -24, y = 0, w = W + 48, h = H, delay = 0, dur = 1100 }: { play: Play; x?: number; y?: number; w?: number; h?: number; delay?: number; dur?: number }) {
  if (!play.on) return null;
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill={T.card}
      style={{ animation: `akx-fillx ${dur}ms ${EASE} ${play.t + delay}ms reverse both`, transformBox: "fill-box", transformOrigin: "right center" }}
    />
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block overflow-visible font-sans" fill="none" aria-hidden>
      {children}
    </svg>
  );
}

/* A mono caption: the drawing's labels share the eyebrow's register. */
function Mono({ x, y, children, fill = T.mute, anchor = "start", size = 9 }: { x: number; y: number; children: ReactNode; fill?: string; anchor?: "start" | "middle" | "end"; size?: number }) {
  return (
    <text x={x} y={y} fill={fill} textAnchor={anchor} fontSize={size} letterSpacing="0.08em" className="font-mono">
      {children}
    </text>
  );
}

/* ---------------------------------------------------------------- */
/* 01 Data Pipelines: three systems arrive as one view               */
/* ---------------------------------------------------------------- */
const JOIN = { x: 292, y: 75 };
const LANES = [
  { y: 24, colour: SRC.salesforce, name: "SALESFORCE", what: "82,401 orders" },
  { y: 75, colour: SRC.netsuite, name: "NETSUITE", what: "81,072 invoices" },
  { y: 126, colour: SRC.plan, name: "SALES PLAN", what: "60 targets" },
];
const lanePath = (y: number) => (y === JOIN.y ? `M -24 ${y} H ${JOIN.x}` : `M -24 ${y} H 164 C 236 ${y}, 228 ${JOIN.y}, ${JOIN.x} ${JOIN.y}`);

function PipelinesDrawing({ play, flow }: { play: Play; flow: boolean }) {
  return (
    <Frame>
      {LANES.map((lane) => (
        <g key={lane.name}>
          <path d={lanePath(lane.y)} stroke={lane.colour} strokeWidth={1.4} strokeOpacity={0.8} />
          <circle cx={4} cy={lane.y - 13} r={2.5} fill={lane.colour} />
          <text x={12} y={lane.y - 10} fontSize={11} fill={T.body}>
            <tspan className="font-mono" fontSize={9} letterSpacing="0.08em" fill={T.mute}>
              {lane.name}
            </tspan>
            <tspan dx={8}>{lane.what}</tspan>
          </text>
        </g>
      ))}
      <path d={`M ${JOIN.x} ${JOIN.y} H 338`} stroke={T.blue} strokeWidth={1.6} />
      <circle cx={JOIN.x} cy={JOIN.y} r={10} stroke={T.blueLine} />
      <circle cx={JOIN.x} cy={JOIN.y} r={4.5} fill={T.blue} />
      {flow &&
        LANES.map((lane, i) => (
          <circle key={lane.name} r={2.6} fill={lane.colour}>
            <animateMotion dur="2.8s" begin={`-${i * 0.9}s`} repeatCount="indefinite" path={lanePath(lane.y)} />
          </circle>
        ))}
      {flow && (
        <circle r={3} fill={T.blue}>
          <animateMotion dur="1.4s" repeatCount="indefinite" path={`M ${JOIN.x} ${JOIN.y} H 338`} />
        </circle>
      )}
      <Wipe play={play} w={338 + 24} />
      <g style={enter(play, "ps-rise", 700)}>
        <rect x={338} y={45} width={134} height={60} rx={10} fill={T.blueSoft} stroke={T.blueLine} />
        <text x={352} y={71} fontSize={13} fontWeight={500} fill={T.ink}>
          Sales Performance
        </text>
        <Mono x={352} y={90} fill={T.blue}>
          ONE VIEW
        </Mono>
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* 02 Master Data: a customer's family tree, rolled up               */
/* ---------------------------------------------------------------- */
/* The demo world's top account ($4.2 million on the retired dashboard),
   split across the group's three companies, each held in a different
   system; the parent's bar is built from theirs. Parties are named by what
   they are, never by an invented brand (user, 22 Oct 2026). */
const FAMILY_TOTAL = 4.2;
const FAMILY = [
  { cx: 78, name: "US retail arm", value: 2.1, source: "SALESFORCE", colour: SRC.salesforce, sites: 6, label: "18 STORES" },
  { cx: 236, name: "India subsidiary", value: 1.4, source: "NETSUITE", colour: SRC.netsuite, sites: 4, label: "9 STORES" },
  { cx: 394, name: "Online business", value: 0.7, source: "SHOPIFY", colour: SRC.shopify, sites: 1, label: "1 WEBSITE" },
];
/* The parent's bar: each company's segment, in order (computed geometry). */
const FAMILY_BAR = { x: 120, w: 232 };
const FAMILY_SEGMENTS = FAMILY.map((k, i) => ({
  ...k,
  x: FAMILY_BAR.x + FAMILY.slice(0, i).reduce((sum, p) => sum + (p.value / FAMILY_TOTAL) * FAMILY_BAR.w, 0),
  w: (k.value / FAMILY_TOTAL) * FAMILY_BAR.w,
}));
const PARENT = { x: 106, w: 260, bottom: 44 };
const KID = { w: 148, top: 64, bottom: 110 };
const RAIL = 54;
const rollUp = (cx: number) => (cx === 236 ? `M 236 ${KID.top} V ${PARENT.bottom}` : `M ${cx} ${KID.top} V ${RAIL} H 236 V ${PARENT.bottom}`);

function MasterDataDrawing({ play, flow }: { play: Play; flow: boolean }) {
  const barX = FAMILY_BAR.x;
  const barW = FAMILY_BAR.w;
  return (
    <Frame>
      <path d={FAMILY.map((k) => rollUp(k.cx)).join(" ")} stroke={T.line} strokeWidth={1.2} style={enter(play, "mm-fade", 520, 500)} />
      <circle cx={236} cy={RAIL} r={2.5} fill={T.blue} style={enter(play, "mm-fade", 520, 500)} />
      {/* Each company's revenue climbs to the group. */}
      {flow &&
        FAMILY.map((k, i) => (
          <circle key={k.name} r={2.6} fill={k.colour}>
            <animateMotion dur="2.4s" begin={`-${i * 0.8}s`} repeatCount="indefinite" path={rollUp(k.cx)} />
          </circle>
        ))}
      {FAMILY.map((k, i) => {
        const x = k.cx - KID.w / 2;
        return (
          <g key={k.name}>
            <g style={enter(play, "ps-rise", i * 120)}>
              <rect x={x} y={KID.top} width={KID.w} height={KID.bottom - KID.top} rx={9} fill={T.card} stroke={T.line} />
              <circle cx={x + 13} cy={KID.top + 16} r={3} fill={k.colour} />
              <text x={x + 22} y={KID.top + 20} fontSize={12} fontWeight={500} fill={T.ink}>
                {k.name}
              </text>
              <text x={x + 13} y={KID.top + 38} fontSize={12} fill={T.body}>
                ${k.value} million
              </text>
              <Mono x={x + KID.w - 12} y={KID.top + 37} anchor="end" size={8}>
                {k.source}
              </Mono>
            </g>
            {/* The level below: the company's stores, a dot each. */}
            <g style={enter(play, "mm-fade", 380 + i * 120, 500)}>
              <path d={`M ${k.cx} ${KID.bottom} V 122`} stroke={T.line} />
              {Array.from({ length: k.sites }, (_, s) => (
                <circle key={s} cx={k.cx + (s - (k.sites - 1) / 2) * 10} cy={126} r={2.2} fill={k.colour} fillOpacity={0.7} />
              ))}
              <Mono x={k.cx} y={145} anchor="middle" size={8}>
                {k.label}
              </Mono>
            </g>
          </g>
        );
      })}
      <g style={enter(play, "ps-rise", 760)}>
        <rect x={PARENT.x} y={0} width={PARENT.w} height={PARENT.bottom} rx={10} fill={T.blueSoft} stroke={T.blueLine} />
        <text x={barX} y={18} fontSize={13} fontWeight={500} fill={T.ink}>
          Largest customer group
        </text>
        <text x={barX + barW} y={18} textAnchor="end" fontSize={13} fontWeight={600} fill={T.blue}>
          ${FAMILY_TOTAL} million
        </text>
        {FAMILY_SEGMENTS.map((k, i) => (
          <rect
            key={k.name}
            x={k.x}
            y={27}
            width={Math.max(0, k.w - 2)}
            height={6}
            rx={2}
            fill={k.colour}
            style={enter(play, "akx-fillx", 980 + i * 160, 520, "left center")}
          />
        ))}
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* 03 Warehouse: the metric tree behind one number                   */
/* ---------------------------------------------------------------- */
/* Net revenue = orders × average order value, each defined once. All
   figures derive from the demo world: $25.4 million up 6.4%; 82,401
   orders up 2,113 (2.6%); so $308 per order, up 3.7%. */
const DRIVERS = [
  { y: 28, name: "Orders", value: "82,401", change: 2.6, lead: false },
  { y: 122, name: "Average order value", value: "$308", change: 3.7, lead: true },
];
const SPINE_X = 190;

function WarehouseDrawing({ play }: { play: Play }) {
  const barX = 318;
  const barMax = 100;
  return (
    <Frame>
      <g style={enter(play, "ps-rise", 0)}>
        <rect x={0} y={40} width={160} height={70} rx={10} fill={T.blueSoft} stroke={T.blueLine} />
        <Mono x={14} y={60} fill={T.blue} size={8.5}>
          NET REVENUE
        </Mono>
        <text x={14} y={84} fontSize={17} fontWeight={500} letterSpacing="-0.01em" fill={T.ink}>
          $25.4 million
        </text>
        <text x={14} y={100} fontSize={11} fill={T.body}>
          <tspan fill={T.blue} fontWeight={600}>
            +6.4%
          </tspan>{" "}
          on last quarter
        </text>
      </g>
      <path d={`M 160 75 H ${SPINE_X - 10} M ${SPINE_X} 28 V 65 M ${SPINE_X} 85 V 122 M ${SPINE_X} 28 H 210 M ${SPINE_X} 122 H 210`} stroke={T.blue} strokeWidth={1.3} />
      {/* The definition, drawn: revenue is orders times order value. */}
      <circle cx={SPINE_X} cy={75} r={10} fill={T.card} stroke={T.blueLine} />
      <text x={SPINE_X} y={79.5} textAnchor="middle" fontSize={14} fill={T.blue}>
        ×
      </text>
      <Wipe play={play} x={160} w={60} delay={250} dur={700} />
      <Mono x={barX} y={8} size={8}>
        CHANGE ON LAST QUARTER
      </Mono>
      {DRIVERS.map((d, i) => (
        <g key={d.name} style={enter(play, "ps-rise", 450 + i * 160)}>
          <text x={218} y={d.y - 8} fontSize={12} fill={T.body}>
            {d.name}
          </text>
          <text x={218} y={d.y + 14} fontSize={17} fontWeight={500} letterSpacing="-0.01em" fill={T.ink}>
            {d.value}
          </text>
          <rect x={barX} y={d.y + 4} width={barMax} height={6} rx={3} fill={T.track} />
          <rect
            x={barX}
            y={d.y + 4}
            width={(d.change / 3.7) * barMax}
            height={6}
            rx={3}
            fill={d.lead ? T.blue : T.blueLine}
            style={enter(play, "akx-fillx", 700 + i * 160, 700, "left center")}
          />
          <text x={W} y={d.y + 11} textAnchor="end" fontSize={12.5} fontWeight={d.lead ? 600 : 500} fill={d.lead ? T.blue : T.ink}>
            +{d.change}%
          </text>
        </g>
      ))}
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* 04 Machine Learning: next quarter's units, with the likely range  */
/* ---------------------------------------------------------------- */
/* Weekly units: 14 weeks of history, then 12 forecast weeks, about 12,400
   for the quarter (the ML screen's "≈12,400 units next qtr"). The shape is
   illustrative; the quarter total and error are the screen's. */
const HISTORY = [812, 840, 826, 868, 851, 889, 874, 902, 893, 921, 905, 934, 918, 940];
const FORECAST = [942, 946, 940, 951, 955, 948, 958, 962, 955, 966, 970, 964];
const TODAY_X = 300;
const BASE_Y = 132;
const uy = (v: number) => BASE_Y - (v - 700) * 0.3;
const hx = (i: number) => (i * TODAY_X) / (HISTORY.length - 1);
const fx = (j: number) => TODAY_X + ((j + 1) * (W - TODAY_X)) / FORECAST.length;
const spread = (j: number) => 4 + 1.7 * (j + 1);

const HISTORY_PATH = HISTORY.map((v, i) => `${i ? "L" : "M"} ${hx(i).toFixed(1)} ${uy(v).toFixed(1)}`).join(" ");
const LAST = { x: TODAY_X, y: uy(HISTORY[HISTORY.length - 1]) };
const FORECAST_PATH = `M ${LAST.x} ${LAST.y.toFixed(1)} ` + FORECAST.map((v, j) => `L ${fx(j).toFixed(1)} ${uy(v).toFixed(1)}`).join(" ");
const BAND_PATH =
  `M ${LAST.x} ${LAST.y.toFixed(1)} ` +
  FORECAST.map((v, j) => `L ${fx(j).toFixed(1)} ${(uy(v) - spread(j)).toFixed(1)}`).join(" ") +
  " " +
  [...FORECAST.keys()]
    .reverse()
    .map((j) => `L ${fx(j).toFixed(1)} ${(uy(FORECAST[j]) + spread(j)).toFixed(1)}`)
    .join(" ") +
  " Z";

function ForecastDrawing({ play }: { play: Play }) {
  const end = { x: fx(FORECAST.length - 1), y: uy(FORECAST[FORECAST.length - 1]) };
  return (
    <Frame>
      <Mono x={0} y={8}>WEEKLY UNITS</Mono>
      <Mono x={TODAY_X} y={8} anchor="middle" fill={T.ink}>
        TODAY
      </Mono>
      <Mono x={W} y={8} anchor="end" fill={T.blue}>
        NEXT 12 WEEKS
      </Mono>
      <path d={`M 0 ${uy(900)} H ${W} M 0 ${uy(800)} H ${W}`} stroke={T.hair} strokeDasharray="2 4" />
      <path d={`M 0 ${BASE_Y} H ${W}`} stroke={T.line} />
      <path d={BAND_PATH} fill={T.blueSoft} />
      <path d={HISTORY_PATH} stroke={T.ink} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
      <path d={FORECAST_PATH} stroke={T.blue} strokeWidth={1.8} strokeDasharray="4 4" strokeLinejoin="round" strokeLinecap="round" />
      <path d={`M ${TODAY_X} 16 V ${BASE_Y}`} stroke={T.ink} strokeOpacity={0.5} strokeDasharray="2 3" />
      <circle cx={LAST.x} cy={LAST.y} r={3.5} fill={T.ink} />
      <circle cx={end.x} cy={end.y} r={3.5} fill={T.blue} />
      <Wipe play={play} y={14} h={BASE_Y - 13} x={-4} w={W + 12} dur={1400} />
      <g style={enter(play, "mm-fade", 900)}>
        <path d={`M 0 ${H - 5} H 16`} stroke={T.ink} strokeWidth={1.8} />
        <Mono x={22} y={H - 2} size={8.5}>
          ACTUAL
        </Mono>
        <path d={`M 84 ${H - 5} H 100`} stroke={T.blue} strokeWidth={1.8} strokeDasharray="4 3" />
        <Mono x={106} y={H - 2} size={8.5}>
          FORECAST
        </Mono>
        <rect x={180} y={H - 10} width={16} height={10} rx={2} fill={T.blueSoft} />
        <Mono x={202} y={H - 2} size={8.5}>
          LIKELY RANGE
        </Mono>
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* 05 Ask Akashic: the answer, with its evidence                     */
/* ---------------------------------------------------------------- */
const CHANNELS = [
  { y: 20, name: "Direct", share: 46, growth: "+6%" },
  { y: 60, name: "Partner", share: 32, growth: "FLAT" },
  { y: 100, name: "Online", share: 22, growth: "+18%", lead: true },
];

function AskDrawing({ play }: { play: Play }) {
  return (
    <Frame>
      {CHANNELS.map((c, i) => (
        <g key={c.name}>
          <text x={0} y={c.y + 4.5} fontSize={12.5} fill={c.lead ? T.ink : T.body} fontWeight={c.lead ? 500 : 400}>
            {c.name}
          </text>
          <rect x={74} y={c.y - 5} width={270} height={10} rx={5} fill={T.track} />
          <rect x={74} y={c.y - 5} width={(c.share / 50) * 270} height={10} rx={5} fill={c.lead ? T.blue : T.blueLine} style={enter(play, "akx-fillx", i * 140, 800, "left center")} />
          <text x={358} y={c.y + 4.5} fontSize={13} fontWeight={500} fill={T.ink}>
            {c.share}%
          </text>
          <Mono x={W} y={c.y + 3.5} anchor="end" fill={c.lead ? T.blue : T.mute} size={9.5}>
            {c.growth}
          </Mono>
        </g>
      ))}
      <path d={`M 0 124 H ${W}`} stroke={T.hair} />
      <g style={enter(play, "ps-rise", 650)}>
        <text x={0} y={144} fontSize={11.5} fill={T.body}>
          Share of $25.4 million net revenue. Direct grew 6%; Partner held flat.
          <tspan dx={5} className="font-mono" fontSize={9} fill={T.blue}>
            [1]
          </tspan>
        </text>
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* 06 Business Intelligence: the quarter against plan, with an alert */
/* ---------------------------------------------------------------- */
/* Thirteen weeks summing to the demo world's $25.4 million against a
   flat weekly plan, so the quarter lands at its 98% plan attainment. Bars
   show each week's gap to plan: under hangs below the line, over rises. */
const WEEKS = [1.78, 1.86, 1.92, 1.84, 1.95, 2.03, 1.93, 1.97, 1.99, 1.9, 2.05, 2.1, 2.08];
const PLAN = 25.4 / 0.98 / WEEKS.length;
const ALERT_WEEK = 9; // week 10: 5% under plan
const BAR_W = 15;
const BAR_STEP = 23;
const ZERO_Y = 58;
const PX_PER_MILLION = 270;

function DashboardDrawing({ play }: { play: Play }) {
  const chartW = BAR_STEP * (WEEKS.length - 1) + BAR_W;
  const alertX = ALERT_WEEK * BAR_STEP + BAR_W / 2;
  const alertY = ZERO_Y + (PLAN - WEEKS[ALERT_WEEK]) * PX_PER_MILLION + 9;
  return (
    <Frame>
      <Mono x={0} y={8}>WEEKLY REVENUE AGAINST PLAN</Mono>
      {WEEKS.map((v, i) => {
        const gap = (v - PLAN) * PX_PER_MILLION;
        const over = gap >= 0;
        return (
          <rect
            key={i}
            x={i * BAR_STEP}
            y={over ? ZERO_Y - gap : ZERO_Y}
            width={BAR_W}
            height={Math.max(1.5, Math.abs(gap))}
            rx={2}
            fill={over ? T.blue : T.blueLine}
            style={enter(play, "mm-growy", i * 45, 520, over ? "center bottom" : "center top")}
          />
        );
      })}
      <path d={`M -4 ${ZERO_Y} H ${chartW + 4}`} stroke={T.ink} strokeOpacity={0.75} />
      <Mono x={chartW + 9} y={ZERO_Y + 3} size={8.5} fill={T.ink}>
        PLAN
      </Mono>
      <Mono x={0} y={H - 4} size={8.5}>
        WEEK 1
      </Mono>
      <Mono x={chartW} y={H - 4} size={8.5} anchor="end">
        WEEK 13
      </Mono>
      <g style={enter(play, "mm-fade", 760, 500)}>
        <rect x={330} y={18} width={10} height={8} rx={2} fill={T.blue} />
        <Mono x={346} y={25} size={8.5}>
          AHEAD OF PLAN
        </Mono>
        <rect x={330} y={34} width={10} height={8} rx={2} fill={T.blueLine} />
        <Mono x={346} y={41} size={8.5}>
          BEHIND PLAN
        </Mono>
      </g>
      {/* The alert lifts out of the week that slipped. */}
      <g style={enter(play, "ps-rise", 980)}>
        <path d={`M ${alertX + 5} ${alertY} H 330`} stroke={T.red} strokeOpacity={0.6} strokeDasharray="2 3" />
        <circle cx={alertX} cy={alertY} r={3.5} fill={T.red} />
        <rect x={330} y={alertY - 30} width={142} height={62} rx={10} fill={T.card} stroke={T.line} />
        <circle cx={345} cy={alertY - 15} r={2.5} fill={T.red} />
        <Mono x={353} y={alertY - 12} size={8.5} fill={T.ink}>
          ALERT · WEEK 10
        </Mono>
        <text x={344} y={alertY + 7} fontSize={12} fontWeight={500} fill={T.ink}>
          5% under plan
        </text>
        <text x={344} y={alertY + 23} fontSize={10.5} fill={T.body}>
          Sent to sales leadership
        </text>
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* 07 Governance: one report, seen by two roles                      */
/* ---------------------------------------------------------------- */
/* Regional attainment from the demo world, drawn as bars without values. */
const REGIONS = [
  { name: "North", attainment: 106 },
  { name: "West", attainment: 102 },
  { name: "Central", attainment: 99 },
  { name: "East", attainment: 97 },
  { name: "South", attainment: 92 },
];
/* `only` limits a view to one region's rows; Finance sees them all. */
const VIEWS: { x: number; role: string; count: string; only?: string }[] = [
  { x: 0, role: "FINANCE", count: "5 OF 5" },
  { x: 244, role: "REGIONAL HEAD · WEST", count: "1 OF 5", only: "West" },
];
const VIEW_W = 228;

function GovernanceDrawing({ play }: { play: Play }) {
  return (
    <Frame>
      <defs>
        <pattern id="akx-withheld" width={5} height={5} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M 0 0 V 5" stroke={T.line} strokeWidth={1.6} />
        </pattern>
      </defs>
      {VIEWS.map((v, vi) => (
        <g key={v.role} style={enter(play, "ps-rise", vi * 180)}>
          <rect x={v.x} y={0} width={VIEW_W} height={H - 2} rx={10} fill={T.panel} stroke={T.hair} />
          <circle cx={v.x + 17} cy={14} r={3.6} stroke={T.ink} strokeWidth={1.2} />
          <path d={`M ${v.x + 10.5} 26 a 6.5 5.5 0 0 1 13 0`} stroke={T.ink} strokeWidth={1.2} />
          <Mono x={v.x + 30} y={22} size={8.5} fill={T.ink}>
            {v.role}
          </Mono>
          <Mono x={v.x + VIEW_W - 12} y={22} size={8.5} anchor="end" fill={vi ? T.blue : T.mute}>
            {v.count}
          </Mono>
          <path d={`M ${v.x + 12} 34 H ${v.x + VIEW_W - 12}`} stroke={T.hair} />
          {REGIONS.map((r, ri) => {
            const y = 52 + ri * 21;
            const shown = !v.only || v.only === r.name;
            const trackX = v.x + 70;
            const trackW = 128;
            return (
              <g key={r.name}>
                <text x={v.x + 14} y={y + 4} fontSize={11} fill={shown ? T.ink : T.mute} fontWeight={shown && vi ? 500 : 400}>
                  {r.name}
                </text>
                {shown ? (
                  <>
                    <rect x={trackX} y={y - 3} width={trackW} height={6} rx={3} fill={T.track} />
                    <rect
                      x={trackX}
                      y={y - 3}
                      width={(r.attainment / 110) * trackW}
                      height={6}
                      rx={3}
                      fill={T.blue}
                      style={enter(play, "akx-fillx", 300 + vi * 180 + ri * 70, 600, "left center")}
                    />
                  </>
                ) : (
                  <g style={enter(play, "mm-fade", 600 + ri * 70, 500)}>
                    <rect x={trackX} y={y - 4} width={trackW} height={8} rx={3} fill="url(#akx-withheld)" />
                    <path d={`M ${trackX + trackW + 8} ${y - 1} h 7 v 6 h -7 z M ${trackX + trackW + 9.5} ${y - 1} v -2 a 2 2 0 0 1 4 0 v 2`} stroke={T.mute} strokeWidth={1} strokeLinejoin="round" />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      ))}
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* The seven outcomes, in the content file's module order            */
/* ---------------------------------------------------------------- */
type Outcome = {
  role: string;
  question: string;
  /** The answer, with the outcome phrase marked. */
  answer: [string, string, string];
  source: string;
  state: string;
  Drawing: (props: { play: Play; flow: boolean }) => ReactNode;
};

const OUTCOMES: Outcome[] = [
  {
    role: "Sales operations",
    question: "Are all of this quarter's orders in one place?",
    answer: ["All ", "82,401 orders", ", in one view."],
    source: "Joined every hour",
    state: "0 rejected",
    Drawing: PipelinesDrawing,
  },
  {
    role: "Key account director",
    question: "How much does our largest customer group buy from us?",
    answer: ["", "$4.2 million", " across three companies."],
    source: "Customer hierarchy · 3 systems rolled up",
    state: "This quarter",
    Drawing: MasterDataDrawing,
  },
  {
    role: "Chief financial officer",
    question: "What drove revenue growth this quarter?",
    answer: ["Up 6.4%, led by ", "larger orders", "."],
    source: "Metrics defined once · version 1.4",
    state: "Against last quarter",
    Drawing: WarehouseDrawing,
  },
  {
    role: "Head of operations",
    question: "How many units should we plan for next quarter?",
    answer: ["About ", "12,400 units", " next quarter."],
    source: "Trained on governed sales history",
    state: "6.2% average error",
    Drawing: ForecastDrawing,
  },
  {
    role: "Head of sales",
    question: "Which channel is growing fastest this quarter?",
    answer: ["", "Online, up 18%", " this quarter."],
    source: "[1] Sales Performance · net revenue",
    state: "2 sources cited",
    Drawing: AskDrawing,
  },
  {
    role: "Chief executive",
    question: "Did we finish the quarter on plan?",
    answer: ["98% of plan, ", "up 2 points", "."],
    source: "Sales overview · alert on plan",
    state: "Refreshed 2 minutes ago",
    Drawing: DashboardDrawing,
  },
  {
    role: "Chief risk officer",
    question: "Who can see which numbers in the sales report?",
    answer: ["One report, ", "scoped to every role", "."],
    source: "Every figure traced to source",
    state: "4,211 access events audited",
    Drawing: GovernanceDrawing,
  },
];

/* ---------------------------------------------------------------- */
/* The card                                                          */
/* ---------------------------------------------------------------- */
const CARD_W = 520;
const CARD_H = 356;
const TYPE_MS = 24;

/* The question types itself in. Remounted (keyed) each time its card comes
   to the front, so it starts empty with no flash of the full line. */
function TypedQuestion({ text, animate }: { text: string; animate: boolean }) {
  const [typed, setTyped] = useState(animate ? 0 : text.length);
  useEffect(() => {
    if (!animate) return;
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= text.length) clearInterval(id);
    }, TYPE_MS);
    return () => clearInterval(id);
  }, [animate, text]);
  const typing = typed < text.length;
  return (
    <>
      {/* Reserve the full line so the pill never changes size. */}
      <span className="invisible col-start-1 row-start-1 truncate">{text}</span>
      <span className="col-start-1 row-start-1 truncate">
        {text.slice(0, typed)}
        {typing && <span className="ml-px inline-block h-[1.05em] w-px translate-y-[0.15em] bg-blue animate-[ps-caret-blink_0.9s_steps(1)_infinite]" />}
      </span>
    </>
  );
}

function OutcomeCard({ module, outcome, live, fade, runKey, reduced, flow }: { module: string; outcome: Outcome; live: boolean; fade: number; runKey: string; reduced: boolean; flow: boolean }) {
  const animate = live && !reduced;
  const answerAt = outcome.question.length * TYPE_MS + 180;
  const play: Play = { on: animate, t: answerAt + 260 };
  const [before, mark, after] = outcome.answer;
  const { Drawing } = outcome;
  return (
    <div className="h-full w-full overflow-hidden rounded-outer border border-card-line bg-[rgb(var(--screen-surface))]">
      <div className="flex h-full flex-col transition-opacity duration-500 ease-settle motion-reduce:transition-none" style={{ opacity: fade }}>
        <div className="px-6 pt-5">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-tertiary-text">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              {outcome.role}
            </span>
            <span>{module}</span>
          </div>
          <p className="mt-3 flex items-center gap-2.5 rounded-full border border-lineSoft bg-primary-bg px-4 py-2 text-[14px] leading-5 text-secondary-text">
            <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
              <circle cx="7" cy="7" r="4.5" />
              <path d="m10.5 10.5 3 3" />
            </svg>
            <span className="grid min-w-0 flex-1">
              <TypedQuestion key={animate ? runKey : "still"} text={outcome.question} animate={animate} />
            </span>
          </p>
          <p
            key={animate ? runKey : "still"}
            className="mt-4 text-[24px] font-medium leading-[1.15] tracking-tight text-ink"
            style={animate ? { animation: `ps-rise 520ms ${EASE} ${answerAt}ms both` } : undefined}
          >
            {before}
            <span className="text-blue">{mark}</span>
            {after}
          </p>
        </div>
        <div className="mt-4 flex-1 px-6">
          <Drawing key={animate ? runKey : "still"} play={play} flow={flow} />
        </div>
        <div className="mt-3 flex h-10 shrink-0 items-center justify-between gap-4 border-t border-lineSoft px-6 font-mono text-[10px] uppercase tracking-[0.08em] text-tertiary-text">
          <span className="truncate">{outcome.source}</span>
          <span className="shrink-0">{outcome.state}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* The stage                                                         */
/* ---------------------------------------------------------------- */
const DURATION_MS = 9000;

/* Where a card sits for its distance from the front (computed geometry,
   Rule 8). `w` is the stage width; the front card shrinks only to fit. */
const offset = (rp: number, n: number) => (rp === 0 ? 0 : rp <= n / 2 ? rp : rp - n);

function placement(rp: number, n: number, w: number): CSSProperties {
  const sc = Math.min(1, (w - 24) / CARD_W);
  const step = offset(rp, n);
  const d = Math.abs(step);
  const side = Math.sign(step);
  if (d === 0) return { transform: `translate(-50%, 0) scale(${sc})`, opacity: 1, zIndex: 30 };
  if (w < 768 || d > 2) return { transform: `translate(-50%, ${sc * 40}px) scale(${sc * 0.7})`, opacity: 0, zIndex: 0, pointerEvents: "none" };
  const x = side * w * (d === 1 ? 0.3 : 0.46);
  const s = sc * (d === 1 ? 0.84 : 0.7);
  // Shells stay opaque so a card never shows the one behind it through
  // itself; the card's contents carry the recession (CONTENT_FADE).
  return {
    transform: `translate(calc(-50% + ${x}px), ${d === 1 ? 22 : 44}px) rotate(${side * d * 1.2}deg) scale(${s})`,
    opacity: 1,
    zIndex: 30 - d * 10,
  };
}

/* How far a card's contents recede, by distance from the front. */
const CONTENT_FADE = [1, 0.4, 0.2];

export default function AkashicOutcomeCardsMockup({ content }: { content: OutcomeShowcase }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  // Off screen, nothing cycles (Rule 6a).
  const onScreen = useOnScreen(rootRef);
  const [active, setActive] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [width, setWidth] = useState(1152);
  const [held, setHeld] = useState(false);
  /* A reader who picks a card keeps it: the tour stops until Play (UX
     review, 23 Oct 2026: let visitors pick, and let them stop motion). */
  const [paused, setPaused] = useState(false);
  const { motion } = useUi();
  const modules = content.modules.slice(0, OUTCOMES.length);
  const n = modules.length;
  const cycling = !reduced && onScreen && !held && !paused;

  const select = (i: number) => {
    setActive(i);
    setResetKey((k) => k + 1);
    setPaused(true);
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!cycling) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % n), DURATION_MS);
    return () => clearTimeout(timer);
  }, [active, resetKey, cycling, n]);

  // The pipeline's travelling records are SMIL: they rest off screen.
  useEffect(() => {
    stageRef.current?.querySelectorAll("svg").forEach((svg) => (onScreen ? svg.unpauseAnimations() : svg.pauseAnimations()));
  }, [onScreen, active]);

  const sc = Math.min(1, (width - 24) / CARD_W);
  const current = modules[active];

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={content.label}
      className="relative z-10 mx-auto w-full max-w-[1152px]"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
    >
      {/* The stage. Decorative: the caption and the index carry the content. */}
      <div
        ref={stageRef}
        aria-hidden
        className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        style={{ height: Math.round(CARD_H * sc) + 34 }}
      >
        {modules.map((m, i) => {
          const rp = (i - active + n) % n;
          const front = rp === 0;
          return (
            <div
              key={m.module}
              onClick={() => !front && select(i)}
              className={`absolute left-1/2 top-0 transition-[transform,opacity] duration-500 ease-settle motion-reduce:transition-none ${front ? "" : "cursor-pointer"}`}
              style={{ width: CARD_W, height: CARD_H, transformOrigin: "center top", ...placement(rp, n, width) }}
            >
              <div className="pointer-events-none h-full w-full select-none">
                <OutcomeCard
                  module={m.module}
                  outcome={OUTCOMES[i]}
                  live={front}
                  fade={CONTENT_FADE[Math.abs(offset(rp, n))] ?? 0}
                  runKey={`${active}-${resetKey}`}
                  reduced={reduced}
                  flow={!reduced && Math.abs(offset(rp, n)) <= 1}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="relative z-40 mx-auto mt-3 min-h-[3rem] max-w-[56rem] px-4 text-center text-[13.5px] leading-relaxed text-secondary-text md:text-[14.5px]">
        <span key={active} className="inline-block animate-[ps-rise_420ms_cubic-bezier(0.2,0.8,0.2,1)_both] motion-reduce:animate-none">
          <span className="text-primary-text">{current.module}.</span> {current.caption}
        </span>{" "}
        <Link href={content.link.href} className="whitespace-nowrap font-medium text-blue underline-offset-4 hover:underline">
          {content.link.label}
        </Link>
      </p>

      <ContextTentacles
        nodes={modules.map(({ module, adds }) => ({ module, adds }))}
        active={active}
        resetKey={resetKey}
        durationMs={cycling ? DURATION_MS : 0}
        onSelect={select}
        control={<MotionToggle paused={paused} onToggle={() => setPaused((p) => !p)} controls={motion.tour} />}
      />
    </div>
  );
}
