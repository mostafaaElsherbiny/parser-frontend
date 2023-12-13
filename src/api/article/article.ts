import makeRequest from "../makeRequest";
import { AxiosResponse } from "axios";
import { IArticleData } from "../../interfaces/article";

const Base = "articles/";
export function getApi(
  page: number,
  per_page: number,
  order_column?: string,
  order_type?: string,
  filter_by?: string,
  filter_value?: string,
  filter_condition?: string
): Promise<AxiosResponse<IArticleData, any>> {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  if (per_page === 0) {
    params.append("per_page", "10");
  } else {
    params.append("per_page", per_page.toString());
  }
  if (order_column && order_type) {
    params.append("sortBy", order_column);
    params.append("sortValue", order_type);
  }
  if (filter_by && filter_value && filter_condition) {
    params.append("filter_by", filter_by);
    params.append("filter_value", filter_value);
    params.append("filter_condition", filter_condition);
  }
  return makeRequest.get(Base, {
    params: params,
  });
}
export function getCategoriesApi(): Promise<AxiosResponse<any, any>> {
  return makeRequest.get(Base + "categories");
}

