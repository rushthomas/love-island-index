import { PEOPLE, PEOPLE_BY_ID } from "@/lib/people";
import type { NominationFramework } from "@/lib/types";
import { PersonAvatar } from "../PersonAvatar";

export function NominationLineup({ framework }: { framework: NominationFramework }) {
  const asker = PEOPLE_BY_ID[framework.askedBy];
  const suspects = PEOPLE.filter((p) => p.id !== framework.askedBy);

  return (
    <div>
      <p className="font-tag mb-4 text-xs uppercase tracking-widest text-ink-soft">
        {asker?.name ?? framework.askedBy}&rsquo;s answer:
      </p>

      <div className="flex flex-wrap gap-4">
        {suspects.map((person) => {
          const isAnswer = person.id === framework.answer;
          return (
            <div
              key={person.id}
              className={`flex flex-col items-center gap-2 rounded-sm p-2 transition ${
                isAnswer ? "stitched bg-paper-panel" : "opacity-70"
              }`}
              style={isAnswer ? { borderColor: "var(--rust)" } : undefined}
            >
              <PersonAvatar person={person} size={isAnswer ? "lg" : "md"} />
              <span className={`text-xs ${isAnswer ? "font-bold text-rust" : "text-ink-soft"}`}>
                {person.name}
              </span>
              {isAnswer && (
                <span className="font-tag text-[9px] uppercase tracking-widest text-rust">
                  prime suspect
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!framework.answer && (
        <p className="font-tag mt-4 text-xs uppercase tracking-widest text-ink-faint">
          case still open — edit frameworks.ts to close it
        </p>
      )}
    </div>
  );
}
