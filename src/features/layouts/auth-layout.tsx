import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <div className="flex min-h-screen flex-col">
    <React.Suspense fallback={null}>
      <Outlet />
    </React.Suspense>
  </div>
);

export default AuthLayout;
