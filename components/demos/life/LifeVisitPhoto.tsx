/*
 * The hero photograph, treated.
 *
 * A frontline health worker taking a reading at the point of care, which is
 * the act the whole page describes. Stock under a free commercial licence
 * (Pexels — the same footing as the Unsplash shots already in `public/proof/`;
 * no attribution required, commercial use permitted).
 *
 * Three drawn attempts preceded this and all three were rejected: a contour
 * profile (read as a morgue scan), the handset mockup (read as generic), and
 * two silhouettes (read as a pictogram). The lesson is in the file: a page
 * about people needs a photograph of people.
 *
 * CROPPED TO THE GESTURE, NOT THE PEOPLE (user direction, 23 Jul 2026). The
 * full frame is an outdoor clinic in West Africa, and every face, headwrap and
 * wall in it announced a country this product is not deployed in, on a page
 * whose copy is India-coded throughout (health worker, PHC, district
 * hospital, crore). That mismatch is a claim we cannot make.
 *
 * The crop is baked into the FILE, not applied in CSS. Cropping with a
 * transform meant Next served an 864px-wide source and then scaled it 3.2x,
 * so the subject arrived as a blur; `public/proof/point-of-care.jpg` is now
 * a 1280x1118 crop cut from the 4000px original. It holds only the cuff, the
 * forearm and the gloved hand resting on it: no faces, no setting, no
 * ethnicity, and a picture of the one act the page is actually about.
 * Do not re-crop wider.
 *
 * TREATMENT is a duotone, not a tint. The source is warm — terracotta,
 * turquoise, ochre — and dropped straight onto the navy it fights every other
 * colour on the page. Greyscale first, then multiply the navy into the
 * shadows and screen the cyan into the highlights, so the photograph lands
 * inside the `life-*` ramp instead of beside it. The right-hand mask lets it
 * dissolve into the ground rather than ending on a hard edge.
 */

import Image from "next/image";

/* Every edge dissolves rather than stopping. A hard vertical seam down the
   middle of the hero is the single most obvious tell that a photograph has
   been pasted onto a dark page. */
const DISSOLVE =
  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 14%, #000 44%, #000 100%)," +
  "linear-gradient(180deg, transparent 0%, #000 16%, #000 76%, transparent 100%)";

export default function LifeVisitPhoto({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        WebkitMaskImage: DISSOLVE,
        maskImage: DISSOLVE,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    >
      <Image
        src="/proof/point-of-care.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="(max-width: 768px) 0px, 60vw"
        className="object-cover object-[42%_center] grayscale-[0.82] brightness-[0.54] contrast-[1.14]"
      />
      {/* Duotone: navy into the shadows, a little cyan into the lights. Both
          layers are deliberately weak. The first pass ran the screen at 70%
          and the photograph vanished entirely — on a ground this dark the
          treatment only has to nudge the hue, not repaint the image. */}
      <div aria-hidden className="absolute inset-0 bg-[#0F2E66] opacity-75 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 bg-[#48CAE4] opacity-[0.16] mix-blend-screen" />
    </div>
  );
}
