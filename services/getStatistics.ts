import type { StatisticsInDB } from "@/typings/statistics";
import { createClient } from "@/services/supabase/client";

async function getStatistics() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("statistics")
      .select("*")
      .single();

    if (error) throw error;

    return data as StatisticsInDB;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getStatistics;
