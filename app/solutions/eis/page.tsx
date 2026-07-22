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
import PageMinimap from "@/components/layout/PageMinimap";
import { EIS_SECTIONS } from "@/lib/eisSections";

export const metadata: Metadata = {
  title: "Akashic EIS Solution",
  description:
    "The executive intelligence system that writes your morning brief, traces every number to its source, and turns approved decisions into audited actions.",
  openGraph: {
    title: "Akashic EIS Solution | DHIRA",
    description:
      "The executive intelligence system that writes your morning brief and traces every number to its source.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Akashic EIS Solution — DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akashic EIS Solution | DHIRA",
    description:
      "Executive intelligence on a governed Akashic foundation.",
    images: ["/og-image.png"],
  },
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
      <PageMinimap sections={EIS_SECTIONS} aria-label="EIS page sections" />
    </>
  );
}
