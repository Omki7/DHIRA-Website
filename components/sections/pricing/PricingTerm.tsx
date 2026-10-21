"use client";

/*
 * The billing term, shared by [01] Plans (which sets it) and [02] Compare
 * (whose pinned plan row prices on it), so one switch moves every price on
 * the page. Monthly until the reader chooses.
 */

import { createContext, useContext, useState, type ReactNode } from "react";
import type { TermId } from "@/content/pages/pricing";

const TermContext = createContext<{ term: TermId; setTerm: (term: TermId) => void }>({
  term: "monthly",
  setTerm: () => {},
});

export function PricingTermProvider({ children }: { children: ReactNode }) {
  const [term, setTerm] = useState<TermId>("monthly");
  return <TermContext.Provider value={{ term, setTerm }}>{children}</TermContext.Provider>;
}

export const usePricingTerm = () => useContext(TermContext);
