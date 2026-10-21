"use client";

import RotatingPhrase from "@/components/ui/RotatingPhrase";
import Link from "next/link";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

import type { HomeHero } from "@/content/pages/home";
import { nameOrWordmark } from "@/components/icons/AkashicWordmark";

export default function Hero({ content }: { content: HomeHero }) {
  const { badge, title, lede, primary, secondary } = content;
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <ScrollRevealRail>
        {/* Centered text block. The product screen carousel that peeked in
            below it (HeroProductsMockup + HeroConnections) was removed on
            23 Sep 2026 by direction: the homepage is screen-heavy enough.
            The block now fills the opening viewport on its own. */}
        <div className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center px-4 pt-20 pb-24 text-center sm:px-6 lg:pt-24 lg:pb-28">
          <Link
            href={badge.href}
            className="group relative mb-10 inline-flex items-center justify-center overflow-hidden rounded-full border border-card-line bg-background transition-colors hover:border-blue"
          >
            <span className="relative flex items-center gap-2 rounded-full bg-background px-3.5 py-1.5 text-xs sm:text-sm">
              <span className="hidden font-normal text-secondary-text min-[380px]:inline">{badge.lead}</span>
              <span className="inline-flex items-center font-semibold text-primary-text">{nameOrWordmark(badge.product)}</span>
              <span className="mx-1 h-3.5 w-px bg-default-stroke" />
              <span className="font-medium text-primary-text">{badge.claim}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-secondary-text ml-0.5 transition-transform ease-settle group-hover:translate-x-0.5">
                <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          <h1 className="w-full max-w-[22em] text-[clamp(2rem,10vw,3rem)] font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-7xl">
            {title.first} <br className="hidden md:block" />
            <span className="inline">{title.secondLead} </span>
            <RotatingPhrase phrases={title.phrases} suffix={` ${title.tail}`} />
          </h1>
          <p className="mt-8 max-w-[38em] text-lg text-secondary-text md:text-xl font-normal leading-relaxed">
            {lede[0]} <br className="hidden sm:block" />
            {lede[1]}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={primary.href} className="btn-primary">
              {primary.label}
            </Link>
            <Link href={secondary.href} className="btn-secondary">
              {secondary.label}
            </Link>
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
