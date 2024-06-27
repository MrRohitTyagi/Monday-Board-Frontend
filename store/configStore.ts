import {
  getConfig,
  updateConfig,
  updateConfigDeep,
} from "@/gateways/config-gateway";
import { ConfigStoreType } from "@/types/configTypes";
import { isEmpty } from "lodash";
import { create } from "zustand";

function tempBoardFilter() {
  return {
    search: "",
    priority: "",
    status: "",
    user: "",
  };
}

export const useConfig = create<ConfigStoreType>((setState, getState) => {
  return {
    _id: "",
    belongsTo: "",
    staredBoards: [],
    likedChats: [],
    likedThreads: [],
    filters: {},
    // search: "",
    // priority: "",
    // status: "",
    // user: "",

    setUser: (user_id, boardID) => {
      setState((ps) => {
        const upDatedPS = { ...ps };
        if (isEmpty(ps.filters[boardID])) {
          ps.filters[boardID] = tempBoardFilter();
        }
        ps.filters[boardID].user = user_id;
        return upDatedPS;
      });
      const { _id } = getState();
      updateConfigDeep({ boardID: boardID, user: user_id, _id });
    },

    setPriority: (priority_id, boardID) => {
      setState((ps) => {
        const upDatedPS = { ...ps };
        if (isEmpty(ps.filters[boardID])) {
          ps.filters[boardID] = tempBoardFilter();
        }
        ps.filters[boardID].priority = priority_id;
        return upDatedPS;
      });
      const { _id } = getState();
      updateConfigDeep({ boardID: boardID, priority: priority_id, _id });
    },

    setStatus: (status_id, boardID) => {
      setState((ps) => {
        const upDatedPS = { ...ps };
        if (isEmpty(ps.filters[boardID])) {
          ps.filters[boardID] = tempBoardFilter();
        }
        ps.filters[boardID].status = status_id;
        return upDatedPS;
      });
      const { _id } = getState();
      updateConfigDeep({ boardID: boardID, status: status_id, _id });
    },

    setSearch: (val, boardID) => {
      setState((ps) => {
        const upDatedPS = { ...ps };
        if (isEmpty(ps.filters[boardID])) {
          ps.filters[boardID] = tempBoardFilter();
        }
        ps.filters[boardID].search = val;
        return upDatedPS;
      });

      const { _id } = getState();
      updateConfigDeep({ boardID: boardID, search: val, _id });
    },

    getConfig: async () => {
      const config = await getConfig();
      setState((ps) => ({ ...ps, ...config }));
    },
    starBoard: (boardID) => {
      setState((pc) => {
        const boards = [...pc.staredBoards, boardID];
        const { _id } = getState();
        updateConfig({ staredBoards: boards, _id });
        return { ...pc, staredBoards: boards };
      });
    },
    unstarBoard: (boardID) => {
      setState((pc) => {
        const boards = pc.staredBoards.filter((b) => b !== boardID);
        const { _id } = getState();
        updateConfig({ staredBoards: boards, _id });
        return { ...pc, staredBoards: boards };
      });
    },

    likeChat: (chat_id) => {
      setState((pc) => {
        const chats = [...pc.likedChats, chat_id];
        const { _id } = getState();
        updateConfig({ likedChats: chats, _id });
        return { ...pc, likedChats: chats };
      });
    },

    unlikeChat: (chat_id) => {
      setState((pc) => {
        const chats = pc.likedChats.filter((c) => c !== chat_id);
        const { _id } = getState();
        updateConfig({ likedChats: chats, _id });
        return { ...pc, likedChats: chats };
      });
    },

    likeThread: (thread_id) => {
      setState((pc) => {
        const threads = [...pc.likedThreads, thread_id];
        const { _id } = getState();
        updateConfig({ likedThreads: threads, _id });
        return { ...pc, likedThreads: threads };
      });
    },

    unlikeThread: (thread_id) => {
      setState((pc) => {
        const threads = pc.likedThreads.filter((t) => t !== thread_id);
        const { _id } = getState();
        updateConfig({ likedThreads: threads, _id });
        return { ...pc, likedThreads: threads };
      });
    },
    //
  };
});
