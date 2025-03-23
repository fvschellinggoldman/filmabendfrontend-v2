import useSWR from "swr";
import { Category } from "../../types/category";
import { getRequest, postRequest } from "../api";

export function useFetchArchivedCategories() {
  const api_url = "/api/past_categories";

  const { data, error, isLoading, mutate } = useSWR<Category[], Error>(
    api_url,
    (url) => getRequest(url, null)
  );

  return {
    categories: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export async function claimArchivedCategory(categoryId: number) {
  const url = `/api/claim_category/${categoryId}`;

  await postRequest(url, {});
}
