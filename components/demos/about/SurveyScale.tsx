"use client";

/*
 * /about [02] figure: a surveyor's scale from 2018 to today.
 *
 * Time runs left to right on a drafted ruler: a major tick per year, minor
 * ticks per quarter. It is solid up to today and dashed beyond (the page's
 * mark for "not yet"), with a live marker where today falls. The ruler
 * stands on a hatched strip, the engineering foundation (reliability,
 * scale, ownership): that is where the section gives engineering its
 * credit, as the ground every milestone stands on rather than a phase DHIRA
 * grew out of. Milestones are flagged off the ruler at mid year,
 * alternating above and below so no leader ever crosses a label. A
 * dimension line underneath measures the whole run.
 *
 * Milestones are only what the site already stands behind (docs/
 * DESIGN_SYSTEM.md, brand proof points). The 2025 entry names the two state
 * awards rather than calling them national, and no figure appears here that
 * is not sourced elsewhere on the site.
 *
 * Wide screens get the horizontal drawing; below `lg` the same ruler stands
 * vertically as a list, because a scale squeezed to 700px stops being a scale.
 */

import { useEffect, useState } from "react";
import useDrawn from "@/hooks/useDrawn";

import { ABOUT_MILESTONES as MILESTONES } from "@/lib/aboutContent";
export { ABOUT_MILESTONES as MILESTONES } from "@/lib/aboutContent";
export type { Milestone } from "@/lib/aboutContent";

const FOUNDED = 2018;
const FIRST_PAINT_NOW = 2026.72;
const VB_W = 1000;
const VB_H = 330;
const RULER = 150;
const BAND = 24; // foundation strip under the ruler
const BELOW = 228; // top of the lower flags
const DIM = 308; // dimension line
const X0 = 40;
const PER_YEAR = 100;
const END = 988;

const x = (year: number) => X0 + (year - FOUNDED) * PER_YEAR;

/* Placed between the lower leaders (2019.5, 2023.05, today). */
const FOUNDATION = [
  { at: 2018.85, word: "Reliability" },
  { at: 2021.3, word: "Scale" },
  { at: 2024.8, word: "Ownership" },
];

function useNow() {
  const [now, setNow] = useState(FIRST_PAINT_NOW);
  useEffect(() => {
    const d = new Date();
    const start = new Date(d.getFullYear(), 0, 1).getTime();
    const end = new Date(d.getFullYear() + 1, 0, 1).getTime();
    setNow(d.getFullYear() + (d.getTime() - start) / (end - start));
  }, []);
  return now;
}

function Horizontal({ now }: { now: number }) {
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.3);
  const today = Math.min(x(now), END - 20);
  const lastYear = Math.floor(now);
  const years = Array.from({ length: lastYear - FOUNDED + 2 }, (_, k) => FOUNDED + k).filter((y) => x(y) <= END);
  const quarters = Array.from({ length: (lastYear - FOUNDED + 2) * 4 }, (_, k) => FOUNDED + k / 4).filter(
    (q) => q % 1 !== 0 && x(q) <= END
  );
  const pct = (v: number, w: number) => `${(v / w) * 100}%`;
  const flags = [
    ...MILESTONES.map((m) => ({ ...m, at: x(m.at), live: false })),
    { year: 0, label: undefined as string | undefined, title: "Today", body: "Decisions made on governed data, every day.", at: today, up: false, live: true },
  ];

  return (
    <div ref={ref} data-drawn={drawn} className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        {/* The ruler: solid to today, dashed beyond */}
        <path
          d={`M${X0} ${RULER}L${today} ${RULER}`}
          pathLength={1}
          fill="none"
          stroke="#1A1C1D"
          strokeWidth="1.4"
          className="ad-draw"
          style={{ ["--ad-dur" as string]: "1.6s" }}
        />
        <line
          x1={today}
          x2={END}
          y1={RULER}
          y2={RULER}
          stroke="#1A1C1D"
          strokeOpacity="0.4"
          strokeWidth="1.2"
          strokeDasharray="3 5"
          className="ad-fade"
          style={{ ["--ad-delay" as string]: "1.6s" }}
        />
        {/* The foundation the ruler stands on */}
        <defs>
          <pattern id="about-scale-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="#1A1C1D" strokeOpacity="0.16" strokeWidth="1" />
          </pattern>
        </defs>
        <g className="ad-fade" style={{ ["--ad-delay" as string]: "0.4s" }}>
          <rect x={X0} y={RULER + 1} width={today - X0} height={BAND} fill="url(#about-scale-hatch)" />
          <line x1={X0} x2={today} y1={RULER + 1 + BAND} y2={RULER + 1 + BAND} stroke="#1A1C1D" strokeOpacity="0.3" />
          <line x1={X0} x2={X0} y1={RULER} y2={RULER + 1 + BAND} stroke="#1A1C1D" strokeOpacity="0.3" />
          <line x1={today} x2={today} y1={RULER} y2={RULER + 1 + BAND} stroke="#1A1C1D" strokeOpacity="0.3" />
        </g>

        {years.map((y, k) => (
          <line
            key={y}
            x1={x(y)}
            x2={x(y)}
            y1={RULER - 10}
            y2={RULER}
            stroke="#1A1C1D"
            strokeOpacity={y <= now ? 0.8 : 0.3}
            strokeWidth="1.2"
            className="ad-fade"
            style={{ ["--ad-delay" as string]: `${0.1 + k * 0.12}s` }}
          />
        ))}
        {quarters.map((q) => (
          <line
            key={q}
            x1={x(q)}
            x2={x(q)}
            y1={RULER - 4}
            y2={RULER}
            stroke="#1A1C1D"
            strokeOpacity={q <= now ? 0.4 : 0.15}
            strokeWidth="1"
            className="ad-fade"
            style={{ ["--ad-delay" as string]: `${0.3 + (q - FOUNDED) * 0.12}s` }}
          />
        ))}

        {/* Leaders */}
        {flags.map((f, k) => (
          <g key={f.title} className="ad-fade" style={{ ["--ad-delay" as string]: `${0.5 + k * 0.18}s` }}>
            <line
              x1={f.at}
              x2={f.at}
              y1={f.up ? RULER - 2 : RULER + 2 + BAND}
              y2={f.up ? 44 : BELOW}
              stroke={f.live ? "#3E63DD" : "#1A1C1D"}
              strokeOpacity={f.live ? 1 : 0.5}
              strokeWidth="1"
            />
            <circle cx={f.at} cy={RULER} r={f.live ? 4.5 : 3} fill={f.live ? "#3E63DD" : "#1A1C1D"} />
          </g>
        ))}
        <circle cx={today} cy={RULER} r="4.5" fill="#3E63DD" className="ad-ping" />

        {/* Dimension line: the whole run */}
        <g className="ad-fade" style={{ ["--ad-delay" as string]: "1.8s" }}>
          <line x1={X0} x2={X0} y1={DIM - 10} y2={DIM + 10} stroke="#1A1C1D" strokeOpacity="0.35" />
          <line x1={today} x2={today} y1={DIM - 10} y2={DIM + 10} stroke="#1A1C1D" strokeOpacity="0.35" />
          <line x1={X0} x2={(X0 + today) / 2 - 44} y1={DIM} y2={DIM} stroke="#1A1C1D" strokeOpacity="0.35" />
          <line x1={(X0 + today) / 2 + 44} x2={today} y1={DIM} y2={DIM} stroke="#1A1C1D" strokeOpacity="0.35" />
          <path d={`M${X0 + 7} ${DIM - 4}L${X0} ${DIM}L${X0 + 7} ${DIM + 4}`} fill="none" stroke="#1A1C1D" strokeOpacity="0.35" />
          <path d={`M${today - 7} ${DIM - 4}L${today} ${DIM}L${today - 7} ${DIM + 4}`} fill="none" stroke="#1A1C1D" strokeOpacity="0.35" />
        </g>
      </svg>

      {/* Year numerals over the ticks */}
      {years.map((y) => (
        <span
          key={y}
          className={`absolute -translate-x-1/2 -translate-y-full pb-1 font-mono text-[11px] tracking-[0.08em] ${y <= now ? "text-inkSoft" : "text-overcast/60"}`}
          style={{ left: pct(x(y), VB_W), top: pct(RULER - 10, VB_H) }}
        >
          {y}
        </span>
      ))}

      {/* What the foundation is made of */}
      {FOUNDATION.map((f, k) => (
        <span
          key={f.word}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pct(x(f.at), VB_W), top: pct(RULER + 1 + BAND / 2, VB_H) }}
        >
          <span
            className="ad-fade block whitespace-nowrap bg-background px-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink"
            style={{ ["--ad-delay" as string]: `${0.7 + k * 0.15}s` }}
          >
            {f.word}
          </span>
        </span>
      ))}
      <span
        className="absolute pl-1 pt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft"
        style={{ left: pct(X0, VB_W), top: pct(RULER + 1 + BAND, VB_H) }}
      >
        {/* Short form below xl, where the mid 2019 leader sits close to the left edge */}
        <span className="ad-fade block" style={{ ["--ad-delay" as string]: "0.6s" }}>
          <span className="hidden xl:inline">Engineering </span>foundation
        </span>
      </span>

      {/* Flags */}
      {flags.map((f, k) => (
        <div
          key={f.title}
          className={`absolute ${f.live ? "w-[140px] xl:w-[240px]" : "w-[190px]"}`}
          style={{
            left: pct(f.at, VB_W),
            top: f.up ? pct(44, VB_H) : pct(BELOW, VB_H),
            transform: `translate(${f.live ? "calc(-100% - 10px)" : "10px"}, ${f.up ? "-100%" : "-12%"})`,
          }}
        >
          <div className={`ad-fade ${f.live ? "text-right" : ""}`} style={{ ["--ad-delay" as string]: `${0.6 + k * 0.18}s` }}>
            <p className={`font-mono text-[11px] uppercase tracking-[0.08em] ${f.live ? "text-blue" : "text-overcast"}`}>
              {f.live ? "Today" : (f.label ?? f.year)}
            </p>
            {!f.live && <p className="mt-0.5 text-[16px] font-semibold leading-snug tracking-tight text-ink">{f.title}</p>}
            <p className={`mt-1 text-[13px] leading-snug ${f.live ? "text-ink" : "text-inkSoft"}`}>{f.body}</p>
          </div>
        </div>
      ))}

      <span
        className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft"
        style={{ left: pct((X0 + today) / 2, VB_W), top: pct(DIM, VB_H) }}
      >
        <span className="ad-fade block" style={{ ["--ad-delay" as string]: "1.8s" }}>
          {Math.floor(now - FOUNDED)} years
        </span>
      </span>
    </div>
  );
}

function Vertical() {
  const [ref, drawn] = useDrawn<HTMLOListElement>(0.15);
  const items = [
    ...MILESTONES.map((m) => ({ key: m.title, label: m.label ?? String(m.year), title: m.title, body: m.body, live: false })),
    { key: "today", label: "Today", title: "", body: "Decisions made on governed data, every day.", live: true },
  ];
  return (
    <>
    <p className="mb-6 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-inkSoft">
      Engineering foundation: <span className="text-ink">reliability, scale, ownership</span>
    </p>
    <ol ref={ref} data-drawn={drawn} className="relative ml-2 border-l border-ink/70 pl-7">
      {items.map((it, k) => (
        <li key={it.key} className="relative pb-8 last:pb-0">
          <span
            aria-hidden
            className={`absolute -left-7 top-[7px] h-px w-4 ${it.live ? "bg-blue" : "bg-ink/70"}`}
          />
          <span
            aria-hidden
            className={`absolute -left-[33px] top-[3px] h-[9px] w-[9px] rounded-full ${it.live ? "bg-blue" : "bg-ink"}`}
          />
          <div className="ad-fade" style={{ ["--ad-delay" as string]: `${k * 0.1}s` }}>
            <p className={`font-mono text-[11px] uppercase tracking-[0.08em] ${it.live ? "text-blue" : "text-overcast"}`}>{it.label}</p>
            {it.title && <p className="mt-0.5 text-[17px] font-semibold tracking-tight text-ink">{it.title}</p>}
            <p className={`mt-1 text-pretty text-[15px] leading-snug ${it.live ? "text-ink" : "text-inkSoft"}`}>{it.body}</p>
          </div>
        </li>
      ))}
    </ol>
    </>
  );
}

export default function SurveyScale() {
  const now = useNow();
  return (
    <figure>
      <div className="hidden lg:block">
        <Horizontal now={now} />
      </div>
      <div className="lg:hidden">
        <Vertical />
      </div>
    </figure>
  );
}

