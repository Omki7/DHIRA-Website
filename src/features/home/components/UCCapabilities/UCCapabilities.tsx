"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { HomePlatform } from "@/content/pages/home";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { UCFeatureIcon } from "../UCFeatureIcon";
import styles from "./UCCapabilities.module.scss";

/*
 * Homepage [02], last: the five capabilities, what the platform knows. One
 * straight strip under a hairline, divided by vertical lines (user, 21 Oct
 * 2026: never along a curve). It sat inside the dome until 23 Oct 2026, when
 * the dome went to /akashic and the outcome cards came here (user); the strip
 * now follows the cards. Below lg the five stack down the middle, divided by
 * rules.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export interface UCCapabilitiesProps {
  features: HomePlatform["features"];
}

export function UCCapabilities({ features }: UCCapabilitiesProps) {
  const ref = useRef<HTMLUListElement>(null);
  const reduced = usePrefersReducedMotion();
  const isInView = useInView(ref, { margin: "-80px 0px -80px 0px", once: true });
  const shown = reduced || isInView;

  return (
    <ul
      ref={ref}
      className={styles.root}
    >
      {features.map((feature, i) => (
        <li
          key={feature.term}
          className={styles.item}
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : i * 0.08, ease: EASE }}
            className={styles.body}
          >
            <UCFeatureIcon index={i} className={styles.icon} />
            <span className={styles.term}>{feature.term}</span>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.text}>{feature.text}</p>
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
