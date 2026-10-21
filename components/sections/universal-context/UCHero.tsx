"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { HomePlatform } from "@/content/pages/home";
import UCFeatureIcon from "./UCFeatureIcon";

/*
 * Homepage [02] intro: the name, one line of what Akashic does, and the five
 * capabilities INSIDE the dome, so the first fold explains the platform
 * instead of showing an empty planet (user, 21 Oct 2026). The five sat in a
 * separate strip under the dome until then.
 *
 * The dome is anchored at its apex: every layer is placed from the apex
 * point by the radius `--r`, which steps with the breakpoint, so the space
 * inside the arc is real layout that content can occupy.
 *
 * The five sit as one straight strip under a hairline, divided by vertical
 * lines (user, 21 Oct 2026: an arrangement along the curve "looks odd"; keep
 * the strip as it was, inside the dome). The strip starts 210px below the
 * apex, where the arc is wider than the strip at every breakpoint from lg.
 * Below lg the five stack down the middle of the dome, divided by lines.
 */

/* A box of `size` radii, centred on the planet's centre (one radius below the apex). */
const around = (size: number): CSSProperties => ({
  width: `calc(var(--r) * ${size * 2})`,
  height: `calc(var(--r) * ${size * 2})`,
  left: `calc(var(--r) * ${-size})`,
  top: `calc(var(--r) * ${1 - size})`,
});

const EASE = [0.16, 1, 0.3, 1] as const;

export default function UCHero({ content, features }: { content: HomePlatform["hero"]; features: HomePlatform["features"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Plays while the intro is firmly in view, so the arc draws as it arrives.
  const isInView = useInView(ref, { margin: "-120px 0px -120px 0px", once: false });
  const shown = reduced || isInView;

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* name, one line, one action */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 40 }}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.1, ease: EASE }}
        className="relative z-20 mx-auto flex max-w-[44rem] flex-col items-center px-6 pt-12 text-center"
      >
        <p className="font-mono text-[12px] uppercase tracking-eyebrow text-uc-mute sm:text-[13px]">{content.kicker}</p>
        <h2
          id="platform-h"
          className="mt-4 max-w-full text-balance text-[40px] font-semibold leading-[1.05] tracking-tighter text-uc-text sm:text-[48px] md:text-[56px] lg:text-[64px]"
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

      {/* the dome, and the five capabilities inside it */}
      <div className="relative mt-10 [--r:330px] sm:[--r:440px] md:[--r:600px] lg:mt-8 lg:pt-[210px] lg:[--r:760px] xl:[--r:864px]">
        <motion.div
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, y: 120 }}
          animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
          transition={{ duration: reduced ? 0 : 1.0, ease: EASE }}
          className="pointer-events-none absolute left-1/2 top-0 z-10"
        >
          {/* planet body */}
          <div className="absolute rounded-full bg-uc-bg" style={around(1)} />
          {/* edge ring, the arc that draws in, the inner orbit and its stations */}
          <svg className="absolute overflow-visible [clip-path:inset(-12px_-12px_50%_-12px)]" style={around(1)} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">


            <circle cx="500" cy="500" r="500" fill="none" stroke="rgb(var(--uc-line))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

            <motion.circle
              cx="500"
              cy="500"
              r="500"
              fill="none"
              stroke="rgb(var(--blue))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1570.8 1570.8"
              initial={{ strokeDashoffset: 1570.8 }}
              animate={{ strokeDashoffset: shown ? 0 : 1570.8 }}
              transition={{ duration: reduced ? 0 : 1.3, delay: reduced ? 0 : 0.15, ease: EASE }}
              vectorEffect="non-scaling-stroke"

            />

            {/* apex node */}
            <motion.g
              initial={{ opacity: 0, scale: 0.3 }}
              animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.1, ease: "backOut" }}
              transform="translate(500, 0)"
            >
<circle r="8" fill="rgb(var(--blue-border))" opacity="0.8" />
              <circle r="4" fill="rgb(var(--blue))" />
            </motion.g>
          </svg>
        </motion.div>

        {/* The five capabilities: one strip under a hairline, divided by
            vertical lines (lg up); a stack divided by rules below lg. */}
        <ul className="relative z-20 mx-auto max-w-[22rem] px-6 pb-14 pt-14 sm:pt-16 lg:grid lg:max-w-[1000px] lg:grid-cols-5 lg:border-t lg:border-uc-line lg:px-0 lg:pb-16 lg:pt-0 xl:max-w-[1100px]">
          {features.map((feature, i) => (
            <li
              key={feature.term}
              className="border-uc-stroke py-6 text-center first:pt-0 [&:not(:first-child)]:border-t lg:px-5 lg:pb-0 lg:pt-7 lg:text-left lg:first:pt-7 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-t-0 xl:px-6"
            >
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.75 + i * 0.08, ease: EASE }}
                className="flex flex-col items-center lg:items-start"
              >
                <UCFeatureIcon index={i} className="size-7 text-uc-mute" />
                <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.1em] text-uc-mute">{feature.term}</span>
                <h3 className="mt-1.5 text-[16px] font-semibold leading-snug tracking-tight text-uc-text">{feature.title}</h3>
                <p className="mt-1.5 text-pretty text-[14px] leading-relaxed text-uc-mute">{feature.text}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
