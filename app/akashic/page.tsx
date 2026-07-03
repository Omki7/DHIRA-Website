import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AkashicHero from "@/components/sections/akashic/AkashicHero";
import AkashicFourMoves from "@/components/sections/akashic/AkashicFourMoves";
import AkashicModules from "@/components/sections/akashic/AkashicModules";
import AkashicArchitecture from "@/components/sections/akashic/AkashicArchitecture";
import AkashicModular from "@/components/sections/akashic/AkashicModular";
import AkashicTrust from "@/components/sections/akashic/AkashicTrust";
import AkashicOpenFoundations from "@/components/sections/akashic/AkashicOpenFoundations";
import AkashicSolutions from "@/components/sections/akashic/AkashicSolutions";
import AkashicScale from "@/components/sections/akashic/AkashicScale";
import AkashicClose from "@/components/sections/akashic/AkashicClose";

export const metadata: Metadata = {
  title: "Akashic — The platform behind every answer DHIRA gives.",
  description:
    "Wherever your data lives. One platform that keeps it current, connected, and ready the moment a decision needs it.",
};

export default function AkashicPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <AkashicHero />
        <AkashicFourMoves />
        <AkashicModules />
        <AkashicArchitecture />
        <AkashicModular />
        <AkashicTrust />
        <AkashicOpenFoundations />
        <AkashicSolutions />
        <AkashicScale />
        <AkashicClose />
      </main>
      <Footer />
    </>
  );
}
