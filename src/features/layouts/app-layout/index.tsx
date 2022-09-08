import React from "react";
import { Outlet } from "react-router-dom";

// import Header from "./components/header";
// import SideNavigationr from "./components/side-navigation";

const AppLayout = () => (
  <div className="flex min-h-screen flex-col">
    {/* <Header />
    <div className="flex flex-1 items-stretch">
      <SideNavigationr />
      <div className="flex max-h-[calc(100vh_-_64px)] flex-1 flex-col overflow-auto">
        <React.Suspense fallback={null}>
          <Outlet />
        </React.Suspense>
      </div>
    </div> */}
  </div>
);

export default AppLayout;
