import classNames from "classnames";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { appConfig } from "@/configs/app";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const switchLanguage = useCallback(() => {
    if (i18n.language === appConfig.supportedLanguages.Vietnamese) {
      i18n.changeLanguage(appConfig.supportedLanguages.English);
    } else {
      i18n.changeLanguage(appConfig.supportedLanguages.Vietnamese);
    }
  }, [i18n]);

  return (
    <div
      onClick={switchLanguage}
      className={classNames("btn swap btn-ghost btn-circle btn-sm swap-rotate text-sm", {
        "swap-active": i18n.language === appConfig.supportedLanguages.Vietnamese,
      })}
    >
      <span className="swap-on flex items-center justify-center">
        <i className="icon-us">
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
          <span className="path4" />
        </i>
      </span>
      <span className="swap-off flex items-center justify-center">
        <i className="icon-vn">
          <span className="path1" />
          <span className="path2" />
        </i>
      </span>
    </div>
  );
};

export default LanguageSwitcher;
