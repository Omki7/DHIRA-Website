import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import SolutionsClose from "@/components/sections/solutions/SolutionsClose";
import SolutionsFeatured from "@/components/sections/solutions/SolutionsFeatured";
import SolutionsHero from "@/components/sections/solutions/SolutionsHero";
import SolutionsIndex from "@/components/sections/solutions/SolutionsIndex";
import SolutionsMore from "@/components/sections/solutions/SolutionsMore";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("solutions");
  return pageMetadata(seo);
}

export default async function SolutionsPage() {
  const page = await getPage("solutions");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <SolutionsHero content={page.hero} sections={page.sections} />
        <SolutionsFeatured content={page.featured} />
        <SolutionsMore content={page.more} />
        <SolutionsIndex content={page.index} featured={page.featured.items} more={page.more.items} />
        <SolutionsClose content={page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
