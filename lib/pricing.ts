import type { PlaceholderPrices, PlanId, TermId } from "@/content/pages/pricing";
import type { Region } from "./region";

/** A plan's monthly price on a term, formatted for the region. Enterprise
    carries no term saving. India converts at the content's rate and rounds
    to the nearest 5,000 rupees; GST is extra. */
export function planPrice(prices: PlaceholderPrices, plan: PlanId, term: TermId, region: Region): string {
  const usd = prices.listUsd[plan] * (plan === "enterprise" ? 1 : 1 - prices.termSaving[term]);
  const amount = region === "in" ? Math.round((usd * prices.inrPerUsd) / 5000) * 5000 : usd;
  return new Intl.NumberFormat(region === "in" ? "en-IN" : "en-US", {
    style: "currency",
    currency: region === "in" ? "INR" : "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
