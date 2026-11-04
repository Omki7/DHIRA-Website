/* The unnumbered hiring strip after the close (it stays out of the minimap).
   Same eyebrow, headline and onward link as every section; the open seats
   come from the roles collection. */
import Link from "next/link";
import type { Role } from "@/content/collections/roles";
import type { HomeCareers } from "@/content/pages/home";
import { FigureEyebrow, ScrollReveal, ScrollRevealRail, SectionLink, TwoToneTitle } from "@/shared/components/ui";
import styles from "./CareersStrip.module.scss";

export interface CareersStripProps {
  content: HomeCareers;
  roles: Role[];
}

export function CareersStrip({ content, roles }: CareersStripProps) {
  return (
    <section id="careers" aria-labelledby="careers-h" className={styles.section}>
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow label={content.eyebrow} />
          <div className={styles.body}>
            <div>
              <TwoToneTitle id="careers-h" setup={content.title.setup} payoff={content.title.payoff} />
              <SectionLink href={content.cta.href}>{content.cta.label}</SectionLink>
            </div>
            <div className={styles.roles}>
              <svg aria-hidden="true" viewBox="0 0 100 280" preserveAspectRatio="none" className={styles.branches} fill="none">
                {[35, 105, 175, 245].map((y, i) => <path key={y} d={`M0 140 C${20 + i * 5} 140, 30 ${y}, 96 ${y}`} stroke="currentColor" strokeOpacity={0.25 + i * 0.16} strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
                <circle cx="3" cy="140" r="3" fill="currentColor" />
              </svg>
              {roles.map((role) => (
                <Link key={role.dept} href={content.rolesHref} className={styles.role}>
                  <span className={styles.seat}>{role.seat}</span>
                  <span aria-hidden="true" className={styles.arrow}>↗</span>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
