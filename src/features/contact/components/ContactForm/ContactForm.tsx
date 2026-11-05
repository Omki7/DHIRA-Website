"use client";

/*
 * The "Talk to our team" form, shared by the global ContactModal and the
 * /contact page (extracted from ContactModal 15 Oct 2026; markup unchanged).
 *
 * SIMULATED: submission waits briefly and shows the success state. The site
 * is the final hi-fi mockup; developers wire `handleSubmit` to the CRM at
 * hand-off.
 *
 * `idPrefix` keeps field ids unique when the modal opens over the /contact
 * page. `onProgress` reports completion (the modal's top bar). `onDone`
 * replaces "Send another" with a close action in the success state.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import styles from "./ContactForm.module.scss";

/* Every label, placeholder and status line is content: content/ui.ts
   `contactForm`. The interest options are its `interest.options`. */
const empty = { name: "", email: "", company: "", interest: "", message: "" };

export interface ContactFormProps {
  idPrefix: string;
  onProgress?: (percent: number) => void;
  onDone?: () => void;
  doneLabel?: string;
}

export function ContactForm({ idPrefix, onProgress, onDone, doneLabel }: ContactFormProps) {
  const { contactForm: copy } = useUi();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(empty);

  const filledCount = [form.name, form.email, form.company, form.interest, form.message].filter(Boolean).length;
  const progressPercent = Math.round((filledCount / 5) * 100);

  useEffect(() => {
    onProgress?.(progressPercent);
  }, [progressPercent, onProgress]);

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 750));
    setSubmitting(false);
    setSent(true);
  }

  const id = (field: string) => `${idPrefix}-${field}`;

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.success}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
            className={styles.successMark}
          >
            <svg viewBox="0 0 24 24" className={styles.successIcon} fill="none" aria-hidden>
              <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
          <h3 className={styles.successTitle}>
            {copy.sentTitle}
            {form.name ? `, ${form.name.split(" ")[0]}` : ""}.
          </h3>
          <p className={styles.successBody}>
            {copy.sentBody}
          </p>
          <button
            type="button"
            onClick={() => {
              if (onDone) {
                onDone();
                return;
              }
              setForm(empty);
              setSent(false);
            }}
            className={cx("btn-secondary", styles.again)}
          >
            {onDone ? (doneLabel ?? copy.close) : copy.sendAnother}
          </button>
        </motion.div>
      ) : (
        <form key="form" onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.grid}>
            <div>
              <label htmlFor={id("name")} className={styles.label}>
                {copy.name.label}
              </label>
              <input
                id={id("name")}
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={styles.input}
                placeholder={copy.name.placeholder}
              />
            </div>
            <div>
              <label htmlFor={id("email")} className={styles.label}>
                {copy.email.label}
              </label>
              <input
                id={id("email")}
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={styles.input}
                placeholder={copy.email.placeholder}
              />
            </div>
            <div>
              <label htmlFor={id("company")} className={styles.label}>
                {copy.company.label}
              </label>
              <input
                id={id("company")}
                type="text"
                required
                autoComplete="organization"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className={styles.input}
                placeholder={copy.company.placeholder}
              />
            </div>
            <div>
              <label htmlFor={id("interest")} className={styles.label}>
                {copy.interest.label}
              </label>
              <select
                id={id("interest")}
                value={form.interest}
                onChange={(e) => update("interest", e.target.value)}
                className={cx(styles.select, form.interest ? styles.selectFilled : styles.selectEmpty)}
              >
                <option value="" disabled>
                  {copy.interest.placeholder}
                </option>
                {copy.interest.options.map((opt) => (
                  <option key={opt} value={opt} className={styles.option}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor={id("message")} className={styles.label}>
              {copy.message.label}
            </label>
            <textarea
              id={id("message")}
              required
              rows={2}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className={styles.textarea}
              placeholder={copy.message.placeholder}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={cx("btn-primary", styles.submit)}
          >
            {submitting ? (
              <span className={styles.submitting}>
                <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
                  <circle className={styles.spinnerTrack} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className={styles.spinnerHead} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {copy.submitting}
              </span>
            ) : (
              <>
                <span>{copy.submit}</span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className={styles.submitArrow} aria-hidden>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.85 6.85a.5.5 0 0 0 0-.7L8.35 3.65a.5.5 0 1 0-.7.7L9.29 6H2.5a.5.5 0 0 0 0 1h6.79L7.65 8.65a.5.5 0 1 0 .7.7l2.5-2.5Z"
                    fill="currentColor"
                  />
                </svg>
              </>
            )}
          </button>

          <p className={styles.consent}>
            {copy.consent.before}{" "}
            <a href={copy.consent.link.href} className={styles.consentLink}>
              {copy.consent.link.label}
            </a>
            {copy.consent.after}
          </p>
        </form>
      )}
    </AnimatePresence>
  );
}
