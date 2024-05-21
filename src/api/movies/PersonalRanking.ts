import useSWR from "swr";
import { UserRatedMovie } from "../../types/movie";
import { getRequest } from "../api";

export function useFetchPersonalRanking(user_id?: string) {

    const api_url = `/api/personal_ranking/${user_id}`;
  
    const { data, error, isLoading } = useSWR<UserRatedMovie[], Error>(api_url, (url) =>
        getRequest(url, null)
    );
  
    return {
        personalRankings: data,
        isLoading,
        isError: error,
      };  
    }
  