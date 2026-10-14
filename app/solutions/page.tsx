import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageMinimap from "@/components/layout/PageMinimap";
import SolutionsHero from "@/components/sections/solutions/SolutionsHero";
import SolutionsFeatured from "@/components/sections/solutions/SolutionsFeatured";
import SolutionsMore from "@/components/sections/solutions/SolutionsMore";
import SolutionsIndex from "@/components/sections/solutions/SolutionsIndex";
import SolutionsClose from "@/components/sections/solutions/SolutionsClose";
import { SOLUTIONS_HERO, SOLUTIONS_SECTIONS } from "@/lib/solutionsSections";

const description = `${SOLUTIONS_HERO.payoff} ${SOLUTIONS_HERO.lede}`;

export const metadata: Metadata = {
  title: "Solutions",
  description,
  openGraph: {
    title: "Solutions | DHIRA",
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Solutions built on Akashic" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions | DHIRA",
    description,
    images: ["/og-image.png"],
  },
};

export default function SolutionsPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <SolutionsHero />
        <SolutionsFeatured />
        <SolutionsMore />
        <SolutionsIndex />
        <SolutionsClose />
      </main>
      <Footer />
      <PageMinimap sections={SOLUTIONS_SECTIONS} aria-label="Solutions page sections" />
    </>
  );
}
