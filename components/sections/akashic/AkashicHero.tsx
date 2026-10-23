"use client";

/* The homepage and platform hero share one rotating phrase treatment. */

import Link from "next/link";
import RotatingPhrase from "@/components/ui/RotatingPhrase";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { AkashicPage } from "@/content/pages/akashic";
import { nameOrWordmark } from "@/components/icons/AkashicWordmark";

export default function AkashicHero({ content }: { content: AkashicPage["hero"] }) {
  const { badge, kicker, title, lede, primary, secondary } = content;
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      {/* One full screen under the header (the 110px launch bar and nav), so
          the page opens on the hero alone and the quote waits below (user,
          23 Oct 2026). Drop the offset to the nav's 73px when the launch bar
          goes. */}
      <ScrollRevealRail>
        <div className="flex min-h-[calc(100svh-110px)] flex-col items-center justify-center py-16 text-center">
          <ScrollReveal>
            <figure className="group relative mb-8 inline-flex items-center justify-center overflow-hidden rounded-full border border-card-line bg-background">
              <span className="relative flex items-center gap-2 rounded-full bg-background px-3.5 py-1.5 text-xs sm:text-sm">
                <span className="inline-flex items-center font-semibold text-primary-text">{nameOrWordmark(badge.product)}</span>
                <span className="mx-1 h-3.5 w-px bg-default-stroke" />
                <span className="font-medium text-primary-text">{badge.claim}</span>
              </span>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              {kicker.map((word, k) => (
                <span key={word}>
                  {k > 0 && <span className="text-overcast"> &middot; </span>}
                  {word}
                </span>
              ))}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140} className="w-full min-w-0 px-4 sm:px-6">
            {/* The h1 holds the pause button beside its rotating word, so its
                name comes from this plain copy of the headline. */}
            <span id="akashic-headline" hidden>{`${title.lead} ${title.tail} ${title.phrases[0]}`}</span>
            <h1 aria-labelledby="akashic-headline" className="mx-auto mt-6 max-w-[24em] text-balance text-[38px] font-medium leading-[1.1] tracking-tightest text-primary-text sm:text-5xl md:text-6xl lg:text-[64px]">
              {title.lead}{" "}
              <span className="sm:block">
                {title.tail}{" "}
                <RotatingPhrase phrases={title.phrases} />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className="mt-8 max-w-[38em] text-balance text-lg font-normal leading-relaxed text-secondary-text md:text-xl">
              {lede}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href={primary.href} className="btn-primary">
                {primary.label}
              </Link>
              <Link href={secondary.href} className="btn-secondary">
                {secondary.label}
              </Link>
            </div>
          </ScrollReveal>


        </div>
      </ScrollRevealRail>
    </section>
  );
}
