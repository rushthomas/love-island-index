import Link from "next/link";

export function Masthead() {
  return (
    <header className="border-b-2 border-ink bg-paper-deep">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-tag text-xs uppercase tracking-widest text-ink-soft hover:text-ink">
          Vol. I — Est. 2026
        </Link>
        <Link href="/how-it-works" className="font-tag text-xs uppercase tracking-widest text-ink-soft hover:text-ink">
          How This Works →
        </Link>
      </div>
    </header>
  );
}
