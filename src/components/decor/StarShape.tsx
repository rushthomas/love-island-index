export function StarShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <path
        d="M30 2 L35 25 L58 30 L35 35 L30 58 L25 35 L2 30 L25 25 Z"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
