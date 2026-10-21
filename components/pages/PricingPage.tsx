/*
 * /pricing and /in/pricing (lib/region.ts). One page body, two routes: the
 * route files only set metadata and pass the region. The versions differ in
 * the plans' currency and region line, the SaaS hosting line and the How to
 * buy register; every other section is the same. No hero: the page opens on
 * [01] Plans (user, 15 Oct 2026). A route sharing its body with another route keeps that body
 * here in components/pages/.
 */

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageMinimap from "@/components/layout/PageMinimap";
import FaqSection from "@/components/ui/FaqSection";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import PricingCompare from "@/components/sections/pricing/PricingCompare";
import PricingDeployment from "@/components/sections/pricing/PricingDeployment";
import PricingIncluded from "@/components/sections/pricing/PricingIncluded";
import PricingPlans from "@/components/sections/pricing/PricingPlans";
import { PricingBuy, PricingServices } from "@/components/sections/pricing/PricingServices";
import type { PricingPage as PricingContent } from "@/content/pages/pricing";
import { regionPath, type Region } from "@/lib/region";
import { absoluteUrl } from "@/lib/site";

export default function PricingPage({ region, content }: { region: Region; content: PricingContent }) {
  const PLANS = content.plans;
  const path = regionPath("/pricing", region);

  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        {/* Plans as offers on the Akashic application. No price is published
            yet, so each Offer names the plan and how it is billed only. */}
        <JsonLd
          data={{
            "@type": "SoftwareApplication",
            name: "Akashic",
            applicationCategory: "BusinessApplication",
            operatingSystem: content.operatingSystem,
            url: absoluteUrl("/akashic"),
            offers: PLANS.map((plan) => ({
              "@type": "Offer",
              name: `Akashic ${plan.name}`,
              description: plan.summary,
              url: absoluteUrl(`${path}#${plan.id}`),
            })),
          }}
        />
        <PricingPlans region={region} content={content} prices={content.prices} />
        <PricingCompare content={content.compare} plans={PLANS} />
        <PricingIncluded content={content.everyPlan} />
        <PricingDeployment region={region} content={content.deployment} />
        <PricingServices content={content.services} />
        <PricingBuy region={region} content={content.howToBuy} />
        <FaqSection num="07" label={content.faq.label} setup={content.faq.setup} payoff={content.faq.payoff} items={content.faq.items} />
        <PageClose {...content.close} />
      </main>
      <Footer />
      <PageMinimap sections={content.sections} aria-label={content.sectionsLabel} />
    </>
  );
}
