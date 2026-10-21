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
import EisOnePicture from "@/components/sections/eis/EisOnePicture";
import EisProof from "@/components/sections/eis/EisProof";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("solutions/eis");
  return pageMetadata(seo);
}

export default async function EisPage() {
  const page = await getPage("solutions/eis");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <EisHero content={page.hero} domains={page.domains} />
        <EisGap content={page.gap} />
        <EisCapabilities content={page.capabilities} />
        <EisOnePicture content={page.onePicture} domains={page.domains} />
        <EisLoop content={page.loop} />
        <EisLenses content={page.lenses} />
        <EisProof content={page.proof} />
        <EisFaq content={page.faq} />
        <EisClose content={page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
