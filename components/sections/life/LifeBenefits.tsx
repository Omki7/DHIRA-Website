/*
 * [03] What it changes — four claims, zig-zagged.
 *
 * Continues the navy from [02] so the two read as one dark movement. The
 * items alternate across a centre rule with a great deal of air between
 * them: at this size the reader takes one claim per screen, which is the
 * point. A four-up card grid would put them all in view at once and none of
 * them would land.
 *
 * Icons are drawn here rather than imported because they are one-offs at one
 * weight, and the page's whole line language is 1.4px cyan strokes.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { LifeEyebrow, LifeCornerArc } from "@/components/ui/life/LifeChrome";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className="h-11 w-11 shrink-0 stroke-life-sky"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const benefits = [
  {
    icon: (
      <Icon>
        <path d="M20 34C20 34 5.5 25.5 5.5 16C5.5 10.8 9.4 7 13.9 7C16.6 7 19 8.8 20 10.8C21 8.8 23.4 7 26.1 7C30.6 7 34.5 10.8 34.5 16C34.5 25.5 20 34 20 34Z" />
        <path d="M7.5 18.5H14.5L17.5 12.5L22.5 25L25 18.5H32.5" />
      </Icon>
    ),
    head: "She is caught before the emergency",
    body: "Severe risk is flagged at the visit, not on the fourth day. The window that decides the outcome is the one the system now sits inside.",
  },
  {
    icon: (
      <Icon>
        <rect x="12.5" y="4.5" width="15" height="31" rx="3" />
        <path d="M17.5 31H22.5" />
        <path d="M15.5 19H18L20 14.5L23 24L24.5 19H26" />
      </Icon>
    ),
    head: "It works where nothing else does",
    body: "No broadband, no lab, no specialist within reach. The whole screen is read on the handset a frontline worker is already carrying.",
  },
  {
    icon: (
      <Icon>
        <path d="M4 7.5L19 20" />
        <path d="M4 20H19" />
        <path d="M4 32.5L19 20" />
        <path d="M22.5 20H29" />
        <circle cx="20.4" cy="20" r="1.7" className="fill-life-sky" stroke="none" />
        <rect x="29.5" y="15.5" width="9" height="9" />
      </Icon>
    ),
    head: "One mother, one record",
    body: "The health worker, the primary health centre and the district hospital read the same golden record. Not three versions of her that somebody has to reconcile later.",
  },
  {
    icon: (
      <Icon>
        <path d="M5.5 12L14.5 7.5L25.5 12L34.5 7.5V28L25.5 32.5L14.5 28L5.5 32.5V12Z" />
        <path d="M14.5 7.5V28M25.5 12V32.5" />
        <circle cx="20" cy="18.5" r="2.6" className="fill-life-sky" />
      </Icon>
    ),
    head: "The district view is finally live",
    body: "Every reading aggregates upward, anonymised, so administrators watch risk building in a block while there is still time to move people and supplies to it.",
  },
];

export default function LifeBenefits() {
  return (
    <section id="what-changes" className="relative scroll-mt-20 bg-life-abyss">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(200deg,#0B1E4E_0%,#0A0E24_44%,#0A0E24_100%)]"
      />
      <LifeCornerArc />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <ScrollReveal className="flex flex-col items-center pt-28 text-center lg:pt-36">
          <LifeEyebrow num="03">What it changes</LifeEyebrow>
          <h2 className="mt-9 max-w-[16em] text-[30px] font-medium leading-[1.28] tracking-[-0.005em] text-white sm:text-[36px] lg:text-[42px]">
            Edge AI collapses the referral chain into a single visit.
          </h2>
        </ScrollReveal>

        <div className="relative mt-24 pb-28 lg:mt-36 lg:pb-40">
          {/* The centre rule the items hang off. */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-1/2 hidden w-px bg-white/[0.14] lg:block"
          />

          {benefits.map((benefit, i) => (
            <div
              key={benefit.head}
              className="grid grid-cols-1 py-12 lg:grid-cols-2 lg:py-0"
            >
              <div
                className={
                  i % 2 === 0
                    ? "lg:col-start-2 lg:pl-16 lg:pt-24 xl:pl-24"
                    : "lg:col-start-1 lg:row-start-1 lg:pr-16 lg:pt-[19rem]"
                }
              >
                <ScrollReveal className="max-w-[27em] lg:max-w-[26em]">
                  {benefit.icon}
                  <h3 className="mt-7 text-[15px] font-bold uppercase leading-[1.5] tracking-[0.04em] text-life-sky sm:text-[16px]">
                    {benefit.head}
                  </h3>
                  <p className="mt-5 text-[16px] leading-[1.62] text-white/80 sm:text-[17px]">
                    {benefit.body}
                  </p>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
