"use client";

import Link from "next/link";
import { useUi } from "@/shared/providers/UiProvider";
import { FigureEyebrow } from "@/shared/components/ui";
import { ScrollRevealRail } from "@/shared/components/ui";
import { TwoToneTitle } from "@/shared/components/ui";

/* The branded error boundary for every route (FRONTEND_ARCHITECTURE §18).
   It renders inside the root layout, so the interface strings come from
   useUi(); the nav and footer are server shells and are not repeated here.
   Copy: content/ui.ts `error`. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { error: copy } = useUi();
  return (
    <main id="main" className="bg-background">
      <section className="pb-24 pt-16 lg:pb-32 lg:pt-24">
        <ScrollRevealRail>
          <FigureEyebrow bare label={copy.label} />
          <div className="mt-8 max-w-[52rem]">
            <TwoToneTitle as="h1" setup={copy.setup} payoff={copy.payoff} />
            <p className="mt-6 max-w-[36em] text-pretty text-lg leading-relaxed text-secondary-text">{copy.lede}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" onClick={reset} className="btn-primary btn-lg">
              {copy.retry}
            </button>
            <Link href={copy.home.href} className="btn-secondary btn-lg">
              {copy.home.label}
            </Link>
          </div>
        </ScrollRevealRail>
      </section>
    </main>
  );
}
