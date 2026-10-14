"use client";

/*
 * /careers [04] figure: the hiring loop, drawn both ways.
 *
 * Four stations on one track. Above it, arrows run left to right: what we
 * learn about you. Below it, blue arrows run right to left: what you learn
 * about us. "It goes both ways" is a claim the old scene could only assert,
 * one step at a time; here both directions are on screen at once.
 *
 * After the fourth station the track FORKS, and both branches are drawn: yes
 * and no. Drawing the no is the point. A process that promises no ghosting
 * has to show the branch where the answer is no.
 */

import useDrawn from "@/hooks/useDrawn";

const W = 1000;
const H = 210;
const TRACK = 102;
const STATIONS = [
  { x: 70, num: "01", name: "Intro call", tag: "Both ways" },
  { x: 250, num: "02", name: "Technical deep dive", tag: "No puzzles" },
  { x: 430, num: "03", name: "Working session", tag: "Real work" },
  { x: 610, num: "04", name: "Decision", tag: "Yes or no" },
];
const FORK_X = 700;
const END_X = 930;

const DESCRIPTIONS = [
  "Thirty minutes with your future team. You interview us too.",
  "Real problems we have shipped. No whiteboard puzzles.",
  "Solve a real problem with your future colleagues.",
  "A clear yes or no, with reasons.",
];

function arrow(x: number, y: number, dir: 1 | -1) {
  return `M${x - 5 * dir} ${y - 4}L${x} ${y}L${x - 5 * dir} ${y + 4}`;
}

export default function HiringLoop() {
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.3);
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  return (
    <div ref={ref} data-drawn={drawn}>
      <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          {/* The track */}
          <path
            d={`M56 ${TRACK}L${FORK_X} ${TRACK}`}
            pathLength={1}
            fill="none"
            stroke="#1A1C1D"
            strokeOpacity="0.5"
            strokeWidth="1.3"
            className="ad-draw"
            style={{ ["--ad-dur" as string]: "1.6s" }}
          />

          {/* What we learn about you: left to right, above */}
          {STATIONS.slice(0, 3).map((s, k) => {
            const next = STATIONS[k + 1].x;
            return (
              <g key={`f${s.num}`} className="ad-fade" style={{ ["--ad-delay" as string]: `${0.5 + k * 0.12}s` }}>
                <line x1={s.x + 26} x2={next - 26} y1={TRACK - 26} y2={TRACK - 26} stroke="#1A1C1D" strokeOpacity="0.35" strokeWidth="1" />
                <path d={arrow(next - 26, TRACK - 26, 1)} fill="none" stroke="#1A1C1D" strokeOpacity="0.35" strokeWidth="1" />
              </g>
            );
          })}

          {/* What you learn about us: right to left, below */}
          {STATIONS.slice(0, 3).map((s, k) => {
            const next = STATIONS[k + 1].x;
            return (
              <g key={`b${s.num}`} className="ad-fade" style={{ ["--ad-delay" as string]: `${0.9 + k * 0.12}s` }}>
                <line x1={s.x + 26} x2={next - 26} y1={TRACK + 26} y2={TRACK + 26} stroke="#3E63DD" strokeOpacity="0.55" strokeWidth="1" />
                <path d={arrow(s.x + 26, TRACK + 26, -1)} fill="none" stroke="#3E63DD" strokeOpacity="0.55" strokeWidth="1" />
              </g>
            );
          })}

          {/* Stations */}
          {STATIONS.map((s, k) => (
            <g key={s.num} className="ad-fade" style={{ ["--ad-delay" as string]: `${0.2 + k * 0.12}s` }}>
              <circle cx={s.x} cy={TRACK} r="16" fill="#FFFFFF" stroke="#1A1C1D" strokeOpacity="0.55" strokeWidth="1.3" />
              {/* Phones keep the dot; from md the step number sits in the ring */}
              <circle cx={s.x} cy={TRACK} r="4" fill="#1A1C1D" fillOpacity="0.75" className="md:hidden" />
            </g>
          ))}

          {/* The fork: both answers are drawn */}
          <g className="ad-fade" style={{ ["--ad-delay" as string]: "1.4s" }}>
            <path
              d={`M${FORK_X} ${TRACK}C${FORK_X + 60} ${TRACK} ${FORK_X + 60} ${TRACK - 56} ${FORK_X + 120} ${TRACK - 56}L${END_X} ${TRACK - 56}`}
              fill="none"
              stroke="#3E63DD"
              strokeWidth="1.6"
            />
            <path d={arrow(END_X, TRACK - 56, 1)} fill="none" stroke="#3E63DD" strokeWidth="1.6" />
            <circle cx={FORK_X} cy={TRACK} r="3.5" fill="#1A1C1D" />
            <path
              d={`M${FORK_X} ${TRACK}C${FORK_X + 60} ${TRACK} ${FORK_X + 60} ${TRACK + 56} ${FORK_X + 120} ${TRACK + 56}L${END_X} ${TRACK + 56}`}
              fill="none"
              stroke="#1A1C1D"
              strokeOpacity="0.55"
              strokeWidth="1.6"
            />
            <path d={arrow(END_X, TRACK + 56, 1)} fill="none" stroke="#1A1C1D" strokeOpacity="0.55" strokeWidth="1.6" />
          </g>
        </svg>

        {/* Step numbers, keyed to the legend below */}
        {STATIONS.map((s, k) => (
          <span
            key={s.num}
            className="absolute hidden -translate-x-1/2 -translate-y-1/2 md:block"
            style={{ left: pct(s.x, W), top: pct(TRACK, H) }}
          >
            <span
              className="ad-fade block font-mono text-[11px] tracking-[0.04em] text-ink"
              style={{ ["--ad-delay" as string]: `${0.3 + k * 0.12}s` }}
            >
              {s.num}
            </span>
          </span>
        ))}

        {/* Direction labels */}
        <span className="absolute -translate-y-full pb-1" style={{ left: pct(56, W), top: pct(TRACK - 34, H) }}>
          <span className="ad-fade block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft" style={{ ["--ad-delay" as string]: "0.6s" }}>
            We learn about you
          </span>
        </span>
        <span className="absolute pt-1" style={{ left: pct(56, W), top: pct(TRACK + 34, H) }}>
          <span className="ad-fade block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-blue" style={{ ["--ad-delay" as string]: "1s" }}>
            You learn about us
          </span>
        </span>

        {/* Both answers */}
        <span className="absolute -translate-y-1/2 pl-3" style={{ left: pct(END_X, W), top: pct(TRACK - 56, H) }}>
          <span className="ad-fade block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-blue" style={{ ["--ad-delay" as string]: "1.6s" }}>
            Yes
          </span>
        </span>
        <span className="absolute -translate-y-1/2 pl-3" style={{ left: pct(END_X, W), top: pct(TRACK + 56, H) }}>
          <span className="ad-fade block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft" style={{ ["--ad-delay" as string]: "1.6s" }}>
            No
          </span>
        </span>
      </div>

      {/* The stations, in words */}
      <ol className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-lineSoft pt-7 sm:grid-cols-2 md:mt-2 lg:grid-cols-4">
        {STATIONS.map((s, k) => (
          <li key={s.num}>
            <div className="ad-fade" style={{ ["--ad-delay" as string]: `${0.3 + k * 0.1}s` }}>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-overcast">
                {s.num}&nbsp;&nbsp;<span className="text-blue">{s.tag}</span>
              </p>
              <h3 className="mt-1.5 text-[18px] font-semibold tracking-tight text-ink">{s.name}</h3>
              <p className="mt-1 text-pretty text-[15px] leading-relaxed text-inkSoft">{DESCRIPTIONS[k]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
