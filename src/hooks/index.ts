import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "@/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { default as useQueryParams } from "./use-query-params";
export type { UseQueryParamsOptions, UseQueryParamsState } from "./use-query-params/types";
export { default as useTableHandler } from "./use-table-handler";
