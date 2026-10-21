"use client";

/*
 * SIMULATED: an email sign-up with no backend. Submitting shows the success
 * state the live form will show; developers wire `onSubmit` to the email
 * provider at hand-off (the site is the final hi-fi mockup, 15 Oct 2026).
 * Used by the Insights hub, articles and the newsroom.
 */

import { useState } from "react";
import { useUi } from "@/components/providers/UiProvider";

/** `cta` overrides the default button label (e.g. "Get invitations" on /events). */
export default function SubscribeForm({ id, cta }: { id: string; cta?: string }) {
  const { subscribe } = useUi();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (done) {
    return (
      <p role="status" className="mt-8 max-w-[34rem] border-y border-lineSoft py-5 text-[15px] leading-relaxed text-ink">
        {subscribe.thanks} <span className="font-medium">{email}</span>.
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (valid) setDone(true);
      }}
      className="mt-8 flex max-w-[34rem] flex-col gap-3 sm:flex-row"
    >
      <label htmlFor={id} className="sr-only">
        {subscribe.label}
      </label>
      <input
        id={id}
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={subscribe.placeholder}
        className="h-11 min-w-0 flex-1 rounded-[10px] border border-subtle-stroke bg-background px-3.5 text-[15px] text-primary-text  transition-all duration-200 placeholder:text-tertiary-text focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
      />
      <button type="submit" disabled={!valid} className="btn-primary btn-lg disabled:opacity-60">
        {cta ?? subscribe.submit}
      </button>
    </form>
  );
}
