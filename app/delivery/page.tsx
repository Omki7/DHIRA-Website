import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import ProvenAtScale from "@/components/sections/ProvenAtScale";
import DeliveryCapabilities from "@/components/sections/delivery/DeliveryCapabilities";
import DeliveryClose from "@/components/sections/delivery/DeliveryClose";
import DeliveryFAQ from "@/components/sections/delivery/DeliveryFAQ";
import DeliveryFit from "@/components/sections/delivery/DeliveryFit";
import DeliveryHero from "@/components/sections/delivery/DeliveryHero";
import DeliveryMethodology from "@/components/sections/delivery/DeliveryMethodology";
import DeliveryModels from "@/components/sections/delivery/DeliveryModels";
import DeliveryServices from "@/components/sections/delivery/DeliveryServices";
import { getCustomerStories, getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("delivery");
  return pageMetadata(seo);
}

export default async function DeliveryPage() {
  const [page, stories] = await Promise.all([getPage("delivery"), getCustomerStories()]);
  return (
    <>
      <Nav />
      <main id="main" data-theme-page="services" className="bg-background">
        <DeliveryHero content={page.hero} />
        <DeliveryServices content={page.services} />
        <DeliveryModels content={page.models} />
        <DeliveryCapabilities content={page.capabilities} />
        <DeliveryMethodology content={page.methodology} />
        <ProvenAtScale id="proven-at-scale" content={page.proven} stories={stories} link={page.proven.link} />
        <DeliveryFit content={page.fit} />
        <DeliveryFAQ content={page.faq} />
        <DeliveryClose content={page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
