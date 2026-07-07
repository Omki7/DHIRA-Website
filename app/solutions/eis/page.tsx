import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import EisHero from "@/components/sections/eis/EisHero";
import EisCost from "@/components/sections/eis/EisCost";
import EisMoments from "@/components/sections/eis/EisMoments";
import EisChain from "@/components/sections/eis/EisChain";
import EisCapabilities from "@/components/sections/eis/EisCapabilities";
import EisIntegration from "@/components/sections/eis/EisIntegration";
import EisProof from "@/components/sections/eis/EisProof";
import EisClose from "@/components/sections/eis/EisClose";

export const metadata: Metadata = {
  title: "Akashic EIS — Your entire business. One screen. Right now.",
  description:
    "A single live command centre for CEOs, CFOs, and business heads: finance, operations, sales, and strategy converging in real time. No waiting for reports.",
};

export default function EisPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <EisHero />
        <EisCost />
        <EisMoments />
        <EisChain />
        <EisCapabilities />
        <EisIntegration />
        <EisProof />
        <EisClose />
      </main>
      <Footer />
    </>
  );
}
