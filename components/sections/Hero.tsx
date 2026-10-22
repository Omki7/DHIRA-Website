"use client";

import RotatingPhrase from "@/components/ui/RotatingPhrase";
import Link from "next/link";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import HomeHeroTeasersMockup from "@/components/demos/mockups/HomeHeroTeasersMockup";

import type { HomeHero } from "@/content/pages/home";
import { nameOrWordmark } from "@/components/icons/AkashicWordmark";

export default function Hero({ content }: { content: HomeHero }) {
  const { badge, title, lede, primary, secondary } = content;
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="relative mx-auto max-w-[1600px] xl:min-h-[980px]">
      <ScrollRevealRail>
        <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center justify-center px-2 pb-8 pt-10 text-center sm:px-6 md:pb-16 md:pt-24 xl:max-w-[760px] xl:pb-[300px] xl:pt-[230px]">
          <Link
            href={badge.href}
            className="group relative mb-6 inline-flex items-center justify-center overflow-hidden rounded-full border border-card-line bg-background transition-colors hover:border-blue md:mb-10"
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

          <h1 className="w-full text-[clamp(2rem,10vw,3rem)] font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl xl:text-[64px]">
            {title.first} <br className="hidden md:block" />
            <span className="inline md:block">{title.secondLead} </span>
            <RotatingPhrase phrases={title.phrases} suffix={` ${title.tail}`} align="center" />
          </h1>
          <p className="mt-6 max-w-[38em] text-base text-secondary-text font-normal leading-relaxed sm:text-lg md:mt-8">
            {lede[0]} <br className="hidden sm:block" />
            {lede[1]}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10">
            <Link href={primary.href} className="btn-primary">
              {primary.label}
            </Link>
            <Link href={secondary.href} className="btn-secondary">
              {secondary.label}
            </Link>
          </div>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.1em] text-tertiary-text md:mt-7">{content.illustrations.note}</p>
        </div>
      </ScrollRevealRail>
      <HomeHeroTeasersMockup content={content.illustrations} />
      </div>
    </section>
  );
}
