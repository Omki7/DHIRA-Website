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
import AkashicSolutions from "@/components/sections/akashic/AkashicSolutions";
import AkashicScale from "@/components/sections/akashic/AkashicScale";
import AkashicClose from "@/components/sections/akashic/AkashicClose";
import PageMinimap from "@/components/layout/PageMinimap";
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
        <AkashicArchitecture />
        <AkashicModules />
        <AkashicTrust />
        <AkashicOpenFoundations />
        <AkashicBuildVsBuy />
        <AkashicStack />
        <AkashicSolutions />
        <AkashicScale />
        <AkashicClose />
      </main>
      <Footer />
      <PageMinimap sections={AKASHIC_SECTIONS} aria-label="Akashic page sections" />
    </>
  );
}
