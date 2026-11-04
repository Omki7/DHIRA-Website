import type { GlossaryTerm } from "@/content/collections/glossary";

/** Terms grouped by first letter, A to Z, for the /glossary index. */
export function groupByLetter(terms: GlossaryTerm[]) {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term));
  const groups = new Map<string, GlossaryTerm[]>();
  for (const item of sorted) {
    const letter = item.term[0].toUpperCase();
    groups.set(letter, [...(groups.get(letter) ?? []), item]);
  }
  return Array.from(groups, ([letter, terms]) => ({ letter, terms }));
}

export type LetterGroup = ReturnType<typeof groupByLetter>[number];
