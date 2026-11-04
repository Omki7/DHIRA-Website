"use client";

/* The homepage and platform hero share one rotating phrase treatment. */

import Link from "next/link";
import type { AkashicPage } from "@/content/pages/akashic";
import { nameOrWordmark } from "@/shared/components/icons";
import {
  RotatingPhrase,
  ScrollReveal,
  ScrollRevealRail,
} from "@/shared/components/ui";
import styles from "./AkashicHero.module.scss";

export interface AkashicHeroProps {
  content: AkashicPage["hero"];
}

export function AkashicHero({ content }: AkashicHeroProps) {
  const { badge, kicker, title, lede, primary, secondary } = content;
  return (
    <section id="hero" className={styles.hero}>
      {/* One full screen under the header (the 110px launch bar and nav), so
          the page opens on the hero alone and the quote waits below (user,
          23 Oct 2026). Drop the offset to the nav's 73px when the launch bar
          goes. */}
      <ScrollRevealRail>
        <div className={styles.inner}>
          <ScrollReveal>
            <figure className={`group ${styles.badge}`}>
              <span className={styles.badgeInner}>
                <span className={styles.badgeProduct}>
                  {nameOrWordmark(badge.product)}
                </span>
                <span className={styles.badgeDivider} />
                <span className={styles.badgeClaim}>{badge.claim}</span>
              </span>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className={styles.kicker}>
              {kicker.map((word, k) => (
                <span key={word}>
                  {k > 0 && <span className={styles.kickerDot}> &middot; </span>}
                  {word}
                </span>
              ))}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140} className={styles.titleReveal}>
            {/* The h1 holds the pause button beside its rotating word, so its
                name comes from this plain copy of the headline. */}
            <span id="akashic-headline" hidden>{`${title.lead} ${title.tail} ${title.phrases[0]}`}</span>
            <h1 aria-labelledby="akashic-headline" className={styles.title}>
              {title.lead}{" "}
              <span className={styles.titleBreak}>
                {title.tail}{" "}
                <RotatingPhrase phrases={title.phrases} />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className={styles.lede}>
              {lede}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className={styles.actions}>
              <Link href={primary.href} className="btn-primary">
                {primary.label}
              </Link>
              <Link href={secondary.href} className="btn-secondary">
                {secondary.label}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
