import { z } from "zod";
import { isEmail } from "@/shared/utils/email";

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

/* The interest options (content/ui.ts `contactForm.interest`). One of them,
   `careers` ("Joining DHIRA"), makes the form a job application (5 Nov
   2026, user). It is a single option, never the open roles one by one, so
   the form does not depend on the roles board. */
export interface InterestOptions {
  options: readonly string[];
  careers: string;
}

/** Whether the chosen interest makes the form a job application. */
export const isApplication = (interest: string, { careers }: InterestOptions) => interest.trim() === careers;

/* The resume a job application may carry (5 Nov 2026, user). Optional. PDF
   or Word, at most 4 MB: Vercel turns away a request body over 4.5 MB, and
   next.config.mjs raises the Server Action limit (1 MB by default) to fit.
   The form checks the name and size; the server checks them again and reads
   the file's first bytes (utils/resume.ts), since a name proves nothing. */
export const RESUME = {
  field: "resume",
  maxBytes: 4 * 1024 * 1024,
  extensions: [".pdf", ".doc", ".docx"],
  accept:
    ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

/** A field that can come back invalid: the enquiry fields, then the resume. */
export type FormField = ContactField | typeof RESUME.field;

/** Whether a chosen file's name and size are a resume's. */
export const resumeFits = ({ name, size }: { name: string; size: number }) =>
  size > 0 && size <= RESUME.maxBytes && RESUME.extensions.some((extension) => name.toLowerCase().endsWith(extension));

/** `interest` is optional, and otherwise one of the form's own options. An
    application needs no company: a student or someone between jobs has none. */
const contactSchema = ({ options }: InterestOptions, application: boolean) =>
  z.object({
    name: z.string().trim().min(1).max(CONTACT_LIMITS.name),
    email: z.string().trim().toLowerCase().max(CONTACT_LIMITS.email).refine(isEmail),
    company: z.string().trim().min(application ? 0 : 1).max(CONTACT_LIMITS.company),
    interest: z
      .string()
      .trim()
      .max(CONTACT_LIMITS.interest)
      .refine((value) => value === "" || options.includes(value)),
    message: z.string().trim().min(1).max(CONTACT_LIMITS.message),
  });

export type ContactEnquiry = z.infer<ReturnType<typeof contactSchema>>;

export type ContactCheck = { ok: true; enquiry: ContactEnquiry } | { ok: false; fields: ContactField[] };

/** Check raw field values. Invalid fields come back in form order. */
export function checkContact(values: Record<ContactField, string>, interest: InterestOptions): ContactCheck {
  const parsed = contactSchema(interest, isApplication(values.interest, interest)).safeParse(values);
  if (parsed.success) return { ok: true, enquiry: parsed.data };
  const fields = CONTACT_FIELDS.filter((field) => parsed.error.issues.some((issue) => issue.path[0] === field));
  return { ok: false, fields };
}
