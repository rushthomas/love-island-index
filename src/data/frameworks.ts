import type {
  Framework,
  ForcedChoiceFramework,
  NominationFramework,
  QuadrantFramework,
  RankingFramework,
  ScaleFramework,
  TimeAllocationFramework,
} from "@/lib/types";

/**
 * Seed data — the answers already on record before anyone touches the Form.
 * Anything not listed here just renders as "not yet submitted" until the
 * linked Google Sheet has a row for that person. Live Sheet data (see
 * lib/sheet.ts) overlays on top of this at request time, field by field.
 */

const whimsy: RankingFramework = {
  id: "whimsy",
  number: 1,
  type: "ranking",
  title: "Least to Most Whimsy",
  prompt: "Rate yourself on the whimsy scale.",
  lowLabel: "Least whimsy",
  highLabel: "Most whimsy",
  scores: {},
};

const loveIslandNight: RankingFramework = {
  id: "love-island-night",
  number: 2,
  type: "ranking",
  title: "How Love Island Is a Love Island Night",
  prompt: "How much main-character, villa-drama energy do you bring to game night?",
  lowLabel: "Barely a cast member",
  highLabel: "Full main character",
  scores: {},
};

const mommyDaddyBaby: ForcedChoiceFramework = {
  id: "mommy-daddy-baby",
  number: 3,
  type: "forcedChoice",
  title: "Mommy, Daddy, Baby",
  prompt: "Choose 2 of the 3 — a primary and a secondary.",
  note: "You can't pick the same option twice.",
  options: ["Mommy", "Daddy", "Baby"],
  picks: {},
};

const maleLesbian: RankingFramework = {
  id: "male-lesbian",
  number: 4,
  type: "ranking",
  title: "Biggest to Smallest Male Lesbian",
  prompt: "Self-explanatory.",
  lowLabel: "Smallest male lesbian",
  highLabel: "Biggest male lesbian",
  scores: {},
};

const anticipationEnjoyment: ScaleFramework = {
  id: "anticipation-enjoyment",
  number: 5,
  type: "scale",
  title: "Anticipation: Enjoy It or Dread It",
  prompt: "On a scale of 1–10, how much do you enjoy the anticipation of something, versus dislike it?",
  min: 1,
  max: 10,
  minLabel: "Dislike the wait",
  maxLabel: "Love the wait",
  scores: {},
};

const anticipationExcitement: ScaleFramework = {
  id: "anticipation-excitement",
  number: 6,
  type: "scale",
  title: "Anticipation of Something Exciting",
  prompt: "On a scale of 1–10, how much do you feel the anticipation of an exciting plan coming up in the future?",
  min: 1,
  max: 10,
  minLabel: "Barely feel it",
  maxLabel: "Constantly buzzing",
  scores: {},
};

const driveSnoop: NominationFramework = {
  id: "drive-snoop",
  number: 7,
  type: "nomination",
  title: "The Google Drive Snoop",
  prompt: "Who does Lindsey trust the LEAST to not go into the Google Drive and sneak a listen?",
  note: "This one's a single nomination from Lindsey, not a group self-report — set the answer directly in this file.",
  askedBy: "lindsey",
  answer: undefined,
};

const techSkills: ScaleFramework = {
  id: "tech-skills",
  number: 8,
  type: "scale",
  title: "Technology Skills",
  prompt: "Rate your own technology skills, 1 to 10.",
  min: 1,
  max: 10,
  minLabel: "Please help",
  maxLabel: "Certified wizard",
  scores: {},
};

const sexWorkerQuadrant: QuadrantFramework = {
  id: "sex-worker-quadrant",
  number: 9,
  type: "quadrant",
  title: "Would You Date One? Would You Hire One?",
  prompt: "Two axes: would you date a sex worker, and would you hire one?",
  xAxis: { label: "Would date a sex worker", min: 1, max: 10 },
  yAxis: { label: "Would hire a sex worker", min: 1, max: 10 },
  points: {
    martha: {
      x: 1,
      y: 1,
      selfPerceived: { x: 9, y: 9 },
      annotation: "Has done neither — but believes she's very high on both.",
    },
  },
};

const rewatchReread: QuadrantFramework = {
  id: "rewatch-reread",
  number: 10,
  type: "quadrant",
  title: "Re-Watcher and Re-Reader",
  prompt: "Two axes: do you rewatch movies, and do you reread books — or always start something new?",
  xAxis: { label: "Rewatches movies", min: 1, max: 10 },
  yAxis: { label: "Rerereads books", min: 1, max: 10 },
  points: {
    lindsey: {
      x: 9,
      y: 10,
      annotation: "Obsessively high on both. Very low on ever starting something new.",
    },
  },
};

const timeAllocation: TimeAllocationFramework = {
  id: "time-allocation",
  number: 11,
  type: "timeAllocation",
  title: "Past, Present, and Future",
  prompt: "What percentage of your headspace lives in the past, the micro-present, the broader present, and the future?",
  categories: ["Past", "Micro-Present", "Present", "Future"],
  values: {
    thomas: { Past: 0 },
    lindsey: { Past: 10, "Micro-Present": 5, Present: 55, Future: 30 },
    martha: { Past: 10, "Micro-Present": 0, Present: 60, Future: 30 },
  },
  annotations: {
    thomas: "Zero past. Rest not yet specified.",
    lindsey:
      "Future includes far-existential future: romantic elderly experiences, death, still being best friends with her sister at 80.",
    martha:
      "Gave micro-present and broader present as one combined 60% bucket — shown here all in \"Present\"; edit this file to split it.",
  },
};

const leafBlower: RankingFramework = {
  id: "leaf-blower",
  number: 12,
  type: "ranking",
  title: "Most Likely to Operate a Leaf Blower",
  prompt: "Suburban essence. Who's got it?",
  lowLabel: "Never touched one",
  highLabel: "Suburban essence",
  scores: {},
};

export const FRAMEWORKS: Framework[] = [
  whimsy,
  loveIslandNight,
  mommyDaddyBaby,
  maleLesbian,
  anticipationEnjoyment,
  anticipationExcitement,
  driveSnoop,
  techSkills,
  sexWorkerQuadrant,
  rewatchReread,
  timeAllocation,
  leafBlower,
];
