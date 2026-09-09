import type { ReactNode } from "react";

const BADGE_COLORS = ["var(--mustard)", "var(--burnt)", "var(--rust)", "var(--olive)"];

export function CatalogEntry({
  number,
  title,
  prompt,
  note,
  children,
}: {
  number: number;
  title: string;
  prompt: string;
  note?: string;
  children: ReactNode;
}) {
  const badgeColor = BADGE_COLORS[(number - 1) % BADGE_COLORS.length];

  return (
    <section
      id={`item-${number}`}
      className="stitched relative mx-auto mb-16 w-full max-w-3xl scroll-mt-24 rounded-3xl bg-paper-panel p-6 sm:p-9"
    >
      <div
        className="sticker absolute -top-5 -left-3 flex h-12 w-12 -rotate-6 items-center justify-center rounded-full font-display text-lg"
        style={{ background: badgeColor }}
        aria-hidden="true"
      >
        {String(number).padStart(2, "0")}
      </div>

      <h2 className="font-display mt-3 text-3xl uppercase leading-none text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-snug text-ink-soft">{prompt}</p>
      {note && <p className="font-tag mt-2 text-xs italic text-ink-faint">{note}</p>}
      <div className="mt-7">{children}</div>
    </section>
  );
}
