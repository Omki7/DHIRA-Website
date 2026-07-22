"use client";

/*
 * ContactModal — the single "Talk to our team" dialog for the whole site.
 *
 * Mounted once in the root layout. Intercepts clicks on contact anchors (#talk-to-our-team, #get-started, #briefing-form).
 * Enhanced with smooth framer-motion micro-animations, real-time completion progress, and interactive focus states.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Interest = "Platform deployment" | "Product build" | "Advisory" | "Just exploring";

const interests: Interest[] = [
  "Platform deployment",
  "Product build",
  "Advisory",
  "Just exploring",
];

const assurances = [
  { id: "disc", title: "30-minute technical discovery", desc: "No pitch deck, just direct engineering dialogue." },
  { id: "resp", title: "Reply within 1 business day", desc: "Read directly by our senior team." },
  { id: "privacy", title: "Strict confidentiality", desc: "Your details stay with us. Nothing shared, nothing sold." },
];

const CONTACT_HASHES = ["#talk-to-our-team", "#get-started", "#briefing-form"];

function AssuranceIcon({ type }: { type: string }) {
  if (type === "disc") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-btn border border-blue-border/70 bg-blue-subtle text-blue transition-colors group-hover:bg-blue group-hover:text-white">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M4.5 1.5v3M9.5 1.5v3M2 6h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (type === "resp") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-btn border border-blue-border/70 bg-blue-subtle text-blue transition-colors group-hover:bg-blue group-hover:text-white">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M7 4.5V7l1.8 1.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-btn border border-blue-border/70 bg-blue-subtle text-blue transition-colors group-hover:bg-blue group-hover:text-white">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 2L2.5 4v4c0 3 4.5 4.5 4.5 4.5s4.5-1.5 4.5-4.5V4L7 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: "" as "" | Interest,
    message: "",
  });

  // Calculate form completion percentage for the micro progress bar
  const filledCount = [form.name, form.email, form.company, form.interest, form.message].filter(Boolean).length;
  const progressPercent = Math.round((filledCount / 5) * 100);

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const close = useCallback(() => setOpen(false), []);

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
    await new Promise((resolve) => setTimeout(resolve, 750));
    setSubmitting(false);
    setSent(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overscroll-contain p-4 py-[max(1rem,5vh)] sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Talk to our team"
        >
          {/* Backdrop with smooth blur fade */}
          <motion.button
            type="button"
            aria-label="Close modal"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 cursor-default bg-ink/50 backdrop-blur-md"
          />

          {/* Dialog Container with spring animation */}
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative z-10 w-full max-w-[880px] overflow-hidden rounded-frame border border-subtle-stroke bg-white shadow-frame outline-none"
          >
            {/* Top Interactive Progress Bar */}
            <div className="h-1 w-full bg-tertiary-bg">
              <motion.div
                className="h-full bg-gradient-to-r from-blue via-blue to-blue-hover"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3.5 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-subtle-stroke bg-white/90 text-secondary-text shadow-xs backdrop-blur transition-all duration-200 hover:bg-tertiary-bg hover:text-primary-text hover:scale-105"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" d="M3.5 3.5l8 8M11.5 3.5l-8 8" />
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
              {/* Left Column — The Ask (Light Clean Panel with Subtle Ambient Grid & Vertical Accent Bar) */}
              <div className="relative flex flex-col justify-between border-b border-lineSoft bg-primary-bg px-6 py-8 md:px-8 lg:border-b-0 lg:border-r">
                <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-blue via-blue/50 to-transparent" aria-hidden />

                <div className="relative z-10">
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-border/50 bg-blue-subtle/60 px-2.5 py-1 text-[11px] font-semibold text-blue">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
                    </span>
                    <span>TALK TO OUR TEAM</span>
                  </div>

                  <h3 className="mt-4 text-[24px] font-semibold leading-tight tracking-tight text-primary-text md:text-[28px]">
                    Tell us what you&rsquo;re trying to solve.
                  </h3>
                  <p className="mt-3 max-w-[28em] text-[14px] leading-relaxed text-secondary-text">
                    A few details are enough to get the right people in the room. We read every message directly.
                  </p>

                  {/* Staggered Assurances */}
                  <ul className="mt-7 space-y-3">
                    {assurances.map((item, idx) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.08, duration: 0.3 }}
                        className="group flex items-start gap-3 rounded-card border border-subtle-stroke/80 bg-white/80 p-2.5 shadow-xs transition-all duration-200 hover:border-blue-border hover:bg-white hover:shadow-sm"
                      >
                        <AssuranceIcon type={item.id} />
                        <div>
                          <p className="text-[13px] font-semibold text-primary-text leading-tight">{item.title}</p>
                          <p className="mt-0.5 text-[12px] text-secondary-text leading-snug">{item.desc}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-8 pt-4 border-t border-lineSoft flex items-center justify-between text-[11px] font-mono text-tertiary-text">
                  <span>DHIRA TECH SQUAD</span>
                  <span>NY &middot; HYD &middot; BLR</span>
                </div>
              </div>

              {/* Right Column — The Form */}
              <div className="px-6 py-8 md:px-8 bg-white relative z-10">
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
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-border bg-blue-subtle text-blue shadow-xs"
                      >
                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
                          <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.span>
                      <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-primary-text">
                        Your message is sent{form.name ? `, ${form.name.split(" ")[0]}` : ""}.
                      </h3>
                      <p className="mt-2.5 max-w-[26em] text-[14px] leading-relaxed text-secondary-text">
                        It&rsquo;s with our team now. Expect a reply within one business day from a real engineer who read it.
                      </p>
                      <button type="button" onClick={close} className="btn-secondary mt-7 px-6">
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="cm-name" className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-tertiary-text">
                            Full name
                          </label>
                          <input
                            id="cm-name"
                            type="text"
                            required
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            className="h-11 w-full rounded-[10px] border border-subtle-stroke bg-white px-3.5 text-[14px] text-primary-text shadow-input transition-all duration-200 placeholder:text-tertiary-text focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
                            placeholder="Veman Chippa"
                          />
                        </div>
                        <div>
                          <label htmlFor="cm-email" className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-tertiary-text">
                            Work email
                          </label>
                          <input
                            id="cm-email"
                            type="email"
                            required
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            className="h-11 w-full rounded-[10px] border border-subtle-stroke bg-white px-3.5 text-[14px] text-primary-text shadow-input transition-all duration-200 placeholder:text-tertiary-text focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
                            placeholder="veman.chippa@dhira.ai"
                          />
                        </div>
                        <div>
                          <label htmlFor="cm-company" className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-tertiary-text">
                            Company
                          </label>
                          <input
                            id="cm-company"
                            type="text"
                            required
                            autoComplete="organization"
                            value={form.company}
                            onChange={(e) => update("company", e.target.value)}
                            className="h-11 w-full rounded-[10px] border border-subtle-stroke bg-white px-3.5 text-[14px] text-primary-text shadow-input transition-all duration-200 placeholder:text-tertiary-text focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
                            placeholder="Dhira ai"
                          />
                        </div>
                        <div>
                          <label htmlFor="cm-interest" className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-tertiary-text">
                            I&rsquo;m interested in
                          </label>
                          <select
                            id="cm-interest"
                            value={form.interest}
                            onChange={(e) => update("interest", e.target.value as Interest)}
                            className={`h-11 w-full rounded-[10px] border border-subtle-stroke bg-white px-3.5 text-[14px] shadow-input transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22><path d=%22M2.5 4.5L6 8l3.5-3.5%22 stroke=%22%236f7988%22 stroke-width=%221.4%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15 ${
                              form.interest ? "text-primary-text" : "text-tertiary-text"
                            }`}
                          >
                            <option value="" disabled>
                              Select one
                            </option>
                            {interests.map((opt) => (
                              <option key={opt} value={opt} className="text-primary-text">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cm-message" className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-tertiary-text">
                          What are you trying to solve?
                        </label>
                        <textarea
                          id="cm-message"
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          className="w-full rounded-[10px] border border-subtle-stroke bg-white px-3.5 py-3 text-[14px] leading-relaxed text-primary-text shadow-input transition-all duration-200 resize-none placeholder:text-tertiary-text focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
                          placeholder="Tell us about your data challenge, project goals, or questions..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary mt-5 h-11 w-full text-[15px] font-semibold transition-all duration-200 hover:shadow-md disabled:opacity-70 flex items-center justify-center gap-2 group"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending message…
                          </span>
                        ) : (
                          <>
                            <span>Send message</span>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                              <path fillRule="evenodd" clipRule="evenodd" d="M10.85 6.85a.5.5 0 0 0 0-.7L8.35 3.65a.5.5 0 1 0-.7.7L9.29 6H2.5a.5.5 0 0 0 0 1h6.79L7.65 8.65a.5.5 0 1 0 .7.7l2.5-2.5Z" fill="currentColor" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="mt-3 text-center text-[12px] leading-relaxed text-tertiary-text">
                        By sending this you agree we may contact you about your enquiry.
                      </p>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
