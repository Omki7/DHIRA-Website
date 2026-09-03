"use client";

/*
 * [03] Proof / Real Work — The Work Speaks for Itself
 * Strict adherence to the approved About brief:
 * - Eyebrow: [03] BUILT IN THE REAL WORLD
 * - Headline: The work speaks for itself.
 * - Supporting copy: The systems we work on become part of how organisations operate...
 * - Featured work: National Learning Platform · Every State's Learning Data, Read as One Picture
 * - Verified metrics: 5.75B+ Learning interactions unified · 187M+ Enrolments resolved
 */

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function AboutProof() {
  return (
    <section
      id="proof"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-20 lg:pt-20 lg:pb-28"
    >
      <ScrollRevealRail>
        {/* --- SECTION HEADER --- */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Built in the Real World</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Verified Systems in Production</span>
          </div>

          <div className="mt-5 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
              The work speaks for itself.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-secondary-text sm:text-lg">
              The systems we work on become part of how organisations operate, make decisions, and serve people. That means the work has to hold up beyond the demo — in production, at scale, and under real constraints.
            </p>
          </div>
        </ScrollReveal>

        {/* --- FEATURED PROOF CARD --- */}
        <ScrollReveal delay={120}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-subtle-stroke bg-primary-bg shadow-card lg:mt-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Context & Verified Proof Metrics */}
              <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-7 lg:p-12">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-border/50 bg-blue-subtle px-3 py-1 font-mono text-[11px] font-bold text-blue">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" />
                    Featured Work &middot; Education DPI
                  </div>

                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                    Every State&apos;s Learning Data, Read as One Picture
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-secondary-text">
                    A unified platform bringing learning data together to create a clearer view across states, systems, and learners. Transaction logs from every state resolve into one governed model, so programme owners can read curriculum efficacy, learner retention, and where resources are going.
                  </p>
                </div>

                {/* Verified Metrics Strip */}
                <div className="mt-8 pt-8 border-t border-lineSoft/70 grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-mono text-3xl font-extrabold tracking-tight text-ink sm:text-4xl text-blue">
                      5.75B+
                    </p>
                    <p className="mt-1 font-mono text-xs text-inkSoft">
                      Learning interactions unified
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                      187M+
                    </p>
                    <p className="mt-1 font-mono text-xs text-inkSoft">
                      Enrolments resolved
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Sector Photography */}
              <div className="relative min-h-[260px] lg:col-span-5 lg:min-h-full">
                <Image
                  src="/proof/learning.jpg"
                  alt="Students in a classroom representing national learning scale"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
              </div>

            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
