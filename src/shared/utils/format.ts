/* Shared number formatting (FRONTEND_ARCHITECTURE §18: never format
   inline). Dates live in lib/richText.ts (formatDate), prices in
   lib/pricing.ts. */

const wholeNumber = new Intl.NumberFormat("en-GB");

/** A whole number with thousands separators: "1,250,000". */
export function formatNumber(value: number): string {
  return wholeNumber.format(value);
}
