import type { Person, PersonId } from "./types";

export const PEOPLE: Person[] = [
  { id: "anna", name: "Anna", color: "#ef6fac" },
  { id: "bernardo", name: "Bernardo", color: "#2f8f57" },
  { id: "ha", name: "Ha", color: "#f2c14e" },
  { id: "lindsey", name: "Lindsey", color: "#e5533d" },
  { id: "thomas", name: "Thomas", color: "#ef8b3e" },
  { id: "michelle", name: "Michelle", color: "#9b6bd6" },
  { id: "can", name: "Can", color: "#2fb6c7" },
  { id: "martha", name: "Martha", color: "#ddb64a" },
  { id: "hannah", name: "Hannah", color: "#4f7cac" },
  { id: "ben", name: "Ben", color: "#b5651d" },
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
