import type { EisPage } from "@/content/pages/solutions-eis";
import { EisCapabilities } from "../components/EisCapabilities";
import { EisClose } from "../components/EisClose";
import { EisFaq } from "../components/EisFaq";
import { EisGap } from "../components/EisGap";
import { EisHero } from "../components/EisHero";
import { EisLenses } from "../components/EisLenses";
import { EisLoop } from "../components/EisLoop";
import { EisTeasers } from "../components/EisTeasers";
import styles from "./EnterpriseIntelligencePage.module.scss";

export interface EnterpriseIntelligencePageProps {
  page: EisPage;
}

/* The /solutions/enterprise-intelligence body: the sections in order
   (docs/ARCHITECTURE.md). The route loads the content and renders this. */
export function EnterpriseIntelligencePage({ page }: EnterpriseIntelligencePageProps) {
  return (
    <main id="main" className={styles.main}>
      <EisHero content={page.hero} />
      <EisLenses content={page.lenses} />
      <EisGap content={page.gap} />
      {page.teasers && <EisTeasers content={page.teasers} />}
      <EisCapabilities content={page.capabilities} />
      <EisLoop content={page.loop} />
      <EisFaq content={page.faq} />
      <EisClose content={page.close} />
    </main>
  );
}
