"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { HomePlatform } from "@/content/pages/home";

/*
 * Homepage [02] intro: the name, one line of what Akashic does, one action.
 * Centred like the /akashic hero, whose outcome cards now follow it (23 Oct
 * 2026, user). The dome that framed it went to /akashic (UCDome); the five
 * capabilities follow the cards (UCCapabilities).
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function UCHero({ content }: { content: HomePlatform["hero"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isInView = useInView(ref, { margin: "-120px 0px -120px 0px", once: true });
  const shown = reduced || isInView;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
      className="relative z-20 mx-auto flex max-w-[44rem] flex-col items-center px-6 pt-12 text-center"
    >
      <p className="font-mono text-[12px] uppercase tracking-eyebrow text-uc-mute sm:text-[13px]">{content.kicker}</p>
      <h2
        id="platform-h"
        className="mt-4 max-w-full text-balance text-[40px] font-medium leading-[1.05] tracking-tighter text-uc-text sm:text-[48px] md:text-[56px] lg:text-[64px]"
      >
        {content.title}
      </h2>
      <p className="mt-5 max-w-[32em] text-balance text-[16px] leading-relaxed text-uc-mute md:text-[18px]">{content.lede}</p>
      <Link href={content.cta.href} className="btn-primary group mt-7">
        {content.cta.label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform ease-settle group-hover:translate-x-0.5 motion-reduce:transition-none">
          <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.div>
  );
}
