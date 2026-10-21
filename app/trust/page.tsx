import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import {
  TrustCompliance,
  TrustDisclosure,
  TrustDocuments,
  TrustPrivacy,
  TrustResponsibleAi,
  TrustSecurity,
  TrustSubprocessors,
} from "@/components/sections/trust/TrustSections";
import FaqSection from "@/components/ui/FaqSection";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("trust");
  return pageMetadata(seo);
}

export default async function TrustPage() {
  const page = await getPage("trust");
  const { hero, faq } = page;
  /* The hero's on-page index lists the numbered sections only. */
  const index = page.sections.filter((section) => !["hero", "talk-to-our-team"].includes(section.id));
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} index={index} />
        <TrustSecurity content={page.security} />
        <TrustPrivacy content={page.privacy} />
        <TrustResponsibleAi content={page.responsibleAi} />
        <TrustCompliance content={page.compliance} />
        <TrustDocuments content={page.documents} />
        <TrustSubprocessors content={page.subprocessors} />
        <TrustDisclosure content={page.disclosure} />
        <FaqSection num={faq.num} label={faq.label} setup={faq.setup} payoff={faq.payoff} items={faq.items} />
        <PageClose {...page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
