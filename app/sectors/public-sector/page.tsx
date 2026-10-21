import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import PublicSectorChain from "@/components/sections/public-sector/PublicSectorChain";
import PublicSectorClose from "@/components/sections/public-sector/PublicSectorClose";
import PublicSectorDeploy from "@/components/sections/public-sector/PublicSectorDeploy";
import PublicSectorGap from "@/components/sections/public-sector/PublicSectorGap";
import PublicSectorHero from "@/components/sections/public-sector/PublicSectorHero";
import PublicSectorMoments from "@/components/sections/public-sector/PublicSectorMoments";
import PublicSectorProven from "@/components/sections/public-sector/PublicSectorProven";
import PublicSectorWhy from "@/components/sections/public-sector/PublicSectorWhy";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("sectors/public-sector");
  return pageMetadata(seo);
}

export default async function PublicSectorPage() {
  const page = await getPage("sectors/public-sector");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PublicSectorHero content={page.hero} />
        <PublicSectorGap content={page.gap} />
        <PublicSectorProven content={page.proven} />
        <PublicSectorMoments content={page.moments} />
        <PublicSectorWhy content={page.why} />
        <PublicSectorChain content={page.chain} />
        <PublicSectorDeploy content={page.deploy} />
        <PublicSectorClose content={page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
