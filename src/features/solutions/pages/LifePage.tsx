import type { LifePage as LifePageContent } from "@/content/pages/solutions-life";
import { ClosingCard } from "../components/ClosingCard";
import { LifeChanges } from "../components/LifeChanges";
import { LifeDelays } from "../components/LifeDelays";
import { LifeFaq } from "../components/LifeFaq";
import { LifeFoundation } from "../components/LifeFoundation";
import { LifeHero } from "../components/LifeHero";
import { LifeHowItWorks } from "../components/LifeHowItWorks";
import { LifeLevels } from "../components/LifeLevels";
import { LifeVisit } from "../components/LifeVisit";
import styles from "./LifePage.module.scss";

export interface LifePageProps {
  page: LifePageContent;
}

/* The /solutions/life body: the sections in order (docs/ARCHITECTURE.md;
   the story is docs/LIFE_PAGE_SCRIPT.md §3). The problem in the reader's
   own framework, how it works, what changes, one visit, every level, the
   proof underneath, questions. The route loads the content and renders
   this. Each `num` is the section's chapter in the section index
   (content/pages/solutions-life.ts `sections`), so sections in one chapter
   share it. */
export function LifePage({ page }: LifePageProps) {
  return (
    <main id="main" className={styles.main}>
      <LifeHero content={page.hero} />
      <LifeDelays content={page.delays} num="01" />
      <LifeHowItWorks content={page.howItWorks} num="02" />
      <LifeChanges content={page.changes} num="03" />
      <LifeVisit content={page.visit} num="03" />
      <LifeLevels content={page.levels} num="03" />
      <LifeFoundation content={page.foundation} num="04" />
      <LifeFaq content={page.faq} num="04" />
      <ClosingCard
        kicker={page.close.sessionLabel}
        title={page.close.title}
        prompt={page.close.prompt}
        primary={page.close.primary}
        timeline={page.close.timeline}
        footnote={page.close.footnote}
      />
    </main>
  );
}
