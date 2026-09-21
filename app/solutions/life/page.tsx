import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LifeHero from "@/components/sections/life/LifeHero";
import LifeGap from "@/components/sections/life/LifeGap";
import LifeSolution from "@/components/sections/life/LifeSolution";
import LifeBenefits from "@/components/sections/life/LifeBenefits";
import LifeRecord from "@/components/sections/life/LifeRecord";
import LifeAltitude from "@/components/sections/life/LifeAltitude";
import LifeRecordOfWork from "@/components/sections/life/LifeRecordOfWork";
import LifeBuilt from "@/components/sections/life/LifeBuilt";
import LifeStake from "@/components/sections/life/LifeStake";
import LifeClose from "@/components/sections/life/LifeClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { LIFE_SECTIONS } from "@/lib/lifeSections";

export const metadata: Metadata = {
  title: "Akashic Life Solution",
  description:
    "The intelligence layer for care that cannot wait: specialist-grade risk detection on a frontline worker's handset, offline, carried all the way to a national dashboard.",
  openGraph: {
    title: "Akashic Life Solution | DHIRA",
    description:
      "The intelligence layer for care that cannot wait: specialist-grade risk detection on a frontline worker's handset, offline, carried all the way to a national dashboard.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Akashic Life Solution — DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akashic Life Solution | DHIRA",
    description: "Specialist-grade risk detection at the remote edge, offline.",
    images: ["/og-image.png"],
  },
};

/* Ground rhythm, deliberate: dark, white, dark, dark, light, light, dark,
   light, white, dark. The page never spends more than two sections in one
   register.
   A quote band sat at [07] and was removed 23 Jul 2026: its only attribution
   was "from a customer platform review", and an unnamed testimonial is not a
   claim this page can make for a product that is not sold yet. An unsourced
   pull-quote would have been worse than none. Do not reinstate it without a
   named, printable source. */
export default function LifePage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <LifeHero />
        <LifeGap />
        <LifeSolution />
        <LifeBenefits />
        <LifeRecord />
        <LifeAltitude />
        <LifeRecordOfWork />
        <LifeBuilt />
        <LifeStake />
        <LifeClose />
      </main>
      <Footer />
      <PageMinimap sections={LIFE_SECTIONS} aria-label="Life page sections" />
    </>
  );
}
