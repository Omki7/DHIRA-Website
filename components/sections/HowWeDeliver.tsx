"use client";

/**
 * DESIGN INTENT:
 * Section 04: How We Deliver — "The Manifest"
 * Split-screen interactive timeline layout on desktop, inline responsive on mobile.
 * Shows the three delivery phases: Mapping Readiness, Platform Bridging, and Governed Operations.
 * Integrates DeliveryCanvasMockup, a simulated console mockup showcasing real-world deliverables.
 */
import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import DeliveryCanvasMockup from "@/components/demos/mockups/DeliveryCanvasMockup";

const steps = [
  {
    num: "01",
    week: "WK 1–2",
    title: "We map your data readiness.",
    desc: "A structured audit of your current foundation, followed by a Sovereign Blueprint and Governance Framework that show exactly where to intervene.",
    services: [
      { label: "AI Readiness Audit", href: "/delivery#ai-readiness-audit" },
      { label: "Sovereign Blueprint", href: "/delivery#sovereign-blueprint" },
      { label: "Governance Framework", href: "/delivery#governance-framework" },
    ],
  },
  {
    num: "02",
    week: "WK 2–6",
    title: "We build what's missing.",
    desc: "Platform Deployment, legacy modernisation, and custom accelerators. Engineered to get your organisation on Akashic without building from scratch.",
    services: [
      { label: "Platform Deployment", href: "/delivery#platform-deployment" },
      { label: "Legacy Modernisation", href: "/delivery#legacy-modernization" },
      { label: "Custom Accelerators", href: "/delivery#custom-accelerators" },
    ],
  },
  {
    num: "03",
    week: "WK 6+",
    title: "Your team runs on Akashic.",
    desc: "One governed data foundation for BI, machine learning, and conversational AI. One accountable partner, not a stack of vendors.",
    services: [
      { label: "Akashic BI", href: "/akashic#business-intelligence" },
      { label: "Akashic Machine Learning", href: "/akashic#machine-learning" },
      { label: "Ask Akashic", href: "/akashic#ask-ai" },
    ],
  },
];

export default function HowWeDeliver() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="delivery"
      className="bg-primary-bg pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <ScrollRevealRail>

        {/* ── Zone 1: Header ── */}
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast font-mono">[04]</span>
              &nbsp;&nbsp;HOW WE DELIVER
            </span>
            <span className="text-overcast">/ AUDIT TO GO-LIVE</span>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-[14em] text-[48px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[56px] lg:text-[64px]">
                Live in weeks, not quarters.
              </h2>
              <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-inkSoft">
                Akashic is the platform.
                <br className="hidden sm:block" />
                Our delivery team handles everything from readiness audit to go-live.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link href="/delivery" className="btn-primary">
                Explore delivery services
              </Link>
              <Link href="#get-started" className="btn-ghost text-sm text-inkSoft">
                Talk to our team
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Zone 2: Interactive Grid Layout ── */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16">
          
          {/* Steps Timeline Column */}
          <div className="flex flex-col">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <ScrollReveal key={step.num} delay={120 + idx * 100}>
                  <div
                    onMouseEnter={() => setActiveStep(idx)}
                    onClick={() => setActiveStep(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStep(idx);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Delivery Phase ${idx + 1}: ${step.title}`}
                    className={`group cursor-pointer border-t border-[#EEEFF1] py-8 lg:py-10 transition-all duration-300 focus:outline-none ${
                      isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                      
                      {/* Week label */}
                      <div className="flex-shrink-0 lg:w-24 lg:pt-[3px]">
                        <span className={`font-mono text-[11px] uppercase tracking-eyebrow transition-colors duration-300 ${
                          isActive ? "text-blue font-semibold" : "text-inkSoft"
                        }`}>
                          {step.week}
                        </span>
                      </div>

                      {/* Phase content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[24px] lg:text-[28px] font-semibold tracking-tight text-ink leading-snug">
                          {step.title}
                        </h3>
                        <div className={`mt-3 mb-4 w-8 border-t transition-colors duration-300 ${
                          isActive ? "border-blue" : "border-[#D3D8DF]"
                        }`} />
                        <p className="text-base leading-relaxed text-inkSoft max-w-[44em]">
                          {step.desc}
                        </p>
                        
                        {/* Services links */}
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          {step.services.map((svc) => (
                            <Link
                              key={svc.label}
                              href={svc.href}
                              scroll={svc.href.includes('#') ? false : undefined}
                              className="inline-flex items-center rounded-full border border-lineSoft bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft transition-colors duration-200 ease-settle hover:border-blue/30 hover:bg-blue-subtle hover:text-blue"
                            >
                              {svc.label}
                            </Link>
                          ))}
                        </div>

                        {/* Inline Canvas on Mobile/Tablet */}
                        <div className="mt-6 lg:hidden w-full">
                          <DeliveryCanvasMockup activeStep={idx} />
                        </div>

                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
            {/* Closing rule */}
            <div className="border-t border-[#EEEFF1]" aria-hidden="true" />
          </div>

          {/* Sticky Canvas Column (Desktop Only) */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32 self-start py-8">
              <ScrollReveal delay={200}>
                <DeliveryCanvasMockup activeStep={activeStep} />
              </ScrollReveal>
            </div>
          </div>

        </div>

      </ScrollRevealRail>
    </section>
  );
}

