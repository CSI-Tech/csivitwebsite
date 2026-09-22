// Fallback seed data used when MongoDB is not connected.
// The events page/API will hydrate from the DB if available,
// and fall back to this list otherwise so the UI stays polished.

export const seedEvents = [
  {
    slug: "codecrush",
    title: "CodeCrush",
    category: "Coding / Competition",
    tagline: "The code. The clock. The pressure.",
    shortDescription:
      "A high-pressure coding challenge designed to test problem solving under a ticking clock.",
    description:
      "CodeCrush is the society's flagship algorithmic sprint. Six hours, three rounds, a hall full of monitors, one winner. Come prepared to fight through combinatorics, graph theory and one very cruel constructive round.",
    date: "2026-10-15",
    time: "10:00 IST",
    venue: "VIT Mumbai, Auditorium",
    teamSize: "Solo",
    registrationOpen: true,
    poster: "codecrush",
    features: [
      "Three progressive rounds",
      "On-site editorial jury",
      "Cash prizes + internship shortlists"
    ],
    rules: [
      "Individual participation only.",
      "Use of pre-written templates is disallowed.",
      "Judges' decisions are final.",
      "Any form of plagiarism disqualifies the participant."
    ]
  },
  {
    slug: "hackathon",
    title: "Hackathon",
    category: "Build / Overnight",
    tagline: "Build. Break. Rebuild.",
    shortDescription:
      "A 24-hour overnight build sprint where teams ship working software from scratch.",
    description:
      "Twenty-four hours, an empty repo, and a theme announced at midnight. Teams of four build, break and rebuild working software. Mentors from industry drop in. Coffee is free. Sleep is not.",
    date: "2026-10-22",
    time: "18:00 IST",
    venue: "VIT Mumbai, Lab Wing",
    teamSize: "Teams of 2–4",
    registrationOpen: true,
    poster: "hackathon",
    features: [
      "24 hours, overnight",
      "Mentors from industry",
      "Hardware kits available on request"
    ],
    rules: [
      "Only frameworks and libraries; no pre-built application code.",
      "Every team member must contribute commits.",
      "Final demo capped at four minutes.",
      "Judging weights: novelty, execution, presentation."
    ]
  },
  {
    slug: "ideathon",
    title: "Ideathon",
    category: "Pitch / Product",
    tagline: "Ideas in motion.",
    shortDescription:
      "A rapid pitch competition for early-stage product ideas — no code required, only conviction.",
    description:
      "Ideathon is for those who can see the product before the code. Two rounds of pitching in front of a panel drawn from founders, PMs and the CSI VIT alumni network. Bring a deck, a problem worth solving, and thick skin.",
    date: "2026-11-05",
    time: "14:00 IST",
    venue: "VIT Mumbai, Seminar Hall",
    teamSize: "Teams of 1–3",
    registrationOpen: true,
    poster: "ideathon",
    features: [
      "Two pitching rounds",
      "Live Q&A with the panel",
      "Winner incubated with alumni network"
    ],
    rules: [
      "Ideas must be original.",
      "Ten-slide maximum for the final round.",
      "Panellists may cut a pitch short at any point.",
      "Demo videos allowed but capped at 45 seconds."
    ]
  },
  {
    slug: "tech-talks",
    title: "Tech Talks",
    category: "Lecture / Panel",
    tagline: "Voices from the machine.",
    shortDescription:
      "A season of talks and panels featuring engineers, researchers and founders from across the industry.",
    description:
      "A running programme of talks curated by the society. Every fortnight, a new voice — deep systems, distributed databases, creative computing, security research. Free to attend for members.",
    date: "2026-10-30",
    time: "17:30 IST",
    venue: "VIT Mumbai, Main Auditorium",
    teamSize: "Open attendance",
    registrationOpen: true,
    poster: "techtalks",
    features: [
      "Bi-weekly through the tenure",
      "Recorded and archived",
      "Members-only Q&A after each session"
    ],
    rules: [
      "Members get priority seating.",
      "Recording is by the society only.",
      "Questions are moderated by the chair."
    ]
  },
  {
    slug: "novacode",
    title: "NovaCode",
    category: "Beginner / Workshop",
    tagline: "First light for first-timers.",
    shortDescription:
      "A weekend workshop designed for absolute beginners — from `hello, world` to a first shipped project.",
    description:
      "NovaCode is the society's on-ramp. Two days, four mentors, and a curriculum designed for people who have never opened a terminal. By Sunday evening every attendee ships a small working project of their own.",
    date: "2026-11-19",
    time: "10:00 IST",
    venue: "VIT Mumbai, Lab 3",
    teamSize: "Individual",
    registrationOpen: true,
    poster: "novacode",
    features: [
      "Zero-prerequisite curriculum",
      "One mentor per five participants",
      "Everyone ships something by Sunday"
    ],
    rules: [
      "Bring your own laptop if possible.",
      "First years given priority.",
      "Attendance required across both days for the certificate."
    ]
  }
];

export function findSeedEvent(slug) {
  return seedEvents.find((e) => e.slug === slug) || null;
}
