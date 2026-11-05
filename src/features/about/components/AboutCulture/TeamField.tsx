"use client";

import Image from "next/image";
import { useId, useMemo, type CSSProperties } from "react";
import type { AboutPage } from "@/content/pages/about";
import { MotionToggle } from "@/shared/components/ui/MotionToggle";
import useTour from "@/shared/hooks/useTour";
import { spotlight, spreadEvenly, teamField, type FieldShape } from "../../utils/teamField";
import styles from "./AboutCulture.module.scss";

/* The whole roster as one staggered field of portraits (utils/teamField):
   ten across on phones and tablets, twenty-four on desktop, where background
   dots carry the pattern to the edges. Selecting a person (or the tour)
   brings them forward and their neighbours with them, so the field reads as
   people around the one you are meeting. A missing photograph uses initials,
   and those circles are spread evenly through the field (spreadEvenly).
   Profiles are editorial drafts, not quotations from the people pictured. */
const NARROW: FieldShape = { perRow: 10, ratio: [0.8, 10], fade: 2 };
const WIDE: FieldShape = { perRow: 24, ratio: [1.5, 2.2], fade: 7 };

type PersonStyle = CSSProperties & Record<"--row" | "--column" | "--wide-row" | "--wide-column" | "--near" | "--wide-near", number>;
type FieldStyle = CSSProperties & Record<"--rows" | "--wide-rows", number>;

const initialsOf = (name: string) => name.split(/\s+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("");

export function TeamField({ team }: { team: AboutPage["culture"]["team"] }) {
  const id = useId();
  const members = useMemo(() => spreadEvenly(team.members, (member) => !member.image), [team.members]);
  const [narrow, wide] = useMemo(() => [teamField(members.length, NARROW), teamField(members.length, WIDE)], [members.length]);
  const { ref, active, paused, pick, toggle, hold } = useTour<HTMLFieldSetElement>(members.length, { dwell: 8500 });
  const near = spotlight(narrow, active);
  const wideNear = spotlight(wide, active);
  const fieldStyle: FieldStyle = { "--rows": narrow.rows, "--wide-rows": wide.rows };

  return (
    <fieldset ref={ref} className={styles.team} {...hold}>
      <legend className={styles.srOnly}>{team.label}</legend>
      <div className={styles.field} style={fieldStyle}>
        {[narrow, wide].map((layout, l) => layout.ambient.map((dot, index) => (
          <span key={`dot-${l}-${index}`} className={l ? styles.dotWide : styles.dotNarrow} style={{ gridRow: dot.row, gridColumn: `${dot.column} / span 2`, opacity: dot.opacity }} aria-hidden="true" />
        )))}
        {members.map((member, index) => {
          const placement: PersonStyle = {
            "--row": narrow.people[index].row,
            "--column": narrow.people[index].column,
            "--wide-row": wide.people[index].row,
            "--wide-column": wide.people[index].column,
            "--near": near[index],
            "--wide-near": wideNear[index],
          };
          const describedBy = [member.bio && `${id}-bio-${index}`, member.role && `${id}-role-${index}`].filter(Boolean).join(" ") || undefined;
          return (
            <div key={member.id} className={styles.colleague} style={placement}>
              <input
                id={`${id}-${index}`}
                className={styles.choice}
                type="radio"
                name={id}
                checked={active === index}
                onChange={() => pick(index)}
                onFocus={() => pick(index)}
                aria-describedby={describedBy}
              />
              <label
                htmlFor={`${id}-${index}`}
                className={styles.person}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") pick(index); }}
              >
                <span className={styles.portrait}>
                  {member.image ? (
                    <span className={styles.photoWindow}>
                      <Image
                        src={member.image.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 56px, 46px"
                        className={styles.photo}
                        style={{
                          objectPosition: member.position ?? "50% 40%",
                          ...(member.framing ? {
                            transformOrigin: "0 0",
                            transform: `translate(${50 - member.framing.x * member.framing.scale}%, ${50 - member.framing.y * member.framing.scale}%) scale(${member.framing.scale})`,
                          } : {}),
                        }}
                      />
                    </span>
                  ) : <span className={styles.initials} aria-hidden="true">{initialsOf(member.name)}</span>}
                </span>
                <span className={styles.srOnly}>{member.name}</span>
              </label>
              <div className={styles.profile}>
                {member.bio ? (
                  <>
                    <p id={`${id}-bio-${index}`} className={styles.bio}>{member.bio}</p>
                    <div className={styles.byline}>
                      <h3 className={styles.name}>{member.name}</h3>
                      {member.role && <p id={`${id}-role-${index}`} className={styles.role}>{member.role}</p>}
                    </div>
                  </>
                ) : (
                  /* No profile yet: the name takes the profile's place. */
                  <>
                    <h3 className={styles.bio}>{member.name}</h3>
                    {member.role && <p id={`${id}-role-${index}`} className={`${styles.byline} ${styles.role}`}>{member.role}</p>}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.fieldFooter}>
        <p>{team.hint}</p>
        <MotionToggle paused={paused} onToggle={toggle} controls={team.motionLabel} className={styles.motionToggle} />
      </div>
      <noscript><style>{`.${styles.motionToggle} { display: none; }`}</style></noscript>
    </fieldset>
  );
}
