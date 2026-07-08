import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import EisHero from "@/components/sections/eis/EisHero";
import EisBrief from "@/components/sections/eis/EisBrief";
import EisProvenance from "@/components/sections/eis/EisProvenance";
import EisSpine from "@/components/sections/eis/EisSpine";
import EisAction from "@/components/sections/eis/EisAction";
import EisMoments from "@/components/sections/eis/EisMoments";
import EisIntegration from "@/components/sections/eis/EisIntegration";
import EisProof from "@/components/sections/eis/EisProof";
import EisClose from "@/components/sections/eis/EisClose";

export const metadata: Metadata = {
  title: "Akashic EIS — Your entire business. One screen. Right now.",
  description:
    "The executive intelligence system that writes your morning brief, traces every number to its source, and turns approved decisions into audited actions.",
};

export default function EisPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <EisHero />
        <EisBrief />
        <EisProvenance />
        <EisSpine />
        <EisAction />
        <EisMoments />
        <EisIntegration />
        <EisProof />
        <EisClose />
      </main>
      <Footer />
    </>
  );
}
