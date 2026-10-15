import PricingPage from "@/components/pages/PricingPage";
import { pageMetadata } from "@/lib/metadata";
import { PRICING_INTRO } from "@/lib/pricingSections";

/* India pricing: quotes in INR, GST, GeM. The international version is
   app/pricing; both render components/pages/PricingPage (lib/region.ts). */

export const metadata = pageMetadata({
  title: "Plans and pricing in India",
  description: `${PRICING_INTRO.payoff} ${PRICING_INTRO.lede} Prices in INR, with GST and GeM buying routes.`,
  path: "/pricing",
  region: "in",
});

export default function Page() {
  return <PricingPage region="in" />;
}
