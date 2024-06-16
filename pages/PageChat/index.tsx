import { PulseType } from "@/zstore";
import React, { memo } from "react";

import ResizableSplit from "@/components/core/ResizableSplit";

type PulseChatProps = {
  pulse: PulseType;
};
const PulseChat = ({ pulse }: PulseChatProps) => {
  return (
    <div className="absolute right-0 top-0 left-0 bottom-0">
      <ResizableSplit
        leftPannel={
          <div
            className="resizable-left-side h-full w-full bg-black 
            opacity-50 pointer-events-none"
          />
        }
        rightPannel={<div className="w-full h-full bg-main-fg">hello</div>}
      />
    </div>
  );
};

export default memo(PulseChat);
