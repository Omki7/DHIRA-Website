"use client";

/*
 * ContactModal — the single "Talk to our team" dialog for the whole site.
 *
 * Mounted once in the root layout. Intercepts clicks on contact anchors (#talk-to-our-team, #get-started, #briefing-form).
 * Enhanced with smooth framer-motion micro-animations, real-time completion progress, and interactive focus states.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUi } from "@/shared/providers/UiProvider";
import { ContactForm } from "../ContactForm";
import styles from "./ContactModal.module.scss";

/* Copy: content/ui.ts `contactModal` (the assurances keep their ids, which
   pick the icon). */

const CONTACT_HASHES = ["#talk-to-our-team", "#get-started", "#briefing-form"];

function AssuranceIcon({ type }: { type: string }) {
  if (type === "discovery") {
    return (
      <span className={styles.assuranceIcon}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M4.5 1.5v3M9.5 1.5v3M2 6h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (type === "response") {
    return (
      <span className={styles.assuranceIcon}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M7 4.5V7l1.8 1.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className={styles.assuranceIcon}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 2L2.5 4v4c0 3 4.5 4.5 4.5 4.5s4.5-1.5 4.5-4.5V4L7 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function ContactModal() {
  const { contactModal: copy } = useUi();
  const [open, setOpen] = useState(false);
  /* Each open mounts a fresh form, so a sent message never shows on reopen. */
  const [session, setSession] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function checkHash() {
      if (typeof window !== "undefined" && CONTACT_HASHES.includes(window.location.hash)) {
        setSession((n) => n + 1);
        setProgressPercent(0);
        setOpen(true);
      }
    }
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

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
          className={styles.overlay}
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
            className={styles.backdrop}
          />

          {/* Dialog Container with spring animation */}
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className={styles.dialog}
          >
            {/* Top Interactive Progress Bar */}
            <div className={styles.progress}>
              <motion.div
                className={styles.progressFill}
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
              className={styles.close}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            </button>

            <div className={styles.columns}>
              {/* Left Column — The Ask (Light Clean Panel with Subtle Ambient Grid & Vertical Accent Bar) */}
              <div className={styles.ask}>
                
                

                <div className={styles.askBody}>
                  {/* Status Badge */}
                  <div className={styles.badge}>
                    <span className={styles.pulse}>
                      <span className={styles.pulseRing} />
                      <span className={styles.pulseDot} />
                    </span>
                    <span className={styles.upper}>{copy.badge}</span>
                  </div>

                  <h3 className={styles.title}>
                    {copy.title}
                  </h3>
                  <p className={styles.body}>
                    {copy.body}
                  </p>

                  {/* Staggered Assurances */}
                  <ul className={styles.assurances}>
                    {copy.assurances.map((item, idx) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.08, duration: 0.3 }}
                        className={styles.assurance}
                      >
                        <AssuranceIcon type={item.id} />
                        <div>
                          <p className={styles.assuranceTitle}>{item.title}</p>
                          <p className={styles.assuranceText}>{item.text}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className={styles.askFooter}>
                  <span className={styles.upper}>{copy.footerLeft}</span>
                  <span>{copy.footerRight}</span>
                </div>
              </div>

              {/* Right Column — The Form */}
              <div className={styles.formColumn}>
                <ContactForm key={session} idPrefix="cm" onProgress={setProgressPercent} onDone={close} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
