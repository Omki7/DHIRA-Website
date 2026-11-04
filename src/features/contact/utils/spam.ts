import "server-only";
import type { ContactEnquiry } from "../schemas/contact.schema";

/* Spam checks for the contact form (4 Nov 2026, user: the live site gets
   about 50 spam messages a day, from bots and people). Two kinds, run by
   actions/contact.action.ts:
   - isBot: proof that no person filled the form in. The action drops the
     message and still reports it sent, so the bot learns nothing.
   - spamFlags: signs of spam that a person could also send. These never
     block. The message is delivered marked as suspected spam, so a real
     enquiry is never lost to a false match.
   Server-only, so the rules never ship to the browser. */

/** A person needs longer than this to fill in the form and write a message. */
const MIN_FILL_MS = 3000;

export interface BotTraps {
  /** The honeypot field's value. People never see the field. */
  honeypot: string;
  /** Milliseconds the form was open, as the form reported it. */
  elapsed: string;
}

export function isBot({ honeypot, elapsed }: BotTraps): boolean {
  if (honeypot !== "") return true;
  /* No timing means the request did not come from the form at all. */
  const ms = Number(elapsed);
  return elapsed === "" || !Number.isFinite(ms) || ms < MIN_FILL_MS;
}

export type SpamFlag =
  /** More links in the message than an enquiry needs. */
  | "links"
  /** A link in the name or company field. */
  | "link-in-name"
  /** A stock spam pitch: SEO, backlinks, crypto, casino and the like. */
  | "pitch"
  /** Written in a script the team does not read (Cyrillic, Chinese, Japanese, Korean). */
  | "script"
  /** The message repeats the name or the company. */
  | "repeated";

const LINK = /https?:\/\/|www\.|\[url=|<a\s/gi;
const MAX_LINKS = 2;
const PITCH =
  /\b(seo|backlinks?|link building|guest posts?|sponsored posts?|dofollow|first page of google|rank(ing)? (on|in) google|(boost|increase) (your )?(website )?traffic|buy followers|crypto(currency)?|bitcoin|forex|casino|viagra|cialis)\b/i;
const FOREIGN_SCRIPT = /[\p{Script=Cyrillic}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;

export function spamFlags({ name, company, message }: ContactEnquiry): SpamFlag[] {
  const flags: SpamFlag[] = [];
  if ((message.match(LINK) ?? []).length > MAX_LINKS) flags.push("links");
  if (`${name} ${company}`.match(LINK)) flags.push("link-in-name");
  if (PITCH.test(`${company} ${message}`)) flags.push("pitch");
  if (FOREIGN_SCRIPT.test(`${name} ${company} ${message}`)) flags.push("script");
  const said = message.toLowerCase();
  if (said === name.toLowerCase() || said === company.toLowerCase()) flags.push("repeated");
  return flags;
}
