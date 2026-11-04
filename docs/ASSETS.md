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
| `about/` | Archived-use CC0 workspace photograph; `about/team/` contains nine AI-edited studio portraits and fourteen additional public-source portraits. About [05] also reuses the five leadership portraits. Sources and draft status: ABOUT_TEAM_SOURCES.md |
| `delivery/` (retired) | The old Services photographs moved to `.archive/services-redesign/public/delivery/` on 26 Oct 2026. Services now uses code-native concept drawings and the shared proof imagery |
| `sectors/` | Sector page photographs |
| `proof/` | Homepage proof imagery |
| `universal-context/` | System logos (SAP, Salesforce, Oracle, PostgreSQL) on the /solutions/enterprise-intelligence hero. The other eight went to `.archive/removed-2026-10-20/` with the homepage logo strip |
| `solutions/enterprise-intelligence/` | The four 30-second teaser videos on /solutions/enterprise-intelligence [03] (`aei-teaser-*-720.mp4`, DHIRA's own, re-cut 4 Nov 2026 on a light ground) and their posters (`poster-*.webp`, 1280 by 720): each poster is a frame of its own video, about two seconds in where the title card has landed, so a poster always matches its footage. Re-export the posters whenever a video changes |
| `.well-known/security.txt` | Security contact, linked from the terms of use |

## Provenance

The older lifestyle imagery is generated or AI-edited, not camera photographs
of DHIRA people or places. Leadership portraits are enhanced versions of real
photographs. The original nine About team photographs now have AI-edited
studio versions. Fourteen further public-source portraits were added unchanged
on 4 November 2026; their sources are recorded below. Connector and AI
assistant marks are published brand marks. The two new home-workspace scenes
are AI placeholders.

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

### AI assistant marks (`components/icons/AssistantLogo.tsx`)

- Added 2 Nov 2026 for the footer's "Ask AI for a summary" row (user,
  after ThoughtSpot's footer). Each mark links to that assistant with a
  prompt about DHIRA already asked.
- Paths are from [Simple Icons](https://simpleicons.org) (CC0): Claude,
  Perplexity and Google Gemini from v16.30.0; OpenAI from v15.15.0, the
  last release that carries it. Google AI Mode uses the Gemini mark.
- Grok is left out: Simple Icons publishes no mark for it.
- Every mark renders in the text colour (`text-inkSoft`, `text-ink` on
  hover), never in brand colours. The marks are their owners' trademarks,
  used only to name the assistant a link opens; each link's accessible
  name says it in words ("Ask ChatGPT about DHIRA").

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

The user authorised reuse of employee photographs from
[the public DHIRA About page](https://dhira.io/aboutus/), and confirmed that
DHIRA mainly works from home. The original team names and roles came from
that page. The expanded concept roster now combines public sources, and its
individual introductions are user-requested editorial drafts. See
[the source ledger and review notes](ABOUT_TEAM_SOURCES.md). The selected
people and placeholder circles do not state a total company headcount.

**Workspace photograph:** `public/about/home-workspace.webp` (1536 × 1024,
WebP quality 86, metadata stripped). A laptop, an open notebook of handwritten
notes, a pen, a phone and coffee on a wooden table. Source:
[Home-office-336377.jpg](https://commons.wikimedia.org/wiki/File:Home-office-336377.jpg)
on Wikimedia Commons, by Free-Photos via
[Pixabay](https://pixabay.com/photos/home-office-workstation-office-336377/).
Licence: CC0 1.0 (public domain dedication); attribution is not required.
Original 5616 × 3744, SHA-1 `763209e2cc10cb959461dba96fd26f111623ba1e`,
downloaded 4 Nov 2026. Rendered monochrome by the `grayscale` class.

It replaced an AI-generated remote-review scene on 4 Nov 2026 (user). The
photograph has no people in it, so it cannot be read as DHIRA staff and
carries no caption. **Not shown since the same day's remodel of /about [05]**,
where the team portrait field is the section's picture; the file stays in
`public/about/` in case it is wanted again. If a workspace image returns, a
real DHIRA photograph (with consent from everyone pictured) is the better
choice; a stock photo of people on this page would need a caption. Record the
source here and add the field back to `culture` in `content/pages/about.ts`.

**Nine studio portraits, updated 4 November 2026:** AI-enhanced edits of
the existing real employee photographs, authorised by the user. These use a
consistent black-and-white studio backdrop and head-and-upper-chest framing.
They are 1122 × 1402 WebP files at quality 92. They are not new camera
photographs. The original downloads remain in the local culture archives.
[Exact generation prompts](ABOUT_TEAM_PORTRAIT_PROMPTS.md) are recorded
separately.

The Attio-style concept now includes fourteen additional public-source photos,
downloaded unchanged. Individual CSS crops bring the faces into comparable
frames; all portraits render monochrome. Missing photographs use initials.
See [the full source ledger and draft roster](ABOUT_TEAM_SOURCES.md).
Chiransh, Subhamoy and Diksha remain excluded at the user's request.

| Local file under `public/about/team/` | Original source |
|---|---|
| `monica-kishor-studio-v1.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/MicrosoftTeams-image-2.jpg) |
| `bhaskar-sarkar-studio-v1.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/IMG-20211211-WA0014-1.jpg) |
| `yash-kanvinde-studio-v1.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/WhatsApp-Image-2022-12-26-at-12.45.27-PM-1.jpeg) |
| `vinay-kulkarni-studio-v1.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/MicrosoftTeams-image-1.jpg) |
| `jitendra-billava-studio-v1.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/MicrosoftTeams-image.jpg) |
| `vishwanandan-ka-studio-v1.webp` | [Original](https://dhira.io/wp-content/uploads/2023/07/MicrosoftTeams-image-22-1.jpg) |
| `vipul-gabhane-studio-v1.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/MicrosoftTeams-image-30.jpg) |
| `vipul-madan-studio-v1.webp` | [Original](https://dhira.io/wp-content/uploads/2022/12/MicrosoftTeams-image-32.jpg) |
| `naved-ansari-studio-v1.webp` | [Original](https://dhira.io/wp-content/uploads/2023/07/MicrosoftTeams-image-24.jpg) |
