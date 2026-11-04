import type { ImageAsset } from "../types";

/**
 * About [05] concept roster, sourced 4 November 2026.
 * Bios are editorial DRAFTS written at the user's request, not employee quotes.
 * Public role/roster data and every bio need owner review before publication.
 * Missing photos deliberately stay undefined; the component displays initials.
 * Provenance and review notes: docs/ABOUT_TEAM_SOURCES.md.
 */
export interface AboutTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: ImageAsset;
  position?: string;
  /** Centre of the crop in the square image, as percentages, plus magnification. */
  framing?: { scale: number; x: number; y: number };
  sourceUrl: string;
}

export const aboutTeam: AboutTeamMember[] = [
  {
    "id": "monica-kishor",
    "name": "Monica Kishor",
    "role": "Senior Cloud Developer",
    "bio": "Monica thinks about the people who will run a system long after launch. She brings care to the cloud foundations, making room for the team to build with confidence.",
    "sourceUrl": "https://dhira.io/aboutus/",
    "position": "50% 20%",
    "image": {
      "src": "/about/team/monica-kishor-studio-v1.webp",
      "alt": "Monica Kishor"
    }
  },
  {
    "id": "shubhi-vyas",
    "name": "Shubhi Vyas",
    "role": "Senior User Experience Designer",
    "bio": "Shubhi starts with the person on the other side of the screen. She turns complicated journeys into clear choices, and keeps asking whether something could feel a little easier.",
    "framing": {
      "scale": 1.65,
      "x": 47,
      "y": 50
    },
    "sourceUrl": "https://in.linkedin.com/in/shubhi-vyas-7bb45b188",
    "image": {
      "src": "/about/team/shubhi-vyas-public-v1.jpg",
      "alt": "Shubhi Vyas"
    }
  },
  {
    "id": "veman-shrinivas-chippa",
    "name": "Veman Shrinivas Chippa",
    "role": "Data Engineer",
    "bio": "For Veman, an interesting idea is an invitation to make something. He connects data engineering with a product builder's curiosity, taking early experiments towards things people can actually use.",
    "framing": {
      "scale": 2.5,
      "x": 76,
      "y": 36
    },
    "sourceUrl": "https://in.linkedin.com/in/veman-chippa",
    "image": {
      "src": "/about/team/veman-shrinivas-chippa-public-v1.jpg",
      "alt": "Veman Shrinivas Chippa"
    }
  },
  {
    "id": "bhaskar-sarkar",
    "name": "Bhaskar Sarkar",
    "role": "Senior Data Engineer",
    "bio": "Bhaskar enjoys following a problem through its different layers. From the data underneath to the application above, he helps the pieces make sense together and brings others into the thinking.",
    "sourceUrl": "https://dhira.io/aboutus/",
    "position": "50% 20%",
    "image": {
      "src": "/about/team/bhaskar-sarkar-studio-v1.webp",
      "alt": "Bhaskar Sarkar"
    }
  },
  {
    "id": "parul-bandi",
    "name": "Parul Bandi",
    "role": "User Experience Designer",
    "bio": "Parul notices the small moment when an interface stops making sense. She works through it with sketches, questions and careful detail, helping useful technology feel natural to the people using it.",
    "framing": {
      "scale": 1.2,
      "x": 50,
      "y": 43
    },
    "sourceUrl": "https://theorg.com/org/dhira",
    "image": {
      "src": "/about/team/parul-bandi-public-v1.jpg",
      "alt": "Parul Bandi"
    }
  },
  {
    "id": "yash-kanvinde",
    "name": "Yash Kanvinde",
    "role": "Senior Full-Stack Business Intelligence Developer",
    "bio": "Yash follows a question all the way from the data model to the answer on screen. He likes giving people enough clarity to ask their next, better question.",
    "sourceUrl": "https://dhira.io/aboutus/",
    "position": "50% 20%",
    "image": {
      "src": "/about/team/yash-kanvinde-studio-v1.webp",
      "alt": "Yash Kanvinde"
    }
  },
  {
    "id": "neha",
    "name": "Neha",
    "role": "Software Engineer",
    "bio": "Neha approaches software with an eye for the everyday experience. She pays attention to the awkward steps and loose ends that, once resolved, make a product feel thoughtfully put together.",
    "framing": {
      "scale": 1.8,
      "x": 54,
      "y": 48
    },
    "sourceUrl": "https://theorg.com/org/dhira",
    "image": {
      "src": "/about/team/neha-public-v1.jpg",
      "alt": "Neha"
    }
  },
  {
    "id": "naved-ansari",
    "name": "Naved Ansari",
    "role": "Software Engineer",
    "bio": "Naved is comfortable moving between different parts of a product. He enjoys joining the logic behind the scenes with the experience on screen, so the whole thing feels considered.",
    "sourceUrl": "https://dhira.io/aboutus/",
    "position": "50% 20%",
    "image": {
      "src": "/about/team/naved-ansari-studio-v1.webp",
      "alt": "Naved Ansari"
    }
  },
  {
    "id": "alok-jha",
    "name": "Alok Jha",
    "role": "Data Engineer",
    "bio": "Alok likes to know where a number came from. He follows the trail through the data, making its meaning clearer for colleagues who need to build on it.",
    "sourceUrl": "https://theorg.com/org/dhira",
    "image": {
      "src": "/about/team/alok-jha-public-v1.jpg",
      "alt": "Alok Jha"
    }
  },
  {
    "id": "pradeep-kumar-maurya",
    "name": "Pradeep Kumar Maurya",
    "role": "Software Engineer",
    "bio": "Pradeep gravitates towards the machinery behind a good product. Clear interfaces between services and code another person can understand are part of how he makes ambitious ideas practical.",
    "sourceUrl": "https://in.linkedin.com/in/pradeepkm21",
    "image": {
      "src": "/about/team/pradeep-kumar-maurya-public-v1.jpg",
      "alt": "Pradeep Kumar Maurya"
    }
  },
  {
    "id": "vipul-gabhane",
    "name": "Vipul Gabhane",
    "role": "Data Engineer",
    "bio": "Vipul turns recurring data problems into dependable routines. His work helps the team spend less time untangling yesterday's inputs and more time exploring what they can build next.",
    "sourceUrl": "https://dhira.io/aboutus/",
    "position": "50% 20%",
    "image": {
      "src": "/about/team/vipul-gabhane-studio-v1.webp",
      "alt": "Vipul Gabhane"
    }
  },
  {
    "id": "krishna-borse",
    "name": "Krishna Borse",
    "role": "Data Engineer",
    "bio": "Krishna is drawn to the journey data takes between systems. He works through the transformations and edge cases that help information arrive where it is needed, with its meaning intact.",
    "sourceUrl": "https://in.linkedin.com/in/krishna-borse-05a213105",
    "image": {
      "src": "/about/team/krishna-borse-public-v1.jpg",
      "alt": "Krishna Borse"
    }
  },
  {
    "id": "jitendra-billava",
    "name": "Jitendra Billava",
    "role": "Cloud Developer",
    "bio": "Jitendra looks closely at the handoffs between services. He brings a steady engineering perspective to the details that help a system hold together when real people start depending on it.",
    "sourceUrl": "https://dhira.io/aboutus/",
    "position": "50% 20%",
    "image": {
      "src": "/about/team/jitendra-billava-studio-v1.webp",
      "alt": "Jitendra Billava"
    }
  },
  {
    "id": "dilip",
    "name": "Dilip Hanumara",
    "role": "Founder and Chief Executive Officer",
    "bio": "Dilip keeps the team's ambition connected to a useful question: whose problem are we solving? He brings the larger picture into technical conversations, with space for people to challenge the answer.",
    "position": "50% 20%",
    "sourceUrl": "https://dhira.io/aboutus/",
    "image": {
      "src": "/avatars/dilip-executive-v1.webp",
      "alt": "Dilip Hanumara"
    }
  },
  {
    "id": "rupa",
    "name": "Rupa Sridhar",
    "role": "Head of Solutions",
    "bio": "Rupa listens for the real problem beneath the initial brief. She connects the needs of an organisation with the possibilities of data and AI, giving teams a practical place to begin.",
    "position": "50% 20%",
    "sourceUrl": "https://dhira.io/aboutus/",
    "image": {
      "src": "/avatars/rupa-executive-v1.webp",
      "alt": "Rupa Sridhar"
    }
  },
  {
    "id": "sandeep-jangid",
    "name": "Sandeep Jangid",
    "role": "Software Engineer",
    "bio": "Sandeep brings a learner's curiosity to unfamiliar problems. He likes getting a first version working, listening to what it reveals and improving it with the people around him.",
    "framing": {
      "scale": 2.1,
      "x": 50,
      "y": 25
    },
    "sourceUrl": "https://in.linkedin.com/in/sandeep-jangid-204b47169",
    "image": {
      "src": "/about/team/sandeep-jangid-public-v1.jpg",
      "alt": "Sandeep Jangid"
    }
  },
  {
    "id": "amit-barik",
    "name": "Amit Barik",
    "role": "Data Science India Practice Lead",
    "bio": "Amit helps turn an open question into a useful experiment. He connects data science with the decision it needs to support, making room for both technical rigour and honest uncertainty.",
    "sourceUrl": "https://theorg.com/org/dhira"
  },
  {
    "id": "yusha-tahlil",
    "name": "Yusha Tahlil",
    "role": "Software Engineer",
    "bio": "Yusha works across the stack, from data workflows to the interfaces that make them usable. He enjoys taking a complicated process apart and rebuilding it around a clearer experience.",
    "sourceUrl": "https://yusha.vercel.app/",
    "image": {
      "src": "/about/team/yusha-tahlil-public-v1.png",
      "alt": "Yusha Tahlil"
    }
  },
  {
    "id": "kali-surada",
    "name": "Kali Surada",
    "role": "Enterprise Architect",
    "bio": "Kali thinks about how today's decisions will feel to tomorrow's team. He connects architecture to the realities of an organisation, leaving enough clarity and flexibility for people to keep moving.",
    "sourceUrl": "https://theorg.com/org/dhira",
    "image": {
      "src": "/about/team/kali-surada-public-v1.jpg",
      "alt": "Kali Surada"
    }
  },
  {
    "id": "vinay-kulkarni",
    "name": "Vinay Kulkarni",
    "role": "Data Engineer",
    "bio": "Vinay has patience for the foundations: consistent records, sensible structures and details that deserve another look. His work gives the rest of the team firmer ground to build on.",
    "sourceUrl": "https://dhira.io/aboutus/",
    "position": "50% 20%",
    "image": {
      "src": "/about/team/vinay-kulkarni-studio-v1.webp",
      "alt": "Vinay Kulkarni"
    }
  },
  {
    "id": "sarathkumar-thangavel",
    "name": "Sarathkumar Thangavel",
    "role": "Senior User Experience Designer",
    "bio": "Sarathkumar looks for the thread that makes a whole product understandable. He helps teams connect individual screens into a journey that feels coherent from the first step to the last.",
    "sourceUrl": "https://in.linkedin.com/in/sarathkumar-thangavel-a1a5a065"
  },
  {
    "id": "vishwanandan-ka",
    "name": "Vishwanandan K A",
    "role": "Data Engineer",
    "bio": "Vishwanandan makes room for the question nobody has asked yet. He enjoys working through difficult data problems with colleagues and leaving behind an explanation that helps the next person.",
    "sourceUrl": "https://dhira.io/aboutus/",
    "position": "50% 20%",
    "image": {
      "src": "/about/team/vishwanandan-ka-studio-v1.webp",
      "alt": "Vishwanandan K A"
    }
  },
  {
    "id": "sirish",
    "name": "Sirish Simha",
    "role": "Head of Technology",
    "bio": "Sirish brings patient reasoning to difficult engineering decisions. He helps the team understand why an approach works, so good judgement can travel further than any one person.",
    "position": "50% 20%",
    "sourceUrl": "https://dhira.io/aboutus/",
    "image": {
      "src": "/avatars/sirish-executive-v1.webp",
      "alt": "Sirish Simha"
    }
  },
  {
    "id": "m-kaim",
    "name": "M Kaim",
    "role": "Software Engineer",
    "bio": "Kaim likes finding a clear path through a tangled piece of software. Small, understandable changes are the starting point, with an eye on how they add up to a better product.",
    "framing": {
      "scale": 3.1,
      "x": 47,
      "y": 20
    },
    "sourceUrl": "https://theorg.com/org/dhira",
    "image": {
      "src": "/about/team/m-kaim-public-v1.jpg",
      "alt": "M Kaim"
    }
  },
  {
    "id": "ashish-chaudhary",
    "name": "Ashish Chaudhary",
    "role": "Senior Business Analyst",
    "bio": "Ashish helps people get precise about what they need. He turns conversations into shared understanding, connecting the language of the business with the questions an engineering team needs answered.",
    "sourceUrl": "https://theorg.com/org/dhira",
    "image": {
      "src": "/about/team/ashish-chaudhary-public-v1.jpg",
      "alt": "Ashish Chaudhary"
    }
  },
  {
    "id": "muthusivabalan-ravikumar",
    "name": "Muthusivabalan Ravikumar",
    "role": "Senior Quality Assurance Engineer",
    "bio": "Muthusivabalan explores the paths a product team might overlook. He brings a user's curiosity to quality, asking what happens next and helping everyone feel more confident about the release.",
    "framing": {
      "scale": 1.25,
      "x": 35,
      "y": 38
    },
    "sourceUrl": "https://dhira.io/aboutus/",
    "image": {
      "src": "/about/team/muthusivabalan-ravikumar-public-v1.jpg",
      "alt": "Muthusivabalan Ravikumar"
    }
  },
  {
    "id": "vipul-madan",
    "name": "Vipul Madan",
    "role": "Business Intelligence Developer",
    "bio": "Vipul thinks about what someone will do after reading a dashboard. He shapes information around that next decision, giving the important details room to be seen and understood.",
    "sourceUrl": "https://dhira.io/aboutus/",
    "position": "50% 20%",
    "image": {
      "src": "/about/team/vipul-madan-studio-v1.webp",
      "alt": "Vipul Madan"
    }
  },
  {
    "id": "bijal-soni",
    "name": "Bijal Soni",
    "role": "Cloud Architect",
    "bio": "Bijal balances what a cloud system needs today with what it may need tomorrow. The aim is an architecture that makes sense to the people who will explain, extend and operate it.",
    "sourceUrl": "https://theorg.com/org/dhira"
  },
  {
    "id": "ashish-ojha",
    "name": "Ashish Ojha",
    "role": "DevOps Engineer",
    "bio": "Ashish makes the route from a code change to a running service easier to follow. He cares about repeatable releases, useful signals and fewer surprises for the people on call.",
    "sourceUrl": "https://theorg.com/org/dhira",
    "image": {
      "src": "/about/team/ashish-ojha-public-v1.jpg",
      "alt": "Ashish Ojha"
    }
  },
  {
    "id": "rajiv",
    "name": "Rajiv Kumar",
    "role": "Head of Talent and Human Resources",
    "bio": "Rajiv pays attention to what people need to do their best work. From joining the team to finding their next stretch, he helps make growth a conversation people can have openly.",
    "position": "50% 20%",
    "sourceUrl": "https://dhira.io/aboutus/",
    "image": {
      "src": "/avatars/rajiv-executive-v1.webp",
      "alt": "Rajiv Kumar"
    }
  },
  {
    "id": "meghwin-dave",
    "name": "Meghwin Dave",
    "role": "Senior Software Developer",
    "bio": "Meghwin enjoys the logic behind a well-built backend. He connects services, data and business processes with an emphasis on code that stays understandable as the product grows.",
    "sourceUrl": "https://in.linkedin.com/in/meghwin-dave-25ba43221"
  },
  {
    "id": "venkataratnam-yalamanchili",
    "name": "Venkataratnam Yalamanchili",
    "role": "Data Solution Architect",
    "bio": "Venkataratnam sees the relationships between systems before drawing the boundaries. He helps teams find a shared data structure that respects the different ways people need to use it.",
    "sourceUrl": "https://theorg.com/org/dhira"
  },
  {
    "id": "pradip-lagdive",
    "name": "Pradip Lagdive",
    "role": "DevOps Engineer",
    "bio": "Pradip looks for the manual step that no longer needs to be manual. Through thoughtful automation, he helps make everyday engineering work calmer, more consistent and easier to hand over.",
    "sourceUrl": "https://theorg.com/org/dhira"
  },
  {
    "id": "pratheep",
    "name": "Pratheep Menon",
    "role": "Head of Business Development",
    "bio": "Pratheep starts a relationship by understanding what matters to the other team. He connects that ambition with the right people at DHIRA and helps shape a useful next step.",
    "position": "50% 20%",
    "sourceUrl": "https://dhira.io/aboutus/",
    "image": {
      "src": "/avatars/pratheep-executive-v1.webp",
      "alt": "Pratheep Menon"
    }
  }
];

