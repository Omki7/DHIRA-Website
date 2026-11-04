# /solutions/life: script, flow and visuals

The working brief for the Akashic Life rewrite of 5 Nov 2026 (user: "review
the entire Akashic Life and then the Solutions main page… study similar
products… work as a content writer… expansive, organic designs… cohesive with
home and platform… I only like hero, 02 and 03… total freedom to change
everything else"). Copy here is the source for
`src/content/pages/solutions-life.ts`; when the two differ, the content file
is what ships. Rules from AGENTS.md and DESIGN_SYSTEM.md apply throughout
(two-tone headlines, no em dashes, no short forms, no invented facts, flat
colour). /solutions/enterprise-intelligence (docs/EIS_PAGE_SCRIPT.md) is the
model: same grammar, same drawing language.

## 1. Who reads this page

**The people who commission and run maternal health programmes:** state
health departments and health missions (mission directors, maternal health
programme officers), district health officers and their programme managers,
medical officers at primary health centres, and the foundations, agencies
and implementing organisations that fund and run maternal care. Behind them,
their technical advisers, who ask about offline use, data protection and
what the phone needs.

**The people it serves, who must be honoured on the page:** frontline health
workers (community health workers, auxiliary nurse midwives), medical
officers, referral hospital teams, and the mother.

**How they talk:** antenatal check-up, high-risk pregnancy, danger signs,
line list, due list, home visit, referral, follow-up, sub-centre, primary
health centre, first referral unit, block, district, maternal death review,
anaemia, haemoglobin, blood pressure, pre-eclampsia, "the register", "the
data comes in at month-end", "the dashboard does not match the ground", "she
spends more time on forms than on mothers".

**What hurts:**

- High-risk pregnancies are found late: at delivery, or at the emergency.
- The three delays (Thaddeus and Maine, 1994): deciding to seek care,
  reaching care, receiving care. Every public health reader knows the model.
- No signal where the need is; tools that need a network fail at the door.
- The same mother is three records (health worker, health centre, district
  hospital); a referral is sent, and nobody knows if she arrived.
- District dashboards are monthly, aggregate and late.
- AI that cannot show its working, or that claims to replace the clinician.

**What the research showed** (Khushi Baby, Jacaranda Health, Medic, Attio):
the strongest health sites frame the problem as stakeholder questions in the
reader's own words ("Why can't the district health officer trust the
dashboard on her own desk?") and speak of closing the loop for one mother;
Attio walks one lifecycle and keeps a person deciding ("You make the call").
This page does both: one mother's visit, every level that acts on it, a
clinician deciding.

## 2. What the product is (the truth we market)

One sentence: **Akashic Life reads pregnancy risk on a health worker's basic
phone, at the visit, with no signal, and carries one record for that mother
to the health centre and the district when there is signal.**

| Capability | Status | Source |
|---|---|---|
| Risk read on the handset at the visit, offline (Machine Learning on the device) | Stated | page, home, /akashic |
| Basic Android handsets frontline workers already carry | Stated | page [07] (old) |
| Record kept on the phone, sent in compact form over text message or mobile data when a bar appears | Stated | page [02] |
| One record for one mother across health worker, health centre, district hospital (Master Data) | Stated | page [03], [07] (old) |
| District and national views: anonymised, aggregated, with lineage, audit trails and role-based access | Stated | page [03], [07] (old) |
| The response comes back down: the referral facility is alerted, the health worker sees it was received | Stated (softened) | page [02] |
| Built on the platform behind the national immunisation registry (2 billion+ dose records) and national learning platform (187 million+ enrolments) | Real, programmes unnamed | home, /about |

**Never** (docs/ARCHITECTURE.md, this page's claims rules): figures of the
product's own (accuracy, parameter count, risk score, case volume, time
saved); districts or programmes using it; named national programmes;
"diagnoses"; "replaces the doctor"; "autonomous"; testimonials; the old
"emergency response network is triggered". "Golden record" is retired:
"one record". A trained clinician makes every clinical decision.

**Sourced problem figures** (problem section only, each with its source):

- About 260,000 women died during and following pregnancy and childbirth in
  2023, almost one every two minutes. World Health Organization, maternal
  mortality fact sheet, 7 April 2025.
- Around 75% of maternal deaths come from five well-known complications,
  among them severe bleeding and high blood pressure in pregnancy. Same
  source.
- India: 88 maternal deaths per 100,000 live births (Sample Registration
  System, 2020 to 2022, Office of the Registrar General, June 2025). The
  global goal for 2030 is under 70 (Sustainable Development Goal 3.1).
- The three delays: Thaddeus and Maine, "Too far to walk: maternal mortality
  in context", Social Science and Medicine, 1994.

**The sample visit** (one sample mother runs through [04] and [05], as
Northwind runs through the EIS page): Meena, third trimester, second
pregnancy; blood pressure high, haemoglobin low, swelling of face and hands,
headache and blurred vision. Read as high risk, refer today. No signal at
the house; sent when a bar appears; expected at the primary health centre
the same day. **No numbers on any Akashic Life screen** (user direction,
23 Jul 2026, recorded in the old handset mockup): readings are named in
words ("Blood pressure: high"), never as values, and no screen shows a
count, a score or a time. The sample never sits beside the sourced figures.

## 3. The spine

A reader who sees only the eyebrows and headlines should follow the story.

| # | Eyebrow | Question it answers | Headline (setup / payoff) |
|---|---|---|---|
| Hero | Akashic Life · Built on Akashic | What is it? | The intelligence layer for care that cannot wait. |
| 01 | THE THREE DELAYS | Why do mothers still die of what we can treat? | The care that saves a mother exists, / but it reaches her too late. |
| 02 | HOW IT WORKS | What does Akashic Life do about it? | Read the risk at the visit, / then carry one record all the way to care. |
| 03 | WHAT CHANGES | What is different for her, and for us? | The referral chain collapses / into a single visit. |
| 04 | AT THE VISIT | Does it really work at the door, with no signal? | No signal at the doorstep, / and the risk is still read before the visit ends. |
| 05 | EVERY LEVEL | What do the health centre, district and state see? | One mother's reading / reaches every level that can act on it. |
| 06 | BUILT ON AKASHIC | Why trust DHIRA with a country's mothers? | The reading on the phone is new, / but the foundation under it runs at national scale. |
| 07 | QUESTIONS | What will our advisers ask? | Questions health leaders ask / before the first district. |
| Close | (kicker) | What now? | Care that cannot wait / should not have to. |

Headlines run as one sentence across the two tones; the fragment pairs of
the first draft were rewritten after the section critiques (5 Nov 2026), as
was "doorstep" three times in a row. The content file holds every other line
as shipped; the notes below record intent and the critiques' decisions.

Kept from the old page: the hero, [02]'s pinned three circles, [03]'s
zig-zag (the user's picks), and the closing line. Replaced: the ghost-figure
problem section, the record anatomy, the altitude statement, the circle
chain, the three-layer register and the stake statement. Old anchors stay as
aliases: `#the-record` → [04], `#altitude` → [05], `#record-of-work`,
`#how-its-built` and `#the-stake` → [06].

## 4. Section by section

### Hero (kept; refined)

- Badge: Akashic Life | Built on Akashic. Headline unchanged.
- Lede: "Akashic Life reads pregnancy risk on a health worker's basic phone, at
  the visit, with no signal. The mother's record reaches the health centre
  the moment a bar appears."
- Buttons: the site's pair (ink primary, outline secondary), not the cyan
  capsules: Talk to our team / See how it works.
- Photograph unchanged.

### [01] The three delays (new)

- Lede: "Most maternal deaths are preventable. They happen in the time lost
  between a danger sign and the right hands: deciding to seek care, reaching
  it and receiving it."
- **Visual: the long road.** One organic line runs the full width from a
  home to a district hospital over contour land, laid out as the model has
  it: deciding coils at home (time passing in one place), the road runs on
  to the health centre, the referral leg to the hospital that can treat her
  bends round the hill and is the second delay, and the third coils inside
  the hospital grounds before treatment begins. Solid ink where the journey
  moves forward, red and dashed where time is lost (critique: red had
  covered 94% of the first draft). Numbered labels (the order is real), one
  line each at matched line counts. Mono caption: the model's source.
- **Stat band** (the site recipe, red figures): "What is at stake." (not
  "What those delays cost": the deaths are not all caused by delay)
  260,000 (an estimate, so labelled) / ~75% / 88, each with its source.
- Coda: "The delays are not clinical. / They are systems, and systems can be
  rebuilt."

### [02] How it works (kept: the pinned circles)

- Header becomes the shared `SectionHeader` (lede under the headline).
- Lede: "A health worker records what she sees and measures. Akashic Life
  reads the risk on the phone, sends the record up when there is signal and
  brings the answer back."
- The three circles and the scroll-pinned swap stay. Labels: Read the risk /
  at the visit; Carry the record / upward; Close the loop / back to her.
  Bodies tightened; no emergency-network claim.

### [03] What changes (kept: the zig-zag)

- Header: the shared `SectionHeader`, left (was centred).
- Lede: "The screen that once needed a clinic, a lab and a journey back is
  read at the doorstep, so risk is known while there is still time to act."
- The four items stay, icons in the site's blue. "Golden record" goes.

### [04] At the visit (new; replaces the record anatomy)

- Lede: "Take one antenatal check-up in a village with no bars. The health
  worker records what she measures, the phone reads the risk and the record
  waits for signal."
- **Decisions from the critique:** one destination everywhere (the first
  referral unit); "Refer now", because high blood pressure with headache and
  blurred vision are imminent eclampsia signs; red only on the high-risk
  result; no drawn button; step marks are hollow rings, legible in dark.
- **Visual: one visit, end to end.** Left, at native size, the handset
  (simulated UI): "Antenatal check-up", No signal, Meena, third trimester;
  four readings named in words; the result "High risk · Refer today" with the reason in
  plain words (shows its working); "Saved on this phone. Sends when there is
  signal." Right, the road from [01] again, now whole: three numbered beats
  along it: 1 On the phone (read in the visit, saved offline) · 2 A bar
  appears (sent as one compact message: one record, not a copy) · 3 Primary
  health centre ("Expected today: Meena, high risk, referred by her health
  worker"). The stretch without signal is dashed, the rest solid blue.
- Coda: "The phone flags the risk. / A clinician makes the call."

### [05] Every level (new; replaces the altitude statement)

- Lede: "The health worker sees her mothers, the medical officer sees every
  referral, and the district and state see risk building, anonymised, while
  there is still time to act."
- **Visual: the watershed.** Fine streams (one per visit) rise from a field
  of homes on the left, join at health centres, merge into the district and
  run into the state on the right: an organic drawing, read left to right.
  Four seats sit on the flow in the homepage outcome-card grammar (a role,
  the plain question it asks, one legible answer with its outcome in blue, a
  mono provenance line): health worker "Who do I visit first this week?";
  medical officer "Who was referred and has not arrived?"; district health
  officer "Which block is building risk?"; state programme "Where should
  staff and supplies go next?".
- Coda: "Named only to those who care for her. / Anonymised for everyone
  above." The drawing marks the line: her reading is solid while named,
  dashed past the boundary, and the district and state are rings.
- **Decisions from the critique:** no rankings or month-on-month
  comparisons; the state seat ties back to low haemoglobin (iron supply).

### [06] Built on Akashic (new; replaces the circle chain, the layers and the stake)

- Lede: "Reading risk on a phone is the new part. Carrying a country's health
  records without losing one is not: Akashic already does it for national
  programmes."
- Onward link: "How Akashic governs every record" → /akashic.
- **Visual: one ground.** A ground line across the width is the Akashic
  foundation. Above it, the two national programmes have grown tall, with
  twigs and their figures at the crown (2 billion+ dose records reconciled;
  187 million+ enrolments resolved); Akashic Life is the young growth, in
  blue. Below it, one root system: Master Data and Governance run under all
  three (the customer stories list both for each programme), and Machine
  Learning is Akashic Life's own new root.
- **Decisions from the critique:** the learning platform's enrolments are
  not "health records", and nothing claims "without losing one"; "proven"
  never reads as Akashic Life having a deployment record. The figures are
  cited in the close's footnote.

### [07] Questions (new)

The shared `FaqSection`; every answer restates a claim the page makes.
Does Akashic Life diagnose? · What does a health worker need? · What happens
when there is no signal? · Who can see a mother's record? · How is it
different from a reporting app?

### Close (kept line; the homepage closing card)

"Care that cannot wait / should not have to." Prompt: "Bring one block where
high-risk pregnancies are found too late." One button: Talk to our team. Two
spec rows: what the first conversation covers, and what the walkthrough
shows. A footnote cites [01]'s figures (Rule 4).

## 5. Look and feel

- **Cohesive with the homepage, /akashic and Enterprise Intelligence:** the
  shared `SectionHeader` on every numbered section, porcelain grounds,
  hairline drawings with mono labels, blue for the live answer, red only for
  the delays and the high-risk flag, the homepage closing card. The site's
  buttons replace the cyan capsules. The `life-*` family stays for the
  grounds of the hero, [02] and [03] (the user's picks) and nowhere new.
- **Expansive and organic:** full-width drawings built from curves that
  follow land and water (the road, the watershed, the ground and its roots)
  rather than grids of cards. One sample mother links [04] and [05]; the
  road links [01] and [04]. Lines draw once in view and land on the final
  state under reduced motion and without JS.
- **Product UI teases, never reveals:** one handset fragment at native size.
- Below lg every drawing becomes a readable sequence (numbered only where
  the order is real).

## 6. Build order and checks

Move the page into `features/solutions` (SCSS Modules) as each section is
touched: hero, [01], [02], [03], [04], [05], [06], [07], close, then the
composer, aliases, `sections` list and docs/ARCHITECTURE.md. After each
section: tsc and lint; Playwright at 1440 and 390, light and dark, and with
reduced motion; then a critique with the installed design skills (an
independent Impeccable design review, the Impeccable detector, Emil
Kowalski's design-engineering checks); fix; only then the next section.
