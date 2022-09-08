import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import { AdvancedTable, BasicTable } from "@/features/development";

const ExampleTablesPage = ({ t }: WithTranslation) => (
  <>
    <PageHeader
      documentTitle={t("development.exampleTables")}
      pageTitle={t("development.exampleTables")}
    />
    <PageContent innerScroll>
      <div className="flex flex-col gap-8">
        <div className="card overflow-visible bg-white dark:bg-neutral">
          <div className="card-body">
            <BasicTable />
          </div>
        </div>
        <div className="card overflow-visible bg-white dark:bg-neutral">
          <div className="card-body">
            <AdvancedTable />
          </div>
        </div>
      </div>
    </PageContent>
  </>
);

export default withTranslation()(ExampleTablesPage);
