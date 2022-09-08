import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";

const UsersPage = ({ t }: WithTranslation) => (
  <>
    <PageHeader documentTitle={t("pages.users")} pageTitle={t("pages.users")} />
    <PageContent innerScroll>
      <div className="card flex-1 overflow-visible bg-white dark:bg-neutral">
        <div className="card-body" />
      </div>
    </PageContent>
  </>
);

export default withTranslation()(UsersPage);
