import { AkashicWordmark } from "@/shared/components/icons";
import styles from "./AkashicCardChrome.module.scss";

export interface CapillaryProps {
  bright?: boolean;
}

/* The page's signature edge: a 3px blue capillary that tops every Akashic
   card. `bright` is the variant used on the dark anchor ground. */
export function Capillary({ bright = false }: CapillaryProps) {
  return (
    <div
      className={bright ? styles.capillaryBright : styles.capillary}
      aria-hidden
    />
  );
}

export interface LiveChipProps {
  label?: string;
}

export function LiveChip({ label = "LIVE" }: LiveChipProps) {
  return (
    <span className={styles.liveChip}>
      <span className={styles.liveDot} />
      <span className={styles.liveLabel}>{label}</span>
    </span>
  );
}

export interface BlueChipProps {
  label: string;
}

export function BlueChip({ label }: BlueChipProps) {
  return <span className={styles.blueChip}>{label}</span>;
}

export interface AkashicMarkProps {
  className?: string;
}

/* The Akashic wordmark badge (design direction, Jul 2026: show the brand
   mark, not a stack diagram). */
export function AkashicMark({ className = "" }: AkashicMarkProps) {
  return (
    <div className={className ? `${styles.mark} ${className}` : styles.mark}>
      <AkashicWordmark className={styles.wordmark} />
    </div>
  );
}
