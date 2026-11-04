import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { PageMinimap } from "@/shared/components/navigation";
import LifeAltitude from "@/components/sections/life/LifeAltitude";
import LifeBenefits from "@/components/sections/life/LifeBenefits";
import LifeBuilt from "@/components/sections/life/LifeBuilt";
import LifeClose from "@/components/sections/life/LifeClose";
import LifeGap from "@/components/sections/life/LifeGap";
import LifeHero from "@/components/sections/life/LifeHero";
import LifeRecord from "@/components/sections/life/LifeRecord";
import LifeRecordOfWork from "@/components/sections/life/LifeRecordOfWork";
import LifeSolution from "@/components/sections/life/LifeSolution";
import LifeStake from "@/components/sections/life/LifeStake";
import { getPage } from "@/services/content/content";
import { pageMetadata } from "@/app/_lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("solutions/life");
  return pageMetadata(seo);
}

export default async function LifePage() {
  const page = await getPage("solutions/life");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <LifeHero content={page.hero} />
        <LifeGap content={page.gap} />
        <LifeSolution content={page.solution} />
        <LifeBenefits content={page.benefits} />
        <LifeRecord content={page.record} />
        <LifeAltitude content={page.altitude} />
        <LifeRecordOfWork content={page.recordOfWork} />
        <LifeBuilt content={page.built} />
        <LifeStake content={page.stake} />
        <LifeClose content={page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
