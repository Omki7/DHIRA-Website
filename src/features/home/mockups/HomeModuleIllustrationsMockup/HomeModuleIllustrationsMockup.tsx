"use client";

/**
 * SIMULATED PRODUCT UI: the small product fragments around the homepage pitch.
 *
 * Refined 22 Oct 2026 (user: "more elegant for 2026 platform UI standards and
 * a little smaller"). The grammar, so the next edit keeps it:
 *   1. One shell for all seven (HomeHeroTeasersMockup): hairline border, one
 *      surface, a mono header row naming the module and one live detail.
 *   2. One type scale: a 24px figure in tabular numerals, 12px body, 9.5px
 *      mono labels. Nothing competes with the headline beside it.
 *   3. Hairline drawings in ink and one blue. Colour only marks a source
 *      system or the single thing that matters (the selected row, the lead).
 *   4. No icon tiles, no chunky bars, no badges stacked on badges.
 *   5. Figures come from the one demo world ($25.4 million net revenue up
 *      6.4%, 98% of plan, 82,401 orders, 214 locations, Online up 18% to 22%
 *      of revenue, about 12,400 units next quarter, $308 per order).
 *      Parties are named by what they are, never invented brands.
 *
 * The seven drawings live beside this file: ChartTeasers (the figure-led
 * cards: BI, Machine Learning, Warehouse) and FlowTeasers (Master Data,
 * Governance, Ask Akashic, Data Pipelines).
 */
import type { ReactNode } from "react";
import type { HomeHeroModuleKind } from "@/content/pages/home";
import { BusinessIntelligenceTeaser, ForecastTeaser, WarehouseTeaser } from "./ChartTeasers";
import { AskTeaser, GovernanceTeaser, MasterDataTeaser, PipelinesTeaser } from "./FlowTeasers";
import styles from "./HomeModuleIllustrationsMockup.module.scss";

/* The live detail on each card's header row, beside the module name. */
export const TEASER_META: Record<HomeHeroModuleKind, ReactNode> = {
  "master-data": "214 locations",
  bi: "Quarter 2",
  governance: "Audited",
  ask: "Cited",
  pipelines: (
    <span className={styles.live}>
      <span className={styles.pulse} />6 min ago
    </span>
  ),
  ml: "Next 12 weeks",
  warehouse: "Defined once",
};

const DRAWINGS: Record<HomeHeroModuleKind, () => ReactNode> = {
  "master-data": MasterDataTeaser,
  bi: BusinessIntelligenceTeaser,
  governance: GovernanceTeaser,
  ask: AskTeaser,
  pipelines: PipelinesTeaser,
  ml: ForecastTeaser,
  warehouse: WarehouseTeaser,
};

export interface HomeModuleIllustrationsMockupProps {
  kind: HomeHeroModuleKind;
}

export function HomeModuleIllustrationsMockup({ kind }: HomeModuleIllustrationsMockupProps) {
  const Draw = DRAWINGS[kind];
  return <Draw />;
}
