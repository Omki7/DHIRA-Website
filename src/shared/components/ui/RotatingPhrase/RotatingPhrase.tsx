"use client";

import { useEffect, useRef, useState } from "react";
import { MotionToggle } from "@/shared/components/ui/MotionToggle";
import { useUi } from "@/shared/providers/UiProvider";
import useOnScreen from "@/shared/hooks/useOnScreen";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { cx } from "@/shared/utils/cx";
import styles from "./RotatingPhrase.module.scss";

export interface RotatingPhraseProps {
  phrases: readonly string[];
  suffix?: string;
  align?: "start" | "center";
}

/** Shared hero cadence, with reserved width and a stable accessible headline.
    The box is as wide as the longest phrase. `align="center"` centres each
    phrase inside it, for a phrase that opens its own centred line (homepage
    hero); left alignment, the default, keeps a phrase snug against the words
    before it on the same line (/akashic "behind every …").
    The pause icon sits just past the box, out of the flow, so the centred
    line does not shift (WCAG 2.2.2; user, 23 Oct 2026: the control belongs
    beside what it stops). It is a button inside the h1, so the hero names
    its heading with aria-labelledby. */
export function RotatingPhrase({ phrases, suffix = "", align = "start" }: RotatingPhraseProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const onScreen = useOnScreen(ref);
  const reduced = usePrefersReducedMotion();
  const { motion } = useUi();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || !onScreen || phrases.length < 2) return;
    const timer = window.setInterval(() => setIndex(i => (i + 1) % phrases.length), 2600);
    return () => window.clearInterval(timer);
  }, [reduced, paused, onScreen, phrases.length]);

  const active = reduced ? 0 : index;
  return (
    <span ref={ref} className={cx(styles.root, align === "center" ? styles.alignCenter : styles.alignStart)} data-rotating-phrase>
      <span className={styles.srOnly}>{phrases[0]}{suffix}</span>
      {phrases.map((phrase, i) => (
        <span key={phrase} aria-hidden="true" data-active={i === active}
          className={styles.phrase}
          style={{ opacity: i === active ? 1 : 0, transform: i === active ? "translateY(0)" : "translateY(0.08em)" }}>
          <span className={styles.word}>
            {phrase}
            <span aria-hidden="true" className={styles.underline} />
          </span>{suffix}
        </span>
      ))}
      {phrases.length > 1 && (
        <span className={styles.control}>
          <MotionToggle paused={paused} onToggle={() => setPaused((p) => !p)} controls={motion.headline} />
        </span>
      )}
    </span>
  );
}
