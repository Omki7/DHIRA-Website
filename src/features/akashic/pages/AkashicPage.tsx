import type { Story } from "@/content/collections/customer-stories";
import type { AkashicPage as AkashicDocument } from "@/content/pages/akashic";
import { ProvenAtScale } from "@/features/proof";
import { ScrollRevealRail } from "@/shared/components/ui";
import { AkashicAgents } from "../components/AkashicAgents";
import { AkashicArchitecture } from "../components/AkashicArchitecture";
import { AkashicBuildVsBuy } from "../components/AkashicBuildVsBuy";
import { AkashicClose } from "../components/AkashicClose";
import { AkashicFaq } from "../components/AkashicFaq";
import { AkashicFourMoves } from "../components/AkashicFourMoves";
import { AkashicHeroQuote } from "../components/AkashicHeroQuote";
import { AkashicModular } from "../components/AkashicModular";
import { AkashicModules } from "../components/AkashicModules";
import { AkashicOpenFoundations } from "../components/AkashicOpenFoundations";
import { AkashicPlatform } from "../components/AkashicPlatform";
import { AkashicStack } from "../components/AkashicStack";
import { AkashicTrust } from "../components/AkashicTrust";
import styles from "./AkashicPage.module.scss";

export interface AkashicPageProps {
  page: AkashicDocument;
  stories: Story[];
}

export function AkashicPage({ page, stories }: AkashicPageProps) {
  return (
    <main id="main" data-theme-page="akashic" className={styles.main}>
      <AkashicHeroQuote quote={page.quote} hero={page.hero} />
      <AkashicFourMoves content={page.inAction} />
      <AkashicModular content={page.howItWorks} />
      <ScrollRevealRail>
        <div className={styles.archWrap}>
          <AkashicArchitecture content={page.deployment} />
        </div>
      </ScrollRevealRail>
      <AkashicModules content={page.architecture} />
      <AkashicAgents content={page.agents} />
      <AkashicTrust content={page.trust} />
      <AkashicOpenFoundations content={page.open} />
      <AkashicBuildVsBuy content={page.advantage} />
      <ProvenAtScale id="scale" content={page.scale} stories={stories} />
      <AkashicStack content={page.reference} />
      <AkashicPlatform content={page.solutions} />
      <AkashicFaq content={page.faq} />
      <AkashicClose content={page.close} />
    </main>
  );
}
