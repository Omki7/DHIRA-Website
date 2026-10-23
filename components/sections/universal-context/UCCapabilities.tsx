"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { HomePlatform } from "@/content/pages/home";
import UCFeatureIcon from "./UCFeatureIcon";

/*
 * Homepage [02], last: the five capabilities, what the platform knows. One
 * straight strip under a hairline, divided by vertical lines (user, 21 Oct
 * 2026: never along a curve). It sat inside the dome until 23 Oct 2026, when
 * the dome went to /akashic and the outcome cards came here (user); the strip
 * now follows the cards. Below lg the five stack down the middle, divided by
 * rules.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function UCCapabilities({ features }: { features: HomePlatform["features"] }) {
  const ref = useRef<HTMLUListElement>(null);
  const reduced = usePrefersReducedMotion();
  const isInView = useInView(ref, { margin: "-80px 0px -80px 0px", once: true });
  const shown = reduced || isInView;

  return (
    <ul
      ref={ref}
      className="relative z-20 mx-auto max-w-[22rem] px-6 pb-16 pt-14 lg:grid lg:max-w-[1000px] lg:grid-cols-5 lg:border-t lg:border-uc-line lg:px-0 lg:pb-24 lg:pt-0 xl:max-w-[1100px]"
    >
      {features.map((feature, i) => (
        <li
          key={feature.term}
          className="border-uc-stroke py-6 text-center first:pt-0 [&:not(:first-child)]:border-t lg:px-5 lg:pb-0 lg:pt-7 lg:text-left lg:first:pt-7 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-t-0 xl:px-6"
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : i * 0.08, ease: EASE }}
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
  );
}
