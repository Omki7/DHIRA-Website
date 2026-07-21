"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import AkashicLogo from "@/components/icons/AkashicLogo";

export default function Closure() {
  return (
    <section
      id="get-started"
      aria-labelledby="get-started-h"
      className="relative overflow-hidden bg-background pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      {/* Alias anchor: the nav CTA targets #talk-to-our-team / #login on every page */}
      <span id="talk-to-our-team" className="absolute -top-24" aria-hidden />
      <span id="login" className="absolute -top-24" aria-hidden />
      <ScrollRevealRail isLast={true} className="z-10">
        {/* Eyebrow / Section divider */}
        <ScrollReveal>
          <div className="mb-10 flex items-center border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[10]</span>
              &nbsp;&nbsp;READY WHEN YOU ARE
            </span>
          </div>
        </ScrollReveal>

        {/* Immersive typography-first card */}
        <ScrollReveal delay={120}>
          <div className="group/card relative overflow-hidden rounded-[16px] border border-white/10 hover:border-white/20 bg-vault hover:bg-[#0D0D10] px-6 py-24 md:py-32 lg:py-40 text-white shadow-2xl transition-all duration-500 ease-settle">
            {/* Custom dot-grid background */}
            <div className="dot-grid-dark absolute inset-0 opacity-40 pointer-events-none" />

            {/* Glowing amber ambient background — centered */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[140px] opacity-[0.16] group-hover/card:opacity-[0.20] pointer-events-none animate-[pulse_12s_infinite_alternate] transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle, #D9A034, transparent 75%)",
              }}
            />

            {/* Glowing blue ambient background — offset center */}
            <div
              className="absolute left-[45%] top-[55%] -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full blur-[130px] opacity-[0.12] group-hover/card:opacity-[0.15] pointer-events-none animate-[pulse_15s_infinite_alternate] transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle, #3E63DD, transparent 75%)",
              }}
            />

            {/* Immersive Typography CTA Content */}
            <div className="relative z-10 mx-auto max-w-[54rem] flex flex-col items-center text-center">
              {/* Minimalist Accent Badge */}
              <div className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-eyebrow text-white/70">
                <AkashicLogo className="h-3.5 w-3.5" accentColor="#D9A034" />
                <span>DEPLOYED AT NATIONAL SCALE</span>
              </div>

              <h2
                id="get-started-h"
                className="text-balance font-semibold leading-[1.03] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F8F9FA] to-[#C3C5C9] text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] pb-1"
              >
                Ground every decision in fact.
              </h2>
              
              <p className="mt-8 max-w-[34em] text-base md:text-lg lg:text-xl leading-relaxed text-white/60">
                Unify structured, unstructured, and streaming data.
                <br className="hidden sm:block" />
                Resolve core entities through a governed knowledge graph,
                <br className="hidden sm:block" />
                and run enterprise intelligence with complete traceability.
              </p>

              {/* Centered CTA Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                  href="#talk-to-our-team"
                  className="inline-flex items-center justify-center gap-2 h-11 px-8 bg-white text-vault font-semibold text-sm rounded-btn hover:bg-white/90 active:scale-[0.98] transition-all duration-250 ease-settle shadow-[0_1px_2px_rgba(255,255,255,0.05),0_12px_24px_-8px_rgba(255,255,255,0.2)]"
                >
                  Talk to our team
                </Link>
                <Link
                  href="#platform"
                  className="inline-flex items-center justify-center gap-2 h-11 px-8 border border-white/15 hover:border-white/30 text-white font-medium text-sm rounded-btn hover:bg-white/5 active:scale-[0.98] transition-all duration-250 ease-settle"
                >
                  Explore the platform
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
