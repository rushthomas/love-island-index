import type { ReactNode } from "react";

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
  return (
    <section
      id={`item-${number}`}
      className="sticker stitched relative mx-auto mb-14 w-full max-w-3xl scroll-mt-24 rounded-sm p-6 sm:p-9"
    >
      <div className="washi-tape -top-3 left-8 -rotate-3" aria-hidden="true" />
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-tag text-sm text-ink-faint">No. {String(number).padStart(2, "0")}</span>
        <div className="h-px flex-1 bg-line" />
      </div>
      <h2 className="font-display text-3xl uppercase leading-none text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-xl font-body text-[15px] leading-snug text-ink-soft">{prompt}</p>
      {note && (
        <p className="font-tag mt-2 text-xs italic text-ink-faint">{note}</p>
      )}
      <div className="mt-7">{children}</div>
    </section>
  );
}
