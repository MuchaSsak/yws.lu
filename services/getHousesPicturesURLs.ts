import { SUPABASE_HOUSES_PICTURES_BUCKET_ROOT_URL } from "@/lib/constants";
import { createClient } from "@/services/supabase/client";

async function getHousesPicturesURLs() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.storage
      .from("houses-pictures")
      .list();

    if (error) throw error;

    const picturesURLs: string[] = data.map(
      (image) => `${SUPABASE_HOUSES_PICTURES_BUCKET_ROOT_URL}/${image.name}`
    );

    return picturesURLs;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getHousesPicturesURLs;
