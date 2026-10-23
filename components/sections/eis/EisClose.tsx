"use client";

import Link from "next/link";
import EisAtmosphere from "@/components/ui/eis/EisAtmosphere";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [talk-to-our-team] — The Executive Close.
 * Clean, centered, typography-first executive closing card.
 * Walkthrough cards and secondary Akashic platform button removed per direction.
 */

export default function EisClose({ content }: { content: EisPage["close"] }) {
  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28">
      <EisAtmosphere variant="dusk" />

      <ScrollRevealRail className="relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            {/* Status Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lineSoft bg-background/80 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-positive" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                {content.sessionLabel}
              </span>
            </div>

            {/* Master Headline */}
            <h2 className="font-heading text-4xl font-medium leading-[1.05] tracking-tightest text-ink sm:text-5xl md:text-6xl lg:text-7xl">
              {content.title[0]}{" "}
              <span className="text-inkSoft">{content.title[1]}</span>
            </h2>

            {/* Executive Prompt */}
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-secondary-text sm:text-xl">
              {content.prompt}
            </p>

            {/* Focused Primary CTA Button */}
            <div className="mt-9 flex justify-center">
              <Link href={content.primary.href} className="btn-primary text-base px-8 py-3.5">
                {content.primary.label}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
