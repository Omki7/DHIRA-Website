import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersImpact from "@/components/sections/careers/CareersImpact";
import CareersCulture from "@/components/sections/careers/CareersCulture";
import CareersRoles from "@/components/sections/careers/CareersRoles";
import CareersHiring from "@/components/sections/careers/CareersHiring";
import CareersClose from "@/components/sections/careers/CareersClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { CAREERS_SECTIONS } from "@/lib/careersSections";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "We are a small team that ships. Our work runs inside national platforms, touches millions of people, and lasts beyond any single budget cycle.",
  openGraph: {
    title: "Careers | DHIRA",
    description:
      "We are a small team that ships. Join engineers building production systems at national scale.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Careers at DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | DHIRA",
    description:
      "Join us in building India's intelligence layer.",
    images: ["/og-image.png"],
  },
};

export default function CareersPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <CareersHero />
        <CareersImpact />
        <CareersCulture />
        <CareersRoles />
        <CareersHiring />
        <CareersClose />
      </main>
      <Footer />
      <PageMinimap sections={CAREERS_SECTIONS} aria-label="Careers page sections" />
    </>
  );
}
