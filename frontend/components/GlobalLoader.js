import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "../services/api";

export default function GlobalDataLoader() {
  useQuery({
    queryKey: ["user"],
    queryFn: fetchFavorites,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
  });

  return null; // nothing to render
}
