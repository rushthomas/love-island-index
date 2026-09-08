import { PEOPLE } from "@/lib/people";
import type { ForcedChoiceFramework } from "@/lib/types";
import { PersonAvatar } from "../PersonAvatar";

export function ForcedChoiceBuckets({ framework }: { framework: ForcedChoiceFramework }) {
  const answered = PEOPLE.filter((p) => framework.picks[p.id]);
  const unanswered = PEOPLE.filter((p) => !framework.picks[p.id]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {framework.options.map((option) => {
          const inBucket = answered.filter((p) => framework.picks[p.id]!.primary === option);
          return (
            <div key={option} className="stitched rounded-sm bg-paper-panel p-4">
              <h3 className="font-tag mb-3 text-center text-xs uppercase tracking-widest text-ink-soft">
                {option}
              </h3>
              <div className="flex min-h-[3rem] flex-wrap justify-center gap-3">
                {inBucket.length === 0 && (
                  <span className="font-tag text-[11px] text-ink-faint">— empty —</span>
                )}
                {inBucket.map((person) => (
                  <div key={person.id} className="flex flex-col items-center gap-1">
                    <PersonAvatar person={person} />
                    <span
                      className="font-tag rounded-full border px-1.5 py-px text-[9px] uppercase text-ink-soft"
                      style={{ borderColor: "var(--line-strong)" }}
                    >
                      +{framework.picks[person.id]!.secondary}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {unanswered.length > 0 && (
        <div className="mt-5 border-t border-dashed border-line pt-3">
          <p className="font-tag mb-2 text-[11px] uppercase tracking-wide text-ink-faint">
            Not yet submitted
          </p>
          <div className="flex flex-wrap gap-2">
            {unanswered.map((p) => (
              <PersonAvatar key={p.id} person={p} size="sm" muted />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
