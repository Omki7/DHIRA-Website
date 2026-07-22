import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import EnergyHero from "@/components/sections/energy/EnergyHero";
import EnergySignal from "@/components/sections/energy/EnergySignal";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { ENERGY_SECTIONS } from "@/lib/energySections";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const content = SECTOR_PAGES.energy;

export const metadata: Metadata = {
  title: "Energy & Utilities",
  description:
    "Akashic unifies SCADA, metering, and asset data into one governed live picture, so the grid is maintained on condition, not on the calendar.",
  openGraph: {
    title: "Energy & Utilities Sector | DHIRA",
    description:
      "Akashic unifies SCADA, metering, and asset data into one governed live picture.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Energy & Utilities Sector — DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Energy & Utilities Sector | DHIRA",
    description:
      "Unify SCADA, metering, and asset data into one governed live picture.",
    images: ["/og-image.png"],
  },
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
      <PageMinimap sections={ENERGY_SECTIONS} aria-label="Energy page sections" />
    </>
  );
}
