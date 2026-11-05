import "server-only";
import { resumeFits } from "../schemas/contact.schema";

/* The resume check the server trusts (5 Nov 2026, user: a job application
   may attach a resume). The form already checked the name and size, but a
   request can be sent without the form and a name proves nothing, so this
   checks both again and then reads the file's first bytes: each format
   opens with its own signature. A file whose bytes do not match its
   extension is turned back. Server-only, like utils/spam.ts. */

const SIGNATURES: Record<string, number[]> = {
  /* "%PDF" */
  ".pdf": [0x25, 0x50, 0x44, 0x46],
  /* Word 97 to 2003: the Compound File header. */
  ".doc": [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
  /* Word 2007 and later: a ZIP archive, "PK\x03\x04". */
  ".docx": [0x50, 0x4b, 0x03, 0x04],
};

/** Whether `file` is a PDF or Word resume within the size limit. */
export async function isResume(file: File): Promise<boolean> {
  if (!resumeFits(file)) return false;
  const name = file.name.toLowerCase();
  const extension = Object.keys(SIGNATURES).find((ext) => name.endsWith(ext));
  if (!extension) return false;
  const signature = SIGNATURES[extension];
  const head = new Uint8Array(await file.slice(0, signature.length).arrayBuffer());
  return signature.every((byte, index) => head[index] === byte);
}
