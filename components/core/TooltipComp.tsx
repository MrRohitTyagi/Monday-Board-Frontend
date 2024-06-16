import React, { memo } from "react";

import { cn } from "@/lib/utils";
import * as Tooltip from "@radix-ui/react-tooltip";

type TooltipCompProps = {
  children: React.ReactNode | string;
  title: React.ReactNode | string;
};

const TooltipComp = ({ children, title }: TooltipCompProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={100}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={cn(
              "TooltipContent z-50",
              "bg-main-fg overflow-hidden",
              "text-white border-main-light border-[1px]",
              "p-2 rounded-lg transition-all"
            )}
            sideOffset={5}
          >
            {title}
            <Tooltip.Arrow className="TooltipArrow bg-main-light" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default memo(TooltipComp);
