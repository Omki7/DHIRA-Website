import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ManufacturingHero from "@/components/sections/manufacturing/ManufacturingHero";
import ManufacturingClocks from "@/components/sections/manufacturing/ManufacturingClocks";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const content = SECTOR_PAGES.manufacturing;

export const metadata: Metadata = {
  title: "Manufacturing — The line already knows. Now you will.",
  description:
    "Akashic connects the shop floor to the enterprise: MES, SCADA, and ERP unified into one governed record, so drift is caught while the shift can still act.",
};

export default function ManufacturingPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <ManufacturingHero />
        <ManufacturingClocks />
        <SectorMap slug="manufacturing" />
        <SectorSolution content={content} />
        <SectorOutcomes content={content} />
        <SectorClose content={content} />
      </main>
      <Footer />
    </>
  );
}
