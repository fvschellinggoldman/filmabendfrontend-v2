import useSWR from "swr";
import { Movie } from "../../types/movie";
import { getRequest } from "../api";

export function useFetchWatchedMovies(index: number) {

  const api_url = `/api/watched_movies?page_number=${index}&return_all=false`;

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
