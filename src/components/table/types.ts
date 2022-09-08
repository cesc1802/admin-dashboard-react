import React from "react";
import {
  ColumnInterfaceBasedOnValue,
  // UseColumnOrderInstanceProps,
  // UseColumnOrderState,
  // UseExpandedHooks,
  // UseExpandedInstanceProps,
  // UseExpandedOptions,
  // UseExpandedRowProps,
  // UseExpandedState,
  // UseFiltersColumnOptions,
  // UseFiltersColumnProps,
  // UseFiltersInstanceProps,
  // UseFiltersOptions,
  // UseFiltersState,
  // UseGlobalFiltersColumnOptions,
  // UseGlobalFiltersInstanceProps,
  // UseGlobalFiltersOptions,
  // UseGlobalFiltersState,
  // UseGroupByCellProps,
  // UseGroupByColumnOptions,
  // UseGroupByColumnProps,
  // UseGroupByHooks,
  // UseGroupByInstanceProps,
  // UseGroupByOptions,
  // UseGroupByRowProps,
  // UseGroupByState,
  // UsePaginationInstanceProps,
  UsePaginationOptions,
  // UsePaginationState,
  // UseResizeColumnsColumnOptions,
  // UseResizeColumnsColumnProps,
  // UseResizeColumnsOptions,
  // UseResizeColumnsState,
  // UseRowSelectHooks,
  // UseRowSelectInstanceProps,
  // UseRowSelectOptions,
  // UseRowSelectRowProps,
  // UseRowSelectState,
  // UseRowStateCellProps,
  // UseRowStateInstanceProps,
  // UseRowStateOptions,
  // UseRowStateRowProps,
  // UseRowStateState,
  // UseSortByColumnOptions,
  // UseSortByColumnProps,
  UseTableColumnOptions,
  UseTableColumnProps,
} from "react-table";

interface ColumnWithExtendProps {
  classes?: string;
  style?: React.CSSProperties;
  headerClasses?: string;
  headerStyle?: React.CSSProperties;
  footerClasses?: string;
  footerStyle?: React.CSSProperties;
}

declare module "react-table" {
  export interface ColumnInterface<D extends object = {}>
    extends UseTableColumnOptions<D>,
      ColumnWithExtendProps {}
  export interface ColumnInstance<D extends object = {}>
    extends Omit<ColumnInterface<D>, "id">,
      ColumnInterfaceBasedOnValue<D>,
      UseTableColumnProps<D>,
      ColumnWithExtendProps {}

  export interface TableOptions<D extends object = {}>
    extends UseTableOptions<D>,
      UsePaginationOptions<D> {}

  export interface TableState<D extends object = {}> extends UsePaginationState<D> {
    hiddenColumns?: Array<IdType<D>> | undefined;
  }

  export interface TableInstance<D extends object = {}>
    extends Omit<TableOptions<D>, "columns" | "pageCount">,
      UseTableInstanceProps<D>,
      UsePaginationInstanceProps<D> {}
}
