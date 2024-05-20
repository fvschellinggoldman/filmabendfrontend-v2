import useSWR from "swr";
import { getRequest } from "../api";
import { User } from "../../types/user";

export function useFetchUser() {
    const api_url = "/api/users/me";
    console.log("test")
    const { data, error, isLoading } = useSWR<User, Error>(api_url, (url) =>
      getRequest(url, null)
    );
  
    return {
      user: data,
      isLoading,
      isError: error,
    };
  }