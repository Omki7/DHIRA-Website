"use client";

import Link from "next/link";
import EisAtmosphere from "@/components/ui/eis/EisAtmosphere";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [talk-to-our-team] — The Executive Close.
 * Big Akashic logo removed per direction; replaced with a clean,
 * centered, typography-first executive closing card.
 */

export default function EisClose({ content }: { content: EisPage["close"] }) {
  const SESSION = content.session;

  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 overflow-hidden py-16 lg:py-24">
      <EisAtmosphere variant="dusk" />

      <ScrollRevealRail className="relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            {/* Status Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lineSoft bg-background/80 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-positive" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                {content.sessionLabel}
              </span>
            </div>

            {/* Master Headline */}
            <h2 className="font-heading text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl md:text-6xl lg:text-7xl">
              {content.title[0]}{" "}
              <span className="text-inkSoft">{content.title[1]}</span>
            </h2>

            {/* Executive Prompt */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-secondary-text sm:text-xl">
              {content.prompt}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href={content.primary.href} className="btn-primary">
                {content.primary.label}
              </Link>
              <Link href={content.secondary.href} className="btn-secondary">
                {content.secondary.label}
              </Link>
            </div>

            {/* Three Executive Walkthrough Pillars */}
            <div className="mt-14 grid grid-cols-1 gap-4 text-left sm:grid-cols-3 sm:gap-6 border-t border-lineSoft pt-10">
              {SESSION.map((item, idx) => (
                <div
                  key={item}
                  className="rounded-card border border-lineSoft bg-background/60 p-4 backdrop-blur-sm"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue">
                    0{idx + 1} · Walkthrough
                  </span>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
