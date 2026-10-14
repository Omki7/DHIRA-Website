import ScrollReveal from "@/components/ui/ScrollReveal";
import UCFeatureIcon from "./UCFeatureIcon";

/* WHAT YOUR AI STANDS ON (22 Sep 2026, second pass). The first half of the
   defining sentence above ("makes your data ready for AI"), itemised. These
   are the five things a model needs from an organisation before its answers
   can be trusted, named in current industry terms, each with the one line
   that makes it concrete.

   Why not outcomes ("One number everyone trusts", "Early warning"): that set
   read as simplified, and it restated [01] and [06] ("zero manual
   reconciliation") instead of saying anything new. Why not the old
   capability list ("Every source, connected", "Governed by default"): it was
   the step rail again, and it duplicated the logo band and [08].

   Division of labour inside [02], so nothing is said twice:
     tiles      = what your AI knows       (entities, semantics, documents,
                                            context, lineage)
     step rail  = what your AI does        (find, reason, answer, audit)
     logo band  = what it plugs into
     close      = what the platform is made of (the seven modules)
   Sources, security and "one platform" are deliberately absent: the logo
   band, [08] and [06] own them. */
// Titles are current industry terms (22 Sep 2026, user direction): "metrics"
// and "golden records" read as the BI and MDM era. Captions are balanced to
// 10 to 12 words and ~62 to 68 characters so the five set to the same number
// of lines; keep any rewrite inside that band.
const FEATURES = [
  {
    title: "Entity resolution",
    sub: "Each customer, citizen and asset resolved into one record.",
  },
  {
    title: "Semantic layer",
    sub: "Business terms defined once, so every dashboard and AI agrees.",
  },
  {
    title: "Document intelligence",
    sub: "Contracts, forms and emails read and tied to the right records.",
  },
  {
    title: "Knowledge layer",
    sub: "The relationships, hierarchies and policies that give AI its context.",
  },
  {
    title: "Data lineage",
    sub: "Every figure traced back to its source record, as of any date.",
  },
];

export default function UCFeatureGrid() {
  return (
    <div className="relative grid grid-cols-1 border-t border-uc-line lg:grid-cols-5">
      {FEATURES.map((feature, i) => (
        /* Top-aligned, not `justify-between`: bottom-aligning the copy put
           each title at a different height whenever one caption ran a line
           longer than its neighbours, so the strip read as ragged. */
        <ScrollReveal
          key={feature.title}
          delay={i * 70}
          className="flex flex-col gap-6 px-6 py-8 first:pl-6 last:pr-6 max-lg:items-center max-lg:text-center max-lg:[&:not(:first-child)]:border-t md:first:pl-10 md:last:pr-10 lg:gap-12 lg:px-7 lg:pb-12 lg:pt-10 lg:[&:not(:first-child)]:border-l [&:not(:first-child)]:border-uc-stroke xl:first:pl-14 xl:last:pr-14"
        >
          <UCFeatureIcon index={i} className="size-8 text-uc-mute" />
          <div className="flex flex-col gap-2">
            <h3 className="text-balance font-sans text-[16px] font-semibold leading-snug text-uc-text">
              {feature.title}
            </h3>
            <p className="max-w-[24em] text-balance text-[14px] leading-relaxed text-uc-mute">
              {feature.sub}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
