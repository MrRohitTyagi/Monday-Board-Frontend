import { ChatType } from "@/types/chatTypes";
import { StateSetter } from "@/types/genericTypes";
import React, { createContext, useContext, useMemo } from "react";

type SingleChatContextType = {
  chat: ChatType;
  isEditing: boolean;
  openNewChatBox: boolean;
  setOpenNewChatBox: StateSetter<boolean>;
  updateThreadCount: (s: "ADD" | "SUB") => void;
};

const SingleChatContext = createContext<SingleChatContextType>(
  {} as SingleChatContextType
);

const useSingleChat = () => {
  const data = useContext(SingleChatContext);
  return useMemo(() => data, [data]);
};

export { SingleChatContext };
export default useSingleChat;
