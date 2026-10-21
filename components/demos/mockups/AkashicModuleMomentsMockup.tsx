"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * One MOMENT per module, not one screen. Two hosts: homepage [02], where the
 * seven-module rail drives `ModuleMomentStage` (21 Oct 2026, user: the
 * modules on the left, these drawings on the right, as the lead-in to the
 * solutions), and /akashic/1-0 "Generally available", which uses the default
 * export with its own index.
 * Built 15 Oct 2026 for the /akashic hero. On 20 Oct 2026 the founder asked
 * for the module screens back there (AkashicModuleScreensMockup) and for
 * this work to be reused, not discarded; homepage [02] hosted it briefly the
 * same day before the user restored the original [02].
 *
 * WHY (15 Oct 2026, founder direction): the live wireframes were good but
 * gave too much away. The stage that stood here (AkashicModuleScreensMockup)
 * was seven full app windows at 1058×690: browser bar, module rail, sidebar,
 * toolbar, avatars and run numbers, i.e. the product's whole layout.
 *
 * Second pass, same day (user: "they feel basic"): the first moments were one
 * white card template with key/value rows, seven times over. Each moment is
 * now its own drawing of the module's VERB, played in time:
 *   Data Pipelines    three record streams pass a join gate and fill one table
 *   Master Data  three spellings, match evidence, a golden record assembled
 *                field by field with each field's provenance
 *   Warehouse    the star schema, and one metric that BI, Ask and ML read
 *   ML           runs compete on the holdout; the winner opens the forecast
 *   Ask          the question types; the answer arrives as annotated text
 *   BI           a tile is built and lands on a dashboard whose other tiles
 *                stay withheld (the tease, drawn)
 *   Governance   one row, two roles: the tax_id masks at query time
 *
 * THE GRAMMAR, so the next page follows it:
 *   1. One moment per module: the mechanism, not the app. No app chrome.
 *   2. Cut, don't scale: native 9–16px type on a 960×320 drawing.
 *   3. Lines leave the frame: sources enter from beyond the left edge and
 *      outputs run out past the right, tagged with what lies off-frame.
 *   4. Colour encodes category: sky = Salesforce, amber = the sales plan,
 *      violet = NetSuite, blue = what Akashic produced.
 *   5. Motion is transform and opacity only (Rule 6a), from the `mm-*`
 *      keyframes in globals.css; loops are left to OffscreenAnimationGate.
 *
 * Every figure is lifted from the screen it replaced and belongs to the ONE
 * demo world in HeroProductScreensMockup (Sales Performance, Q2 FY26, USD).
 * Nothing here is new data. South's attainment is deliberately absent: the
 * /akashic [01] answer owns that story.
 */

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useOnScreen from "@/hooks/useOnScreen";

/* ---------------------------------------------------------------- */
/* Drawing kit                                                       */
/* ---------------------------------------------------------------- */
const C = {
  sf: "#2A9BE0", // Salesforce
  plan: "#E0A93B", // Sales plan, fiscal 2026
  ns: "#7C5CFC", // NetSuite
  blue: "rgb(var(--blue))",
  mute: "rgb(var(--tertiary-text) / 0.45)",
  blueLine: "rgb(var(--blue) / 0.55)",
};
const EASE = "cubic-bezier(0.2,0.8,0.2,1)";

/* Absolute placement in the 960×320 drawing. Computed geometry (Rule 8). */
const at = (x: number, y: number, extra?: CSSProperties): CSSProperties => ({ position: "absolute", left: x, top: y, ...extra });
const play = (name: string, delay: number, dur = 520, fill = "both"): CSSProperties => ({ animation: `${name} ${dur}ms ${EASE} ${delay}ms ${fill}` });

/* What lies off-frame, written just above its line. Positioned itself (a
   flex box, so no inherited line box nudges it down onto the line). `stack`
   puts the meta under the name where the frame edge is close. */
function Tag({ name, meta, color, upper = true, stack = false, style }: { name: string; meta?: string; color?: string; upper?: boolean; stack?: boolean; style?: CSSProperties }) {
  return (
    <span className={`flex whitespace-nowrap font-mono text-[10px] leading-none ${stack ? "flex-col items-start gap-1" : "items-center gap-1.5"}`} style={style}>
      <span className="flex items-center gap-1.5">
        {color && <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />}
        <span className={upper ? "uppercase tracking-[0.08em] text-secondary-text" : "text-secondary-text"}>{name}</span>
      </span>
      {meta && <span className="text-tertiary-text">{meta}</span>}
    </span>
  );
}

/* A hairline. `fade` drops it to nothing at the frame side it runs toward. */
function HLine({ x, y, w, fade, color = C.mute, delay = 0 }: { x: number; y: number; w: number; fade?: "in" | "out"; color?: string; delay?: number }) {
  const bg =
    fade === "in"
      ? `linear-gradient(to right, transparent, ${color} 45%)`
      : fade === "out"
        ? `linear-gradient(to left, transparent, ${color} 45%)`
        : color;
  return <span aria-hidden style={{ ...at(x, y, { width: w, height: 1, background: bg }), ...play("mm-fade", delay, 600) }} />;
}

/* Packets travelling a straight segment. `kind` decides the mark: a sharp
   dot, a source-coloured record capsule, or a three-part joined row. */
function Flow({ x, y, run, n = 3, dur = 3200, color = C.blue, kind = "dot", delay = 0 }: { x: number; y: number; run: number; n?: number; dur?: number; color?: string; kind?: "dot" | "capsule" | "joined"; delay?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const style = {
          ...at(x, y),
          "--run": `${run}px`,
          animation: `mm-run ${dur}ms linear ${delay + (i * dur) / n}ms infinite both`,
        } as CSSProperties;
        return (
          <span key={i} aria-hidden className="pointer-events-none motion-reduce:hidden" style={style}>
            {kind === "dot" && <span className="absolute -top-[2.5px] block h-[5px] w-[5px] rounded-full" style={{ background: color }} />}
            {kind === "capsule" && <span className="absolute -top-[3px] block h-[6px] w-[16px] rounded-full" style={{ background: color }} />}
            {kind === "joined" && (
              <span className="absolute -top-[3px] flex gap-px">
                <span className="block h-[6px] w-[9px] rounded-l-full" style={{ background: C.sf }} />
                <span className="block h-[6px] w-[9px]" style={{ background: C.plan }} />
                <span className="block h-[6px] w-[9px] rounded-r-full" style={{ background: C.ns }} />
              </span>
            )}
          </span>
        );
      })}
    </>
  );
}

const panel = "rounded-xl border border-card-line bg-[rgb(var(--screen-surface))] ";
const eyebrow = "font-mono text-[9px] uppercase tracking-[0.12em]";

/* Characters arriving one at a time: a typed prompt, without a width or
   clip animation. */
function Typed({ text, start, step = 24 }: { text: string; start: number; step?: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span key={i} style={play("mm-fade", start + i * step, 90)}>{ch}</span>
      ))}
      <span className="ml-px inline-block h-[1.05em] w-px translate-y-[0.15em] animate-[ps-caret-blink_1s_steps(1)_infinite] bg-blue" />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 01 Data Pipelines: three streams, one join, one table                  */
/* ---------------------------------------------------------------- */
function PipelinesMoment() {
  const lanes = [
    { y: 92, name: "Salesforce", meta: "82,400 orders", c: C.sf },
    { y: 160, name: "Sales plan 2026", meta: "60 targets", c: C.plan },
    { y: 228, name: "NetSuite", meta: "81,100 invoices", c: C.ns },
  ];
  return (
    <>
      {lanes.map((l, i) => (
        <Fragment key={l.name}>
          <HLine x={0} y={l.y} w={432} fade="in" delay={i * 90} />
          <Tag name={l.name} meta={l.meta} color={l.c} style={{ ...at(84, l.y - 17), ...play("mm-fade", 120 + i * 120) }} />
          <Flow x={-16} y={l.y} run={446} n={4} dur={3600} kind="capsule" color={l.c} delay={i * 340} />
        </Fragment>
      ))}

      {/* the join gate: three coloured inlets, one outlet */}
      <span className={eyebrow + " text-tertiary-text"} style={{ ...at(392, 42, { width: 100, textAlign: "center" }), ...play("mm-fade", 300) }}>Join</span>
      <span style={{ ...at(430, 62, { width: 24, height: 196, transformOrigin: "center" }), ...play("mm-growy", 220, 700) }} className="rounded-full border border-default-stroke bg-[rgb(var(--screen-surface))]">
        {lanes.map((l) => (
          <span key={l.y} className="absolute left-[8px] h-[6px] w-[6px] rounded-full" style={{ top: l.y - 62 - 3, background: l.c }} />
        ))}
      </span>
      <span className="font-mono text-[9.5px] text-tertiary-text" style={{ ...at(332, 270, { width: 220, textAlign: "center" }), ...play("mm-fade", 520) }}>
        on order_no · region + month
      </span>

      {/* joined rows flow into the table */}
      <HLine x={455} y={160} w={154} color={C.blueLine} delay={600} />
      <Flow x={458} y={160} run={128} n={3} dur={2400} kind="joined" delay={900} />

      <div className={panel + " overflow-hidden"} style={{ ...at(610, 86, { width: 200 }), ...play("mm-slide", 700, 600) }}>
        <div className="flex items-center justify-between border-b border-card-line px-3 py-2">
          <span className="font-mono text-[11px] font-semibold text-primary-text">fact_sales</span>
          <span className="font-mono text-[9px] text-tertiary-text">1 row per sale</span>
        </div>
        <div className="grid grid-cols-3 gap-x-2 px-3 pt-2 font-mono text-[8.5px] uppercase tracking-[0.08em]">
          <span style={{ color: C.sf }}>order</span>
          <span style={{ color: C.plan }}>plan</span>
          <span style={{ color: C.ns }}>invoice</span>
        </div>
        <div className="space-y-[7px] px-3 pb-2.5 pt-2">
          {[0, 1, 2, 3, 4].map((r) => (
            <div key={r} className="grid grid-cols-3 gap-x-2" style={play("mm-slide", 1000 + r * 170, 420)}>
              {[C.sf, C.plan, C.ns].map((c) => (
                <span key={c} className="block h-[5px] rounded-full" style={{ background: c, opacity: 0.75 - r * 0.1 }} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 border-t border-card-line px-3 py-1.5 font-mono text-[9.5px] text-secondary-text">
          <span className="h-1.5 w-1.5 animate-[softpulse_2.4s_infinite] rounded-full bg-positive" />
          82,401 rows · 0 rejected
        </div>
      </div>

      <HLine x={811} y={160} w={149} fade="out" color={C.blueLine} delay={1600} />
      <Flow x={814} y={160} run={150} n={2} dur={2600} delay={1800} />
      <Tag name="Sales Performance" meta="3 dashboards" upper={false} stack style={{ ...at(826, 128), ...play("mm-fade", 1700) }} />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 02 Master Data: three spellings resolve to one golden record      */
/* ---------------------------------------------------------------- */
function MasterDataMoment() {
  const recs = [
    { y: 62, src: "Salesforce · #4471", name: "Whitmore Retail", attrs: "tax_id 94-2404110 · Harbor Blvd", c: C.sf, match: "tax_id · exact" },
    { y: 134, src: "NetSuite · #4471-B", name: "Whitmore Retail Pvt", attrs: "tax_id 94-2404110 · Ste 2 · net-45", c: C.ns, match: "tax_id · exact" },
    { y: 206, src: "Invoice PDF · bill-to", name: "WHITMORE RETAIL", attrs: "no tax_id", c: C.plan, match: "fuzzy · 0.97" },
  ];
  const fields = [
    { k: "tax_id", v: <span className="font-mono text-[11px]">94-2404110</span>, why: "exact match" },
    { k: "address", v: "500 Harbor Blvd, Ste 2", why: "most recent" },
    { k: "terms", v: "net-45", why: "prefer finance system" },
  ];
  return (
    <>
      {recs.map((r, i) => {
        const mid = r.y + 24;
        return (
          <Fragment key={r.src}>
            <HLine x={0} y={mid} w={40} fade="in" delay={i * 90} />
            <div style={{ ...at(44, r.y, { width: 250 }), animation: `mm-slide 520ms ${EASE} ${100 + i * 140}ms both, mm-dim 700ms ${EASE} ${3500 + i * 80}ms forwards` }} className="flex gap-3">
              <span className="w-[2px] shrink-0 rounded-full" style={{ background: r.c }} />
              <div className="min-w-0">
                <div className={eyebrow} style={{ color: r.c }}>{r.src}</div>
                <div className="mt-1 text-[14px] font-medium leading-tight text-primary-text">{r.name}</div>
                <div className="mt-1 font-mono text-[9.5px] text-tertiary-text">{r.attrs}</div>
              </div>
            </div>
          </Fragment>
        );
      })}

      {/* match evidence, drawn on the lines it justifies */}
      <svg aria-hidden width={960} height={320} className="absolute left-0 top-0 overflow-visible">
        {recs.map((r, i) => {
          const y = r.y + 24;
          return (
            <path
              key={r.src}
              d={`M272 ${y} L 404 ${y} C 450 ${y}, 462 160, 512 160`}
              fill="none"
              stroke={i === 2 ? C.mute : C.blueLine}
              strokeWidth={1}
              strokeDasharray={i === 2 ? "3 3" : undefined}
              style={play("mm-fade", 700 + i * 150, 600)}
            />
          );
        })}
      </svg>
      {recs.map((r, i) => {
        const y = r.y + 24;
        return (
          <span key={r.match + i} className="flex rounded-full border border-card-line bg-[rgb(var(--screen-surface))] px-2 py-[3px] font-mono text-[9px] leading-none text-secondary-text" style={{ ...at(300, y - 8), ...play("mm-fade", 1050 + i * 150) }}>
            {r.match}
          </span>
        );
      })}

      {/* the resolver */}
      <span style={{ ...at(510, 153, { width: 14, height: 14 }), ...play("mm-fade", 1500) }} className="rounded-full border border-blue bg-[rgb(var(--screen-surface))]">
        <span className="absolute inset-[3.5px] rounded-full bg-blue" />
      </span>
      <span className={eyebrow + " text-tertiary-text"} style={{ ...at(467, 176, { width: 100, textAlign: "center" }), ...play("mm-fade", 1600) }}>survivorship</span>
      <HLine x={526} y={160} w={78} color={C.blueLine} delay={1700} />

      {/* the golden record, assembled field by field */}
      <div className={panel + " overflow-hidden border-blue/35"} style={{ ...at(604, 58, { width: 300 }), ...play("mm-slide", 1800, 600) }}>
        <div className="flex items-center justify-between px-4 pt-3">
          <span className={eyebrow + " text-blue"}>Golden record</span>
          <span className="font-mono text-[9.5px] text-tertiary-text">CU-9042</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[16px] font-semibold tracking-tight text-primary-text">Whitmore Retail</div>
        {fields.map((f, i) => (
          <div key={f.k} className="grid grid-cols-[58px_1fr_auto] items-baseline gap-x-3 border-t border-card-line px-4 py-[7px]" style={play("mm-slide", 2150 + i * 220, 460)}>
            <span className="font-mono text-[9.5px] text-tertiary-text">{f.k}</span>
            <span className="truncate text-[12px] text-primary-text">{f.v}</span>
            <span className="font-mono text-[9px] text-blue">{f.why}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 border-t border-card-line px-4 py-2 text-[10.5px] text-secondary-text" style={play("mm-fade", 2900)}>
          <span className="h-1.5 w-1.5 animate-[softpulse_2.4s_infinite] rounded-full bg-positive" />
          Confidence 0.98 · 3 sources · steward approved
        </div>
      </div>

      <span className="font-mono text-[9.5px] text-tertiary-text" style={{ ...at(58, 272), ...play("mm-fade", 3700) }}>2 superseded · lineage kept</span>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 03 Warehouse: one star schema, one metric, every surface          */
/* ---------------------------------------------------------------- */
function WarehouseMoment() {
  const dims = [
    { x: 40, y: 58, name: "Customer", rows: "12,447" },
    { x: 40, y: 222, name: "Region", rows: "5" },
    { x: 372, y: 58, name: "Product", rows: "3,412" },
    { x: 372, y: 222, name: "Date", rows: "1,096" },
  ];
  const links = [
    { d: "M168 78 L 236 126", one: [176, 70], n: [222, 108] },
    { d: "M168 242 L 236 194", one: [176, 246], n: [222, 202] },
    { d: "M372 78 L 306 126", one: [356, 70], n: [312, 108] },
    { d: "M372 242 L 306 194", one: [356, 246], n: [312, 202] },
  ];
  const surfaces = [
    { y: 116, name: "Business Intelligence", meta: "Sales Overview" },
    { y: 160, name: "Ask Akashic", meta: "answers" },
    { y: 204, name: "Machine Learning", meta: "demand_forecast" },
  ];
  return (
    <>
      <svg aria-hidden width={960} height={320} className="absolute left-0 top-0 overflow-visible">
        {links.map((l, i) => (
          <g key={l.d} style={play("mm-fade", 500 + i * 120, 600)}>
            <path d={l.d} stroke={C.mute} strokeWidth={1} fill="none" />
            <text x={l.one[0]} y={l.one[1]} className="fill-tertiary-text font-mono text-[9px]">1</text>
            <text x={l.n[0]} y={l.n[1]} className="fill-tertiary-text font-mono text-[9px]">N</text>
          </g>
        ))}
      </svg>
      {dims.map((d, i) => (
        <div key={d.name} className="flex items-center justify-between rounded-lg border border-card-line bg-[rgb(var(--screen-surface))] px-3" style={{ ...at(d.x, d.y, { width: 128, height: 40 }), ...play("mm-slide", 150 + i * 110) }}>
          <span className="text-[12px] font-medium text-primary-text">{d.name}</span>
          <span className="font-mono text-[9.5px] text-tertiary-text">{d.rows}</span>
        </div>
      ))}
      <div className={panel + " flex flex-col justify-center px-4"} style={{ ...at(196, 126, { width: 150, height: 68 }), ...play("mm-fade", 350, 600) }}>
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-primary-text">Sales</span>
          <span className="rounded bg-blue-subtle px-1.5 py-0.5 font-mono text-[8.5px] text-blue">FACT</span>
        </div>
        <span className="mt-1 font-mono text-[9.5px] text-tertiary-text">82,401 rows</span>
      </div>

      <HLine x={346} y={160} w={214} color={C.blueLine} delay={1100} />
      <Flow x={350} y={160} run={196} n={2} dur={2600} delay={1300} />

      {/* the metric, typeset once */}
      <div className={panel + " overflow-hidden border-blue/35"} style={{ ...at(560, 92, { width: 200 }), ...play("mm-slide", 1300, 600) }}>
        <div className="flex items-center justify-between px-4 pt-3">
          <span className={eyebrow + " text-blue"}>Metric</span>
          <span className="font-mono text-[9px] text-tertiary-text">verified · v1.4</span>
        </div>
        <div className="px-4 pt-1.5 text-[16px] font-semibold tracking-tight text-primary-text">Revenue</div>
        <div className="px-4 pt-1 font-mono text-[12px] text-primary-text">= Σ paid value</div>
        <div className="mt-2.5 border-t border-card-line px-4 py-2 font-mono text-[9.5px] text-tertiary-text">grain · one completed sale</div>
      </div>

      {surfaces.map((s, i) => (
        <Fragment key={s.name}>
          <HLine x={760} y={s.y} w={200} fade="out" color={C.blueLine} delay={2000 + i * 200} />
          <Flow x={764} y={s.y} run={196} n={2} dur={2800} delay={2300 + i * 260} />
          <Tag name={s.name} meta={s.meta} upper={false} stack style={{ ...at(790, s.y - 28), ...play("mm-fade", 2100 + i * 200) }} />
        </Fragment>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 04 ML: runs compete on the holdout, the winner forecasts          */
/* ---------------------------------------------------------------- */
function MlMoment() {
  const runs = [
    { id: "#19", mape: "9.8%", pts: "410,192 450,150 490,148 530,128 560,122" },
    { id: "#22", mape: "7.4%", pts: "410,192 450,160 490,162 530,142 560,136" },
    { id: "#23", mape: "6.9%", pts: "410,192 450,166 490,170 530,150 560,146" },
    { id: "#24", mape: "6.2%", pts: "410,192 450,172 490,177 530,159 560,154", best: true },
  ];
  const months = ["July", "August", "September", "October", "November", "December"];
  return (
    <>
      {/* leaderboard: each row lands with its line */}
      <div style={{ ...at(64, 74, { width: 150 }), ...play("mm-fade", 600) }} className={eyebrow + " text-tertiary-text"}>Runs · forecast error</div>
      {runs.map((r, i) => (
        <div key={r.id} className="flex items-center gap-3 font-mono text-[11px]" style={{ ...at(64, 96 + i * 22, { width: 160 }), ...play("mm-slide", 1000 + i * 420, 420) }}>
          <span className={r.best ? "text-blue" : "text-tertiary-text"}>{r.id}</span>
          <span className={r.best ? "font-semibold text-primary-text" : "text-secondary-text"}>{r.mape}</span>
          {r.best && <span className="rounded bg-positive-subtle px-1.5 py-0.5 text-[8.5px] text-positive-text">live</span>}
        </div>
      ))}
      <HLine x={0} y={248} w={246} fade="in" delay={200} />
      <Flow x={-10} y={248} run={250} n={3} dur={3000} />
      <Tag name="Feature store" meta="42 governed features" style={{ ...at(64, 231), ...play("mm-fade", 300) }} />

      <svg aria-hidden width={960} height={320} className="absolute left-0 top-0 overflow-visible">
        <rect x={410} y={48} width={150} height={214} className="fill-tertiary-bg/70" style={play("mm-fade", 600, 600)} />
        <text x={416} y={62} className="fill-tertiary-text font-mono text-[8.5px] tracking-[0.1em]" style={play("mm-fade", 700)}>TEST PERIOD · 12 WEEKS</text>
        <line x1={250} y1={262} x2={750} y2={262} stroke={C.mute} strokeWidth={1} style={play("mm-fade", 100)} />
        {months.map((m, i) => (
          <text key={m} x={250 + i * 100} y={278} textAnchor="middle" className="fill-tertiary-text font-mono text-[9px]" style={play("mm-fade", 150)}>{m}</text>
        ))}
        <polyline points="250,214 290,200 330,207 370,186 410,192 450,174 490,180 530,162 560,156" fill="none" className="stroke-primary-text" strokeWidth={1.75} strokeLinejoin="round" style={play("mm-fade", 250, 600)} />
        {runs.map((r, i) => (
          <polyline
            key={r.id}
            points={r.pts}
            fill="none"
            stroke={r.best ? C.blue : C.mute}
            strokeWidth={r.best ? 1.5 : 1}
            strokeDasharray={r.best ? undefined : "3 3"}
            strokeLinejoin="round"
            style={play("mm-fade", 1000 + i * 420, 500)}
          />
        ))}
        <line x1={560} y1={44} x2={560} y2={262} stroke={C.blueLine} strokeDasharray="2 3" style={play("mm-fade", 2700)} />
        <text x={566} y={52} className="fill-blue font-mono text-[9px]" style={play("mm-fade", 2700)}>today</text>
        {/* the p10–p90 fan opens from today */}
        <polygon points="560,156 750,100 750,164" className="fill-blue/10" style={{ transformBox: "fill-box", transformOrigin: "left center", ...play("progressFill", 2950, 900) }} />
        <polyline points="560,156 750,132" fill="none" stroke={C.blue} strokeWidth={1.75} strokeDasharray="5 4" style={play("mm-fade", 3100)} />
      </svg>
      <span className="rounded-md border border-card-line bg-[rgb(var(--screen-surface))] px-2 py-1 text-[11px] font-medium text-primary-text " style={{ ...at(762, 120), ...play("mm-slide", 3500) }}>
        ≈12,400 units next quarter
      </span>

      <HLine x={754} y={236} w={206} fade="out" color={C.blueLine} delay={3700} />
      <Flow x={758} y={236} run={200} n={2} dur={2600} delay={3900} />
      <Tag name="Model 3 in use" meta="1.2 million forecasts a day" upper={false} stack style={{ ...at(776, 205), ...play("mm-fade", 3800) }} />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 05 Ask Akashic: the answer as annotated text                      */
/* ---------------------------------------------------------------- */
function Cited({ children, n, delay }: { children: ReactNode; n: number; delay: number }) {
  return (
    <>
      {/* nowrap: an absolute underline on a span that wraps only spans its
          first line box */}
      <span className="relative whitespace-nowrap">
        {children}
        <span className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] origin-left bg-blue" style={play("progressFill", delay, 600)} />
      </span>
      <sup className="ml-0.5 font-mono text-[10px] font-semibold text-blue" style={play("mm-fade", delay + 300)}>{n}</sup>
    </>
  );
}

/* Revenue share by channel, Q2 FY26: the canonical split from the Ask screen
   it replaces. Online is the answer, so it is the only coloured segment. */
const CHANNELS = [
  { name: "Direct", pct: 46 },
  { name: "Partner", pct: 32 },
  { name: "Online", pct: 22, answer: true },
];

function AskMoment() {
  const X = 236;
  return (
    <>
      <div style={{ ...at(X, 34, { width: 360 }), ...play("mm-fade", 0) }} className={eyebrow + " text-tertiary-text"}>Ask Akashic · Sales Performance</div>
      <div style={at(X, 54, { width: 360 })} className="text-[14px] leading-snug text-secondary-text">
        <Typed text="Which channel is growing fastest this quarter?" start={250} step={22} />
      </div>
      <span style={{ ...at(X, 84, { width: 360, height: 1 }), ...play("mm-fade", 200) }} className="bg-card-line" />

      <p style={{ ...at(X, 98, { width: 360 }), ...play("mm-slide", 1500, 600) }} className="text-[16px] leading-[1.55] tracking-[-0.005em] text-primary-text">
        Online is your fastest-growing channel, <Cited n={1} delay={2300}>up 18% quarter on quarter</Cited> and now <Cited n={2} delay={2700}>22% of revenue</Cited>.
      </p>

      <span style={{ ...at(X, 196, { width: 360, height: 1, transformOrigin: "left" }), ...play("progressFill", 3000, 600) }} className="bg-card-line" />
      {[
        { n: "1", t: "net_revenue · gold · warehouse" },
        { n: "2", t: "share = channel_revenue ÷ net_revenue" },
      ].map((f, i) => (
        <div key={f.n} className="flex gap-2.5 font-mono text-[10px]" style={{ ...at(X, 208 + i * 20, { width: 360 }), ...play("mm-slide", 3200 + i * 180, 420) }}>
          <span className="font-semibold text-blue">{f.n}</span>
          <span className="text-secondary-text">{f.t}</span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 text-[10.5px] text-tertiary-text" style={{ ...at(X, 258), ...play("mm-fade", 3700) }}>
        <span className="h-1.5 w-1.5 animate-[softpulse_2.4s_infinite] rounded-full bg-positive" />
        Row-level access applied · answered in 1.4s
      </div>

      {/* the cited sources sit off-frame; their lines run in to the notes */}
      <HLine x={0} y={214} w={X - 12} fade="in" delay={3300} />
      <HLine x={0} y={234} w={X - 12} fade="in" delay={3480} />
      <Flow x={-10} y={214} run={X} n={2} dur={2800} delay={3500} />
      <Flow x={-10} y={234} run={X} n={2} dur={2800} delay={3900} />

      {/* the evidence the answer stands on */}
      <div style={{ ...at(650, 104, { width: 250 }), ...play("mm-fade", 1900) }}>
        <div className={eyebrow + " text-tertiary-text"}>Share of $25.4 million this quarter</div>
        <div className="mt-3 flex h-2 gap-[3px]">
          {CHANNELS.map((c, i) => (
            <span
              key={c.name}
              className={`block h-full origin-left rounded-full ${c.answer ? "bg-blue" : "bg-tertiary-text/30"}`}
              style={{ width: `${c.pct}%`, ...play("progressFill", 2100 + i * 160, 520) }}
            />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          {CHANNELS.map((c, i) => (
            <div key={c.name} className="flex items-baseline justify-between text-[12px]" style={play("mm-slide", 2300 + i * 140, 420)}>
              <span className={c.answer ? "font-medium text-primary-text" : "text-secondary-text"}>{c.name}</span>
              <span className="flex items-baseline gap-2 font-mono text-[11px]">
                {c.answer && <span className="text-[10px] text-positive-text">+18% this quarter</span>}
                <span className={c.answer ? "font-semibold text-blue" : "text-secondary-text"}>{c.pct}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 06 BI: a tile is built, and lands on a withheld dashboard          */
/* ---------------------------------------------------------------- */
const PLAN_D = "M0 44 L18 40 L36 38 L54 33 L72 30 L90 26 L108 24 L126 20 L144 17 L162 14 L180 11 L200 8";
const ACTUAL_D = "M0 52 L18 46 L36 48 L54 40 L72 43 L90 34 L108 38 L126 30 L144 35 L162 26 L180 30 L200 22";

function TileChart({ height, delay, axis = true }: { height: number; delay: number; axis?: boolean }) {
  return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="block w-full" style={{ height }} aria-hidden>
      {axis && [20, 40, 60].map((y) => <line key={y} x1={0} y1={y} x2={200} y2={y} className="stroke-tertiary-bg" strokeWidth={1} vectorEffect="non-scaling-stroke" />)}
      <path d={PLAN_D} fill="none" className="stroke-tertiary-text" strokeWidth={1.4} strokeDasharray="4 3" vectorEffect="non-scaling-stroke" style={play("mm-fade", delay, 500)} />
      <path d={`${ACTUAL_D} L200 80 L0 80 Z`} className="fill-blue/10" style={play("mm-fade", delay + 600, 600)} />
      <path d={ACTUAL_D} fill="none" className="stroke-blue" strokeWidth={1.8} strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={play("mm-fade", delay + 300, 500)} />
    </svg>
  );
}

function BiMoment() {
  return (
    <>
      <div style={{ ...at(48, 96, { width: 290 }), ...play("mm-fade", 0) }} className={eyebrow + " text-tertiary-text"}>Ask Akashic · Sales Overview</div>
      <div style={at(48, 116, { width: 290 })} className="text-[13.5px] text-primary-text">
        <Typed text="Add a tile: revenue against plan, weekly" start={200} step={24} />
      </div>
      <span style={{ ...at(48, 142, { width: 290, height: 1 }), ...play("mm-fade", 100) }} className="bg-card-line" />
      {["net_revenue · gold", "plan_attainment · target 100%"].map((m, i) => (
        <span key={m} className="inline-block rounded-full border border-card-line bg-[rgb(var(--screen-surface))] px-2 py-[3px] font-mono text-[9px] text-secondary-text" style={{ ...at(48 + i * 116, 156), ...play("mm-fade", 1150 + i * 160) }}>{m}</span>
      ))}
      <HLine x={0} y={124} w={40} fade="in" delay={100} />

      <HLine x={338} y={163} w={36} color={C.blueLine} delay={1300} />

      {/* the tile, built */}
      <div className={panel + " px-4 pb-3 pt-3"} style={{ ...at(374, 60, { width: 268 }), ...play("mm-slide", 1350, 600) }}>
        <div className="flex items-baseline justify-between">
          <span className="text-[12.5px] font-semibold text-primary-text">Revenue against plan</span>
          <span className="font-mono text-[9px] text-tertiary-text">$ million · weekly</span>
        </div>
        {/* gridlines sit at 25/50/75% of the plot; the labels sit on them */}
        <div className="relative mt-3 h-[124px]">
          {[["2.4", "25%"], ["1.6", "50%"], ["0.8", "75%"]].map(([v, top]) => (
            <span key={v} className="absolute left-0 -translate-y-1/2 font-mono text-[8px] text-tertiary-text" style={{ top }}>{v}</span>
          ))}
          <div className="absolute inset-y-0 left-9 right-9"><TileChart height={124} delay={1800} /></div>
          {/* lines labelled where they end, in place of a legend */}
          <span className="absolute right-0 font-mono text-[8.5px] text-tertiary-text" style={{ top: "6%", ...play("mm-fade", 2100) }}>plan</span>
          <span className="absolute right-0 font-mono text-[8.5px] font-medium text-blue" style={{ top: "24%", ...play("mm-fade", 2400) }}>actual</span>
        </div>
        <div className="ml-9 mr-9 mt-1.5 flex justify-between font-mono text-[8.5px] text-tertiary-text">
          {["Week 1", "Week 4", "Week 8", "Week 12"].map((w) => <span key={w}>{w}</span>)}
        </div>
      </div>

      {/* the dashboard: one slot filled, the rest withheld */}
      <div className="rounded-xl border border-dashed border-default-stroke p-3" style={{ ...at(690, 70, { width: 232, height: 180 }), ...play("mm-fade", 900, 600) }}>
        <div className={eyebrow + " mb-2.5 text-tertiary-text"}>Sales Overview</div>
        <div className="grid grid-cols-2 gap-2">
          <div className={panel + " relative h-[62px] overflow-hidden rounded-lg border-blue/35 p-1.5"} style={{ "--dx": "-300px", "--dy": "10px", "--s": "2.6", ...play("mm-land", 3000, 800) } as CSSProperties}>
            <TileChart height={46} delay={3400} axis={false} />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[62px] rounded-lg border border-dashed border-default-stroke/80" />
          ))}
        </div>
      </div>
      <HLine x={922} y={160} w={38} fade="out" delay={3600} />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 07 Governance: traced in, traced out, masked by role              */
/* ---------------------------------------------------------------- */
function GovernanceMoment() {
  const ins = [
    { y: 116, name: "sf.orders", meta: "Salesforce", c: C.sf },
    { y: 156, name: "ns.invoices", meta: "NetSuite", c: C.ns },
  ];
  const outs = [
    { y: 110, name: "tableau_sales", meta: "dashboard" },
    { y: 160, name: "demand_forecast", meta: "model" },
    { y: 210, name: "finance_ledger", meta: "table" },
  ];
  const row = "grid grid-cols-[64px_1fr_124px] items-center gap-x-3 border-t border-card-line px-4 py-2.5";
  return (
    <>
      {ins.map((l, i) => (
        <Fragment key={l.name}>
          <HLine x={0} y={l.y} w={306} fade="in" delay={i * 100} />
          <Flow x={-10} y={l.y} run={312} n={3} dur={3200} kind="capsule" color={l.c} delay={i * 400} />
          <Tag name={l.name} meta={l.meta} color={l.c} upper={false} style={{ ...at(84, l.y - 17), ...play("mm-fade", 150 + i * 120) }} />
        </Fragment>
      ))}

      <div className={panel + " overflow-hidden"} style={{ ...at(310, 66, { width: 340 }), ...play("mm-slide", 300, 600) }}>
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className="font-mono text-[11px] font-semibold text-primary-text">fact_sales <span className="font-normal text-tertiary-text">· gold</span></span>
          <span className="rounded bg-blue-subtle px-1.5 py-0.5 font-mono text-[8.5px] text-blue">Tier 1</span>
        </div>
        <div className={"grid grid-cols-[64px_1fr_124px] gap-x-3 border-t border-card-line px-4 py-1.5 text-tertiary-text " + eyebrow}>
          <span>Seen by</span><span>customer</span><span>tax_id</span>
        </div>
        <div className={row} style={play("mm-slide", 700, 420)}>
          <span className="w-fit rounded bg-tertiary-bg px-1.5 py-0.5 text-[10px] text-secondary-text">Finance</span>
          <span className="truncate text-[12px] text-primary-text">Whitmore Retail</span>
          <span className="font-mono text-[11px] text-primary-text">94-2404110</span>
        </div>
        <div className={row} style={play("mm-slide", 900, 420)}>
          <span className="w-fit rounded bg-tertiary-bg px-1.5 py-0.5 text-[10px] text-secondary-text">Analyst</span>
          <span className="truncate text-[12px] text-primary-text">Whitmore Retail</span>
          <span className="relative flex items-center gap-2 font-mono text-[11px]">
            <span className="relative">
              <span className="text-primary-text" style={play("mm-out", 1900, 300)}>94-2404110</span>
              <span className="absolute left-0 top-0 text-tertiary-text" style={play("mm-fade", 2100, 300)}>••-•••••••</span>
            </span>
            <span className="rounded bg-red/10 px-1 py-px text-[8.5px] text-red" style={play("mm-slide", 2400, 360)}>masked</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 border-t border-card-line px-4 py-2 text-[10.5px] text-secondary-text" style={play("mm-fade", 2700)}>
          <span className="h-1.5 w-1.5 animate-[softpulse_2.4s_infinite] rounded-full bg-positive" />
          Row-level security · 4,211 events audited
        </div>
      </div>

      {outs.map((o, i) => (
        <Fragment key={o.name}>
          <HLine x={650} y={o.y} w={310} fade="out" color={C.blueLine} delay={1300 + i * 160} />
          <Flow x={654} y={o.y} run={306} n={2} dur={3000} delay={1600 + i * 300} />
          <Tag name={o.name} meta={o.meta} upper={false} style={{ ...at(700, o.y - 17), ...play("mm-fade", 1400 + i * 160) }} />
        </Fragment>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------- */
/* The stage                                                         */
/* ---------------------------------------------------------------- */
type Moment = {
  module: string;
  caption: string;
  /* Centre of the crop on a phone, in drawing px: the part that carries
     the claim when only ~360px of the 960px drawing fits. */
  focus: number;
  Draw: () => ReactNode;
};

const MOMENTS: Moment[] = [
  { module: "Data Pipelines", caption: "Three sources join into one governed table. Nothing rejected.", focus: 700, Draw: PipelinesMoment },
  { module: "Master Data", caption: "Three spellings, one record. Every field keeps its source.", focus: 754, Draw: MasterDataMoment },
  { module: "Warehouse", caption: "A metric defined once. Dashboards, answers and forecasts all read the same one.", focus: 640, Draw: WarehouseMoment },
  { module: "Machine Learning", caption: "Models are tested on past data. The most accurate one makes the forecast.", focus: 600, Draw: MlMoment },
  { module: "Ask Akashic", caption: "Plain questions, answered from governed metrics, every figure cited.", focus: 416, Draw: AskMoment },
  { module: "Business Intelligence", caption: "Ask for a chart. It is built on the agreed figures and lands on the dashboard.", focus: 508, Draw: BiMoment },
  { module: "Governance", caption: "Every field traced to its source. Private details hidden by role.", focus: 480, Draw: GovernanceMoment },
];

const N = MOMENTS.length;
const MOMENT_DURATION_MS = 8500;

/**
 * One module's moment, by its index in MOMENTS (the platform's module order:
 * a page that drives the stage lists its own copy in the same order), fitted
 * to its container and replayed from the start
 * whenever `index` or `playKey` changes. Decorative (aria-hidden): the page
 * around it says what the module does. Wide containers show the whole
 * drawing scaled down; narrow ones crop around the moment's focus at 0.82,
 * so the small type stays legible.
 */
export function ModuleMomentStage({ index, playKey = 0, caption = false }: { index: number; playKey?: number; caption?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(960);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const m = MOMENTS[index];
  const Draw = m.Draw;
  const narrow = width < 600;
  const scale = narrow ? 0.82 : Math.min(1, width / 960);
  const fx = narrow ? m.focus : 480;

  return (
    <figure className="w-full">
      <div
        ref={ref}
        aria-hidden
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        style={{ height: Math.round(330 * scale) }}
      >
        <div
          key={`${index}-${playKey}`}
          className="absolute left-1/2 top-1/2 h-[320px] w-[960px]"
          style={{ transform: `translate(${-fx}px, -50%) scale(${scale})`, transformOrigin: `${fx}px 50%` }}
        >
          <Draw />
        </div>
      </div>
      {caption && (
        <figcaption key={`${index}-${playKey}`} className="mt-4 animate-[ps-rise_420ms_cubic-bezier(0.2,0.8,0.2,1)_both] px-4 text-center text-[13.5px] leading-relaxed text-uc-mute">
          {m.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function AkashicModuleMomentsMockup() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  // Off screen, nothing cycles (Rule 6a). The drawings' loops are plain CSS,
  // so OffscreenAnimationGate holds them off screen and mid-scroll.
  const onScreen = useOnScreen(rootRef);
  const [active, setActive] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const select = (i: number) => {
    setActive(i);
    setResetKey((k) => k + 1);
  };

  useEffect(() => {
    if (reduced || !onScreen) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % N), MOMENT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [active, resetKey, reduced, onScreen]);

  const m = MOMENTS[active];
  const Draw = m.Draw;

  return (
    <div ref={rootRef} className="relative z-10 mx-auto w-full max-w-[1152px] pb-2 pt-2">
      {/* The stage. No window and no box: the drawing sits on the hero's dot
          grid, which fades with the lines, so the frame is implied by what
          disappears. Decorative; the caption below carries the claim. */}
      <div
        aria-hidden
        className="relative mx-auto h-[330px] w-full max-w-[1000px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        
        {/* Phones see ~400 drawing px around the moment's focus, at 0.88 so a
            360px text column still fits; scaled about the focus itself so the
            crop stays where it was aimed. md and up: native size, centred. */}
        <div
          key={`${active}-${resetKey}`}
          className="absolute left-1/2 top-1/2 h-[320px] w-[960px] [--fx:var(--fm)] [--sc:0.88] md:[--fx:480px] md:[--sc:1]"
          style={{ "--fm": `${m.focus}px`, transform: "translate(calc(var(--fx) * -1), -50%) scale(var(--sc))", transformOrigin: "var(--fx) 50%" } as CSSProperties}
        >
          <Draw />
        </div>
      </div>

      <p className="mx-auto mt-3 min-h-[4.2rem] max-w-[56rem] px-4 text-center text-[13.5px] leading-relaxed text-secondary-text md:text-[14.5px] lg:min-h-0">
        <span key={active} className="inline-block animate-[ps-rise_420ms_cubic-bezier(0.2,0.8,0.2,1)_both]">
          <span className="text-primary-text">{m.module}.</span> {m.caption}
        </span>{" "}
        <Link href="#talk-to-our-team" className="whitespace-nowrap font-medium text-blue underline-offset-4 hover:underline">
          See it with your own data
        </Link>
      </p>

      {/* The module index, under the drawing it controls. */}
      <div className="mx-auto mt-6 flex w-fit max-w-full items-center gap-5 overflow-x-auto px-4 [scrollbar-width:none] lg:gap-7 [&::-webkit-scrollbar]:hidden">
        {MOMENTS.map((mo, i) => {
          const isActive = active === i;
          return (
            <button
              key={mo.module}
              type="button"
              onClick={() => select(i)}
              aria-pressed={isActive}
              className={`group relative flex shrink-0 items-baseline gap-1.5 whitespace-nowrap pb-2.5 text-[14.5px] tracking-tight transition-colors duration-200 ${
                isActive ? "font-semibold text-primary-text" : "font-normal text-tertiary-text hover:text-secondary-text"
              }`}
            >
              <span className={`font-mono text-[10px] font-normal ${isActive ? "text-blue" : "text-tertiary-text"}`}>{String(i + 1).padStart(2, "0")}</span>
              {mo.module}
              <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-tertiary-text/15" />
              {isActive && (
                <span
                  key={resetKey}
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-full origin-left bg-blue"
                  style={{ animation: `progressFill ${MOMENT_DURATION_MS}ms linear forwards` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
