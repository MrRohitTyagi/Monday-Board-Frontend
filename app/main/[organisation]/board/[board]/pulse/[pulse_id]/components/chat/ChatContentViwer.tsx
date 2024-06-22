"use client";

import Textrenderer from "@/components/core/Textrenderer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChatType } from "@/types/chatTypes";
import React, { Fragment, memo, useEffect, useMemo, useState } from "react";

type ChatContentViwerProps = {
  chat: ChatType;
};
const ChatContentViwer = ({ chat }: ChatContentViwerProps) => {
  const isLong = useMemo(() => {
    return chat.content.split(" ").length > 120;
  }, [chat.content]);

  const [viewFull, setViewFull] = useState(!isLong);

  useEffect(() => {
    setViewFull(!isLong);
  }, [isLong]);

  return (
    <div className="relative animate-fadeIn">
      <div
        className={cn(
          viewFull === false && "mask-bottom-blur",
          "chat-content-viewer",
          "transition-all duration-500",
          viewFull === false ? "h-60" : "h-fit",
          viewFull == false && "overflow-hidden"
        )}
      >
        <Textrenderer str={chat.content} />
      </div>
      {viewFull === false && (
        <Button
          onClick={() => setViewFull(true)}
          variant={"ghost"}
          className={cn(
            "animate-in duration-300",
            "absolute bottom-2 left-1/2 -translate-x-1/2",
            "text-[#05e4ee] border-2 border-main-light"
          )}
        >
          View Full Content
        </Button>
      )}
    </div>
  );
};

export default ChatContentViwer;
