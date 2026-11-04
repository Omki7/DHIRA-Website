"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { HomeSectors } from "@/content/pages/home";
import { ScrollReveal, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import useOnScreen from "@/shared/hooks/useOnScreen";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { cx } from "@/shared/utils/cx";
import styles from "./EverySector.module.scss";

const TRANSITION = { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const };

/* The sectors rotate on their own, like [02]'s modules (user, 22 Oct 2026):
   the selected tab's line fills blue and the next sector takes over as it
   lands. The fill's own animationend advances the tab, so the line and the
   switch share one clock. It holds off screen and while keyboard focus is
   inside the block, and does not run under reduced motion (Rule 6a).
   Choosing a sector restarts the line from that sector. */
const ROTATE_MS = 7000;

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className={cx(styles.arrow, className)} aria-hidden="true">
      <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface EverySectorProps {
  content: HomeSectors;
}

export function EverySector({ content: HOME_INDUSTRIES }: EverySectorProps) {
  const SECTORS = HOME_INDUSTRIES.sectors;
  const [activeIndex, setActiveIndex] = useState(0);
  const [vertical, setVertical] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useOnScreen(rootRef);
  const reduced = usePrefersReducedMotion();
  // Bumped when a sector is chosen, so choosing the current one restarts its line.
  const [run, setRun] = useState(0);
  const sector = SECTORS[activeIndex];

  function choose(index: number) {
    setActiveIndex(index);
    setRun((r) => r + 1);
  }

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setVertical(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Keep existing sector bookmarks working at every viewport size.
    const selectHash = () => {
      const hash = window.location.hash.slice(1).replace(/-desktop$/, "");
      const index = SECTORS.findIndex((item) => item.id === (hash === "enterprise" ? "finance" : hash));
      if (index >= 0) setActiveIndex(index);
    };
    selectHash();
    window.addEventListener("hashchange", selectHash);
    return () => window.removeEventListener("hashchange", selectHash);
  }, [SECTORS]);

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = SECTORS.length - 1;
    else if (event.key === (vertical ? "ArrowDown" : "ArrowRight")) next = (index + 1) % SECTORS.length;
    else if (event.key === (vertical ? "ArrowUp" : "ArrowLeft")) next = (index + SECTORS.length - 1) % SECTORS.length;
    else return;
    event.preventDefault();
    choose(next);
    buttons.current[next]?.focus();
  }

  return (
    <section id="sectors" className={styles.section}>
      <div aria-hidden="true" className={styles.anchors}>
        {[...SECTORS.map((item) => item.id), "enterprise", ...SECTORS.map((item) => `${item.id === "finance" ? "enterprise" : item.id}-desktop`)].map((id) => (
          <span key={id} id={id} className={styles.anchor} />
        ))}
      </div>
      <ScrollRevealRail>
        <SectionHeader
          num={HOME_INDUSTRIES.eyebrow.number}
          label={HOME_INDUSTRIES.eyebrow.label}
          setup={HOME_INDUSTRIES.title.setup}
          payoff={HOME_INDUSTRIES.title.payoff}
          lede={HOME_INDUSTRIES.introduction}
        />

        <ScrollReveal delay={140} className={styles.reveal}>
          <div ref={rootRef} className={styles.layout}>
            <div className={styles.selector}>
              <p className={styles.selectorLabel}>{HOME_INDUSTRIES.selectorLabel}</p>
              <div role="tablist" aria-label={HOME_INDUSTRIES.tablistLabel} aria-orientation={vertical ? "vertical" : "horizontal"} className={styles.tabs}>
                {SECTORS.map((item, index) => {
                  const selected = activeIndex === index;
                  return (
                    <button
                      key={item.id}
                      ref={(node) => { buttons.current[index] = node; }}
                      type="button"
                      role="tab"
                      id={`sector-tab-${item.id}`}
                      aria-controls="sector-panel"
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => choose(index)}
                      onKeyDown={(event) => handleKey(event, index)}
                      className={cx(styles.tab, selected ? styles.tabSelected : styles.tabIdle)}
                    >
                      <span className={cx(styles.thumb, selected ? styles.thumbSelected : styles.thumbIdle)}>
                        <Image src={item.image} alt="" fill sizes="36px" className={styles.cover} />
                      </span>
                      <span className={styles.tabName}>{item.name}</span>
                      <Arrow className={cx(styles.tabArrow, selected ? styles.tabArrowSelected : styles.tabArrowIdle)} />
                      {/* The loader: a light blue track over the tab's line, filled blue
                          over ROTATE_MS. Play state stays in classes (the style sets
                          longhands only) so off screen and keyboard focus can hold it. */}
                      {selected && !reduced && (
                        <span aria-hidden="true" className={styles.loader}>
                          <span
                            key={run}
                            onAnimationEnd={() => setActiveIndex((i) => (i + 1) % SECTORS.length)}
                            className={cx(styles.loaderFill, !inView && styles.paused)}
                            style={{ animationName: "progressFill", animationDuration: `${ROTATE_MS}ms`, animationTimingFunction: "linear", animationFillMode: "both" }}
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div role="tabpanel" id="sector-panel" aria-labelledby={`sector-tab-${sector.id}`} tabIndex={0} className={styles.panel}>
              <div className={styles.media}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={sector.id}
                    className={styles.slide}
                    initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 1.025 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={reduced ? { duration: 0 } : TRANSITION}
                  >
                    <Image src={sector.image} alt={sector.alt} fill sizes="(min-width: 1440px) 1068px, (min-width: 1024px) 72vw, 100vw" className={styles.cover} />
                  </motion.div>
                </AnimatePresence>
                
                <div className={styles.chips}>
                  <span className={styles.nameChip}>{sector.name}</span>
                  <span className={styles.countChip}>{String(activeIndex + 1).padStart(2, "0")} / {String(SECTORS.length).padStart(2, "0")}</span>
                </div>
                <div className={styles.headlineBar}>
                  <motion.h3 key={sector.id} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={reduced ? { duration: 0 } : TRANSITION} className={styles.headline}>
                    {sector.headline}
                  </motion.h3>
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detailRow}>
                  <p className={styles.description}>{sector.description}</p>
                  <Link href={sector.href} className={styles.explore}>
                    {HOME_INDUSTRIES.explore} {sector.name.toLowerCase()}
                    <Arrow className={styles.exploreArrow} />
                  </Link>
                </div>
                <ul aria-label={`${sector.name} focus areas`} className={styles.topics}>
                  {sector.topics.map((topic) => <li key={topic} className={styles.topic}><span aria-hidden="true" className={styles.topicDot} />{topic}</li>)}
                </ul>
              </div>
            </div>

            <div className={styles.publicSector}>
              <p className={styles.publicSectorLabel}>{HOME_INDUSTRIES.publicSector.label}</p>
              <Link href={HOME_INDUSTRIES.publicSector.link.href} className={styles.publicSectorLink}>
                {HOME_INDUSTRIES.publicSector.link.label}<Arrow className={styles.publicSectorArrow} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
