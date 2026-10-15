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
import { PLANS, PRICING_CLOSE, PRICING_FAQ, PRICING_SECTIONS } from "@/lib/pricingSections";
import { regionPath, type Region } from "@/lib/region";
import { absoluteUrl } from "@/lib/site";

export default function PricingPage({ region }: { region: Region }) {
  const path = regionPath("/pricing", region);
  const other: Region = region === "in" ? "intl" : "in";

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
            operatingSystem: "Multi-tenant SaaS; private cloud on AWS, Azure or GCP; on-premise on Docker and Kubernetes",
            url: absoluteUrl("/akashic"),
            offers: PLANS.map((plan) => ({
              "@type": "Offer",
              name: `Akashic ${plan.name}`,
              description: plan.summary,
              url: absoluteUrl(`${path}#${plan.id}`),
            })),
          }}
        />
        <PricingPlans region={region} />
        <PricingCompare />
        <PricingIncluded />
        <PricingDeployment region={region} />
        <PricingServices />
        <PricingBuy region={region} />
        <FaqSection num="07" label={PRICING_FAQ.label} setup={PRICING_FAQ.setup} payoff={PRICING_FAQ.payoff} items={PRICING_FAQ.items} />
        <PageClose
          label={PRICING_CLOSE.label}
          setup={PRICING_CLOSE.setup}
          payoff={PRICING_CLOSE.payoff}
          body={PRICING_CLOSE.body}
          primary={{ label: "Get a quote", href: "#talk-to-our-team" }}
          secondary={{ label: "Explore Akashic", href: "/akashic" }}
        />
      </main>
      <Footer />
      <PageMinimap sections={PRICING_SECTIONS} aria-label="Pricing page sections" />
    </>
  );
}
