import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import HealthcareHero from "@/components/sections/healthcare/HealthcareHero";
import HealthcareProblem from "@/components/sections/healthcare/HealthcareProblem";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { HEALTHCARE_SECTIONS } from "@/lib/healthcareSections";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const content = SECTOR_PAGES.healthcare;

export const metadata: Metadata = {
  title: "Healthcare Sector",
  description:
    "Akashic resolves fragmented hospital systems into one governed longitudinal patient record, with consent and audit built into the platform itself.",
  openGraph: {
    title: "Healthcare Sector | DHIRA",
    description:
      "Akashic resolves fragmented hospital systems into one governed longitudinal patient record.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Healthcare Sector — DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Sector | DHIRA",
    description:
      "One governed longitudinal patient record across fragmented health systems.",
    images: ["/og-image.png"],
  },
};

export default function HealthcarePage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <HealthcareHero content={content} />
        <HealthcareProblem content={content} />
        <SectorMap slug="healthcare" />
        <SectorSolution content={content} />
        <SectorOutcomes content={content} />
        <SectorClose content={content} />
      </main>
      <Footer />
      <PageMinimap sections={HEALTHCARE_SECTIONS} aria-label="Healthcare page sections" />
    </>
  );
}
