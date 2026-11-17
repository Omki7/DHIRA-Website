"use client";

import Link from "next/link";
import { useId, useRef } from "react";
import type { HomeHero } from "@/content/pages/home";
import { RotatingPhrase, ScrollRevealRail } from "@/shared/components/ui";
import { HomeHeroTeasersMockup } from "../../mockups/HomeHeroTeasersMockup";
import { HeroOfferings } from "../HeroOfferings";
import { useOfferingsCycle } from "./useOfferingsCycle";
import styles from "./Hero.module.scss";

/** How long each offering stays before the next (the loading bar's run). */
const OFFERING_DURATION = 6500;

export interface HeroProps {
  content: HomeHero;
}

/* One clock keeps the headline and previews together. Each offering's
   explanation stays visible under its name, so the choice is readable
   before interacting or waiting for the cycle; each offering links to its
   section below. */
export function Hero({ content }: HeroProps) {
  const { title, lede, offerings, contact } = content;
  const ref = useRef<HTMLElement>(null);
  const cycle = useOfferingsCycle(offerings.items.length, ref);
  const uid = useId();
  const labelId = (index: number) => `${uid}-offering-${index}`;
  const phrases = offerings.items.map((item) => item.phrase);

  return (
    <section ref={ref} id="hero" className={styles.root}>
      <div className={styles.frame}>
        <ScrollRevealRail className={styles.rail}>
          <div className={styles.pitch}>
            {/* The h1 holds the rotating word, so its name comes from this
                plain copy of the headline with the first offering's phrase. */}
            <span id="hero-headline" hidden>{`${title.first} ${title.secondLead} ${phrases[0]} ${title.tail}`}</span>
            <h1 aria-labelledby="hero-headline" className={styles.title}>
              <span className={styles.titleSetup}>{title.first}</span>{" "}
              <span className={styles.titleLead}>{title.secondLead} </span>
              <RotatingPhrase phrases={phrases} suffix={` ${title.tail}`} align="center" index={cycle.active} />
            </h1>
            <p className={styles.lede}>
              {lede[0]} <br className={styles.ledeBreak} />
              {lede[1]}
            </p>

            <Link href={contact.href} className={`btn-primary ${styles.contact}`}>
              {contact.label}
            </Link>

            <HeroOfferings content={offerings} cycle={cycle} duration={OFFERING_DURATION} labelId={labelId} />
          </div>

          <div role="group" aria-labelledby={labelId(cycle.active)} className={styles.panel}>
            <HomeHeroTeasersMockup offerings={offerings.items} active={cycle.active} />
          </div>
        </ScrollRevealRail>
      </div>
    </section>
  );
}
