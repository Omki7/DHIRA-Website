"use client";

import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import styles from "./MotionToggle.module.scss";

export interface MotionToggleProps {
  paused: boolean;
  onToggle: () => void;
  controls: string;
  className?: string;
}

/* The pause control for content that moves by itself (WCAG 2.2.2; UX
   review, 23 Oct 2026). A small round icon placed right beside what it
   controls: after the rotating hero word, at the end of the outcome cards'
   module index, under the /akashic module rail, beside the stories' dots
   (user, 23 Oct 2026: a labelled control under the buttons read as
   unrelated). The tooltip names the action; the accessible name adds what
   it stops ("Pause the rotating headline"). Hidden under reduced motion,
   where nothing moves. */
export function MotionToggle({ paused, onToggle, controls, className }: MotionToggleProps) {
  const { motion } = useUi();
  const label = paused ? motion.play : motion.pause;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${label} ${controls}`}
      title={label}
      className={cx(styles.root, className)}
    >
      <svg viewBox="0 0 12 12" className={styles.icon} fill="currentColor" aria-hidden="true">
        {paused ? (
          <path d="M3.5 2v8l6.5-4z" />
        ) : (
          <>
            <rect x="2.5" y="2" width="2.4" height="8" rx="0.5" />
            <rect x="7.1" y="2" width="2.4" height="8" rx="0.5" />
          </>
        )}
      </svg>
    </button>
  );
}
