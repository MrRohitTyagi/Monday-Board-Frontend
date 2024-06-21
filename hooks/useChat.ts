import { createChat, deleteChat, updateChat } from "@/gateways/chat-gateway";
import { ChatType } from "@/zstore";
import { useCallback, useRef } from "react";

type UseChatreturnType = {
  updateChatContent: (e: string, _id: string) => Promise<any>;
  updateChatDraft: (e: string, _id: string) => Promise<any>;
  deleteSingleChat: (e: string) => Promise<any>;
  createNewChat: (
    payload: any,
    loading?: (e: boolean) => void
  ) => Promise<ChatType>;
};

const useChat = (): UseChatreturnType => {
  const debounceRef = useRef<any>(null);

  const debounceWrapper = useCallback((cb: (e: any) => void, payload: any) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      cb(payload);
    }, 500);
  }, []);

  const updateChatContent = useCallback(
    async (content: string, _id: string) => {
      const payload = {
        _id: _id,
        content: content,
        draft: "",
      };
      await updateChat(payload);
    },
    []
  );

  const createNewChat = useCallback(
    async (payload: any, loading?: (e: boolean) => void) => {
      if (loading) loading(true);
      const newChat = await createChat(payload);
      if (loading) loading(false);
      return newChat;
    },
    []
  );

  const updateChatDraft = useCallback(async (draft: string, _id: string) => {
    const payload = { _id: _id, draft: draft };
    debounceWrapper(updateChat, payload);
  }, []);

  const deleteSingleChat = useCallback(async (single_chat_id: string) => {
    await deleteChat(single_chat_id);
  }, []);

  return {
    createNewChat,
    updateChatContent,
    updateChatDraft,
    deleteSingleChat,
  };
};

export default useChat;
