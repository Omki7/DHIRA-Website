import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ManufacturingHero from "@/components/sections/manufacturing/ManufacturingHero";
import ManufacturingClocks from "@/components/sections/manufacturing/ManufacturingClocks";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { MANUFACTURING_SECTIONS } from "@/lib/manufacturingSections";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const content = SECTOR_PAGES.manufacturing;

export const metadata: Metadata = {
  title: "Manufacturing Sector",
  description:
    "Akashic connects the shop floor to the enterprise: MES, SCADA, and ERP unified into one governed record, so drift is caught while the shift can still act.",
  openGraph: {
    title: "Manufacturing Sector | DHIRA",
    description:
      "Akashic connects the shop floor to the enterprise: MES, SCADA, and ERP unified into one governed record.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Manufacturing Sector — DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing Sector | DHIRA",
    description:
      "MES, SCADA, and ERP unified into one governed record for real-time manufacturing intelligence.",
    images: ["/og-image.png"],
  },
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
      <PageMinimap sections={MANUFACTURING_SECTIONS} aria-label="Manufacturing page sections" />
    </>
  );
}
