import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Column } from "react-table";

import { Airline, airlineService } from "../../services";

import Table from "@/components/table";

const BasicTable = () => {
  const queryResult = useQuery(["airlines"], airlineService.getAll.bind(airlineService), {
    refetchOnWindowFocus: false,
  });
  const { data, isLoading } = queryResult;

  const columns = useMemo(
    () =>
      [
        {
          Header: "#",
          accessor: "id",
          headerClasses: "text-center",
          classes: "text-center",
          Cell: ({ row }) => row.index + 1,
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Country",
          accessor: "country",
        },
        {
          Header: "Slogan",
          accessor: "slogan",
        },
        {
          Header: "Head Quaters",
          accessor: "head_quaters",
        },
        {
          Header: "Website",
          accessor: "website",
        },
        {
          Header: "Established",
          accessor: "established",
        },
      ] as Column<Airline>[],
    []
  );

  return (
    <>
      <h2 className="mb-8 text-xl font-medium">Basic Table (Pagination - Uncontrolled)</h2>
      <Table<Airline> columns={columns} data={data || []} loading={isLoading} />
    </>
  );
};

export default BasicTable;
