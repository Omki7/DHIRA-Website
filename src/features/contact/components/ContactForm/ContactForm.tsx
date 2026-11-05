"use client";

/*
 * The "Talk to our team" form, shared by the global ContactModal and the
 * /contact page (extracted from ContactModal 15 Oct 2026; markup unchanged).
 *
 * Submits through the Server Action in actions/contact.action.ts, which
 * filters spam (4 Nov 2026, user) and is SIMULATED until developers connect
 * email or the CRM there. Two of its bot traps live here: a hidden honeypot
 * field, and the time the form was open, added only when it sends. The
 * fields are checked here first (schemas/contact.schema.ts, the same rules
 * the server applies), so a person sees an error without a round trip.
 *
 * `idPrefix` keeps field ids unique when the modal opens over the /contact
 * page. `onProgress` reports completion (the modal's top bar). `onDone`
 * replaces "Send another" with a close action in the success state.
 *
 * Job applications (5 Nov 2026, user). One interest option, "Joining DHIRA"
 * (content/ui.ts `contactForm.interest.careers`), never the open roles one
 * by one, so the form does not depend on the roles board. It shows only to
 * visitors in India, like every other way into careers (shared/utils/
 * region.ts), or when a careers link opened the form on it
 * (`initialInterest`). While it is chosen the form speaks to a candidate: a
 * personal email, an optional company, "What have you built?", and an
 * optional resume (PDF or Word, up to 4 MB). `onApplyingChange` tells the
 * modal, which swaps its ask to match.
 */

import { useEffect, useRef, useState, useTransition } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useRegion from "@/shared/hooks/useRegion";
import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import { isEmail } from "@/shared/utils/email";
import { sendContactMessage } from "../../actions/contact.action";
import {
  CONTACT_LIMITS,
  RESUME,
  TRAP_FIELDS,
  checkContact,
  isApplication,
  resumeFits,
  type ContactField,
  type FormField,
} from "../../schemas/contact.schema";
import styles from "./ContactForm.module.scss";

/* Every label, placeholder, status line and error is content: content/ui.ts
   `contactForm`, with `contactForm.application` in place while applying. */
const empty: Record<ContactField, string> = { name: "", email: "", company: "", interest: "", message: "" };

export interface ContactFormProps {
  idPrefix: string;
  /** Preselects an interest option, such as "Joining DHIRA" from a careers link. */
  initialInterest?: string;
  onProgress?: (percent: number) => void;
  /** Whether the form is a job application, each time that changes. */
  onApplyingChange?: (applying: boolean) => void;
  onDone?: () => void;
  doneLabel?: string;
}

export function ContactForm({ idPrefix, initialInterest = "", onProgress, onApplyingChange, onDone, doneLabel }: ContactFormProps) {
  const { contactForm: copy } = useUi();
  const { region } = useRegion();
  const openedOnCareers = isApplication(initialInterest, copy.interest);
  const start = { ...empty, interest: copy.interest.options.includes(initialInterest) ? initialInterest : "" };
  const [sent, setSent] = useState(false);
  const [submitting, startSubmit] = useTransition();
  const [form, setForm] = useState(start);
  const [resume, setResume] = useState<File | null>(null);
  const [invalid, setInvalid] = useState<FormField[]>([]);
  const [failed, setFailed] = useState(false);
  /* When the visitor first saw the form (performance.now()): the bot trap
     that turns away submissions faster than a person can type. */
  const shownAt = useRef(0);
  /* Bumped to clear the file input: a new key mounts an empty one. */
  const [resumeKey, setResumeKey] = useState(0);

  const applying = isApplication(form.interest, copy.interest);
  const showCareers = region === "in" || openedOnCareers;
  const options = copy.interest.options.filter((option) => option !== copy.interest.careers || showCareers);
  const { application: app } = copy;
  const words = applying
    ? { ...app, errors: { ...copy.errors, ...app.errors } }
    : {
        email: copy.email,
        company: copy.company,
        message: copy.message,
        submit: copy.submit,
        submitting: copy.submitting,
        consentBefore: copy.consent.before,
        sentTitle: copy.sentTitle,
        sentBody: copy.sentBody,
        errors: { ...copy.errors, resume: app.errors.resume },
      };

  /* An application's company and resume are optional, so they do not count towards the bar. */
  const counted = applying ? [form.name, form.email, form.interest, form.message] : [form.name, form.email, form.company, form.interest, form.message];
  const progressPercent = Math.round((counted.filter(Boolean).length / counted.length) * 100);

  useEffect(() => {
    onProgress?.(progressPercent);
  }, [progressPercent, onProgress]);

  useEffect(() => {
    onApplyingChange?.(applying);
  }, [applying, onApplyingChange]);

  useEffect(() => {
    shownAt.current = performance.now();
  }, []);

  const id = (field: string) => `${idPrefix}-${field}`;
  const errorId = (field: FormField) => `${id(field)}-error`;
  /** Show or clear one field's error, leaving the others as they are. */
  const mark = (target: FormField, bad: boolean) =>
    setInvalid((prev) => (bad ? (prev.includes(target) ? prev : [...prev, target]) : prev.filter((field) => field !== target)));

  function clearResume() {
    setResumeKey((key) => key + 1);
    setResume(null);
    mark(RESUME.field, false);
  }

  /* The email's format is checked as the visitor leaves the field, not only
     on send, so a slip like "name@gmail" or "name@gmail.con" shows while
     they are still there. Typing clears the error (`update`); an empty
     field waits for send, so tabbing past it is not scolded. */
  function checkEmail() {
    const email = form.email.trim();
    if (email) mark("email", !isEmail(email));
  }

  function update(key: ContactField, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (invalid.includes(key)) setInvalid((prev) => prev.filter((field) => field !== key));
    /* Leaving "Joining DHIRA" drops the resume with its field. */
    if (key === "interest" && !isApplication(value, copy.interest)) clearResume();
  }

  /* A file that is not a resume shows its error as soon as it is chosen. */
  function pickResume(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setResume(file);
    mark(RESUME.field, file !== null && !resumeFits(file));
  }

  /* Mark the fields, then move focus to the first once its error is on the
     page, so a screen reader reads the error with the field. */
  function showInvalid(fields: FormField[]) {
    setInvalid(fields);
    requestAnimationFrame(() => document.getElementById(id(fields[0]))?.focus());
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailed(false);
    const check = checkContact(form, copy.interest);
    const resumeBad = applying && resume !== null && !resumeFits(resume);
    if (!check.ok || resumeBad) {
      showInvalid([...(check.ok ? [] : check.fields), ...(resumeBad ? [RESUME.field] : [])]);
      return;
    }
    const data = new FormData(event.currentTarget);
    data.set(TRAP_FIELDS.elapsed, String(Math.round(performance.now() - shownAt.current)));
    startSubmit(async () => {
      try {
        const result = await sendContactMessage(data);
        if (result.status === "sent") setSent(true);
        else if (result.status === "invalid") showInvalid(result.fields);
        else setFailed(true);
      } catch {
        /* Offline, or a new deployment replaced the action mid-visit. */
        setFailed(true);
      }
    });
  }

  /* The props every field shares: name, value, change handler, error wiring. */
  function fieldProps(field: ContactField) {
    const isInvalid = invalid.includes(field);
    return {
      id: id(field),
      name: field,
      value: form[field],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => update(field, e.target.value),
      "aria-invalid": isInvalid || undefined,
      "aria-describedby": isInvalid ? errorId(field) : undefined,
    };
  }

  function fieldError(field: FormField) {
    if (!invalid.includes(field)) return null;
    return (
      <p id={errorId(field)} className={styles.fieldError}>
        {words.errors[field]}
      </p>
    );
  }

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
            {words.sentTitle}
            {form.name ? `, ${form.name.split(" ")[0]}` : ""}.
          </h3>
          <p className={styles.successBody}>
            {words.sentBody}
          </p>
          <button
            type="button"
            onClick={() => {
              if (onDone) {
                onDone();
                return;
              }
              setForm(start);
              setResume(null);
              setSent(false);
              shownAt.current = performance.now();
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
                {...fieldProps("name")}
                type="text"
                required
                autoComplete="name"
                maxLength={CONTACT_LIMITS.name}
                className={styles.input}
                placeholder={copy.name.placeholder}
              />
              {fieldError("name")}
            </div>
            <div>
              <label htmlFor={id("email")} className={styles.label}>
                {words.email.label}
              </label>
              <input
                {...fieldProps("email")}
                onBlur={checkEmail}
                type="email"
                inputMode="email"
                required
                autoComplete="email"
                spellCheck={false}
                autoCapitalize="none"
                maxLength={CONTACT_LIMITS.email}
                className={styles.input}
                placeholder={words.email.placeholder}
              />
              {fieldError("email")}
            </div>
            <div>
              <label htmlFor={id("company")} className={styles.label}>
                {words.company.label}
              </label>
              <input
                {...fieldProps("company")}
                type="text"
                required={!applying}
                autoComplete="organization"
                maxLength={CONTACT_LIMITS.company}
                className={styles.input}
                placeholder={words.company.placeholder}
              />
              {fieldError("company")}
            </div>
            <div>
              <label htmlFor={id("interest")} className={styles.label}>
                {copy.interest.label}
              </label>
              <select
                {...fieldProps("interest")}
                className={cx(styles.select, form.interest ? styles.selectFilled : styles.selectEmpty)}
              >
                <option value="" disabled>
                  {copy.interest.placeholder}
                </option>
                {options.map((opt) => (
                  <option key={opt} value={opt} className={styles.option}>
                    {opt}
                  </option>
                ))}
              </select>
              {fieldError("interest")}
            </div>
          </div>

          <div>
            <label htmlFor={id("message")} className={styles.label}>
              {words.message.label}
            </label>
            <textarea
              {...fieldProps("message")}
              required
              rows={2}
              maxLength={CONTACT_LIMITS.message}
              className={styles.textarea}
              placeholder={words.message.placeholder}
            />
            {fieldError("message")}
          </div>

          {/* The resume, only while applying. The real file input covers the
              box, invisible (ContactForm.module.scss `.file`). */}
          {applying && (
            <div>
              <label htmlFor={id(RESUME.field)} className={styles.label}>
                {app.resume.label}
              </label>
              <div className={styles.file}>
                <input
                  key={resumeKey}
                  id={id(RESUME.field)}
                  name={RESUME.field}
                  type="file"
                  accept={RESUME.accept}
                  onChange={pickResume}
                  className={styles.fileInput}
                  aria-invalid={invalid.includes(RESUME.field) || undefined}
                  aria-describedby={invalid.includes(RESUME.field) ? errorId(RESUME.field) : id("resume-note")}
                />
                <span aria-hidden className={styles.fileAction}>
                  {resume ? app.resume.change : app.resume.choose}
                </span>
                <span id={id("resume-note")} className={cx(styles.fileName, resume && styles.fileNameChosen)}>
                  {resume ? resume.name : app.resume.hint}
                </span>
                {resume && (
                  <button
                    type="button"
                    onClick={clearResume}
                    aria-label={`${app.resume.remove} ${resume.name}`}
                    className={styles.fileRemove}
                  >
                    {app.resume.remove}
                  </button>
                )}
              </div>
              {fieldError(RESUME.field)}
            </div>
          )}

          {/* Honeypot: hidden from people and assistive technology; bots
              fill every field they find. */}
          <div aria-hidden="true" className={styles.honeypot}>
            <input type="text" name={TRAP_FIELDS.honeypot} tabIndex={-1} autoComplete="off" />
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
                {words.submitting}
              </span>
            ) : (
              <>
                <span>{words.submit}</span>
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

          {failed && (
            <p role="alert" className={styles.formError}>
              {copy.errors.failed}
            </p>
          )}

          <p className={styles.consent}>
            {words.consentBefore}{" "}
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
