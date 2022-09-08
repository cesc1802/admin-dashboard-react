import classNames from "classnames";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TableInstance } from "react-table";

import { appConfig } from "@/configs/app";

interface TablePaginationProps<D extends object = {}> {
  tableInstance: TableInstance<D>;
  itemCount?: number;
}

const TablePagination = <D extends object = {}>({
  tableInstance,
  itemCount = 0,
}: TablePaginationProps<D>) => {
  const { t } = useTranslation();
  const {
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageOptions,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const pagesToShow = useMemo(() => {
    const numberOfPagesToShow = 3;

    if (pageIndex < numberOfPagesToShow - 1) {
      return pageOptions.slice(0, numberOfPagesToShow);
    }

    if (pageIndex > pageOptions.length - numberOfPagesToShow) {
      return pageOptions.slice(-numberOfPagesToShow);
    }

    return pageOptions.slice(pageIndex - 1, pageIndex + 2);
  }, [pageIndex, pageOptions]);

  const onChangePageSize = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(event.target.value));
    },
    [setPageSize]
  );

  return (
    <div className="flex flex-col items-center justify-end gap-4 py-4 sm:flex-row">
      <span>
        {pageIndex * pageSize + 1} - {(pageIndex + 1) * pageSize} {t("table.pagination.of")}{" "}
        {itemCount}
      </span>
      <div className="btn-group">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="btn btn-ghost btn-square"
        >
          <i className="icon-x2arrow-right rotate-180 font-bold" />
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="btn btn-ghost btn-square"
        >
          <i className="icon-arrow-left-1 font-bold" />
        </button>
        {pagesToShow.map((page) => (
          <button
            key={page}
            onClick={() => gotoPage(page)}
            className={classNames("btn btn-ghost btn-square hidden sm:block", {
              "btn-active": page === pageIndex,
            })}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="btn btn-ghost btn-square"
        >
          <i className="icon-arrow-right-1 font-bold" />
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="btn btn-ghost btn-square"
        >
          <i className="icon-x2arrow-right font-bold" />
        </button>
      </div>
      <select
        value={pageSize}
        onChange={onChangePageSize}
        className="cursor-pointer bg-transparent outline-none"
      >
        {appConfig.pageSizeOptions.map((pageSizeOption) => (
          <option key={pageSizeOption} value={pageSizeOption}>
            {pageSizeOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TablePagination;
