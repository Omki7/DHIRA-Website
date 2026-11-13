"use client";

import { useState } from "react";
import Link from "next/link";
import type { AkashicLicensing as AkashicLicensingContent } from "@/content/pages/akashic";
import { ScrollReveal, ScrollRevealRail, SectionLink } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicLicensing.module.scss";

/*
 * [09] Licensing and IP: transparent capacity-based licensing across four
 * plans, paired with total customer ownership of data, logic and models.
 *
 * Interactive, high-clarity branching conduit linking directly to /pricing#plans.
 */

export interface AkashicLicensingProps {
  content: AkashicLicensingContent;
}

const TIER_Y_COORDS = [38, 126, 214, 302] as const;
const SVG_ROOT_Y = 170;

export function AkashicLicensing({ content }: AkashicLicensingProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="licensing" aria-labelledby="licensing-h" className={styles.section}>
      <ScrollRevealRail>
        <ScrollReveal>
          <StoryLabel number={content.number}>{content.label}</StoryLabel>
          <div className={styles.body}>
            {/* Left column: headline, lede, IP principles ledger, onward link */}
            <div className={styles.left}>
              <StoryTitle setup={content.setup}>
                {content.title}
              </StoryTitle>
              {content.intro && <p className={styles.intro}>{content.intro}</p>}

              {content.pillars && (
                <div className={styles.pillars}>
                  {content.pillars.map((pillar) => (
                    <div key={pillar.label} className={styles.pillar}>
                      <span className={styles.pillarDot} aria-hidden />
                      <div className={styles.pillarTextWrap}>
                        <span className={styles.pillarLabel}>{pillar.label}</span>
                        <span className={styles.pillarText}>{pillar.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.sectionLinkWrap}>
                <SectionLink href={content.link.href}>{content.link.label}</SectionLink>
              </div>
            </div>

            {/* Right column: active branching conduit & interactive tier cards */}
            <div className={styles.tiersWrap}>
              <svg
                aria-hidden="true"
                viewBox="0 0 100 340"
                preserveAspectRatio="none"
                className={styles.branches}
                fill="none"
              >
                {TIER_Y_COORDS.map((y, i) => {
                  const isHovered = hoveredIndex === i;
                  return (
                    <g key={y}>
                      <path
                        d={`M0 ${SVG_ROOT_Y} C${22 + i * 5} ${SVG_ROOT_Y}, 38 ${y}, 99 ${y}`}
                        stroke={isHovered ? "rgb(var(--blue))" : "currentColor"}
                        strokeOpacity={isHovered ? 1 : 0.28 + i * 0.12}
                        strokeWidth={isHovered ? 2 : 1}
                        vectorEffect="non-scaling-stroke"
                        className={styles.branchPath}
                      />
                      <circle
                        cx="99"
                        cy={y}
                        r={isHovered ? 3.5 : 2}
                        fill={isHovered ? "rgb(var(--blue))" : "currentColor"}
                        fillOpacity={isHovered ? 1 : 0.45}
                        className={styles.terminalDot}
                      />
                    </g>
                  );
                })}
                {/* Central root anchor node */}
                <circle cx="3" cy={SVG_ROOT_Y} r="3" fill="currentColor" />
                <circle
                  cx="3"
                  cy={SVG_ROOT_Y}
                  r="7"
                  stroke="currentColor"
                  strokeOpacity={0.35}
                  strokeWidth="1"
                  fill="none"
                />
              </svg>

              <div className={styles.tiersList}>
                {content.tiers.map((tier, i) => {
                  const isHovered = hoveredIndex === i;
                  return (
                    <Link
                      key={tier.name}
                      href={tier.href}
                      className={cx(styles.tierCard, isHovered && styles.tierCardActive)}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(i)}
                      onBlur={() => setHoveredIndex(null)}
                    >
                      <div className={styles.tierInfo}>
                        <div className={styles.tierTitleRow}>
                          <span className={styles.tierNum}>[{tier.num}]</span>
                          <span className={styles.tierName}>{tier.name}</span>
                        </div>
                        <p className={styles.tierTagline}>{tier.tagline}</p>
                      </div>

                      <div className={styles.tierMeta}>
                        <span className={styles.tierCapacity}>{tier.capacity}</span>
                        <span aria-hidden="true" className={styles.arrowPill}>
                          <span className={styles.arrowGlyph}>↗</span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
