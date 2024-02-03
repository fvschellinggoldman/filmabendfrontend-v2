import useSWR from "swr";
import { getRequest } from "../api";

export function useRemainingCategory() {
  const api_url = "/api/remaining_categories";
  
  const { data, error, isLoading } = useSWR<number, Error>(
    api_url, 
    (url) => getRequest(url, null), 
  )
  return {
    remainingCategories: data,
    isLoading,
    isError: error,
  };
}