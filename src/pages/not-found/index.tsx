import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { routePaths } from "@/configs/route-paths";

const NotFoundPage = ({ t }: WithTranslation) => (
  <div className="hero min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <div className="text-5xl font-bold">404</div>
        <p className="mb-5">{t("pages.notFound")}</p>
        <Link to={routePaths.HOME} className="btn btn-outline btn-primary btn-sm normal-case">
          {t("buttons.backToHome")}
        </Link>
      </div>
    </div>
  </div>
);

export default withTranslation()(NotFoundPage);
