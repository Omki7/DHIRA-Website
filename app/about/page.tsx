import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutWho from "@/components/sections/about/AboutWho";
import AboutWhatWeBuild from "@/components/sections/about/AboutWhatWeBuild";
import AboutPointOfView from "@/components/sections/about/AboutPointOfView";
import AboutVision from "@/components/sections/about/AboutVision";
import AboutJourney from "@/components/sections/about/AboutJourney";
import AboutPeople from "@/components/sections/about/AboutPeople";
import AboutClose from "@/components/sections/about/AboutClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { ABOUT_SECTIONS } from "@/lib/aboutSections";

export const metadata: Metadata = {
  title: "About Us | DHIRA",
  description:
    "We build things that last for Data and AI. Products, platforms, and engineering systems built for the real world.",
  openGraph: {
    title: "About Us | DHIRA",
    description:
      "We build things that last for Data and AI. Products, platforms, and engineering systems built for the real world.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | DHIRA",
    description:
      "We build things that last for Data and AI. Products, platforms, and engineering systems built for the real world.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <AboutHero />
        <AboutWho />
        <AboutWhatWeBuild />
        <AboutPointOfView />
        <AboutVision />
        <AboutJourney />
        <AboutPeople />
        <AboutClose />
      </main>
      <Footer />
      <PageMinimap sections={ABOUT_SECTIONS} aria-label="About page sections" />
    </>
  );
}
