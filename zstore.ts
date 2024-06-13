import { create } from "zustand";

type SideMenuStoreType = {
  isCollapsed: boolean;
  toggleSideMenu: () => void;
};

type AuthStoreType = {
  username: string;
  email: string;
  org: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  boards: BoardType[];
  setUser: (user: any) => void;
};
export type UserType = {
  pk: string;
  username: string;
  email: string;
  org?: string;
  picture: string;
};

type SprintType = {
  pk: string;
  title: string;
  color: string;
  pulses: PulseType[];
};

export type BoardType = {
  pk: string;
  title: string;
  picture: string;
  description: string;
  admins: UserType[];
  members: UserType[];
  statuses: { title: string; color: string }[];
  priority: { title: string; color: string }[];
  sprints: SprintType[];
};

type PulseType = {
  pk: string;
  title: string;
  assigned: string[];
  timeline: string;
  tag: string;
};

export const useSideMenu = create<SideMenuStoreType>((setState) => ({
  isCollapsed: false,
  toggleSideMenu: () => {
    setState(({ isCollapsed }) => ({ isCollapsed: !isCollapsed }));
  },
}));

export const useAuth = create<AuthStoreType>((setState) => ({
  isAuthenticated: false,
  isLoading: true,
  username: "",
  email: "",
  org: "",
  boards: [],
  setUser: (user: any) => {
    setState(() => user);
  },
}));
