import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import EisCapabilities from "@/components/sections/eis/EisCapabilities";
import EisClose from "@/components/sections/eis/EisClose";
import EisFaq from "@/components/sections/eis/EisFaq";
import EisGap from "@/components/sections/eis/EisGap";
import EisHero from "@/components/sections/eis/EisHero";
import EisLenses from "@/components/sections/eis/EisLenses";
import EisLoop from "@/components/sections/eis/EisLoop";
import EisProof from "@/components/sections/eis/EisProof";
import EisTeasers from "@/components/sections/eis/EisTeasers";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("solutions/enterprise-intelligence");
  return pageMetadata(seo);
}

export default async function EisPage() {
  const page = await getPage("solutions/enterprise-intelligence");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <EisHero content={page.hero} />
        <EisLenses content={page.lenses} />
        <EisGap content={page.gap} />
        {page.teasers && <EisTeasers content={page.teasers} />}
        <EisCapabilities content={page.capabilities} />
        <EisLoop content={page.loop} />
        <EisProof content={page.proof} />
        <EisFaq content={page.faq} />
        <EisClose content={page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
