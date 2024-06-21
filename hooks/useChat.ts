import { createChat, deleteChat, updateChat } from "@/gateways/chat-gateway";
import { ChatType } from "@/zstore";
import { useCallback, useRef } from "react";

type UseChatProps = {
  chat_id?: string;
};

type UseChatreturnType = {
  updateChatContent: (e: string) => Promise<any>;
  updateChatDraft: (e: string) => Promise<any>;
  deleteSingleChat: (e: string) => Promise<any>;
  createNewChat: (
    payload: any,
    loading?: (e: boolean) => void
  ) => Promise<ChatType>;
};

const useChat = ({ chat_id }: UseChatProps): UseChatreturnType => {
  const debounceRef = useRef<any>(null);

  const debounceWrapper = useCallback((cb: (e: any) => void, payload: any) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      cb(payload);
    }, 500);
  }, []);

  const updateChatContent = useCallback(
    async (content: string) => {
      const payload = {
        _id: chat_id,
        centent: content,
        draft: "",
      };
      await updateChat(payload);
    },
    [chat_id]
  );

  const createNewChat = useCallback(
    async (payload: any, loading?: (e: boolean) => void) => {
      if (loading) loading(true);
      const newChat = await createChat(payload);
      if (loading) loading(false);
      return newChat;
    },
    [chat_id]
  );

  const updateChatDraft = useCallback(
    async (draft: string) => {
      const payload = { _id: chat_id, draft: draft };
      debounceWrapper(updateChat, payload);
    },
    [chat_id]
  );

  const deleteSingleChat = useCallback(
    async (single_chat_id: string) => {
      await deleteChat(single_chat_id);
    },
    [chat_id]
  );

  return {
    createNewChat,
    updateChatContent,
    updateChatDraft,
    deleteSingleChat,
  };
};

export default useChat;
