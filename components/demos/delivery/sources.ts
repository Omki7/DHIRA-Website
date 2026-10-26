import type { DeliverySource } from "@/content/pages/delivery";

/* Source systems keep the colour they carry on the homepage cards
   (AkashicOutcomeCardsMockup), so a reader meets Salesforce in the same blue
   on every page. Hex inside SVG attributes is the Rule 8 exception. */
export const SOURCE_COLOUR: Record<DeliverySource, string> = {
  salesforce: "#2A9BE0",
  netsuite: "#7C5CFC",
  plan: "#E0A93B",
  documents: "#E5547B",
};
