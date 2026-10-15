import PricingPage from "@/components/pages/PricingPage";
import { pageMetadata } from "@/lib/metadata";
import { PRICING_INTRO } from "@/lib/pricingSections";

/* International pricing. The India version is app/in/pricing; both render
   components/pages/PricingPage (lib/region.ts). */

export const metadata = pageMetadata({
  title: "Plans and pricing",
  description: `${PRICING_INTRO.payoff} ${PRICING_INTRO.lede} Prices in USD.`,
  path: "/pricing",
  region: "intl",
});

export default function Page() {
  return <PricingPage region="intl" />;
}
