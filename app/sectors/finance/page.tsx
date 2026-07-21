import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import FinanceHero from "@/components/sections/finance/FinanceHero";
import FinanceChain from "@/components/sections/finance/FinanceChain";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const content = SECTOR_PAGES.finance;

export const metadata: Metadata = {
  title: "Finance — Catch risk before it clears.",
  description:
    "Akashic watches every transaction against the whole graph: one resolved customer across products, real-time pattern recognition, and lineage on every alert.",
};

export default function FinancePage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <FinanceHero />
        <FinanceChain />
        <SectorMap slug="finance" />
        <SectorSolution content={content} />
        <SectorOutcomes content={content} />
        <SectorClose content={content} />
      </main>
      <Footer />
    </>
  );
}
