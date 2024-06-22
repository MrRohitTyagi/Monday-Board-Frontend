"use client";

import React, { memo } from "react";

import PopoverComp from "@/components/core/PopoverComp";
import { Button } from "@/components/ui/button";
import { Copy, Settings2, X } from "lucide-react";
import Divider from "@/components/core/Divider";
import { cn } from "@/lib/utils";
import usePulseChat from "@/hooks/usePulseChat";
import { PulseType } from "@/types/pulseTypes";
import { StateSetter } from "@/types/genericTypes";

type HeaderProps = {
  pulse: PulseType;
  setPulse: StateSetter<PulseType>;
};
const Header = ({ pulse }: HeaderProps) => {
  const { handleLayerClose } = usePulseChat();
  return (
    <div
      className={cn(
        "animate-chat-cont-heading",
        "flex flex-col shrink-0 animate-fadeIn"
      )}
    >
      <div
        className={cn(
          "header flex flex-row justify-between items-start px-4 pt-3"
        )}
      >
        <h1 className={cn("", "text-md overflow-hidden text-ellipsis mt-1")}>
          {pulse.title}
        </h1>
        {/* // settings  */}
        <div className="pulse-chat-action-items flex flex-row">
          <PopoverComp
            additional={{ content: { align: "end" } }}
            classNames={{ content: "bg-main-bg w-fit p-2" }}
            content={
              <>
                <Button
                  variant={"ghost"}
                  className="flex flex-row items-center gap-3"
                >
                  <Copy />
                  <h1>Copt item link</h1>
                </Button>
              </>
            }
            trigger={
              <Button variant={"ghost"} className="py-0 px-2">
                <Settings2 />
              </Button>
            }
          />
          {/* CLOSE BUTTON */}
          <Button
            variant={"ghost"}
            onClick={handleLayerClose}
            className="py-0 px-2"
          >
            <X />
          </Button>
        </div>
      </div>
      <Divider className="h-2" />
    </div>
  );
};

export default memo(Header);
