"use client";

import { useActionState, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SubscribeCopy } from "@/content/ui";
import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import { subscribe, type SubscribeSource, type SubscribeState } from "../../actions/subscribe.action";
import styles from "./SubscribeForm.module.scss";

/* A business email sign-up (footer since 2 Nov 2026; /insights since
   4 Nov 2026, user). SIMULATED, like the contact form: the Server Action
   in actions/subscribe.action.ts checks the address but saves nothing
   until developers connect a mailing list there (docs/STATE_AND_DATA.md,
   Forms). Native `required` and `type="email"` catch typos before the
   round trip; the server checks again and turns away personal mailboxes.
   Every form joins the same list; `source` records which one was used.
   Each form brings its own words (`copy`); the in-progress label and the
   errors are shared (content/ui.ts `subscribe`). Pressing the button is
   the consent, so there is no checkbox: the form does nothing else. */

const initial: SubscribeState = { status: "idle" };

export interface SubscribeFormProps {
  copy: SubscribeCopy;
  source: SubscribeSource;
  /** "footer": compact, in the footer's brand block. "section": wider, on a
      page band, with the button under the field on phones. */
  variant?: "footer" | "section";
}

export function SubscribeForm({ copy, source, variant = "footer" }: SubscribeFormProps) {
  const { subscribe: shared } = useUi();
  const [state, action, pending] = useActionState(subscribe, initial);
  const pathname = usePathname();
  const id = useId();
  const errorId = `${id}-error`;
  const section = variant === "section";

  if (state.status === "done") {
    return (
      <p role="status" className={cx(styles.done, section && styles.doneSection)}>
        {copy.done} {state.email && <span className={styles.doneEmail}>{state.email}</span>}.
      </p>
    );
  }

  const error = state.status === "error" ? shared.errors[state.reason] : "";
  return (
    <form action={action} className={cx(styles.form, section && styles.formSection)}>
      <label htmlFor={id} className={styles.srOnly}>{copy.label}</label>
      <div className={cx(styles.row, section && styles.rowSection)}>
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
          {pending ? shared.submitting : copy.submit}
        </button>
      </div>
      <input type="hidden" name="page" value={pathname} />
      <input type="hidden" name="source" value={source} />
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
