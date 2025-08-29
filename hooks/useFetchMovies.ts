import { fetchMovies } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchMovies = (query: string, enabled = true) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies({ query }),
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    retryDelay: 1000,
  });

  return { data, isLoading, error, refetch };
};
