"use client";

/*
 * ContactModal — the single "Talk to our team" dialog for the whole site.
 *
 * Mounted once in the root layout. Intercepts clicks on contact anchors (#talk-to-our-team, #get-started, #briefing-form).
 * Enhanced with smooth framer-motion micro-animations, real-time completion progress, and interactive focus states.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "@/components/layout/ContactForm";
import { useUi } from "@/components/providers/UiProvider";

/* Copy: content/ui.ts `contactModal` (the assurances keep their ids, which
   pick the icon). */

const CONTACT_HASHES = ["#talk-to-our-team", "#get-started", "#briefing-form"];

function AssuranceIcon({ type }: { type: string }) {
  if (type === "discovery") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-btn border border-blue-border/70 bg-blue-subtle text-blue transition-colors group-hover:bg-blue-solid group-hover:text-on-accent">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M4.5 1.5v3M9.5 1.5v3M2 6h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (type === "response") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-btn border border-blue-border/70 bg-blue-subtle text-blue transition-colors group-hover:bg-blue-solid group-hover:text-on-accent">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M7 4.5V7l1.8 1.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-btn border border-blue-border/70 bg-blue-subtle text-blue transition-colors group-hover:bg-blue-solid group-hover:text-on-accent">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 2L2.5 4v4c0 3 4.5 4.5 4.5 4.5s4.5-1.5 4.5-4.5V4L7 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function ContactModal() {
  const { contactModal: copy } = useUi();
  const [open, setOpen] = useState(false);
  /* Each open mounts a fresh form, so a sent message never shows on reopen. */
  const [session, setSession] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      // The section rail visits the closing section; only its CTA opens this dialog.
      if (anchor.hasAttribute("data-section-link")) return;
      const href = anchor.getAttribute("href") || "";
      const hash = href.includes("#") ? `#${href.split("#")[1]}` : "";
      if (!CONTACT_HASHES.includes(hash)) return;
      e.preventDefault();
      setSession((n) => n + 1);
      setProgressPercent(0);
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

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overscroll-contain p-4 py-[max(1rem,5vh)] sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={copy.dialogLabel}
        >
          {/* Backdrop with smooth blur fade */}
          <motion.button
            type="button"
            aria-label={copy.closeBackdrop}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 cursor-default bg-scrim/60 "
          />

          {/* Dialog Container with spring animation */}
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative z-10 w-full max-w-[880px] overflow-hidden rounded-frame border border-subtle-stroke bg-background  outline-none"
          >
            {/* Top Interactive Progress Bar */}
            <div className="h-1 w-full bg-tertiary-bg">
              <motion.div
                className="h-full bg-blue-subtle"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={close}
              aria-label={copy.close}
              className="absolute right-3.5 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-subtle-stroke bg-background text-secondary-text   transition-all duration-200 hover:bg-tertiary-bg hover:text-primary-text hover:scale-105"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" d="M3.5 3.5l8 8M11.5 3.5l-8 8" />
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
              {/* Left Column — The Ask (Light Clean Panel with Subtle Ambient Grid & Vertical Accent Bar) */}
              <div className="relative flex flex-col justify-between border-b border-lineSoft bg-primary-bg px-6 py-8 md:px-8 lg:border-b-0 lg:border-r">
                
                

                <div className="relative z-10">
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-border/50 bg-blue-subtle px-2.5 py-1 text-[11px] font-semibold text-blue">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
                    </span>
                    <span className="uppercase">{copy.badge}</span>
                  </div>

                  <h3 className="mt-4 text-[24px] font-semibold leading-tight tracking-tight text-primary-text md:text-[28px]">
                    {copy.title}
                  </h3>
                  <p className="mt-3 max-w-[28em] text-[14px] leading-relaxed text-secondary-text">
                    {copy.body}
                  </p>

                  {/* Staggered Assurances */}
                  <ul className="mt-7 space-y-3">
                    {copy.assurances.map((item, idx) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.08, duration: 0.3 }}
                        className="group flex items-start gap-3 rounded-card border border-subtle-stroke/80 bg-background p-2.5  transition-all duration-200 hover:border-blue-border hover:bg-background "
                      >
                        <AssuranceIcon type={item.id} />
                        <div>
                          <p className="text-[13px] font-semibold text-primary-text leading-tight">{item.title}</p>
                          <p className="mt-0.5 text-[12px] text-secondary-text leading-snug">{item.text}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-8 pt-4 border-t border-lineSoft flex items-center justify-between text-[11px] font-mono text-tertiary-text">
                  <span className="uppercase">{copy.footerLeft}</span>
                  <span>{copy.footerRight}</span>
                </div>
              </div>

              {/* Right Column — The Form */}
              <div className="px-6 py-8 md:px-8 bg-background relative z-10">
                <ContactForm key={session} idPrefix="cm" onProgress={setProgressPercent} onDone={close} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
