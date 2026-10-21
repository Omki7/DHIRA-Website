import type { PlaceholderPrices, PlanId, TermId } from "@/content/pages/pricing";

/* Every price is in US dollars (user, 21 Oct 2026). Enterprise carries no
   term saving: it is quoted on an annual agreement. */

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const monthly = (prices: PlaceholderPrices, plan: PlanId, term: TermId) =>
  prices.listUsd[plan] * (plan === "enterprise" ? 1 : 1 - prices.termSaving[term]);

/** A plan's monthly price on a term: "$2,125". */
export function planPrice(prices: PlaceholderPrices, plan: PlanId, term: TermId): string {
  return usd.format(monthly(prices, plan, term));
}

/** The monthly list price with no term: "$2,500". */
export function listPrice(prices: PlaceholderPrices, plan: PlanId): string {
  return usd.format(prices.listUsd[plan]);
}

/** What a term saves over a year against the monthly price, or null when
    it saves nothing: "$4,500". */
export function yearlySaving(prices: PlaceholderPrices, plan: PlanId, term: TermId): string | null {
  const saved = (prices.listUsd[plan] - monthly(prices, plan, term)) * 12;
  return saved > 0 ? usd.format(saved) : null;
}
