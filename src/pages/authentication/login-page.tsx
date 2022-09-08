import { Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { appConfig } from "@/configs/app";
import { routePaths } from "@/configs/route-paths";
import { Carousel, LoginForm } from "@/features/authentication";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { login, selectAuthenticationStatus } from "@/store/reducers/auth";

const LoginPage = () => {
  const { t } = useTranslation();
  const isAuthenticated = useAppSelector(selectAuthenticationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLoginSuccess = () => dispatch(login("admin"));

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => navigate(routePaths.HOME, { replace: true }), 200);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative flex flex-1">
      <Carousel />
      <Transition
        as={React.Fragment}
        appear
        show={!isAuthenticated}
        enter="transition-transform duration-1000 ease-out"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-200"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="absolute inset-y-0 right-0 flex h-full w-3/12 min-w-[450px] flex-col justify-between overflow-y-auto bg-white px-12 pt-16 pb-12 dark:bg-neutral">
          <div className="flex items-center gap-3.5">
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-base-content dark:bg-transparent">
              <i className="icon-logo text-9xl" />
            </div>
            <div className="m-0 text-2xl font-bold">{appConfig.name}</div>
          </div>
          <div className="mb-32">
            <div className="mb-16">
              <h1 className="text-3xl font-bold text-primary">{t("features.login.formTitle")}</h1>
              <p className="text-base-content/50">{t("features.login.formSubTitle")}</p>
            </div>
            <LoginForm onLoginSuccess={onLoginSuccess} />
          </div>
          <div className="text-sm">
            <span className="text-base-content/50">{t("features.login.dontHaveAnAccountYet")}</span>{" "}
            <button className="btn btn-link p-0 font-normal normal-case hover:no-underline">
              {t("features.login.buttons.register")}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default LoginPage;
