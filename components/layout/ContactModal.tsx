"use client";

/*
 * ContactModal — the single "Talk to our team" dialog for the whole site.
 *
 * Mounted once in the root layout. Rather than editing all ~33 CTAs, it
 * listens (capture phase) for clicks on any <a> whose hash points at the
 * contact anchors (#talk-to-our-team, #get-started, #briefing-form) and opens
 * the dialog in place instead of jumping to the footer. Escape / backdrop /
 * the close button dismiss it; background scroll is locked while open.
 *
 * NOTE: no backend/inbox is wired yet. handleSubmit simulates a successful
 * send and shows the confirmation state. To go live, POST the `form` payload
 * to a real endpoint/inbox where marked TODO.
 */

import { useCallback, useEffect, useRef, useState } from "react";

type Interest = "Platform deployment" | "Product build" | "Advisory" | "Just exploring";

const interests: Interest[] = [
  "Platform deployment",
  "Product build",
  "Advisory",
  "Just exploring",
];

const assurances = [
  "A 30-minute technical discovery — no pitch deck.",
  "A reply from our team within one business day.",
  "Your details stay with us. Nothing shared, nothing sold.",
];

const CONTACT_HASHES = ["#talk-to-our-team", "#get-started", "#briefing-form"];

const labelClass =
  "mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast";
const fieldClass =
  "h-11 w-full rounded-[10px] border border-default-stroke bg-white px-3.5 text-[14px] text-ink shadow-input transition-colors duration-250 ease-settle placeholder:text-tertiary-text focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="9" className="fill-blue-subtle" />
      <path d="M6 10.2l2.6 2.6L14 7.4" stroke="#3E63DD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "Veman Chippa",
    email: "veman.chippa@dhira.ai",
    company: "Dhira ai",
    interest: "" as "" | Interest,
    message: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const close = useCallback(() => setOpen(false), []);

  // Intercept every contact CTA on the page and open the dialog instead.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const hash = href.includes("#") ? `#${href.split("#")[1]}` : "";
      if (!CONTACT_HASHES.includes(hash)) return;
      e.preventDefault();
      setSent(false);
      setOpen(true);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Escape to close + lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: replace with a real POST to the sales/contact endpoint or inbox.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    setSent(true);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain p-4 py-[max(1rem,6vh)] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Talk to our team"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="fixed inset-0 cursor-default bg-ink/60 backdrop-blur-[3px] animate-[fade-in_0.25s_ease-out]"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-[860px] overflow-hidden rounded-[16px] border border-subtle-stroke bg-white shadow-frame outline-none animate-fade-in"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-subtle-stroke bg-white/80 text-inkSoft backdrop-blur transition-colors duration-250 ease-settle hover:bg-tertiary-bg hover:text-ink"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" d="M3.5 3.5l8 8M11.5 3.5l-8 8" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Left — the ask */}
          <div className="relative border-b border-lineSoft bg-primary-bg px-6 py-8 md:px-8 lg:border-b-0 lg:border-r">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/60 via-blue/25 to-transparent lg:inset-x-auto lg:bottom-0 lg:left-0 lg:top-0 lg:h-auto lg:w-[3px]" aria-hidden />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
              Talk to our team
            </p>
            <h3 className="mt-4 text-[24px] font-semibold leading-tight tracking-tight text-ink md:text-[28px]">
              Tell us what you&rsquo;re trying to solve.
            </h3>
            <p className="mt-3 max-w-[30em] text-[14.5px] leading-relaxed text-inkSoft">
              A few details are enough to get the right people in the room. We
              read every message ourselves.
            </p>
            <ul className="mt-7 space-y-3.5">
              {assurances.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-[13px] leading-relaxed text-inkSoft">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — the form / confirmation */}
          <div className="px-6 py-8 md:px-8">
            {sent ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-border bg-blue-subtle">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue" fill="none" aria-hidden>
                    <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-ink">
                  Your message is sent, {form.name.split(" ")[0] || "there"}.
                </h3>
                <p className="mt-2 max-w-[26em] text-[14.5px] leading-relaxed text-inkSoft">
                  It&rsquo;s with our team now. Expect a reply within one business
                  day, from a real person who read it.
                </p>
                <button type="button" onClick={close} className="btn-secondary mt-7">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cm-name" className={labelClass}>
                      Full name
                    </label>
                    <input
                      id="cm-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={fieldClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="cm-email" className={labelClass}>
                      Work email
                    </label>
                    <input
                      id="cm-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={fieldClass}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="cm-company" className={labelClass}>
                      Company
                    </label>
                    <input
                      id="cm-company"
                      type="text"
                      required
                      autoComplete="organization"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      className={fieldClass}
                      placeholder="Organisation name"
                    />
                  </div>
                  <div>
                    <label htmlFor="cm-interest" className={labelClass}>
                      I&rsquo;m interested in
                    </label>
                    <select
                      id="cm-interest"
                      value={form.interest}
                      onChange={(e) => update("interest", e.target.value)}
                      className={`${fieldClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22><path d=%22M2.5 4.5L6 8l3.5-3.5%22 stroke=%22%236f7988%22 stroke-width=%221.4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9 ${form.interest ? "text-ink" : "text-tertiary-text"}`}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {interests.map((opt) => (
                        <option key={opt} value={opt} className="text-ink">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="cm-message" className={labelClass}>
                    What are you trying to solve?
                  </label>
                  <textarea
                    id="cm-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={`${fieldClass} h-auto resize-none py-3 leading-relaxed`}
                    placeholder="A sentence or two on the data problem, systems involved, or outcome you're after."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary mt-5 h-11 w-full text-[15px] disabled:opacity-70"
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>

                <p className="mt-3 text-center text-[12px] leading-relaxed text-tertiary-text">
                  By sending this you agree we may contact you about your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
