import type { Metadata } from "next";
import "@/components/sections/akashic/akashic-story.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AkashicHeroQuote from "@/components/sections/akashic/AkashicHeroQuote";
import AkashicFourMoves from "@/components/sections/akashic/AkashicFourMoves";
import AkashicAgents from "@/components/sections/akashic/AkashicAgents";
import AkashicModular from "@/components/sections/akashic/AkashicModular";
import AkashicArchitecture from "@/components/sections/akashic/AkashicArchitecture";
import AkashicModules from "@/components/sections/akashic/AkashicModules";
import AkashicTrust from "@/components/sections/akashic/AkashicTrust";
import AkashicOpenFoundations from "@/components/sections/akashic/AkashicOpenFoundations";
import AkashicBuildVsBuy from "@/components/sections/akashic/AkashicBuildVsBuy";
import AkashicStack from "@/components/sections/akashic/AkashicStack";
import AkashicPlatform from "@/components/sections/akashic/AkashicPlatform";
import ProvenAtScale from "@/components/sections/ProvenAtScale";
import AkashicFaq from "@/components/sections/akashic/AkashicFaq";
import AkashicClose from "@/components/sections/akashic/AkashicClose";
import PageMinimap from "@/components/layout/PageMinimap";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { AKASHIC_SECTIONS } from "@/lib/akashicSections";

export const metadata: Metadata = {
  title: "Akashic: Data and AI Platform",
  description:
    "Akashic is the governed data and AI platform. Pipelines, master data, warehouse, ML, AI answers and BI on one foundation, ready for agents, with lineage, access control and audit under every layer.",
  openGraph: {
    title: "Akashic: Data and AI Platform | DHIRA",
    description:
      "The governed data and AI platform. Pipelines, master data, warehouse, ML, AI answers and BI on one foundation, ready for agents.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Akashic, the data and AI platform by DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akashic: Data and AI Platform | DHIRA",
    description:
      "The governed data and AI platform, ready for agents.",
    images: ["/og-image.png"],
  },
};

export default function AkashicPage() {
  return (
    <>
      <Nav />
      <main id="main" data-theme-page="akashic" className="bg-background">
        <AkashicHeroQuote />
        <AkashicFourMoves />
        <AkashicModular />
        <ScrollRevealRail>
          <div className="relative border-b border-lineSoft bg-background">
            <AkashicArchitecture />
          </div>
        </ScrollRevealRail>
        <AkashicModules />
        <AkashicAgents />
        <AkashicTrust />
        <AkashicOpenFoundations />
        <AkashicBuildVsBuy />
        <ProvenAtScale id="scale" sectionNumber="09" />
        <AkashicStack />
        <AkashicPlatform />
        <AkashicFaq />
        <AkashicClose />
      </main>
      <Footer />
      <PageMinimap sections={AKASHIC_SECTIONS} aria-label="Akashic page sections" />
    </>
  );
}
