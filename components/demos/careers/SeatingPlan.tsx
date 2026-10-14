"use client";

/*
 * /careers hero figure: the team's table, drawn in plan.
 *
 * Chairs sit around one long table. Four are blue and empty: the four open
 * roles from lib/careersRoles.ts, labelled by discipline, so the hero and
 * the board in [03] are the same four seats rather than two lists that can
 * drift apart.
 *
 * The table is CUT at both ends by drafting break lines, which is the point:
 * a plan with a countable number of chairs would be a headcount claim, and
 * DHIRA publishes no team size. The break says the table carries on.
 *
 * Taken chairs are shaded at low opacity and carry no label. They are
 * furniture, not people. The caption carries a Taken / Open key.
 *
 * Phones get the same table stood on end: a long plan squeezed to 360px puts
 * four labels inside 40px chairs, which is how the first pass read.
 */

import useDrawn from "@/hooks/useDrawn";
import { ROLES } from "@/lib/careersRoles";

const W = 1000;
const H = 230;
const TABLE_TOP = 88;
const TABLE_BOTTOM = 142;
const CHAIR_W = 104;
const CHAIR_H = 30;
const GAP = 12;

/* Chairs alternate above and below; `open` indexes into ROLES. */
const TOP_SEATS = Array.from({ length: 8 }, (_, k) => 66 + k * 116);
const BOTTOM_SEATS = Array.from({ length: 8 }, (_, k) => 124 + k * 116);
const OPEN: { x: number; below: boolean; role: number }[] = [
  { x: TOP_SEATS[1], below: false, role: 0 },
  { x: BOTTOM_SEATS[3], below: true, role: 1 },
  { x: TOP_SEATS[5], below: false, role: 2 },
  { x: BOTTOM_SEATS[6], below: true, role: 3 },
];
const isOpen = (x: number, below: boolean) => OPEN.some((o) => o.x === x && o.below === below);

function chair(x: number, below: boolean) {
  const y = below ? TABLE_BOTTOM + GAP : TABLE_TOP - GAP - CHAIR_H;
  return { x: x - CHAIR_W / 2, y, width: CHAIR_W, height: CHAIR_H };
}

function breakLine(x: number) {
  const mid = (TABLE_TOP + TABLE_BOTTOM) / 2;
  return `M${x} ${TABLE_TOP - 6}L${x} ${mid - 10}L${x - 7} ${mid - 3}L${x + 7} ${mid + 3}L${x} ${mid + 10}L${x} ${TABLE_BOTTOM + 6}`;
}

/* Phones: the same table, stood on end. */
const MW = 320;
const MH = 478;
const M_TABLE = { left: 132, right: 188 };
const M_CHAIR = { w: 112, h: 32 };
const M_SEATS = [58, 110, 162, 214, 266, 318, 370, 422].map((y, k) => ({
  y,
  right: k % 2 === 1,
  role: [0, -1, -1, 1, 2, -1, -1, 3][k],
}));

function VerticalPlan() {
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.2);
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const mBreak = (y: number) => {
    const mid = (M_TABLE.left + M_TABLE.right) / 2;
    return `M${M_TABLE.left - 6} ${y}L${mid - 10} ${y}L${mid - 3} ${y - 7}L${mid + 3} ${y + 7}L${mid + 10} ${y}L${M_TABLE.right + 6} ${y}`;
  };

  return (
    <div
      ref={ref}
      data-drawn={drawn}
      className="relative mx-auto w-full max-w-[340px] md:hidden"
      style={{ aspectRatio: `${MW} / ${MH}` }}
    >
      <svg viewBox={`0 0 ${MW} ${MH}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <rect x={M_TABLE.left} y="16" width={M_TABLE.right - M_TABLE.left} height="446" fill="#FAFAFB" className="ad-fade" />
        {[M_TABLE.left, M_TABLE.right].map((x, k) => (
          <path
            key={x}
            d={`M${x} 16L${x} 462`}
            pathLength={1}
            fill="none"
            stroke="#1A1C1D"
            strokeOpacity="0.55"
            strokeWidth="1.3"
            className="ad-draw"
            style={{ ["--ad-delay" as string]: `${k * 0.1}s`, ["--ad-dur" as string]: "1.5s" }}
          />
        ))}
        <path d={mBreak(16)} fill="none" stroke="#1A1C1D" strokeOpacity="0.45" strokeWidth="1.1" className="ad-draw" />
        <path d={mBreak(462)} fill="none" stroke="#1A1C1D" strokeOpacity="0.45" strokeWidth="1.1" className="ad-draw" />

        {M_SEATS.map((seat, k) => {
          const open = seat.role >= 0;
          const x = seat.right ? M_TABLE.right + 12 : M_TABLE.left - 12 - M_CHAIR.w;
          return (
            <g key={seat.y}>
              <rect
                x={x}
                y={seat.y - M_CHAIR.h / 2}
                width={M_CHAIR.w}
                height={M_CHAIR.h}
                rx="7"
                fill={open ? "#FFFFFF" : "#1A1C1D"}
                fillOpacity={open ? 1 : 0.06}
                stroke={open ? "#3E63DD" : "#1A1C1D"}
                strokeOpacity={open ? 1 : 0.16}
                strokeWidth={open ? 1.6 : 1.1}
                className="ad-fade"
                style={{ ["--ad-delay" as string]: `${0.3 + k * 0.05}s` }}
              />
              {open && (
                <line
                  x1={seat.right ? M_TABLE.right : M_TABLE.left}
                  x2={seat.right ? M_TABLE.right + 12 : M_TABLE.left - 12}
                  y1={seat.y}
                  y2={seat.y}
                  stroke="#3E63DD"
                  strokeWidth="1.4"
                  className="ad-fade"
                  style={{ ["--ad-delay" as string]: "1s" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {M_SEATS.filter((s) => s.role >= 0).map((seat) => (
        <span
          key={seat.role}
          className="absolute -translate-x-1/2 -translate-y-1/2 px-1 text-center"
          style={{
            left: pct(seat.right ? M_TABLE.right + 12 + M_CHAIR.w / 2 : M_TABLE.left - 12 - M_CHAIR.w / 2, MW),
            top: pct(seat.y, MH),
          }}
        >
          <span
            className="ad-fade block whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.06em] text-blue"
            style={{ ["--ad-delay" as string]: "1.1s" }}
          >
            {ROLES[seat.role].seat}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function SeatingPlan() {
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.2);
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  return (
    <figure ref={ref} data-drawn={drawn}>
      <div className="relative hidden w-full md:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          {/* The table, cut at both ends */}
          <rect
            x="14"
            y={TABLE_TOP}
            width="972"
            height={TABLE_BOTTOM - TABLE_TOP}
            fill="#FAFAFB"
            className="ad-fade"
          />
          <path
            d={`M14 ${TABLE_TOP}L986 ${TABLE_TOP}`}
            pathLength={1}
            fill="none"
            stroke="#1A1C1D"
            strokeOpacity="0.55"
            strokeWidth="1.3"
            className="ad-draw"
            style={{ ["--ad-dur" as string]: "1.5s" }}
          />
          <path
            d={`M14 ${TABLE_BOTTOM}L986 ${TABLE_BOTTOM}`}
            pathLength={1}
            fill="none"
            stroke="#1A1C1D"
            strokeOpacity="0.55"
            strokeWidth="1.3"
            className="ad-draw"
            style={{ ["--ad-dur" as string]: "1.5s", ["--ad-delay" as string]: "0.1s" }}
          />
          <path d={breakLine(14)} fill="none" stroke="#1A1C1D" strokeOpacity="0.45" strokeWidth="1.1" className="ad-draw" />
          <path d={breakLine(986)} fill="none" stroke="#1A1C1D" strokeOpacity="0.45" strokeWidth="1.1" className="ad-draw" />

          {/* Chairs */}
          {[...TOP_SEATS.map((x) => ({ x, below: false })), ...BOTTOM_SEATS.map((x) => ({ x, below: true }))].map(
            ({ x, below }, k) => {
              const open = isOpen(x, below);
              const box = chair(x, below);
              return (
                <rect
                  key={`${x}-${below}`}
                  {...box}
                  rx="7"
                  fill={open ? "#FFFFFF" : "#1A1C1D"}
                  fillOpacity={open ? 1 : 0.06}
                  stroke={open ? "#3E63DD" : "#1A1C1D"}
                  strokeOpacity={open ? 1 : 0.16}
                  strokeWidth={open ? 1.6 : 1.1}
                  className="ad-fade"
                  style={{ ["--ad-delay" as string]: `${0.3 + k * 0.04}s` }}
                />
              );
            }
          )}

          {/* Each open chair is joined to the table: the seat is at the work */}
          {OPEN.map((o) => (
            <line
              key={`l${o.role}`}
              x1={o.x}
              x2={o.x}
              y1={o.below ? TABLE_BOTTOM : TABLE_TOP}
              y2={o.below ? TABLE_BOTTOM + GAP : TABLE_TOP - GAP}
              stroke="#3E63DD"
              strokeWidth="1.4"
              className="ad-fade"
              style={{ ["--ad-delay" as string]: "1s" }}
            />
          ))}
        </svg>

        {/* Discipline labels sit inside the open chairs */}
        {OPEN.map((o) => {
          const box = chair(o.x, o.below);
          return (
            <span
              key={o.role}
              className="absolute -translate-x-1/2 -translate-y-1/2 px-1 text-center"
              style={{ left: pct(o.x, W), top: pct(box.y + CHAIR_H / 2, H) }}
            >
              <span
                className="ad-fade block whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.06em] text-blue"
                style={{ ["--ad-delay" as string]: "1.1s" }}
              >
                {ROLES[o.role].seat}
              </span>
            </span>
          );
        })}
      </div>

      <VerticalPlan />

      {/* Taken chairs are shaded, open ones are drawn in blue: the legend
          says so, because two outlines side by side both read as empty. */}
      <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-inkSoft">
        <span>
          {ROLES.length} seats open. <span className="text-ink">The table keeps going.</span>
        </span>
        <span className="flex items-center gap-5" aria-hidden>
          <span className="flex items-center gap-2">
            <span className="h-3 w-6 rounded-[4px] border border-ink/15 bg-ink/[0.06]" />
            Taken
          </span>
          <span className="flex items-center gap-2 text-blue">
            <span className="h-3 w-6 rounded-[4px] border-[1.5px] border-blue bg-white" />
            Open
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
