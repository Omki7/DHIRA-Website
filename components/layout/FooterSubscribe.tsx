"use client";

import { useActionState, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUi } from "@/components/providers/UiProvider";
import { subscribe, type SubscribeState } from "@/lib/subscribe";

/* The footer's business email sign-up (2 Nov 2026, user; ThoughtSpot's
   "Stay in touch" field). SIMULATED, like the contact form: the Server
   Action in lib/subscribe.ts checks the address but saves nothing until
   developers connect a mailing list there (docs/STATE_AND_DATA.md, Forms).
   Native `required` and `type="email"` catch typos before the round trip;
   the server checks again and turns away personal mailboxes. The heading
   and lede are the footer's (layout/Footer). Copy: content/ui.ts
   `subscribe`. */

const initial: SubscribeState = { status: "idle" };

const fieldInput =
  "h-11 min-w-0 flex-1 rounded-[10px] border border-default-stroke bg-background px-3.5 text-sm text-ink transition-colors duration-200 placeholder:text-inkSoft focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15";

export default function FooterSubscribe() {
  const { subscribe: copy } = useUi();
  const [state, action, pending] = useActionState(subscribe, initial);
  const pathname = usePathname();
  const id = useId();
  const errorId = `${id}-error`;

  if (state.status === "done") {
    return (
      <p role="status" className="max-w-[22rem] text-sm leading-relaxed text-ink">
        {copy.done} {state.email && <span className="font-medium">{state.email}</span>}.
      </p>
    );
  }

  const error = state.status === "error" ? copy.errors[state.reason] : "";
  return (
    <form action={action} className="w-full max-w-[22rem]">
      <label htmlFor={id} className="sr-only">{copy.label}</label>
      <div className="flex gap-2">
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={copy.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={fieldInput}
        />
        <button type="submit" disabled={pending} className="btn-primary h-11 shrink-0 px-4 disabled:opacity-70">
          {pending ? copy.submitting : copy.submit}
        </button>
      </div>
      <input type="hidden" name="page" value={pathname} />
      {/* Honeypot: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p id={errorId} role="status" aria-live="polite" className="mt-2 min-h-5 text-xs leading-5 text-red">{error}</p>
      <p className="text-xs leading-5 text-inkSoft">
        {copy.consent.before}{" "}
        <Link href={copy.consent.link.href} className="underline decoration-line underline-offset-2 transition-colors duration-200 hover:text-ink">
          {copy.consent.link.label}
        </Link>
        {copy.consent.after}
      </p>
    </form>
  );
}
