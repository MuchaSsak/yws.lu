/**
 * The public Supabase project the site reads, at BUILD time only (wiki: content/content-model.md § Supabase,
 * tech/technologies.md § Decisions). Visitors never call Supabase: the numbers and the house pictures are baked into
 * the HTML, so no third-party request or cookie reaches them, and a new value shows after the next deploy (the owner's
 * deploy hook: site/seo.md § Launch). The anon key is the publishable one the 2025 site shipped in its bundle
 * (read-only; copied mechanically from lib/constants.ts).
 */
export const SUPABASE = {
  url: "https://tsgaliwebpcrjwtcxzdp.supabase.co",
  anonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZ2FsaXdlYnBjcmp3dGN4emRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDE3MTIsImV4cCI6MjA2NzQ3NzcxMn0.8uVzFTbONU0ZusBSDJ17nwwVJPLWraJMQMoAtfnxUNw",
  housesBucket: "houses-pictures",
} as const;

export interface Statistics {
  sharedHouses: number;
  youngPeopleHoused: number;
  waitingList: number;
  /** When the row was last written (`created_at`), shown as "as of". */
  asOf: string;
  /** False when the build couldn't reach Supabase and used the last known values. */
  live: boolean;
}

/**
 * The last values read from Supabase (2026-10-09: one row, created 2025-07-09), which are also the 2025 dictionary's
 * defaults. Used only when the build can't reach Supabase, so a network blip never fails a deploy.
 */
export const LAST_KNOWN_STATISTICS: Statistics = {
  sharedHouses: 9,
  youngPeopleHoused: 40,
  waitingList: 750,
  asOf: "2025-07-09",
  live: false,
};

const headers = { apikey: SUPABASE.anonKey, Authorization: `Bearer ${SUPABASE.anonKey}` };
let statistics: Promise<Statistics> | undefined;
let pictures: Promise<string[]> | undefined;

/** The `statistics` row (one per site; the newest wins if there are more). Cached for the whole build. */
export function getStatistics(): Promise<Statistics> {
  statistics ??= (async () => {
    try {
      const response = await fetch(
        `${SUPABASE.url}/rest/v1/statistics?select=shared_houses_count,youngsters_accomodated_count,youngsters_waiting_count,created_at&order=created_at.desc&limit=1`,
        { headers, signal: AbortSignal.timeout(10_000) },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const [row] = (await response.json()) as {
        shared_houses_count: number;
        youngsters_accomodated_count: number;
        youngsters_waiting_count: number;
        created_at: string;
      }[];
      if (!row) throw new Error("no row");
      return {
        sharedHouses: row.shared_houses_count,
        youngPeopleHoused: row.youngsters_accomodated_count,
        waitingList: row.youngsters_waiting_count,
        asOf: row.created_at.slice(0, 10),
        live: true,
      };
    } catch (error) {
      console.warn(`[supabase] statistics unavailable (${String(error)}): using the last known values`);
      return LAST_KNOWN_STATISTICS;
    }
  })();
  return statistics;
}

/** Public URLs of the house pictures in the bucket, by name (the 2025 carousel order). Empty when unreachable. */
export function getHousePictures(): Promise<string[]> {
  pictures ??= (async () => {
    try {
      const response = await fetch(`${SUPABASE.url}/storage/v1/object/list/${SUPABASE.housesBucket}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ prefix: "", limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const files = (await response.json()) as { name: string }[];
      // The bucket holds a `.emptyFolderPlaceholder` (the 2025 carousel skipped index 0 because of it).
      return files
        .map((file) => file.name)
        .filter((name) => /\.(jpe?g|png|webp|avif)$/i.test(name))
        .map((name) => `${SUPABASE.url}/storage/v1/object/public/${SUPABASE.housesBucket}/${encodeURIComponent(name)}`);
    } catch (error) {
      console.warn(`[supabase] house pictures unavailable (${String(error)}): the gallery is left out`);
      return [];
    }
  })();
  return pictures;
}
