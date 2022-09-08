import type { ParseOptions, StringifyOptions } from "query-string";
import { parse, stringify } from "query-string";
import type * as React from "react";
import { useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdate } from "react-use";

import useMemoizedFunction from "../use-memoized-function";

import { UseQueryParamsOptions, UseQueryParamsState } from "./types";

const defaultParseConfig: ParseOptions = {
  parseNumbers: true,
  parseBooleans: true,
};

const defaultStringifyConfig: StringifyOptions = {
  skipNull: true,
  skipEmptyString: true,
};

const useQueryParams = <State extends UseQueryParamsState = UseQueryParamsState>(
  initialQueryParams?: State | (() => State),
  options?: UseQueryParamsOptions
) => {
  type QueryParams = Partial<{ [key in keyof State]: State[key] }>;
  const { navigateMode = "push", parseOptions, stringifyOptions } = options || {};

  const mergedParseOptions = { ...defaultParseConfig, ...parseOptions };
  const mergedStringifyOptions = { ...defaultStringifyConfig, ...stringifyOptions };

  const location = useLocation();

  const navigate = useNavigate();

  const update = useUpdate();

  const initialQueryParamsRef = useRef(
    typeof initialQueryParams === "function"
      ? (initialQueryParams as () => State)()
      : initialQueryParams || {}
  );

  const queryParamsFromUrl = useMemo(
    () => parse(location.search, mergedParseOptions),
    [location.search]
  );

  const queryParams: QueryParams = useMemo(
    () =>
      Object.keys(initialQueryParamsRef.current).reduce<QueryParams>(
        (result, trackingKey) => ({
          ...result,
          [trackingKey]: queryParamsFromUrl[trackingKey] ?? result[trackingKey],
        }),
        initialQueryParamsRef.current
      ),
    [queryParamsFromUrl]
  );

  const setQueryParams = (s: React.SetStateAction<QueryParams>) => {
    const newQueryParams = typeof s === "function" ? s(queryParams) : s;

    update();

    navigate(
      {
        hash: location.hash,
        search:
          stringify({ ...queryParamsFromUrl, ...newQueryParams }, mergedStringifyOptions) || "?",
      },
      {
        replace: navigateMode === "replace",
      }
    );
  };

  return [queryParams, useMemoizedFunction(setQueryParams)] as const;
};

export default useQueryParams;
