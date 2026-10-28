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
    JPEGs over 350KB were re-encoded on 23 Oct 2026 (UX review: oversized
    originals): mozjpeg quality 82, at most 2400px wide, the voices avatars
    640px. Same paths, so no code changed; the originals are in git history.
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
| `about/` | One explicitly illustrative remote-review placeholder; `about/team/` contains nine employee photographs sourced from dhira.io |
| `delivery/` (retired) | The old Services photographs moved to `.archive/services-redesign/public/delivery/` on 26 Oct 2026. Services now uses code-native concept drawings and the shared proof imagery |
| `sectors/` | Sector page photographs |
| `proof/` | Homepage proof imagery |
| `universal-context/` | System logos (SAP, Salesforce, Oracle, PostgreSQL) on the /solutions/enterprise-intelligence hero. The other eight went to `.archive/removed-2026-10-20/` with the homepage logo strip |
| `.well-known/security.txt` | Security contact, linked from the terms of use |

## Provenance

The older lifestyle imagery is generated or AI-edited, not camera photographs
of DHIRA people or places. Leadership portraits are enhanced versions of real
photographs. The About team photographs added on 28 October 2026 are actual
images from dhira.io; their sources are recorded below. Connector marks are
published brand marks. The two new home-workspace scenes are AI placeholders.

### Connector marks (`components/icons/ConnectorLogo.tsx`)

- Added 23 Oct 2026 (UX review: real logos in one grey, no monograms or
  emoji) for the /akashic technical reference.
- Paths are from [Simple Icons](https://simpleicons.org) (CC0): v13.21.0 for
  most marks, v16.35.0 for Mistral AI. The Azure path is the one
  `CloudProviderLogos.tsx` already ships.
- Simple Icons has no Workday mark and no generic REST mark, so those two use
  one neutral connector glyph. Oracle NetSuite carries the Oracle mark.
- Every mark renders in the text colour (`text-overcast`), never in brand
  colours, beside the system's name, only to say Akashic connects to it.

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

### Insights editorial covers (26 October 2026)

`components/sections/insights/InsightCover.tsx` contains twelve original
code-native SVG compositions, selected by each article's typed `cover` key.
The geometry illustrates concepts such as handover, ownership, access and
shared foundations. No stock artwork, model-generated bitmap, product screen
or measured business figure is used. Covers inherit the shared theme tokens
in both appearances and are decorative beside the linked article title.

### About: remote work and team (28 October 2026)

The user authorised generated workspace placeholders and reuse of employee
photographs from [the public DHIRA About page](https://dhira.io/aboutus/), and
confirmed that DHIRA mainly works from home. Team names, roles and interests are
transcribed or briefly paraphrased from the same source. These are selected
people from that page, not a statement of total headcount.

**Generated placeholder:** `public/about/remote-review-illustrative.webp`
(1536 × 1024), a monochrome engineering review over a video call from home.
Generated with the built-in image tool, then encoded as WebP at quality 86.
The people, room and notebook are illustrative, not real DHIRA material.
The visible caption and alt text identify the placeholder. The two previous
desk studies were retired to `.archive/about-inspiration-2026-10-28/retired-assets/`.

Exact prompts and developer replacement instructions: [ABOUT_IMAGE_PROMPTS.md](ABOUT_IMAGE_PROMPTS.md).
To replace, edit `culture.workspace` and `culture.imageNote`
in `content/pages/about.ts`. Record the new photographer/source here.

**Nine real employee photographs:** original files served by dhira.io,
downloaded at the user's direction. Optimised to at most 600px per edge
without enlargement, WebP quality 88. No image-generation edits, retouching
or background replacement. All people photographs render monochrome through
CSS, including on hover, per the user's direction. Original files retain their
colour. Focal positions are typed per person in the page content. Chiransh,
Subhamoy and Diksha were removed at the user's request; their photographs are
in the same local archive, outside `public/`.

| Local file under `public/about/team/` | Original source |
|---|---|
| `monica-kishor.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/MicrosoftTeams-image-2.jpg) |
| `bhaskar-sarkar.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/IMG-20211211-WA0014-1.jpg) |
| `yash-kanvinde.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/WhatsApp-Image-2022-12-26-at-12.45.27-PM-1.jpeg) |
| `vinay-kulkarni.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/MicrosoftTeams-image-1.jpg) |
| `jitendra-billava.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/MicrosoftTeams-image.jpg) |
| `vishwanandan-ka.webp` | [Original](https://dhira.io/wp-content/uploads/2023/07/MicrosoftTeams-image-22-1.jpg) |
| `vipul-gabhane.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/MicrosoftTeams-image-30.jpg) |
| `vipul-madan.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/MicrosoftTeams-image-32.jpg) |
| `naved-ansari.webp` | [Original](https://dhira.io/wp-content/uploads/2023/07/MicrosoftTeams-image-24.jpg) |
