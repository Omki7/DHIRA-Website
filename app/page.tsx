import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import MeetAkashic from "@/components/sections/MeetAkashic";
import ProvenAtScale from "@/components/sections/ProvenAtScale";
import HowWeDeliver from "@/components/sections/HowWeDeliver";
import EverySector from "@/components/sections/EverySector";
import TheProof from "@/components/sections/TheProof";
import Voices from "@/components/sections/Voices";
import EnterpriseSecurity from "@/components/sections/EnterpriseSecurity";
import CareersStrip from "@/components/sections/CareersStrip";
import Closure from "@/components/sections/Closure";
import PageMinimap from "@/components/layout/PageMinimap";
import { HOME_DELIVERY, HOME_SECTIONS } from "@/lib/homeSections";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" data-theme-page="home" className="bg-background">
        <Hero />
        <ProblemSection />
        <MeetAkashic />
        <ProvenAtScale bridge={HOME_DELIVERY.bridge} />
        <HowWeDeliver />
        <EverySector />
        {/* TheProof stays, by direction (23 Jul 2026). It was cut for one
            afternoon as the page's third telling of a single argument — [01]
            says your systems disagree, [02] says we unify them, this says
            before/after — and put back because that repetition is the point:
            it is VISUAL reaffirmation, not a new claim. [01] argues it in a
            ledger, [02] in product UI, and this lets the reader move the seam
            themselves, which is the only place on the page where they prove it
            to themselves rather than being told. Its height is trimmed instead
            (see TheProof.tsx). Do not cut it again without asking. */}
        <TheProof />
        <Voices />
        <EnterpriseSecurity />
        <CareersStrip />
        <Closure />
      </main>
      <Footer />
      <PageMinimap sections={HOME_SECTIONS} aria-label="Homepage sections" />
    </>
  );
}
