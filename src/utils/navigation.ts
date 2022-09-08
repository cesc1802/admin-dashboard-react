import { NavigationGroup, NavigationSubGroup, NavigationItem } from "@/configs/navigation";

interface ActiveNavigationSubGroup extends NavigationSubGroup {
  activeItem: NavigationItem;
}

interface ActiveNavigationGroup extends NavigationGroup {
  activeSubGroup: ActiveNavigationSubGroup;
}

export const getActiveNavigationGroup = (
  navigationConfig: NavigationGroup[],
  pathname: string
): ActiveNavigationGroup | null => {
  let activeNavigationGroup: ActiveNavigationGroup | null = null;

  navigationConfig.forEach((group) =>
    group.children.forEach((subGroup) =>
      subGroup.children.forEach((item) => {
        if (item.path === pathname) {
          activeNavigationGroup = {
            ...group,
            activeSubGroup: {
              ...subGroup,
              activeItem: item,
            },
          };
        }
      })
    )
  );

  return activeNavigationGroup;
};
