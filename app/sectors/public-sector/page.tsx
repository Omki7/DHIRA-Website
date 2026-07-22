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
  title: "Public Sector",
  description:
    "Akashic powers national-scale public digital infrastructure with real citizens, real scale, and audited public records.",
  openGraph: {
    title: "Public Sector | DHIRA",
    description:
      "Akashic powers national-scale public digital infrastructure.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Public Sector — DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Public Sector | DHIRA",
    description:
      "National-scale public digital infrastructure powered by Akashic.",
    images: ["/og-image.png"],
  },
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
