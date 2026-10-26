"use client";

import { useId, useRef, useState } from "react";
import type { InsightsPage } from "@/content/pages/insights";

/** The static site publishes a real feed. Copying its address needs no
    subscriber database and never claims an email subscription succeeded. */
export default function SubscribeForm({ href, content }: { href: string; content: InsightsPage["subscribe"]["feed"] }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  return (
    <form className="mt-8 max-w-[38rem]" onSubmit={async event => {
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(href);
        setStatus("copied");
      } catch {
        input.current?.focus();
        input.current?.select();
        setStatus("error");
      }
    }}>
      <label htmlFor={id} className="sr-only">{content.label}</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input ref={input} id={id} type="url" value={href} readOnly onFocus={event => event.currentTarget.select()} className="h-11 min-h-11 min-w-0 flex-none rounded-btn border border-default-stroke bg-background px-3.5 text-sm text-ink sm:flex-1" />
        <button type="submit" className="min-h-11 rounded-btn border border-default-stroke bg-background px-4 text-sm font-medium text-ink transition-colors duration-150 hover:border-blue hover:text-blue">{content.copy}</button>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-inkSoft">{status === "copied" ? content.copied : status === "error" ? content.error : ""}</p>
    </form>
  );
}
