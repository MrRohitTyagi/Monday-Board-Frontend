import { PulseType } from "@/zstore";
import React from "react";

import ResizableSplit from "@/components/core/ResizableSplit";

type PulseChatProps = {
  pulse: PulseType;
};
const PulseChat = ({ pulse }: PulseChatProps) => {
  console.log(`%c pulse `, "color: aqua;border:2px solid darkorange", pulse);
  return (
    <div className="absolute right-0 top-0 left-0 bottom-0">
      <ResizableSplit>
        <div className="w-full h-full bg-main-fg">hello</div>
      </ResizableSplit>
    </div>
  );
};

export default PulseChat;
