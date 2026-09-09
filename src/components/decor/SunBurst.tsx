const SPRINKLES = [
  [30, 28, 20],
  [62, 22, -25],
  [45, 45, 60],
  [70, 50, 10],
  [25, 60, -40],
  [55, 68, 35],
  [78, 35, -15],
  [38, 75, 80],
];

export function SunBurst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="var(--burnt)" stroke="var(--ink)" strokeWidth="4" />
      {SPRINKLES.map(([x, y, rot], i) => (
        <rect
          key={i}
          x={x - 4}
          y={y - 1.2}
          width="8"
          height="2.4"
          rx="1.2"
          fill="var(--ink)"
          transform={`rotate(${rot} ${x} ${y})`}
        />
      ))}
    </svg>
  );
}
