/*
 * The text-only hero for hub and resource pages (pricing, insights, trust,
 * newsroom, legal), generalised from the /solutions hub hero (user-approved
 * editorial register, 14 Oct 2026). Label, two-tone h1, lede under it on the
 * left (never a right column, see SectionHeader), then an on-page index,
 * because a hub's first job is to route the reader.
 *
 * `index` lists the page's sections, numbered as their eyebrows are.
 * `indexLabel` names that index for assistive tech (the "On this page" UI
 * string, passed in by the page).
 * `meta` sits above the index (a date line, a count); `children` below it.
 */

import type { ReactNode } from "react";
import { FigureEyebrow } from "@/shared/components/ui/FigureEyebrow";
import { ScrollReveal } from "@/shared/components/ui/ScrollReveal";
import { ScrollRevealRail } from "@/shared/components/ui/ScrollRevealRail";
import { TwoToneTitle } from "@/shared/components/ui/TwoToneTitle";
import styles from "./PageHero.module.scss";

export type HeroIndexItem = { id: string; label: string };

export interface PageHeroProps {
  label: string;
  setup: ReactNode;
  payoff: ReactNode;
  lede: ReactNode;
  index?: HeroIndexItem[];
  /** aria-label for the on-page index nav (the `onThisPage` UI string). */
  indexLabel: string;
  meta?: ReactNode;
  children?: ReactNode;
}

export function PageHero({
  label,
  setup,
  payoff,
  lede,
  index,
  indexLabel,
  meta,
  children,
}: PageHeroProps) {
  return (
    <section id="hero" className={styles.hero}>
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow bare label={label} />
        </ScrollReveal>
        <div className={styles.body}>
          <ScrollReveal delay={80}>
            <TwoToneTitle as="h1" setup={setup} payoff={payoff} />
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className={styles.lede}>{lede}</p>
          </ScrollReveal>
          {meta && (
            <ScrollReveal delay={160}>
              <div className={styles.meta}>{meta}</div>
            </ScrollReveal>
          )}
          {index && index.length > 0 && (
            <ScrollReveal delay={180}>
              <nav
                aria-label={indexLabel}
                className={styles.index}
              >
                {index.map((item, k) => (
                  <a key={item.id} href={`#${item.id}`} className={styles.indexLink}>
                    <span className={styles.indexNum}>[{String(k + 1).padStart(2, "0")}]</span>&nbsp;&nbsp;{item.label}
                  </a>
                ))}
              </nav>
            </ScrollReveal>
          )}
          {children && <ScrollReveal delay={200}>{children}</ScrollReveal>}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
