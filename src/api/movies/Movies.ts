import { mutate } from "swr";
import { MovieSearchResult } from "../../types/movie";
import { postRequest } from "../api";

export function useSearch(searchString: string) {
    const api_url = "api/search";
  
    return {
      searchResults: [],
      isLoading: false,
      isError: "error",
    };
  }
  
  export async function addMovie(
    searchResult: MovieSearchResult,
    eventId: number
  ) {
    const url = "api/movie";
  
    await postRequest(url, {
      title: searchResult.title,
      releaseDate: searchResult.releaseDate,
      tmdbId: searchResult.tmdbId,
      eventId: eventId,
    });
  
    mutate("/api/event");
  }
  