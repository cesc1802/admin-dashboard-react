import { routePaths } from "./route-paths";

import { isDevelopment } from "@/utils/mixin";

export enum NavigationType {
  GROUP = "GROUP",
  SUB_GROUP = "SUB_GROUP",
  ITEM = "ITEM",
}
export interface NavigationItem {
  id: string;
  title: string;
  translate: string;
  type: NavigationType;
  path: string;
}

export interface NavigationSubGroup {
  id: string;
  title: string;
  translate: string;
  type: NavigationType;
  children: NavigationItem[];
}

export interface NavigationGroup {
  id: string;
  title: string;
  translate: string;
  type: NavigationType;
  icon: string;
  children: NavigationSubGroup[];
}

export const navigationConfig: NavigationGroup[] = [
  {
    id: "dashboards",
    title: "Dashboards",
    translate: "navigation.dashboards",
    type: NavigationType.GROUP,
    icon: "icon-home",
    children: [
      {
        id: "system",
        title: "System",
        translate: "navigation.dashboards.system",
        type: NavigationType.SUB_GROUP,
        children: [
          {
            id: "analytics",
            title: "Analytics",
            translate: "navigation.dashboards.analytics",
            type: NavigationType.ITEM,
            path: routePaths.DASHBOARDS_ANALYTICS,
          },
        ],
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    translate: "navigation.manageResources",
    type: NavigationType.GROUP,
    icon: "icon-cube3d",
    children: [
      {
        id: "product",
        title: "Product",
        translate: "navigation.manageResources.products",
        type: NavigationType.SUB_GROUP,
        children: [
          {
            id: "product-list",
            title: "Product List",
            translate: "navigation.manageResources.products.management",
            type: NavigationType.ITEM,
            path: routePaths.RESOURCES_PRODUCTS,
          },
        ],
      },
      {
        id: "customer",
        title: "Customer",
        translate: "navigation.manageResources.customers",
        type: NavigationType.SUB_GROUP,
        children: [
          {
            id: "customer-list",
            title: "Customer List",
            translate: "navigation.manageResources.customers.management",
            type: NavigationType.ITEM,
            path: routePaths.RESOURCES_CUSTOMERS,
          },
        ],
      },
    ],
  },
  {
    id: "system",
    title: "System",
    translate: "navigation.system",
    type: NavigationType.GROUP,
    icon: "icon-settings2",
    children: [
      {
        id: "user",
        title: "User",
        translate: "navigation.system.users",
        type: NavigationType.SUB_GROUP,
        children: [
          {
            id: "user-list",
            title: "User List",
            translate: "navigation.system.users.management",
            type: NavigationType.ITEM,
            path: routePaths.SYSTEM_USERS,
          },
        ],
      },
    ],
  },
  ...(isDevelopment()
    ? [
        {
          id: "development-document",
          title: "Development Document",
          translate: "development.document",
          type: NavigationType.GROUP,
          icon: "icon-document-search",
          children: [
            {
              id: "examples",
              title: "Examples",
              translate: "development.examples",
              type: NavigationType.SUB_GROUP,
              children: [
                {
                  id: "example-empty-page",
                  title: "Example Empty Page",
                  translate: "development.exampleEmptyPage",
                  type: NavigationType.ITEM,
                  path: routePaths.DEVELOPMENT_EXAMPLES_EMPTY_PAGE,
                },
                {
                  id: "example-tables",
                  title: "Example Tables",
                  translate: "development.exampleTables",
                  type: NavigationType.ITEM,
                  path: routePaths.DEVELOPMENT_EXAMPLES_TABLES,
                },
              ],
            },
          ],
        },
      ]
    : []),
];
