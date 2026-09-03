"use client";

/*
 * [01] About Hero — We Build Things That Last for Data and AI
 * OpenAI-inspired editorial simplicity:
 * - Generous whitespace, calm, confident typography
 * - Focused headline, restrained blue accent
 * - Direct, high-trust CTAs
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function AboutHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
      <ScrollRevealRail>
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <ScrollReveal>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              <span className="text-overcast">[01]</span>&nbsp;&nbsp;About Dhira
            </p>
          </ScrollReveal>

          {/* Large Editorial Headline */}
          <ScrollReveal delay={80}>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.06]">
              We build things that last. <br className="hidden sm:inline" />
              <span className="text-blue font-medium">for Data and AI.</span>
            </h1>
          </ScrollReveal>

          {/* Supporting Text */}
          <ScrollReveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg text-secondary-text leading-relaxed sm:text-xl md:text-2xl font-normal">
              Products, platforms, and engineering systems built for the real world — from the first idea to everything that follows.
            </p>
          </ScrollReveal>

          {/* Restrained CTAs */}
          <ScrollReveal delay={220}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="#talk-to-our-team" className="btn-primary rounded-full px-6 py-2.5 text-xs font-semibold">
                Work with us
              </Link>
              <Link href="#people" className="btn-secondary rounded-full px-6 py-2.5 text-xs font-semibold">
                Meet the team &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
