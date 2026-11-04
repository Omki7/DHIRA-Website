"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { UiStrings } from "@/content/ui";

/* Interface microcopy for client components. The root layout reads the
   document once (services/content getUiStrings) and provides it here, the
   same way an i18n library hands messages to the client. */

const UiContext = createContext<UiStrings | null>(null);

interface UiProviderProps {
  value: UiStrings;
  children: ReactNode;
}

export function UiProvider({ value, children }: UiProviderProps) {
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi(): UiStrings {
  const value = useContext(UiContext);
  if (!value) throw new Error("useUi() needs <UiProvider> (mounted in src/app/layout.tsx).");
  return value;
}
