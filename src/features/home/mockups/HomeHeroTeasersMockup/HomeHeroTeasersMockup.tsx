"use client";

/**
 * SIMULATED PRODUCT UI: independently composed product fragments around the
 * homepage pitch. One shell for every module (grammar in the header of
 * HomeModuleIllustrationsMockup): hairline border, one surface, a mono
 * header row. Sizes cut by about a quarter on 22 Oct 2026 so the headline
 * leads and the fragments tease.
 */
import { motion } from "framer-motion";
import type { HomeHero, HomeHeroModule, HomeHeroModuleKind } from "@/content/pages/home";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { cx } from "@/shared/utils/cx";
import { HomeModuleIllustrationsMockup, TEASER_META } from "../HomeModuleIllustrationsMockup";
import styles from "./HomeHeroTeasersMockup.module.scss";

/* Placement around the centred pitch (xl and up). Columns hold to the frame
   edges in percent so the headline keeps its air from 1280 to 1600. The
   middle pair flanks the lede, so below 1440 it steps out to keep ~40px
   clear of the lede's longest line. The bottom row anchors to the hero's
   foot, which ends 256px under the pitch (Hero), so the row stays tight
   under the buttons at every viewport height. */
const POSITIONS: Record<HomeHeroModuleKind, string> = {
  "master-data": styles.masterData,
  governance: styles.governance,
  pipelines: styles.pipelines,
  bi: styles.bi,
  ask: styles.ask,
  warehouse: styles.warehouse,
  ml: styles.ml,
};

function Teaser({ module, index }: { module: HomeHeroModule; index: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.figure
      className={styles.teaser}
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.15 + index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <figcaption className={styles.header}>
        <span className={styles.module}>{module.module}</span>
        <span className={styles.meta}>{TEASER_META[module.kind]}</span>
        <span className={styles.srOnly}>
          {module.title}. {module.description}
        </span>
      </figcaption>
      <div aria-hidden>
        <HomeModuleIllustrationsMockup kind={module.kind} />
      </div>
    </motion.figure>
  );
}

export interface HomeHeroTeasersMockupProps {
  content: HomeHero["illustrations"];
}

export function HomeHeroTeasersMockup({ content }: HomeHeroTeasersMockupProps) {
  return (
    <>
      <div className={styles.field} role="group" aria-label={content.label}>
        {content.modules.map((module, index) => (
          <div key={module.kind} data-home-teaser={module.kind} className={cx(styles.slot, POSITIONS[module.kind])}>
            <Teaser module={module} index={index} />
          </div>
        ))}
      </div>
      <div className={styles.strip}>
        <p className={styles.hint}>
          {content.scrollHint} <span aria-hidden>→</span>
        </p>
        <div
          role="region"
          aria-label={content.label}
          tabIndex={0}
          className={styles.track}
        >
          {content.modules.map((module, index) => (
            <div key={module.kind} data-home-teaser={module.kind} className={styles.card}>
              <Teaser module={module} index={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
