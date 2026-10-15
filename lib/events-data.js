// Fallback seed data used when MongoDB is not connected.
// The events page/API will hydrate from the DB if available,
// and fall back to this list otherwise so the UI stays polished.

export const seedEvents = [
  {
    slug: "chaos-by-design",
    title: "Chaos by Design",
    category: "UI Challenge / Design",
    tagline: "Build the worst UI that still works.",
    shortDescription:
      "A subversive UI challenge where creativity and a little bit of evil matter more than clean code. Take an everyday feature and make it as frustrating as you can.",
    description:
      "You've always been told to build a good UI. This time, we want you to build a bad one. CHAOS BY DESIGN is a UI challenge where creativity and a little bit of evil matter more than clean code. Take an everyday feature and make it as frustrating as you can — but it still has to work. The longer people take to finish it, the better your chances of winning. You have to think wild, build smart and most importantly trust your team. Sync with your team or sink.",
    date: "2026-10-13",
    time: "16:00 IST",
    venue: "VIT Mumbai, Lab Wing",
    teamSize: "Teams of 2–3",
    teamOnly: true,
    minTeamSize: 2,
    maxTeamSize: 3,
    registrationOpen: true,
    poster: "chaos-by-design",
    image: "/images/choasbyDesign.jpeg",
    features: [
      "Deliberately frustrating yet functional UI design sprint",
      "Time-to-complete scoring & creative evil UX evaluation",
      "Team collaboration sprint — sync with your team or sink",
      "Prizes for the most fiendishly creative implementations"
    ],
    rules: [
      "The interface must be functionally complete and solvable — no dead ends.",
      "Everyday interactive features (forms, sliders, selectors, navigations) are fair game.",
      "You have to think wild, build smart and most importantly trust your team.",
      "The longer users take to finish your task without breaking it, the higher your score.",
      "Final submissions will be live tested by fellow participants and judges."
    ]
  },
  {
    slug: "sync-or-sink",
    title: "Sync or Sink",
    category: "Team Challenge / Mystery",
    tagline: "Sync with your team or sink.",
    shortDescription:
      "A high-stakes two-round team challenge testing asymmetric communication, clue-finding, and exploratory technical troubleshooting.",
    description:
      "Round 1 puts your team’s communication to the test. Each person has a different role and access to different information. You will have to rely on each other to understand the clues and move forward. One wrong message can change everything.\n\nRound 2 takes you into a set of technical challenges where things aren't always as they seem. You will have to explore the system, find clues and figure out what went wrong. The answer won't simply be waiting for you. You'll have to find it.",
    date: "2026-10-14",
    time: "15:00 IST",
    venue: "VIT Mumbai, Lab Wing",
    teamSize: "Teams of 3",
    registrationOpen: true,
    registrationUrl:
      "https://unstop.com/competitions/sync-or-sink-the-ultimate-3-player-tech-communication-challenge-vidyalankar-institute-of-technology-vit-mum-1765314?lb=3uWKvmvX&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Jeetman99962",
    poster: "sync-or-sink",
    image: "/images/SyncorSink.jpeg",
    features: [
      "Round 1: Asymmetric roles & communication under pressure",
      "Round 2: Technical system investigation & clue-finding challenge",
      "High-stakes collaborative problem solving — one wrong message changes everything",
      "Exploratory technical debugging where things aren't always as they seem"
    ],
    rules: [
      "Teams must consist of 3 registered members.",
      "Round 1: Each member operates with distinct roles and restricted information.",
      "Round 2: Teams must explore the environment, find clues, and diagnose technical faults.",
      "External aids, answer sharing, and cross-team interference are prohibited.",
      "Judges' decisions on communication protocol and technical completion are final."
    ]
  }
];

export function findSeedEvent(slug) {
  return seedEvents.find((e) => e.slug === slug) || null;
}
