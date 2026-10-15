import "@/components/sections/about/about-page.css";
import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutConviction from "@/components/sections/about/AboutConviction";
import AboutVision from "@/components/sections/about/AboutVision";
import AboutJourney from "@/components/sections/about/AboutJourney";
import AboutPeople from "@/components/sections/about/AboutPeople";
import AboutCulture from "@/components/sections/about/AboutCulture";
import AboutClose from "@/components/sections/about/AboutClose";
import AboutMotion from "@/components/sections/about/AboutMotion";
import PageMinimap from "@/components/layout/PageMinimap";
import { ABOUT_HERO, ABOUT_SECTIONS } from "@/lib/aboutSections";

export const metadata: Metadata = {
  title: "About Us | DHIRA",
  description:
    `${ABOUT_HERO.setup} ${ABOUT_HERO.headline} ${ABOUT_HERO.description}`,
  openGraph: {
    title: "About Us | DHIRA",
    description:
      `${ABOUT_HERO.setup} ${ABOUT_HERO.headline} ${ABOUT_HERO.description}`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | DHIRA",
    description:
      `${ABOUT_HERO.setup} ${ABOUT_HERO.headline} ${ABOUT_HERO.description}`,
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <AboutMotion>
      <Nav />
      <main id="main" data-theme-page="company">
        <AboutHero />
        <AboutConviction />
        <AboutJourney />
        <AboutVision />
        <AboutPeople />
        <AboutCulture />
        <AboutClose />
      </main>
      <Footer />
      <PageMinimap sections={ABOUT_SECTIONS} aria-label="About page sections" />
    </AboutMotion>
  );
}
