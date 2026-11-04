"use client";

import { useUi } from "@/shared/providers/UiProvider";
import { SubscribeForm } from "../SubscribeForm";

/* The footer's business email sign-up (2 Nov 2026, user; ThoughtSpot's
   "Stay in touch" field). The form, its rules and its styles are
   SubscribeForm's, shared with the /insights sign-up since 4 Nov 2026.
   The heading and lede are the footer's (layout/Footer). Copy:
   content/ui.ts `subscribe`. */

export function FooterSubscribe() {
  const { subscribe: copy } = useUi();
  return <SubscribeForm copy={copy} source="footer" />;
}
