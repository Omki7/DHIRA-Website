import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import DeliveryHero from "@/components/sections/delivery/DeliveryHero";
import DeliveryModels from "@/components/sections/delivery/DeliveryModels";
import DeliveryCapabilities from "@/components/sections/delivery/DeliveryCapabilities";
import DeliveryMethodology from "@/components/sections/delivery/DeliveryMethodology";
import DeliveryProven from "@/components/sections/delivery/DeliveryProven";
import DeliveryFit from "@/components/sections/delivery/DeliveryFit";
import DeliveryFAQ from "@/components/sections/delivery/DeliveryFAQ";
import DeliveryClose from "@/components/sections/delivery/DeliveryClose";
import PageMinimap from "@/components/layout/PageMinimap";
import { DELIVERY_SECTIONS } from "@/lib/deliverySections";

export const metadata: Metadata = {
  title: "Delivery & Services",
  description:
    "Delivered on your terms: Akashic SaaS, White Label, custom technology services, product engineering, or staff augmentation. One standard of accountability.",
  openGraph: {
    title: "Delivery & Services | DHIRA",
    description:
      "Five engagement models, one standard of accountability. From platform rollout to bespoke engineering.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Delivery & Services — DHIRA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delivery & Services | DHIRA",
    description:
      "Five engagement models, one standard of accountability. From platform rollout to bespoke engineering.",
    images: ["/og-image.png"],
  },
};

export default function DeliveryPage() {
  return (
    <>
      <Nav />
      <main className="bg-background">
        <DeliveryHero />
        <DeliveryModels />
        <DeliveryCapabilities />
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
