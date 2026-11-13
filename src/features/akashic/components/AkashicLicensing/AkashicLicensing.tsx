import Link from "next/link";
import type { AkashicLicensing as AkashicLicensingContent } from "@/content/pages/akashic";
import { ScrollReveal, ScrollRevealRail, SectionLink } from "@/shared/components/ui";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicLicensing.module.scss";

/*
 * [09] Licensing and IP: transparent capacity-based licensing across four
 * plans, paired with total customer ownership of data, logic and models.
 *
 * Clean, simple branch navigation linking directly to /pricing.
 */

export interface AkashicLicensingProps {
  content: AkashicLicensingContent;
}

export function AkashicLicensing({ content }: AkashicLicensingProps) {
  return (
    <section id="licensing" aria-labelledby="licensing-h" className={styles.section}>
      <ScrollRevealRail>
        <ScrollReveal>
          <StoryLabel number={content.number}>{content.label}</StoryLabel>
          <div className={styles.body}>
            <div className={styles.left}>
              <StoryTitle setup={content.setup}>
                {content.title}
              </StoryTitle>
              {content.intro && <p className={styles.intro}>{content.intro}</p>}
              <div className={styles.sectionLinkWrap}>
                <SectionLink href={content.link.href}>{content.link.label}</SectionLink>
              </div>
            </div>

            <div className={styles.roles}>
              <svg
                aria-hidden="true"
                viewBox="0 0 100 280"
                preserveAspectRatio="none"
                className={styles.branches}
                fill="none"
              >
                {[35, 105, 175, 245].map((y, i) => (
                  <path
                    key={y}
                    d={`M0 140 C${20 + i * 5} 140, 30 ${y}, 96 ${y}`}
                    stroke="currentColor"
                    strokeOpacity={0.25 + i * 0.16}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <circle cx="3" cy="140" r="3" fill="currentColor" />
              </svg>
              {content.tiers.map((tier) => (
                <Link key={tier.name} href={tier.href} className={styles.role}>
                  <span className={styles.seat}>{tier.name}</span>
                  <span aria-hidden="true" className={styles.arrow}>
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
