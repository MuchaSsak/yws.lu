/**
 * The organisation's numbers shown on About us (wiki: content/content-model.md § Statistics). Static, typed and in
 * the HTML: the values the client last entered in the retired Supabase `statistics` table (one row, created
 * 2025-07-09) [user 2026-10-09: Supabase removed]. To change them: edit this file, commit, deploy.
 */
export interface Statistics {
  sharedHouses: number;
  youngPeopleHoused: number;
  waitingList: number;
  /** When the client last updated the numbers (ISO date). */
  asOf: string;
}

export const STATISTICS: Statistics = {
  sharedHouses: 9,
  youngPeopleHoused: 40,
  waitingList: 750,
  asOf: "2025-07-09",
};
