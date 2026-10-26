import type { Block } from "../types";

/* Original editorial collection, prepared 26 October 2026.
   Research claims are linked inline; examples are explicitly illustrative.
   Organisation bylines do not attribute copy to a named executive.
   Existing article URLs are retained. No release availability is inferred
   from publication dates; agent capabilities remain in preview. */

export type InsightCategory = "AI strategy" | "Data foundations" | "Governance" | "Platform decisions" | "Public sector";
export type InsightCover = "handoff" | "definitions" | "authority" | "connections" | "economics" | "permissions" | "ownership" | "inclusion" | "foundation" | "deployment" | "forecast" | "evidence";

export interface Insight {
  slug: string;
  title: string;
  dek: string;
  category: InsightCategory;
  cover: InsightCover;
  /** ISO publication date. */
  date: string;
  author: { name: string; role: string };
  /** Marks the agent capability discussed, not the article's editorial status. */
  preview?: boolean;
  takeaway: string;
  sources: { title: string; publisher: string; href: string }[];
  blocks: Block[];
}

export const insights: Insight[] = [
  {
    "slug": "why-ai-pilots-stall",
    "title": "Your AI pilot worked. Who owns Monday morning?",
    "dek": "A convincing demonstration does not create an operating service. The next investment should fund the people, decisions and exceptions around the model.",
    "category": "AI strategy",
    "cover": "handoff",
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Before funding a rollout, name the owner of the business outcome and rehearse a bad day in the workflow.",
    "sources": [
      {
        "title": "State of AI-assisted Software Development 2025",
        "publisher": "Google Cloud research",
        "href": "https://dora.dev/research/2025/dora-report/"
      },
      {
        "title": "AI Risk Management Framework",
        "publisher": "National Institute of Standards and Technology",
        "href": "https://www.nist.gov/itl/ai-risk-management-framework"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Consider an illustrative procurement pilot. A team uploads a set of supplier documents, asks an AI assistant to compare commercial terms and gets a useful answer. The demonstration ends with a sensible question from the operations director: who handles a missing contract, a disputed clause or an urgent request when the specialist running the pilot is on leave?"
      },
      {
        "type": "p",
        "text": "The answer determines whether the organisation has bought a demonstration or built a service. A model can perform well inside a carefully prepared exercise while the surrounding process remains unstaffed, unmeasured and disconnected from everyday work."
      },
      {
        "type": "h2",
        "id": "name-the-owner",
        "text": "Put a business owner beside the technical owner"
      },
      {
        "type": "p",
        "text": "The technical owner keeps the service available and manages changes. The business owner decides whether an answer is useful enough, which cases need escalation and what success means in the operating budget. One person may hold both responsibilities in a small team. Both responsibilities still need an explicit home."
      },
      {
        "type": "p",
        "text": "For the procurement example, success could mean an approved comparison reaches a buyer sooner, with fewer corrections. Counting generated summaries would reward activity even when buyers spend more time repairing the summaries. Start the measurement at the arrival of a usable request and end at an accepted business result."
      },
      {
        "type": "p",
        "text": "Google Cloud’s [2025 software delivery research](https://dora.dev/research/2025/dora-report/) describes AI as an amplifier of existing organisational strengths and weaknesses. The research concerns software development, so the finding should not be treated as a procurement forecast. The useful management question travels well: which part of the existing operating system will faster output expose?"
      },
      {
        "type": "h2",
        "id": "rehearse-exceptions",
        "text": "Rehearse a bad day before adding users"
      },
      {
        "type": "p",
        "text": "A rollout review should include ordinary failures. Give the team a supplier with two similar legal names, an expired contract, a document outside the buyer’s permissions and a request needing information absent from the approved sources. Observe where work goes next. A refusal can be a correct outcome; a confident answer built on the wrong supplier is a failure."
      },
      {
        "type": "p",
        "text": "Keep a small set of representative cases, including exceptions, as a repeatable acceptance exercise. Run the exercise after changes to the model, retrieval rules, source data or prompt. Approval for one configuration should not silently become approval for every future configuration."
      },
      {
        "type": "p",
        "text": "Write down the fallback. Can a buyer complete the comparison manually? Can the team identify outputs produced during a faulty release? Who can restrict access while the fault is investigated? The [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) provides a lifecycle approach to managing AI risk. The operational choices here are our application of lifecycle risk management, rather than a universal deployment checklist."
      },
      {
        "type": "h2",
        "id": "fund-the-whole-service",
        "text": "Fund the work around the answer"
      },
      {
        "type": "p",
        "text": "The recurring cost includes document maintenance, permission reviews, user support, evaluation and exception handling. Include those responsibilities in the investment case while the pilot team is still available. Otherwise, unbudgeted work tends to land with the people closest to the customer or the deadline."
      },
      {
        "type": "p",
        "text": "Be precise about what a successful pilot permits. A limited release to trained users may be justified before a broad deployment. Expansion can follow evidence of repeatable quality and manageable review effort. A large waiting list is evidence of interest, not evidence of readiness."
      },
      {
        "type": "h2",
        "id": "the-rollout-decision",
        "text": "Make the next funding decision specific"
      },
      {
        "type": "p",
        "text": "Ask the sponsor to bring a named process owner, an accepted definition of a completed task, results from the exception exercise and an operating cost estimate. Compare the proposed service with the current process, including the current process’s own errors and delays. An AI system does not need perfection to be useful, but the trade-off needs to be visible."
      },
      {
        "type": "p",
        "text": "Governed data can support a useful answer; the organisation still owns the decision and the work following the answer. A rollout becomes credible when the team can explain how a normal Monday and a difficult Monday will run."
      }
    ]
  },
  {
    "slug": "why-your-systems-disagree",
    "title": "Three revenue numbers can all be correct",
    "dek": "When finance, sales and operations disagree, a new dashboard may only make the disagreement easier to see. Start with the decision behind the metric.",
    "category": "Data foundations",
    "cover": "definitions",
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Keep legitimate business definitions separate, then make the relationship between the numbers explicit.",
    "sources": [
      {
        "title": "The Government Data Quality Framework",
        "publisher": "UK Government",
        "href": "https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework"
      },
      {
        "title": "An overview of the provenance standards",
        "publisher": "World Wide Web Consortium",
        "href": "https://www.w3.org/TR/prov-overview/"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "In an illustrative monthly review, sales presents the value of signed orders. Operations presents fulfilled orders. Finance presents recognised revenue. The totals differ. Each team has followed a defensible rule, yet the meeting turns into a debate about which system is wrong."
      },
      {
        "type": "p",
        "text": "A single dashboard cannot settle a disagreement about what a number means. Neither can a language model. If an executive asks for revenue without specifying the purpose, the most fluent answer may simply hide the choice of definition."
      },
      {
        "type": "h2",
        "id": "name-the-decision",
        "text": "Name the decision before standardising the metric"
      },
      {
        "type": "p",
        "text": "A sales capacity decision needs a view of demand. A fulfilment decision needs a view of committed work and delivery. A financial reporting decision needs the accounting treatment owned by finance. Collapsing all three into a universal revenue measure would remove useful distinctions."
      },
      {
        "type": "p",
        "text": "Give each measure a precise name, a business owner and a calculation boundary. Record the event being counted, the relevant date, the treatment of cancellations, the currency basis and the included entities. These details belong beside the measure, rather than in a spreadsheet maintained by one analyst."
      },
      {
        "type": "p",
        "text": "The [Government Data Quality Framework](https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework) treats quality as fitness for purpose and distinguishes dimensions such as accuracy and timeliness. Applied to a management review, the lesson is practical: yesterday’s complete financial extract may be suitable for one decision and unsuitable for another."
      },
      {
        "type": "h2",
        "id": "build-the-bridge",
        "text": "Explain the bridge between the totals"
      },
      {
        "type": "p",
        "text": "Once definitions are explicit, reconciliation becomes a business explanation. Signed orders may include future delivery. Fulfilled orders may include items awaiting an accounting event. Cancellations, returns and exchange-rate choices may create further differences. The reconciliation should show the categories of difference and preserve the underlying records for investigation."
      },
      {
        "type": "p",
        "text": "Do not force every unexplained amount into a miscellaneous adjustment. Assign unresolved differences to an owner and retain the explanation as the investigation progresses. A visible exception is more useful than a clean total produced through an undocumented correction."
      },
      {
        "type": "p",
        "text": "Keep a distinction between a source error and a policy choice. A duplicated order needs correction. A choice about the reporting period needs agreement. Sending both problems to engineering creates a backlog engineers cannot legitimately resolve."
      },
      {
        "type": "h2",
        "id": "make-change-visible",
        "text": "Treat a definition change as a business change"
      },
      {
        "type": "p",
        "text": "An acquisition, a new sales channel or a revised commercial policy can change the meaning of a measure. Preserve the effective date and the reason for the change. Decide whether prior periods should be restated or displayed under the earlier definition. Without this decision, a trend line can imply growth caused by a change in scope."
      },
      {
        "type": "p",
        "text": "Data lineage helps a reviewer trace the displayed result through transformations to source records. The World Wide Web Consortium’s [provenance work](https://www.w3.org/TR/prov-overview/) describes information about the entities, activities and people involved in producing data. A business-facing implementation should make the relevant history intelligible without requiring an executive to inspect a pipeline."
      },
      {
        "type": "h2",
        "id": "ask-better-questions",
        "text": "Give conversational AI the same definitions"
      },
      {
        "type": "p",
        "text": "A conversational interface should use the agreed measure and reveal the reporting period and scope. When a question is ambiguous, clarification is a useful part of the answer. When an answer mixes incompatible definitions, a citation alone will not repair the reasoning."
      },
      {
        "type": "p",
        "text": "This is why a governed knowledge layer matters to Akashic’s platform direction. Shared meaning needs to travel with the records into Business Intelligence and Ask Akashic. More access to data only helps when the meaning of the resulting answer survives the journey."
      },
      {
        "type": "p",
        "text": "For the next management review, choose one disputed measure. Ask the relevant owners to document the definitions and produce the reconciliation together. The first deliverable is an agreed explanation of the differences. A redesign of the dashboard can follow once the organisation knows what the dashboard must say."
      }
    ]
  },
  {
    "slug": "agents-do-the-legwork",
    "title": "Before giving an AI agent a task, define its authority",
    "dek": "A useful recommendation and an authorised action are different things. Put the approval boundary into the workflow before expanding the agent’s remit.",
    "category": "Governance",
    "cover": "authority",
    "preview": true,
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Approve a bounded responsibility with clear escalation, rather than a broad promise of autonomy.",
    "sources": [
      {
        "title": "Excessive agency",
        "publisher": "Open Worldwide Application Security Project",
        "href": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
      },
      {
        "title": "Generative Artificial Intelligence Profile",
        "publisher": "National Institute of Standards and Technology",
        "href": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Imagine an illustrative supplier review. An AI agent gathers contract evidence and proposes merging two supplier records. The names are close, the addresses overlap and the recommendation looks reasonable. Approval could still join two separate legal entities, change spend reporting and complicate later investigations."
      },
      {
        "type": "p",
        "text": "The useful question is not whether the agent can complete more steps. Ask which steps the organisation is prepared to delegate, on what evidence, and under whose authority. Reading, recommending, approving and changing a business record are separate responsibilities."
      },
      {
        "type": "h2",
        "id": "specify-authority",
        "text": "Write the authority boundary in business language"
      },
      {
        "type": "p",
        "text": "Start with an explicit task: identify possible duplicate suppliers and prepare evidence for a data steward. Specify the records the agent may inspect, the information the recommendation must contain and the person entitled to approve a merge. Exclude unrelated records and actions even when a technical integration makes access convenient."
      },
      {
        "type": "p",
        "text": "The Open Worldwide Application Security Project identifies excessive functionality, permissions and autonomy as drivers of [excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/). Its guidance supports limiting capabilities and enforcing authorisation outside the model. In business terms, a persuasive explanation must never grant additional permission."
      },
      {
        "type": "p",
        "text": "A useful task definition also names the stopping conditions. Conflicting identifiers, missing source evidence or an unfamiliar entity type can trigger escalation. The agent should be allowed to return an unresolved case. Requiring a completed answer on every request encourages the appearance of certainty."
      },
      {
        "type": "h2",
        "id": "approval-needs-evidence",
        "text": "Make approval a decision people can inspect"
      },
      {
        "type": "p",
        "text": "A reviewer needs more than an approve button. Show the proposed change, the source records, the reason for the recommendation and the downstream uses of the affected data. Preserve material differences between records. A summary should reduce navigation, not hide the evidence needed to disagree."
      },
      {
        "type": "p",
        "text": "Measure the review burden during evaluation. A recommendation taking longer to validate than a manual investigation may still have specialist uses, but the investment case needs to reflect the actual work. Track rejection reasons as well as approval rates. A high approval rate can reflect reliable recommendations or a reviewer with insufficient time."
      },
      {
        "type": "p",
        "text": "Separate responsibility for preparing a recommendation from responsibility for accepting the consequence. For a consequential decision, the approving person needs the appropriate authority and a practical route to decline, amend or escalate. Assigning a reviewer without time or context creates a ceremonial control."
      },
      {
        "type": "h2",
        "id": "keep-a-decision-record",
        "text": "Retain the evidence around the decision"
      },
      {
        "type": "p",
        "text": "Keep the recommendation, relevant source versions, reviewer decision and reason together. After a model or workflow change, the team should be able to explain which configuration produced an earlier recommendation. Avoid storing every possible detail indefinitely; retention should follow the organisation’s defined purpose and obligations."
      },
      {
        "type": "p",
        "text": "The National Institute of Standards and Technology’s [generative AI profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) treats risks across the AI lifecycle. Our operational reading is to evaluate the complete recommendation and review process, including interactions between people, source data and the model."
      },
      {
        "type": "h2",
        "id": "expand-on-evidence",
        "text": "Expand the remit only after observing real work"
      },
      {
        "type": "p",
        "text": "Begin with a narrow population and compare recommendations against decisions from qualified reviewers. Include difficult cases deliberately. A wider remit introduces different records, permissions and consequences, so evidence from a simple task should not become blanket approval for another task."
      },
      {
        "type": "p",
        "text": "In Akashic, AI agents remain in preview. Pipeline agents help with pipeline work; matching agents propose entity matches for stewards to approve. These previews should not be read as autonomous approval or permission to write back into source systems."
      },
      {
        "type": "p",
        "text": "For an executive sponsor, the decision document can remain short: the task, permitted information, allowed outputs, approving role, stopping conditions and evidence required for expansion. Clarity at this boundary makes useful delegation possible without making accountability ambiguous."
      }
    ]
  },
  {
    "slug": "what-is-a-knowledge-layer",
    "title": "A correct answer needs more than the right document",
    "dek": "Enterprise questions cross contracts, customers, transactions and policies. A knowledge layer preserves the relationships and meaning needed to answer responsibly.",
    "category": "Data foundations",
    "cover": "connections",
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Evaluate whether an answer uses the right entity, period, definition and permission, as well as the right source.",
    "sources": [
      {
        "title": "An overview of the provenance standards",
        "publisher": "World Wide Web Consortium",
        "href": "https://www.w3.org/TR/prov-overview/"
      },
      {
        "title": "The Legal Entity Identifier",
        "publisher": "Global Legal Entity Identifier Foundation",
        "href": "https://www.gleif.org/en/organizational-identity/lei-vlei/the-legal-entity-identifier-lei"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Which customers are exposed to a supplier delay? The question sounds simple. A useful answer may need open orders, supplier relationships, product mappings, contract commitments and customer identities. Finding a document containing the supplier’s name is only the beginning."
      },
      {
        "type": "p",
        "text": "Consider an illustrative manufacturer with several trading names for one supplier. Purchasing uses a local account name, finance records the legal entity and operations uses a short label. A search assistant may retrieve accurate documents for each name while failing to connect the records. The resulting answer can be well cited and materially incomplete."
      },
      {
        "type": "h2",
        "id": "preserve-business-meaning",
        "text": "Preserve the meaning between systems"
      },
      {
        "type": "p",
        "text": "A knowledge layer is the governed context connecting records, documents, definitions and relationships. The value comes from making those connections dependable enough for a business question. A collection of files becomes more useful when the organisation can explain which entity each file concerns, which version applies and which measures use the underlying records."
      },
      {
        "type": "p",
        "text": "Entity resolution deals with whether records refer to the same real-world subject. Shared metric definitions explain how a business measure is calculated. Lineage records where information came from and how the information changed. Access rules determine which parts a particular person may use. These responsibilities are related, but no single one substitutes for the others."
      },
      {
        "type": "p",
        "text": "External identifiers can help where coverage exists. The Global Legal Entity Identifier Foundation describes the [Legal Entity Identifier](https://www.gleif.org/en/organizational-identity/lei-vlei/the-legal-entity-identifier-lei) as an identifier linked to reference information about legal entities. An enterprise still needs a policy for records lacking such identifiers, local account structures and relationships between a parent company and its subsidiaries."
      },
      {
        "type": "h2",
        "id": "do-not-erase-conflict",
        "text": "Keep disagreement visible"
      },
      {
        "type": "p",
        "text": "A shared layer should preserve unresolved ambiguity. Two similar names do not prove a match. An amended agreement should not silently erase the historical agreement. A supplier relationship valid last quarter may not apply to a current order."
      },
      {
        "type": "p",
        "text": "For the manufacturer, a useful answer distinguishes confirmed customer exposure from possible exposure awaiting review. The distinction lets an operations leader act on reliable evidence while assigning the uncertain cases. A single confident total would be easier to present and harder to defend."
      },
      {
        "type": "p",
        "text": "The World Wide Web Consortium’s [provenance standards](https://www.w3.org/TR/prov-overview/) provide a model for exchanging information about how data was produced. Our business interpretation is straightforward: the explanation of an answer should survive movement between systems, rather than remaining available only to the person who assembled the report."
      },
      {
        "type": "h2",
        "id": "evaluate-the-answer",
        "text": "Evaluate the whole chain to the answer"
      },
      {
        "type": "p",
        "text": "Use questions containing deliberate ambiguity. Ask about a customer with a parent and several subsidiaries. Ask for a measure spanning a definition change. Ask about a contract with an amendment. Repeat a question under users with different permissions. The purpose is to reveal whether the system maintains context under normal enterprise complexity."
      },
      {
        "type": "p",
        "text": "Inspect the selected records and the reasoning boundary. Did the system use current information? Did a similar name create a false match? Did the answer include evidence outside the user’s access? Did the response acknowledge missing information? Answer quality is a property of the full process, not the language model alone."
      },
      {
        "type": "h2",
        "id": "start-with-one-question",
        "text": "Build enough context for one valuable question"
      },
      {
        "type": "p",
        "text": "An organisation does not need to describe every relationship before creating value. Begin with a recurring decision, identify the necessary sources and agree the relevant definitions with their owners. Resolve the important identities, preserve lineage and test the permissions. Expand after the first decision works reliably."
      },
      {
        "type": "p",
        "text": "Akashic’s direction brings Data Pipelines, Master Data and Data Warehouse together with a governed knowledge layer supporting Business Intelligence, Ask Akashic and Machine Learning. The executive reason for this foundation is continuity: the meaning and controls established for one use case should remain available to the next."
      },
      {
        "type": "p",
        "text": "A useful procurement question follows: can the team explain one consequential answer from the executive’s question back to the records, definitions and access decisions? A polished response is easy to demonstrate. A dependable explanation of how the response was produced is more valuable."
      }
    ]
  },
  {
    "slug": "the-real-cost-of-an-ai-answer",
    "title": "The cheapest AI answer may create the most expensive work",
    "dek": "Token prices reveal only part of the bill. Measure the cost of an accepted business result, including retrieval, review, retries and exceptions.",
    "category": "AI strategy",
    "cover": "economics",
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Compare complete workflows at an agreed quality level before comparing model prices.",
    "sources": [
      {
        "title": "Unit economics",
        "publisher": "FinOps Foundation",
        "href": "https://www.finops.org/framework/capabilities/unit-economics/"
      },
      {
        "title": "FinOps Framework",
        "publisher": "FinOps Foundation",
        "href": "https://www.finops.org/framework/"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "A cheaper model lowers the inference bill. The business sponsor celebrates. Then analysts begin reopening more cases because summaries omit conditions or join the wrong records. The model is cheaper per answer, while the service is more expensive per accepted result. This illustrative situation captures a measurement problem executives should resolve before negotiating unit prices."
      },
      {
        "type": "p",
        "text": "AI spending sits across several budgets. Model usage may appear in a technology bill, document preparation in a project budget and human review in a business team’s workload. A comparison limited to one line item can move cost around without improving the economics of the service."
      },
      {
        "type": "h2",
        "id": "choose-the-unit",
        "text": "Choose a business unit with an acceptance boundary"
      },
      {
        "type": "p",
        "text": "For a supplier review, the unit might be an approved comparison. For a support workflow, the unit might be a resolved case meeting a quality standard. For an internal analyst, the unit might be a verified briefing accepted by the decision owner. Define the completion event before calculating cost."
      },
      {
        "type": "p",
        "text": "The FinOps Foundation’s [unit economics guidance](https://www.finops.org/framework/capabilities/unit-economics/) distinguishes resource efficiency measures, such as cost per token, from business measures, such as cost per resolved case. Both are useful. The former helps engineering optimise consumption; the latter helps a sponsor judge whether the workflow deserves investment."
      },
      {
        "type": "p",
        "text": "Keep the denominator honest. Exclude abandoned outputs from accepted results, but retain the associated cost. Count reopened cases consistently. If a team changes the definition of completion halfway through an experiment, report the change before presenting a trend."
      },
      {
        "type": "h2",
        "id": "include-hidden-work",
        "text": "Include the work outside the model"
      },
      {
        "type": "p",
        "text": "Build a cost view covering source preparation, retrieval, inference, evaluation, operational support and business review. Separate recurring variable costs from shared or fixed costs. A small pilot may look expensive because the team is building a reusable foundation. A large rollout may look cheap if the same foundation has been omitted from the calculation."
      },
      {
        "type": "p",
        "text": "Estimate review time with observed samples rather than an assumed percentage. Some cases need a quick source check. Others need a specialist to repeat the analysis. Record the distribution of effort so a difficult minority does not disappear inside an average."
      },
      {
        "type": "p",
        "text": "Retries deserve attention. A user may rephrase a question several times, switch models or ask an analyst to finish the task. Logging only the final successful response hides the cost of reaching the result. Connect attempts to the business task where the workflow and privacy requirements permit."
      },
      {
        "type": "h2",
        "id": "compare-like-for-like",
        "text": "Compare options at the same quality threshold"
      },
      {
        "type": "p",
        "text": "Evaluate a cheaper and a more expensive configuration on the same representative workload. Include ordinary cases, exceptions and refusals. Agree the minimum acceptable quality before inspecting the price difference. A model producing fewer acceptable results should not win solely because each request costs less."
      },
      {
        "type": "p",
        "text": "Routing can be a sensible design choice. Straightforward extraction may need less capability than a complex comparison across conflicting documents. A specialist workflow may justify a more capable model for a narrow portion of the work. The routing decision itself needs evaluation; misclassifying difficult cases as easy can undo the expected saving."
      },
      {
        "type": "p",
        "text": "Use the [FinOps Framework](https://www.finops.org/framework/) as a shared language between finance, engineering and business owners. The framework emphasises collaboration and accountability for technology value. The workflow measurement proposed here is our practical application to enterprise AI."
      },
      {
        "type": "h2",
        "id": "make-a-cost-decision",
        "text": "Ask what changes the economics"
      },
      {
        "type": "p",
        "text": "An executive review should identify the largest controllable cost drivers and the quality constraints around each driver. Better source data may reduce retries. Clearer scope may reduce unnecessary retrieval. Better evidence presentation may reduce review effort. A lower model price is one option among several."
      },
      {
        "type": "p",
        "text": "A better data foundation may benefit several workflows, so distinguish the shared investment from each workflow’s incremental cost. Reconcile the overall spending with finance before presenting savings attributed to individual projects."
      },
      {
        "type": "p",
        "text": "Approve expansion when the cost of an accepted result is understandable, the quality threshold is met and the organisation knows how costs change with demand. Keep the token bill on the dashboard, but give the completed business result the leading role."
      }
    ]
  },
  {
    "slug": "your-ai-assistant-inherited-your-permissions",
    "title": "Your AI assistant inherited your access problem",
    "dek": "Connecting more company knowledge can expose old permission mistakes faster. Review who may retrieve information before judging how well the assistant answers.",
    "category": "Governance",
    "cover": "permissions",
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Test access at retrieval and after permission changes, including cached answers and derived indexes.",
    "sources": [
      {
        "title": "Vector and embedding weaknesses",
        "publisher": "Open Worldwide Application Security Project",
        "href": "https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/"
      },
      {
        "title": "The cloud security principles",
        "publisher": "National Cyber Security Centre",
        "href": "https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Consider an illustrative organisation preparing an internal AI assistant. A shared folder contains general policy documents, an old acquisition plan and a spreadsheet copied from a restricted finance workspace. Employees rarely find the sensitive files through ordinary navigation. Search and summarisation make the files easier to discover."
      },
      {
        "type": "p",
        "text": "The assistant has not necessarily broken an access rule. The existing rule may already be wrong. Adding AI changes how efficiently people can use the access, which makes a dormant permission problem operationally significant."
      },
      {
        "type": "h2",
        "id": "inspect-the-information-path",
        "text": "Inspect the full path from source to answer"
      },
      {
        "type": "p",
        "text": "Begin with the sources selected for the first release. Identify the owner, the intended audience and the mechanism for granting or removing access. Include copied documents and exports, because the permission on a copy can differ from the permission on the original."
      },
      {
        "type": "p",
        "text": "Then inspect the derived stores. Search indexes, extracted text, embeddings, conversation history and cached answers may retain information after the source changes. The access design needs to explain how the user’s identity and current permissions apply throughout the information path."
      },
      {
        "type": "p",
        "text": "The Open Worldwide Application Security Project’s guidance on [vector and embedding weaknesses](https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/) identifies leakage from inadequate access controls and mixed contexts. Permission-aware retrieval and separation between datasets are important controls. An instruction telling the model to keep information secret is not a substitute for controlling retrieval."
      },
      {
        "type": "h2",
        "id": "test-denied-questions",
        "text": "Include questions a user must not be able to answer"
      },
      {
        "type": "p",
        "text": "Build evaluation around user roles as well as questions. A finance reviewer and an operations colleague may ask the same question and legitimately receive different evidence. Test direct questions, indirect summaries and requests comparing several documents. A restricted fact can leak through an aggregate or a summary even when the source document is not displayed."
      },
      {
        "type": "p",
        "text": "Include a permission-change exercise. Remove a user from a group, restrict a document and delete an obsolete copy. Check new answers, previous conversations and caches according to the intended retention policy. Record the expected propagation delay and assign responsibility for failures."
      },
      {
        "type": "p",
        "text": "Test with representative data under controlled conditions. Do not seed real secrets into an evaluation merely to see whether a model will disclose them. The security team should choose evidence appropriate to the environment and threat model."
      },
      {
        "type": "h2",
        "id": "separate-controls",
        "text": "Keep authorisation separate from answer quality"
      },
      {
        "type": "p",
        "text": "A correct answer can still be an unauthorised disclosure. A refusal can be the correct response to a question beyond the user’s access. Report these outcomes separately from factual accuracy, or an evaluation can reward the system for answering questions the system should decline."
      },
      {
        "type": "p",
        "text": "Prompt injection creates another boundary problem: retrieved text may contain instructions attempting to redirect the assistant. Treat external content as evidence to inspect, not authority to change permissions or operating rules. Security evaluation should cover malicious content as well as accidental over-sharing."
      },
      {
        "type": "p",
        "text": "The National Cyber Security Centre’s [cloud security principles](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles) cover secure user management, separation, administration and audit. These established responsibilities remain relevant when the interface becomes conversational. The model adds another component to secure; the surrounding controls remain essential."
      },
      {
        "type": "h2",
        "id": "release-a-bounded-library",
        "text": "Release a bounded library before connecting everything"
      },
      {
        "type": "p",
        "text": "Choose a useful set of sources with identifiable owners and maintainable access rules. Fix obvious over-sharing and document the exceptions. Expand after the team can demonstrate permission changes, investigate an answer and respond to an incident."
      },
      {
        "type": "p",
        "text": "Citations make evidence inspectable; access controls determine whether the evidence belongs in the answer. Demonstrate both for the proposed source integrations. Include a source owner in the review, because technical access and intended business access can differ."
      },
      {
        "type": "p",
        "text": "The executive release question is concrete: can the team show an authorised answer, a correctly denied answer and a revoked permission taking effect? A successful demonstration of all three is more informative than a broad promise of secure enterprise search."
      }
    ]
  },
  {
    "slug": "build-or-buy-the-operating-model",
    "title": "Build or buy is really a question about ownership",
    "dek": "A platform licence does not remove integration work. An internal build does not remove dependence. Compare the responsibilities your organisation will carry.",
    "category": "Platform decisions",
    "cover": "ownership",
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Compare the full operating responsibility of each option, including change, support and exit.",
    "sources": [
      {
        "title": "Managing technical lock-in in the cloud",
        "publisher": "UK Government",
        "href": "https://www.gov.uk/guidance/managing-technical-lock-in-in-the-cloud"
      },
      {
        "title": "Guidance for audit committees on cloud services",
        "publisher": "National Audit Office",
        "href": "https://www.nao.org.uk/wp-content/uploads/2021/04/Guidance-for-audit-committees-on-cloud-services-Accessible.pdf"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "An internal team presents a promising prototype. A vendor presents an integrated platform. The steering committee compares the prototype’s development estimate with the vendor’s subscription and concludes the internal option is cheaper. The comparison may be right, but the two numbers describe different things."
      },
      {
        "type": "p",
        "text": "This illustrative procurement situation leaves several questions unanswered: who maintains connectors when sources change, investigates access incidents, upgrades dependencies, supports users and preserves business definitions? These responsibilities continue after the initial build or purchase."
      },
      {
        "type": "h2",
        "id": "compare-responsibilities",
        "text": "Compare responsibilities before feature lists"
      },
      {
        "type": "p",
        "text": "Make an operating map for each option. Include source integration, identity, permissions, data quality, deployment, evaluation, monitoring, incident response and user support. Assign each responsibility to a team or supplier. Mark shared responsibilities explicitly, including the hand-off when a problem spans organisations."
      },
      {
        "type": "p",
        "text": "An integrated product may reduce the number of boundaries the organisation must coordinate. The product can also create dependence on a supplier’s release schedule and supported patterns. An internal build may preserve more design freedom while concentrating maintenance knowledge in a small group. Neither arrangement removes the need for an accountable owner."
      },
      {
        "type": "p",
        "text": "Ask the internal team to price sustained ownership, including recruitment and the opportunity cost of work displaced. Ask the vendor to identify implementation responsibilities excluded from the subscription. Use the same workload, availability expectations and support scope for both estimates."
      },
      {
        "type": "h2",
        "id": "price-change",
        "text": "Price the second and third change"
      },
      {
        "type": "p",
        "text": "A first use case can be unusually easy because the team chooses favourable data and a narrow audience. Introduce a realistic change: a new business unit, a source with different permissions or a reporting definition requiring historical treatment. Observe the work needed in each option."
      },
      {
        "type": "p",
        "text": "The relevant measure is not simply how quickly a feature appears. Consider how the change is tested, explained to users and supported after release. A rapid modification with an unclear owner can increase the cost of every subsequent change."
      },
      {
        "type": "p",
        "text": "Allow a hybrid answer. A company may buy common capabilities while retaining a distinctive decision process or domain model internally. The boundary should follow strategic value and maintainability, rather than an ideological preference for building or buying."
      },
      {
        "type": "h2",
        "id": "make-exit-concrete",
        "text": "Make the exit plan concrete"
      },
      {
        "type": "p",
        "text": "UK Government guidance on [technical lock-in](https://www.gov.uk/guidance/managing-technical-lock-in-in-the-cloud) recognises a trade-off between the value of provider-specific capabilities and the cost of moving. Avoiding every dependency can sacrifice useful features. Accepting every dependency without review can make future choices expensive."
      },
      {
        "type": "p",
        "text": "Request a practical export exercise. Can the organisation recover source data, modelled data, metric definitions, relevant history and access configuration in usable forms? Which parts would need reconstruction? Who owns the scripts, documentation and skills required for the move? An export button alone does not answer these questions."
      },
      {
        "type": "p",
        "text": "The National Audit Office’s [cloud guidance for audit committees](https://www.nao.org.uk/wp-content/uploads/2021/04/Guidance-for-audit-committees-on-cloud-services-Accessible.pdf) also treats exit as a strategic consideration, including skills and capability. Use an exit estimate to understand the commitment, rather than as a promise of an effortless migration."
      },
      {
        "type": "h2",
        "id": "decide-what-to-own",
        "text": "Choose the work worth owning"
      },
      {
        "type": "p",
        "text": "The strongest internal-build case explains why a capability differentiates the business and why the organisation can sustain the responsibility. The strongest platform case explains which repeated work the product absorbs and how the customer retains control over important data and decisions."
      },
      {
        "type": "p",
        "text": "Akashic is an option for organisations seeking a governed data and AI foundation. DHIRA also provides delivery and engineering services. A responsible evaluation should still test the actual sources, deployment constraints and operating boundaries. Platform breadth is a starting hypothesis for value, not proof of fit."
      },
      {
        "type": "p",
        "text": "Bring the decision back to ownership. After launch, which responsibilities will the organisation deliberately keep, which will a partner carry, and which depend on both? A procurement decision becomes more durable when the answer is explicit enough to survive a change of sponsor."
      }
    ]
  },
  {
    "slug": "reconciling-national-scale-data",
    "title": "A missing record can become a missing public service",
    "dek": "Public programmes need more than consolidated totals. Design reconciliation around exceptions, correction and the people affected by a data decision.",
    "category": "Public sector",
    "cover": "inclusion",
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Keep unresolved records visible and give authorised teams a traceable correction process.",
    "sources": [
      {
        "title": "Universal safeguards for digital public infrastructure",
        "publisher": "United Nations Development Programme",
        "href": "https://www.undp.org/press-releases/un-releases-universal-dpi-safeguards-framework-promote-safe-and-inclusive-digital-public-infrastructure"
      },
      {
        "title": "The Government Data Quality Framework",
        "publisher": "UK Government",
        "href": "https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Consider an illustrative public programme consolidating records from local offices. A name appears with different spellings, a date is missing and one office sends an extract late. A central report can still show a clean total. The people behind the unresolved records may remain invisible in the operational view."
      },
      {
        "type": "p",
        "text": "At population scale, reconciliation becomes a service-design responsibility. A record can influence follow-up, resource allocation or access to a process. The organisation needs to understand the consequences of an uncertain match, an omitted record and a delayed update before choosing how to treat each case."
      },
      {
        "type": "h2",
        "id": "preserve-the-exception",
        "text": "Preserve the exception instead of hiding the person"
      },
      {
        "type": "p",
        "text": "Keep accepted records, unresolved records and rejected records distinguishable. Explain the reason for each unresolved state and retain the source reference. A record failing a technical validation should not disappear from operational oversight simply because the record cannot yet enter the final dataset."
      },
      {
        "type": "p",
        "text": "Set thresholds according to consequence. Joining two records incorrectly can create a different harm from leaving a duplicate unresolved. A threshold appropriate for a broad analytical estimate may be inappropriate for an individual service decision. Programme owners should agree the trade-off with the relevant operational and governance teams."
      },
      {
        "type": "p",
        "text": "The [United Nations safeguards initiative](https://www.undp.org/press-releases/un-releases-universal-dpi-safeguards-framework-promote-safe-and-inclusive-digital-public-infrastructure) frames digital public infrastructure around safe and inclusive systems, with attention to individual and societal risks. Our interpretation for data operations is to make exclusion and correction visible alongside throughput."
      },
      {
        "type": "h2",
        "id": "give-correction-an-owner",
        "text": "Give correction an owner and a route back"
      },
      {
        "type": "p",
        "text": "A central team may detect a conflict without possessing the authority or evidence to resolve the conflict. Identify the local or programme-level role able to investigate. Provide the relevant records and an explicit reason for referral, rather than sending an unexplained error code."
      },
      {
        "type": "p",
        "text": "Record the decision and preserve the previous state. If the central system corrects a copy while the originating office continues to send the same error, the reconciliation becomes recurring work. Establish how an approved correction reaches the appropriate source owner and how later submissions are checked."
      },
      {
        "type": "p",
        "text": "Account for local constraints. A late extract can reflect connectivity, staffing or a different operating calendar. The response should distinguish an absent event from an event awaiting arrival. Otherwise, central teams may interpret a transmission problem as a service problem."
      },
      {
        "type": "h2",
        "id": "publish-confidence",
        "text": "Show the limits of an aggregate"
      },
      {
        "type": "p",
        "text": "A useful management view includes the reporting period, source coverage, late submissions and unresolved exceptions. These disclosures help programme leaders decide whether a total is ready for the intended use. A provisional aggregate can support planning when the limitation is clear; the same aggregate may be unsuitable for an individual determination."
      },
      {
        "type": "p",
        "text": "The [Government Data Quality Framework](https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework) distinguishes completeness, uniqueness, consistency, timeliness, validity and accuracy. These dimensions can pull in different directions. Waiting for every source improves completeness but may reduce usefulness for an urgent operational decision."
      },
      {
        "type": "p",
        "text": "Avoid an unsupported composite quality score. The programme needs the relevant failure modes and their consequences, not a reassuring percentage without an agreed interpretation. Report the measures required to judge the particular service."
      },
      {
        "type": "h2",
        "id": "keep-judgement-accountable",
        "text": "Use AI to support investigation with accountable judgement"
      },
      {
        "type": "p",
        "text": "AI can help organise evidence and identify possible matches. The authority to accept a consequential match or alter a service decision still belongs in the programme’s approved process. A suggestion should carry enough evidence for an authorised person to disagree."
      },
      {
        "type": "p",
        "text": "Evaluate the proposed configuration against the programme’s correction and accountability requirements. Keep operational reports separate from individual decision authority. A clearer aggregate view does not, by itself, authorise a change in how a person receives a service."
      },
      {
        "type": "p",
        "text": "A credible rollout review follows one unresolved record through detection, investigation, correction and later reporting. The programme should be able to explain who acted, on which evidence, and how the affected process was updated. Scale becomes meaningful when this path remains dependable for the exceptions."
      }
    ]
  },
  {
    "slug": "lay-the-groundwork-once",
    "title": "The second AI use case should inherit the first one’s groundwork",
    "dek": "Repeated source connections and metric definitions create repeated cost. Build a shared foundation around proven demand, with clear ownership and room for local differences.",
    "category": "Platform decisions",
    "cover": "foundation",
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Fund reusable data capabilities alongside a real use case, and test reuse with a second team before expanding the programme.",
    "sources": [
      {
        "title": "Platform engineering",
        "publisher": "Google Cloud research",
        "href": "https://dora.dev/capabilities/platform-engineering/"
      },
      {
        "title": "Managing technical lock-in in the cloud",
        "publisher": "UK Government",
        "href": "https://www.gov.uk/guidance/managing-technical-lock-in-in-the-cloud"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "A finance team connects customer data for a margin review. A sales team makes another copy for account planning. An operations team prepares a third version for demand analysis. Each initiative can deliver value. Together, the initiatives can create three different identities, access models and definitions for the same customer."
      },
      {
        "type": "p",
        "text": "This illustrative pattern becomes expensive when a source changes. Several teams must investigate the same change, update their transformations and explain different results. The organisation has funded repeated preparation without deliberately deciding whether the repetition is useful."
      },
      {
        "type": "h2",
        "id": "reuse-meaning",
        "text": "Reuse meaning and controls, as well as connections"
      },
      {
        "type": "p",
        "text": "A shared source connection is a useful start. Durable reuse also needs a clear identity model, agreed definitions, access rules, lineage and an owner for exceptions. A team receiving a dataset without this context still has substantial work before the dataset can support a consequential decision."
      },
      {
        "type": "p",
        "text": "Specify the reusable capability in business terms. For example, an approved customer reference could include legal and trading identities, the relationship between accounts, update expectations and a correction route. Different teams can build different analyses while referring to the same maintained foundation."
      },
      {
        "type": "p",
        "text": "Preserve legitimate local needs. Finance may need a legal-entity view while sales needs an account hierarchy. Sharing the underlying identity does not require pretending both views serve the same purpose. The common foundation should explain the relationship between the views."
      },
      {
        "type": "h2",
        "id": "avoid-the-grand-programme",
        "text": "Use the first project to establish demand"
      },
      {
        "type": "p",
        "text": "A shared platform programme can fail by trying to anticipate every future requirement. Begin with a use case carrying a named business owner and a measurable acceptance condition. Build the minimum reusable capabilities needed to support the decision reliably."
      },
      {
        "type": "p",
        "text": "Then bring a second team onto the same foundation. The second use case is an important test: can another team understand the definitions, obtain appropriate access and use the maintained records without depending on the original project specialists? Reuse claimed in an architecture slide is less persuasive than reuse demonstrated by a new team."
      },
      {
        "type": "p",
        "text": "Google Cloud’s research guidance on [platform engineering](https://dora.dev/capabilities/platform-engineering/) emphasises a user-centred approach to internal platforms. Applied here, the users are the teams building business decisions on shared data. Their waiting time, documentation needs and support experience belong in the platform’s measures of success."
      },
      {
        "type": "h2",
        "id": "fund-the-maintainer",
        "text": "Fund the maintainer after funding the builder"
      },
      {
        "type": "p",
        "text": "A reusable asset creates an ongoing obligation. Someone must handle source changes, approve definition changes, manage deprecation and respond when consumers find a problem. Assigning this work to an unfunded central team converts reuse into a queue."
      },
      {
        "type": "p",
        "text": "Make the service boundary explicit. State what the shared team maintains, what consuming teams may customise and which changes require consultation. Publish the support route and expected response process. The operating agreement can remain short, but consumers need a dependable way to resolve uncertainty."
      },
      {
        "type": "p",
        "text": "Track whether reuse reduces repeated work without hiding central costs. A common service can appear efficient if consuming teams absorb delays and manual work elsewhere. Ask both the provider and the consumers where effort has moved."
      },
      {
        "type": "h2",
        "id": "keep-the-foundation-adaptable",
        "text": "Keep the foundation adaptable"
      },
      {
        "type": "p",
        "text": "Document important dependencies and preserve practical export paths. UK Government guidance on [technical lock-in](https://www.gov.uk/guidance/managing-technical-lock-in-in-the-cloud) encourages an explicit balance between the benefits of integration and the cost of switching. Shared foundations deserve this review because more teams will depend on the same choices."
      },
      {
        "type": "p",
        "text": "Akashic’s platform direction brings ingestion, entity resolution, modelling and governance into a common foundation for multiple analytical and AI uses. DHIRA’s delivery work can help establish the operating responsibilities around the foundation. The business justification remains specific: which repeated preparation will the next use case avoid?"
      },
      {
        "type": "p",
        "text": "Approve a shared capability when the first team needs the capability, the second team can use the capability and an owner can maintain the capability. This keeps reuse connected to demand while preventing every new initiative from rebuilding the organisation’s meaning from scratch."
      }
    ]
  },
  {
    "slug": "akashic-1-0-generally-available",
    "title": "Before adopting Akashic, agree what goes live",
    "dek": "Turn a platform evaluation into a concrete acceptance decision: one use case, named data owners, a deployment boundary and an agreed operating model.",
    "category": "Platform decisions",
    "cover": "deployment",
    "preview": true,
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Accept the configured service against your own business question, data and operating requirements.",
    "sources": [
      {
        "title": "Akashic platform",
        "publisher": "DHIRA",
        "href": "/akashic"
      },
      {
        "title": "The cloud security principles",
        "publisher": "National Cyber Security Centre",
        "href": "https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "A platform evaluation can become a tour of features. Data arrives, charts appear and a conversational answer looks convincing. The sponsor still needs a different kind of evidence: can the organisation use the configured service for a real decision, with understood responsibilities and an acceptable operating cost?"
      },
      {
        "type": "p",
        "text": "For Akashic, start with a bounded use case. An illustrative example could be a monthly customer profitability review using approved finance and operational sources. Name the person accepting the result, the source owners and the users allowed to inspect the evidence. The evaluation now has a business boundary."
      },
      {
        "type": "h2",
        "id": "agree-the-release-scope",
        "text": "Agree the capability and release scope"
      },
      {
        "type": "p",
        "text": "The [Akashic platform page](/akashic) describes Data Pipelines, Master Data, Data Warehouse, Business Intelligence, Ask Akashic, Machine Learning and Governance. These modules address different parts of the journey from source records to decisions. A useful evaluation should show how the required parts work together for the chosen question."
      },
      {
        "type": "p",
        "text": "AI agents remain in preview. Preview work should have a separate acceptance boundary and must not become an unstated dependency of a production commitment. Ask the team to identify the exact release, enabled modules and supported integrations proposed for your environment. An article is not a contractual release notice."
      },
      {
        "type": "p",
        "text": "For a cited answer, inspect the supporting records and definitions. For entity resolution, inspect difficult matches and the review process. For Business Intelligence, trace a measure back to the agreed calculation. Evaluate the capability needed by the use case rather than requesting a demonstration of every possible feature."
      },
      {
        "type": "h2",
        "id": "choose-the-operating-boundary",
        "text": "Choose a deployment boundary with clear responsibilities"
      },
      {
        "type": "p",
        "text": "Akashic offers cloud, on-premises and hybrid deployment choices. The relevant decision includes where data is stored and processed, where model inference runs, who administers the environment and who responds to an incident. A hosting label alone does not settle these questions."
      },
      {
        "type": "p",
        "text": "Map the information path for the proposed configuration, including connectors, logs, backups and model providers. Identify the parties able to access each part and the controls governing access. Have the appropriate security and legal owners assess the actual arrangement against the organisation’s requirements."
      },
      {
        "type": "p",
        "text": "The National Cyber Security Centre’s [cloud security principles](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles) provide useful questions about administration, operational security, user management and evidence. These principles are a reference for evaluating responsibilities, not a certification claim about Akashic or a substitute for reviewing the deployment."
      },
      {
        "type": "h2",
        "id": "write-the-acceptance-exercise",
        "text": "Use an acceptance exercise with difficult cases"
      },
      {
        "type": "p",
        "text": "Prepare a small set of business questions with expected evidence and a defined reviewer. Include a missing source, a conflicting record, an out-of-date document and a user lacking access. Agree what a correct refusal or unresolved result should look like."
      },
      {
        "type": "p",
        "text": "Run the exercise against the configured environment. Keep the output, source references and reviewer decisions. Resolve unexplained differences before widening the audience. A successful answer to a prepared demonstration question is useful evidence, but the acceptance exercise should also represent the situations users will bring on an ordinary day."
      },
      {
        "type": "p",
        "text": "Agree the treatment of changes. A new source, a different model or a revised business definition may require part of the exercise to be repeated. Record which team can approve the change and how users will learn about material differences."
      },
      {
        "type": "h2",
        "id": "accept-the-operating-service",
        "text": "Accept the operating service alongside the software"
      },
      {
        "type": "p",
        "text": "Before rollout, confirm the source-maintenance process, user-support route, escalation responsibilities and handover material. Include recurring costs and the work remaining with the customer. A delivery partner can carry agreed responsibilities, but ownership should be explicit in the engagement."
      },
      {
        "type": "p",
        "text": "Define the evidence needed to expand. The next team or business unit may introduce different permissions, identities and quality requirements. Use the first release to establish a repeatable operating pattern, while treating the next release as a fresh acceptance decision where the context changes."
      },
      {
        "type": "p",
        "text": "A productive Akashic evaluation ends with a clear statement: this configured service supports this business question, for these users, using these sources, under these operating responsibilities. Such a statement is easier to fund, govern and improve than a broad declaration of platform readiness."
      }
    ]
  },
  {
    "slug": "a-better-forecast-needs-a-better-question",
    "title": "A more accurate forecast can still produce a worse decision",
    "dek": "The useful forecast reflects the planning horizon, the cost of being wrong and the information available when the decision must be made.",
    "category": "Data foundations",
    "cover": "forecast",
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Evaluate the forecast at the decision’s actual horizon, against a simple baseline and the business cost of error.",
    "sources": [
      {
        "title": "The forecaster’s toolbox",
        "publisher": "Rob J. Hyndman and George Athanasopoulos",
        "href": "https://otexts.com/fpp3/toolbox.html"
      },
      {
        "title": "Judgmental forecasts",
        "publisher": "Rob J. Hyndman and George Athanasopoulos",
        "href": "https://otexts.com/fpp3/judgmental.html"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "An illustrative distributor improves average forecast accuracy across its catalogue. The operations director still sees shortages in important products and excess stock elsewhere. The model has improved according to the reported metric, while the decisions made from the forecast have become no easier."
      },
      {
        "type": "p",
        "text": "The problem may sit in the question being evaluated. A forecast useful for a monthly revenue outlook can be unsuitable for a replenishment decision with a long supplier lead time. An average can conceal the particular errors carrying the largest business consequence."
      },
      {
        "type": "h2",
        "id": "start-with-the-decision",
        "text": "Start with the decision and its deadline"
      },
      {
        "type": "p",
        "text": "Write down what the forecast will change. A purchasing decision needs a view over the replenishment horizon. A staffing decision needs demand at the relevant location and shift. A cash-planning decision needs the timing of receipts and payments. These uses should not automatically share the same target, level of detail or evaluation measure."
      },
      {
        "type": "p",
        "text": "Include the time available to act. A forecast produced after the order deadline may be statistically accurate and operationally irrelevant. Evaluate using the source data available when the real decision would have been made, including normal delays and revisions."
      },
      {
        "type": "p",
        "text": "Hyndman and Athanasopoulos explain the distinction between fitted values and genuine forecast evaluation in [Forecasting: Principles and Practice](https://otexts.com/fpp3/toolbox.html). Their treatment supports testing on observations unavailable during model fitting and comparing against simple forecasting methods. An executive should ask for this comparison before accepting a claim of improvement."
      },
      {
        "type": "h2",
        "id": "inspect-the-cost-of-error",
        "text": "Inspect the cost of different errors"
      },
      {
        "type": "p",
        "text": "Underestimating demand for an essential item may carry a different consequence from overestimating demand for a discretionary item. A business owner should explain those consequences before a team selects an optimisation target. The purpose is to connect model evaluation to the decision, rather than to invent a single universal accuracy score."
      },
      {
        "type": "p",
        "text": "Review performance by the segments affecting action: product family, location, horizon or demand pattern. Keep the segments agreed in advance so the team cannot select only favourable results. Show the overall picture alongside the failures important to the business."
      },
      {
        "type": "p",
        "text": "Use uncertainty in the planning conversation. A point estimate can hide a wide range of plausible outcomes. Decision-makers need to know which actions remain sensible across the range and which commitments depend on a narrow forecast being correct."
      },
      {
        "type": "h2",
        "id": "record-human-adjustments",
        "text": "Record human adjustments and their reasons"
      },
      {
        "type": "p",
        "text": "Commercial teams may know about a promotion, a supplier interruption or a product withdrawal missing from the model’s inputs. Preserve the original forecast and the adjusted version, along with the reason and timing of the intervention. Later review can then distinguish model performance from management judgement."
      },
      {
        "type": "p",
        "text": "The same authors discuss structured judgement in their chapter on [judgmental forecasts](https://otexts.com/fpp3/judgmental.html). The practical implication for a leadership team is to make adjustments reviewable. An unexplained override prevents the organisation from learning whether the adjustment helped."
      },
      {
        "type": "p",
        "text": "Avoid treating the budget as the expected outcome. A target can express ambition; a forecast should represent the best available estimate. Repeatedly adjusting a forecast to match a target removes information the organisation needs to respond early."
      },
      {
        "type": "h2",
        "id": "connect-the-data-to-action",
        "text": "Keep the data, model and decision connected"
      },
      {
        "type": "p",
        "text": "Document changes in product identity, customer scope, source timing and business definitions. A model may appear to drift because the underlying measurement changed. Investigating the model without inspecting the data history can send a team towards an unnecessary rebuild."
      },
      {
        "type": "p",
        "text": "Keep preparation, definitions and model work connected so an analyst can investigate a poor result without reconstructing the entire history. When a source changes, decide whether to update the model, adjust the interpretation or temporarily limit the forecast’s use."
      },
      {
        "type": "p",
        "text": "For the next forecast review, request the decision horizon, the simple baseline, the important error segments and the record of human adjustments. Ask what action would change under a plausible alternative outcome. A useful forecast earns a place in planning by improving the decision made before the future becomes known."
      }
    ]
  },
  {
    "slug": "what-the-board-should-ask-about-ai",
    "title": "What changed in the business after the AI budget was spent?",
    "dek": "Adoption figures show activity. A board review needs evidence of accepted outcomes, realised benefits, operating costs and decisions about what happens next.",
    "category": "AI strategy",
    "cover": "evidence",
    "date": "2026-10-26",
    "author": {
      "name": "DHIRA Editorial",
      "role": "Data, AI and business"
    },
    "takeaway": "Separate usage, task improvement and realised business benefit, and require a named owner for each claim.",
    "sources": [
      {
        "title": "Generative AI at Work",
        "publisher": "National Bureau of Economic Research",
        "href": "https://www.nber.org/papers/w31161"
      },
      {
        "title": "Management practices and AI adoption in UK firms",
        "publisher": "Office for National Statistics",
        "href": "https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/articles/managementpracticesandtheadoptionoftechnologyandartificialintelligenceinukfirms2023/2025-03-24"
      }
    ],
    "blocks": [
      {
        "type": "p",
        "text": "An illustrative board paper reports growing AI usage, more employees with access and a long list of pilots. Every figure can be accurate while the central investment question remains unanswered: what changed in the business because of the spending?"
      },
      {
        "type": "p",
        "text": "A useful review separates three layers. Adoption describes whether people use the capability. Task performance describes whether the work improves. Realised benefit describes what the organisation does with the improvement. Moving from one layer to the next requires evidence and an operating decision."
      },
      {
        "type": "h2",
        "id": "separate-the-claims",
        "text": "Separate adoption from business value"
      },
      {
        "type": "p",
        "text": "Usage can reveal interest and help diagnose friction. Frequent use does not establish quality, and broad access does not establish economic value. An assistant used to generate drafts may save time, produce extra review work or simply increase the volume of material nobody needed."
      },
      {
        "type": "p",
        "text": "For each material initiative, name the task and the acceptance standard. Compare the current process with the AI-supported process using representative work. Include corrections, rejected outputs and cases handed back to a person. The comparison should reflect the whole task, rather than the easiest step to measure."
      },
      {
        "type": "p",
        "text": "The National Bureau of Economic Research’s [Generative AI at Work](https://www.nber.org/papers/w31161) studies a customer-support setting and reports differing effects across workers. The setting and variation matter. A result from one workflow should not become a universal productivity assumption for an unrelated function."
      },
      {
        "type": "h2",
        "id": "explain-how-value-is-realised",
        "text": "Explain how saved effort becomes a benefit"
      },
      {
        "type": "p",
        "text": "If a task takes less time, ask what happens to the released capacity. The team might serve more demand, reduce a backlog, improve quality or change staffing plans. Each outcome requires a different operational choice and a different form of evidence."
      },
      {
        "type": "p",
        "text": "Do not book estimated hours saved as cash savings unless the budget actually changes. Equally, do not dismiss a worthwhile service improvement because the immediate benefit is not a reduction in headcount. The claim should match the realised outcome: capacity, quality, speed, risk reduction or financial saving."
      },
      {
        "type": "p",
        "text": "Assign a business owner to the benefit and agree when the benefit will be reviewed. Technology teams can measure service behaviour, but the operating team controls many of the choices needed to realise value. A benefit with no accountable owner is difficult to distinguish from an aspiration."
      },
      {
        "type": "h2",
        "id": "show-the-full-investment",
        "text": "Show the operating costs and constraints"
      },
      {
        "type": "p",
        "text": "Include recurring model and infrastructure costs, source maintenance, support, evaluation and review effort. Explain the shared foundation supporting several use cases and avoid charging the same investment to every initiative without showing the allocation method."
      },
      {
        "type": "p",
        "text": "Report constraints alongside outcomes. Permission gaps, missing source ownership or insufficient review capacity can limit expansion even when a model performs well. The board needs the constraint affecting the next investment decision, rather than a catalogue of every technical issue."
      },
      {
        "type": "p",
        "text": "The Office for National Statistics’ [research on management practices and technology adoption](https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/articles/managementpracticesandtheadoptionoftechnologyandartificialintelligenceinukfirms2023/2025-03-24) examines how adoption varies with management practices. The evidence is observational, so association should not be presented as proof of causation. The practical question remains whether the organisation has the management capacity to turn a tool into a dependable process."
      },
      {
        "type": "h2",
        "id": "make-the-next-decision",
        "text": "End the review with an investment decision"
      },
      {
        "type": "p",
        "text": "Classify the next action in plain language: expand a proven workflow, repair a specific weakness, continue a bounded experiment or stop work without a credible route to value. Avoid allowing every pilot to remain permanently promising."
      },
      {
        "type": "p",
        "text": "For expansion, state which evidence supports the decision and which assumptions change with scale. A new geography, user group or data source may introduce a different operating problem. The plan should include the cost and responsibility for evaluating those changes."
      },
      {
        "type": "p",
        "text": "A strong board paper lets a reader trace the spending to an accepted outcome, understand the remaining uncertainty and decide what should happen next. Keep the operating owner in the room for the review. The person accountable for the benefit should be able to explain both the evidence and the next commitment."
      }
    ]
  }
];
