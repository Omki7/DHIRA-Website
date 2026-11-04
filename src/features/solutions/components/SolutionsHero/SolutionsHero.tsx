import type { PageSection } from "@/content/types";
import type { SolutionsPage } from "@/content/pages/solutions";
import { FigureEyebrow, ScrollReveal, ScrollRevealRail, TwoToneTitle } from "@/shared/components/ui";
import styles from "./SolutionsHero.module.scss";

export interface SolutionsHeroProps {
  content: SolutionsPage["hero"];
  sections: PageSection[];
  /** Accessible name of the on-page index (ui strings). */
  indexLabel: string;
}

/*
 * [hero] /solutions (kept, user's pick, 5 Nov 2026; moved into
 * features/solutions as an SCSS Module without visual change). Text only,
 * left aligned, in the /about and /careers header grammar, with an on-page
 * index under the lede, because a hub's first job is to route the reader.
 */
export function SolutionsHero({ content, sections, indexLabel }: SolutionsHeroProps) {
  /* The on-page index lists the body sections, not the hero or the close. */
  const index = sections.slice(1, -1);
  return (
    <section id="hero" className={styles.hero}>
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow bare label={content.label} />
        </ScrollReveal>
        <div className={styles.body}>
          <ScrollReveal delay={80}>
            <TwoToneTitle as="h1" setup={content.setup} payoff={content.payoff} />
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className={styles.lede}>{content.lede}</p>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <nav aria-label={indexLabel} className={styles.index}>
              {index.map((section, i) => (
                <a key={section.id} href={`#${section.id}`} className={styles.indexLink}>
                  <span className={styles.indexNum}>[{String(i + 1).padStart(2, "0")}]</span>
                  {"  "}
                  {section.label}
                </a>
              ))}
            </nav>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
