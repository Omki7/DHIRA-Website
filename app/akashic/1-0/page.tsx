import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import PageMinimap from "@/components/layout/PageMinimap";
import LaunchCountdown from "@/components/sections/release/LaunchCountdown";
import { ReleaseAvailable, ReleaseDeployments, ReleasePreview } from "@/components/sections/release/ReleaseSections";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("akashic/1-0");
  return pageMetadata(seo);
}

/* The hero carries the launch countdown; the page carries
   SoftwareApplication structured data for the release. */
export default async function AkashicReleasePage() {
  const page = await getPage("akashic/1-0");
  const { hero, release } = page;
  const index = page.sections.filter((section) => !["hero", "talk-to-our-team"].includes(section.id));
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <JsonLd
          data={{
            "@type": "SoftwareApplication",
            name: "Akashic",
            softwareVersion: release.version,
            datePublished: release.launchAt.slice(0, 10),
            applicationCategory: "BusinessApplication",
            operatingSystem: release.operatingSystem,
            featureList: page.available.modules.map((module) => module.name),
            url: absoluteUrl("/akashic"),
          }}
        />
        <PageHero
          label={hero.label}
          setup={hero.setup}
          payoff={hero.payoff}
          lede={hero.lede}
          meta={<LaunchCountdown launchAt={release.launchAt} content={page.countdown} />}
          index={index}
        />
        <ReleaseAvailable content={page.available} />
        <ReleasePreview content={page.preview} />
        <ReleaseDeployments content={page.deployments} />
        <PageClose {...page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
