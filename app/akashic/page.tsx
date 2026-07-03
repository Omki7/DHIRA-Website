import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AkashicHero from "@/components/sections/akashic/AkashicHero";
import AkashicFourMoves from "@/components/sections/akashic/AkashicFourMoves";
import AkashicModules from "@/components/sections/akashic/AkashicModules";

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
      </main>
      <Footer />
    </>
  );
}
