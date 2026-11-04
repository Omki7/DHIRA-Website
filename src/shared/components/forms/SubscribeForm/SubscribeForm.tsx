"use client";

import { useId, useRef, useState } from "react";
import type { InsightsPage } from "@/content/pages/insights";
import styles from "./SubscribeForm.module.scss";

export interface SubscribeFormProps {
  href: string;
  content: InsightsPage["subscribe"]["feed"];
}

/** The static site publishes a real feed. Copying its address needs no
    subscriber database and never claims an email subscription succeeded. */
export function SubscribeForm({ href, content }: SubscribeFormProps) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  return (
    <form className={styles.root} onSubmit={async event => {
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
      <label htmlFor={id} className={styles.srOnly}>{content.label}</label>
      <div className={styles.row}>
        <input ref={input} id={id} type="url" value={href} readOnly onFocus={event => event.currentTarget.select()} className={styles.input} />
        <button type="submit" className={styles.button}>{content.copy}</button>
      </div>
      <p role="status" aria-live="polite" className={styles.status}>{status === "copied" ? content.copied : status === "error" ? content.error : ""}</p>
    </form>
  );
}
