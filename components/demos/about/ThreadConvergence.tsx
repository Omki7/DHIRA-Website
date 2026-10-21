"use client";

/*
 * /about [01] figure: what DHIRA saw in 2018, drawn as three zones read
 * bottom to top, numbered to match the three beliefs beside it.
 *
 *   01  scattered   twelve threads rise from the systems that made them,
 *                   grouped as records, documents and streams (structured,
 *                   unstructured, streaming: the three kinds Akashic unifies)
 *   02  together    they converge into one bundle, bound once: brought
 *                   together and governed
 *   03  AI          blue threads grow OUT of the bundle, not beside it. The
 *                   data keeps rising alongside; AI is fed by it
 *
 * The order is the claim: data first, AI built on it. Nothing here is a
 * measurement; thread counts and spacing carry no data.
 */

import useDrawn from "@/hooks/useDrawn";

const W = 520;
const H = 600;
const BOTTOM = 566;
const MERGE = 330; // bundle fully formed
const BIND = 312;
const TOP = 46;
const BUNDLE_X = 196;
const GAP = 4.2;
const COUNT = 12;

const GROUPS = [
  { label: "Records", centre: 92 },
  { label: "Documents", centre: 262 },
  { label: "Streams", centre: 432 },
];

const start = (i: number) => GROUPS[Math.floor(i / 4)].centre + ((i % 4) - 1.5) * 22;
const lane = (i: number) => BUNDLE_X + (i - (COUNT - 1) / 2) * GAP;

function dataThread(i: number) {
  const xs = start(i);
  const xb = lane(i);
  return `M${xs} ${BOTTOM}C${xs} ${BOTTOM - 120} ${xb} ${MERGE + 100} ${xb} ${MERGE}L${xb} ${TOP}`;
}

/* AI threads start inside the bundle and bend out to the right. */
const AI = [0, 1, 2].map((k) => {
  const x0 = lane(8 + k);
  const x1 = 360 + k * 11;
  return { d: `M${x0} 262C${x0} 200 ${x1} 214 ${x1} 150L${x1} ${TOP}`, x1 };
});

/* 01 and 02 read off the left edge; 03 off the right, so no leader ever
   crosses the bundle. `from` is the leader's edge end, `to` its dot. */
const CALLOUTS = [
  { n: "01", y: 492, from: 6, to: 56, right: false },
  { n: "02", y: BIND, from: 6, to: 0, right: false },
  { n: "03", y: 118, from: W - 6, to: 392, right: true },
];

/** `labels` name the two threads (content: about conviction.threads). */
export default function ThreadConvergence({ labels }: { labels: { data: string; ai: string } }) {
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.25);
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const half = (GAP * (COUNT - 1)) / 2 + 6;

  return (
    <div
      ref={ref}
      data-drawn={drawn}
      className="relative mx-auto w-full max-w-[520px]"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {/* 01, 02: data rises from every system and comes together */}
        {Array.from({ length: COUNT }, (_, i) => (
          <path
            key={i}
            d={dataThread(i)}
            pathLength={1}
            fill="none"
            stroke="rgb(var(--ink))"
            strokeOpacity={0.62}
            strokeWidth="1.2"
            strokeLinecap="round"
            className="ad-draw"
            style={{ ["--ad-delay" as string]: `${(i % 4) * 0.06 + Math.floor(i / 4) * 0.1}s`, ["--ad-dur" as string]: "2s" }}
          />
        ))}
        {Array.from({ length: COUNT }, (_, i) => (
          <circle key={`s${i}`} cx={start(i)} cy={BOTTOM} r="2.6" className="ad-fade fill-ink" />
        ))}

        {/* The one binding: brought together, governed */}
        <rect
          x={BUNDLE_X - half}
          y={BIND - 5}
          width={half * 2}
          height="10"
          rx="5"
          fill="rgb(var(--background))"
          stroke="rgb(var(--ink))"
          strokeWidth="1.2"
          className="ad-fade"
          style={{ ["--ad-delay" as string]: "1.1s" }}
        />

        {/* 03: AI grows out of the bundle */}
        {AI.map((t, k) => (
          <path
            key={t.d}
            d={t.d}
            pathLength={1}
            fill="none"
            stroke="rgb(var(--blue))"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="ad-draw"
            style={{ ["--ad-delay" as string]: `${1.5 + k * 0.12}s`, ["--ad-dur" as string]: "1.4s" }}
          />
        ))}
        {AI.map((t, k) => (
          <line
            key={`n${k}`}
            x1={t.x1}
            x2={t.x1}
            y1={TOP - 4}
            y2={TOP - 28}
            stroke="rgb(var(--blue))"
            strokeOpacity="0.55"
            strokeWidth="1.2"
            strokeDasharray="3 5"
            className="ad-fade"
            style={{ ["--ad-delay" as string]: "2.6s" }}
          />
        ))}

        {/* Callout leaders */}
        {CALLOUTS.map((c, k) => {
          const to = c.to || BUNDLE_X - half - 6;
          return (
            <g key={c.n} className="ad-fade" style={{ ["--ad-delay" as string]: `${0.8 + k * 0.5}s` }}>
              <line x1={c.from} x2={to} y1={c.y} y2={c.y} stroke="rgb(var(--ink))" strokeOpacity="0.3" />
              <circle cx={to} cy={c.y} r="2.5" fill={c.right ? "rgb(var(--blue))" : "rgb(var(--ink))"} />
            </g>
          );
        })}
      </svg>

      {CALLOUTS.map((c, k) => (
        <span
          key={c.n}
          className={`absolute -translate-y-1/2 ${c.right ? "pl-2" : "-translate-x-full pr-2"}`}
          style={{ left: c.right ? "100%" : 0, top: pct(c.y, H) }}
        >
          <span
            className={`ad-fade block font-mono text-[11px] tracking-[0.08em] ${c.right ? "text-blue" : "text-overcast"}`}
            style={{ ["--ad-delay" as string]: `${0.8 + k * 0.5}s` }}
          >
            {c.n}
          </span>
        </span>
      ))}

      {/* Where the threads come from */}
      {GROUPS.map((g) => (
        <span
          key={g.label}
          className="absolute -translate-x-1/2 pt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft"
          style={{ left: pct(g.centre, W), top: pct(BOTTOM, H) }}
        >
          {g.label}
        </span>
      ))}

      {/* Where they go */}
      <span
        className="absolute -translate-x-1/2 -translate-y-full pb-1 text-[17px] font-semibold tracking-tight text-ink"
        style={{ left: pct(BUNDLE_X, W), top: pct(TOP - 30, H) }}
      >
        {labels.data}
      </span>
      <span
        className="absolute -translate-x-1/2 -translate-y-full"
        style={{ left: pct(AI[1].x1, W), top: pct(TOP - 30, H) }}
      >
        <span className="ad-fade block pb-1 text-[17px] font-semibold tracking-tight text-blue" style={{ ["--ad-delay" as string]: "2.4s" }}>
          {labels.ai}
        </span>
      </span>
    </div>
  );
}
