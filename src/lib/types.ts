export type PersonId = string;

export interface Person {
  id: PersonId;
  name: string;
  /** Hue used for this person's sticker/avatar/marker across every chart. */
  color: string;
}

export type FrameworkType =
  | "ranking"
  | "scale"
  | "forcedChoice"
  | "quadrant"
  | "timeAllocation"
  | "nomination";

interface FrameworkBase {
  id: string;
  number: number;
  title: string;
  prompt: string;
  type: FrameworkType;
  /** Short flavor/editorial text shown under the title. */
  note?: string;
}

export interface RankingFramework extends FrameworkBase {
  type: "ranking";
  lowLabel: string;
  highLabel: string;
  scores: Partial<Record<PersonId, number>>;
}

export interface ScaleFramework extends FrameworkBase {
  type: "scale";
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  scores: Partial<Record<PersonId, number>>;
}

export interface ForcedChoicePick {
  primary: string;
  secondary: string;
}

export interface ForcedChoiceFramework extends FrameworkBase {
  type: "forcedChoice";
  options: [string, string, string];
  picks: Partial<Record<PersonId, ForcedChoicePick>>;
}

export interface QuadrantPoint {
  x: number;
  y: number;
  /** Optional second point (e.g. self-perception vs. reality) connected by a dashed line. */
  selfPerceived?: { x: number; y: number };
  annotation?: string;
}

export interface QuadrantAxis {
  label: string;
  min: number;
  max: number;
}

export interface QuadrantFramework extends FrameworkBase {
  type: "quadrant";
  xAxis: QuadrantAxis;
  yAxis: QuadrantAxis;
  points: Partial<Record<PersonId, QuadrantPoint>>;
}

export interface TimeAllocationFramework extends FrameworkBase {
  type: "timeAllocation";
  categories: string[];
  values: Partial<Record<PersonId, Partial<Record<string, number>>>>;
  annotations?: Partial<Record<PersonId, string>>;
}

export interface NominationFramework extends FrameworkBase {
  type: "nomination";
  askedBy: PersonId;
  answer?: PersonId;
}

export type Framework =
  | RankingFramework
  | ScaleFramework
  | ForcedChoiceFramework
  | QuadrantFramework
  | TimeAllocationFramework
  | NominationFramework;
