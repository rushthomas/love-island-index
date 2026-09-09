import { PEOPLE } from "./people";

/**
 * Single source of truth for the Google Form.
 *
 * `header` must match the Form question's title EXACTLY (trailing/leading
 * whitespace aside — the CSV parser trims those) — Google Sheets names the
 * response column after the question text verbatim. This file mirrors the
 * live Form at docs.google.com/spreadsheets/d/1O_KiEbSomC_utjEN8BodIUqQszbYzdXtfifUgsHFd-4;
 * if you add or reword a question there, update it here to match.
 */

/** The respondent link — send this to the group so they can submit answers. */
export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc4SkLD3fsVS08HXIPoyP6ytkhovQrvYsSSf7M03zMIwzXbRw/viewform";

export const NAME_QUESTION = {
  header: "Who are you?",
  questionType: "dropdown" as const,
  options: PEOPLE.map((p) => p.name),
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
    header: "Mommy, Daddy, Baby. Your PRIMARY",
    questionType: "multipleChoice",
    options: ["Mommy", "Daddy", "Baby"],
    target: { frameworkId: "mommy-daddy-baby", kind: "primary" },
  },
  {
    header: "Mommy, Daddy, Baby. Your SECONDARY",
    questionType: "multipleChoice",
    options: ["Mommy", "Daddy", "Baby"],
    target: { frameworkId: "mommy-daddy-baby", kind: "secondary" },
  },
  {
    header: "Smallest to Biggest Male Lesbian — rate yourself, 1 (smallest) to 10 (biggest)",
    questionType: "scale",
    target: { frameworkId: "male-lesbian", kind: "score" },
  },
  {
    header: "Anticipation: do you enjoy the wait, or dislike it?",
    questionType: "scale",
    target: { frameworkId: "anticipation-enjoyment", kind: "score" },
  },
  {
    header: "Anticipation: how much do you feel the excitement of a future plan coming up?",
    questionType: "scale",
    target: { frameworkId: "anticipation-excitement", kind: "score" },
  },
  {
    header: "Technology skills",
    questionType: "scale",
    target: { frameworkId: "tech-skills", kind: "score" },
  },
  {
    header: "Sex workers — would you date one?",
    questionType: "scale",
    target: { frameworkId: "sex-worker-quadrant", kind: "x" },
  },
  {
    header: "Sex workers — would you hire one?",
    questionType: "scale",
    target: { frameworkId: "sex-worker-quadrant", kind: "y" },
  },
  {
    header: "Re-watcher: how much do you rewatch movies vs. start something new?",
    questionType: "scale",
    target: { frameworkId: "rewatch-reread", kind: "x" },
  },
  {
    header: "Re-reader: how much do you reread books vs. start something new?",
    questionType: "scale",
    target: { frameworkId: "rewatch-reread", kind: "y" },
  },
  {
    header: "Time allocation — Past: what % of your headspace lives in the past?",
    questionType: "numberShortAnswer",
    target: { frameworkId: "time-allocation", kind: "timeCategory", category: "Past" },
  },
  {
    header: "Time allocation — Micro-present: what % of your headspace is dedicated to the immediate, right-now moment?",
    questionType: "numberShortAnswer",
    target: { frameworkId: "time-allocation", kind: "timeCategory", category: "Micro-Present" },
  },
  {
    header: "Time allocation — Present: what % of your headspace is dedicated to the broader here-and-now?",
    questionType: "numberShortAnswer",
    target: { frameworkId: "time-allocation", kind: "timeCategory", category: "Present" },
  },
  {
    header: "Time allocation — Future: what % of your headspace is dedicated to the future?",
    questionType: "numberShortAnswer",
    target: { frameworkId: "time-allocation", kind: "timeCategory", category: "Future" },
  },
  {
    header:
      "Suburban Essence: The Leafblower Scale - How likely are you to know how to FLAWLESSLY operate a leaf blower or other yard maintenance equipment?",
    questionType: "scale",
    target: { frameworkId: "leaf-blower", kind: "score" },
  },
];
