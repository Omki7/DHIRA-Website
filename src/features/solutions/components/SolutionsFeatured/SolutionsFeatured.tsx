import Link from "next/link";
import type { FeaturedSolution, SolutionsPage } from "@/content/pages/solutions";
import { AkashicWordmark } from "@/shared/components/icons";
import { DrawnFigure, ScrollReveal, ScrollRevealRail, SectionHeader, Tag } from "@/shared/components/ui";
import { ForecastMoment } from "./ForecastMoment";
import { LifecycleMoment } from "./LifecycleMoment";
import { VisitsMoment } from "./VisitsMoment";
import styles from "./SolutionsFeatured.module.scss";

export interface SolutionsFeaturedProps {
  content: SolutionsPage["featured"];
}

function Moment({ moment }: { moment: FeaturedSolution["moment"] }) {
  if (moment.kind === "forecast") return <ForecastMoment moment={moment} />;
  if (moment.kind === "lifecycle") return <LifecycleMoment moment={moment} />;
  return <VisitsMoment moment={moment} />;
}

/*
 * [built-on-akashic] Three chapters on one root (5 Nov 2026,
 * docs/SOLUTIONS_PAGE_SCRIPT.md). Replaces the numbered point lists. Each
 * flagship is an open chapter on a hairline: who it is for, its name, the
 * gain, how, what it includes (agent work dashed as preview), one link.
 * Beside it, one moment at native size answers the question its reader
 * already asks, set as the Enterprise Intelligence ask chip. A thread runs
 * down the chapters and roots into the foundation strip: every solution,
 * all seven modules (the homepage's strip). Anchors stay:
 * #enterprise-intelligence, #intelligent-procurement, #akashic-life.
 */
export function SolutionsFeatured({ content }: SolutionsFeaturedProps) {
  const { foundation } = content;
  return (
    <section id="built-on-akashic" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num={content.num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <div className={styles.chapters}>
          {content.items.map((solution) => (
            <article key={solution.id} id={solution.id} className={styles.chapter}>
              <ScrollReveal className={styles.copy}>
                <p className={styles.audience}>{solution.audience}</p>
                <h3 className={styles.name}>{solution.name}</h3>
                <p className={styles.headline}>{solution.headline}</p>
                <p className={styles.description}>{solution.description}</p>
                <ul className={styles.includes} aria-label={`${solution.name} includes`}>
                  {solution.includes.map((item) => (
                    <li key={item.label}>
                      <Tag preview={item.preview}>{item.label}</Tag>
                    </li>
                  ))}
                </ul>
                <Link href={solution.href} className={styles.link}>
                  {solution.cta}
                  <span aria-hidden="true" className={styles.arrow}>
                    &rarr;
                  </span>
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={90} className={styles.stage}>
                <DrawnFigure className={styles.moment} threshold={0.3}>
                  <p className={styles.ask}>
                    <svg viewBox="0 0 16 16" className={styles.askIcon} aria-hidden="true">
                      <circle cx="7" cy="7" r="4.5" />
                      <path d="m10.5 10.5 3 3" />
                    </svg>
                    {solution.question}
                  </p>
                  <Moment moment={solution.moment} />
                </DrawnFigure>
              </ScrollReveal>
            </article>
          ))}
        </div>

        <ScrollReveal>
          <div className={styles.foundation}>
            <div className={styles.foundationHead}>
              <p className={styles.foundationName}>
                <AkashicWordmark />
              </p>
              <div>
                <p className={styles.foundationCaption}>{foundation.caption}</p>
                <p className={styles.foundationText}>{foundation.description}</p>
              </div>
            </div>
            <ul className={styles.modules}>
              {foundation.modules.map((module) => (
                <li key={module} className={styles.module}>
                  {module}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
