import type { ComponentType, CSSProperties } from "react";
import Link from "next/link";
import type { NavDrawing, NavFeature } from "@/lib/navigation";
import { Arrow } from "./NavIcons";

/* The featured slot at the right of every menu. Its figure is drawn in the
   /about line language (hairlines, blue for what is live), never a product
   screenshot: the homepage already carries the screens. Paths use the
   shared `.ad-draw` / `.ad-fade` kit, so the figure draws in the first time
   its menu opens and lands on its final state under reduced motion. */

/** Stagger and pace for one `.ad-*` element. */
const pace = (delay: number, dur?: number) =>
  ({ "--ad-delay": `${delay}s`, ...(dur ? { "--ad-dur": `${dur}s` } : {}) }) as CSSProperties;

const LINE = "stroke-overcast/50";
const LIVE = "stroke-blue";

/* Akashic 1.0: seven modules standing on one foundation. */
function ReleaseFigure() {
  return (
    <>
      <path d="M6 60H234" className={`ad-draw ${LINE}`} strokeWidth={1.2} pathLength={1} style={pace(0, 0.7)} />
      {Array.from({ length: 7 }, (_, i) => {
        const x = 13 + i * 31;
        return (
          <g key={x}>
            <path d={`M${x + 11} 60V47`} className={`ad-draw ${LINE}`} strokeWidth={1.2} pathLength={1} style={pace(0.2 + i * 0.05, 0.3)} />
            <rect x={x} y={21} width={22} height={26} rx={4} className={`ad-draw ${LIVE}`} strokeWidth={1.2} pathLength={1} style={pace(0.3 + i * 0.06, 0.6)} />
          </g>
        );
      })}
    </>
  );
}

/* Solutions: three different routes on one solid foundation band, the
   groundwork laid once (the /akashic build-vs-buy drawing's idea). */
function FoundationFigure() {
  return (
    <>
      <rect x={6} y={54} width={228} height={8} rx={4} className={`ad-draw ${LIVE} fill-blue/15`} strokeWidth={1.2} pathLength={1} style={pace(0, 0.8)} />
      <path d="M44 54V40H70V22" className={`ad-draw ${LIVE}`} strokeWidth={1.2} pathLength={1} style={pace(0.35, 0.6)} />
      <path d="M120 54V30" className={`ad-draw ${LIVE}`} strokeWidth={1.2} pathLength={1} style={pace(0.45, 0.5)} />
      <path d="M196 54V44H172V14" className={`ad-draw ${LIVE}`} strokeWidth={1.2} pathLength={1} style={pace(0.55, 0.6)} />
      <circle cx={70} cy={18} r={4} className={`ad-fade ${LIVE} fill-primary-bg`} strokeWidth={1.2} style={pace(0.85)} />
      <circle cx={120} cy={26} r={4} className={`ad-fade ${LIVE} fill-primary-bg`} strokeWidth={1.2} style={pace(0.9)} />
      <circle cx={172} cy={10} r={4} className={`ad-fade ${LIVE} fill-primary-bg`} strokeWidth={1.2} style={pace(0.95)} />
    </>
  );
}

/* Services: one line through the four stages of the /delivery method. */
function MethodFigure() {
  const stations = [30, 90, 150, 210];
  return (
    <>
      <path d="M12 38H228" className={`ad-draw ${LIVE}`} strokeWidth={1.2} pathLength={1} style={pace(0, 1.1)} />
      {stations.map((x, i) => (
        <circle key={x} cx={x} cy={38} r={6} className={`ad-fade ${LIVE} fill-primary-bg`} strokeWidth={1.2} style={pace(0.2 + i * 0.22)} />
      ))}
      <circle cx={210} cy={38} r={11} className={`ad-fade ${LINE}`} strokeWidth={1.2} style={pace(1.0)} />
    </>
  );
}

/* Company: the careers table in plan, one empty blue chair. Break lines at
   both ends, as on /careers: a countable table would be a headcount claim. */
function SeatFigure() {
  const chairs = [48, 76, 104, 132, 160, 188];
  return (
    <>
      <rect x={30} y={29} width={180} height={16} rx={3} className={`ad-draw ${LINE}`} strokeWidth={1.2} pathLength={1} style={pace(0, 0.8)} />
      {chairs.map((x, i) => (
        <g key={x}>
          <rect x={x - 7} y={15} width={14} height={8} rx={2} className={`ad-fade ${LINE}`} strokeWidth={1.2} style={pace(0.3 + i * 0.04)} />
          {x === 132 ? (
            <rect x={x - 7} y={51} width={14} height={8} rx={2} className={`ad-fade ${LIVE} fill-blue/15`} strokeWidth={1.4} style={pace(0.75)} />
          ) : (
            <rect x={x - 7} y={51} width={14} height={8} rx={2} className={`ad-fade ${LINE}`} strokeWidth={1.2} style={pace(0.34 + i * 0.04)} />
          )}
        </g>
      ))}
      <path d="M26 21l5 5-5 5 5 5-5 5 5 5" className={`ad-fade ${LINE}`} strokeWidth={1.2} style={pace(0.55)} />
      <path d="M214 21l-5 5 5 5-5 5 5 5-5 5" className={`ad-fade ${LINE}`} strokeWidth={1.2} style={pace(0.55)} />
    </>
  );
}

const FIGURES: Record<NavDrawing, ComponentType> = {
  release: ReleaseFigure,
  foundation: FoundationFigure,
  method: MethodFigure,
  seat: SeatFigure,
};

export default function NavFeatured({
  feature,
  drawn,
  className = "",
}: {
  feature: NavFeature;
  drawn: boolean;
  className?: string;
}) {
  const Figure = FIGURES[feature.drawing];
  return (
    <Link
      href={feature.href}
      className={`group flex flex-col rounded-outer border border-subtle-stroke bg-primary-bg p-5 transition-colors duration-250 ease-settle hover:border-blue-border ${className}`}
    >
      <span data-drawn={drawn} className="block">
        <svg viewBox="0 0 240 72" fill="none" aria-hidden className="h-[72px] w-full">
          <Figure />
        </svg>
      </span>
      <span className="mt-4 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-overcast">
        {feature.eyebrow}
      </span>
      <span className="mt-1.5 whitespace-pre-line text-balance font-heading text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">
        {feature.title}
      </span>
      <span className="mt-1.5 text-balance text-[13px] leading-snug text-secondary-text">{feature.caption}</span>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-blue transition-colors duration-150 group-hover:text-blue-hover">
        {feature.cta}
        <Arrow className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
