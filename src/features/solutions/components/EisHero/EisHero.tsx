"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { EisPage } from "@/content/pages/solutions-eis";
import { MotionToggle, PreviewTag, ScrollRevealRail } from "@/shared/components/ui";
import useOnScreen from "@/shared/hooks/useOnScreen";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { scrollToHashTarget } from "@/shared/utils/navigation";
import styles from "./EisHero.module.scss";

export interface EisHeroProps {
  content: EisPage["hero"];
}

/* The hero follows the homepage and /akashic heroes (4 Nov 2026, user: the
   page read as a different design system): the pill badge with its
   travelling arc, one ink headline at the shared hero size, the lede, the
   button pair, then one product tease. The typed questions advance by
   themselves, so they stop off screen and carry the pause control (Rule 6). */
export function EisHero({ content }: EisHeroProps) {
  const { prompts } = content;
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);
  const still = usePrefersReducedMotion();
  const askRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(askRef);
  const running = !still && !paused && onScreen;

  useEffect(() => {
    if (!running) return;
    const target = prompts[index].question;
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && typed !== target) {
      timer = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 40);
    } else if (!deleting && typed === target) {
      timer = setTimeout(() => setDeleting(true), 2800);
    } else if (deleting && typed !== "") {
      timer = setTimeout(() => setTyped(target.slice(0, typed.length - 1)), 18);
    } else {
      timer = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % prompts.length);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [typed, deleting, index, running, prompts]);

  /* Paused mid-word, the bar shows the whole question it was typing. */
  const prompt = still ? prompts[0] : prompts[index];
  const shown = still || paused ? prompt.question : typed;
  /* The answer lands once the question is whole (critique, 5 Nov 2026: the
     bar asked but never answered). */
  const landed = still || paused || (!deleting && typed === prompt.question);

  return (
    <section id="hero" className={styles.hero}>
      <ScrollRevealRail>
        <div className={styles.inner}>
          <span className={styles.badge}>
            <span aria-hidden className={styles.badgeArc} />
            <span className={styles.badgeInner}>{content.badge}</span>
          </span>

          <h1 className={styles.title}>
            {content.title[0]} <span className={styles.titleBreak}>{content.title[1]}</span>
          </h1>

          <p className={styles.lede}>{content.lede}</p>

          <div className={styles.actions}>
            <Link
              href={content.primary.href}
              className="btn-primary"
              onClick={(e) => {
                if (content.primary.href.includes("#")) {
                  e.preventDefault();
                  scrollToHashTarget(content.primary.href);
                }
              }}
            >
              {content.primary.label}
            </Link>
            <a href={content.secondary.href} className="btn-secondary">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
              <span>{content.secondary.label}</span>
            </a>
          </div>

          {/* The product tease: one question at a time, as the homepage's
              Ask Akashic card types its question. */}
          <div ref={askRef} className={styles.ask}>
            <div className={styles.askRow}>
              {/* The whole bar is the way into the matching story in [03]. */}
              <a
                href={`#story-${prompt.story}`}
                className={styles.askBar}
                aria-label={`${content.askLabel}: ${prompt.question}`}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className={styles.askIcon}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                >
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="m10.5 10.5 3 3" />
                </svg>
                <span className={styles.askTag} aria-hidden="true">{prompt.tag}</span>
                {prompt.preview && <PreviewTag />}
                <span className={styles.askText} aria-hidden="true">
                  <span className={styles.askTyped}>
                    {shown}
                    {running && <span className={styles.caret} />}
                  </span>
                </span>
                <span className={styles.askGo} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
              <MotionToggle paused={paused} onToggle={() => setPaused((p) => !p)} controls={content.motionLabel} />
            </div>
            <p className={styles.answer} data-landed={landed} aria-live="off">
              <span className={styles.answerOutcome}>{prompt.answer.outcome}</span>
              <span className={styles.answerSource}>{prompt.answer.source}</span>
            </p>
            <p className={styles.connectors}>{content.connectorsNote}</p>
          </div>

          {/* One outcome each: a mono label over one sentence (DESIGN_SYSTEM §7). */}
          <div className={styles.outcomes}>
            {content.outcomes.map((item) => (
              <div key={item.label} className={styles.outcome}>
                <span className={styles.outcomeLabel}>{item.label}</span>
                <p className={styles.outcomeBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
