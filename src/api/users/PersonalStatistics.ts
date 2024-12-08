import useSWR from "swr";
import { Statistic } from "../../types/statistic";
import { getRequest } from "../api";

export function useFetchPersonalStatistics(user_id?: string) {

    const api_url = `/api/users/personal_statistics/${user_id}`;
  
    const { data, error, isLoading } = useSWR<Statistic[], Error>(api_url, (url) =>
        getRequest(url, null)
    );
  
    return {
        statistics: data,
        isLoading,
        isError: error,
      };  
    }
  