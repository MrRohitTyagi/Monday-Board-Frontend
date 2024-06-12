import { create } from "zustand";

type SideMenuStoreType = {
  isCollapsed: boolean;
  toggleSideMenu: () => void;
};

export const useSideMenu = create<SideMenuStoreType>((setState) => ({
  isCollapsed: false,
  toggleSideMenu: () => {
    setState(({ isCollapsed }) => ({ isCollapsed: !isCollapsed }));
  },
}));
