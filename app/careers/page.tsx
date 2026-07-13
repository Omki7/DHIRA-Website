import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersImpact from "@/components/sections/careers/CareersImpact";
import CareersCulture from "@/components/sections/careers/CareersCulture";
import CareersRoles from "@/components/sections/careers/CareersRoles";
import CareersHiring from "@/components/sections/careers/CareersHiring";
import CareersClose from "@/components/sections/careers/CareersClose";

export const metadata: Metadata = {
  title: "Careers — Join us in building India's intelligence layer.",
  description:
    "We are a small team that ships. Our work runs inside national platforms, touches millions of people, and lasts beyond any single budget cycle.",
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
    </>
  );
}
