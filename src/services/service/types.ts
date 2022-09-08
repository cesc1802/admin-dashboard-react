export interface ServiceErrorResponse {
  code: number;
  message: string;
}

export interface ServiceListQueryParams extends Record<string, unknown> {
  page: number;
  per_page: number;
}

export interface ServiceListResponse<TData> {
  data: TData[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ListResponse<TData> {
  data: TData[];
  currentPage: number;
  currentPageSize: number;
  itemCount: number;
  pageCount: number;
}
