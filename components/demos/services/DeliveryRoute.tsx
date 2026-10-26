"use client";

/*
 * The services hero drawing: one engagement, left to right.
 *
 *   lanes       brackets over the run, as on the /akashic agents rail:
 *               your systems, one DHIRA team, in production
 *   sources     the sample business's systems enter from beyond the frame,
 *               colour = source system (homepage [02] cards)
 *   rail        the team's four stages on one blue line; Launch is filled
 *   outcomes    three things running in production, cropped by nothing,
 *               each named for the people who use it
 *   handover    after Launch the line turns ink and leaves the frame:
 *               your team runs it
 *
 * From lg it is one SVG; below lg the same parts stack as HTML so every
 * label stays at a readable size. Draws in once (useDrawn + .ad-* kit);
 * reduced motion lands on the final state. No figures: the outcomes are
 * named, not measured.
 */

import type { CSSProperties } from "react";
import useDrawn from "@/hooks/useDrawn";
import { SOURCE_COLOUR } from "@/components/demos/services/sources";
import type { ServicesPage } from "@/content/pages/services";

const delay = (s: number) => ({ "--ad-delay": `${s}s` }) as CSSProperties;

const JOIN = { x: 372, y: 171 };
const RAIL_END = 812;
const STAGE_X = [452, 547, 642, 737];
const SOURCE_Y = [96, 146, 196, 246];
const CARD = { x: 868, w: 308, h: 60, tops: [78, 141, 204] };

function Lane({ x0, x1, label, tone }: { x0: number; x1: number; label: string; tone: "ink" | "blue" }) {
  return (
    <g>
      <text x={x0} y="24" className={`font-mono text-[11px] uppercase tracking-[1.2px] ${tone === "blue" ? "fill-blue" : "fill-secondary-text"}`}>{label}</text>
      <path d={`M${x0} 40V34H${x1}V40`} className={tone === "blue" ? "stroke-blue-border" : "stroke-line"} />
    </g>
  );
}

export default function DeliveryRoute({ content: c }: { content: ServicesPage["hero"]["route"] }) {
  const [ref, drawn] = useDrawn<HTMLElement>(0.25);
  const last = c.stages.length - 1;

  return (
    <figure ref={ref} data-drawn={drawn} className="mx-auto max-w-[1200px]">
      <figcaption className="sr-only">{c.caption}</figcaption>

      {/* lg and up: the whole run as one drawing. */}
      <svg viewBox="0 0 1200 316" fill="none" strokeLinecap="round" strokeLinejoin="round" className="hidden w-full lg:block" aria-hidden="true">
        <Lane x0={24} x1={300} label={c.lanes.systems} tone="ink" />
        <Lane x0={JOIN.x} x1={RAIL_END} label={c.lanes.team} tone="blue" />
        <Lane x0={CARD.x} x1={CARD.x + CARD.w} label={c.lanes.production} tone="ink" />

        {c.sources.map((s, i) => {
          const y = SOURCE_Y[i];
          return (
            <g key={s.name}>
              <g className="ad-fade" style={delay(0.05 + i * 0.06)}>
                <circle cx="30" cy={y - 14} r="3.5" fill={SOURCE_COLOUR[s.source]} />
                <text x="42" y={y - 10} className="text-[13px]">
                  <tspan className="fill-ink font-medium">{s.name}</tspan>
                  <tspan className="fill-secondary-text"> · {s.what}</tspan>
                </text>
              </g>
              <path
                d={`M-8 ${y}H200C290 ${y} 290 ${JOIN.y} ${JOIN.x} ${JOIN.y}`}
                stroke={SOURCE_COLOUR[s.source]}
                strokeWidth="1.5"
                pathLength={1}
                className="ad-draw"
                style={delay(0.1 + i * 0.08)}
              />
            </g>
          );
        })}

        <path d={`M${JOIN.x} ${JOIN.y}H${RAIL_END}`} className="ad-draw stroke-blue" strokeWidth="2" pathLength={1} style={delay(0.55)} />
        <circle cx={JOIN.x} cy={JOIN.y} r="5" className="ad-fade fill-background stroke-blue" strokeWidth="1.5" style={delay(0.5)} />

        {c.stages.map((stage, i) => (
          <g key={stage} className="ad-fade" style={delay(0.7 + i * 0.12)}>
            <text x={STAGE_X[i]} y={JOIN.y - 28} textAnchor="middle" className="fill-ink text-[13px] font-medium">{stage}</text>
            <circle cx={STAGE_X[i]} cy={JOIN.y} r="15" className={i === last ? "fill-blue-solid stroke-blue-solid" : "fill-background stroke-blue"} strokeWidth="1.2" />
            <text x={STAGE_X[i]} y={JOIN.y + 3.5} textAnchor="middle" className={`font-mono text-[10px] font-medium ${i === last ? "fill-on-accent" : "fill-blue"}`}>
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        ))}

        {c.outcomes.map((o, i) => {
          const top = CARD.tops[i];
          const cy = top + CARD.h / 2;
          return (
            <g key={o.title}>
              <path
                d={cy === JOIN.y ? `M${RAIL_END} ${JOIN.y}H${CARD.x}` : `M${RAIL_END} ${JOIN.y}C${RAIL_END + 32} ${JOIN.y} ${CARD.x - 32} ${cy} ${CARD.x} ${cy}`}
                className="ad-draw stroke-blue"
                strokeWidth="1.5"
                pathLength={1}
                style={delay(1.2 + i * 0.08)}
              />
              <g className="ad-fade" style={delay(1.35 + i * 0.1)}>
                <rect x={CARD.x} y={top} width={CARD.w} height={CARD.h} rx="8" className="fill-background stroke-card-line" />
                <text x={CARD.x + 16} y={top + 22} className="fill-secondary-text font-mono text-[10px] uppercase tracking-[1px]">{o.kind}</text>
                <circle cx={CARD.x + CARD.w - 56} cy={top + 18.5} r="3" className="fill-positive" />
                <text x={CARD.x + CARD.w - 16} y={top + 22} textAnchor="end" className="fill-secondary-text font-mono text-[10px] uppercase tracking-[1px]">{c.live}</text>
                <text x={CARD.x + 16} y={top + 44} className="text-[14px]">
                  <tspan className="fill-ink font-medium">{o.title}</tspan>
                  <tspan className="fill-secondary-text text-[12px]"> · {o.who}</tspan>
                </text>
              </g>
            </g>
          );
        })}

        <path d={`M${STAGE_X[last]} ${JOIN.y + 15}V280Q${STAGE_X[last]} 294 ${STAGE_X[last] + 14} 294H1216`} className="ad-draw stroke-ink" strokeWidth="1.5" pathLength={1} style={delay(1.7)} />
        <text x={STAGE_X[last] + 24} y="284" className="ad-fade fill-ink font-mono text-[10.5px] font-medium uppercase tracking-[1px]" style={delay(1.9)}>{c.handover}</text>
        <text x="24" y="298" className="fill-tertiary-text font-mono text-[10px] uppercase tracking-[1px]">{c.note}</text>
      </svg>

      {/* Below lg: the same three zones, stacked. */}
      <div className="mx-auto max-w-[560px] overflow-hidden rounded-frame border border-line bg-background text-left lg:hidden" aria-hidden="true">
        <div className="px-5 pb-5 pt-5">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary-text">{c.lanes.systems}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.sources.map((s) => (
              <li key={s.name} className="flex items-center gap-2 rounded-chip border border-card-line px-2.5 py-1.5 text-[13px]">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: SOURCE_COLOUR[s.source] }} />
                <span className="font-medium text-ink">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-lineSoft px-5 py-5">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-blue">{c.lanes.team}</p>
          <ol className="relative mt-4 grid grid-cols-4">
            <span className="absolute left-[12.5%] right-[12.5%] top-[13px] h-0.5 bg-blue" />
            {c.stages.map((stage, i) => (
              <li key={stage} className="relative flex flex-col items-center gap-2">
                <span className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border font-mono text-[10px] font-medium ${i === last ? "border-blue-solid bg-blue-solid text-on-accent" : "border-blue bg-background text-blue"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[12.5px] font-medium text-ink">{stage}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="border-t border-lineSoft px-5 py-5">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary-text">{c.lanes.production}</p>
          <ul className="mt-3 space-y-2">
            {c.outcomes.map((o) => (
              <li key={o.title} className="rounded-tile border border-card-line px-3.5 py-2.5">
                <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-secondary-text">
                  {o.kind}
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-positive" />{c.live}</span>
                </span>
                <span className="mt-1 block text-[14px] font-medium text-ink">{o.title} <span className="text-[12px] font-normal text-secondary-text">· {o.who}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <p className="border-t-[1.5px] border-ink px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-ink">{c.handover}</p>
      </div>
    </figure>
  );
}
