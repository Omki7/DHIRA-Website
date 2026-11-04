/* SIMULATED PRODUCT UI: part of AkashicOutcomeCardsMockup (see its banner). */

import { enter, Frame, H, Mono, T, type Play } from "./drawingKit";

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

export function GovernanceDrawing({ play }: { play: Play }) {
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
