"use client";

/*
 * /careers [01] figure: how far one person's work travels here.
 *
 * Arcs spread from a single point, the way consequence does: your branch,
 * review, release, the platform, a country. Past the outer arc sit the three
 * national programmes DHIRA's work already runs inside, each carrying one
 * public record figure (the same defensible numbers as the homepage proof
 * carousel, Rule 4; programmes stay generically named).
 *
 * It replaces a one-at-a-time carousel that published a third of itself.
 * Everything is on screen at once, which is the whole argument: the distance
 * between a commit and a country is short here.
 */

import useDrawn from "@/hooks/useDrawn";
import type { CareersPage } from "@/content/pages/careers";

const W = 1000;
const H = 330;
const CX = 26;
const CY = H / 2;

/* Ring radii, innermost first; labels come from content (work.rings). */
const RADII = [150, 270, 390, 510, 630];
const OUTER = RADII[RADII.length - 1];
/* Where each deployment's callout sits, in content order (work.deployments). */
const DEPLOYMENT_Y = [58, 165, 272];

type Work = CareersPage["work"];

/* A circle centred off canvas: the visible part is the wavefront. */
const arc = (r: number) => `M${CX} ${CY - r}A${r} ${r} 0 0 1 ${CX} ${CY + r}`;

/* Where the outer arc crosses a given y, so a marker can sit on it. */
function onOuter(y: number) {
  const dy = y - CY;
  return CX + Math.sqrt(Math.max(0, OUTER * OUTER - dy * dy));
}

export default function ReachArcs({ content }: { content: Work }) {
  const RINGS = RADII.map((r, k) => ({ r, label: content.rings[k] ?? "" }));
  const DEPLOYMENTS = content.deployments.map((d, k) => ({ ...d, y: DEPLOYMENT_Y[k] ?? 0 }));
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.25);
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  return (
    <div ref={ref} data-drawn={drawn}>
      {/* Wide screens: the full spread */}
      <div className="relative hidden w-full md:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          {RINGS.map((ring, k) => (
            <path
              key={ring.r}
              d={arc(ring.r)}
              pathLength={1}
              fill="none"
              stroke="rgb(var(--ink))"
              strokeOpacity={k === RINGS.length - 1 ? 0.5 : 0.22}
              strokeWidth={k === RINGS.length - 1 ? 1.4 : 1.1}
              className="ad-draw"
              style={{ ["--ad-delay" as string]: `${0.2 + k * 0.18}s`, ["--ad-dur" as string]: "1.4s" }}
            />
          ))}

          {/* The point it starts from */}
          <circle cx={CX} cy={CY} r="5" className="fill-blue" />
          <circle cx={CX} cy={CY} r="5" className="ad-ping fill-blue" />

          {/* Markers where each programme sits on the outer arc */}
          {DEPLOYMENTS.map((d, k) => (
            <g key={d.name} className="ad-fade" style={{ ["--ad-delay" as string]: `${1.3 + k * 0.15}s` }}>
              <line x1={onOuter(d.y)} x2={700} y1={d.y} y2={d.y} stroke="rgb(var(--blue))" strokeOpacity="0.4" strokeWidth="1" />
              <circle cx={onOuter(d.y)} cy={d.y} r="4" className="fill-blue" />
            </g>
          ))}
        </svg>

        {/* What each band is */}
        {RINGS.map((ring, k) => (
          <span
            key={ring.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: pct(CX + ring.r - 56, W), top: pct(CY, H) }}
          >
            <span
              className={`ad-fade block whitespace-nowrap bg-background px-1.5 font-mono text-[11px] uppercase tracking-[0.08em] ${
                k === RINGS.length - 1 ? "text-ink" : "text-inkSoft"
              }`}
              style={{ ["--ad-delay" as string]: `${0.4 + k * 0.18}s` }}
            >
              {ring.label}
            </span>
          </span>
        ))}
        <span className="absolute -translate-y-1/2 pl-4" style={{ left: pct(CX, W), top: pct(CY - 46, H) }}>
          <span className="ad-fade block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-blue">
            {content.origin}
          </span>
        </span>

        {/* The three programmes it ends up inside */}
        {DEPLOYMENTS.map((d, k) => (
          <div
            key={d.name}
            className="absolute -translate-y-1/2"
            style={{ left: pct(714, W), top: pct(d.y, H), width: pct(W - 714, W) }}
          >
            <div className="ad-fade" style={{ ["--ad-delay" as string]: `${1.4 + k * 0.15}s` }}>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft">{d.name}</p>
              <p className="mt-1.5 flex items-baseline gap-2">
                <span className="text-[30px] font-semibold leading-none tracking-tighter text-ink">{d.figure}</span>
                <span className="text-[13px] leading-snug text-inkSoft">{d.label}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Phones: a short spread, then the same three programmes as rows */}
      <div className="md:hidden">
        <div className="relative w-full" style={{ aspectRatio: "340 / 150" }}>
          <svg viewBox="0 0 340 150" className="absolute inset-0 h-full w-full" aria-hidden>
            {[60, 110, 160, 210, 262].map((r, k) => (
              <path
                key={r}
                d={`M14 ${75 - r}A${r} ${r} 0 0 1 14 ${75 + r}`}
                pathLength={1}
                fill="none"
                stroke="rgb(var(--ink))"
                strokeOpacity={k === 4 ? 0.5 : 0.22}
                strokeWidth={k === 4 ? 1.4 : 1.1}
                className="ad-draw"
                style={{ ["--ad-delay" as string]: `${0.2 + k * 0.15}s` }}
              />
            ))}
            <circle cx="14" cy="75" r="5" className="fill-blue" />
            <circle cx="14" cy="75" r="5" className="ad-ping fill-blue" />
          </svg>
          <span className="absolute left-[7%] top-[26%] font-mono text-[11px] uppercase tracking-[0.08em] text-blue">
            {content.origin}
          </span>
          <span className="absolute right-[3%] top-[46%] font-mono text-[11px] uppercase tracking-[0.08em] text-ink">
            {content.reach}
          </span>
        </div>
        <ul className="mt-6 border-t border-lineSoft">
          {DEPLOYMENTS.map((d) => (
            <li key={d.name} className="border-b border-lineSoft py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft">{d.name}</p>
              <p className="mt-1.5 flex items-baseline gap-2">
                <span className="text-[26px] font-semibold leading-none tracking-tighter text-ink">{d.figure}</span>
                <span className="text-[13px] leading-snug text-inkSoft">{d.label}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
