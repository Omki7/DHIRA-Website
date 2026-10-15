import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import EisHero from "@/components/sections/eis/EisHero";
import EisGap from "@/components/sections/eis/EisGap";
import EisCapabilities from "@/components/sections/eis/EisCapabilities";
import EisOnePicture from "@/components/sections/eis/EisOnePicture";
import EisLoop from "@/components/sections/eis/EisLoop";
import EisLenses from "@/components/sections/eis/EisLenses";
import EisProof from "@/components/sections/eis/EisProof";
import EisFaq from "@/components/sections/eis/EisFaq";
import EisClose from "@/components/sections/eis/EisClose";
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
      <main id="main" className="bg-white">
        <EisHero />
        <EisGap />
        <EisCapabilities />
        <EisOnePicture />
        <EisLoop />
        <EisLenses />
        <EisProof />
        <EisFaq />
        <EisClose />
      </main>
      <Footer />
      <PageMinimap sections={EIS_SECTIONS} aria-label="EIS page sections" />
    </>
  );
}

