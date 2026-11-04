"use server";

import { getUiStrings } from "@/services/content/content";
import { TRAP_FIELDS, checkContact, type ContactEnquiry, type ContactField } from "../schemas/contact.schema";
import { isBot, spamFlags, type SpamFlag } from "../utils/spam";

/* The "Talk to our team" form (components/ContactForm, in the modal and on
   /contact). Spam protection added 4 Nov 2026 (user: the live site gets
   about 50 spam messages a day). Every check is invisible to people, in
   this order:
   1. Bot traps (utils/spam.ts): the hidden honeypot field and a minimum
      time on the form. A bot that trips one is told its message was sent,
      so it learns nothing, and nothing is kept.
   2. Validation (schemas/contact.schema.ts): every field again, never
      trusted from the browser.
   3. Content flags (utils/spam.ts): signs of spam a person could also send.
      The message is still delivered, marked for review.
   A Server Action, so the browser posts to this site only (the CSP's
   `form-action 'self'` holds) and a mail or CRM key, once there is one,
   stays on the server. Status copy: content/ui.ts `contactForm`. */

export type ContactState =
  | { status: "sent" }
  | { status: "invalid"; fields: ContactField[] }
  | { status: "failed" };

export async function sendContactMessage(form: FormData): Promise<ContactState> {
  const field = (name: string) => {
    const value = form.get(name);
    return typeof value === "string" ? value : "";
  };

  if (isBot({ honeypot: field(TRAP_FIELDS.honeypot), elapsed: field(TRAP_FIELDS.elapsed) })) return { status: "sent" };

  const { contactForm } = await getUiStrings();
  const check = checkContact(
    { name: field("name"), email: field("email"), company: field("company"), interest: field("interest"), message: field("message") },
    contactForm.interest.options,
  );
  if (!check.ok) return { status: "invalid", fields: check.fields };

  const flags = spamFlags(check.enquiry);
  const delivered = await deliver({ ...check.enquiry, suspectedSpam: flags.length > 0, flags });
  return delivered ? { status: "sent" } : { status: "failed" };
}

interface ContactSubmission extends ContactEnquiry {
  /** True when any content flag matched: deliver it, marked for review. */
  suspectedSpam: boolean;
  flags: SpamFlag[];
}

/* SIMULATED, like the footer sign-up (docs/STATE_AND_DATA.md, Forms):
   nothing is sent yet, and the form shows its thank-you.
   HAND-OFF: send `submission` to the team's inbox or the CRM here, with
   the keys in config/env.ts (server-only). When `suspectedSpam` is true,
   start the subject with "[Suspected spam]" or file it in a review folder;
   never drop it. Return false when the send fails, and the form asks the
   visitor to try again. */
async function deliver(submission: ContactSubmission): Promise<boolean> {
  void submission;
  return true;
}
