import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import EisSkyBackground from "@/components/ui/EisSkyBackground";
import EisHero from "@/components/sections/eis/EisHero";
import EisGap from "@/components/sections/eis/EisGap";
import EisBrief from "@/components/sections/eis/EisBrief";
import EisLens from "@/components/sections/eis/EisLens";
import EisSpine from "@/components/sections/eis/EisSpine";
import EisProvenance from "@/components/sections/eis/EisProvenance";
import EisLoop from "@/components/sections/eis/EisLoop";
import EisIntegration from "@/components/sections/eis/EisIntegration";
import EisFoundation from "@/components/sections/eis/EisFoundation";
import EisClose from "@/components/sections/eis/EisClose";
import ProvenAtScale from "@/components/sections/ProvenAtScale";
import PageMinimap from "@/components/layout/PageMinimap";
import { EIS_SECTIONS } from "@/lib/eisSections";

export const metadata: Metadata = {
  title: "Akashic EIS Solution",
  description:
    "The executive layer of the Akashic platform. It reads the systems you already run, shows the working behind every figure, and turns an approved decision into an action your systems receive.",
  openGraph: {
    title: "Akashic EIS Solution | DHIRA",
    description:
      "The executive layer of the Akashic platform. Reads your systems, shows the working behind every figure, and turns an approved decision into an action your systems receive.",
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
      <EisSkyBackground>
        <main className="bg-transparent">
          <EisHero />
          <EisGap />
          <EisBrief />
          <EisLens />
          <EisSpine />
          <EisProvenance />
          <EisLoop />
          <EisIntegration />
          <EisFoundation />
          <ProvenAtScale
            id="proof"
            sectionNumber="09"
            eyebrowText="Proof at scale"
            title="The team that built this runs data platforms at national scale."
            description="Not pilots. Systems in production, on the public record. If a platform reconciles a country, it will reconcile your business units."
            dark={true}
          />
          <EisClose />
        </main>
      </EisSkyBackground>
      <Footer />
      <PageMinimap sections={EIS_SECTIONS} aria-label="EIS page sections" />
    </>
  );
}
