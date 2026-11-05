# /solutions/enterprise-intelligence: script, flow and visuals

The working brief for the page rewrite of 5 Nov 2026 (user: "review the entire
page… inconsistent flow and confusion… market it in the best possible way").
Copy here is the source for `src/content/pages/solutions-eis.ts`; when the two
differ, the content file is what ships. Rules from AGENTS.md and
DESIGN_SYSTEM.md apply throughout (two-tone headlines, no em dashes, no short
forms, no invented facts, agents carry `PreviewTag`, flat colour).

## 1. Who reads this page

The leadership of a services business of roughly 50 to 2,000 people (IT
services, consulting, engineering and professional services): the chief
executive, the chief financial officer, the chief operating officer, the
heads of delivery, sales and people. They run on an ERP (ERPNext today), a
CRM, a project tool and an HR system, and they already have dashboards.

**How they talk:** utilisation, bench, billable hours, margin, fixed price
and time and materials, milestones, change requests, renewals, receivables,
days sales outstanding, cash, EBITDA, the monthly MIS pack, the board pack,
the weekly review, headcount against plan, the forecast, "rebuilt in a
spreadsheet over the weekend".

**What hurts:**

- The numbers arrive after the decision. The MIS pack lands weeks after the
  month it describes.
- Every department is right about its own piece. Nobody owns the whole
  client, so a renewal, a slipping project and an unpaid invoice are three
  separate conversations.
- Small approvals carry hidden costs: a leave, a cloud request, a slipped
  deal. Nobody checks what they break until the invoice does not go out.
- Too much noise. Thousands of changes a week; a handful need a leader.
- Two teams, two revenue numbers. The meeting is spent agreeing on the
  figure, not the decision.
- AI they cannot trust: fast answers with no working shown.

## 2. What the product is (the truth we market)

One sentence, used early and often: **Enterprise Intelligence does the work
of FP&A and MIS. It reads your ERP as the system of record and gives every
leader one live window into the business** (the Solutions hub's own words).

What the page may claim, from the teaser videos, the Solutions hub and the
FAQ already agreed:

| Capability | Status | Source |
|---|---|---|
| Live picture from the ERP as records change; ERPNext connector | Live | hub, hero note |
| Salesforce, SAP and Oracle | On the roadmap: never "connects live" | hero note |
| Customer 360, Project 360, Employee 360, Finance, rolling 12-month forecast | Live | hub |
| Follows the links across people, work and money (the knowledge layer) | Live | video 1, Akashic |
| Impact checks: a leave, a cloud request, a deal slip, a lost renewal | Live (videos) | videos 1 to 3 |
| What-if on the forecast: revenue, EBITDA and cash move together | Live | video 3 |
| Every figure traces to its record and shows its working | Live | hub, FAQ |
| Agents read every change and bring only what needs a decision | **Preview** | video 4, hub |
| Proposed actions, ranked by money at stake; a person approves; the follow-through is recorded | **Preview** (agentic) | video 4, FAQ |
| Role views for the CEO, finance, sales, delivery and people leaders | Live | hub, [role views] |

Never: "autonomous", "zero hallucination", "100% deterministic",
"cryptographic", "30 days early" or any figure we cannot source. Name it
"Enterprise Intelligence" in full (never "AEI"). "Knowledge layer", never
"knowledge graph".

**No vendor names (decided 5 Nov 2026, after the critique).** The page names
systems by role, not by product: CRM, project tool, accounting, HR system,
cloud billing, "the systems you already run". ERPNext and Frappe HR are no
longer named on the page; Salesforce, SAP and Oracle are still never claimed
as connected. The FAQ "Which systems does it read today?" stays honest: bring
the list and we say plainly what connects on day one.

**The sample business** (unnamed, USD, about 96 people, $11.4 million
revenue outlook) is the one in the videos and the role cockpits: clients
Northwind Insurance (renewal, $180,000 a year), Civic Digital, Lumen Bank,
Meridian Health; project P-104 Claims Engine for Northwind; Karthik Iyer, a
lead engineer. Every sample figure on the page comes from this world.

## 3. The spine

A reader who sees only the eyebrows and headlines should follow the story.
Each section answers the question the one before raises.

| # | Eyebrow | Question it answers | Headline (setup / payoff) |
|---|---|---|---|
| Hero | Enterprise Intelligence | What do I get? | See where your business will land. / Every hour. |
| 01 | THE DECISION GAP | Why do I not have this today? | Your company runs as lifecycles. / Your tools run as departments. |
| 02 | ONE PICTURE | So what is it? | It follows every link / across people, work and money. |
| 03 | FOUR STORIES, THIRTY SECONDS EACH | What does that look like on a real decision? | See the impact / before anyone commits. |
| 04 | YOUR MONDAY (preview) | Will it bury me in alerts? | 2,418 changes since Friday. / Three need you. |
| 05 | EVERY LEADER | Is it just for the CEO? | Five leaders, five questions. / One set of numbers. |
| 06 | TRUST | Can I believe it, and who is in control? | Every figure shows its working. / Every action waits for you. |
| 07 | QUESTIONS | What will my CIO ask? | Questions leaders ask / before they say yes. |
| Close | (kicker) | What now? | See it with / your own numbers. |

Order change: the decision gap moves from [02] to [01] (problem first, as on
the homepage); the role cockpit moves from [01] to [05], after the reader
knows why it matters. The loop ([05]) and capabilities ([04]) are replaced
by "Your Monday" and "Trust". Old anchors stay as aliases: `#your-lens`
(roles), `#the-loop` (Monday), `#capabilities` (trust).

## 4. Section by section

### Hero (kept; refined)

- Badge: Enterprise Intelligence. Headline unchanged.
- Lede: "Every decision touches customers, projects, people and cash.
  Enterprise Intelligence reads them as they change, so every leader sees
  the same live picture."
- Buttons unchanged: See it with your own data / Watch four 30-second
  stories.
- Ask bar: four questions short enough to fit the bar at every width (the
  old ones were cut off): "Someone asks for five days off. What does it
  break?", "A GPU node requested on Friday. What will it cost?", "What if
  our biggest deal slips a quarter?", "Monday, 8 a.m. Which three changes
  need me?"
- Note under the bar, true: "Every answer traces to its record · Live on
  ERPNext today · Salesforce, SAP and Oracle on the roadmap". The logo row
  in the lede goes (it claimed live connections we do not have, and the
  ERPNext chip showed the PostgreSQL mark).
- Outcome strip, plain and sourced by the page itself: No month-end wait /
  One set of numbers / Impact before approval / You stay in charge.

### [01] The decision gap (kept, moved up)

Unchanged from the 4 Nov redesign: the swimlane board (Sales, Delivery,
Finance, Leadership), the decision runway, the industry figures, the coda.

### [02] One picture (new)

- Lede: "Enterprise Intelligence does the work of FP&A and MIS. It reads
  your ERP as records change and joins every client, project, person and
  invoice into one picture you can question."
- **Visual: the constellation.** A wide, organic field of faint nodes (the
  whole business) arranged in four soft families (Customers, Work, People,
  Money). One path lights up through them, the leave story from video 1:
  Karthik Iyer, lead engineer → task T-108 on Claims Engine → Northwind's
  milestone sign-off → the $84,000 October invoice → the Q4 forecast. Curved
  hairlines, nodes with mono labels, drawn once. Beside it, the five views
  as a set of tags (Customer 360, Project 360, Employee 360, Finance,
  rolling 12-month forecast) and one caption: "Read-only. Every answer
  traces back to the record it came from."
- Why: answers "what is it?" before showing it at work, in the product's
  own words (video: "It follows the links across people, work and money").

### [03] Four stories (kept)

Unchanged: the four teaser videos with matched posters and colour.

### [04] Your Monday (new, replaces the loop; `PreviewTag` on the eyebrow)

- Lede: "Agents read every change in your systems and bring you only what
  needs a decision: the facts, the money at stake and a proposed action.
  You approve. Enterprise Intelligence follows through and records it."
- **Visual: the sieve.** An expansive dot field (one dot per change, about
  2,400) runs across the width. Three dots glow and flow along curved lines
  into three ranked decision cards, ordered by money at stake: Civic Digital
  kickoff needs three engineers by 17 Oct; Northwind Insurance renewal at
  risk ($180,000); Karthik's leave overlaps the Claims Engine critical path
  ($84,000). The first card is open: what the agents found, the proposed
  action, and Approve / Approve with changes / Dismiss.
- Coda: "Thousands of changes read. / Three decisions made."

### [05] Every leader (new form, replaces the role cockpit)

- Lede: "The chief executive, finance, sales, delivery and people leaders
  each open their own view. Every view reads the same records, so the
  weekly review starts from one set of figures."
- **Visual: five outcome cards** on one shared spine (the homepage [02]
  outcome-card form, so the page and the homepage read as one system): a
  role, the plain question it asks, one legible answer with its outcome in
  blue, a hairline drawing, a mono provenance line. CEO: where will we land
  this year? Finance: what cash is stuck? Sales: which renewals are at risk?
  Delivery: which projects are slipping? People: who is on the bench, and
  where are they needed?

### [06] Trust (new, replaces capabilities)

- Lede: "Click any number to see how it was defined, which records it came
  from and how fresh it is. Nothing changes in your systems until a named
  person approves it."
- **Visual: one figure, unfolded.** "$180,000 at risk" opens like a receipt
  into its working: the definition, the three source records (Salesforce
  opportunity, ERPNext invoice, project P-104), the as-at time. Beside it,
  the route an action takes: proposed, checked against your rules, approved
  by a named person, recorded. Three short promises below: Answers with
  sources / Each leader sees what they own / Your sign-off, on the record.
- One onward link: "How Akashic governs every figure" → /akashic.

### [07] Questions (kept content, trimmed)

Seven questions in plain words, two groups (What it is · What it does to
your systems): Does it replace my ERP? What does it need from us? How do I
know a figure is right? How is it different from asking an AI chatbot? You
say read-only, then you say it acts. Which is it? Who can see and approve
what? Where does my data live?

### Close (kept; copy tightened)

"See it with your own numbers." Prompt: "Bring one decision you cannot
close by Friday." 30 minutes: a live demo built around your week. 3 weeks:
if it fits, a read-only diagnostic on your own data.

## 5. Look and feel

- Cohesive with the homepage and /akashic: the same section grammar,
  porcelain grounds, one soft band ([01]), hairline drawings, mono labels,
  blue for the live answer, red only for cost.
- Expansive and organic: full-width drawings, curved connectors, fields of
  dots and nodes rather than grids of cards. Motion draws once in view and
  lands on the final state under reduced motion.
- Product UI teases, never reveals: small fragments at native size.

## 6. Build order and checks

One section at a time: hero fixes, then [02], [04], [05], [06], [07], close,
then the order and anchors. After each: tsc and lint, Playwright at 1440 and
390 in light and dark and with reduced motion, then a critique pass with the
installed design skills (Impeccable critique, Emil Kowalski's design
engineering), fix, and only then the next section.
