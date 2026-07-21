import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import EducationHero from "@/components/sections/education/EducationHero";
import EducationJourney from "@/components/sections/education/EducationJourney";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorClose from "@/components/sections/sectors/SectorClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { EDUCATION_SECTIONS } from "@/lib/educationSections";
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
        <EducationHero />
        <EducationJourney />
        <SectorMap slug="education" />
        <SectorSolution content={content} />
        <SectorOutcomes content={content} />
        <SectorClose content={content} />
      </main>
      <Footer />
      <PageMinimap sections={EDUCATION_SECTIONS} aria-label="Education page sections" />
    </>
  );
}
