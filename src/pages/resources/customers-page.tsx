import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";

const CustomersPage = ({ t }: WithTranslation) => (
  <>
    <PageHeader documentTitle={t("pages.customers")} pageTitle={t("pages.customers")} />
    <PageContent innerScroll>
      <div className="card flex-1 overflow-visible bg-white dark:bg-neutral">
        <div className="card-body" />
      </div>
    </PageContent>
  </>
);

export default withTranslation()(CustomersPage);
