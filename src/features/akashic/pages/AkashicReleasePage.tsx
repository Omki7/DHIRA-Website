import type { AkashicReleasePage as AkashicReleaseDocument } from "@/content/pages/akashic-release";
import type { UiStrings } from "@/content/ui";
import { absoluteUrl } from "@/config/site";
import { JsonLd } from "@/shared/components/data-display";
import { PageClose, PageHero } from "@/shared/components/ui";
import { LaunchCountdown } from "../components/LaunchCountdown";
import {
  ReleaseAvailable,
  ReleaseDeployments,
  ReleasePreview,
} from "../components/ReleaseSections";
import styles from "./AkashicReleasePage.module.scss";

export interface AkashicReleasePageProps {
  page: AkashicReleaseDocument;
  ui: UiStrings;
}

export function AkashicReleasePage({ page, ui }: AkashicReleasePageProps) {
  const { hero, release } = page;
  const index = page.sections.filter(
    (section) => !["hero", "talk-to-our-team"].includes(section.id),
  );

  return (
    <main id="main" className={styles.main}>
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
        indexLabel={ui.onThisPage}
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
  );
}
