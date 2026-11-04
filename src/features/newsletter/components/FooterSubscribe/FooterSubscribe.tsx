"use client";

import { useActionState, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import { subscribe, type SubscribeState } from "../../actions/subscribe.action";
import styles from "./FooterSubscribe.module.scss";

/* The footer's business email sign-up (2 Nov 2026, user; ThoughtSpot's
   "Stay in touch" field). SIMULATED, like the contact form: the Server
   Action in features/newsletter/actions/subscribe.action.ts checks the
   address but saves nothing until developers connect a mailing list there
   (docs/STATE_AND_DATA.md, Forms).
   Native `required` and `type="email"` catch typos before the round trip;
   the server checks again and turns away personal mailboxes. The heading
   and lede are the footer's (layout/Footer). Copy: content/ui.ts
   `subscribe`. */

const initial: SubscribeState = { status: "idle" };

export function FooterSubscribe() {
  const { subscribe: copy } = useUi();
  const [state, action, pending] = useActionState(subscribe, initial);
  const pathname = usePathname();
  const id = useId();
  const errorId = `${id}-error`;

  if (state.status === "done") {
    return (
      <p role="status" className={styles.done}>
        {copy.done} {state.email && <span className={styles.doneEmail}>{state.email}</span>}.
      </p>
    );
  }

  const error = state.status === "error" ? copy.errors[state.reason] : "";
  return (
    <form action={action} className={styles.form}>
      <label htmlFor={id} className={styles.srOnly}>{copy.label}</label>
      <div className={styles.row}>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={copy.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={styles.input}
        />
        <button type="submit" disabled={pending} className={cx("btn-primary", styles.submit)}>
          {pending ? copy.submitting : copy.submit}
        </button>
      </div>
      <input type="hidden" name="page" value={pathname} />
      {/* Honeypot: hidden from people and assistive technology. */}
      <div aria-hidden="true" className={styles.honeypot}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p id={errorId} role="status" aria-live="polite" className={styles.error}>{error}</p>
      <p className={styles.consent}>
        {copy.consent.before}{" "}
        <Link href={copy.consent.link.href} className={styles.consentLink}>
          {copy.consent.link.label}
        </Link>
        {copy.consent.after}
      </p>
    </form>
  );
}
