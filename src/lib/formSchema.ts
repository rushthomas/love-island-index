import { PEOPLE } from "./people";

/**
 * Single source of truth for the Google Form.
 *
 * `header` must match the Form question's title EXACTLY — Google Sheets names
 * the response column after the question text verbatim. Copy these into your
 * Form in this order (see /how-it-works for the human-readable version) and
 * the CSV parser in sheet.ts will pick every answer up automatically.
 */

export const NAME_QUESTION = {
  header: "What's your name?",
  questionType: "dropdown" as const,
  options: PEOPLE.filter((p) => p.id !== "katie").map((p) => p.name),
};

export type FormFieldTarget =
  | { frameworkId: string; kind: "score" }
  | { frameworkId: string; kind: "primary" | "secondary" }
  | { frameworkId: string; kind: "x" | "y" }
  | { frameworkId: string; kind: "timeCategory"; category: string };

export interface FormField {
  header: string;
  questionType: "scale" | "multipleChoice" | "numberShortAnswer";
  options?: string[];
  target: FormFieldTarget;
}

export const FORM_FIELDS: FormField[] = [
  {
    header: "Least to most whimsy — rate yourself, 1 (least whimsical) to 10 (most whimsical)",
    questionType: "scale",
    target: { frameworkId: "whimsy", kind: "score" },
  },
  {
    header: "How Love Island is a Love Island night — rate yourself, 1 (not at all) to 10 (main character energy)",
    questionType: "scale",
    target: { frameworkId: "love-island-night", kind: "score" },
  },
  {
    header: "Mommy, Daddy, or Baby — your PRIMARY",
    questionType: "multipleChoice",
    options: ["Mommy", "Daddy", "Baby"],
    target: { frameworkId: "mommy-daddy-baby", kind: "primary" },
  },
  {
    header: "Mommy, Daddy, or Baby — your SECONDARY (different from your primary)",
    questionType: "multipleChoice",
    options: ["Mommy", "Daddy", "Baby"],
    target: { frameworkId: "mommy-daddy-baby", kind: "secondary" },
  },
  {
    header: "Biggest to smallest male lesbian — rate yourself, 1 (smallest) to 10 (biggest)",
    questionType: "scale",
    target: { frameworkId: "male-lesbian", kind: "score" },
  },
  {
    header: "Anticipation: do you enjoy the wait, or dislike it? 1 (dislike it) to 10 (love it)",
    questionType: "scale",
    target: { frameworkId: "anticipation-enjoyment", kind: "score" },
  },
  {
    header: "Anticipation: how much do you feel the excitement of a future plan coming up? 1 (barely) to 10 (constantly buzzing)",
    questionType: "scale",
    target: { frameworkId: "anticipation-excitement", kind: "score" },
  },
  {
    header: "Technology skills — rate yourself, 1 (please help) to 10 (certified wizard)",
    questionType: "scale",
    target: { frameworkId: "tech-skills", kind: "score" },
  },
  {
    header: "Sex workers — would you date one? 1 (no) to 10 (absolutely)",
    questionType: "scale",
    target: { frameworkId: "sex-worker-quadrant", kind: "x" },
  },
  {
    header: "Sex workers — would you hire one? 1 (no) to 10 (absolutely)",
    questionType: "scale",
    target: { frameworkId: "sex-worker-quadrant", kind: "y" },
  },
  {
    header: "Re-watcher: how much do you rewatch movies vs. start something new? 1 (always new) to 10 (rewatch forever)",
    questionType: "scale",
    target: { frameworkId: "rewatch-reread", kind: "x" },
  },
  {
    header: "Re-reader: how much do you reread books vs. start something new? 1 (always new) to 10 (reread forever)",
    questionType: "scale",
    target: { frameworkId: "rewatch-reread", kind: "y" },
  },
  {
    header: "Time allocation — Past: what % of your headspace lives in the past?",
    questionType: "numberShortAnswer",
    target: { frameworkId: "time-allocation", kind: "timeCategory", category: "Past" },
  },
  {
    header: "Time allocation — Micro-present: what % is the immediate, right-now moment?",
    questionType: "numberShortAnswer",
    target: { frameworkId: "time-allocation", kind: "timeCategory", category: "Micro-Present" },
  },
  {
    header: "Time allocation — Present: what % is the broader here-and-now?",
    questionType: "numberShortAnswer",
    target: { frameworkId: "time-allocation", kind: "timeCategory", category: "Present" },
  },
  {
    header: "Time allocation — Future: what % is the future?",
    questionType: "numberShortAnswer",
    target: { frameworkId: "time-allocation", kind: "timeCategory", category: "Future" },
  },
  {
    header: "Most likely to operate a leaf blower — rate yourself, 1 (never touched one) to 10 (suburban essence)",
    questionType: "scale",
    target: { frameworkId: "leaf-blower", kind: "score" },
  },
];
