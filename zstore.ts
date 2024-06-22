import { create } from "zustand";
import { getUser } from "./gateways/user-gateway";
import { deleteToken } from "./utils/cookie";

import { UserType } from "./types/userTypes";
import { BoardType } from "./types/boardTypes";

type SideMenuStoreType = {
  isCollapsed: boolean;
  toggleSideMenu: (c: any) => void;
};

type AuthStoreType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserType;
  fetchUser: (id: any, cb?: (e: UserType) => any) => void;
  notAuthenticated: () => void;
  addNewBoard: (board: BoardType) => void;
  updateBoardState: (board: BoardType) => void;
};

export const useSideMenu = create<SideMenuStoreType>((setState) => ({
  isCollapsed: false,
  toggleSideMenu: (c: any) => {
    setState(({ isCollapsed }) => ({
      isCollapsed: typeof c == "boolean" ? c : !isCollapsed,
    }));
  },
}));

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
