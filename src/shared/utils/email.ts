/* Whether a string is a well formed email address (5 Nov 2026, user: "add
   validation to email in form. not otp or something but at least check if
   the email is proper format"). A format check only: it cannot tell whether
   the mailbox exists, and nothing is sent to it.

   One address, read the way mail servers read one:
   - a name before the @ of at most 64 characters: letters, digits and
     . _ % + - ', with no dot at the start or end and no two dots together;
   - exactly one @;
   - a domain of two or more dot separated parts, each 1 to 63 letters,
     digits or inner hyphens (no hyphen at either end);
   - ending in a top level domain of two or more letters (or an
     internationalised one, xn--…).
   It also turns back the few top level domain typos no real address can
   have (.con, .cmo and the like), the slip that most often loses a reply.
   Letters outside A to Z (é@…) are turned back: rare in business email,
   and many mail systems still refuse them. */

const NAME = /^[a-z0-9_%+'-]+(\.[a-z0-9_%+'-]+)*$/i;
const LABEL = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i;
const TOP_LEVEL = /^([a-z]{2,63}|xn--[a-z0-9-]{1,59})$/i;
const TOP_LEVEL_TYPOS = new Set(["con", "cmo", "ocm", "cpm", "xom", "vom", "comm", "coom"]);

export function isEmail(value: string): boolean {
  const address = value.trim();
  if (address.length > 254) return false;
  const at = address.indexOf("@");
  if (at < 1 || at !== address.lastIndexOf("@")) return false;
  const name = address.slice(0, at);
  if (name.length > 64 || !NAME.test(name)) return false;
  const labels = address.slice(at + 1).split(".");
  if (labels.length < 2 || !labels.every((label) => LABEL.test(label))) return false;
  const topLevel = labels[labels.length - 1].toLowerCase();
  return TOP_LEVEL.test(topLevel) && !TOP_LEVEL_TYPOS.has(topLevel);
}
