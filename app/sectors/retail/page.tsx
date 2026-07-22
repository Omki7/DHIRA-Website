import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import RetailHero from "@/components/sections/retail/RetailHero";
import RetailShelf from "@/components/sections/retail/RetailShelf";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { RETAIL_SECTIONS } from "@/lib/retailSections";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const content = SECTOR_PAGES.retail;

export const metadata: Metadata = {
  title: "Retail & Supply Chain",
  description:
    "Akashic connects POS, ERP, warehouse, and supplier feeds into one live picture, so the demand forecast runs on today's signal, not last month's export.",
  openGraph: {
    title: "Retail & Supply Chain Sector | DHIRA",
    description:
      "Akashic connects POS, ERP, warehouse, and supplier feeds into one live picture.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Retail & Supply Chain Sector — DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail & Supply Chain Sector | DHIRA",
    description:
      "Connect POS, ERP, warehouse, and supplier feeds into one live governed picture.",
    images: ["/og-image.png"],
  },
};

export default function RetailPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <RetailHero />
        <RetailShelf />
        <SectorMap slug="retail" />
        <SectorSolution content={content} />
        <SectorOutcomes content={content} />
        <SectorClose content={content} />
      </main>
      <Footer />
      <PageMinimap sections={RETAIL_SECTIONS} aria-label="Retail page sections" />
    </>
  );
}
