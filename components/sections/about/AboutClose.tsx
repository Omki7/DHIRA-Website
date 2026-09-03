"use client";

/*
 * [08] Careers & Final CTA — We Are a Small Team That Ships
 * Restrained editorial conclusion:
 * - Direct, human invitation
 * - Clean typography and high-trust CTAs
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function AboutClose() {
  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-20 pb-28 lg:pt-28 lg:pb-36">
      <span id="careers" className="absolute -top-24" aria-hidden />
      <span id="join-us" className="absolute -top-24" aria-hidden />
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              <span className="text-overcast">[08]</span>&nbsp;&nbsp;Join Us &middot; Work with Us
            </p>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              We are a small team that ships.
            </h2>

            <p className="mt-6 text-lg text-secondary-text leading-relaxed sm:text-xl">
              We look for people who take ownership, think deeply, and care about what happens after the work ships. If that sounds like you, we&apos;d like to meet you.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/careers"
                className="btn-primary rounded-full px-6 py-2.5 text-xs font-semibold"
              >
                Explore careers &rarr;
              </Link>
              <Link
                href="/#get-started"
                className="btn-secondary rounded-full px-6 py-2.5 text-xs font-semibold"
              >
                Talk to Dhira
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
