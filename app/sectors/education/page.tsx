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
  title: "Education Sector",
  description:
    "The intelligence layer inside national learning platforms, deployed for institutions: one governed learner record from enrolment to placement.",
  openGraph: {
    title: "Education Sector | DHIRA",
    description:
      "The intelligence layer inside national learning platforms: one governed learner record from enrolment to placement.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Education Sector — DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Sector | DHIRA",
    description:
      "Connected systems for educational institutions and national learning platforms.",
    images: ["/og-image.png"],
  },
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
