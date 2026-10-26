import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import BuiltOnAkashic from "@/components/sections/BuiltOnAkashic";
import CareersStrip from "@/components/sections/CareersStrip";
import Closure from "@/components/sections/Closure";
import EnterpriseSecurity from "@/components/sections/EnterpriseSecurity";
import EverySector from "@/components/sections/EverySector";
import Hero from "@/components/sections/Hero";
import HowWeDeliver from "@/components/sections/HowWeDeliver";
import MeetAkashic from "@/components/sections/MeetAkashic";
import ProblemSection from "@/components/sections/ProblemSection";
import ProvenAtScale from "@/components/sections/ProvenAtScale";
import TheProof from "@/components/sections/TheProof";
import Voices from "@/components/sections/Voices";
import { getCustomerStories, getPage, getRoles } from "@/lib/content";

/* The home page takes the site-wide title and description (app/layout.tsx);
   it sets only its canonical. */
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const [page, stories, roles] = await Promise.all([getPage("home"), getCustomerStories(), getRoles()]);
  return (
    <>
      <Nav />
      <main id="main" data-theme-page="home" className="bg-background">
        <Hero content={page.hero} />
        <ProblemSection content={page.problem} />
        <MeetAkashic content={page.platform} />
        {/* Keep the offer together before industry fit and deployment proof. */}
        <BuiltOnAkashic content={page.solutions} />
        <HowWeDeliver content={page.delivery} />
        <EverySector content={page.sectors} />
        {/* TheProof stays, by direction (23 Jul 2026): the one place on the
            page where the reader moves the seam and proves the thesis to
            themselves. Do not cut it again without asking. */}
        <TheProof content={page.proof} />
        <ProvenAtScale id="impact" aliases={["scale"]} content={page.scale} stories={stories} />
        <Voices content={page.voices} />
        <EnterpriseSecurity content={page.governance} />
        <Closure content={page.close} />
        <CareersStrip content={page.careers} roles={roles} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
