import type { ParseOptions, StringifyOptions } from "query-string";

export type UseQueryParamsState = Record<string, any>;

export interface UseQueryParamsOptions {
  navigateMode?: "push" | "replace";
  parseOptions?: ParseOptions;
  stringifyOptions?: StringifyOptions;
}
