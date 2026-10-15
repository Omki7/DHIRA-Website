"use client";

/*
 * One plan, drawn in the /about line language: the five priced modules
 * (Pipelines, Master Data, Warehouse, BI, Governance) standing on one
 * foundation band, the groundwork laid once as in the /akashic build-vs-buy
 * drawing. Every plan carries all five (the pricing workbook), so every
 * module is drawn switched on and the plan shows as how full each one is:
 * a third at Launch, about two thirds at Growth, full at Scale. Enterprise
 * is full and draws its own boundary around the platform: a dedicated
 * instance. Draws in once on view, lands on its final state under reduced
 * motion.
 */

import type { CSSProperties } from "react";
import useDrawn from "@/hooks/useDrawn";

const pace = (delay: number, dur?: number) =>
  ({ "--ad-delay": `${delay}s`, ...(dur ? { "--ad-dur": `${dur}s` } : {}) }) as CSSProperties;

const MODULES = 5;
const BLOCK = 32;
const GAP = 10;
const START = (240 - (MODULES * BLOCK + (MODULES - 1) * GAP)) / 2;
const TOP = 22;
const HEIGHT = 34;
const FILL: Record<1 | 2 | 3 | 4, number> = { 1: 0.32, 2: 0.62, 3: 1, 4: 1 };

export default function PlanFigure({ tier }: { tier: 1 | 2 | 3 | 4 }) {
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.4);
  const fill = HEIGHT * FILL[tier];
  return (
    <div ref={ref} data-drawn={drawn} className="block">
      <svg viewBox="0 0 240 84" fill="none" aria-hidden className="h-[84px] w-full max-w-[260px]">
        {tier === 4 && (
          <>
            <rect x={2} y={4} width={236} height={78} rx={10} className="ad-draw stroke-ink/30" strokeWidth={1} pathLength={1} style={pace(0.9, 0.9)} />
            {[
              [2, 4],
              [238, 4],
              [2, 82],
              [238, 82],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={2} className="ad-fade fill-ink/40" style={pace(1.5)} />
            ))}
          </>
        )}
        <rect x={10} y={64} width={220} height={8} rx={4} className="ad-draw stroke-blue fill-blue/15" strokeWidth={1.2} pathLength={1} style={pace(0, 0.8)} />
        {Array.from({ length: MODULES }, (_, i) => {
          const x = START + i * (BLOCK + GAP);
          return (
            <g key={x}>
              <path d={`M${x + BLOCK / 2} 64V${TOP + HEIGHT}`} className="ad-draw stroke-blue" strokeWidth={1.2} pathLength={1} style={pace(0.25 + i * 0.05, 0.3)} />
              <rect x={x} y={TOP + HEIGHT - fill} width={BLOCK} height={fill} rx={4} className="ad-fade fill-blue/20" style={pace(0.6 + i * 0.06)} />
              <rect x={x} y={TOP} width={BLOCK} height={HEIGHT} rx={4} className="ad-draw stroke-blue" strokeWidth={1.2} pathLength={1} style={pace(0.35 + i * 0.06, 0.6)} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
