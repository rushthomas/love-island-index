import { PEOPLE } from "@/lib/people";
import type { RankingFramework } from "@/lib/types";
import { PersonAvatar } from "../PersonAvatar";

export function RankingBoard({ framework }: { framework: RankingFramework }) {
  const ranked = PEOPLE.filter((p) => framework.scores[p.id] !== undefined).sort(
    (a, b) => (framework.scores[b.id] ?? 0) - (framework.scores[a.id] ?? 0)
  );
  const unranked = PEOPLE.filter((p) => framework.scores[p.id] === undefined);
  const max = 10;

  return (
    <div>
      <div className="mb-2 flex justify-between font-tag text-[11px] uppercase tracking-wide text-ink-faint">
        <span>{framework.lowLabel}</span>
        <span>{framework.highLabel}</span>
      </div>

      <div className="space-y-2">
        {ranked.map((person, i) => {
          const score = framework.scores[person.id] ?? 0;
          const pct = Math.max(6, (score / max) * 100);
          return (
            <div key={person.id} className="flex items-center gap-3">
              <span className="font-tag w-5 text-right text-xs text-ink-faint">{i + 1}</span>
              <PersonAvatar person={person} size="sm" />
              <div className="relative h-6 flex-1 overflow-hidden rounded-sm bg-paper-deep">
                <div
                  className="h-full rounded-sm"
                  style={{ width: `${pct}%`, background: person.color }}
                />
              </div>
              <span className="font-tag w-8 text-right text-xs text-ink-soft">{score}</span>
            </div>
          );
        })}
      </div>

      {unranked.length > 0 && (
        <div className="mt-5 border-t border-dashed border-line pt-3">
          <p className="font-tag mb-2 text-[11px] uppercase tracking-wide text-ink-faint">
            Not yet submitted
          </p>
          <div className="flex flex-wrap gap-2">
            {unranked.map((p) => (
              <PersonAvatar key={p.id} person={p} size="sm" muted />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
