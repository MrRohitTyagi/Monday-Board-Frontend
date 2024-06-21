import { updateChat } from "@/gateways/chat-gateway";
import { StateSetter } from "@/types";
import { ChatType } from "@/zstore";
import { useCallback, useRef } from "react";
type UseChatProps = {
  chat_id: string;
  setchat: StateSetter<ChatType>;
  setIsEditing: StateSetter<boolean>;
};
type UseChatreturnType = {
  updateChatContent: (e: string) => void;
  updateChatDraft: (e: string) => void;
};

const useChat = ({
  chat_id,
  setchat,
  setIsEditing,
}: UseChatProps): UseChatreturnType => {
  const debounceRef = useRef<any>(null);

  const debounceWrapper = useCallback((cb: (e: any) => void, payload: any) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      cb(payload);
    }, 500);
  }, []);

  const updateChatContent = useCallback(
    (content: string) => {
      const payload = {
        _id: chat_id,
        centent: content,
        draft: "",
      };
      updateChat(payload);
      setchat((ps) => ({ ...ps, ...payload }));
      setIsEditing(false);
    },
    [chat_id]
  );

  const updateChatDraft = useCallback(
    (draft: string) => {
      setchat((p) => ({ ...p, content: draft, draft: draft }));
      const payload = { _id: chat_id, draft: draft };
      debounceWrapper(updateChat, payload);
    },
    [chat_id]
  );

  return {
    //
    updateChatContent,
    updateChatDraft,
  };
};

export default useChat;
