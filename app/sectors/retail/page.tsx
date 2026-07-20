import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SectorHero from "@/components/sections/sectors/SectorHero";
import SectorProblem from "@/components/sections/sectors/SectorProblem";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const content = SECTOR_PAGES.retail;

export const metadata: Metadata = {
  title: "Retail — Know what sells. Before it ships.",
  description:
    "Akashic connects POS, ERP, warehouse, and supplier feeds into one live picture, so the demand forecast runs on today's signal, not last month's export.",
};

export default function RetailPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <SectorHero content={content} />
        <SectorProblem content={content} />
        <SectorMap slug="retail" />
        <SectorSolution content={content} />
        <SectorOutcomes content={content} />
        <SectorClose content={content} />
      </main>
      <Footer />
    </>
  );
}
