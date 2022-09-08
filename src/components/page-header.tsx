import { Transition } from "@headlessui/react";
import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { navigationConfig } from "@/configs/navigation";
import { getActiveNavigationGroup } from "@/utils/navigation";

interface PageHeaderProps {
  documentTitle?: string;
  pageTitle: string;
  showBreadcrumbs?: boolean;
}

const PageHeader = ({ documentTitle, pageTitle, showBreadcrumbs = true }: PageHeaderProps) => {
  const location = useLocation();
  const { t } = useTranslation();

  const activeNavigationGroup = useMemo(
    () => getActiveNavigationGroup(navigationConfig, location.pathname),
    [location.pathname]
  );

  return (
    <>
      {documentTitle && (
        <Helmet>
          <title>{documentTitle}</title>
        </Helmet>
      )}
      <Transition
        as={React.Fragment}
        appear
        show
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="border-b-[1px] border-b-base-content/10 bg-white dark:bg-neutral">
          <div className="py-6 px-2 text-sm sm:px-6 lg:px-8">
            {showBreadcrumbs && activeNavigationGroup && (
              <div className="breadcrumbs pt-0">
                <ul>
                  <li className="text-base-content/50">
                    {t(activeNavigationGroup.translate, {
                      defaultValue: activeNavigationGroup.title,
                    })}
                  </li>
                  <li className="text-base-content/50">
                    {t(activeNavigationGroup.activeSubGroup.translate, {
                      defaultValue: activeNavigationGroup.activeSubGroup.title,
                    })}
                  </li>
                </ul>
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-base-content">{pageTitle}</h1>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default PageHeader;
