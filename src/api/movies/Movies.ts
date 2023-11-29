import { mutate } from "swr";
import { MovieSearchResult, MovieSuggestion } from "../../types/movie";
import { postRequest } from "../api";
  
  export async function _addMovie(
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
    _addMovie(searchedMovie, eventId)
    mutate("/api/event");
  }
  
  export function addSuggestedMovie(
    suggestedMovie: MovieSuggestion,
  ) {
    _addMovie(
      suggestedMovie,
      suggestedMovie.eventId
    )
  }

  // export function declineSuggestMovie(
  //   suggestedMovie: MovieSuggestion
  // ) {
  //   const url = "/api/movie";
  
  //   postRequest(url, {
  //     title: movieToAdd.title,
  //     releaseDate: movieToAdd.releaseDate,
  //     tmdbId: movieToAdd.tmdbId,
  //     eventId: eventId,
  //   });
  // }