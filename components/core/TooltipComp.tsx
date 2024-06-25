import React, { memo } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

type TooltipCompProps = {
  children: React.ReactNode | string;
  title: React.ReactNode | string;
  className?: string;
  open?: boolean;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  align?: "center" | "start" | "end" | undefined;
  delayDuration?: number;
};

const TooltipComp = ({
  children,
  title,
  side,
  align,
  className,
  open,
  delayDuration = 100,
}: TooltipCompProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} delayDuration={delayDuration}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            align={align}
            side={side}
            className={cn(
              "TooltipContent z-99999 animate",
              "bg-main-fg overflow-hidden",
              "text-white border-main-bg border-[1px]",
              "rounded-lg transition-all",
              className
            )}
            sideOffset={5}
          >
            {title}

            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default memo(TooltipComp);
