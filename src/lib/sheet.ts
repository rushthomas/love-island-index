import { csvToRecords } from "./csv";

/**
 * Background refresh floor for the Sheet fetch. Updates aren't frequent
 * (the group fills the Form in occasional batches), so this just bounds
 * staleness — a Vercel redeploy (no code change needed) forces an
 * immediate refresh any time, regardless of this value.
 */
const REVALIDATE_SECONDS = 60 * 60 * 24 * 30; // 30 days

/**
 * Fetches the published-to-web CSV of the Google Sheet backing the Form.
 * Returns null if unconfigured or unreachable — callers should fall back to
 * seed data, never throw.
 */
export async function fetchSheetRows(): Promise<Record<string, string>[] | null> {
  const url = process.env.SHEET_CSV_URL;
  if (!url) return null;

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;
    const text = await res.text();
    return csvToRecords(text);
  } catch {
    return null;
  }
}
