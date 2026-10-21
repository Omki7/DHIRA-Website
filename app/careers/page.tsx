import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import CareersClose from "@/components/sections/careers/CareersClose";
import CareersCulture from "@/components/sections/careers/CareersCulture";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersHiring from "@/components/sections/careers/CareersHiring";
import CareersImpact from "@/components/sections/careers/CareersImpact";
import CareersRoles from "@/components/sections/careers/CareersRoles";
import { getPage, getRoles } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("careers");
  return pageMetadata(seo);
}

export default async function CareersPage() {
  const [page, roles] = await Promise.all([getPage("careers"), getRoles()]);
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <CareersHero content={page.hero} roles={roles} />
        <CareersImpact content={page.work} />
        <CareersCulture content={page.culture} />
        <CareersRoles content={page.roles} roles={roles} />
        <CareersHiring content={page.hiring} />
        <CareersClose content={page.close} roles={roles} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
