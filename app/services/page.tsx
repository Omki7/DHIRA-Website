import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import ProvenAtScale from "@/components/sections/ProvenAtScale";
import ServicesCapabilities from "@/components/sections/services/ServicesCapabilities";
import ServicesClose from "@/components/sections/services/ServicesClose";
import ServicesFAQ from "@/components/sections/services/ServicesFAQ";
import ServicesFit from "@/components/sections/services/ServicesFit";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesMethodology from "@/components/sections/services/ServicesMethodology";
import ServicesModels from "@/components/sections/services/ServicesModels";
import ServicesLines from "@/components/sections/services/ServicesLines";
import { getCustomerStories, getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("services");
  return pageMetadata(seo);
}

export default async function ServicesPage() {
  const [page, stories] = await Promise.all([getPage("services"), getCustomerStories()]);
  return (
    <>
      <Nav />
      <main id="main" data-theme-page="services" className="bg-background">
        <ServicesHero content={page.hero} />
        <ServicesLines content={page.services} />
        <ServicesModels content={page.models} />
        <ServicesCapabilities content={page.capabilities} />
        <ServicesMethodology content={page.methodology} />
        <ProvenAtScale id="proven-at-scale" content={page.proven} stories={stories} link={page.proven.link} />
        <ServicesFit content={page.fit} />
        <ServicesFAQ content={page.faq} />
        <ServicesClose content={page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
