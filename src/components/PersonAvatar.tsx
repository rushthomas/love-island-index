import type { Person } from "@/lib/types";
import { tint, hashRotation } from "@/lib/color";

function initials(name: string): string {
  return name.slice(0, 2).toUpperCase();
}

const SIZES = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-14 w-14 text-lg",
} as const;

export function PersonAvatar({
  person,
  size = "md",
  tilt = true,
  muted = false,
}: {
  person: Person;
  size?: keyof typeof SIZES;
  tilt?: boolean;
  muted?: boolean;
}) {
  const rotation = tilt ? hashRotation(person.id) : 0;
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-tag font-bold ${SIZES[size]} ${
        muted ? "border border-dashed border-line-strong text-ink-faint opacity-60" : "sticker"
      }`}
      style={
        muted
          ? { transform: `rotate(${rotation}deg)`, background: "transparent" }
          : {
              background: tint(person.color, 0.82),
              borderColor: person.color,
              color: person.color,
              transform: `rotate(${rotation}deg)`,
            }
      }
      title={muted ? `${person.name} — not yet submitted` : person.name}
    >
      {initials(person.name)}
    </span>
  );
}
