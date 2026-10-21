# ASSETS: DHIRA Website v3

Where images and other static files live, the rules they follow, and where the
non-photographic ones came from.

## Rules

- **Everything in `public/` is referenced.** An unreferenced file is clutter.
  Check before a release (the `public/` scan in DEVELOPMENT "Housekeeping") and
  move strays to `.archive/`.
- **Paths are content.** A page's image path is set in its content document
  (`content/`), typed `ImageAsset` with `alt` where the document owns the image.
  Never point at a path that is absent from `public/` (Design Rule 7).
- **Formats.**
  - Photographs are WebP or JPEG, sized for their largest rendered width.
  - Logos and drawings are SVG.
  - `next/image` serves AVIF or WebP to browsers that accept them
    (`next.config.mjs`).
- **Use `next/image`** for raster images. A plain `<img>` needs a written reason:
  an SVG logo has nothing for the optimiser to gain, so it is allowed with an
  inline `eslint-disable` note.
- **`alt` is required.** An empty `alt` marks a purely decorative image.
- **Do not delete** files that are referenced by URL from outside the code:
  - the brand files in `public/brand/`
  - `public/.well-known/security.txt` (RFC 9116)
  - the five `public/avatars/*-executive-v1.webp` portraits
  - the icons and `og-image.png` that `app/manifest.ts` and the metadata use

## Layout of `public/`

| Path | What |
|---|---|
| `favicon.*`, `icon-*.png`, `apple-touch-icon.png` | App and browser icons (`app/manifest.ts`) |
| `og-image.png` | Default social card (`content/site.ts` `seo.ogImage`) |
| `brand/` | Logo files for press and partners |
| `about-landscape.webp` | The /about hero landscape (provenance below) |
| `avatars/` | Leadership portraits (`*-executive-v1.webp`, provenance below) and the homepage voices portraits |
| `delivery/` | /delivery engagement-model and capability photographs |
| `sectors/` | Sector page photographs |
| `proof/` | Homepage proof imagery |
| `universal-context/` | System logos (SAP, Salesforce, Oracle, PostgreSQL) on the /solutions/eis hero. The other eight went to `.archive/removed-2026-10-20/` with the homepage logo strip |
| `.well-known/security.txt` | Security contact, linked from the Trust Center |

## Provenance

These images are generated or AI-edited, not camera photographs of DHIRA
people or places. Say so if anyone asks.

### About hero landscape (`public/about-landscape.webp`)

- 1536 × 1024, about 109 KiB.
- Generated with an image model on 29 September 2026: an original pastoral
  landscape inspired by the open-sky composition of keytail.ai.
- Decorative scenery, not a DHIRA location.
- It spans the navigation and hero under a light overlay for text contrast, with
  a bottom mask into the white page.
- On entry it settles from a 1.025 scale and moves at most 28px with hero
  scroll. Both effects are off under reduced motion.

Prompt:

> Use case: photorealistic-natural. Create an original premium website hero
> background photograph, landscape 1536x1024. Vast airy pale blue morning sky
> occupies the upper 72 percent, subtle wispy clouds and soft haze, gradually
> brightening toward horizon. The bottom 28 percent has gently rolling green
> countryside hills, distant layered blue-grey ridges, soft sunlight from the
> right, muted sage and olive grass. Calm expansive pastoral scenery, natural
> photographic texture, atmospheric perspective. Composition must keep the
> entire central upper two thirds very clean and light so dark website headline
> and two lines of description can be placed over it. No people, buildings,
> roads, objects, text, logos, interface, frames, or watermark.

### Leadership portraits (`public/avatars/*-executive-v1.webp`)

- Updated 30 September 2026 at the user's request: clearer, high-definition
  executive portraits, kept black and white.
- These are **AI-enhanced edits of the company's existing photographs**, not new
  photographs. An image model restored clarity and replaced backgrounds while
  preserving each person's face, expression, hair, glasses, jewellery and
  clothing. Each result was compared with its source before use.
- The final files are 1122 × 1402 WebP at quality 92.
- The About page enforces greyscale, including on hover.
- The source photographs are no longer in `public/`; they are kept locally in
  `.archive/removed-2026-10-16/public/avatars/`.

| Person | Source photograph(s) | Final asset |
|---|---|---|
| Dilip Hanumara | `dilip-ceo.png` | `dilip-executive-v1.webp` |
| Sirish Simha | `sirish-simha.png`, `sirish-cutout.png` (identity reference) | `sirish-executive-v1.webp` |
| Rupa Sridhar | `rupa-sridhar.png` | `rupa-executive-v1.webp` |
| Rajiv Kumar | `rajiv-kumar.png`, `rajiv-cutout.png` (identity reference) | `rajiv-executive-v1.webp` |
| Pratheep Menon | `pratheep-menon.png` | `pratheep-executive-v1.webp` |

Shared prompt (each edit added a per-person identity constraint):

> Use case: identity-preserve. Edit the supplied real portrait, do not invent a
> new person. Restore clarity conservatively, preserving facial proportions,
> expression, age, skin texture and distinctive details. A clean black-and-white
> photographic portrait, subtle editorial studio light. Quiet seamless very light
> neutral grey background. Vertical 4:5 composition, subject centred, full head
> visible with 10–12% headroom. Subject must remain the same person. No colour,
> text, logo, frame, watermark, other people, plastic skin, new hairstyle or
> glamour styling.
