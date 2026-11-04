/* SIMULATED PRODUCT UI: part of AkashicOutcomeCardsMockup (see its banner). */

import type { ReactNode } from "react";
import { AskDrawing, DashboardDrawing, ForecastDrawing } from "./InsightDrawings";
import { MasterDataDrawing, PipelinesDrawing, WarehouseDrawing } from "./BuilderDrawings";
import { GovernanceDrawing } from "./GovernanceDrawing";
import type { Play } from "./drawingKit";

/* ---------------------------------------------------------------- */
/* The seven outcomes, in the content file's module order            */
/* ---------------------------------------------------------------- */
export type Outcome = {
  role: string;
  question: string;
  /** The answer, with the outcome phrase marked. */
  answer: [string, string, string];
  source: string;
  state: string;
  Drawing: (props: { play: Play; flow: boolean }) => ReactNode;
};

export const OUTCOMES: Outcome[] = [
  {
    role: "Sales operations",
    question: "Are all of this quarter's orders in one place?",
    answer: ["All ", "82,401 orders", ", in one view."],
    source: "Joined every hour",
    state: "0 rejected",
    Drawing: PipelinesDrawing,
  },
  {
    role: "Key account director",
    question: "How much does our largest customer group buy from us?",
    answer: ["", "$4.2 million", " across three companies."],
    source: "Customer hierarchy · 3 systems rolled up",
    state: "This quarter",
    Drawing: MasterDataDrawing,
  },
  {
    role: "Chief financial officer",
    question: "What drove revenue growth this quarter?",
    answer: ["Up 6.4%, led by ", "larger orders", "."],
    source: "Metrics defined once · version 1.4",
    state: "Against last quarter",
    Drawing: WarehouseDrawing,
  },
  {
    role: "Head of operations",
    question: "How many units should we plan for next quarter?",
    answer: ["About ", "12,400 units", " next quarter."],
    source: "Trained on governed sales history",
    state: "6.2% average error",
    Drawing: ForecastDrawing,
  },
  {
    role: "Head of sales",
    question: "Which channel is growing fastest this quarter?",
    answer: ["", "Online, up 18%", " this quarter."],
    source: "[1] Sales Performance · net revenue",
    state: "2 sources cited",
    Drawing: AskDrawing,
  },
  {
    role: "Chief executive",
    question: "Did we finish the quarter on plan?",
    answer: ["98% of plan, ", "up 2 points", "."],
    source: "Sales overview · alert on plan",
    state: "Refreshed 2 minutes ago",
    Drawing: DashboardDrawing,
  },
  {
    role: "Chief risk officer",
    question: "Who can see which numbers in the sales report?",
    answer: ["One report, ", "scoped to every role", "."],
    source: "Every figure traced to source",
    state: "4,211 access events audited",
    Drawing: GovernanceDrawing,
  },
];
