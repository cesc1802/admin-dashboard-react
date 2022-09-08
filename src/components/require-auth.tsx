import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { routePaths } from "@/configs/route-paths";
import { useAppSelector } from "@/hooks";
import { selectAuthenticationStatus } from "@/store/reducers/auth";

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const isAuthenticated = useAppSelector(selectAuthenticationStatus);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={routePaths.AUTHENTICATION_LOGIN} state={{ from: location }} replace />;
  }

  return children;
};
