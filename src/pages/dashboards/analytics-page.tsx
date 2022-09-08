import React from "react";
import { useTranslation } from "react-i18next";

import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";

const AnalyticsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader pageTitle={t("pages.analytics")} />
      <PageContent innerScroll>
        <div className="card flex-1 overflow-visible bg-white dark:bg-neutral">
          <div className="card-body">
            <div className="min-h-[1000px]">
              The minimum height of the content on the analytics page is 1000 pixels
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
};

export default AnalyticsPage;
