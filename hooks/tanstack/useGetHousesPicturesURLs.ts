import { useQuery } from "@tanstack/react-query";

import getHousesPicturesURLs from "@/services/getHousesPicturesURLs";

function useGetHousesPicturesURLs() {
  const query = useQuery({
    queryKey: ["getHousesPicturesURLs"],
    queryFn: getHousesPicturesURLs,
  });

  return query;
}

export default useGetHousesPicturesURLs;
