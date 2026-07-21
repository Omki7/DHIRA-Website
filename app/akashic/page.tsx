import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AkashicHero from "@/components/sections/akashic/AkashicHero";
import AkashicShowcase from "@/components/sections/akashic/AkashicShowcase";
import AkashicFourMoves from "@/components/sections/akashic/AkashicFourMoves";
import AkashicModules from "@/components/sections/akashic/AkashicModules";
import AkashicArchitecture from "@/components/sections/akashic/AkashicArchitecture";
import AkashicModular from "@/components/sections/akashic/AkashicModular";
import AkashicTrust from "@/components/sections/akashic/AkashicTrust";
import AkashicOpenFoundations from "@/components/sections/akashic/AkashicOpenFoundations";
import AkashicBuildVsBuy from "@/components/sections/akashic/AkashicBuildVsBuy";
import AkashicStack from "@/components/sections/akashic/AkashicStack";
import AkashicPlatform from "@/components/sections/akashic/AkashicPlatform";
import ProvenAtScale from "@/components/sections/ProvenAtScale";
import AkashicClose from "@/components/sections/akashic/AkashicClose";
import PageMinimap from "@/components/layout/PageMinimap";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { AKASHIC_SECTIONS } from "@/lib/akashicSections";

export const metadata: Metadata = {
  title: "Akashic — Every answer your organisation needs is already in your data.",
  description:
    "Akashic is a single governed platform for your data, analytics, and AI. Pipelines, master data, warehouse, ML, BI, and plain-language answers on one foundation, with lineage, access control, and audit under every layer. Deploy on your cloud, in your own racks, or across both.",
};

export default function AkashicPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <AkashicModular 
          curtainContent={
            <div className="flex w-full flex-col bg-background">
              <AkashicHero />
              <AkashicShowcase />
              <AkashicFourMoves />
            </div>
          }
        />
        <ScrollRevealRail>
          <div className="relative border-b border-lineSoft bg-white">
            <AkashicArchitecture />
          </div>
        </ScrollRevealRail>
        <AkashicModules />
        <AkashicTrust />
        <AkashicOpenFoundations />
        <AkashicBuildVsBuy />
        <ProvenAtScale id="scale" sectionNumber="08" eyebrowText="Proven at scale" />
        <AkashicStack />
        <AkashicPlatform />
        <AkashicClose />
      </main>
      <Footer />
      <PageMinimap sections={AKASHIC_SECTIONS} aria-label="Akashic page sections" />
    </>
  );
}
