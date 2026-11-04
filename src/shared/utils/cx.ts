/* Joins class names, skipping empty values: cx(styles.root, isOpen && styles.open, className). */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
