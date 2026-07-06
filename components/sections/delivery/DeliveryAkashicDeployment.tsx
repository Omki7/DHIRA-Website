/*
 * [02] Model 1 — Akashic Deployment.
 * The six-week rollout as a simulated-UI Gantt console (chrome via
 * AkashicCardChrome, §8a look): gradient phase bars with a sheen sweep,
 * milestone diamonds at blueprint sign-off and go-live. Three phase
 * dossiers with ghost numerals carry the nav's Strategize/Engineer anchor
 * ids, and a modular-start panel reuses the MiniStack motif.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { CardHeader, BlueChip, MiniStack } from "@/components/sections/akashic/AkashicCardChrome";

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
    <div className="overflow-hidden rounded-[14px] border border-subtle-stroke bg-white shadow-frame">
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
            <div className="col-start-1 col-end-3 row-start-1 flex h-8 items-center rounded-[7px] border border-blue-border bg-gradient-to-b from-[#F3F6FF] to-[#E8EDFC] px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <span className="truncate font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-blue">
                01 &middot; Audit
              </span>
            </div>
            <div className="fl-sheen relative col-start-2 col-end-7 row-start-2 flex h-8 items-center overflow-hidden rounded-[7px] bg-gradient-to-b from-[#4A6CE0] to-[#3E63DD] px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_-1px_rgba(62,99,221,0.4)]">
              <span className="truncate font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-white">
                02 &middot; Platform build
              </span>
            </div>
            <div className="col-start-6 col-end-8 row-start-3 flex h-8 items-center gap-1.5 rounded-[7px] bg-gradient-to-b from-[#2A2D2F] to-[#1A1C1D] px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
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
          <h2 className="mt-5 max-w-[16em] text-heading-sm font-semibold text-ink md:text-heading-md">
            The platform, live and governed in your environment.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            When your data foundation is the bottleneck, we bring Akashic to you.
            From readiness audit to production-ready in six weeks. We do not
            prototype. We productionise.
          </p>
        </ScrollReveal>

        <div className="mt-12 lg:mt-14">
          <ScrollReveal delay={100}>
            <RolloutGantt />
          </ScrollReveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-12 lg:gap-10">
          {phases.map((phase, idx) => (
            <ScrollReveal key={phase.num} delay={140 + idx * 100}>
              <div id={phase.id} className="relative scroll-mt-24 border-t border-subtle-stroke pt-6">
                <span
                  className="pointer-events-none absolute right-0 top-4 select-none text-[64px] font-semibold leading-none tracking-tighter text-ink/[0.045]"
                  aria-hidden
                >
                  {phase.num}
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-blue">
                  {phase.weeks}
                </span>
                <h3 className="mt-3 text-[22px] font-semibold leading-snug tracking-tight text-ink">
                  {phase.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-inkSoft">{phase.desc}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
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
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={160}>
          <div className="mt-12 overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg lg:mt-14">
            <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
            <div className="flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-center lg:gap-12">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
                  Prefer a modular approach?
                </p>
                <h3 className="mt-3 text-[22px] font-semibold tracking-tight text-ink">
                  Start with the module that hurts most.
                </h3>
                <p className="mt-3 max-w-[44em] text-[15px] leading-relaxed text-inkSoft">
                  You don&rsquo;t have to adopt the full stack on day one. Start with
                  Akashic Pipelines, Master Data, or Ask Akashic. Prove the value in
                  four weeks, and snap the rest in later. The foundation never changes.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {modularModules.map((mod) => (
                    <Link
                      key={mod.label}
                      href={mod.href}
                      className="inline-flex items-center gap-2 rounded-full border border-lineSoft bg-white px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-eyebrow text-inkSoft transition-colors duration-200 ease-settle hover:border-blue/30 hover:bg-blue-subtle hover:text-blue"
                    >
                      <DynamicSketchIcon text={mod.icon} className="h-[13px] w-[13px] text-blue" />
                      {mod.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-5 lg:pr-4">
                <MiniStack highlight="data" />
                <div>
                  <div className="text-[28px] font-semibold leading-none tracking-tighter text-ink">
                    4 weeks
                  </div>
                  <div className="mt-2 max-w-[12em] text-[12px] leading-snug text-inkSoft">
                    to a proven first module on the same governed foundation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
