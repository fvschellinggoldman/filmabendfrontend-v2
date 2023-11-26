import useSWR from "swr";
import { RatingStatus } from "../../types/rating";
import { getRequest } from "../api";
  
    export function useFetchRatingStatus(movie_id: number) {
      const api_url = `/api/movie/${movie_id}/rating_status`;
  
      const { data, error, isLoading } = useSWR<RatingStatus, Error>(api_url, (url) =>
          getRequest(url, null)
      );
    
      return {
          ratingStatus: data,
          isLoading,
          isError: error,
        };  
      }
    