import { createBrowserClient } from "@supabase/ssr";

import { SUPABASE_PUBLIC_ANON_KEY, SUPABASE_PUBLIC_URL } from "@/lib/constants";

export function createClient() {
  return createBrowserClient(SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_ANON_KEY);
}
