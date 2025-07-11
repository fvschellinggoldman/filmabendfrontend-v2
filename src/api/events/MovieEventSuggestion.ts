import useSWR from "swr";
import { getRequest } from "../api";
import { MovieSuggestion } from "../../types/movie";

export function useFetchMovieEventSuggestions(eventId: number, preventFetch: boolean = false) {
  const api_url = `/api/event/${eventId}/suggestion`;

  const { data, error, isLoading, mutate } = useSWR<MovieSuggestion, Error>(
    preventFetch ? undefined : api_url,
    (url) => getRequest(url, null),

  );

  return {
    movieSuggestion: data,
    isLoading,
    isError: error,
    mutate,
  };
}
