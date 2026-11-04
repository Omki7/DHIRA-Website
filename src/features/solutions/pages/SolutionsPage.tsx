import type { SolutionsPage as SolutionsPageContent } from "@/content/pages/solutions";
import { ClosingCard } from "../components/ClosingCard";
import { SolutionsFeatured } from "../components/SolutionsFeatured";
import { SolutionsHero } from "../components/SolutionsHero";
import { SolutionsIndex } from "../components/SolutionsIndex";
import { SolutionsMore } from "../components/SolutionsMore";
import styles from "./SolutionsPage.module.scss";

export interface SolutionsPageProps {
  page: SolutionsPageContent;
  /** Accessible name of the hero's on-page index (ui strings). */
  indexLabel: string;
}

/* The /solutions hub body: the sections in order (docs/ARCHITECTURE.md; the
   story is docs/SOLUTIONS_PAGE_SCRIPT.md §3). What is here, the three
   flagships as chapters, the rest of the catalogue, where to start, then
   the closing card. The route loads the content and renders this. */
export function SolutionsPage({ page, indexLabel }: SolutionsPageProps) {
  return (
    <main id="main" className={styles.main}>
      <SolutionsHero content={page.hero} sections={page.sections} indexLabel={indexLabel} />
      <SolutionsFeatured content={page.featured} />
      <SolutionsMore content={page.more} />
      <SolutionsIndex content={page.index} featured={page.featured.items} more={page.more.items} />
      <ClosingCard
        kicker={page.close.kicker}
        title={page.close.title}
        prompt={page.close.prompt}
        primary={page.close.primary}
        secondary={page.close.secondary}
      />
    </main>
  );
}
