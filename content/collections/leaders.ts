/* ------------------------------------------------------------------ */
/*  Leadership                                                         */
/* ------------------------------------------------------------------ */
/* One collection for /about [04] People and the /newsroom media kit. In a
   CMS this is the "Person" collection; `imageClass` is an art-direction
   hint for the portrait crop. */

export interface Leader {
  id: string;
  name: string;
  role: string;
  focus: string;
  image: string;
  imageClass: string;
}

export const leaders: Leader[] = [
  { id: "dilip", name: "Dilip Hanumara", role: "Founder and CEO", focus: "Company direction and architecture strategy.", image: "/avatars/dilip-executive-v1.webp", imageClass: "object-center" },
  { id: "sirish", name: "Sirish Simha", role: "Head of Technology", focus: "Platform engineering and distributed systems.", image: "/avatars/sirish-executive-v1.webp", imageClass: "object-center" },
  { id: "rupa", name: "Rupa Sridhar", role: "Head of Solutions", focus: "Enterprise AI and data systems.", image: "/avatars/rupa-executive-v1.webp", imageClass: "object-center" },
  { id: "rajiv", name: "Rajiv Kumar", role: "Head of Talent and HR", focus: "Engineering culture and team development.", image: "/avatars/rajiv-executive-v1.webp", imageClass: "object-center" },
  { id: "pratheep", name: "Pratheep Menon", role: "Head of Business Development", focus: "Strategic partnerships and enterprise relationships.", image: "/avatars/pratheep-executive-v1.webp", imageClass: "object-center" },
];
