"use client";

import Link from "next/link";
import type { HomeHero } from "@/content/pages/home";
import { nameOrWordmark } from "@/shared/components/icons";
import { RotatingPhrase, ScrollRevealRail } from "@/shared/components/ui";
import { scrollToHashTarget } from "@/shared/utils/navigation";
import { HomeHeroTeasersMockup } from "../../mockups/HomeHeroTeasersMockup";
import styles from "./Hero.module.scss";

export interface HeroProps {
  content: HomeHero;
}

export function Hero({ content }: HeroProps) {
  const { badge, title, lede, primary, secondary } = content;
  return (
    <section id="hero" className={styles.root}>
      <div className={styles.frame}>
      <ScrollRevealRail>
        <div className={styles.pitch}>
          <Link
            href={badge.href}
            className={styles.badge}
          >
            <span aria-hidden className={styles.badgeArc} />
            <span className={styles.badgeInner}>
              <span className={styles.badgeLead}>{badge.lead}</span>
              <span className={styles.badgeProduct}>{nameOrWordmark(badge.product)}</span>
              <span className={styles.badgeRule} />
              <span className={styles.badgeClaim}>{badge.claim}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.badgeArrow}>
                <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          {/* The h1 holds the pause button beside its rotating word, so its name
              comes from this plain copy of the headline. */}
          <span id="hero-headline" hidden>{`${title.first} ${title.secondLead} ${title.phrases[0]} ${title.tail}`}</span>
          <h1 aria-labelledby="hero-headline" className={styles.title}>
            {title.first} <br className={styles.titleBreak} />
            <span className={styles.titleLead}>{title.secondLead} </span>
            <RotatingPhrase phrases={title.phrases} suffix={` ${title.tail}`} align="center" />
          </h1>
          <p className={styles.lede}>
            {lede[0]} <br className={styles.ledeBreak} />
            {lede[1]}
          </p>

          <div className={styles.actions}>
            <Link
              href={primary.href}
              className="btn-primary"
              onClick={(e) => {
                if (primary.href.includes("#")) {
                  e.preventDefault();
                  scrollToHashTarget(primary.href);
                }
              }}
            >
              {primary.label}
            </Link>
            <Link
              href={secondary.href}
              className="btn-secondary"
              onClick={(e) => {
                if (secondary.href.includes("#")) {
                  e.preventDefault();
                  scrollToHashTarget(secondary.href);
                }
              }}
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </ScrollRevealRail>
      <HomeHeroTeasersMockup content={content.illustrations} />
      </div>
    </section>
  );
}
