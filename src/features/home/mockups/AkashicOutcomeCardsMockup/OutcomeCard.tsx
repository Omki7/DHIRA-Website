/* SIMULATED PRODUCT UI: part of AkashicOutcomeCardsMockup (see its banner). */

import { useEffect, useState } from "react";
import { cx } from "@/shared/utils/cx";
import { EASE, type Play } from "./drawingKit";
import type { Outcome } from "./outcomes";
import styles from "./AkashicOutcomeCardsMockup.module.scss";

/* ---------------------------------------------------------------- */
/* The card                                                          */
/* ---------------------------------------------------------------- */
export const CARD_W = 520;
export const CARD_H = 356;
const TYPE_MS = 24;

/* The question types itself in. Remounted (keyed) each time its card comes
   to the front, so it starts empty with no flash of the full line. */
function TypedQuestion({ text, animate }: { text: string; animate: boolean }) {
  const [typed, setTyped] = useState(animate ? 0 : text.length);
  useEffect(() => {
    if (!animate) return;
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= text.length) clearInterval(id);
    }, TYPE_MS);
    return () => clearInterval(id);
  }, [animate, text]);
  const typing = typed < text.length;
  return (
    <>
      {/* Reserve the full line so the pill never changes size. */}
      <span className={cx(styles.questionLine, styles.questionReserve)}>{text}</span>
      <span className={styles.questionLine}>
        {text.slice(0, typed)}
        {typing && <span className={styles.caret} />}
      </span>
    </>
  );
}

export function OutcomeCard({ module, outcome, live, fade, runKey, reduced, flow }: { module: string; outcome: Outcome; live: boolean; fade: number; runKey: string; reduced: boolean; flow: boolean }) {
  const animate = live && !reduced;
  const answerAt = outcome.question.length * TYPE_MS + 180;
  const play: Play = { on: animate, t: answerAt + 260 };
  const [before, mark, after] = outcome.answer;
  const { Drawing } = outcome;
  return (
    <div className={styles.card}>
      <div className={styles.cardBody} style={{ opacity: fade }}>
        <div className={styles.cardHead}>
          <div className={styles.cardMeta}>
            <span className={styles.cardRole}>
              <span className={styles.cardRoleDot} />
              {outcome.role}
            </span>
            <span>{module}</span>
          </div>
          <p className={styles.question}>
            <svg aria-hidden viewBox="0 0 16 16" className={styles.questionIcon} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
              <circle cx="7" cy="7" r="4.5" />
              <path d="m10.5 10.5 3 3" />
            </svg>
            <span className={styles.questionText}>
              <TypedQuestion key={animate ? runKey : "still"} text={outcome.question} animate={animate} />
            </span>
          </p>
          <p
            key={animate ? runKey : "still"}
            className={styles.answer}
            style={animate ? { animation: `ps-rise 520ms ${EASE} ${answerAt}ms both` } : undefined}
          >
            {before}
            <span className={styles.answerMark}>{mark}</span>
            {after}
          </p>
        </div>
        <div className={styles.cardDrawing}>
          <Drawing key={animate ? runKey : "still"} play={play} flow={flow} />
        </div>
        <div className={styles.cardFoot}>
          <span className={styles.cardSource}>{outcome.source}</span>
          <span className={styles.cardState}>{outcome.state}</span>
        </div>
      </div>
    </div>
  );
}
