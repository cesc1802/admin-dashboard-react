import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { useCallback, useMemo } from "react";
import { TableOptions } from "react-table";

import useQueryParams from "./use-query-params";

import { appConfig } from "@/configs/app";
import { ListResponse, Service } from "@/services";

interface UserTableHandlerOptions<D extends object = {}>
  extends Omit<TableOptions<D>, "columns" | "data"> {
  keyForPage?: string;
  keyForPageSize?: string;
}

interface TableState<D extends object = {}>
  extends ListResponse<D>,
    Omit<TableOptions<D>, "columns" | "data" | "pageCount"> {
  loading?: boolean;
  fetching?: boolean;
}

interface TableHandlers {
  onChangePagination?: (pagination: { pageIndex: number; pageSize: number }) => void;
}

type UserTableHandlerReturn<D extends object = {}> = [TableState<D>, TableHandlers];

const useTableHandler = <D extends object = {}>(
  queryKey: string[],
  queryFunction: (config?: AxiosRequestConfig) => Promise<ListResponse<D>>,
  tableHandlerOptions?: UserTableHandlerOptions<D>
): UserTableHandlerReturn<D> => {
  const {
    keyForPage = "page",
    keyForPageSize = "pageSize",
    ...options
  } = tableHandlerOptions || {};
  const [queryParams, setQueryParams] = useQueryParams({
    [keyForPage]: 0,
    [keyForPageSize]: appConfig.defaultPageSize,
  });

  const queryResult = useQuery<ListResponse<D>>(
    [...queryKey, queryParams],
    () =>
      queryFunction({
        params: {
          currentPage: queryParams[keyForPage],
          currentPageSize: queryParams[keyForPageSize],
        },
      }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const {
    data = {
      ...Service.INITIAL_LIST_RESPONSE,
      currentPage: queryParams[keyForPage],
      currentPageSize: queryParams[keyForPageSize],
    },
    isLoading,
    isFetching,
  } = queryResult;

  const onChangePagination = useCallback(
    (pagination: { pageIndex: number; pageSize: number }) => {
      const { pageIndex, pageSize } = pagination;

      setQueryParams((previousQueryParams) => ({
        ...previousQueryParams,
        [keyForPage]: pageIndex ?? previousQueryParams.page,
        [keyForPageSize]: pageSize ?? previousQueryParams.pageSize,
      }));
    },
    [setQueryParams, keyForPage, keyForPageSize]
  );

  return useMemo(
    () =>
      [
        {
          ...options,
          manualPagination: true,
          ...data,
          loading: isLoading,
          fetching: isFetching,
        },
        { onChangePagination },
      ] as UserTableHandlerReturn<D>,
    [data, isLoading, isFetching, options, onChangePagination]
  );
};

export default useTableHandler;
