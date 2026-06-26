# DHIRA Homepage — Editorial, Typography & Geometry Audit (Production Polish Pass)

A principal-reviewer pass focused on copy, type system, geometry, and rhythm. Rendered page inspected at 1440px via Playwright; computed styles harvested across every heading/paragraph/blockquote. No redesign, brand, color, or illustration changes.

---

## Phase 1–2 — Editorial findings (rendered copy)

| # | Issue | Where (rendered) | Why it hurts | Recommended fix | Risk |
|---|---|---|---|---|---|
| E1 | Spelling inconsistency: `organization` (Nav dropdowns) vs `organisation`/`theatre`/`optimise`/`crore` everywhere else | `Nav.tsx:48, 57` | The site voice is British/Indian English (₹, Cr, crore, "theatre", "optimise"). Two American spellings in the nav are the lone outliers and read as careless | `organization` → `organisation` in the two Nav menu descriptions | Low |
| E2 | Brand name `Dhira` (title case) appears in the Voices lead; every other instance is `DHIRA` | `Voices.tsx:50` | Brand capitalization drift undermines identity consistency | `Dhira` → `DHIRA` | Low |
| E3 | Em dashes used as connective tissue in prose leads; the editorial brief calls for natural sentence construction | 10 visible instances across ProblemSection, PowerfulPlatform, ProvenAtScale, HowWeDeliver, TheProof, Voices | Adds hesitation/parenthetical density that breaks rhythm at the start of sentences the user scans first | Convert the clearest cases to comma or period. Leave attributed **quotes** and the structural label "FROM EVERY SOURCE — ONE TRUSTED ANSWER" | Med |

---

## Phase 3 — Typography system (computed)

Headings: all 7 `h2`s render at 64px/600/Inter/leading-1.1/tracking-tighter — **coherent**. Subheads (h3/h4) sized per role, consistent. No regression here.

| # | Issue | Evidence | Why it hurts | Recommended fix | Risk |
|---|---|---|---|---|---|
| T1 | **Lead-paragraph size is not a system.** The narrative lead exists at three sizes: 16px (HowWeDeliver, TheProof), 17px (ProblemSection), 18px (Voices, ProvenAtScale). Hero lead at 20px is intentional (hero). | Computed inventory | The same role (section lead after h2) reads at three different sizes — slow visual fatigue and undermines the "one type system" goal | Unify narrative leads to `text-lg` (18px) so the lead role has a single size across sections. Hero remains `text-xl` (its role is different) | Med |
| T2 | PowerfulPlatform uses a `<p>` at 48px/600/overcast as a second headline | `PowerfulPlatform.tsx:31` | Same weight as h2 — two headlines compete for the section's lead role | Leave — it is the deliberate "Meet Akashic" signature; not worth re-authoring under constraints | — |
| T3 | Many muted-text grays coexist (`inkSoft` #6F7988, `accent-text` #6E6F71, `secondary-text` #5C5E63, `tertiary-text` #8E8F91, `overcast` #8F99A8) | config + components | Five near-identical muted grays is a system smell, but each currently maps to a per-role intent | Leave — consolidating risks subtle color/contrast regressions; out of scope for a polish pass | — |

---

## Phase 4 — Geometry

| # | Issue | Why it hurts | Decision |
|---|---|---|---|
| G1 | Bespoke border-radiuses (`rounded-[11px]`, `[12px]`, `[13px]`, `[14px]`) appear in the product mockups | Could read as random — but they live inside illustration-grade UI mockups where per-element radii are intentional | Leave — sweeping standardization would flatten the mockups' intentional craft |
| G2 | Buttons: `.btn-primary`/`.btn-secondary` are 36px tall; PowerfulPlatform's hero CTAs use taller bespoke `py-[12px]` | Minor CTA-height inconsistency across the platform hero | Leave — the platform hero intentionally earns a larger CTA; hard to unify without redesigning that moment |

---

## Phase 5–6 — Rhythm & UI (carried from prior pass)

Already applied in the prior polish pass and re-verified:
- Section padding unified to `py-32 lg:py-40`; PowerfulPlatform normalized + given bottom cushion before the dark `ProvenAtScale`.
- Eyebrows unified to `text-[11px]`, dashed-bottom, `pb-4`.
- Section dividers unified to `border-lineSoft`.
- TheProof surface corrected to `bg-white`.
- h2→lead gap standardized to `mt-5` (light) / `mt-6` (larger `text-lg` leads).

---

## Phase 8 — Implementation plan (priority order)

1. **E1** spelling: `organization` → `organisation` (Nav, 2 strings).
2. **E2** brand cap: `Dhira` → `DHIRA` (Voices lead).
3. **T1** unify narrative leads to `text-lg`:
   - ProblemSection `text-[17px]` → `text-lg`
   - HowWeDeliver `text-base` → `text-lg`
   - TheProof `text-base` → `text-lg`
   (Voices + ProvenAtScale already `text-lg`.)
4. **E3** selective em-dash reduction in prose leads (preserve quotes + the structural label):
   - ProblemSection: `&mdash;yet` → `, yet`
   - PowerfulPlatform: 3 feature descriptions → comma/period variants
   - ProvenAtScale: 2 leads → period
   - HowWeDeliver: step-3 copy → period
   - TheProof: 2 leads → comma / colon
   - Voices: lead → comma
   - HeroProducts (in-product microcopy): 3 question/answer strings → comma
   - Leave FieldLedger attributed **quotes** and the structural label.

All changes preserve meaning, voice, colors, illustrations, and component styling.