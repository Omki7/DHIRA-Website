import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import HealthcareHero from "@/components/sections/healthcare/HealthcareHero";
import HealthcareProblem from "@/components/sections/healthcare/HealthcareProblem";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import { SECTOR_PAGES } from "@/components/sections/sectors/sectorContent";

const content = SECTOR_PAGES.healthcare;

export const metadata: Metadata = {
  title: "Healthcare: Every patient deserves one record. Not seven.",
  description:
    "Akashic resolves fragmented hospital systems into one governed longitudinal patient record, with consent and audit built into the platform itself.",
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
    </>
  );
}
