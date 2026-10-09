/**
 * The public Supabase project the site reads (wiki: content/content-model.md § Supabase). The anon key is the
 * publishable one the 2025 site already ships in its bundle (read-only access; copied from lib/constants.ts).
 */
export const SUPABASE = {
  url: "https://tsgaliwebpcrjwtcxzdp.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZ2FsaXdlYnBjcmp3dGN4emRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDE3MTIsImV4cCI6MjA2NzQ3NzcxMn0.8uVzFTbONU0ZusBSDJ17nwwVJPLWraJMQMoAtfnxUNw",
  housesBucket: "houses-pictures",
} as const;
