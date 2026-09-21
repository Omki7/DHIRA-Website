"use client";

/*
 * [03] Delivery Process — Start with the outcome, not the technology.
 * OpenAI-inspired 4-Card visual grid with connected sequential process flow indicators.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface StageCard {
  id: string;
  num: string;
  name: string;
  tagline: string;
  description: string;
  deliverable: string;
  gradient: string;
  type: "code" | "icons" | "apps" | "telemetry";
}

const STAGES: StageCard[] = [
  {
    id: "understand",
    num: "01",
    name: "Understand",
    tagline: "Discovery & Boundaries",
    description: "Evaluate constraints, security boundaries, and legacy systems to define exact technical outcomes.",
    deliverable: "Baseline SOW & Compliance Map",
    gradient: "from-blue-500/20 via-indigo-500/10 to-vault",
    type: "code",
  },
  {
    id: "align",
    num: "02",
    name: "Align",
    tagline: "Architecture & Sprint Roadmap",
    description: "Select technology topology, agree on milestone roadmaps, and deploy senior engineering capacity.",
    deliverable: "Architecture Blueprint",
    gradient: "from-cyan-500/25 via-blue-600/15 to-vault",
    type: "icons",
  },
  {
    id: "deliver",
    num: "03",
    name: "Build & Deliver",
    tagline: "Iterative Sprint Execution",
    description: "Ship production code in 2-week sprints with automated QA, performance stress testing, and live demos.",
    deliverable: "Production Codebase (>90% QA)",
    gradient: "from-sky-400/25 via-indigo-600/15 to-vault",
    type: "apps",
  },
  {
    id: "evolve",
    num: "04",
    name: "Evolve",
    tagline: "Sovereign IP & Telemetry",
    description: "Transfer 100% sovereign code ownership, set up enterprise SLA monitoring, and provide continuous support.",
    deliverable: "Sovereign IP Handover",
    gradient: "from-emerald-500/20 via-teal-600/15 to-vault",
    type: "telemetry",
  },
];

export default function DeliveryMethodology() {
  return (
    <section
      id="methodology"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Delivery process</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Outcome-first engineering</span>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-4xl">
                Start with the outcome, not the technology.
              </h2>
              <p className="mt-3 max-w-[36em] text-base leading-relaxed text-secondary-text">
                Four clear stages designed to eliminate risk, maintain accountability, and ship production-ready systems on schedule.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="#talk-to-our-team" className="btn-secondary text-xs">
                Talk to our team &rarr;
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Process Flow Stepper Rail (Desktop) */}
        <ScrollReveal delay={80}>
          <div className="mt-10 hidden lg:block">
            <div className="relative flex items-center justify-between rounded-2xl border border-subtle-stroke bg-primary-bg/80 p-3.5 shadow-sm">
              {/* Connected Dashed Line */}
              <div className="absolute left-[12%] right-[12%] top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-blue-border/70" aria-hidden />

              {STAGES.map((s, idx) => (
                <div key={s.id} className="relative z-10 flex items-center gap-2.5 bg-white px-4 py-1.5 rounded-full border border-subtle-stroke shadow-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue text-white font-mono text-[10px] font-bold">
                    {s.num}
                  </span>
                  <span className="font-semibold text-xs text-ink">{s.name}</span>
                  {idx < STAGES.length - 1 && (
                    <span className="hidden xl:inline text-blue font-bold text-xs ml-1">&rarr;</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 4-Card Visual Feature Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STAGES.map((stage, idx) => (
            <ScrollReveal key={stage.id} delay={100 + idx * 50}>
              <div className="group flex h-full flex-col justify-between">
                <div>
                  {/* Top Visual Graphic Container */}
                  <div
                    className={`relative aspect-[1.1] w-full overflow-hidden rounded-2xl border border-subtle-stroke bg-gradient-to-br ${stage.gradient} p-4 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-border group-hover:shadow-frame flex items-center justify-center`}
                  >
                    {/* Visual Graphic Type 1: IDE Code Window */}
                    {stage.type === "code" && (
                      <div className="w-full rounded-xl border border-white/15 bg-vault/90 p-3.5 shadow-md backdrop-blur-md">
                        <div className="flex items-center gap-1.5 border-b border-white/10 pb-2">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          <span className="h-2 w-2 rounded-full bg-yellow-400" />
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span className="ml-2 font-mono text-[9px] text-white/60">discovery.py</span>
                        </div>
                        <div className="mt-2.5 font-mono text-[10px] leading-relaxed text-white/90">
                          <p className="text-blue-subtle"><span className="text-pink-400">from</span> dhira <span className="text-pink-400">import</span> Pipeline</p>
                          <p className="mt-1"><span className="text-yellow-300">manifest</span> = Understand(</p>
                          <p className="pl-3 text-emerald-300">&quot;sovereign_vpc&quot;,&nbsp;<span className="text-blue-subtle">99.99% SLA</span></p>
                          <p>)</p>
                        </div>
                      </div>
                    )}

                    {/* Visual Graphic Type 2: Floating 2x3 Icon Grid */}
                    {stage.type === "icons" && (
                      <div className="grid grid-cols-3 gap-2.5">
                        {["{}", "🌐", "⚡", "🛡️", "</>", "📊"].map((icon, i) => (
                          <div
                            key={i}
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-lg shadow-sm backdrop-blur-md transition-transform group-hover:scale-105"
                          >
                            <span>{icon}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Visual Graphic Type 3: App Integration Badges */}
                    {stage.type === "apps" && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 p-2.5 backdrop-blur-md">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-white font-mono text-xs font-bold">
                            GH
                          </div>
                          <span className="font-mono text-[10px] font-bold text-white">GitHub</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 p-2.5 backdrop-blur-md">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue text-white font-mono text-xs font-bold">
                            JR
                          </div>
                          <span className="font-mono text-[10px] font-bold text-white">Jira</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 p-2.5 backdrop-blur-md">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold">
                            K8s
                          </div>
                          <span className="font-mono text-[10px] font-bold text-white">K8s</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 p-2.5 backdrop-blur-md">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-600 text-white font-mono text-xs font-bold">
                            CI
                          </div>
                          <span className="font-mono text-[10px] font-bold text-white">CI/CD</span>
                        </div>
                      </div>
                    )}

                    {/* Visual Graphic Type 4: Live Telemetry Pulse */}
                    {stage.type === "telemetry" && (
                      <div className="w-full rounded-xl border border-white/20 bg-vault/90 p-4 shadow-md backdrop-blur-md">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                            <span className="font-mono text-[10px] font-bold text-white">Live Telemetry</span>
                          </div>
                          <span className="font-mono text-[9.5px] font-bold text-emerald-400">99.99%</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <p className="font-mono text-[9px] text-white/60 uppercase">Code Sovereignty</p>
                            <p className="font-mono text-[11px] font-bold text-white">100% Client IP</p>
                          </div>
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] text-emerald-300 border border-emerald-400/30">
                            Verified SLA
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Stage Number Badge Overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-vault/80 font-mono text-[10px] font-bold text-white backdrop-blur-md border border-white/15">
                        {stage.num}
                      </span>
                    </div>
                  </div>

                  {/* Text Details Underneath Graphic Box */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-ink group-hover:text-blue transition-colors">
                      {stage.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-secondary-text leading-relaxed font-sans">
                      {stage.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Deliverable Tag */}
                <div className="mt-4 border-t border-dashed border-lineSoft pt-2.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold text-blue">
                    <span>&bull;</span>
                    <span>{stage.deliverable}</span>
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}





