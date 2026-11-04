"use client";

import Link from "next/link";
import type { HomeClose } from "@/content/pages/home";
import { AkashicLogo } from "@/shared/components/icons";
import { ScrollReveal, ScrollRevealRail } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import styles from "./Closure.module.scss";

/*
 * [10] Ready when you are.
 *
 * The closing card and footer follow the selected appearance. The pale blue
 * light treatment shares the same geometry as the layered midnight version.
 *
 * The typographic polish built during the blue round stays: `closeRule` draws
 * the hairline under the headline on reveal, and the two ambient auras drift
 * on offset cycles (`closeFloat`) so the card is never quite still. Both are
 * decorative and stop dead under the global reduced-motion override.
 */

export interface ClosureProps {
  content: HomeClose;
}

export function Closure({ content }: ClosureProps) {
  return (
    <section
      id="get-started"
      aria-labelledby="get-started-h"
      className={styles.section}
    >
      {/* Alias anchor: the nav CTA targets #talk-to-our-team / #login on every page */}
      <span id="talk-to-our-team" className={styles.alias} aria-hidden />
      <span id="login" className={styles.alias} aria-hidden />
      <ScrollRevealRail className={styles.rail}>
        {/* Immersive typography-first card */}
        <ScrollReveal delay={120}>
          <div className={styles.card}>
            {/* Custom dot-grid background */}


{/* Glowing blue ambient background — offset centre, counter-drifting */}


            {/* Immersive Typography CTA Content */}
            <div className={styles.content}>
              {/* Minimalist Accent Badge */}
              <div className={styles.badge}>
                <AkashicLogo className={styles.badgeLogo} accentColor="rgb(var(--diagram-gold))" />
                <span className={styles.badgeLabel}>{content.badge}</span>
              </div>

              <h2
                id="get-started-h"
                className={styles.title}
              >
                {content.title}
              </h2>

              {/* Hairline that draws itself in under the headline. */}
              <span
                aria-hidden
                className={styles.rule}
              />

              <p className={styles.body}>
                {/* The explicit {" "} are load-bearing — JSX drops the
                    whitespace around the newline before a <br>, so below `sm`,
                    where these breaks are hidden, the lines closed up into
                    "streaming data.Resolve core entities" and "knowledge
                    layer,and run enterprise intelligence". */}
                {/* Last line rewritten 14 Oct 2026: "run enterprise
                    intelligence" now reads as the Enterprise Intelligence
                    solution. It ends on /akashic's hero promise instead. */}
                {content.body.map((line, k) => (
                  <span key={line}>
                    {line}
                    {k < content.body.length - 1 && (
                      <>
                        {" "}
                        <br className={styles.break} />
                      </>
                    )}
                  </span>
                ))}
              </p>

              {/* Centered CTA Buttons */}
              <div className={styles.actions}>
                <Link
                  href={content.primary.href}
                  className={cx("btn-primary btn-lg", styles.action)}
                >
                  {content.primary.label}
                </Link>
                {/* Was `#platform` — at the closing CTA, half the exits
                    pointed BACK UP the page the reader has just finished. A
                    close should only offer forward moves, so this goes to the
                    platform page. */}
                <Link
                  href={content.secondary.href}
                  className={cx("btn-secondary btn-lg", styles.action)}
                >
                  {content.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
