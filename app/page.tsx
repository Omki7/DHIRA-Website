import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import PowerfulPlatform from "@/components/sections/PowerfulPlatform";
import ProvenAtScale from "@/components/sections/ProvenAtScale";
import HowWeDeliver from "@/components/sections/HowWeDeliver";
import EverySector from "@/components/sections/EverySector";
import TheProof from "@/components/sections/TheProof";
import Voices from "@/components/sections/Voices";
import EnterpriseSecurity from "@/components/sections/EnterpriseSecurity";
import JoinTheTeam from "@/components/sections/JoinTheTeam";
import Closure from "@/components/sections/Closure";
import PageMinimap from "@/components/layout/PageMinimap";
import { HOME_SECTIONS } from "@/lib/homeSections";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <Hero />
        <ProblemSection />
        <PowerfulPlatform />
        <ProvenAtScale />
        <HowWeDeliver />
        <EverySector />
        <TheProof />
        <Voices />
        <EnterpriseSecurity />
        <JoinTheTeam />
        <Closure />
      </main>
      <Footer />
      <PageMinimap sections={HOME_SECTIONS} aria-label="Homepage sections" />
    </>
  );
}
