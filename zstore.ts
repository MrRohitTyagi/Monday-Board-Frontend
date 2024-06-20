import { create } from "zustand";
import { getUser } from "./gateways/user-gateway";
import { deleteToken } from "./utils/cookie";

type SideMenuStoreType = {
  isCollapsed: boolean;
  toggleSideMenu: (c: any) => void;
};

type ValueType = {
  id: string;
  title: string;
  color: string;
  textColor: string;
};

export type PriorityType = {
  [key: string]: ValueType;
};
export type StatusesType = {
  [key: string]: ValueType;
};

export type UserType = {
  _id: string;
  username: string;
  email: string;
  org: string;
  picture: string;
  boards: BoardType[];
};
export type ChatType = {
  _id: string;
  pulseId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserType;
  thread: ChatType[];
  seenBy: UserType[];
  content: string;
  draft: string;
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
  statuses: StatusesType;
  priority: PriorityType;
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

type AuthStoreType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserType;
  fetchUser: (id: any, cb?: (e: UserType) => any) => void;
  notAuthenticated: () => void;
  addNewBoard: (board: BoardType) => void;
  updateBoardState: (board: BoardType) => void;
};

const emptyUser: UserType = {
  _id: "",
  email: "",
  username: "",
  boards: [],
  org: "",
  picture: "",
};

export const useAuth = create<AuthStoreType>((setState) => ({
  isAuthenticated: false,
  isLoading: true,
  user: emptyUser,

  addNewBoard: (board) => {
    setState((ps) => {
      return {
        ...ps,
        user: {
          ...ps.user,
          boards: [...ps.user.boards, board],
        },
      };
    });
  },
  updateBoardState: (board) => {
    setState((ps) => {
      const updatedBoardsList = [...ps.user.boards].map((b) => {
        if (b._id === board._id) return board;
        else return b;
      });

      return {
        ...ps,
        user: {
          ...ps.user,
          boards: updatedBoardsList,
        },
      };
    });
  },
  fetchUser: async (id = "", cb) => {
    await getUser(id || "").then((user) => {
      const userObj = { ...user, org: user.org ? user.org : user.username };
      setState((ps) => ({
        user: { ...ps.user, ...userObj },
        isLoading: false,
        isAuthenticated: true,
      }));
      cb?.(userObj);
    });
  },

  notAuthenticated: () => {
    deleteToken();
    setState((ps) => ({
      user: emptyUser,
      isLoading: false,
      isAuthenticated: false,
    }));
  },
}));
