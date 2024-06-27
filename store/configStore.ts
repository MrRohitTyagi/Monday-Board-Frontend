import { getConfig, updateConfig } from "@/gateways/config-gateway";
import { ConfigStoreType } from "@/types/configTypes";
import { create } from "zustand";

export const useConfig = create<ConfigStoreType>((setState, getState) => {
  return {
    belongsTo: "",
    staredBoards: [],
    likedChats: [],
    likedThreads: [],
    _id: "",
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
