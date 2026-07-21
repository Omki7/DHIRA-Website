"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * The "Meet the modules" walkthrough for /akashic [02]: one customer record
 * (9042) travels all seven modules as clean wireframe stages —
 * pipelines, master data, warehouse, ML, Ask Akashic, BI, governance.
 * Stage panels are static SVG wireframes (StartAnywherePanelsMockup, injected
 * via dangerouslySetInnerHTML like HeroProductsMockup — see AGENTS.md §8a);
 * the draw-in animation runs on the Web Animations API and reveals
 * everything instantly under prefers-reduced-motion.
 *
 * Controlled component: `stage` (-1 = intro overlay, 0–6 = modules) is owned
 * by AkashicModular's scrollytelling track; every internal control (tabs,
 * rail cards, arrows, Begin) delegates to `onNavigate`, which scrolls the
 * page so native scroll stays the single source of truth. Inline styles here
 * are computed simulated-UI chrome (Rule 8 exception).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PANEL_SVGS } from "@/components/demos/mockups/StartAnywherePanelsMockup";

const ACCENT = "#3E63DD";
const MONO = "'Google Sans Mono',ui-monospace,monospace";

const NAV_LABELS = ["Pipelines", "Master Data", "Warehouse", "ML", "Ask Akashic", "BI", "Governance"];

const CARD_DEFS = [
  { ph: "01 · pipelines", title: "VALIDATED LANDING", l1: "orders_raw · events · docs", l2: "contract v3 · typed", ann: "rbac — ingest role only", icon: "M5 7 V5.5 a3 3 0 0 1 6 0 V7 M3.5 7 h9 v6 h-9 Z" },
  { ph: "02 · master data", title: "GOLDEN RECORD", l1: "customer 9042", l2: "3 sources → 1 · conf 0.98", ann: "steward-approved merge", icon: "M8 1.5 a6.5 6.5 0 1 0 0 13 a6.5 6.5 0 1 0 0 -13 M5 8.2 l2.2 2.4 L11.2 5.8" },
  { ph: "03 · warehouse", title: "FACT: ORDERS + DIMS", l1: "order 8814-2207 · $18,400", l2: "net_revenue · order_volume", ann: "pii — tax_id masked", icon: "M2.5 5 h11 v5.5 h-11 Z M5.2 10.5 l2.3 -5.5 M8.2 10.5 l2.3 -5.5 M11.2 10.5 l1.8 -4.3" },
  { ph: "04 · ml", title: "FORECAST — v3 SIGNED", l1: "≈12,400 units next qtr", l2: "MAPE 6.2% · monitored", ann: "model registry — signed", icon: "M3 2.5 h7.5 l2.5 2.5 v8.5 h-10 Z M5.5 6.5 h5 M5.5 9 h3.5 M9 12.5 l1.6 1.6 l3 -3.6" },
  { ph: "05 · ask akashic", title: "GROUNDED ANSWER", l1: "12,400 units · +9% · p85", l2: "source: 9042 · model v3", ann: "row-level security", icon: "M2.5 4 h11 M2.5 7.5 h11 M2.5 11 h5.5 M10.5 9.5 h3 v3.5 h-3 Z" },
  { ph: "06 · bi", title: "DASHBOARD — 3 TILES", l1: "cust 9042 KPI · region gap", l2: "metric layer · defined once", ann: "row-level security", icon: "M2.5 4 h11 M2.5 7.5 h11 M2.5 11 h5.5 M10.5 9.5 h3 v3.5 h-3 Z" },
];

const REF_BY: Record<number, number[]> = { 4: [1, 2, 3], 5: [2] };

const INFOS = [
  { k1: "AKASHIC MODULE", k2: "PIPELINES", h: "Every source, ingested and validated.", d: "Bring in structured and unstructured data: CRMs, ERPs, PDFs, spreadsheets, live feeds. Every record is validated the moment it arrives, so bad data never reaches storage." },
  { k1: "AKASHIC MODULE", k2: "MASTER DATA", h: "One golden record. No duplicates.", d: "Resolve every version of an entity, whether a customer, a vendor, or a location, into one trusted record. This becomes the foundation every other module builds on." },
  { k1: "AKASHIC MODULE", k2: "WAREHOUSE", h: "Structured, modelled, ready to query.", d: "Turns mastered records into models built for fast, reliable queries. Metrics are defined once here, so every answer downstream means the same thing everywhere." },
  { k1: "AKASHIC MODULE", k2: "ML", h: "Models built where your data already lives.", d: "Train, deploy, and monitor predictive models directly on governed data. No separate export, no separate environment to maintain." },
  { k1: "AKASHIC MODULE", k2: "ASK AKASHIC", h: "Plain-language answers, grounded in your data.", d: "Ask a question in plain language, get an answer sourced from your governed data, not a guess. Every figure in the answer is cited." },
  { k1: "AKASHIC MODULE", k2: "BI", h: "Dashboards and metrics, defined once.", d: "Build dashboards and reports where every metric means the same thing every time it's used. Answers now, not a BI project that takes a quarter." },
  { k1: "AKASHIC MODULE", k2: "GOVERNANCE", h: "Access, lineage, and audit, from day one.", d: "Role-based access, full lineage, and audit trails apply from the first module you deploy. Governance runs underneath whatever you start with." },
];

const PRE_START_INFO = {
  k1: "MODULES",
  k2: "ONE FOUNDATION",
  h: "Meet the seven modules.",
  d: "One customer record, 9042, travels the whole platform: ingested, mastered, modelled, forecast, questioned, dashboarded, audited. Scroll to follow it module by module.",
};

const AUDIT_ROWS = [
  ["06:12:04", "ingest crm #4471 → passed contract v3 · rbac ok"],
  ["06:12:19", "merged #4471 + #4471-B + pdf → customer 9042 · steward approved"],
  ["06:14:02", "tax_id masked · order 8814-2207 joined to fact_orders"],
  ["06:15:11", "scored by demand-forecast v3 · signed · anomaly flagged"],
  ["06:16:40", "answer served · row-level security applied"],
];

type DrawItem =
  | { el: SVGElement | HTMLElement; g: number; type: "pop" | "fade" }
  | { el: SVGGeometryElement; g: number; type: "draw"; len: number };

type Props = {
  stage: number;
  onNavigate: (target: number) => void;
};

export default function StartAnywhereWalkthroughMockup({ stage, onNavigate }: Props) {
  const started = stage >= 0;
  const current = Math.max(0, stage);
  const [maxReached, setMaxReached] = useState(-1);

  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement | null>(null);
  const planRef = useRef<Record<number, DrawItem[]>>({});
  const drawnRef = useRef<Record<number, boolean>>({});
  const preppedRef = useRef(false);
  const reducedRef = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prevStageRef = useRef(stage);
  const stageRef = useRef(stage);
  stageRef.current = stage;

  const revealAll = useCallback(() => {
    Object.keys(planRef.current).forEach((k) => {
      planRef.current[+k].forEach((it) => {
        if (it.type === "draw") it.el.style.strokeDashoffset = "0";
        else {
          it.el.style.opacity = "1";
          if (it.type === "pop") it.el.style.transform = "scale(1)";
        }
      });
      drawnRef.current[+k] = true;
    });
  }, []);

  const prepAll = useCallback(() => {
    if (preppedRef.current) return;
    preppedRef.current = true;
    if (reducedRef.current) return;
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const svg = panel.querySelector("svg[viewBox]");
      if (!svg) return;
      const items: DrawItem[] = [];
      svg.querySelectorAll<SVGElement>("[data-d]").forEach((el) => {
        const g = +(el.getAttribute("data-d") ?? 0);
        if (el.hasAttribute("data-pop")) {
          el.style.opacity = "0";
          el.style.transformBox = "fill-box";
          el.style.transformOrigin = "center";
          el.style.transform = "scale(.4)";
          items.push({ el, g, type: "pop" });
          return;
        }
        let len: number | null = null;
        const geo = el as SVGGeometryElement;
        if (typeof geo.getTotalLength === "function" && !el.getAttribute("stroke-dasharray")) {
          try {
            len = geo.getTotalLength();
          } catch {
            len = null;
          }
        }
        const stroked = el.getAttribute("stroke") || (el.closest("[stroke]") && el.tagName !== "text");
        if (len && len > 0 && stroked) {
          el.style.strokeDasharray = String(len);
          el.style.strokeDashoffset = String(len);
          items.push({ el: geo, g, type: "draw", len });
        } else {
          el.style.opacity = "0";
          items.push({ el, g, type: "fade" });
        }
      });
      items.sort((a, b) => a.g - b.g);
      planRef.current[i] = items;
    });
  }, []);

  const draw = useCallback((i: number, fast?: boolean) => {
    if (i < 0 || drawnRef.current[i] || reducedRef.current) return;
    const items = planRef.current[i];
    if (!items) return;
    drawnRef.current[i] = true;
    const speed = fast ? 0.45 : 1;
    const counts: Record<number, number> = {};
    items.forEach((it) => {
      const k = counts[it.g] || 0;
      counts[it.g] = k + 1;
      const delay = (it.g * 190 + k * 42) * speed;
      if (it.type === "draw") {
        const dur = Math.max(320, Math.min(950, 280 + it.len * 0.9)) * speed;
        const a = it.el.animate([{ strokeDashoffset: it.len }, { strokeDashoffset: 0 }], {
          duration: dur,
          delay,
          easing: "cubic-bezier(.5,0,.3,1)",
          fill: "forwards",
        });
        a.onfinish = () => {
          it.el.style.strokeDashoffset = "0";
        };
      } else if (it.type === "pop") {
        const a = it.el.animate(
          [
            { opacity: 0, transform: "scale(.4)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          { duration: 420, delay: delay + 130 * speed, easing: "cubic-bezier(.34,1.56,.64,1)", fill: "forwards" }
        );
        a.onfinish = () => {
          it.el.style.opacity = "1";
          it.el.style.transform = "scale(1)";
        };
      } else {
        const a = it.el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 480,
          delay: delay + 160 * speed,
          easing: "ease-out",
          fill: "forwards",
        });
        a.onfinish = () => {
          it.el.style.opacity = "1";
        };
      }
    });
  }, []);

  const resetPanel = useCallback((i: number) => {
    if (i < 0 || !drawnRef.current[i] || reducedRef.current) return;
    drawnRef.current[i] = false;
    (planRef.current[i] || []).forEach((it) => {
      it.el.getAnimations().forEach((a) => a.cancel());
      if (it.type === "draw") {
        it.el.style.strokeDasharray = String(it.len);
        it.el.style.strokeDashoffset = String(it.len);
      } else if (it.type === "pop") {
        it.el.style.opacity = "0";
        it.el.style.transform = "scale(.4)";
      } else {
        it.el.style.opacity = "0";
      }
    });
  }, []);

  const scrollRail = useCallback((t: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = rail.querySelectorAll<HTMLElement>("[data-rail-card]");
    const el = cards[Math.min(Math.max(t, 0), cards.length - 1)];
    if (!el) return;
    const rb = rail.getBoundingClientRect();
    const bb = el.getBoundingClientRect();
    const top = bb.top - rb.top + rail.scrollTop;
    const bottom = top + bb.height;
    const max = Math.max(0, rail.scrollHeight - rail.clientHeight);
    let target = rail.scrollTop;
    if (bottom > rail.scrollTop + rail.clientHeight - 6) target = bottom - rail.clientHeight + 14;
    else if (top < rail.scrollTop + 6) target = top - 14;
    target = Math.max(0, Math.min(max, target));
    if (Math.abs(target - rail.scrollTop) > 1) rail.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = requestAnimationFrame(() => {
      prepAll();
      if (reducedRef.current) revealAll();
      else if (stageRef.current >= 0) draw(stageRef.current);
    });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resetTimer.current);
    };
  }, [prepAll, revealAll, draw]);

  useEffect(() => {
    const prev = prevStageRef.current;
    if (stage === prev) return;
    prevStageRef.current = stage;
    setMaxReached((m) => Math.max(m, stage));
    if (stage >= 0) {
      draw(stage, Math.abs(stage - prev) > 1);
      setTimeout(() => scrollRail(stage), 80);
      if (stage === 6) setTimeout(() => scrollRail(5), 750);
    }
    clearTimeout(resetTimer.current);
    if (prev >= 0) {
      resetTimer.current = setTimeout(() => {
        if (stageRef.current !== prev) resetPanel(prev);
      }, 450);
    }
  }, [stage, draw, resetPanel, scrollRail]);

  const gov = started && stage === 6;
  const info = started ? INFOS[current] : PRE_START_INFO;

  const panelStyle = (i: number): React.CSSProperties => {
    const active = started && stage === i;
    return {
      position: "absolute",
      inset: 0,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px 16px",
      opacity: active ? 1 : 0,
      visibility: active ? "visible" : "hidden",
      transform: active ? "none" : "translateY(10px)",
      transition: active
        ? "opacity .45s ease .12s, transform .5s cubic-bezier(.22,1,.36,1) .12s, visibility 0s"
        : "opacity .3s ease, transform .3s ease, visibility 0s linear .3s",
    };
  };

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-frame border border-lineSoft bg-primary-bg shadow-frame"
      role="group"
      aria-label="Meet the modules: one record through all seven Akashic modules"
    >
      {/* Stage nav */}
      <nav className="flex h-[52px] flex-none items-center border-b border-lineSoft bg-white/95 px-4 lg:px-8">
        <span className="hidden flex-none font-mono text-[12px] font-semibold tracking-[0.18em] text-ink sm:inline">AKASHIC</span>
        <div className="flex h-full min-w-0 flex-1 items-center justify-start gap-0.5 overflow-x-auto sm:justify-center" style={{ scrollbarWidth: "none" }}>
          {NAV_LABELS.map((label, i) => {
            const isActive = started && stage === i;
            const reached = i <= maxReached;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onNavigate(i)}
                className="whitespace-nowrap px-2.5 pb-4 pt-[18px] font-mono text-[10.5px] uppercase tracking-[0.09em] transition-colors duration-250 lg:px-3"
                style={{
                  color: isActive ? ACCENT : reached ? "#5C5E63" : "#8A919C",
                  fontWeight: isActive ? 600 : 500,
                  boxShadow: isActive ? `inset 0 -2px 0 ${ACCENT}` : "none",
                }}
              >
                <span className="mr-1.5 opacity-75">{`0${i + 1}`}</span>
                {label}
              </button>
            );
          })}
        </div>
        <span className="hidden w-[76px] flex-none sm:block" />
      </nav>

      {/* Main row */}
      <div className="flex min-h-0 flex-1">
        {/* Result rail */}
        <div
          ref={railRef}
          className="hidden w-[242px] flex-none flex-col overflow-y-auto overflow-x-hidden border-r border-lineSoft py-4 pl-6 pr-3 lg:flex"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex-none">
            <div className="font-mono text-[10px] font-semibold tracking-[0.16em] text-ink">ONE RECORD, END TO END</div>
            <div className="mt-1 font-mono text-[10px] text-[#6F7988]">customer 9042 · order 8814-2207</div>
          </div>
          <div className="relative mt-3 flex flex-col gap-2.5 pl-[15px]">
            <span className="absolute bottom-2 left-[3px] top-2 w-0 border-l-2 border-dotted border-line" aria-hidden />
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: 3,
                top: 8,
                width: 2,
                background: ACCENT,
                zIndex: 1,
                height: gov ? "calc(100% - 16px)" : 0,
                transition: "height 1.1s cubic-bezier(.5,0,.3,1) .1s",
              }}
            />
            {CARD_DEFS.map((c, i) => {
              const pinned = started && stage > i;
              const isCurrent = started && stage === i;
              const referenced = pinned && (REF_BY[current] || []).indexOf(i) >= 0;
              return (
                <div key={c.ph} data-rail-card="1" className="relative">
                  <button
                    type="button"
                    onClick={() => onNavigate(i)}
                    title={c.ph}
                    style={{
                      display: "block",
                      width: "100%",
                      height: gov ? 88 : 66,
                      boxSizing: "border-box",
                      position: "relative",
                      appearance: "none",
                      background: "#FFFFFF",
                      border: pinned
                        ? referenced
                          ? `1.4px solid ${ACCENT}`
                          : "1.4px solid #2F3132"
                        : isCurrent
                          ? `1.4px dashed ${ACCENT}`
                          : "1.2px dashed #C6CBD2",
                      borderRadius: 4,
                      padding: 0,
                      cursor: "pointer",
                      textAlign: "left",
                      overflow: "hidden",
                      transition: "border-color .4s ease, height .5s cubic-bezier(.5,0,.3,1)",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: MONO,
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: isCurrent ? ACCENT : "#8A919C",
                        opacity: pinned ? 0 : 1,
                        transition: "opacity .35s ease, color .3s ease",
                      }}
                    >
                      {c.ph}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        padding: "9px 11px",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        transformOrigin: "left center",
                        pointerEvents: "none",
                        opacity: pinned ? 1 : 0,
                        transform: pinned ? "none" : "translate(300px, -20px) scale(1.9)",
                        transition: `transform .65s cubic-bezier(.22,1,.36,1) ${i * 0.06}s, opacity .5s ease ${i * 0.06}s`,
                      }}
                    >
                      <span className="whitespace-nowrap font-mono text-[10.5px] font-semibold tracking-[0.05em] text-ink">{c.title}</span>
                      <span className="whitespace-nowrap font-mono text-[10px] text-secondary-text">{c.l1}</span>
                      <span className="whitespace-nowrap font-mono text-[10px] text-[#6F7988]">{c.l2}</span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          marginTop: 4,
                          fontFamily: MONO,
                          fontSize: 10,
                          fontWeight: 600,
                          color: ACCENT,
                          whiteSpace: "nowrap",
                          opacity: gov ? 1 : 0,
                          maxHeight: gov ? 14 : 0,
                          overflow: "hidden",
                          transition: `opacity .45s ease ${0.5 + i * 0.15}s, max-height .4s ease ${0.25 + i * 0.08}s`,
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="flex-none">
                          <path d={c.icon} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{c.ann}</span>
                      </span>
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 7,
                        display: "flex",
                        pointerEvents: "none",
                        color: gov ? ACCENT : "#C9CDD3",
                        opacity: pinned ? 1 : 0,
                        transition: `opacity .4s ease .3s, color .4s ease ${0.4 + i * 0.15}s`,
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="block">
                        <path d="M5 7 V5.5 a3 3 0 0 1 6 0 V7 M3.5 7 h9 v6 h-9 Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: -14.5,
                      top: "50%",
                      width: 7,
                      height: 7,
                      marginTop: -4.5,
                      borderRadius: "50%",
                      border: `1.6px solid ${ACCENT}`,
                      background: "#FAFAFB",
                      boxSizing: "border-box",
                      opacity: gov ? 1 : 0,
                      transform: gov ? "scale(1)" : "scale(.3)",
                      transition: `opacity .4s ease ${0.5 + i * 0.14}s, transform .4s ease ${0.5 + i * 0.14}s`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Active workspace */}
        <div className="relative min-w-0 flex-1 overflow-hidden">
          {PANEL_SVGS.map((svg, i) => (
            <div
              key={i}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              style={panelStyle(i)}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ))}

          {/* 07 · Governance */}
          <div
            ref={(el) => {
              panelRefs.current[6] = el;
            }}
            style={panelStyle(6)}
          >
            <div
              className="flex w-full max-w-[720px] flex-col"
              style={{
                opacity: gov ? 1 : 0,
                transform: gov ? "none" : "translateY(26px)",
                transition: "opacity .7s ease .15s, transform .7s ease .15s",
              }}
            >
              <div className="text-[20px] font-semibold tracking-tight text-ink sm:text-[26px]">
                One record. Five checkpoints. Zero gaps.
              </div>
              <div className="relative mt-7 border-t-[1.5px] border-dashed border-blue">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary-bg px-3.5 font-mono text-[10.5px] font-semibold tracking-[0.14em] text-blue sm:text-[11.5px]">
                  GOVERNANCE: ALWAYS ON — RBAC · LINEAGE · AUDIT
                </span>
              </div>
              <div className="mt-7 rounded-[6px] border-[1.6px] border-action-hover bg-white px-5 pb-5 pt-4 sm:px-6">
                <div className="border-b border-lineSoft pb-3 font-mono text-[12px] font-semibold tracking-[0.1em] text-ink sm:text-[12.5px]">
                  AUDIT LOG — CUSTOMER 9042
                </div>
                <div className="mt-3.5 grid grid-cols-[64px_1fr] gap-x-3 gap-y-[11px] font-mono text-[10.5px] leading-[1.5] sm:grid-cols-[92px_1fr] sm:gap-x-4 sm:text-[12.5px]">
                  {AUDIT_ROWS.map(([ts, line]) => (
                    <div key={ts} className="contents">
                      <span className="text-secondary-text">{ts}</span>
                      <span className="text-ink">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-[13px] leading-relaxed text-secondary-text sm:text-[13.5px]">
                Every entry above was recorded automatically, from the first module onward. Nothing was configured.
              </p>
            </div>
          </div>

          {/* Intro overlay */}
          <div
            className="absolute inset-0 z-[5] flex flex-col items-center justify-center bg-primary-bg px-6 py-8 text-center sm:px-12 lg:px-20"
            style={{
              opacity: started ? 0 : 1,
              visibility: started ? "hidden" : "visible",
              transition: "opacity .55s ease, visibility 0s linear .55s",
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary-text">
              Seven modules &middot; One walkthrough
            </p>
            <h3 className="mt-4 max-w-[20em] text-balance text-[28px] font-semibold leading-[1.08] tracking-tight text-ink lg:text-[42px]">
              Meet the seven modules of Akashic.
            </h3>
            <p className="mt-4 max-w-[36em] text-pretty text-[15px] leading-relaxed text-secondary-text lg:text-[17px]">
              Every capability in the platform is a module. Follow one customer
              record, 9042, through all seven and watch what each module does
              with it, step by step.
            </p>
            <button type="button" onClick={() => onNavigate(0)} className="btn-primary mt-7">
              Begin with Pipelines
            </button>
            <span className="mt-4 font-mono text-[11px] tracking-[0.08em] text-secondary-text">
              keep scrolling · each scroll advances one module
            </span>
          </div>
        </div>
      </div>

      {/* Info panel */}
      <div className="relative flex min-h-[100px] flex-none flex-wrap items-center gap-x-4 gap-y-2.5 border-t border-lineSoft bg-white px-4 pb-4 pt-[17px] lg:gap-x-7 lg:px-8">
        <div className="absolute inset-x-4 top-0 flex gap-[5px] lg:inset-x-8" aria-hidden>
          {NAV_LABELS.map((_, i) => (
            <span
              key={i}
              className="h-[3px] flex-1 rounded-full transition-colors duration-500"
              style={{ background: started && i <= current ? ACCENT : "#E4E7EC" }}
            />
          ))}
        </div>
        <div
          key={started ? current : "intro"}
          className="sa-info-in flex min-w-0 flex-[1_1_560px] flex-wrap items-center gap-x-4 gap-y-2.5 lg:gap-x-7"
        >
          <div className="flex w-[196px] flex-none items-center gap-3.5">
            <span className="font-mono text-[30px] font-semibold leading-none tracking-tight text-blue">
              {started ? `0${current + 1}` : "07"}
            </span>
            <span className="flex min-w-0 flex-col gap-[4px]">
              <span className="font-mono text-[10px] tracking-[0.13em] text-[#6F7988]">{info.k1}</span>
              <span className="font-mono text-[11.5px] font-semibold tracking-[0.06em] text-ink">{info.k2}</span>
            </span>
          </div>
          <h4 className="min-w-[200px] max-w-[320px] flex-[0_1_300px] text-balance text-[16px] font-semibold leading-[1.22] tracking-tight text-ink lg:text-[19px]">
            {info.h}
          </h4>
          <p className="min-w-[240px] max-w-[560px] flex-[1_1_260px] text-pretty text-[13px] leading-normal text-secondary-text lg:text-[13.5px]">{info.d}</p>
        </div>
        <div
          className="flex-none overflow-hidden"
          style={{
            width: gov ? 288 : 0,
            opacity: gov ? 1 : 0,
            transform: gov ? "none" : "translateY(8px)",
            transition: "width .5s cubic-bezier(.5,0,.3,1), opacity .5s ease .25s, transform .5s ease .25s",
          }}
        >
          <div className="flex w-[288px] flex-col items-start gap-2">
            <span className="text-pretty text-[12.5px] font-semibold leading-snug text-ink">
              Start with one. Add the rest when you&rsquo;re ready. The foundation never changes.
            </span>
            <Link href="#talk-to-our-team" className="btn-primary !h-8 !px-4 !text-[12px]">
              Talk to our team
            </Link>
          </div>
        </div>
        <div className="ml-auto flex flex-none items-center gap-2.5">
          <button
            type="button"
            aria-label="Previous stage"
            onClick={() => onNavigate(current - 1)}
            disabled={!started || stage === 0}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] border-[1.3px] border-action-hover bg-white font-mono text-[14px] text-ink transition-opacity disabled:cursor-default disabled:opacity-30"
          >
            ←
          </button>
          <span className="whitespace-nowrap font-mono text-[10.5px] tracking-[0.08em] text-secondary-text">
            {(started ? `0${current + 1}` : "—") + " / 07"}
          </span>
          <button
            type="button"
            aria-label="Next stage"
            onClick={() => onNavigate(started ? stage + 1 : 0)}
            disabled={started && stage === 6}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] border-[1.3px] border-blue bg-white font-mono text-[14px] text-blue transition-opacity disabled:cursor-default disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
