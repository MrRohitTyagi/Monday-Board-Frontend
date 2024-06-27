import { getConfig, updateConfig } from "@/gateways/config-gateway";
import { ConfigStoreType } from "@/types/configTypes";
import { create } from "zustand";

export const useConfig = create<ConfigStoreType>((setState, getState) => {
  return {
    _id: "",
    belongsTo: "",
    staredBoards: [],
    likedChats: [],
    likedThreads: [],
    search: "",
    priority: "",
    status: "",
    user: "",

    setUser: (e) => {
      setState((ps) => ({ ...ps, user: e }));
      const { _id } = getState();
      updateConfig({ user: e, _id });
    },

    setPriority: (e) => {
      setState((ps) => ({ ...ps, priority: e }));
      const { _id } = getState();
      updateConfig({ priority: e, _id });
    },

    setStatus: (e) => {
      const { _id } = getState();
      updateConfig({ status: e, _id });
      setState((ps) => ({ ...ps, status: e }));
    },

    setSearch: (val) => {
      const { _id } = getState();
      updateConfig({ search: val, _id });
      setState((ps) => ({ ...ps, search: val }));
    },

    getConfig: async () => {
      const config = await getConfig();
      setState((ps) => ({ ...ps, ...config }));
    },
    starBoard: (board_id) => {
      setState((pc) => {
        const boards = [...pc.staredBoards, board_id];
        const { _id } = getState();
        updateConfig({ staredBoards: boards, _id });
        return { ...pc, staredBoards: boards };
      });
    },
    unstarBoard: (board_id) => {
      setState((pc) => {
        const boards = pc.staredBoards.filter((b) => b !== board_id);
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
