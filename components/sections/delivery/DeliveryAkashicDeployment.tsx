"use client";

/*
 * [02] Model 01 — Akashic Deployment: the six-week timeline.
 * The Gantt is the section's whole argument, so the section is now built
 * around it instead of past it: the three old phase dossiers (which only
 * re-said what the plan already shows, in paragraphs) collapse into three
 * terse payload columns pinned under the plan, each carrying its bar's
 * visual identity (Rule 1: one instrument, everything attached). The
 * modular-start band becomes a dashed "branch" row — the same window/
 * option grammar as the hero clock. Phase-level anchor ids were dropped:
 * nothing outside this file ever linked to them (nav/footer target the
 * section id only). Figures per Rule 4.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { CardHeader, BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

/* Each phase column carries the exact visual identity of its Gantt bar
   (tag chip colour and week tag), so the plan and its payload read as one
   system. Payloads are terse noun phrases — the plan shows the when, the
   columns only name the what. */
const phases = [
  {
    bar: "01 · Audit",
    weeks: "WK 1–2",
    tagCls:
      "border border-blue-border bg-gradient-to-b from-[#F3F6FF] to-[#E8EDFC] text-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]",
    title: "System readiness audit",
    payload: ["Architecture map", "Sovereign Blueprint", "Governance Framework"],
  },
  {
    bar: "02 · Platform build",
    weeks: "WK 2–6",
    tagCls:
      "bg-gradient-to-b from-[#4A6CE0] to-blue text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_-1px_rgba(62,99,221,0.4)]",
    title: "Platform build",
    payload: ["Core deployment", "Legacy bridging", "Custom accelerators"],
  },
  {
    bar: "03 · Handover",
    weeks: "WK 6+",
    tagCls:
      "bg-gradient-to-b from-[#2A2D2F] to-ink text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
    live: true,
    title: "Operational handover",
    payload: ["BI · ML · Ask live", "Your team runs it", "We stay accountable"],
  },
];

const modularModules = [
  { label: "Akashic Pipelines", icon: "Akashic Data Pipelines", href: "/akashic#data-pipelines" },
  { label: "Master Data", icon: "Akashic Master Data", href: "/akashic#master-data" },
  { label: "Ask Akashic", icon: "Akashic Insights", href: "/akashic#ask-ai" },
];

const weekLabels = ["WK 1", "WK 2", "WK 3", "WK 4", "WK 5", "WK 6", "6+"];

function RolloutGantt() {
  return (
    <div className="rollout-gantt overflow-hidden rounded-[14px] border border-subtle-stroke bg-white shadow-frame">
      <CardHeader
        icon="Platform Deployment"
        name="Rollout plan"
        sub="Readiness audit to go-live · one accountable team"
        chip={<BlueChip label="6 WEEKS" />}
      />
      <div className="p-5 md:p-6">
        <div className="grid grid-cols-7 font-mono text-[9px] uppercase tracking-[0.1em] text-overcast sm:text-[9.5px]">
          {weekLabels.map((week) => (
            <span key={week} className="border-l border-dashed border-lineSoft pl-1.5">
              {week}
            </span>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute inset-0 grid grid-cols-7" aria-hidden>
            {weekLabels.map((week, idx) => (
              <span
                key={week}
                className={`border-l border-dashed border-lineSoft ${idx === 6 ? "bg-primary-bg/70" : ""}`}
              />
            ))}
          </div>
          <div className="relative grid grid-cols-7 gap-y-2 py-2">
            <div className="rollout-bar rollout-bar-audit col-start-1 col-end-3 row-start-1 flex h-8 items-center rounded-[7px] border border-blue-border bg-gradient-to-b from-[#F3F6FF] to-[#E8EDFC] px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <span className="truncate font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-blue">
                01 &middot; Audit
              </span>
            </div>
            <div className="rollout-bar rollout-bar-build fl-sheen relative col-start-2 col-end-7 row-start-2 flex h-8 items-center overflow-hidden rounded-[7px] bg-gradient-to-b from-[#4A6CE0] to-blue px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_-1px_rgba(62,99,221,0.4)]">
              <span className="truncate font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-white">
                02 &middot; Platform build
              </span>
            </div>
            <div className="rollout-bar rollout-bar-handover col-start-6 col-end-8 row-start-3 flex h-8 items-center gap-1.5 rounded-[7px] bg-gradient-to-b from-[#2A2D2F] to-ink px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-border animate-[ps-pulse_2s_infinite]" />
              <span className="truncate font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-white">
                03 &middot; Handover
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-7 border-t border-dashed border-lineSoft pt-3 font-mono text-[8.5px] uppercase tracking-[0.08em] text-inkSoft">
          <div className="col-start-2 col-end-5 -ml-[4px] flex items-center gap-1.5">
            <span className="h-[7px] w-[7px] shrink-0 rotate-45 border border-blue bg-blue-subtle" aria-hidden />
            <span className="truncate">Blueprint signed</span>
          </div>
          <div className="col-start-6 col-end-8 -ml-[4px] flex items-center gap-1.5">
            <span className="h-[7px] w-[7px] shrink-0 rotate-45 border border-blue bg-blue-subtle animate-[ps-pulse_2.4s_infinite]" aria-hidden />
            <span className="truncate">Go-live &middot; production-ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Scroll-triggered bar entrance — the rollout-sequence CSS contract
   (globals.css), which also carries the reduced-motion override. */
function GanttReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -120px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-visible={visible ? "true" : "false"} className="rollout-sequence">
      <RolloutGantt />
    </div>
  );
}

export default function DeliveryAkashicDeployment() {
  return (
    <section id="akashic-deployment" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[02]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Model 01 &middot; Akashic Deployment</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Six weeks to live</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            <span className="text-inkSoft">The platform, live and governed in your environment.</span>
            <br />
            Six weeks from audit to go-live.
          </h2>
          <p className="mt-5 max-w-[45em] text-lg leading-relaxed text-secondary-text">
            When your data foundation is the bottleneck, we bring Akashic to you.
            We do not prototype. We&nbsp;productionise.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <GanttReveal />
        </ScrollReveal>

        {/* The payload columns — what each phase yields, named tersely and
            pinned under the plan in the plan's own order. */}
        <div className="mt-8 grid gap-x-8 gap-y-7 border-t border-dashed border-lineSoft pt-7 md:grid-cols-3 lg:mt-10 lg:pt-8">
          {phases.map((phase, idx) => (
            <ScrollReveal key={phase.bar} delay={140 + idx * 70}>
              <div>
                <span className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-[7px] px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] ${phase.tagCls}`}
                  >
                    {phase.live && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-border animate-[ps-pulse_2s_infinite]" aria-hidden />
                    )}
                    {phase.bar}
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
                    {phase.weeks}
                  </span>
                </span>
                <h3 className="mt-3 text-[18px] font-semibold tracking-tight text-ink">
                  {phase.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {phase.payload.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-lineSoft bg-white px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.06em] text-inkSoft"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* The branch — start with one module. Dashed border: the same
            window/option grammar as the hero clock's MVP window. */}
        <ScrollReveal delay={220}>
          <div className="relative mt-10 rounded-[12px] border border-dashed border-blue-border bg-blue-subtle/40 px-5 py-6 md:px-7 md:py-7 lg:mt-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                  + Targeted start path
                </p>
                <h3 className="mt-2.5 text-[20px] font-semibold tracking-tight text-ink md:text-[22px]">
                  Start with the module that hurts most.
                </h3>
                <p className="mt-2.5 max-w-[46em] text-[15px] leading-relaxed text-inkSoft">
                  Prove the value in four weeks on the same governed foundation.
                  Snap the rest in later.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {modularModules.map((mod) => (
                    <Link
                      key={mod.label}
                      href={mod.href}
                      scroll={mod.href.includes("#") ? false : undefined}
                      className="inline-flex items-center gap-2 rounded-full border border-blue-border bg-white px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-eyebrow text-blue transition-colors duration-200 ease-settle hover:border-blue"
                    >
                      <DynamicSketchIcon text={mod.icon} className="h-[13px] w-[13px] text-blue" />
                      {mod.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t border-blue-border/70 pt-4 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-blue">
                  First module
                </p>
                <div className="mt-2 text-[34px] font-semibold leading-none tracking-tighter text-ink md:text-[38px]">
                  4 weeks
                </div>
                <div className="mt-2 max-w-[14em] text-[13px] leading-snug text-inkSoft">
                  to a proven first module on the same governed foundation
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
