import { FRAMEWORKS } from "@/data/frameworks";
import { FORM_FIELDS, NAME_QUESTION } from "./formSchema";
import { findPersonIdByName, PEOPLE } from "./people";
import type {
  Framework,
  ForcedChoiceFramework,
  PersonId,
  QuadrantFramework,
  RankingFramework,
  ScaleFramework,
  TimeAllocationFramework,
} from "./types";

function frameworksById(list: Framework[]): Map<string, Framework> {
  return new Map(list.map((f) => [f.id, f]));
}

/**
 * Rows are the raw Sheet CSV records, in submission order. Later rows for
 * the same person overwrite earlier ones, so a re-submission just wins.
 */
function latestRowPerPerson(rows: Record<string, string>[]): Map<PersonId, Record<string, string>> {
  const latest = new Map<PersonId, Record<string, string>>();
  for (const row of rows) {
    const rawName = row[NAME_QUESTION.header];
    if (!rawName) continue;
    const personId = findPersonIdByName(rawName);
    if (!personId) continue;
    latest.set(personId, row);
  }
  return latest;
}

function applyField(
  byId: Map<string, Framework>,
  personId: PersonId,
  header: string,
  target: (typeof FORM_FIELDS)[number]["target"],
  rawValue: string
) {
  if (rawValue === undefined || rawValue === "") return;
  const framework = byId.get(target.frameworkId);
  if (!framework) return;

  if (target.kind === "score") {
    const value = Number(rawValue);
    if (Number.isNaN(value)) return;
    (framework as RankingFramework | ScaleFramework).scores[personId] = value;
    return;
  }

  if (target.kind === "primary" || target.kind === "secondary") {
    const fc = framework as ForcedChoiceFramework;
    const existing = fc.picks[personId] ?? { primary: "", secondary: "" };
    fc.picks[personId] = { ...existing, [target.kind]: rawValue };
    return;
  }

  if (target.kind === "x" || target.kind === "y") {
    const value = Number(rawValue);
    if (Number.isNaN(value)) return;
    const quad = framework as QuadrantFramework;
    const existing = quad.points[personId];
    quad.points[personId] = {
      x: existing?.x ?? 0,
      y: existing?.y ?? 0,
      selfPerceived: existing?.selfPerceived,
      annotation: existing?.annotation,
      [target.kind]: value,
    };
    return;
  }

  if (target.kind === "timeCategory") {
    const value = Number(rawValue);
    if (Number.isNaN(value)) return;
    const ta = framework as TimeAllocationFramework;
    ta.values[personId] = { ...(ta.values[personId] ?? {}), [target.category]: value };
  }
}

/**
 * Deep-clones the seed FRAMEWORKS and overlays any live Sheet rows on top,
 * field by field, person by person. Missing people/fields just keep the
 * seed value (or stay unanswered) — nothing is ever wiped out by a partial
 * submission.
 */
export function mergeResponsesIntoFrameworks(rows: Record<string, string>[] | null): Framework[] {
  const merged = structuredClone(FRAMEWORKS);
  if (!rows || rows.length === 0) return merged;

  const byId = frameworksById(merged);
  const latest = latestRowPerPerson(rows);

  for (const [personId, row] of latest) {
    for (const field of FORM_FIELDS) {
      applyField(byId, personId, field.header, field.target, row[field.header]);
    }
  }

  return merged;
}

/** People who haven't submitted anything at all yet — for the "still waiting on" strip. */
export function peopleMissingFromRows(rows: Record<string, string>[] | null): string[] {
  const submitted = new Set(
    (rows ?? [])
      .map((r) => findPersonIdByName(r[NAME_QUESTION.header] ?? ""))
      .filter((id): id is PersonId => Boolean(id))
  );
  return PEOPLE.filter((p) => !submitted.has(p.id)).map((p) => p.name);
}
