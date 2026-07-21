import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutWhy from "@/components/sections/about/AboutWhy";
import AboutWho from "@/components/sections/about/AboutWho";
import AboutBeliefs from "@/components/sections/about/AboutBeliefs";
import AboutHow from "@/components/sections/about/AboutHow";
import AboutCareers from "@/components/sections/about/AboutCareers";
import ProvenAtScale from "@/components/sections/ProvenAtScale";
import AboutClose from "@/components/sections/about/AboutClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { ABOUT_SECTIONS } from "@/lib/aboutSections";

export const metadata: Metadata = {
  title: "About — Technology that outlasts the budget cycle.",
  description:
    "A small team of engineers and product builders who believe technology should outlast the budget cycle that funded it.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <AboutHero />
        <AboutWhy />
        <AboutWho />
        <AboutBeliefs />
        <AboutHow />
        <AboutCareers />
        <ProvenAtScale id="proof" sectionNumber="06" eyebrowText="Proof" />
        <AboutClose />
      </main>
      <Footer />
      <PageMinimap sections={ABOUT_SECTIONS} aria-label="About page sections" />
    </>
  );
}
