import useSWR from "swr";
import { getRequest } from "../api";
import { UserPreference } from "../../types/user";

export function useFetchUserPreference() {
    const api_url = `/api/user/user_preference`;
  
    const { data, error, isLoading } = useSWR<UserPreference, Error>(api_url, (url) =>
      getRequest(url, null)
    );

    const userPreference: UserPreference = data || { showMobileTutorial: false, showWebTutorial: false };

    return {
      userPreference,
      isLoading,
      isError: error,
    };
  }

  