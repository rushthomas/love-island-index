import { PEOPLE } from "@/lib/people";
import type { QuadrantFramework } from "@/lib/types";
import { PersonAvatar } from "../PersonAvatar";

function normalize(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

export function QuadrantPlot({ framework }: { framework: QuadrantFramework }) {
  const { xAxis, yAxis } = framework;
  const answered = PEOPLE.filter((p) => framework.points[p.id]);
  const unanswered = PEOPLE.filter((p) => !framework.points[p.id]);

  return (
    <div>
      <div className="flex gap-3">
        <span
          className="font-tag flex w-4 shrink-0 items-center justify-center text-center text-[11px] uppercase tracking-wide text-ink-faint"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {yAxis.label}
        </span>

        <div className="relative aspect-square w-full max-w-md">
          <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
            {/* gridlines */}
            {[25, 50, 75].map((g) => (
              <g key={g}>
                <line x1={g} y1={0} x2={g} y2={100} stroke="var(--line)" strokeWidth={0.4} />
                <line x1={0} y1={g} x2={100} y2={g} stroke="var(--line)" strokeWidth={0.4} />
              </g>
            ))}
            {/* axes */}
            <line x1={0} y1={100} x2={100} y2={100} stroke="var(--ink)" strokeWidth={0.6} />
            <line x1={0} y1={0} x2={0} y2={100} stroke="var(--ink)" strokeWidth={0.6} />

            {answered.map((person) => {
              const point = framework.points[person.id]!;
              const cx = normalize(point.x, xAxis.min, xAxis.max);
              const cy = 100 - normalize(point.y, yAxis.min, yAxis.max);

              if (point.selfPerceived) {
                const sx = normalize(point.selfPerceived.x, xAxis.min, xAxis.max);
                const sy = 100 - normalize(point.selfPerceived.y, yAxis.min, yAxis.max);
                return (
                  <g key={person.id}>
                    <line
                      x1={cx}
                      y1={cy}
                      x2={sx}
                      y2={sy}
                      stroke={person.color}
                      strokeWidth={0.5}
                      strokeDasharray="2,2"
                    />
                    <circle cx={cx} cy={cy} r={1.8} fill={person.color} />
                    <circle cx={sx} cy={sy} r={2.6} fill="none" stroke={person.color} strokeWidth={0.7} />
                  </g>
                );
              }

              return <circle key={person.id} cx={cx} cy={cy} r={2.2} fill={person.color} />;
            })}
          </svg>

          {answered.map((person) => {
            const point = framework.points[person.id]!;
            const target = point.selfPerceived ?? point;
            const left = normalize(target.x, xAxis.min, xAxis.max);
            const top = 100 - normalize(target.y, yAxis.min, yAxis.max);
            return (
              <div
                key={person.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <PersonAvatar person={person} size="sm" />
              </div>
            );
          })}
        </div>
      </div>

      <p className="font-tag mt-2 ml-7 text-center text-[11px] uppercase tracking-wide text-ink-faint">
        {xAxis.label}
      </p>

      {answered.some((p) => framework.points[p.id]!.annotation) && (
        <div className="mt-4 space-y-1">
          {answered
            .filter((p) => framework.points[p.id]!.annotation)
            .map((p) => (
              <p key={p.id} className="text-sm text-ink-soft">
                <span className="font-semibold">{p.name}:</span>{" "}
                <span className="italic">{framework.points[p.id]!.annotation}</span>
              </p>
            ))}
        </div>
      )}

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
