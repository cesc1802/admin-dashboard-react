import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";

const ProductsPage = ({ t }: WithTranslation) => (
  <>
    <PageHeader documentTitle={t("pages.products")} pageTitle={t("pages.products")} />
    <PageContent innerScroll>
      <div className="card flex-1 overflow-visible bg-white dark:bg-neutral">
        <div className="card-body" />
      </div>
    </PageContent>
  </>
);

export default withTranslation()(ProductsPage);
