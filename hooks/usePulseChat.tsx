import { PulseType } from "@/zstore";
import { createContext, useContext } from "react";

type PulseChatContenxtProps = {
  openPulseChatLayer: (e: PulseType) => void;
  closePulseChatLayer: () => void;
};

const PulseChatContext = createContext<PulseChatContenxtProps>(
  {} as PulseChatContenxtProps
);

const usePulseChat = () => {
  const data = useContext(PulseChatContext);
  return data;
};

export { PulseChatContext };
export default usePulseChat;
