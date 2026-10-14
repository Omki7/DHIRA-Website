"use client";

/*
 * [05] Proof — Built for real-world delivery.
 * Renders homepage ProvenAtScale layout (ProvenStories interactive carousel + AshokaChakra ornament)
 * with customized headline and description for Section 05 of the Delivery page.
 */

import ProvenAtScale from "@/components/sections/ProvenAtScale";

export default function DeliveryProven() {
  return (
    <ProvenAtScale
      id="proven-at-scale"
      sectionNumber="05"
      eyebrowText="Proof"
      title="Built for real-world delivery."
      description="We measure our work by outcomes, engineering quality, and the ability to deliver reliably at national scale."
    />
  );
}


