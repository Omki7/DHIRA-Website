import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import HowItConnects from "@/components/sections/integrations/HowItConnects";
import IntegrationsDirectory from "@/components/sections/integrations/IntegrationsDirectory";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { getIntegrations, getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("integrations");
  return pageMetadata(seo);
}

export default async function IntegrationsPage() {
  const [page, categories] = await Promise.all([getPage("integrations"), getIntegrations()]);
  const { hero } = page;
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} meta={hero.facts.join("  ·  ")} />
        <IntegrationsDirectory content={page.directory} categories={categories} />
        <HowItConnects content={page.howItConnects} />
        <PageClose {...page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
