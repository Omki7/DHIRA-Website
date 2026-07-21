import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import EnergyHero from "@/components/sections/energy/EnergyHero";
import EnergySignal from "@/components/sections/energy/EnergySignal";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const content = SECTOR_PAGES.energy;

export const metadata: Metadata = {
  title: "Energy — See the grid before it fails.",
  description:
    "Akashic unifies SCADA, metering, and asset data into one governed live picture, so the grid is maintained on condition, not on the calendar.",
};

export default function EnergyPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <EnergyHero />
        <EnergySignal />
        <SectorMap slug="energy" />
        <SectorSolution content={content} />
        <SectorOutcomes content={content} />
        <SectorClose content={content} />
      </main>
      <Footer />
    </>
  );
}
