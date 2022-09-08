import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useRoutes } from "react-router-dom";

import { appConfig } from "./configs/app";
import { routes } from "./configs/routes";

import LoadingScreen from "@/components/loading-screen";
import { useAppDispatch } from "@/hooks";
import { changeAppStatusToReady } from "@/store/reducers/app";

function App() {
  const { ready } = useTranslation();
  const dispatch = useAppDispatch();
  const appRoutes = useRoutes(routes);

  useEffect(() => {
    if (ready) {
      dispatch(changeAppStatusToReady());
    }
  }, [ready]);

  return (
    <>
      <Helmet>
        <title>{appConfig.name}</title>
      </Helmet>
      <LoadingScreen />
      {ready && appRoutes}
    </>
  );
}

export default App;
