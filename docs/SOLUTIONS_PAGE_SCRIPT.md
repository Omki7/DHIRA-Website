# /solutions: script, flow and visuals

The working brief for the Solutions hub rewrite of 5 Nov 2026, written
alongside docs/LIFE_PAGE_SCRIPT.md (same request, same rules). Copy here is
the source for `src/content/pages/solutions.ts`; when the two differ, the
content file is what ships. The user's picks on this page: the hero, [02]
More solutions and [03] By industry and function. Everything else is open.

## 1. Who reads this page

Leaders who clicked "Solutions" or "All solutions": chief executives and
finance and operations heads of services businesses, public procurement
officers and their IT departments, health programme leaders, and sector
leads in retail, manufacturing, insurance, education and the public sector
scanning for "do they have something for us?". Behind them, chief
information and data officers weighing the platform.

**How they talk:** use case, business problem, ready-made, "does it work
with our systems", "how fast can it go live", proof of concept, start small,
"we have been burned by pilots".

**What hurts:** every new AI project starts from nothing (new pipelines, new
copies of the data, a new governance review); vendors sell a platform and
leave the building to you; pilots that never reach production.

**What the hub is for:** make the three flagship solutions desirable in the
reader's own question, then route everyone else to their starting point.

**What the research showed** (Attio, Databricks, Khushi Baby): Attio sells
each capability as the question its user already asks, answered on screen;
Databricks routes by industry and use case; Khushi Baby opens on the
stakeholder's own question. The hub keeps its routing registers (the user's
picks) and turns the flagship section into three such questions.

## 2. Truth

Every line comes from the solution pages or `content/pages/solutions.ts`.
No week figures (unconfirmed). Agent work carries `PreviewTag`. Sample
figures come from each solution's own sample world: Enterprise Intelligence
($11.4 million outlook, $600,000 ahead of plan, Northwind Insurance's
$180,000 renewal); the Intelligent Procurement Management System's twelve
stages and its prior-delivery evidence (homepage [03]); Akashic Life's
sample visit (docs/LIFE_PAGE_SCRIPT.md §2).

## 3. The spine

| # | Eyebrow | Question it answers | Headline (setup / payoff) |
|---|---|---|---|
| Hero | SOLUTIONS | What is here? | Built on Akashic. / From business problem to working solution. |
| 01 | BUILT ON AKASHIC | What can I use now? | Start from a solution / that already does the whole job. |
| 02 | MORE SOLUTIONS | What else? | More on the same foundation. / Start with one. Add the next. |
| 03 | BY INDUSTRY AND FUNCTION | Where do I start? | Find your starting point. / By the sector you serve, or the team you lead. |
| Close | (kicker) | What now? | Bring one priority use case. / See what your data can decide. |

The old [01] payoff "The platform, at work" is the example DESIGN_SYSTEM §2
gives of a header that states the obvious; it goes.

## 4. Section by section

### Hero (kept)

Unchanged copy and the on-page index.

### [01] Built on Akashic (rebuilt)

- Lede: "Enterprise Intelligence for business planning, the Intelligent
  Procurement Management System for public tenders and Akashic Life for
  maternal care. Each one runs on all seven Akashic modules."
- **Visual: three chapters on one root.** Each solution is a wide chapter:
  on the left, who it is for (mono), its name, the question its reader
  already asks (set like the Enterprise Intelligence ask bar), the gain
  headline, one sentence and what it includes as tags (preview items carry
  the dashed mark), then its onward link. On the right, one moment at
  native size that answers the question:
  - Enterprise Intelligence, "Where will we land this year?": a rolling
    twelve-month line, actuals in ink to today and the forecast in blue,
    landing at $11.4 million, $600,000 ahead of plan, with Northwind's
    $180,000 renewal marked where it bends the line.
  - Intelligent Procurement Management System, "Can we defend this award?":
    the twelve stages on one curving path, indent to bank guarantee,
    evaluation lit, and the evidence behind one criterion: prior delivery,
    met, completion certificate linked.
  - Akashic Life, "Which mother needs care first?": the handset fragment
    from the Life page: this week's visits, Meena first, high risk, refer
    today, saved offline.
  A single organic thread runs down the left of the three chapters and
  roots into the foundation strip at the foot of the section: Akashic, every
  solution, all seven modules (the homepage's strip, so the two read as one
  system). Anchors stay: `#enterprise-intelligence`,
  `#intelligent-procurement`, `#akashic-life`.

### [02] More solutions (kept)

### [03] By industry and function (kept; the page's one soft band)

### Close (rebuilt as the homepage closing card)

Kicker "Thirty minutes, around one problem you already have", the two-tone
title, a rule, the prompt "A walkthrough of Akashic, Enterprise
Intelligence or the Intelligent Procurement Management System, built around
a problem you already have.", then Talk to our team and Explore Akashic.

## 5. Look and feel

The homepage and Enterprise Intelligence system: `SectionHeader`, porcelain
grounds, hairline drawings, mono labels, blue for the answer, one soft band
([03]), the homepage closing card. The chapters are open rows on hairlines,
not cards; each moment is a small drawing, not a dashboard. Below lg each
chapter stacks: copy, then its moment.

## 6. Build order and checks

Move the page into `features/solutions` (SCSS Modules) as it is touched:
[01], then the close, then the hero and the kept registers (ported without
visual change), the composer and docs/ARCHITECTURE.md. Same checks after
each section as the Life page.
