import type { Person, PersonId } from "./types";

export const PEOPLE: Person[] = [
  { id: "anna", name: "Anna", color: "#c1552c" },
  { id: "bernardo", name: "Bernardo", color: "#2d3b4e" },
  { id: "ha", name: "Ha", color: "#74812f" },
  { id: "lindsey", name: "Lindsey", color: "#ab3b2b" },
  { id: "thomas", name: "Thomas", color: "#c99a2e" },
  { id: "michelle", name: "Michelle", color: "#7a4a63" },
  { id: "can", name: "Can", color: "#3f6b64" },
  { id: "martha", name: "Martha", color: "#a8623f" },
  { id: "hannah", name: "Hannah", color: "#46607a" },
  { id: "ben", name: "Ben", color: "#5c4a2e" },
  // Not on the original roster you gave me, but has real seed answers below —
  // confirm whether this is a real 11th person or a stand-in for someone else.
  { id: "katie", name: "Katie", color: "#935e38" },
];

export const PEOPLE_BY_ID: Record<PersonId, Person> = Object.fromEntries(
  PEOPLE.map((p) => [p.id, p])
);

export function personName(id: PersonId): string {
  return PEOPLE_BY_ID[id]?.name ?? id;
}

/** Case/whitespace-insensitive lookup, for matching free-typed Form names to roster ids. */
export function findPersonIdByName(rawName: string): PersonId | undefined {
  const needle = rawName.trim().toLowerCase();
  return PEOPLE.find((p) => p.name.toLowerCase() === needle)?.id;
}
