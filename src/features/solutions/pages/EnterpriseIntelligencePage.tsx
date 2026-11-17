import type { EisPage } from "@/content/pages/solutions-eis";
import { EisClose } from "../components/EisClose";
import { EisFaq } from "../components/EisFaq";
import { EisGap } from "../components/EisGap";
import { EisHero } from "../components/EisHero";
import { EisLeaders } from "../components/EisLeaders";
import { EisMonday } from "../components/EisMonday";
import { EisOnePicture } from "../components/EisOnePicture";
import { EisTeasers } from "../components/EisTeasers";
import { EisTrust } from "../components/EisTrust";
import styles from "./EnterpriseIntelligencePage.module.scss";

export interface EnterpriseIntelligencePageProps {
  page: EisPage;
}

/* The /solutions/enterprise-intelligence body: the sections in order
   (docs/ARCHITECTURE.md; the story is docs/EIS_PAGE_SCRIPT.md §3). Problem
   first, then what it is, the stories, the week, every leader, trust,
   questions. The route loads the content and renders this. */
export function EnterpriseIntelligencePage({ page }: EnterpriseIntelligencePageProps) {
  return (
    <main id="main" className={styles.main}>
      <EisHero content={page.hero} />
      <EisGap content={page.gap} />
      <EisOnePicture content={page.onePicture} />
      {page.teasers && <EisTeasers content={page.teasers} />}
      <EisMonday content={page.monday} />
      <EisLeaders content={page.leaders} />
      <EisTrust content={page.trust} />
      <EisFaq content={page.faq} />
      <EisClose content={page.close} />
    </main>
  );
}
