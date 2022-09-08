import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import {
  ListResponse,
  ServiceErrorResponse,
  ServiceListQueryParams,
  ServiceListResponse,
} from "./types";

import { appConfig } from "@/configs/app";
import axiosInstance from "@/services/axios";

class Service<TData extends object = {}> {
  static INITIAL_LIST_RESPONSE = {
    data: [],
    currentPage: 0,
    currentPageSize: appConfig.defaultPageSize,
    itemCount: 0,
    pageCount: 0,
  };

  protected endpoint: string;

  protected request: AxiosInstance;

  constructor(props: { endpoint: string; request?: AxiosInstance }) {
    this.endpoint = props.endpoint;
    this.request = props.request || axiosInstance;
  }

  protected handleResponse<D = TData>(response: AxiosResponse<D>) {
    return response.data;
  }

  protected handleServiceListResponse(
    queryParams: ServiceListQueryParams,
    serviceListResponse: ServiceListResponse<TData>
  ): ListResponse<TData> {
    const { page, per_page: perPage } = queryParams;

    if (Array.isArray(serviceListResponse.data)) {
      return {
        data: serviceListResponse.data,
        currentPage: (serviceListResponse.page ?? page) - 1,
        currentPageSize: serviceListResponse.per_page ?? perPage,
        itemCount: serviceListResponse.total ?? serviceListResponse.data.length ?? 0,
        pageCount: serviceListResponse.total_pages,
      };
    }

    return Service.INITIAL_LIST_RESPONSE;
  }

  protected handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      const serviceError = error as AxiosError<ServiceErrorResponse>;

      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        code: serviceError.response?.data?.code || serviceError.response?.status,
        message:
          serviceError.response?.data?.message ||
          serviceError.response?.statusText ||
          serviceError.message,
      });
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      message: "Unknown Error",
    });
  }

  create(data: TData, config?: AxiosRequestConfig) {
    return this.request
      .post<TData, AxiosResponse<TData>>(this.endpoint, data, config)
      .then((response) => this.handleResponse<TData>(response))
      .catch((error) => this.handleError(error));
  }

  getSingle(id: number | string, config?: AxiosRequestConfig) {
    return this.request
      .get<TData, AxiosResponse<TData>>(`${this.endpoint}/${id}`, config)
      .then((response) => this.handleResponse<TData>(response))
      .catch((error) => this.handleError(error));
  }

  getList(config?: AxiosRequestConfig) {
    const {
      currentPage = 0,
      currentPageSize = appConfig.defaultPageSize,
      ...params
    } = config?.params || {};

    const queryParams: ServiceListQueryParams = {
      ...params,
      page: Number(currentPage) + 1,
      per_page: currentPageSize,
    };

    return this.request
      .get<ListResponse<TData>, AxiosResponse<ServiceListResponse<TData>>>(this.endpoint, {
        ...config,
        params: queryParams,
      })
      .then((response) => this.handleServiceListResponse(queryParams, response.data))
      .catch((error) => this.handleError(error));
  }

  getAll(config?: AxiosRequestConfig<TData[]>) {
    return this.request
      .get<TData[], AxiosResponse<TData[]>>(this.endpoint, config)
      .then((response) => this.handleResponse<TData[]>(response))
      .catch((error) => this.handleError(error));
  }

  update(data: TData, config?: AxiosRequestConfig) {
    return this.request
      .put<TData, AxiosResponse<TData>>(this.endpoint, data, config)
      .then((response) => this.handleResponse<TData>(response))
      .catch((error) => this.handleError(error));
  }

  delete(id: number | string, config: AxiosRequestConfig) {
    return this.request
      .delete<TData, AxiosResponse<TData>>(`${this.endpoint}/${id}`, config)
      .then((response) => this.handleResponse<TData>(response))
      .catch((error) => this.handleError(error));
  }
}

export default Service;
