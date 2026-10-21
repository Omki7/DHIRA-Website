import "@/components/sections/about/about-page.css";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import AboutClose from "@/components/sections/about/AboutClose";
import AboutConviction from "@/components/sections/about/AboutConviction";
import AboutCulture from "@/components/sections/about/AboutCulture";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutJourney from "@/components/sections/about/AboutJourney";
import AboutMotion from "@/components/sections/about/AboutMotion";
import AboutPeople from "@/components/sections/about/AboutPeople";
import AboutVision from "@/components/sections/about/AboutVision";
import { getLeaders, getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("about");
  return pageMetadata(seo);
}

export default async function AboutPage() {
  const [page, leaders] = await Promise.all([getPage("about"), getLeaders()]);
  return (
    <AboutMotion>
      <Nav />
      <main id="main" data-theme-page="company">
        <AboutHero content={page.hero} />
        <AboutConviction content={page.conviction} />
        <AboutJourney content={page.journey} />
        <AboutVision content={page.vision} />
        <AboutPeople content={page.people} leaders={leaders} />
        <AboutCulture content={page.culture} />
        <AboutClose content={page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </AboutMotion>
  );
}
