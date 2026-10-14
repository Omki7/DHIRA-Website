# About leadership portraits

Updated 30 September 2026 at the user's request for clearer, high-definition portraits with an executive treatment, kept black and white.

The built-in imagegen tool edited the existing company photographs. These are AI-enhanced derivatives, not new camera photographs. The source files remain unchanged. The final WebP files are 1122 × 1402 pixels, encoded at quality 92 without resizing. The About page enforces greyscale, including on hover, and uses the full portrait crop without the former 1.2–1.6× CSS enlargement.

| Person | Inputs in `public/avatars/` | Final asset |
|---|---|---|
| Dilip Hanumara | `dilip-ceo.png` | `public/avatars/dilip-executive-v1.webp` |
| Sirish Simha | `sirish-simha.png` (primary), `sirish-cutout.png` (identity reference) | `public/avatars/sirish-executive-v1.webp` |
| Rupa Sridhar | `rupa-sridhar.png` | `public/avatars/rupa-executive-v1.webp` |
| Rajiv Kumar | `rajiv-kumar.png` (primary), `rajiv-cutout.png` (identity reference) | `public/avatars/rajiv-executive-v1.webp` |
| Pratheep Menon | `pratheep-menon.png` | `public/avatars/pratheep-executive-v1.webp` |

## Prompt set

Each edit used the following shared prompt plus the corresponding identity constraint below:

> Use case: identity-preserve. Asset type: final high-definition executive portrait for a company leadership page. Edit the supplied real portrait, do not invent a new person. Restore clarity conservatively: improve compression and softness while preserving facial proportions, expression, age, skin texture and distinctive details. A clean black-and-white photographic portrait, subtle editorial studio light, natural fine detail, tonal depth without harsh sharpening or beauty retouching. Quiet seamless very light neutral grey background, subtly darker toward the bottom; no scenery, no gradients of colour. Vertical 4:5 composition, at least 1024 pixels wide, subject centred, full head entirely visible with 10–12% headroom, upper chest and shoulders in frame, natural eye level. Subject must remain the same person. No colour, text, logo, graphic frame, watermark, other people, plastic skin, new hairstyle or glamour styling.

- **Dilip:** Keep his exact face, hair, friendly tooth-showing smile, dark blazer and open-collar shirt.
- **Sirish:** Image 1 is the larger primary portrait. Keep his exact face, glasses, dark head covering, facial hair, serious thoughtful expression and patterned shirt. Image 2 is a supporting identity reference of the same man, not an appearance to combine. Keep Image 1's glasses and head covering.
- **Rupa:** Keep her exact face, bindi, hair, expression, earrings, necklace and sari. Remove only the original wall, name bar and text.
- **Rajiv:** Image 1 is the primary portrait. Image 2 is a supporting photograph of the same man. Preserve the exact face, hairline, expression and suit with open white shirt from Image 1. Remove office and name bar; frame chest-up.
- **Pratheep:** Keep his exact face, moustache, slicked-back hair, expression and quilted zip vest over dark sleeves. Remove the outdoor background only.

The generated PNGs were visually compared with these source photographs before integration. CSS supplies the fine photographic frame, monochrome rendering and restrained hover treatment; these are not baked into the images. `AboutPeople.tsx` uses responsive Next Image sizes and lazy loading.
