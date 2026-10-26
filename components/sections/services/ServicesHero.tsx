"use client";

/* The services hero in the cadence home and /akashic share: a pill with one
   claim, a single-ink headline whose last phrase rotates under the blue
   rule, the lede, the CTA pair, then one drawing. The drawing is the route
   from the reader's systems to production (DeliveryRoute), in the same line
   language as homepage [02]: named systems, colour = source system. */

import Link from "next/link";
import DeliveryRoute from "@/components/demos/services/DeliveryRoute";
import RotatingPhrase from "@/components/ui/RotatingPhrase";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { ServicesPage } from "@/content/pages/services";

export default function ServicesHero({ content: c }: { content: ServicesPage["hero"] }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-background pb-12 lg:pb-20">
      <ScrollRevealRail>
        <div className="mx-auto flex max-w-[880px] flex-col items-center px-2 pb-10 pt-12 text-center sm:px-6 md:pt-20 lg:pb-14">
          <ScrollReveal>
            <Link
              href={c.badge.href}
              className="group relative mb-6 inline-flex items-center justify-center overflow-hidden rounded-full border border-card-line bg-background transition-colors hover:border-blue md:mb-10"
            >
              <span className="relative flex items-center gap-2 rounded-full bg-background px-3.5 py-1.5 text-xs sm:text-sm">
                <span className="font-semibold text-primary-text">{c.badge.product}</span>
                <span className="mx-1 h-3.5 w-px bg-default-stroke" />
                <span className="font-medium text-primary-text">{c.badge.claim}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-0.5 text-secondary-text transition-transform ease-settle group-hover:translate-x-0.5" aria-hidden>
                  <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={80} className="w-full min-w-0">
            {/* The h1 holds the pause button beside its rotating phrase, so
                its name comes from this plain copy of the headline. */}
            <span id="services-headline" hidden>{`${c.title.lead} ${c.title.tail} ${c.title.phrases[0]}`}</span>
            <h1 aria-labelledby="services-headline" className="mx-auto text-balance text-[clamp(2rem,9vw,3rem)] font-medium leading-[1.08] tracking-tightest text-primary-text md:text-6xl xl:text-[64px]">
              {c.title.lead}{" "}
              <span className="sm:block">
                {c.title.tail}{" "}
                <RotatingPhrase phrases={c.title.phrases} />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mt-6 max-w-[36em] text-pretty text-base font-normal leading-relaxed text-secondary-text sm:text-lg md:mt-8">{c.lede}</p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10">
              <Link href={c.primary.href} className="btn-primary">{c.primary.label}</Link>
              <Link href={c.secondary.href} className="btn-secondary">{c.secondary.label}</Link>
            </div>
          </ScrollReveal>
        </div>

        <DeliveryRoute content={c.route} />
      </ScrollRevealRail>
    </section>
  );
}
