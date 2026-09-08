import { PEOPLE } from "@/lib/people";
import type { ScaleFramework } from "@/lib/types";
import { PersonAvatar } from "../PersonAvatar";

export function ScaleRuler({ framework }: { framework: ScaleFramework }) {
  const { min, max } = framework;
  const answered = PEOPLE.filter((p) => framework.scores[p.id] !== undefined);
  const unanswered = PEOPLE.filter((p) => framework.scores[p.id] === undefined);

  const groups = new Map<number, typeof PEOPLE>();
  for (const person of answered) {
    const score = framework.scores[person.id]!;
    groups.set(score, [...(groups.get(score) ?? []), person]);
  }

  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const maxStack = Math.max(1, ...Array.from(groups.values()).map((g) => g.length));

  return (
    <div>
      <div className="mb-2 flex justify-between font-tag text-[11px] uppercase tracking-wide text-ink-faint">
        <span>{framework.minLabel}</span>
        <span>{framework.maxLabel}</span>
      </div>

      <div
        className="relative mx-[18px]"
        style={{ height: `${maxStack * 34 + 40}px` }}
      >
        {/* avatar stacks, bottom-aligned onto the ruler */}
        {Array.from(groups.entries()).map(([score, people]) => (
          <div
            key={score}
            className="absolute bottom-9 flex -translate-x-1/2 flex-col-reverse items-center gap-1"
            style={{ left: `${((score - min) / (max - min)) * 100}%` }}
          >
            {people.map((person) => (
              <PersonAvatar key={person.id} person={person} size="sm" />
            ))}
          </div>
        ))}

        {/* the ruler line + ticks */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-ink" />
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute bottom-0 -translate-x-1/2 text-center"
            style={{ left: `${((t - min) / (max - min)) * 100}%` }}
          >
            <div className="mx-auto h-2 w-px bg-ink" />
            <span className="font-tag text-[10px] text-ink-faint">{t}</span>
          </div>
        ))}
      </div>

      {unanswered.length > 0 && (
        <div className="mt-6 border-t border-dashed border-line pt-3">
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
