"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { HomePlatform } from "@/content/pages/home";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { cx } from "@/shared/utils/cx";
import styles from "./UCHero.module.scss";

/*
 * Homepage [02] intro: the name, one line of what Akashic does, one action.
 * Centred like the /akashic hero, whose outcome cards now follow it (23 Oct
 * 2026, user). The dome that framed it went to /akashic (UCDome); the five
 * capabilities follow the cards (UCCapabilities).
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export interface UCHeroProps {
  content: HomePlatform["hero"];
}

export function UCHero({ content }: UCHeroProps) {
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
      className={styles.root}
    >
      <p className={styles.kicker}>{content.kicker}</p>
      <h2
        id="platform-h"
        className={styles.title}
      >
        {content.title}
      </h2>
      <p className={styles.lede}>{content.lede}</p>
      <Link href={content.cta.href} className={cx("btn-primary", styles.cta)}>
        {content.cta.label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className={styles.arrow}>
          <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.div>
  );
}
