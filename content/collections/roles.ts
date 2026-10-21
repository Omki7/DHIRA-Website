/*
 * Open roles: one collection for the careers hero's seating plan, the
 * /careers board, the careers close and the homepage careers strip. In a
 * CMS (or the ATS at hand-off) this is the "Job posting" collection. Copy carries no hyphens, like the rest of the Company pages.
 *
 * `seat` is the short label the seating plan prints inside an open chair;
 * it is the discipline, not the job title, because a chair is ~90px wide.
 */

export interface Role {
  dept: string;
  seat: string;
  title: string;
  desc: string;
  location: string;
  type: string;
}

export const roles: Role[] = [
  {
    dept: "Engineering",
    seat: "Engineering",
    title: "Senior Data Engineer",
    desc: "Build and scale government data pipelines.",
    location: "Remote",
    type: "Full time",
  },
  {
    dept: "Machine Learning",
    seat: "Machine learning",
    title: "ML Researcher, Grounding Systems",
    desc: "Advance grounding and retrieval for public sector AI.",
    location: "Hyderabad",
    type: "Full time",
  },
  {
    dept: "Product",
    seat: "Product",
    title: "Product Manager, Akashic Platform",
    desc: "Own the roadmap for Akashic, the flagship platform.",
    location: "New York",
    type: "Full time",
  },
  {
    dept: "Delivery",
    seat: "Delivery",
    title: "Implementation Lead, Government",
    desc: "Lead large scale government deployments, end to end.",
    location: "Remote",
    type: "Full time",
  },
];
