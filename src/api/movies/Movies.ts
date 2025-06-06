import useSWR, { mutate } from "swr";
import {
  MovieDetail,
  MovieSearchResult,
  MovieSuggestion,
} from "../../types/movie";
import { getRequest, postRequest, putRequest } from "../api";

async function _addMovie(
  movieToAdd: MovieSearchResult | MovieSuggestion,
  eventId: number
) {
  const url = "/api/movie";

  await postRequest(url, {
    title: movieToAdd.title,
    releaseDate: movieToAdd.releaseDate,
    tmdbId: movieToAdd.tmdbId,
    eventId: eventId,
  });
}

export function addSearchedMovie(
  searchedMovie: MovieSearchResult,
  eventId: number
) {
  return _addMovie(searchedMovie, eventId);
}

export async function addSuggestedMovie(suggestedMovie?: MovieSuggestion) {
  if (suggestedMovie) {
    _addMovie(suggestedMovie, suggestedMovie.eventId);
    await _updateSuggestionState(suggestedMovie, "ACCEPTED");
  }
}

export async function declineSuggestedMovie(suggestedMovie?: MovieSuggestion) {
  if (suggestedMovie) await _updateSuggestionState(suggestedMovie, "DECLINED");
}

export function useFetchMovie(movieId: number) {
  const api_url = `/api/movie/${movieId}`;

  const { data, error, isLoading } = useSWR<MovieDetail, Error>(
    api_url,
    (url) => getRequest(url, null),
    { revalidateOnFocus: false }
  );

  return {
    movie: data,
    isLoading,
    isError: error,
  };
}

async function _updateSuggestionState(
  suggestedMovie: MovieSuggestion,
  newState: string
) {
  const url = `/api/event/${suggestedMovie.eventId}/${suggestedMovie.id}/update_suggestion_state`;
  return putRequest(url, {
    newState,
  });
}
