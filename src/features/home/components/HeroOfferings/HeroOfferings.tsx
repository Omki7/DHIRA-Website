"use client";

import type { FocusEvent } from "react";
import type { HomeHero } from "@/content/pages/home";
import { MotionToggle } from "@/shared/components/ui";
import { useUi } from "@/shared/providers/UiProvider";
import { scrollToHashTarget } from "@/shared/utils/navigation";
import type { OfferingsCycle } from "../Hero/useOfferingsCycle";
import styles from "./HeroOfferings.module.scss";

export interface HeroOfferingsProps {
  content: HomeHero["offerings"];
  cycle: OfferingsCycle;
  /** Milliseconds each offering stays before the next. */
  duration: number;
  /** The id of an offering's name, which also labels the previews it shows. */
  labelId: (index: number) => string;
}

/* The three offerings, each a link to its own section on the page
   (17 Nov 2026, user: picking one should take the reader there), with one
   progress line and pause control. Pointing at or focusing an offering
   shows its previews and holds the cycle, so it can be read first; the
   jump lands on the section's eyebrow like every other in-page link. */
export function HeroOfferings({ content, cycle, duration, labelId }: HeroOfferingsProps) {
  const { motion } = useUi();

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) cycle.setResting(false);
  };

  return (
    <div className={styles.root}>
      <nav
        aria-label={content.label}
        className={styles.tabs}
        onPointerEnter={() => cycle.setResting(true)}
        onPointerLeave={() => cycle.setResting(false)}
        onFocus={() => cycle.setResting(true)}
        onBlur={handleBlur}
      >
        {content.items.map((item, index) => {
          const href = `#${item.id}`;
          const active = index === cycle.active;
          return (
            <a
              key={item.id}
              href={href}
              data-active={active}
              aria-labelledby={labelId(index)}
              aria-describedby={`${labelId(index)}-description`}
              className={styles.tab}
              onPointerEnter={() => cycle.show(index)}
              onFocus={() => cycle.show(index)}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                event.preventDefault();
                scrollToHashTarget(href);
              }}
            >
              <span id={labelId(index)} className={styles.label}>
                {item.label}
              </span>
              <span id={`${labelId(index)}-description`} className={styles.description}>
                {item.line}
              </span>
              <span aria-hidden className={styles.track}>
                {active && (
                  <span
                    key={cycle.fill === "full" ? "full" : "timed"}
                    className={styles.fill}
                    data-fill={cycle.fill}
                    data-moving={cycle.moving}
                    style={{ animationDuration: `${duration}ms` }}
                    onAnimationEnd={cycle.advance}
                  />
                )}
              </span>
            </a>
          );
        })}
      </nav>
      {cycle.canPause && (
        <MotionToggle paused={cycle.paused} onToggle={cycle.togglePause} controls={motion.offerings} className={styles.toggle} />
      )}
    </div>
  );
}
