import { create } from "zustand";
import { getUser } from "./gateways/user-gateway";

type SideMenuStoreType = {
  isCollapsed: boolean;
  toggleSideMenu: (c: any) => void;
};

type AuthStoreType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserType;
  fetchUser: (user: any) => void;
  notAuthenticated: () => void;
};

export type UserType = {
  _id: string;
  username: string;
  email: string;
  org: string;
  picture: string;
  boards: BoardType[];
};

export type SprintType = {
  _id: string;
  title: string;
  color: string;
  pulses: PulseType[];
};

export type BoardType = {
  _id: string;
  title: string;
  picture: string;
  description: string;
  admins: UserType[];
  members: UserType[];
  statuses: { [key: string]: { title: string; color: string } };
  priority: { [key: string]: { title: string; color: string } };
  sprints: string[];
};

export type PulseType = {
  _id: string;
  title: string;
  assigned: string[];
  timeline: { start?: string; end?: string };
  tag: string;
  status: string;
  priority: string;
};

export const useSideMenu = create<SideMenuStoreType>((setState) => ({
  isCollapsed: false,
  toggleSideMenu: (c: any) => {
    setState(({ isCollapsed }) => ({
      isCollapsed: typeof c == "boolean" ? c : !isCollapsed,
    }));
  },
}));

export const useAuth = create<AuthStoreType>((setState) => ({
  isAuthenticated: false,
  isLoading: true,
  user: {
    _id: "",
    email: "",
    username: "",
    boards: [],
    org: "",
    picture: "",
  } as UserType,

  fetchUser: (id) => {
    getUser(id).then((user) => {
      console.log(
        `%c user `,
        "color: yellow;border:1px solid lightgreen",
        user
      );
      setState((ps) => ({
        user: { ...ps.user, ...user, org: user.org ? user.org : user.username },
        isLoading: false,
        isAuthenticated: true,
      }));
    });
  },
  notAuthenticated: () => {
    setState((ps) => ({
      isLoading: false,
      isAuthenticated: false,
    }));
  },
}));
