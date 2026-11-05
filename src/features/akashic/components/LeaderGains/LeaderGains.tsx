import type { AkashicAdvantage } from "@/content/pages/akashic";
import { ArchitectureIcon } from "../AkashicModules/ArchitectureIcon";
import styles from "./LeaderGains.module.scss";

/*
 * [08] The payoff under the groundwork drawing: what one shared foundation
 * changes for each executive. Drawn in [05]'s language (a solid layer tab
 * beside its body) so the two figures read as one system. Each role is a
 * heading; its gain and the reason follow. Static: nothing to operate.
 */
export interface LeaderGainsProps {
  content: AkashicAdvantage["leaders"];
}

export function LeaderGains({ content: c }: LeaderGainsProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.tab}>
        <ArchitectureIcon name="people" className={styles.tabIcon} />
        <div>
          <h3 id="leader-gains" className={styles.key}>
            {c.key}
          </h3>
          <p className={styles.verb}>{c.verb}</p>
        </div>
      </div>
      <ul className={styles.roles} aria-labelledby="leader-gains">
        {c.roles.map((role) => (
          <li key={role.id} className={styles.role}>
            <h4 className={styles.title}>
              <span className={styles.mark}>
                <ArchitectureIcon name={role.icon} className={styles.icon} />
              </span>
              {role.role}
            </h4>
            <p className={styles.gain}>{role.gain}</p>
            <p className={styles.detail}>{role.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
