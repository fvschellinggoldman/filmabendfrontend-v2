import { mutate } from "swr";
import { MovieSearchResult, MovieSuggestion } from "../../types/movie";
import { postRequest, putRequest } from "../api";
  
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
    _addMovie(searchedMovie, eventId)
    mutate("/api/event");
  }
  
  export function addSuggestedMovie(
    suggestedMovie?: MovieSuggestion,
  ) {
    if (suggestedMovie){
      _addMovie(
        suggestedMovie,
        suggestedMovie.eventId
      )
      _updateSuggestionState(
        suggestedMovie,
        "ACCEPTED"
      )
    }
  }

  export function declineSuggestedMovie(
    suggestedMovie?: MovieSuggestion
  ) {
    if(suggestedMovie) _updateSuggestionState(suggestedMovie, 'DECLINED')
  }

 async function _updateSuggestionState(
    suggestedMovie: MovieSuggestion, newState: string
  ) {
    const url = `/api/event/${suggestedMovie.eventId}/${suggestedMovie.id}/update_suggestion_state`;
    await putRequest(url, {
      newState
    });
    mutate(`/api/event/${suggestedMovie.eventId}/suggestion`);
  }