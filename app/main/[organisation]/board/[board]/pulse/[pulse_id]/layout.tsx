"use client";

import ResizableSplit from "@/components/core/ResizableSplit";
import React, { memo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChildrenType } from "@/types";
import { cn } from "@/lib/utils";
import { PulseChatContext } from "@/hooks/usePulseChat";
import Loader from "@/components/core/Loader";

type layoutProps = {
  params: { pulse_id: string };
} & ChildrenType;

const transitionStates = {
  OPEN: "OPEN",
  CLOSING: "CLOSING",
};

const layout = ({ params, children }: layoutProps) => {
  const router = useRouter();
  const [openState, setOpenState] = useState(transitionStates.OPEN);

  const handleLayerClose = () => {
    setOpenState(transitionStates.CLOSING);
    const id = setTimeout(() => {
      router.back();
      clearTimeout(id);
    }, 300);
  };

  const isClosing = openState === transitionStates.CLOSING;

  return (
    <PulseChatContext.Provider
      value={{
        handleLayerClose,
      }}
    >
      <div
        className={cn(
          "transition-all",
          "fixed right-0 top-0 bottom-0 ",
          isClosing && "animate-pulse-layer-close overflow-hidden",
          openState === transitionStates.OPEN && "animate-pulse-layer"
        )}
      >
        <ResizableSplit
          closed={isClosing}
          childMode={true}
          id={params.pulse_id}
          onLeftPannelClick={handleLayerClose}
        >
          {isClosing ? (
            <div className="bg-main-fg flex flex-row items-center justify-center h-full w-full">
              <Loader />
            </div>
          ) : (
            children
          )}
        </ResizableSplit>
      </div>
    </PulseChatContext.Provider>
  );
};

export default memo(layout);
