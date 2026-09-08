import { Masthead } from "@/components/Masthead";
import { FORM_FIELDS, NAME_QUESTION } from "@/lib/formSchema";

const QUESTION_TYPE_LABEL: Record<string, string> = {
  dropdown: "Dropdown",
  scale: "Linear scale, 1–10",
  multipleChoice: "Multiple choice",
  numberShortAnswer: "Short answer (Response validation → Number, between 0 and 100)",
};

export default function HowItWorks() {
  return (
    <>
      <Masthead />
      <main className="flex-1 bg-halftone bg-paper pb-24">
        <div className="mx-auto max-w-2xl px-6 pt-16 sm:pt-20">
          <p className="font-tag mb-3 text-xs uppercase tracking-[0.3em] text-ink-faint">Appendix</p>
          <h1 className="font-display text-4xl uppercase leading-none text-ink sm:text-5xl">
            How This Works
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
            Everyone self-reports through one Google Form. The Form writes to a Sheet, the
            Sheet is published as a CSV, and the site reads that CSV on every visit
            (refreshed at most every 5 minutes). No login, no database — just a spreadsheet
            in the middle.
          </p>

          <ol className="mt-10 space-y-4">
            {[
              "Create a new Google Form.",
              "Add the questions below, in this order, with the exact wording and question type shown — the wording becomes the Sheet's column header, and the site matches on it exactly.",
              "In the Form's Responses tab, click the Sheets icon → Create a new spreadsheet.",
              "Open that spreadsheet → File → Share → Publish to web → select the \"Form Responses 1\" sheet → format CSV → Publish. Copy the URL.",
              "Set that URL as the SHEET_CSV_URL environment variable (in .env.local for dev, in Vercel's project settings for production), then redeploy.",
              "Send the Form link to the group. Answers appear on the site within 5 minutes of submitting.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-tag mt-0.5 shrink-0 text-sm text-rust">{i + 1}.</span>
                <span className="text-sm leading-relaxed text-ink">{step}</span>
              </li>
            ))}
          </ol>

          <div className="stitched mt-10 rounded-sm bg-paper-panel p-5">
            <p className="font-tag mb-2 text-xs uppercase tracking-widest text-ink-faint">
              Note on the nomination question
            </p>
            <p className="text-sm text-ink-soft">
              &ldquo;Who does Lindsey trust the least&rdquo; isn&rsquo;t in the Form — it&rsquo;s a
              single nomination, not a group self-report. Set it directly in{" "}
              <code className="font-tag rounded bg-paper px-1">src/data/frameworks.ts</code> (the
              <code className="font-tag rounded bg-paper px-1">answer</code> field on the{" "}
              <code className="font-tag rounded bg-paper px-1">drive-snoop</code> framework).
            </p>
          </div>

          <h2 className="font-display mt-12 text-2xl uppercase text-ink">The Questions</h2>

          <div className="mt-4 divide-y divide-dashed divide-line">
            <div className="py-3">
              <p className="font-tag text-[11px] uppercase tracking-widest text-ink-faint">
                {QUESTION_TYPE_LABEL[NAME_QUESTION.questionType]}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{NAME_QUESTION.header}</p>
              <p className="mt-1 text-xs text-ink-faint">
                Options: {NAME_QUESTION.options.join(", ")}
              </p>
            </div>

            {FORM_FIELDS.map((field) => (
              <div key={field.header} className="py-3">
                <p className="font-tag text-[11px] uppercase tracking-widest text-ink-faint">
                  {QUESTION_TYPE_LABEL[field.questionType]}
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">{field.header}</p>
                {field.options && (
                  <p className="mt-1 text-xs text-ink-faint">Options: {field.options.join(", ")}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
