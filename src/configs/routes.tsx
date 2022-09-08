import React from "react";
import { RouteObject } from "react-router-dom";

import { routePaths } from "./route-paths";

import { RequireAuth } from "@/components/require-auth";
import AppLayout from "@/features/layouts/app-layout";
import AuthLayout from "@/features/layouts/auth-layout";
import NotFoundPage from "@/pages/not-found";
import { isDevelopment } from "@/utils/mixin";

const LoginPage = React.lazy(() => import("@/pages/authentication/login-page"));
const HomePage = React.lazy(() => import("@/pages/home"));
const AnalyticsPage = React.lazy(() => import("@/pages/dashboards/analytics-page"));
const ProductsPage = React.lazy(() => import("@/pages/resources/products-page"));
const CustomersPage = React.lazy(() => import("@/pages/resources/customers-page"));
const UsersPage = React.lazy(() => import("@/pages/system/users"));
const ExampleEmptyPage = React.lazy(() => import("@/pages/development/examples/empty-page"));
const ExampleTablesPage = React.lazy(() => import("@/pages/development/examples/tables-page"));

export const routes: RouteObject[] = [
  {
    path: routePaths.AUTHENTICATION_LOGIN,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: routePaths.HOME,
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routePaths.DASHBOARDS_ANALYTICS,
        element: <AnalyticsPage />,
      },
      {
        path: routePaths.RESOURCES_PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: routePaths.RESOURCES_CUSTOMERS,
        element: <CustomersPage />,
      },
      {
        path: routePaths.SYSTEM_USERS,
        element: <UsersPage />,
      },
      ...(isDevelopment()
        ? [
            {
              path: routePaths.DEVELOPMENT_EXAMPLES_EMPTY_PAGE,
              element: <ExampleEmptyPage />,
            },
            {
              path: routePaths.DEVELOPMENT_EXAMPLES_TABLES,
              element: <ExampleTablesPage />,
            },
          ]
        : []),
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
