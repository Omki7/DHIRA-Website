"use client";

/*
 * [02] Who Dhira Is — What We've Become
 * Editorial 2-column composition:
 * - Large statement on one side, supporting narrative on the other
 * - No cards or service lists
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function AboutWho() {
  return (
    <section
      id="who-we-are"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-20 pb-24 lg:pt-28 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* --- SECTION HEADER --- */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[02]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;What We&apos;ve Become</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Identity</span>
          </div>
        </ScrollReveal>

        {/* --- 2-COLUMN EDITORIAL COMPOSITION --- */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Bold Headline & Thesis Statement */}
          <div className="lg:col-span-6">
            <ScrollReveal delay={80}>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl leading-[1.12]">
                Engineering is where we started. <br />
                <span className="text-blue">Data and AI are where we&apos;re going.</span>
              </h2>

              <div className="mt-8 pt-8 border-t border-lineSoft/70">
                <p className="text-lg font-medium text-ink leading-relaxed sm:text-xl">
                  &ldquo;Engineering experience gives us the foundation. Data and AI give us the direction.&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative Body */}
          <div className="lg:col-span-6">
            <ScrollReveal delay={140}>
              <div className="space-y-6 text-base leading-relaxed text-secondary-text sm:text-lg">
                <p>
                  Dhira is a technology engineering company building data and AI products, platforms, and technology systems for the real world.
                </p>
                <p>
                  Our work began with engineering — solving complex technology problems where reliability, scale, and ownership matter. Over time, that work expanded across data, AI, products, and platforms.
                </p>
                <p className="text-ink font-medium">
                  Today, we bring those capabilities together to help organisations build what comes next.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
