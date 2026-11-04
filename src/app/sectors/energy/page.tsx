import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { PageMinimap } from "@/shared/components/navigation";
import EnergyHero from "@/components/sections/energy/EnergyHero";
import EnergySignal from "@/components/sections/energy/EnergySignal";
import SectorClose from "@/components/sections/sectors/SectorClose";
import SectorMap from "@/components/sections/sectors/SectorMap";
import SectorOutcomes from "@/components/sections/sectors/SectorOutcomes";
import SectorSolution from "@/components/sections/sectors/SectorSolution";
import { getSector } from "@/services/content/content";
import { pageMetadata } from "@/app/_lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getSector("energy");
  return pageMetadata(content.seo);
}

export default async function EnergyPage() {
  const { content, map, template, sections } = await getSector("energy");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <EnergyHero content={content} template={template} />
        <EnergySignal content={content} template={template.problem} />
        <SectorMap scene={map} touchline={content.touchline} template={template.map} />
        <SectorSolution content={content} template={template.solution} />
        <SectorOutcomes content={content} template={template.outcomes} />
        <SectorClose content={content} template={template.close} />
      </main>
      <Footer />
      <PageMinimap sections={sections} aria-label={content.sectionsLabel} />
    </>
  );
}
