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

type AuthStoreType = {
  username: string;
  email: string;
  org: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: any) => void;
};

export const useAuth = create<AuthStoreType>((setState) => ({
  isAuthenticated: false,
  isLoading: true,
  username: "",
  email: "",
  org: "",
  setUser: (user: any) => {
    setState(() => user);
  },
}));
