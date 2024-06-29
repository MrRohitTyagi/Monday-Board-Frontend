"use client";

import ResizableSplit from "@/components/core/ResizableSplit";
import React, { memo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { PulseChatContext } from "@/hooks/usePulseChat";
import Loader from "@/components/core/Loader";
import { ChildrenType } from "@/types/genericTypes";

type layoutProps = {} & ChildrenType;

const transitionStates = {
  OPEN: "OPEN",
  CLOSING: "CLOSING",
};

const layout = ({ children }: layoutProps) => {
  const [openState, setOpenState] = useState(transitionStates.OPEN);
  const router = useRouter();
  const params = useParams<{ pulse_id: string; board: string }>();

  const handleLayerClose = () => {
    setOpenState(transitionStates.CLOSING);
    const id = setTimeout(() => {
      router.push(`/main/board/${params?.board}`);
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
          "fixed right-0 top-[var(--navbar-height)] bottom-0 z-[4]",
          isClosing && "animate-pulse-layer-close overflow-hidden",
          openState === transitionStates.OPEN && "animate-pulse-layer"
        )}
      >
        {/* <Suspense fallback='Loading'> */}
        <ResizableSplit
          closed={isClosing}
          childMode={true}
          id={params?.pulse_id}
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
        {/* </Suspense> */}
      </div>
    </PulseChatContext.Provider>
  );
};

export default memo(layout);
