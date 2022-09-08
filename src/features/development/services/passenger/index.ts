import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { Passenger } from "./types";

import { appConfig } from "@/configs/app";
import { ListResponse, Service } from "@/services";

interface PassengerServiceListQueryParams extends Record<string, unknown> {
  page: number;
  size: number;
}

interface PassengerServiceListResponse {
  data: Passenger[];
  totalPassengers: number;
  totalPages: number;
}

class PassengerService extends Service<Passenger> {
  protected handlePassengerServiceListResponse(
    queryParams: PassengerServiceListQueryParams,
    serviceListResponse: PassengerServiceListResponse
  ): ListResponse<Passenger> {
    const { page, size } = queryParams;

    if (Array.isArray(serviceListResponse.data)) {
      return {
        data: serviceListResponse.data,
        currentPage: Number(page) - 1,
        currentPageSize: size,
        itemCount: serviceListResponse.totalPassengers ?? serviceListResponse.data.length ?? 0,
        pageCount: serviceListResponse.totalPages,
      };
    }

    return Service.INITIAL_LIST_RESPONSE;
  }

  getList(config?: AxiosRequestConfig): Promise<ListResponse<Passenger>> {
    const {
      currentPage = 0,
      currentPageSize = appConfig.defaultPageSize,
      ...params
    } = config?.params || {};

    const queryParams: PassengerServiceListQueryParams = {
      ...params,
      page: Number(currentPage) + 1,
      size: currentPageSize,
    };

    return this.request
      .get<ListResponse<Passenger>, AxiosResponse<PassengerServiceListResponse>>(this.endpoint, {
        ...config,
        params: queryParams,
      })
      .then((response) => this.handlePassengerServiceListResponse(queryParams, response.data))
      .catch((error) => this.handleError(error));
  }
}

const passengerService = new PassengerService({
  endpoint: "https://api.instantwebtools.net/v1/passenger",
  request: axios,
});

export default passengerService;
