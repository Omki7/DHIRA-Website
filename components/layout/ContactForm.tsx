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
import { useUi } from "@/components/providers/UiProvider";

/* Every label, placeholder and status line is content: content/ui.ts
   `contactForm`. The interest options are its `interest.options`. */
const empty = { name: "", email: "", company: "", interest: "", message: "" };

const fieldLabel = "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-tertiary-text";
const fieldInput =
  "h-11 w-full rounded-[10px] border border-default-stroke bg-background px-3.5 text-[14px] text-primary-text transition-all duration-200 placeholder:text-tertiary-text focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15";

export default function ContactForm({
  idPrefix,
  onProgress,
  onDone,
  doneLabel,
}: {
  idPrefix: string;
  onProgress?: (percent: number) => void;
  onDone?: () => void;
  doneLabel?: string;
}) {
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
          className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-border bg-blue-subtle text-blue "
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
              <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
          <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-primary-text">
            {copy.sentTitle}
            {form.name ? `, ${form.name.split(" ")[0]}` : ""}.
          </h3>
          <p className="mt-2.5 max-w-[26em] text-[14px] leading-relaxed text-secondary-text">
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
            className="btn-secondary mt-7 px-6"
          >
            {onDone ? (doneLabel ?? copy.close) : copy.sendAnother}
          </button>
        </motion.div>
      ) : (
        <form key="form" onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={id("name")} className={fieldLabel}>
                {copy.name.label}
              </label>
              <input
                id={id("name")}
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={fieldInput}
                placeholder={copy.name.placeholder}
              />
            </div>
            <div>
              <label htmlFor={id("email")} className={fieldLabel}>
                {copy.email.label}
              </label>
              <input
                id={id("email")}
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={fieldInput}
                placeholder={copy.email.placeholder}
              />
            </div>
            <div>
              <label htmlFor={id("company")} className={fieldLabel}>
                {copy.company.label}
              </label>
              <input
                id={id("company")}
                type="text"
                required
                autoComplete="organization"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className={fieldInput}
                placeholder={copy.company.placeholder}
              />
            </div>
            <div>
              <label htmlFor={id("interest")} className={fieldLabel}>
                {copy.interest.label}
              </label>
              <select
                id={id("interest")}
                value={form.interest}
                onChange={(e) => update("interest", e.target.value)}
                className={`h-11 w-full rounded-[10px] border border-default-stroke bg-background px-3.5 text-[14px] transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22><path d=%22M2.5 4.5L6 8l3.5-3.5%22 stroke=%22%236f7988%22 stroke-width=%221.4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15 ${
                  form.interest ? "text-primary-text" : "text-tertiary-text"
                }`}
              >
                <option value="" disabled>
                  {copy.interest.placeholder}
                </option>
                {copy.interest.options.map((opt) => (
                  <option key={opt} value={opt} className="text-primary-text">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor={id("message")} className={fieldLabel}>
              {copy.message.label}
            </label>
            <textarea
              id={id("message")}
              required
              rows={4}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="w-full rounded-[10px] border border-default-stroke bg-background px-3.5 py-3 text-[14px] leading-relaxed text-primary-text transition-all duration-200 resize-none placeholder:text-tertiary-text focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
              placeholder={copy.message.placeholder}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-5 h-11 w-full text-[15px] font-semibold transition-all duration-200  disabled:opacity-70 flex items-center justify-center gap-2 group"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-on-action" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {copy.submitting}
              </span>
            ) : (
              <>
                <span>{copy.submit}</span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
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

          <p className="mt-3 text-center text-[12px] leading-relaxed text-tertiary-text">
            {copy.consent.before}{" "}
            <a href={copy.consent.link.href} className="underline decoration-line underline-offset-2 hover:text-secondary-text">
              {copy.consent.link.label}
            </a>
            {copy.consent.after}
          </p>
        </form>
      )}
    </AnimatePresence>
  );
}
