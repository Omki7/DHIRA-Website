"use client";

import { motion } from "framer-motion";
import type { HomeProblem } from "@/content/pages/home";
import { ScrollReveal, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import useCountUp from "@/shared/hooks/useCountUp";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { useUi } from "@/shared/providers/UiProvider";
import { DivergentAnswers } from "../DivergentAnswers";
import styles from "./ProblemSection.module.scss";

function EvidenceFigure({ figure }: { figure: string }) {
  const { ref, display } = useCountUp(figure, { startAtZero: true });
  return (
    <div ref={ref} data-problem-counter className={styles.figure}>
      <span className={styles.srOnly}>{figure}</span>
      <span aria-hidden="true">{display}</span>
    </div>
  );
}

export interface ProblemSectionProps {
  content: HomeProblem;
}

export function ProblemSection({ content }: ProblemSectionProps) {
  const reduced = usePrefersReducedMotion();
  const ui = useUi();
  const HOME_PROBLEM = content;
  return (
    <motion.section
      id="problem"
      initial={{ opacity: 0, y: 24 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduced ? 0 : 0.75, ease: [0.2, 0.8, 0.2, 1] }}
      className={styles.root}
    >


      <ScrollRevealRail className={styles.rail}>
        <SectionHeader
          num={content.eyebrow.number}
          label={content.eyebrow.label}
          setup={content.title.setup}
          payoff={content.title.payoff}
          lede={HOME_PROBLEM.description.join(" ")}
        />

        {/* One composition under one hairline (tightened 21 Oct 2026, user:
            "the bottom line feels out of proportion, the things are not
            placed right"). Right, the three answers, the column exactly the
            drawing's width from xl. Left, framing them: the industry record
            at the top, level with the question, and the verdict at the foot,
            level with "Which number do you act on?". The verdict stays the
            section's last line and its bridge into [02]; no bridge button
            (founder, 20 Oct 2026). On phones the answers come first. */}
        <div className={styles.composition}>
          <ScrollReveal delay={180} className={styles.answers}>
            <DivergentAnswers content={content} />
          </ScrollReveal>

          <div className={styles.frame}>
            <ScrollReveal delay={220}>
              <div className={styles.evidence}>
                <h3 className={styles.evidenceHeading}>
                  {HOME_PROBLEM.evidenceHeading}
                </h3>

                <div className={styles.facts}>
                  {HOME_PROBLEM.facts.map((fact) => (
                    <div key={fact.figure} className={styles.fact}>
                      {/* Deep red marks the cost, with contrast for large figures. */}
                      <EvidenceFigure figure={fact.figure} />
                      <div className={styles.factBody}>
                        <p className={styles.claim}>
                          {fact.claim}
                        </p>
                        <a
                          href={fact.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.source}
                        >
                          {fact.source}
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                            className={styles.sourceIcon}
                          >
                            <path d="M3.5 8.5 8.5 3.5M8.5 3.5H4.75M8.5 3.5v3.75" />
                          </svg>
                          <span className={styles.srOnly}>{ui.opensInNewTab}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* The verdict: the section's thesis, which [02] answers. */}
            <ScrollReveal delay={160}>
              <p className={styles.verdict}>
                <span className={styles.verdictSetup}>{content.verdict.setup}</span>
                <span className={styles.verdictPayoff}>{content.verdict.payoff}</span>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </ScrollRevealRail>
    </motion.section>
  );
}
