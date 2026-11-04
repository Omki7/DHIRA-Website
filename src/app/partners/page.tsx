import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { PageMinimap } from "@/shared/components/navigation";
import { PartnersBenefits, PartnersJoin, PartnersTypes } from "@/components/sections/partners/PartnersSections";
import { PageClose } from "@/shared/components/ui";
import { PageHero } from "@/shared/components/ui";
import { getPage, getUiStrings } from "@/services/content/content";
import { pageMetadata } from "@/app/_lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("partners");
  return pageMetadata(seo);
}

export default async function PartnersPage() {
  const page = await getPage("partners");
  const ui = await getUiStrings();
  const { hero } = page;
  const index = page.sections.filter((section) => section.id !== "hero");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero indexLabel={ui.onThisPage} label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} index={index} />
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
