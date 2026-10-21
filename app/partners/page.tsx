import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import { PartnersBenefits, PartnersJoin, PartnersTypes } from "@/components/sections/partners/PartnersSections";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("partners");
  return pageMetadata(seo);
}

export default async function PartnersPage() {
  const page = await getPage("partners");
  const { hero } = page;
  const index = page.sections.filter((section) => section.id !== "hero");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} index={index} />
        <PartnersTypes content={page.types} />
        <PartnersBenefits content={page.benefits} />
        <PartnersJoin content={page.join} />
        <PageClose {...page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
