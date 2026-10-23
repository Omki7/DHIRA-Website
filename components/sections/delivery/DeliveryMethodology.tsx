"use client";

/*
 * [04] Delivery Process — Start with the outcome, not the technology.
 * OpenAI-inspired 4-Card visual grid with connected sequential process flow indicators.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { DeliveryPage } from "@/content/pages/delivery";

/* Each stage card's ground, by stage id (art direction, not content). */


export default function DeliveryMethodology({ content }: { content: DeliveryPage["methodology"] }) {
  const STAGES = content.stages;
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
              <span className="text-overcast">[{content.eyebrow.number}]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;{content.eyebrow.label}</span>
            </p>
            <span className="hidden text-overcast sm:inline">{content.eyebrow.aside}</span>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-ink md:text-4xl lg:text-4xl">
                {content.title}
              </h2>
              <p className="mt-3 max-w-[36em] text-base leading-relaxed text-secondary-text">
                {content.lede}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href={content.cta.href} className="btn-secondary text-xs">
                {content.cta.label}
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Process Flow Stepper Rail (Desktop) */}
        <ScrollReveal delay={80}>
          <div className="mt-10 hidden lg:block">
            <div className="relative flex items-center justify-between rounded-2xl border border-subtle-stroke bg-primary-bg p-3.5 ">
              {/* Connected Dashed Line */}
              <div className="absolute left-[12%] right-[12%] top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-blue-border/70" aria-hidden />

              {STAGES.map((s, idx) => (
                <div key={s.id} className="relative z-10 flex items-center gap-2.5 bg-background px-4 py-1.5 rounded-full border border-subtle-stroke ">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue text-on-action font-mono text-[10px] font-bold">
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
                    className={`relative aspect-[1.1] w-full overflow-hidden rounded-2xl border border-subtle-stroke bg-primary-bg p-4  transition-all duration-200 group-hover:border-blue-border  flex items-center justify-center`}
                  >
                    {/* Visual Graphic Type 1: IDE Code Window */}
                    {stage.type === "code" && (
                      <div className="w-full rounded-xl border border-line bg-vault p-3.5 ">
                        <div className="flex items-center gap-1.5 border-b border-line pb-2">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          <span className="h-2 w-2 rounded-full bg-yellow-400" />
                          <span className="h-2 w-2 rounded-full bg-positive" />
                          <span className="ml-2 font-mono text-[9px] text-secondary-text">discovery.py</span>
                        </div>
                        <div className="mt-2.5 font-mono text-[10px] leading-relaxed text-ink">
                          <p className="text-secondary-text"><span className="text-[rgb(var(--diagram-pink))]">from</span> dhira <span className="text-[rgb(var(--diagram-pink))]">import</span> Pipeline</p>
                          <p className="mt-1"><span className="text-[rgb(var(--diagram-gold))]">manifest</span> = Understand(</p>
                          <p className="pl-3 text-positive-text">&quot;sovereign_vpc&quot;,&nbsp;<span className="text-secondary-text">99.99% SLA</span></p>
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
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-background text-lg   transition-transform group-hover:scale-105"
                          >
                            <span>{icon}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Visual Graphic Type 3: App Integration Badges */}
                    {stage.type === "apps" && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 rounded-xl border border-line bg-background p-2.5 ">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-on-action font-mono text-xs font-bold">
                            GH
                          </div>
                          <span className="font-mono text-[10px] font-bold text-ink">GitHub</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-line bg-background p-2.5 ">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue text-on-action font-mono text-xs font-bold">
                            JR
                          </div>
                          <span className="font-mono text-[10px] font-bold text-ink">Jira</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-line bg-background p-2.5 ">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-subtle text-blue font-mono text-xs font-bold">
                            K8s
                          </div>
                          <span className="font-mono text-[10px] font-bold text-ink">K8s</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-line bg-background p-2.5 ">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-positive-subtle text-positive-text font-mono text-xs font-bold">
                            CI
                          </div>
                          <span className="font-mono text-[10px] font-bold text-ink">CI/CD</span>
                        </div>
                      </div>
                    )}

                    {/* Visual Graphic Type 4: Live Telemetry Pulse */}
                    {stage.type === "telemetry" && (
                      <div className="w-full rounded-xl border border-line bg-vault p-4 ">
                        <div className="flex items-center justify-between border-b border-line pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-positive animate-ping" />
                            <span className="font-mono text-[10px] font-bold text-ink">Live Telemetry</span>
                          </div>
                          <span className="font-mono text-[9.5px] font-bold text-positive-text">99.99%</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <p className="font-mono text-[9px] text-secondary-text uppercase">Code Sovereignty</p>
                            <p className="font-mono text-[11px] font-bold text-ink">100% Client IP</p>
                          </div>
                          <span className="rounded-full bg-positive-subtle px-2 py-0.5 font-mono text-[9px] text-positive-text border border-positive-border">
                            Verified SLA
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Stage Number Badge Overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-vault font-mono text-[10px] font-bold text-ink  border border-line">
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





