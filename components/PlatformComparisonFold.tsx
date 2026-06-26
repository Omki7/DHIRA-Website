"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

/**
 * DESIGN INTENT:
 * "Why teams switch" — a framed Gantt-style timeline comparison nested inside [02] PowerfulPlatform.
 * Same governed fact (the data), two lanes (Akashic vs the Old Way) on one shared Day-1→18mo scale:
 *   - Akashic lane: two compact phase blocks (Ingest → Govern) terminating at 'Now / Week 3' (dashed blue-border rule),
 *     then an expansive blue-subtle compounding zone carrying the ps-sheen — speaking to immediate value that keeps growing.
 *   - Old Way lane: a four-block Scope / Integrate / Model / BI-build waterfall that never reaches compounding,
 *     capped by a neutral stalled zone (dashed dashring + Still integrating pill).
 * Distinct exhibit shape per the per-section visual uniqueness rule — NOT generic cards. Light surface only;
 * the one dark inversion remains ProvenAtScale + the dark Footer. All animation uses ease-settle (cubic-bezier(0.2,0.8,0.2,1));
 * reduced motion is handled by global CSS.
 */
export default function PlatformComparisonFold() {
  const foldRef = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!foldRef.current || !window.IntersectionObserver) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(foldRef.current);

    const fallback = setTimeout(() => setOn(true), 1500);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const EASE = "cubic-bezier(0.2,0.8,0.2,1)";

  // ── Akashic phase blocks (Ingest 0–12%, Govern 12–17%) ─────────────────────
  const akBlock = (left: string, width: string, label: string, delay: string) => ({
    position: "absolute" as const,
    left,
    top: "34px",
    height: "30px",
    width: on ? width : "0%",
    opacity: on ? 1 : 0,
    background: "#3E63DD",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    overflow: "hidden",
    whiteSpace: "nowrap",
    transition: `width .9s ${EASE} ${delay}, opacity .45s ${EASE} ${delay}`,
  });

  // ── Old Way phase blocks (Scope 0–14%, Integrate 14–30%, Model 30–52%, BI 52–70%) ─
  const oldBlock = (left: string, width: string, label: string, delay: string) => ({
    position: "absolute" as const,
    left,
    top: "34px",
    height: "30px",
    width: on ? width : "0%",
    opacity: on ? 1 : 0,
    background: "#FFFFFF",
    border: "1px solid #D9DADB",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#5C5E63",
    fontSize: "11px",
    fontWeight: 500,
    overflow: "hidden",
    whiteSpace: "nowrap",
    transition: `width .9s ${EASE} ${delay}, opacity .45s ${EASE} ${delay}`,
  });

  return (
    <div ref={foldRef} className="bg-primary-bg">
      <div className="rail-container pt-[64px] pb-[80px]">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="mx-auto max-w-[640px] text-center">
            <div className="mb-3 font-mono text-[11.5px] uppercase tracking-[0.13em] text-inkSoft">
              Why teams switch &middot; two timelines
            </div>
            <h3 className="text-balance text-[30px] font-semibold leading-[1.18] tracking-[-0.02em] text-ink">
              Same data. Two very different timelines.
            </h3>
            <p className="mx-auto mt-[16px] max-w-[560px] text-balance text-[17px] leading-[1.6] text-accent-text">
              Most platforms take a year to reach a first trusted answer. Akashic gets you there in weeks &mdash; then keeps compounding.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Exhibit frame ──────────────────────────────────────────────── */}
        <ScrollReveal delay={120}>
          <div className="mt-[44px] rounded-frame border border-lineSoft bg-white p-[28px] shadow-frame">
            {/* meta row */}
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
                Snapshot &middot; 12 months in
              </span>
              <div className="flex items-center gap-5">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-[3px] bg-blue" />
                  <span className="text-[12px] font-medium text-inkSoft">The Akashic Way</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-[3px] border border-default-stroke bg-white" />
                  <span className="text-[12px] font-medium text-inkSoft">The Old Way</span>
                </span>
              </div>
            </div>

            {/* ── Akashic lane ────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[208px_1fr] lg:gap-5">
              <div className="flex flex-col justify-center">
                <span className="inline-flex w-fit items-center rounded-tag border border-blue-border bg-blue-subtle px-2 py-[3px] font-mono text-[10px] uppercase tracking-eyebrow text-blue">
                  The Akashic Way
                </span>
                <div className="mt-[10px] text-[22px] font-semibold tracking-tight text-blue">
                  Weeks
                </div>
                <div className="text-[12px] text-inkSoft">then compounding</div>
              </div>

              <div className="relative h-[120px] rounded-[10px] bg-tertiary-bg">
                {/* Ingest 0–12% */}
                <div style={akBlock("2%", "10%", "Ingest", ".2s")}>Ingest</div>
                {/* Govern 12–17% */}
                <div style={akBlock("13%", "5%", "Govern", ".45s")}>Govern</div>

                {/* Now rule at 18% */}
                <div
                  className="absolute top-0 bottom-0 border-l border-dashed border-blue-border"
                  style={{ left: "18%", opacity: on ? 1 : 0, transition: `opacity .5s ${EASE} .8s` }}
                ></div>
                <div
                  className="absolute top-1 -translate-x-1/2"
                  style={{ left: "18%", opacity: on ? 1 : 0, transition: `opacity .5s ${EASE} .9s` }}
                >
                  <span className="rounded-tag border border-blue-border bg-white px-[6px] py-[1px] text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                    Now
                  </span>
                </div>

                {/* Compounding zone 18% → 98% */}
                <div
                  className="absolute rounded-[10px] border border-blue-border bg-blue-subtle"
                  style={{
                    left: "18%",
                    right: "2%",
                    top: "70px",
                    bottom: "10px",
                    opacity: on ? 1 : 0,
                    transition: `opacity .7s ${EASE} 1.0s`,
                    overflow: "hidden",
                  }}
                >
                  <span
                    className="absolute inset-0 animate-[ps-sheen_3.4s_cubic-bezier(0.2,0.8,0.2,1)_infinite]"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(62,99,221,0.18), transparent)" }}
                  ></span>
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-[11px] font-medium text-blue">Compounding value</span>
                    <span className="text-[11px] font-medium text-blue/70">zero re-platforming</span>
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-blue"
                      style={{ animation: "softpulse 2.4s ease-in-out infinite" }}
                    ></span>
                  </div>
                </div>

                {/* lane caption strip */}
                <div className="absolute inset-x-0 bottom-1 flex justify-center">
                  <span className="text-[10.5px] text-overcast">
                    Day 1 &rarr; Week 3 (now) &rarr; months 1&ndash;18 &middot; compounding value, zero re-platforming
                  </span>
                </div>
              </div>
            </div>

            {/* ── Old Way lane ────────────────────────────────────────────── */}
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-lineSoft pt-4 lg:grid-cols-[208px_1fr] lg:gap-5">
              <div className="flex flex-col justify-center">
                <span className="inline-flex w-fit items-center rounded-tag border border-default-stroke bg-tertiary-bg px-2 py-[3px] font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
                  The Old Way
                </span>
                <div className="mt-[10px] text-[22px] font-semibold tracking-tight text-ink">
                  12&ndash;18 mo
                </div>
                <div className="text-[12px] text-overcast">still integrating</div>
              </div>

              <div className="relative h-[120px] rounded-[10px] bg-tertiary-bg">
                {/* Scope 0–14% */}
                <div style={oldBlock("2%", "12%", "Scope", ".2s")}>Scope</div>
                {/* Integrate 14–30% */}
                <div style={oldBlock("15%", "15%", "Integrate", ".45s")}>Integrate</div>
                {/* Model 30–52% */}
                <div style={oldBlock("31%", "21%", "Model", ".7s")}>Model</div>
                {/* BI build 52–70% */}
                <div style={oldBlock("53%", "17%", "BI build", ".95s")}>BI build</div>

                {/* Stalled zone 70% → 98% */}
                <div
                  className="absolute rounded-[10px] border border-dashed border-default-stroke bg-white"
                  style={{
                    left: "70%",
                    right: "2%",
                    top: "26px",
                    bottom: "26px",
                    opacity: on ? 1 : 0,
                    transition: `opacity .7s ${EASE} 1.3s`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center gap-2">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8E8F91"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      className="animate-[dashmove_1.6s_linear_infinite]"
                      style={{ transformOrigin: "center" }}
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <span className="rounded-tag border border-default-stroke bg-white px-2 py-[2px] text-[11px] font-semibold text-secondary-text">
                      Still integrating
                    </span>
                  </div>
                </div>

                {/* lane caption strip */}
                <div className="absolute inset-x-0 bottom-1 flex justify-center">
                  <span className="text-[10.5px] text-overcast">
                    Scoping &rarr; Integration &rarr; Modeling &rarr; BI build &rarr; stuck before value
                  </span>
                </div>
              </div>
            </div>

            {/* ── Shared time axis ────────────────────────────────────────── */}
            <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[208px_1fr] lg:gap-5">
              <div className="hidden lg:block"></div>
              <div className="relative h-7">
                <div className="absolute left-0 right-0 top-0 h-px bg-lineSoft"></div>
                <div className="absolute top-[-3px] h-[7px] w-px bg-line"></div>
                <div className="absolute left-[18%] top-[-3px] h-[7px] w-px -translate-x-1/2 bg-blue-border"></div>
                <div className="absolute left-[40%] top-[-3px] h-[7px] w-px -translate-x-1/2 bg-line"></div>
                <div className="absolute left-[70%] top-[-3px] h-[7px] w-px -translate-x-1/2 bg-line"></div>
                <div className="absolute right-0 top-[-3px] h-[7px] w-px bg-line"></div>

                <div className="absolute top-2 left-0 text-[11px] text-inkSoft">Day 1</div>
                <div className="absolute top-2 left-[18%] -translate-x-1/2 text-[11px] font-semibold text-blue">
                  Week 3
                </div>
                <div className="absolute top-2 left-[40%] -translate-x-1/2 text-[11px] text-inkSoft">6 months</div>
                <div className="absolute top-2 left-[70%] -translate-x-1/2 text-[11px] text-inkSoft">12 months</div>
                <div className="absolute top-2 right-0 text-[11px] text-inkSoft">18 months</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}