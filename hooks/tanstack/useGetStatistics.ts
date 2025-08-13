import { useQuery } from "@tanstack/react-query";

import getStatistics from "@/services/getStatistics";

function useGetStatistics() {
  const query = useQuery({
    queryKey: ["getStatistics"],
    queryFn: getStatistics,
  });

  return query;
}

export default useGetStatistics;
