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
import { AkashicHero } from "../components/AkashicHero";
import { AkashicHeroQuote } from "../components/AkashicHeroQuote";
import { AkashicLicensing } from "../components/AkashicLicensing";
import { AkashicModular } from "../components/AkashicModular";
import { AkashicModules } from "../components/AkashicModules";
import { AkashicPlatform } from "../components/AkashicPlatform";
import { AkashicStack } from "../components/AkashicStack";
import { AkashicTrust } from "../components/AkashicTrust";
import styles from "./AkashicPage.module.scss";

export interface AkashicPageProps {
  page: AkashicDocument;
  stories: Story[];
}

/* Section order since 5 Nov 2026 (platform audit): the [01] to [02] opening
   stays together (user, 14 Oct 2026) and the national proof follows it.
   The sticky quote under the hero renders whenever the document has one. */
export function AkashicPage({ page, stories }: AkashicPageProps) {
  return (
    <main id="main" data-theme-page="akashic" className={styles.main}>
      {page.quote ? (
        <AkashicHeroQuote quote={page.quote} hero={page.hero} />
      ) : (
        <AkashicHero content={page.hero} />
      )}
      <AkashicFourMoves content={page.inAction} />
      <AkashicModular content={page.howItWorks} />
      <ProvenAtScale id="scale" content={page.scale} stories={stories} />
      <ScrollRevealRail>
        <div className={styles.archWrap}>
          <AkashicArchitecture content={page.deployment} />
        </div>
      </ScrollRevealRail>
      <AkashicModules content={page.architecture} />
      <AkashicAgents content={page.agents} />
      <AkashicTrust content={page.trust} />
      <AkashicBuildVsBuy content={page.advantage} />
      <AkashicLicensing content={page.licensing} />
      <AkashicStack content={page.reference} />
      <AkashicPlatform content={page.solutions} />
      <AkashicFaq content={page.faq} />
      <AkashicClose content={page.close} />
    </main>
  );
}
