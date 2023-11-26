import useSWR from "swr";
import { getRequest } from "../api";
import { Event } from "../../types/event";

export function useEvent(id?: number) {
    const api_url = id === undefined ? "/api/event" : `/api/event/${id}`;
  
    const { data, error, isLoading } = useSWR<Event, Error>(
      api_url, 
      (url) => getRequest(url, null), 
      { refreshInterval: 1000 });
  
    return {
      event: data,
      isLoading,
      isError: error,
    };
  }