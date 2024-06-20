import React, { createContext, useContext } from "react";
import { boolean } from "zod";

const PulseChatContext = createContext({
  handleLayerClose: (e?: any) => {},
});

type PulseChatTypes = { handleLayerClose: () => void };

const usePulseChat = () => {
  const data = useContext<PulseChatTypes>(PulseChatContext);
  return data;
};
export { PulseChatContext };
export default usePulseChat;
