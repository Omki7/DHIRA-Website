import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LifeHero from "@/components/sections/life/LifeHero";
import LifeGap from "@/components/sections/life/LifeGap";
import LifeOffline from "@/components/sections/life/LifeOffline";
import LifeStory from "@/components/sections/life/LifeStory";
import LifeChain from "@/components/sections/life/LifeChain";
import LifeBuilt from "@/components/sections/life/LifeBuilt";
import LifeProof from "@/components/sections/life/LifeProof";
import LifeClose from "@/components/sections/life/LifeClose";

export const metadata: Metadata = {
  title: "Akashic Life — AI where it matters most.",
  description:
    "Specialist-grade diagnostics at the remote edge: predicting high-risk pregnancies in seconds, even without the internet. Built on the platform behind India's national health data systems.",
};

export default function LifePage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <LifeHero />
        <LifeGap />
        <LifeOffline />
        <LifeStory />
        <LifeChain />
        <LifeBuilt />
        <LifeProof />
        <LifeClose />
      </main>
      <Footer />
    </>
  );
}
