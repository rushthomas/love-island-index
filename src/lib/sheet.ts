import { csvToRecords } from "./csv";

/**
 * Fetches the published-to-web CSV of the Google Sheet backing the Form.
 * Returns null if unconfigured or unreachable — callers should fall back to
 * seed data, never throw.
 */
export async function fetchSheetRows(): Promise<Record<string, string>[] | null> {
  const url = process.env.SHEET_CSV_URL;
  if (!url) return null;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const text = await res.text();
    return csvToRecords(text);
  } catch {
    return null;
  }
}
