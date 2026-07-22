import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import FinanceHero from "@/components/sections/finance/FinanceHero";
import FinanceChain from "@/components/sections/finance/FinanceChain";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { FINANCE_SECTIONS } from "@/lib/financeSections";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const content = SECTOR_PAGES.finance;

export const metadata: Metadata = {
  title: "Finance & Banking",
  description:
    "Akashic watches every transaction against the whole graph: one resolved customer across products, real-time pattern recognition, and lineage on every alert.",
  openGraph: {
    title: "Finance & Banking Sector | DHIRA",
    description:
      "Akashic watches every transaction against the whole graph: one resolved customer across products, real-time pattern recognition, and lineage on every alert.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Finance & Banking Sector — DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance & Banking Sector | DHIRA",
    description:
      "Akashic watches every transaction against the whole graph: one resolved customer across products.",
    images: ["/og-image.png"],
  },
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
      <PageMinimap sections={FINANCE_SECTIONS} aria-label="Finance page sections" />
    </>
  );
}
