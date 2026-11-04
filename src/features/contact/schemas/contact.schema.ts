import { z } from "zod";

/* The contact form's rules, written once: the form checks them before it
   sends, and actions/contact.action.ts checks them again on the server,
   where they count. The form also takes its maxLength attributes from
   CONTACT_LIMITS, so a person never meets a length error. Error copy:
   content/ui.ts `contactForm.errors`. */

/** The enquiry fields, in form order (the first invalid one takes focus). */
export const CONTACT_FIELDS = ["name", "email", "company", "interest", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export const CONTACT_LIMITS: Record<ContactField, number> = {
  name: 100,
  email: 254,
  company: 150,
  interest: 100,
  message: 5000,
};

/* The bot traps (utils/spam.ts). `honeypot` is a field people never see;
   `elapsed` is how long the form was open, added by the form when it
   sends, so it is not in the page's HTML for a bot to copy. */
export const TRAP_FIELDS = { honeypot: "website", elapsed: "elapsed" } as const;

/** `interest` is optional, and otherwise one of the form's own options. */
const contactSchema = (interestOptions: readonly string[]) =>
  z.object({
    name: z.string().trim().min(1).max(CONTACT_LIMITS.name),
    email: z.string().trim().toLowerCase().max(CONTACT_LIMITS.email).email(),
    company: z.string().trim().min(1).max(CONTACT_LIMITS.company),
    interest: z
      .string()
      .trim()
      .max(CONTACT_LIMITS.interest)
      .refine((value) => value === "" || interestOptions.includes(value)),
    message: z.string().trim().min(1).max(CONTACT_LIMITS.message),
  });

export type ContactEnquiry = z.infer<ReturnType<typeof contactSchema>>;

export type ContactCheck = { ok: true; enquiry: ContactEnquiry } | { ok: false; fields: ContactField[] };

/** Check raw field values. Invalid fields come back in form order. */
export function checkContact(values: Record<ContactField, string>, interestOptions: readonly string[]): ContactCheck {
  const parsed = contactSchema(interestOptions).safeParse(values);
  if (parsed.success) return { ok: true, enquiry: parsed.data };
  const fields = CONTACT_FIELDS.filter((field) => parsed.error.issues.some((issue) => issue.path[0] === field));
  return { ok: false, fields };
}
