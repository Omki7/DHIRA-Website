"use client";

/*
 * [00] Careers hero: "Help build intelligence for public systems."
 * (Was "India's intelligence layer" until 23 Sep 2026; the ambition is now
 * stated for any government, matching /about [05].)
 *
 * /careers reads as a set of drawings, like /about: hairline strokes, mono
 * labels, blue for what is live, dashed for what is not yet. The hero's
 * figure is `SeatingPlan`, the team's table in plan view with the four open
 * roles drawn as empty blue chairs. It is the literal form of the
 * invitation, and it is the same four roles the board in [03] lists.
 *
 * Left aligned, like every other DHIRA hero. The centred dot-grid version
 * this replaces carried no argument of its own.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import SeatingPlan from "@/components/demos/careers/SeatingPlan";

export default function CareersHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background pt-16 pb-16 lg:pt-20 lg:pb-20">
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow label="Careers" live="Now hiring" bare />
        </ScrollReveal>

        <div className="mt-8 max-w-[46rem]">
          <ScrollReveal delay={80}>
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-tightest min-[400px]:text-[42px] sm:text-6xl lg:text-[64px]">
              <span className="block text-balance text-inkSoft">Help build intelligence</span>
              <span className="block text-balance text-ink">for public systems.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <p className="mt-7 max-w-[34em] text-pretty text-lg leading-relaxed text-inkSoft sm:text-xl">
              A small team shipping inside national platforms. Systems built to outlast budget
              cycles.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#open-roles" className="btn-primary">
                See open roles
              </Link>
              <Link href="#how-we-hire" className="btn-secondary">
                How we hire
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          {/* The plan's viewBox carries headroom above the top chairs */}
          <div className="mt-8 lg:mt-6">
            <SeatingPlan />
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
