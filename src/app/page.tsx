import { Masthead } from "@/components/Masthead";
import { FrameworkSection } from "@/components/FrameworkSection";
import { PersonAvatar } from "@/components/PersonAvatar";
import { PalmTree } from "@/components/decor/PalmTree";
import { SunBurst } from "@/components/decor/SunBurst";
import { StarShape } from "@/components/decor/StarShape";
import { PEOPLE } from "@/lib/people";
import { fetchSheetRows } from "@/lib/sheet";
import { mergeResponsesIntoFrameworks, peopleMissingFromRows } from "@/lib/mergeResponses";
import { FORM_URL } from "@/lib/formSchema";

export default async function Home() {
  const rows = await fetchSheetRows();
  const frameworks = mergeResponsesIntoFrameworks(rows);
  const missing = peopleMissingFromRows(rows);

  return (
    <>
      <Masthead />
      <main className="bg-grid relative flex-1 overflow-hidden bg-paper pb-24">
        <SunBurst className="pointer-events-none absolute -top-8 right-4 w-24 sm:right-10 sm:w-32" />
        <StarShape className="pointer-events-none absolute top-40 left-6 w-8 sm:left-16 sm:w-10" />
        <PalmTree className="pointer-events-none absolute top-6 left-2 w-14 -scale-x-100 sm:w-20" />
        <PalmTree className="pointer-events-none absolute top-16 right-8 w-16 sm:w-24" />

        {/* Cover */}
        <div className="relative mx-auto max-w-3xl px-6 pt-16 pb-10 text-center sm:pt-24">
          <p className="font-tag mb-4 text-xs uppercase tracking-[0.3em] text-ink-soft">
            A Field Guide, Self-Reported
          </p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] text-ink sm:text-7xl">
            The Love
            <br />
            Island Index
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
            {PEOPLE.length} people. {frameworks.length} frameworks nobody asked for.
            Every entry below is answered by the group itself — filed, cross-referenced,
            and updated the moment someone fills out the form.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {PEOPLE.map((p) => (
              <PersonAvatar key={p.id} person={p} />
            ))}
          </div>

          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pill mt-8 px-6 py-2.5 text-sm font-bold uppercase tracking-widest hover:brightness-95"
          >
            Take the Form ↗
          </a>

          {rows === null && (
            <p className="font-tag mt-6 text-xs text-ink-soft">
              Showing seed data only — connect the Sheet to go live. See{" "}
              <a href="/how-it-works" className="underline">
                how this works
              </a>
              .
            </p>
          )}
          {rows !== null && missing.length > 0 && (
            <p className="font-tag mt-6 text-xs text-ink-soft">
              Still waiting on: {missing.join(", ")}
            </p>
          )}
        </div>

        {/* Table of contents */}
        <div className="stitched relative mx-auto mb-16 max-w-3xl rounded-3xl bg-paper-panel p-6 sm:p-8">
          <p className="font-tag mb-4 text-center text-xs uppercase tracking-widest text-ink-soft">
            Contents
          </p>
          <ol className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {frameworks.map((f) => (
              <li key={f.id}>
                <a
                  href={`#item-${f.number}`}
                  className="flex items-baseline gap-2 text-sm text-ink-soft hover:text-rust"
                >
                  <span className="font-tag text-ink-faint">{String(f.number).padStart(2, "0")}</span>
                  <span className="truncate">{f.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {frameworks.map((framework) => (
          <FrameworkSection key={framework.id} framework={framework} />
        ))}

        <footer className="relative mx-auto mt-4 max-w-3xl px-6 text-center">
          <p className="font-tag text-xs text-ink-soft">
            End of catalog. Answers update as the{" "}
            <a href="/how-it-works" className="underline">
              form
            </a>{" "}
            fills in.
          </p>
        </footer>
      </main>
    </>
  );
}
