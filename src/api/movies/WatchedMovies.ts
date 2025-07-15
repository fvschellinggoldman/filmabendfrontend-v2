import useSWR from "swr";
import { Movie, MovieFilter } from "@/types/movie";
import { getRequest } from "../api";

const ratingOperatorMapping: Record<string, string> = {
  ">=": "greater_than_or_equal",
  "<=": "less_than_or_equal",
  "=": "equal",
};

function buildFilterParams(index: number, filter?: MovieFilter): string {
  const params = new URLSearchParams({
    page_number: index.toString(),
    return_all: "false",
  });

  if (filter) {
    if (filter.rating?.ratingOperator)
      params.append(
        "ratingOperator",
        ratingOperatorMapping[filter.rating.ratingOperator]
      );
    if (filter.rating?.ratingValue)
      params.append("rating", filter.rating.ratingValue);
    if (filter.season) params.append("season", filter.season);
    if (filter.name) params.append("name", filter.name);
  }

  return `/api/watched_movies?${params.toString()}`;
}

export function useFetchWatchedMovies(index: number, filter?: MovieFilter) {
  const api_url = buildFilterParams(index, filter);

  const { data, error, isLoading } = useSWR<Movie[], Error>(
    api_url,
    (url) => getRequest(url, null),
    { revalidateOnFocus: false }
  );

  return {
    movies: data,
    isLoading,
    isError: error,
  };
}
