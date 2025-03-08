import useSWR from "swr";
import { getRequest } from "../api";
import { MovieSuggestion } from "../../types/movie";

export function useFetchMovieEventSuggestions(eventId: number) {
  const api_url = `/api/event/${eventId}/suggestion`;

  const { data, error, isLoading } = useSWR<MovieSuggestion, Error>(
    api_url,
    (url) => getRequest(url, null)
  );

  return {
    movieSuggestion: data,
    isLoading,
    isError: error,
  };
}
