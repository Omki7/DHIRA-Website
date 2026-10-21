/*
 * /pricing (redesigned 21 Oct 2026; one currency, US dollars, since the
 * India version was removed the same day). No hero: the page opens on [01]
 * Plans (user, 15 Oct 2026). [01] and [02] share the billing term
 * (PricingTerm), so one switch moves every price on the page.
 *
 * Section shapes, one per job (Rule 1): [01] the plan frame on its
 * foundation, [02] the limits grid, [03] the control layer under every
 * plan, [04] three footprints on the page's one soft blue band, [05] the
 * services rate card, [06] four doors to buy, [07] questions in a split,
 * then the closing card.
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
import { PricingTermProvider } from "@/components/sections/pricing/PricingTerm";
import type { PricingPage as PricingContent } from "@/content/pages/pricing";
import { absoluteUrl } from "@/lib/site";

export default function PricingPage({ content }: { content: PricingContent }) {
  const PLANS = content.plans;
  const { faq } = content;

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
              url: absoluteUrl(`/pricing#${plan.id}`),
            })),
          }}
        />
        <PricingTermProvider>
          <PricingPlans content={content} prices={content.prices} />
          <PricingCompare content={content.compare} plans={PLANS} prices={content.prices} labels={content.planCopy} />
        </PricingTermProvider>
        <PricingIncluded content={content.everyPlan} plans={PLANS} />
        <PricingDeployment content={content.deployment} />
        <PricingServices content={content.services} />
        <PricingBuy content={content.howToBuy} />
        <FaqSection num="07" label={faq.label} setup={faq.setup} payoff={faq.payoff} lede={faq.lede} link={faq.link} groups={faq.groups} />
        <PageClose {...content.close} />
      </main>
      <Footer />
      <PageMinimap sections={content.sections} aria-label={content.sectionsLabel} />
    </>
  );
}
