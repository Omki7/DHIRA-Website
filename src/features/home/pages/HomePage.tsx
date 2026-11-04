import type { Story } from "@/content/collections/customer-stories";
import type { Role } from "@/content/collections/roles";
import type { HomePage as HomeDocument } from "@/content/pages/home";
import { ProvenAtScale } from "@/features/proof";
import { RegionOnly } from "@/shared/components/ui";
import { BuiltOnAkashic } from "../components/BuiltOnAkashic";
import { CareersStrip } from "../components/CareersStrip";
import { Closure } from "../components/Closure";
import { EnterpriseSecurity } from "../components/EnterpriseSecurity";
import { EverySector } from "../components/EverySector";
import { Hero } from "../components/Hero";
import { HowWeDeliver } from "../components/HowWeDeliver";
import { MeetAkashic } from "../components/MeetAkashic";
import { ProblemSection } from "../components/ProblemSection";
import { TheProof } from "../components/TheProof";
import { Voices } from "../components/Voices";
import styles from "./HomePage.module.scss";

export interface HomePageProps {
  page: HomeDocument;
  stories: Story[];
  roles: Role[];
}

/* The home page body: the sections in order (docs/ARCHITECTURE.md, Home
   map). The route (src/app/page.tsx) loads the content and renders this. */
export function HomePage({ page, stories, roles }: HomePageProps) {
  return (
    <main id="main" data-theme-page="home" className={styles.main}>
      <Hero content={page.hero} />
      <ProblemSection content={page.problem} />
      <MeetAkashic content={page.platform} />
      {/* Keep the offer together before industry fit and deployment proof. */}
      <BuiltOnAkashic content={page.solutions} />
      <HowWeDeliver content={page.delivery} />
      <EverySector content={page.sectors} />
      {/* TheProof stays, by direction (23 Jul 2026): the one place on the
          page where the reader moves the seam and proves the thesis to
          themselves. Do not cut it again without asking. */}
      <TheProof content={page.proof} />
      <ProvenAtScale id="impact" aliases={["scale"]} content={page.scale} stories={stories} />
      <Voices content={page.voices} />
      <EnterpriseSecurity content={page.governance} />
      <Closure content={page.close} />
      {/* India only (content/pages/home.ts `careers.audience`). */}
      <RegionOnly region={page.careers.audience}>
        <CareersStrip content={page.careers} roles={roles} />
      </RegionOnly>
    </main>
  );
}
