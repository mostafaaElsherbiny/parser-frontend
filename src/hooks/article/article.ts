import { useQuery, UseQueryOptions } from "react-query";
import { getApi } from "../../api/article/article";
import { IArticleData } from "../../interfaces/article";
import { AxiosResponse } from "axios";

export const ARTICLES_KEY = "articles-key";
export const ARTICLES_ALL_KEY = "articles-all-key";

export function useArticle(
  page: number,
  per_page: number,
  sort?: string,
  sort_type?: string,
  filter_by?: string,
  filter_value?: string,
  filter_condition?: string,
  start_date?: string,
  end_date?: string,
  deleted?: string,
  active?: string,
  options?: UseQueryOptions<IArticleData, any>
) {
  return useQuery<IArticleData, any>(
    [
      ARTICLES_KEY,
      page,
      per_page,
      sort,
      sort_type,
      filter_by,
      filter_value,
      filter_condition,
      start_date,
      end_date,
      deleted,
      active,
    ],
    () =>
      getApi(
        page,
        per_page,
        sort,
        sort_type,
        filter_by,
        filter_value,
        filter_condition
      ).then((response: AxiosResponse<IArticleData, any>) => response.data),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      ...options,
    }
  );
}
