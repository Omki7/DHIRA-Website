"use client";

/*
 * Shared stat-tile design: the recipe first established in
 * CareersImpact.tsx's mission band, now the site-wide standard for any
 * "band of figures" (home ProvenAtScale, AkashicScale, FieldLedger,
 * Delivery/About/EIS/Life/Knowledge proof panels). One bordered light
 * frame (`bg-primary-bg`), a thin blue gradient top bar, dashed dividers
 * between cells, a pulsing-dot eyebrow above each count-up figure, and an
 * optional dashed-border footer caption. `frame` lets a stat grid nest
 * inside a card that already owns its own outer frame (no double chrome).
 */

import useCountUp from "@/hooks/useCountUp";

export type StatItem = {
  label: string;
  figure: string;
  sublabel: string;
  countUp?: boolean;
};

function Figure({ figure, countUp = true, size = "lg" }: { figure: string; countUp?: boolean; size?: "lg" | "md" }) {
  const { ref, display } = useCountUp(figure, { duration: 1500 });
  const sizeClass = size === "lg" ? "text-[34px] md:text-[38px]" : "text-2xl";
  return (
    <div
      ref={countUp ? ref : undefined}
      className={`whitespace-nowrap font-semibold leading-none tracking-tighter text-ink ${sizeClass}`}
    >
      {countUp ? display : figure}
    </div>
  );
}

function StatCell({ item, bordered, size }: { item: StatItem; bordered: boolean; size: "lg" | "md" }) {
  return (
    <div className={`flex flex-col p-6 ${bordered ? "border-t border-dashed border-lineSoft sm:border-t-0 sm:border-l" : ""}`}>
      <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-eyebrow text-inkSoft">
        <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
        {item.label}
      </span>
      <div className="mt-4">
        <Figure figure={item.figure} countUp={item.countUp} size={size} />
      </div>
      <span className="mt-2 text-[12.5px] text-inkSoft">{item.sublabel}</span>
    </div>
  );
}

export default function StatBand({
  items,
  caption,
  columns = 4,
  frame = true,
  size = "lg",
}: {
  items: StatItem[];
  caption?: string;
  columns?: 2 | 3 | 4;
  frame?: boolean;
  size?: "lg" | "md";
}) {
  const colClass =
    columns === 2 ? "sm:grid-cols-2" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";

  const grid = (
    <div className={`grid grid-cols-1 ${colClass}`}>
      {items.map((item, idx) => (
        <StatCell key={`${item.label}-${idx}`} item={item} bordered={idx > 0} size={size} />
      ))}
    </div>
  );

  if (!frame) return grid;

  return (
    <div className="overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg">
      <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
      {grid}
      {caption && (
        <div className="border-t border-dashed border-lineSoft px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
          {caption}
        </div>
      )}
    </div>
  );
}
