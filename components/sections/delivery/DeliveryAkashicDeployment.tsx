"use client";

/*
 * [02] Model 1 — Akashic Deployment.
 * The six-week rollout as a simulated-UI Gantt console (chrome via
 * AkashicCardChrome, §8a look): gradient phase bars with a sheen sweep,
 * milestone diamonds at blueprint sign-off and go-live. Three phase
 * dossiers with ghost numerals carry the nav's Strategize/Engineer anchor
 * ids, and a modular-start branch shows targeted module adoption.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { CardHeader, BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

const phases = [
  {
    num: "01",
    weeks: "WK 1–2",
    title: "System readiness audit",
    desc: "A structured mapping of your current architecture, yielding a Sovereign Blueprint and Governance Framework.",
    id: "ai-readiness-audit",
    anchors: [
      { label: "Sovereign Blueprint", id: "sovereign-blueprint" },
      { label: "Governance Framework", id: "governance-framework" },
    ],
  },
  {
    num: "02",
    weeks: "WK 2–6",
    title: "Platform build",
    desc: "Core deployment, legacy system bridging, and custom accelerators to get your organisation live without building from scratch.",
    id: "platform-deployment",
    anchors: [
      { label: "Legacy Modernisation", id: "legacy-modernization" },
      { label: "Custom Accelerators", id: "custom-accelerators" },
    ],
  },
  {
    num: "03",
    weeks: "WK 6+",
    title: "Operational handover",
    desc: "One governed data foundation for BI, ML, and conversational AI. Your team runs it; we stay accountable.",
    id: "operational-handover",
    links: [
      { label: "Akashic BI", href: "/akashic#business-intelligence" },
      { label: "Akashic ML", href: "/akashic#machine-learning" },
      { label: "Ask Akashic", href: "/akashic#ask-ai" },
    ],
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
            <div className="rollout-bar rollout-bar-build fl-sheen relative col-start-2 col-end-7 row-start-2 flex h-8 items-center overflow-hidden rounded-[7px] bg-gradient-to-b from-[#4A6CE0] to-[#3E63DD] px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_-1px_rgba(62,99,221,0.4)]">
              <span className="truncate font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-white">
                02 &middot; Platform build
              </span>
            </div>
            <div className="rollout-bar rollout-bar-handover col-start-6 col-end-8 row-start-3 flex h-8 items-center gap-1.5 rounded-[7px] bg-gradient-to-b from-[#2A2D2F] to-[#1A1C1D] px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" />
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
            <span className="h-[7px] w-[7px] shrink-0 rotate-45 border border-[#30A46C] bg-[#EDF7F1]" aria-hidden />
            <span className="truncate">Go-live &middot; production-ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RolloutSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
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
    <div ref={ref} data-visible={visible ? "true" : "false"} className="rollout-sequence mt-12 lg:mt-14">
      <RolloutGantt />

      <div className="relative mt-8 border-y border-lineSoft py-3 lg:mt-10">
        <div className="rollout-spine absolute bottom-0 left-[18px] top-0 w-px bg-lineSoft md:left-[72px]" aria-hidden />
        {phases.map((phase) => (
          <div
            key={phase.num}
            id={phase.id}
            className={`rollout-phase rollout-phase-${phase.num} relative grid scroll-mt-24 grid-cols-[40px_minmax(0,1fr)] gap-4 py-6 md:grid-cols-[96px_minmax(0,1fr)] md:gap-8`}
          >
            <div className="relative flex justify-center md:justify-start md:pl-[58px]">
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-blue-border bg-white font-mono text-[10px] font-semibold text-blue shadow-sm">
                {phase.num}
              </span>
              <span className="rollout-phase-rule absolute left-[18px] top-[18px] hidden h-px w-[calc(100%-18px)] bg-blue/60 md:block" aria-hidden />
            </div>

            <div className="relative min-w-0 border-b border-dashed border-lineSoft pb-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-blue">
                    {phase.weeks}
                  </span>
                  <h3 className="mt-2 text-[22px] font-semibold leading-snug tracking-tight text-ink md:text-[24px]">
                    {phase.title}
                  </h3>
                </div>
                <span className="hidden select-none font-heading text-[56px] font-semibold leading-none tracking-tighter text-ink/[0.045] md:block">
                  {phase.num}
                </span>
              </div>

              <div className="mt-3 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(260px,0.55fr)] lg:items-start">
                <p className="max-w-[48em] text-[16px] leading-relaxed text-inkSoft">{phase.desc}</p>
                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  {phase.anchors?.map((anchor) => (
                    <span
                      key={anchor.id}
                      id={anchor.id}
                      className="inline-flex scroll-mt-24 items-center rounded-full border border-lineSoft bg-white px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-eyebrow text-inkSoft"
                    >
                      {anchor.label}
                    </span>
                  ))}
                  {phase.links?.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center rounded-full border border-lineSoft bg-white px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-eyebrow text-inkSoft transition-colors duration-200 ease-settle hover:border-blue/30 hover:bg-blue-subtle hover:text-blue"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rollout-modular relative grid gap-4 border-b border-lineSoft bg-blue-subtle/55 py-8 md:grid-cols-[96px_minmax(0,1fr)] md:gap-8 lg:py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-blue-border" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-blue-border/70" aria-hidden />
        <div className="relative hidden md:block">
          <span className="absolute left-[72px] top-0 h-full w-px bg-blue-border" aria-hidden />
          <span className="relative z-10 ml-[58px] flex h-9 w-9 items-center justify-center rounded-full border border-blue-border bg-white font-mono text-[10px] font-semibold text-blue shadow-sm">
            +
          </span>
        </div>
        <div className="grid min-w-0 gap-8 px-4 md:px-0 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
              Targeted start path
            </p>
            <h3 className="mt-3 text-[26px] font-semibold tracking-tight text-ink">
              Start with the module that hurts most.
            </h3>
            <p className="mt-3 max-w-[48em] text-[16px] leading-relaxed text-inkSoft">
              You don&rsquo;t have to adopt the full stack on day one. Start with
              Akashic Pipelines, Master Data, or Ask Akashic. Prove the value in
              four weeks, and snap the rest in later. The foundation never changes.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {modularModules.map((mod) => (
                <Link
                  key={mod.label}
                  href={mod.href}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-border bg-white px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-eyebrow text-blue transition-colors duration-200 ease-settle hover:border-blue hover:bg-white"
                >
                  <DynamicSketchIcon text={mod.icon} className="h-[13px] w-[13px] text-blue" />
                  {mod.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="border-l border-blue-border pl-5 lg:justify-self-end lg:pr-4">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-blue">
              First module
            </p>
            <div className="mt-3">
              <div className="text-[42px] font-semibold leading-none tracking-tighter text-ink">
                4 weeks
              </div>
              <div className="mt-3 max-w-[14em] text-[13px] leading-snug text-inkSoft">
                to a proven first module on the same governed foundation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DeliveryAkashicDeployment() {
  return (
    <section id="akashic-deployment" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[02]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Model 1 &middot; Akashic Deployment</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Six weeks to live</span>
          </div>
          <h2 className="mt-5 max-w-[34em] text-heading-sm font-semibold text-ink md:text-heading-md lg:text-[48px] xl:text-[52px]">
            The platform, live and governed in your environment.
          </h2>
          <p className="mt-5 max-w-[42em] text-lg leading-relaxed text-secondary-text">
            When your data foundation is the bottleneck, we bring Akashic to you.
            From readiness audit to production-ready in six weeks. We do not
            prototype. We&nbsp;productionise.
          </p>
        </ScrollReveal>

        <RolloutSequence />
      </div>
    </section>
  );
}
