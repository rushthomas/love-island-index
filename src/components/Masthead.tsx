import Link from "next/link";

export function Masthead() {
  return (
    <header className="relative z-10 mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
      <Link
        href="/"
        className="pill px-4 py-1.5 text-xs font-bold uppercase tracking-widest hover:brightness-95"
      >
        Vol. I
      </Link>
      <Link
        href="/how-it-works"
        className="pill px-4 py-1.5 text-xs font-bold uppercase tracking-widest hover:brightness-95"
        style={{ background: "var(--paper-panel)" }}
      >
        How This Works →
      </Link>
    </header>
  );
}
