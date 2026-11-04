import Image from "next/image";
import AboutSection, { AboutHeading } from "@/components/sections/about/AboutSection";
import type { Leader } from "@/content/collections/leaders";
import type { AboutPage } from "@/content/pages/about";
import { SectionCoda, SectionLink } from "@/shared/components/ui";
import styles from "./AboutLeadership.module.scss";

/*
 * [04] Leadership: who carries [03]'s ambition.
 *
 * Two lines of the same kind. Under the heading, the usual route: a dashed
 * line broken twice, between a platform vendor, an integrator and a support
 * desk. Beside it, DHIRA's: one blue line that never breaks, from the first
 * architecture decision to production, ending at the person the work
 * serves (the company's point of view, not a quote). The five leaders are
 * held by one bracket along the line, not set out as stops on it: the same
 * team the whole way, not a relay of handovers. From xl the heading column
 * stays in view while the line scrolls past; where the browser supports
 * scroll-driven animation the line grows with the scroll.
 */

export interface AboutLeadershipProps {
  content: AboutPage["people"];
  leaders: Leader[];
}

/* Two slanted strokes across a vertical line: a break in a technical drawing. */
function BreakMark() {
  return (
    <svg viewBox="0 0 12 16" className={styles.break} aria-hidden>
      <path d="M1 7L11 3M1 13L11 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function UsualRoute({ label, parties }: AboutPage["people"]["usual"]) {
  return (
    <div className={styles.usual} data-about-reveal="160">
      <p className={styles.columnLabel}>{label}</p>
      <ol className={styles.route}>
        {parties.map((party, index) => (
          <li key={party} className={styles.routeStop}>
            <span className={styles.routeRing} aria-hidden />
            {party}
            {index < parties.length - 1 && <BreakMark />}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AboutLeadership({ content, leaders }: AboutLeadershipProps) {
  const { line } = content;
  return (
    <AboutSection id="leadership" eyebrow={{ number: content.number, label: content.label }}>
      <span id="people" aria-hidden="true" className={styles.alias} />
      <div className={styles.layout}>
        <div className={styles.intro}>
          <AboutHeading setup={content.setup} title={content.title} intro={content.intro} />
          <SectionLink href={content.link.href}>{content.link.label}</SectionLink>
          <UsualRoute label={content.usual.label} parties={content.usual.parties} />
        </div>

        <div className={styles.line}>
          <p className={styles.columnLabel} data-about-reveal="0">
            {line.label}
          </p>
          <ol className={styles.stops}>
            <li className={styles.stop}>
              <span className={styles.ring} aria-hidden />
              {line.start}
            </li>
            <li className={styles.team}>
              <span className={styles.bracket} aria-hidden />
              <ul className={styles.leaders}>
                {leaders.map((leader, index) => (
                  <li key={leader.id} className={styles.person} data-about-reveal={index * 50}>
                    <div className={styles.portrait}>
                      <Image src={leader.image} alt={leader.name} fill sizes="(min-width: 640px) 112px, 88px" className={styles.photo} />
                    </div>
                    <div>
                      <h3 className={styles.name}>{leader.name}</h3>
                      <p className={styles.role}>{leader.role}</p>
                      <p className={styles.focus}>{leader.focus}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.stop}>
              <span className={styles.node} aria-hidden />
              {line.production}
            </li>
          </ol>

          <div className={styles.destination} data-about-reveal="0">
            <svg viewBox="0 0 12 8" className={styles.arrow} aria-hidden>
              <path d="M1 1.5L6 6.5L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className={styles.destinationLabel}>{line.destination.label}</p>
            <h3 className={styles.destinationTitle}>{line.destination.title}</h3>
            <p className={styles.destinationLines}>
              {line.destination.lines.map((sentence) => (
                <span key={sentence}>{sentence}</span>
              ))}
            </p>
            <SectionCoda lead={content.coda.lead} payoff={<span className={styles.codaPayoff}>{content.coda.payoff}</span>} className={styles.coda} />
          </div>
        </div>
      </div>
    </AboutSection>
  );
}
