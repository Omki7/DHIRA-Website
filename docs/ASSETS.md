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
| `avatars/` | Leadership portraits (`*-executive-v1.webp`, provenance below) and the homepage voices portraits |
| `delivery/` | /delivery engagement-model and capability photographs |
| `sectors/` | Sector page photographs |
| `proof/` | Homepage proof imagery |
| `universal-context/` | System logos (SAP, Salesforce, Oracle, PostgreSQL) on the /solutions/eis hero. The other eight went to `.archive/removed-2026-10-20/` with the homepage logo strip |
| `.well-known/security.txt` | Security contact, linked from the terms of use |

## Provenance

These images are generated or AI-edited, not camera photographs of DHIRA
people or places. Say so if anyone asks.

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
