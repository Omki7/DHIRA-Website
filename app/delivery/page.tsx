import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import DeliveryHero from "@/components/sections/delivery/DeliveryHero";
import DeliveryModels from "@/components/sections/delivery/DeliveryModels";
import DeliveryAkashicDeployment from "@/components/sections/delivery/DeliveryAkashicDeployment";
import DeliveryProductEngineering from "@/components/sections/delivery/DeliveryProductEngineering";
import DeliveryAdvisory from "@/components/sections/delivery/DeliveryAdvisory";
import DeliveryMethodology from "@/components/sections/delivery/DeliveryMethodology";
import DeliveryProven from "@/components/sections/delivery/DeliveryProven";
import DeliveryFit from "@/components/sections/delivery/DeliveryFit";
import DeliveryFAQ from "@/components/sections/delivery/DeliveryFAQ";
import DeliveryClose from "@/components/sections/delivery/DeliveryClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { DELIVERY_SECTIONS } from "@/lib/deliverySections";

export const metadata: Metadata = {
  title: "Delivery — Delivered on your terms. One standard.",
  description:
    "Akashic deployment, product engineering, or advisory and co-engineering. Three engagement models, one standard of accountability: from readiness audit to production.",
};

export default function DeliveryPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <DeliveryHero />
        <DeliveryModels />
        <DeliveryAkashicDeployment />
        <DeliveryProductEngineering />
        <DeliveryAdvisory />
        <DeliveryMethodology />
        <DeliveryProven />
        <DeliveryFit />
        <DeliveryFAQ />
        <DeliveryClose />
      </main>
      <Footer />
      <PageMinimap sections={DELIVERY_SECTIONS} aria-label="Delivery page sections" />
    </>
  );
}
