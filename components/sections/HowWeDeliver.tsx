"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

type Deliverable = {
  num: string;
  title: string;
  description: string;
  href: string;
};

const deliverables: Deliverable[] = [
  {
    num: "1",
    title: "Platform Deployment",
    description: "We deploy the core Akashic platform in your environment, connect raw data sources, and establish your governed knowledge graph in 6 weeks.",
    href: "/delivery#akashic-deployment",
  },
  {
    num: "2",
    title: "Product Engineering",
    description: "We build custom, production-grade applications on top of Akashic or your stack. Complete codebase ownership is transferred to your team.",
    href: "/delivery#product-engineering",
  },
  {
    num: "3",
    title: "Advisory & Co-Engineering",
    description: "We embed senior engineering squads into your sprints or conduct strategic audits to unblock roadmaps and build internal capability.",
    href: "/delivery#advisory-co-engineering",
  },
];

export default function HowWeDeliver() {
  return (
    <section
      id="delivery"
      className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden"
    >
      <ScrollRevealRail>
        {/* ── Outer Section Header Block ── */}
        <ScrollReveal>
          <div className="flex items-center border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast font-mono">[04]</span>
              &nbsp;&nbsp;WHAT WE DELIVER
            </span>
          </div>
        </ScrollReveal>

        {/* ── Immersive Dark Container ── */}
        <ScrollReveal delay={100}>
          <div className="group/container relative mt-12 lg:mt-16 overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0C] px-6 py-12 md:p-12 lg:p-16 text-white shadow-2xl transition-all duration-500 ease-settle">
            {/* Custom dot-grid background */}
            <div className="dot-grid-dark absolute inset-0 opacity-20 pointer-events-none" />

            {/* Ambient glows (indigo/amber) */}
            <div
              className="absolute left-1/4 top-1/4 h-[350px] w-[350px] rounded-full blur-[80px] opacity-[0.1] pointer-events-none animate-[softpulse_10s_infinite_alternate]"
              style={{
                background: "radial-gradient(circle, #3E63DD, transparent 75%)",
              }}
            />
            <div
              className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full blur-[80px] opacity-[0.06] pointer-events-none animate-[softpulse_12s_infinite_alternate]"
              style={{
                background: "radial-gradient(circle, #D9A034, transparent 75%)",
              }}
            />

            {/* Split layout: text left, empty right */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 flex flex-col items-start">
                <h3 className="text-[36px] sm:text-[48px] md:text-[56px] font-semibold leading-[1.05] tracking-tighter text-white font-heading">
                  We own the delivery.<br />
                  <span className="text-white/40">End-to-end.</span>
                </h3>
                
                <p className="mt-6 max-w-[28em] text-[15px] sm:text-base leading-relaxed text-white/60 font-sans">
                  We deploy our core data platform, engineer custom applications, and embed senior squads to accelerate your roadmap under a single, accountable partner.
                </p>
                <p className="mt-4 max-w-[28em] text-[15px] sm:text-base leading-relaxed text-white/40 font-normal font-sans">
                  It's not just about installing software. It's about ensuring your organisation is built to build.
                </p>

                <div className="mt-8">
                  <Link
                    href="/delivery"
                    className="inline-flex items-center gap-2.5 px-6 h-11 bg-white text-[#0A0A0C] hover:bg-white/90 active:scale-[0.98] font-semibold text-sm rounded-full transition-all duration-200 shadow-[0_4px_12px_rgba(255,255,255,0.1)] group"
                  >
                    <span>Explore delivery</span>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0A0A0C] text-white text-[10px] transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:col-span-5 lg:block" aria-hidden="true" />
            </div>

            {/* 3-Column Cards Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-24">
              {deliverables.map((item) => (
                <Link
                  key={item.num}
                  href={item.href}
                  className="group/tile relative flex flex-col p-6 md:p-8 rounded-[12px] border border-white/5 bg-white/[0.02] hover:bg-white text-white hover:text-ink transition-all duration-300 ease-settle cursor-pointer shadow-card hover:shadow-frame"
                >
                  <span className="font-heading text-[64px] md:text-[80px] font-semibold leading-none text-white/20 group-hover/tile:text-ink/20 transition-colors duration-300">
                    {item.num}
                  </span>
                  
                  {/* Thin Divider Line */}
                  <div className="my-5 border-t border-white/10 group-hover/tile:border-lineSoft transition-colors duration-300" />
                  
                  <h4 className="text-[20px] md:text-[22px] font-semibold tracking-tight leading-snug font-heading transition-colors duration-300">
                    {item.title}
                  </h4>
                  
                  <p className="mt-3 text-[14px] leading-relaxed text-white/60 group-hover/tile:text-secondary-text transition-colors duration-300 font-sans">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>

          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
