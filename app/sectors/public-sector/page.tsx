import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PublicSectorHero from "@/components/sections/public-sector/PublicSectorHero";
import PublicSectorGap from "@/components/sections/public-sector/PublicSectorGap";
import PublicSectorProven from "@/components/sections/public-sector/PublicSectorProven";
import PublicSectorMoments from "@/components/sections/public-sector/PublicSectorMoments";
import PublicSectorWhy from "@/components/sections/public-sector/PublicSectorWhy";
import PublicSectorChain from "@/components/sections/public-sector/PublicSectorChain";
import PublicSectorDeploy from "@/components/sections/public-sector/PublicSectorDeploy";
import PublicSectorClose from "@/components/sections/public-sector/PublicSectorClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { PUBLIC_SECTOR_SECTIONS } from "@/lib/publicSectorSections";

export const metadata: Metadata = {
  title: "Public Sector — We don't pitch government. We've already built for it.",
  description:
    "Akashic already powers India's largest public digital infrastructure: CoWIN, DIKSHA, eMigrate, and Poshan Tracker. Real citizens, real scale, public-record numbers.",
};

export default function PublicSectorPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <PublicSectorHero />
        <PublicSectorGap />
        <PublicSectorProven />
        <PublicSectorMoments />
        <PublicSectorWhy />
        <PublicSectorChain />
        <PublicSectorDeploy />
        <PublicSectorClose />
      </main>
      <Footer />
      <PageMinimap sections={PUBLIC_SECTOR_SECTIONS} aria-label="Public Sector page sections" />
    </>
  );
}
