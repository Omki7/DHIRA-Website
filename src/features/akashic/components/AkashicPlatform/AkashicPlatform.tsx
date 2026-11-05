import Link from "next/link";
import type { AkashicPage } from "@/content/pages/akashic";
import { ScrollReveal } from "@/shared/components/ui";
import { StoryArrow, StoryLabel, StoryTitle } from "../AkashicStory";
import { SolutionWorkflow } from "../SolutionWorkflow";
import styles from "./AkashicPlatform.module.scss";

/*
 * [09] Built on Akashic (rebuilt 14 Oct 2026; matrix cut 5 Nov 2026).
 * One claim: the solutions are not separate products but Akashic,
 * configured. Each solution stands in its own column (who it serves, its
 * claim, a three-step workflow, its link); under all three runs one shared
 * band naming the seven modules. The seven-row dot matrix that stood here
 * (every cell filled, user correction 21 Oct 2026) said the same thing 21
 * times, so the band now says it once (platform audit). Desktop rows align
 * across columns with `grid-template-rows: subgrid`. No autoplay, no
 * screens, all three solutions visible at once.
 */

export interface AkashicPlatformProps {
  content: AkashicPage["solutions"];
}

export function AkashicPlatform({ content }: AkashicPlatformProps) {
  const MODULES = content.modules;
  return (
    <section id="solutions" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <StoryLabel number={content.number}>{content.label}</StoryLabel>
          <div className={styles.heading}>
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
            <p className={styles.intro}>{content.intro}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className={styles.config}>
            <div className={styles.configGrid}>
              {/* Row labels for the desktop sheet, hidden from assistive
                  technology: each column's own headings say the same. */}
              <div className={styles.axis} aria-hidden="true">
                <p className={styles.axisHead}>{content.axis.solution}</p>
                <p className={styles.axisFlow}>{content.axis.workflow}</p>
                <p className={styles.axisLink} />
              </div>

              {content.items.map((solution) => (
                <article
                  key={solution.id}
                  className={styles.col}
                  aria-labelledby={`solution-${solution.id}`}
                >
                  <header className={styles.head}>
                    <p className={styles.category}>{solution.category}</p>
                    <h3 id={`solution-${solution.id}`}>{solution.name}</h3>
                    <p className={styles.audience}>{solution.audience}</p>
                    <h4>{solution.headline}</h4>
                  </header>

                  <SolutionWorkflow solution={solution} />

                  <Link href={solution.href} className={styles.link}>
                    {solution.cta}
                    <StoryArrow />
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.legend}>
              <div className={styles.foundation}>
                <p className={styles.foundationLabel}>
                  {content.axis.underneath}
                  <span className={styles.foundationNote}>{content.legend.on}</span>
                </p>
                <ul className={styles.foundationModules}>
                  {MODULES.map((module) => (
                    <li key={module}>{module}</li>
                  ))}
                </ul>
              </div>
              <Link href={content.all.href} className={styles.allLink}>
                {content.all.label}
                <StoryArrow />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
