import React, { useMemo } from "react";
import { Column } from "react-table";

import { Passenger, passengerService } from "../../services";

import Table from "@/components/table";
import { useTableHandler } from "@/hooks";

const AdvancedTable = () => {
  const [tableState, tableHandlers] = useTableHandler(
    ["passengers"],
    passengerService.getList.bind(passengerService),
    { keyForPage: "p", keyForPageSize: "s" }
  );

  const columns = useMemo(
    () =>
      [
        {
          Header: "ID",
          accessor: "_id",
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Trips",
          accessor: "trips",
        },
      ] as Column<Passenger>[],
    []
  );

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="mb-0 text-xl font-medium">Advanced Table (Pagination - Controlled)</h2>
      </div>
      <Table<Passenger> columns={columns} {...tableState} {...tableHandlers} />
    </>
  );
};

export default React.memo(AdvancedTable);
