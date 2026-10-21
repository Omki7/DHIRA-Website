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
      
      

      <ScrollRevealRail>
        <div className="flex flex-col items-center justify-center min-h-[50vh] pt-24 pb-12 text-center lg:pt-28 lg:pb-14">
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
            <h1 className="mx-auto mt-6 max-w-[24em] text-balance text-[38px] font-semibold leading-[1.1] tracking-tightest text-primary-text sm:text-5xl md:text-6xl lg:text-7xl">
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
