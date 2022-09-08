import { Transition } from "@headlessui/react";
import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";
import { TableOptions, usePagination, useTable } from "react-table";
import { useUpdateEffect } from "react-use";

import TablePagination from "./table-pagination";

import { appConfig } from "@/configs/app";

interface TableProps<D extends object = {}> extends TableOptions<D> {
  wrapperClasses?: string;
  classes?: string;
  headerClasses?: string;
  showFooter?: boolean;
  footerClasses?: string;
  highlightOnHover?: boolean;
  currentPage?: number;
  currentPageSize?: number;
  loading?: boolean;
  fetching?: boolean;
  itemCount?: number;
  onChangePagination?: (pagination: { pageIndex: number; pageSize: number }) => void;
}

const Table = <D extends object = {}>({
  wrapperClasses = "",
  classes = "",
  headerClasses = "",
  showFooter = false,
  footerClasses = "",
  highlightOnHover = false,
  currentPage = 0,
  currentPageSize = appConfig.defaultPageSize,
  loading = false,
  fetching = false,
  itemCount = 0,
  pageCount = 0,
  onChangePagination,
  initialState,
  ...tableOptions
}: TableProps<D>) => {
  const { t } = useTranslation();

  const tableInstance = useTable<D>(
    {
      initialState: {
        ...initialState,
        pageIndex: currentPage,
        pageSize: currentPageSize,
      },
      ...tableOptions,
      ...(tableOptions?.manualPagination && { pageCount }),
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
  } = tableInstance;

  useUpdateEffect(() => {
    onChangePagination?.({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

  return (
    <>
      <div className={classNames("w-full overflow-x-auto", wrapperClasses)}>
        <table {...getTableProps({ className: classNames("table w-full", classes) })}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps({
                      className: classNames("", headerClasses, column.headerClasses),
                      style: column.headerStyle,
                    })}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps({ className: "relative" })}>
            {loading && (
              <tr>
                <td colSpan={10000} className="text-center text-base-content/50">
                  {t("table.messages.loading")}
                </td>
              </tr>
            )}
            <Transition
              as={React.Fragment}
              show={!loading && fetching && !!page.length}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0 visible"
              enterTo="opacity-100"
              leave="transition-colors duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 invisible"
            >
              <tr className="absolute inset-0 flex w-full items-center bg-white/80 dark:bg-neutral/80">
                <td className="w-full border-none text-center text-base-content/50">
                  {t("table.messages.loading")}
                </td>
              </tr>
            </Transition>
            {!loading && fetching && !page.length && (
              <tr>
                <td colSpan={10000} className="text-center text-base-content/50">
                  {t("table.messages.loading")}
                </td>
              </tr>
            )}
            {!loading && !fetching && !page.length && (
              <tr>
                <td colSpan={10000} className="text-center text-base-content/50">
                  {t("table.messages.empty")}
                </td>
              </tr>
            )}
            {!loading &&
              !!page.length &&
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps([{ className: classNames({ hover: highlightOnHover }) }])}
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps([
                          {
                            className: classNames("", cell.column.classes),
                            style: cell.column.style,
                          },
                        ])}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
          {showFooter && (
            <tfoot>
              {footerGroups.map((group) => (
                <tr {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => (
                    <td
                      {...column.getFooterProps([
                        {
                          className: classNames("", footerClasses, column.footerClasses),
                          style: column.footerStyle,
                        },
                      ])}
                    >
                      {column.render("Footer")}
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>
      <TablePagination<D>
        tableInstance={tableInstance}
        itemCount={tableOptions.manualPagination ? itemCount : tableOptions.data.length}
      />
    </>
  );
};

export default React.memo(Table) as typeof Table;
