import { PEOPLE } from "@/lib/people";
import type { TimeAllocationFramework } from "@/lib/types";
import { PersonAvatar } from "../PersonAvatar";

const CATEGORY_COLOR: Record<string, string> = {
  Past: "#8a8071",
  "Micro-Present": "#c99a2e",
  Present: "#c1552c",
  Future: "#2d3b4e",
};

export function TimeAllocationBars({ framework }: { framework: TimeAllocationFramework }) {
  const answered = PEOPLE.filter((p) => framework.values[p.id]);
  const unanswered = PEOPLE.filter((p) => !framework.values[p.id]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {framework.categories.map((cat) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: CATEGORY_COLOR[cat] ?? "var(--ink-faint)" }}
            />
            <span className="font-tag text-[11px] uppercase tracking-wide text-ink-soft">{cat}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {answered.map((person) => {
          const values = framework.values[person.id]!;
          const total = framework.categories.reduce((sum, c) => sum + (values[c] ?? 0), 0);
          const annotation = framework.annotations?.[person.id];

          return (
            <div key={person.id}>
              <div className="mb-1.5 flex items-center gap-2">
                <PersonAvatar person={person} size="sm" />
                <span className="text-sm font-semibold text-ink">{person.name}</span>
              </div>

              {total > 0 ? (
                <div className="flex h-7 w-full overflow-hidden rounded-sm border border-line-strong">
                  {framework.categories.map((cat) => {
                    const v = values[cat];
                    if (!v) return null;
                    const pct = (v / total) * 100;
                    return (
                      <div
                        key={cat}
                        className="flex items-center justify-center overflow-hidden"
                        style={{ width: `${pct}%`, background: CATEGORY_COLOR[cat] ?? "var(--ink-faint)" }}
                        title={`${cat}: ${v}%`}
                      >
                        {pct > 9 && (
                          <span className="font-tag text-[10px] font-bold text-paper-panel">{v}%</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="font-tag text-[11px] text-ink-faint">no breakdown yet</p>
              )}

              {annotation && (
                <p className="mt-1.5 max-w-xl text-sm italic text-ink-soft">{annotation}</p>
              )}
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
