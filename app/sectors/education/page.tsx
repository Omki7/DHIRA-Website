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

const content = SECTOR_PAGES.education;

export const metadata: Metadata = {
  title: "Education — Every learner. One connected journey.",
  description:
    "The intelligence layer inside India's national learning platform, deployed for institutions: one governed learner record from enrolment to placement.",
};

export default function EducationPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <SectorHero content={content} />
        <SectorProblem content={content} />
        <SectorMap slug="education" />
        <SectorSolution content={content} />
        <SectorOutcomes content={content} />
        <SectorClose content={content} />
      </main>
      <Footer />
    </>
  );
}
