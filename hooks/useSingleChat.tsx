import { ChatType } from "@/types/chatTypes";
import React, { createContext, useContext, useMemo } from "react";

type SingleChatContextType = { chat: ChatType; isEditing: boolean };

const SingleChatContext = createContext<SingleChatContextType>(
  {} as SingleChatContextType
);

const useSingleChat = () => {
  const data = useContext(SingleChatContext);
  return useMemo(() => data, [data]);
};

export { SingleChatContext };
export default useSingleChat;
