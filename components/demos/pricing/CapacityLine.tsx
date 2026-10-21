"use client";

/*
 * The capacity line across the top of the /pricing plan frame (21 Oct
 * 2026). One blue line steps up at each column edge: Launch, Growth and
 * Scale are fixed capacities (solid, a bead where each begins); Enterprise
 * is sized to the estate, so its step is dashed and runs out through the
 * frame's edge. The steps are ordinal, not to scale: the figures under each
 * plan carry the numbers. The risers fall on the column rules below, so
 * the line reads as growing out of the grid. Drawn in pixels from the
 * measured width (a stretched viewBox would bend the dashes and beads).
 * Draws once on view; final state under reduced motion. lg and up only.
 */

import { useEffect, useState, type CSSProperties } from "react";
import useDrawn from "@/hooks/useDrawn";

const HEIGHT = 76;
const PAD = 28;
const STEPS = [58, 45, 32, 19];

const pace = (delay: number, dur?: number) =>
  ({ "--ad-delay": `${delay}s`, ...(dur ? { "--ad-dur": `${dur}s` } : {}) }) as CSSProperties;

export default function CapacityLine({ label, open, caption }: { label: string; open: string; caption: string }) {
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.3);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  const col = width / 4;
  const solid = `M${PAD} ${STEPS[0]} H${col} V${STEPS[1]} H${col * 2} V${STEPS[2]} H${col * 3}`;
  const dashed = `M${col * 3} ${STEPS[2]} V${STEPS[3]} H${width}`;
  const beads = [PAD, col, col * 2, col * 3].map((x, i) => ({ x, y: STEPS[i] }));

  return (
    <div ref={ref} data-drawn={drawn} className="relative hidden lg:block" style={{ height: HEIGHT }}>
      <p className="sr-only">{caption}</p>
      <p aria-hidden className="ad-fade absolute left-7 top-[26px] font-mono text-[10.5px] uppercase tracking-eyebrow text-overcast" style={pace(0.1)}>
        {label}
      </p>
      <p aria-hidden className="ad-fade absolute right-7 top-[30px] font-mono text-[10.5px] uppercase tracking-eyebrow text-overcast" style={pace(1.3)}>
        {open}
      </p>
      {width > 0 && (
        <svg aria-hidden width={width} height={HEIGHT} viewBox={`0 0 ${width} ${HEIGHT}`} className="absolute inset-0 overflow-visible">
          <path d={solid} pathLength={1} fill="none" stroke="rgb(var(--blue))" strokeWidth={1.5} strokeLinejoin="round" className="ad-draw" style={pace(0.15, 1.2)} />
          <path d={dashed} fill="none" stroke="rgb(var(--blue))" strokeWidth={1.5} strokeDasharray="3 4" className="ad-fade" style={pace(1.15)} />
          {beads.map((bead, i) => (
            <circle
              key={i}
              cx={bead.x}
              cy={bead.y}
              r={3.5}
              fill={i === 3 ? "rgb(var(--background))" : "rgb(var(--blue))"}
              stroke={i === 3 ? "rgb(var(--blue))" : "rgb(var(--background))"}
              strokeWidth={i === 3 ? 1.5 : 2}
              className="ad-fade"
              style={pace(0.15 + i * 0.3)}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
