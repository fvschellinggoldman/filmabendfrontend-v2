import useSWR from "swr";
import { RatingQueueElement } from "../../types/rating";
import { getRequest } from "../api";
  
  export function useFetchRatingQueue() {
    const api_url = "/api/rating_queue";

    const { data, error, isLoading } = useSWR<RatingQueueElement[], Error>(api_url, (url) =>
        getRequest(url, null)
    );
  
    return {
        ratingQueue: data ? data:[],
        isLoading,
        isError: error,
      };  
    }
  