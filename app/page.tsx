import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PowerfulPlatform from "@/components/PowerfulPlatform";
import ProblemSection from "@/components/ProblemSection";
import ProvenAtScale from "@/components/ProvenAtScale";
import HowWeDeliver from "@/components/HowWeDeliver";
import EverySector from "@/components/EverySector";
import TheProof from "@/components/TheProof";
import Voices from "@/components/Voices";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-paper">
        <Hero />
        <ProblemSection />
        <PowerfulPlatform />
        <ProvenAtScale />
        <HowWeDeliver />
        <EverySector />
        <TheProof />
        <Voices />
      </main>
      <Footer />
    </>
  );
}
