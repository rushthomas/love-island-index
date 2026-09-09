export function PalmTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 -20 100 140" className={className} fill="none" aria-hidden="true">
      <path
        d="M50 118 C 47 90 44 70 52 40"
        stroke="var(--ink)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {[
        "M52 42 C 30 30 14 34 4 22 C 20 20 38 26 52 42 Z",
        "M52 42 C 34 18 34 2 22 -6 C 42 -4 56 12 52 42 Z",
        "M52 42 C 52 14 62 0 58 -10 C 74 -2 76 20 52 42 Z",
        "M52 42 C 70 26 88 26 96 14 C 84 10 64 16 52 42 Z",
        "M52 42 C 44 20 50 6 42 -6 C 60 -2 62 20 52 42 Z",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="var(--olive)"
          stroke="var(--ink)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
