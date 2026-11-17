"use client";

/**
 * SIMULATED PRODUCT UI: the small fragments around the homepage pitch.
 *
 * Refined 22 Oct 2026 (user: "more elegant for 2026 platform UI standards and
 * a little smaller"). The grammar, so the next edit keeps it:
 *   1. One shell for every fragment (HomeHeroTeasersMockup): hairline
 *      border, one surface, a sentence-case label naming the fragment.
 *   2. One type scale: a 28px figure in tabular numerals, 12px body, 10px
 *      data annotations. The cited answer is a 17px focal result; nothing
 *      competes with the headline beside it.
 *   3. Hairline drawings in ink and one blue. Colour only marks a source
 *      system or the single thing that matters (the selected row, the lead).
 *   4. No icon tiles, no chunky bars, no badges stacked on badges.
 *   5. Figures come from the one demo world ($25.4 million net revenue up
 *      6.4%, 98% of plan, 82,401 orders, 214 locations, Online up 18% to 22%
 *      of revenue, about 12,400 units next quarter, $308 per order).
 *      Parties are named by what they are, never invented brands.
 *
 * The drawings live beside this file: ChartTeasers (the figure-led cards:
 * Business Intelligence, Machine Learning, Warehouse), FlowTeasers (Master
 * Data, Governance, Ask Akashic, Data Pipelines) and OfferingTeasers (six
 * solutions and six services). Each offering in home.ts picks six; the
 * hero shows one offering's six at a time, three each side of the headline.
 */
import type { ReactNode } from "react";
import type { HomeHeroModuleKind } from "@/content/pages/home";
import { BusinessIntelligenceTeaser, ForecastTeaser, WarehouseTeaser } from "./ChartTeasers";
import { AskTeaser, GovernanceTeaser, MasterDataTeaser, PipelinesTeaser } from "./FlowTeasers";
import {
  AiReviewTeaser,
  ChurnTeaser,
  ClaimsTeaser,
  CloudTeaser,
  DemandTeaser,
  EmbeddedTeaser,
  EngineeringTeaser,
  EnterpriseIntelligenceTeaser,
  LifeTeaser,
  ManagedTeaser,
  ProcurementTeaser,
  RoadmapTeaser,
} from "./OfferingTeasers";

const DRAWINGS: Record<HomeHeroModuleKind, () => ReactNode> = {
  "master-data": MasterDataTeaser,
  bi: BusinessIntelligenceTeaser,
  governance: GovernanceTeaser,
  ask: AskTeaser,
  pipelines: PipelinesTeaser,
  ml: ForecastTeaser,
  warehouse: WarehouseTeaser,
  "enterprise-intelligence": EnterpriseIntelligenceTeaser,
  procurement: ProcurementTeaser,
  life: LifeTeaser,
  demand: DemandTeaser,
  churn: ChurnTeaser,
  claims: ClaimsTeaser,
  roadmap: RoadmapTeaser,
  engineering: EngineeringTeaser,
  "ai-review": AiReviewTeaser,
  embedded: EmbeddedTeaser,
  cloud: CloudTeaser,
  managed: ManagedTeaser,
};

export interface HomeModuleIllustrationsMockupProps {
  kind: HomeHeroModuleKind;
}

export function HomeModuleIllustrationsMockup({ kind }: HomeModuleIllustrationsMockupProps) {
  const Draw = DRAWINGS[kind];
  return <Draw />;
}
