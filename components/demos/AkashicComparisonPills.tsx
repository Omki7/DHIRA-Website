"use client";

/*
 * The two states of the build-vs-buy argument, as a "funnel into one
 * platform" metaphor.
 *
 *  - "akashic": capability pills fall from the top, converge through a funnel
 *    and settle INTO one platform container — organised in three colour bands
 *    (white / blue / ink = Speed / Built in / Governed). The container is the
 *    Akashic platform: everything collects in one governed place.
 *  - "custom": the same concerns fall past and scatter — no funnel, no
 *    container, never collected.
 *
 * DOM + CSS only (the old canvas physics + hand-drawn underline were retired
 * as cheap effects). A staggered fall-and-settle plays on first view and is
 * skipped under prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from "react";
import AkashicLogo from "@/components/icons/AkashicLogo";

interface AkashicComparisonPillsProps {
  type: "akashic" | "custom";
}

type AkTheme = "white" | "blue" | "ink";

interface AkCategory {
  label: string;
  theme: AkTheme;
  items: string[];
}

/* Top → bottom inside the container: white / blue / ink. Light and fast on
   top, brand core in the middle, the solid governed foundation at the base. */
const AKASHIC_CATEGORIES: AkCategory[] = [
  { label: "Speed", theme: "white", items: ["Prebuilt connectors", "One deployment", "Live in weeks"] },
  { label: "Built in", theme: "blue", items: ["Knowledge graph", "Column lineage", "Grounded answers"] },
  { label: "Governed", theme: "ink", items: ["Certified", "Open standards", "Predictable cost"] },
];

const AK_PILL: Record<AkTheme, string> = {
  white: "bg-white text-blue ring-1 ring-blue-border shadow-card",
  blue: "bg-blue text-white shadow-card",
  ink: "bg-ink text-white shadow-card",
};

const AK_LABEL: Record<AkTheme, string> = {
  white: "text-blue",
  blue: "text-blue",
  ink: "text-ink",
};

type CustomTone = "gray-dark" | "gray-mid" | "gray-light";

interface CustomPill {
  text: string;
  tone: CustomTone;
  rot: number;
  dx: number;
  dy: number;
}

/* Custom build — the same three categories' pain points, in disarray. */
const CUSTOM_PILLS: CustomPill[] = [
  { text: "Custom APIs", tone: "gray-dark", rot: -6, dx: -6, dy: 3 },
  { text: "Seven systems", tone: "gray-mid", rot: 5, dx: 7, dy: -5 },
  { text: "Months to wire", tone: "gray-light", rot: -3, dx: 1, dy: 7 },
  { text: "Build the graph", tone: "gray-mid", rot: 7, dx: -9, dy: -2 },
  { text: "Manual lineage", tone: "gray-dark", rot: -5, dx: 5, dy: 6 },
  { text: "Grounding by hand", tone: "gray-light", rot: 3, dx: -3, dy: -7 },
  { text: "Certify yourself", tone: "gray-mid", rot: 8, dx: 9, dy: 3 },
  { text: "Vendor lock", tone: "gray-dark", rot: -7, dx: -7, dy: -3 },
  { text: "Cost creep", tone: "gray-light", rot: 5, dx: 3, dy: 7 },
];

const CUSTOM_TONE: Record<CustomTone, string> = {
  "gray-dark": "bg-lineSoft text-[#4A4D52] ring-1 ring-black/[0.04]",
  "gray-mid": "bg-panel text-secondary-text ring-1 ring-card-line",
  "gray-light": "bg-white text-tertiary-text ring-1 ring-lineSoft",
};

const PILL_BASE =
  "inline-flex select-none items-center whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium leading-none";

export default function AkashicComparisonPills({ type }: AkashicComparisonPillsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  /* ---- Custom: fall past and scatter, never collected ---- */
  if (type === "custom") {
    return (
      <div ref={ref} className="flex flex-1 items-center justify-center py-2">
        <div className="flex max-w-[300px] flex-wrap justify-center gap-x-2 gap-y-3">
          {CUSTOM_PILLS.map((p, i) => (
            <div key={p.text} style={{ transform: `translate(${p.dx}px, ${p.dy}px) rotate(${p.rot}deg)` }}>
              <span
                className={`${PILL_BASE} ${CUSTOM_TONE[p.tone]} transition-[transform,opacity] duration-[480ms] ease-settle`}
                style={{
                  transform: shown ? "translateY(0)" : "translateY(-26px)",
                  opacity: shown ? 1 : 0,
                  transitionDelay: `${i * 45}ms`,
                }}
              >
                {p.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---- Akashic: funnel and settle into one platform container ---- */
  return (
    <div ref={ref} className="flex flex-1 flex-col justify-center py-1">
      <div className="mx-auto w-full max-w-[430px]">
        {/* Funnel — capabilities dropping in, converging onto the platform */}
        <div className="relative h-11" aria-hidden>
          <span className="absolute left-1/2 top-0 -translate-x-1/2 font-mono text-[8px] font-semibold uppercase tracking-eyebrow text-secondary-text">
            Capabilities&nbsp;in
          </span>
          <svg viewBox="0 0 430 44" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-7 w-full">
            <path d="M26 2 L188 42" stroke="#C8D2F5" strokeWidth="1.2" strokeDasharray="2 5" strokeLinecap="round" fill="none" />
            <path d="M404 2 L242 42" stroke="#C8D2F5" strokeWidth="1.2" strokeDasharray="2 5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* The platform container the pills funnel into */}
        <div className="relative overflow-hidden rounded-outer border border-blue-border bg-white shadow-card">
          <div className="ak-capillary" />
          <div className="flex flex-col gap-2.5 px-4 pb-3 pt-3.5">
            {AKASHIC_CATEGORIES.map((cat, r) => (
              <div key={cat.label} className="flex flex-col items-center gap-1.5">
                <span className={`font-mono text-[8px] font-bold uppercase tracking-eyebrow ${AK_LABEL[cat.theme]}`}>
                  {cat.label}
                </span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {cat.items.map((t, c) => {
                    const i = r * 3 + c;
                    return (
                      <span
                        key={t}
                        className={`${PILL_BASE} ${AK_PILL[cat.theme]} transition-[transform,opacity] duration-[520ms] ease-settle`}
                        style={{
                          transform: shown ? "translate(0,0) scale(1)" : `translate(${(c - 1) * 46}px, -40px) scale(0.94)`,
                          opacity: shown ? 1 : 0,
                          transitionDelay: `${i * 55}ms`,
                        }}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {/* The platform label — everything collects here */}
          <div className="flex items-center justify-center border-t border-card-divide bg-panel/60 py-1.5">
            <AkashicLogo className="h-3.5 w-3.5" />
            <span className="-ml-0.5 text-[10px] font-bold tracking-tight text-ink">kashic</span>
            <span className="ml-1.5 font-mono text-[8px] uppercase tracking-eyebrow text-secondary-text">
              one platform
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
