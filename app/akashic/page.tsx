import type { Metadata } from "next";
import "@/components/sections/akashic/akashic-story.css";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import AkashicAgents from "@/components/sections/akashic/AkashicAgents";
import AkashicArchitecture from "@/components/sections/akashic/AkashicArchitecture";
import AkashicBuildVsBuy from "@/components/sections/akashic/AkashicBuildVsBuy";
import AkashicClose from "@/components/sections/akashic/AkashicClose";
import AkashicFaq from "@/components/sections/akashic/AkashicFaq";
import AkashicFourMoves from "@/components/sections/akashic/AkashicFourMoves";
import AkashicHeroQuote from "@/components/sections/akashic/AkashicHeroQuote";
import AkashicModular from "@/components/sections/akashic/AkashicModular";
import AkashicModules from "@/components/sections/akashic/AkashicModules";
import AkashicOpenFoundations from "@/components/sections/akashic/AkashicOpenFoundations";
import AkashicPlatform from "@/components/sections/akashic/AkashicPlatform";
import AkashicStack from "@/components/sections/akashic/AkashicStack";
import AkashicTrust from "@/components/sections/akashic/AkashicTrust";
import ProvenAtScale from "@/components/sections/ProvenAtScale";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { getCustomerStories, getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("akashic");
  return pageMetadata(seo);
}

export default async function AkashicPage() {
  const [page, stories] = await Promise.all([getPage("akashic"), getCustomerStories()]);
  return (
    <>
      <Nav />
      <main id="main" data-theme-page="akashic" className="bg-background">
        <AkashicHeroQuote quote={page.quote} hero={page.hero} />
        <AkashicFourMoves content={page.inAction} />
        <AkashicModular content={page.howItWorks} />
        <ScrollRevealRail>
          <div className="relative border-b border-lineSoft bg-background">
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
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
