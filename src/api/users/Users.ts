import useSWR from "swr";
import { getRequest } from "../api";
import { User } from "../../types/user";

export function useFetchUser() {
  const api_url = "/api/users/me";
  const { data, error, isLoading } = useSWR<User, Error>(api_url, (url) => {
    return getRequest(url, null);
  }, {
    revalidateOnFocus: false,
  });

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
