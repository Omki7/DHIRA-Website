import type { CSSProperties, ReactNode } from "react";
import type { LifeBenefitIcon, LifePage } from "@/content/pages/solutions-life";
import { ScrollReveal, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import styles from "./LifeChanges.module.scss";

export interface LifeChangesProps {
  content: LifePage["changes"];
  /** The section's place in the page's order. */
  num: string;
}

/* One line icon per benefit, drawn here because they are one-offs at one
   weight in the page's stroke. */
const ICONS: Record<LifeBenefitIcon, ReactNode> = {
  heart: (
    <>
      <path d="M20 34C20 34 5.5 25.5 5.5 16C5.5 10.8 9.4 7 13.9 7C16.6 7 19 8.8 20 10.8C21 8.8 23.4 7 26.1 7C30.6 7 34.5 10.8 34.5 16C34.5 25.5 20 34 20 34Z" />
      <path d="M7.5 18.5H14.5L17.5 12.5L22.5 25L25 18.5H32.5" />
    </>
  ),
  handset: (
    <>
      <rect x="12.5" y="4.5" width="15" height="31" rx="3" />
      <path d="M17.5 31H22.5" />
      <path d="M15.5 19H18L20 14.5L23 24L24.5 19H26" />
    </>
  ),
  record: (
    <>
      <path d="M4 7.5L19 20" />
      <path d="M4 20H19" />
      <path d="M4 32.5L19 20" />
      <path d="M22.5 20H29" />
      <rect x="29.5" y="15.5" width="9" height="9" />
      <circle cx="20.4" cy="20" r="1.7" className={styles.iconFill} />
    </>
  ),
  map: (
    <>
      <path d="M5.5 12L14.5 7.5L25.5 12L34.5 7.5V28L25.5 32.5L14.5 28L5.5 32.5V12Z" />
      <path d="M14.5 7.5V28M25.5 12V32.5" />
      <circle cx="20" cy="18.5" r="2.6" className={styles.iconFill} />
    </>
  ),
};

/*
 * [what-changes] What changes: four claims on a centre rule. Kept from the
 * 23 Jul 2026 page (user's pick, 5 Nov 2026); it now opens with the shared
 * SectionHeader on the left, and the claims take the site's heading type
 * instead of uppercase teal. The items alternate across the rule with air
 * between them, so the reader takes one claim at a time; a four-up card
 * grid would put them all in view at once and none would land.
 */
export function LifeChanges({ content, num }: LifeChangesProps) {
  return (
    <section id="what-changes" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num={num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ul className={styles.zigzag}>
          {content.items.map((item, i) => (
            <li
              key={item.head}
              className={cx(styles.item, i % 2 === 0 ? styles.right : styles.left)}
              style={{ "--row": i + 1 } as CSSProperties}
            >
              <ScrollReveal className={styles.claim}>
                <svg
                  viewBox="0 0 40 40"
                  className={styles.icon}
                  fill="none"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {ICONS[item.icon]}
                </svg>
                <h3 className={styles.head}>{item.head}</h3>
                <p className={styles.body}>{item.body}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </ScrollRevealRail>
    </section>
  );
}
