"use server";

/* The footer sign-up (2 Nov 2026, user: "no newsletter right now, but let's
   capture business emails, so we can send news manually later"). SIMULATED,
   like the contact form (docs/STATE_AND_DATA.md, Forms): the address is
   checked for real, then the form shows its thank-you without saving
   anything. Developers connect the mailing list or CRM at hand-off, at the
   one marked line below. A Server Action, so the browser posts to this site
   only (the CSP's `form-action 'self'` holds) and provider keys, once there
   are some, stay on the server. Status copy lives in content/ui.ts
   `subscribe`. */

export type SubscribeState =
  | { status: "idle" }
  | { status: "done"; email: string }
  /* "failed" is for the backend: return it when the save fails. */
  | { status: "error"; reason: "invalid" | "personal" | "failed" };

/* "Business email": free and personal mailbox providers are turned away
   with a request for a work address. Exact domains, then providers that
   register a country domain for every market (yahoo.co.in, outlook.in). */
const PERSONAL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "ymail.com", "rocketmail.com", "msn.com",
  "icloud.com", "me.com", "mac.com", "aol.com", "proton.me", "protonmail.com",
  "pm.me", "mail.com", "zohomail.com", "zohomail.in", "rediffmail.com",
  "qq.com", "163.com", "126.com", "tutanota.com", "tuta.io", "fastmail.com",
]);
const PERSONAL_FAMILIES = /^(yahoo|hotmail|outlook|live|gmx|yandex)\.[a-z.]+$/;

/* Practical, not RFC 5322: one @, no spaces, a dot in the domain. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribe(_previous: SubscribeState, form: FormData): Promise<SubscribeState> {
  /* Honeypot: a field people never see. A bot that fills it is told it
     succeeded and nothing is saved. */
  if (String(form.get("website") ?? "") !== "") return { status: "done", email: "" };

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) return { status: "error", reason: "invalid" };
  const domain = email.slice(email.lastIndexOf("@") + 1);
  if (PERSONAL_DOMAINS.has(domain) || PERSONAL_FAMILIES.test(domain)) return { status: "error", reason: "personal" };

  /* HAND-OFF: save the sign-up here, e.g. { email, page: form.get("page"),
     source: "footer" } to the mailing list or CRM, with its keys in
     lib/env.ts. On failure return { status: "error", reason: "failed" }. */
  return { status: "done", email };
}
