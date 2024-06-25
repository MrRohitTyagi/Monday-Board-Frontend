"use client";

import TooltipComp from "@/components/core/TooltipComp";
import { cn } from "@/lib/utils";
import { ChatType } from "@/types/chatTypes";
import { timeBetween } from "@/utils/helperFunctions";
import { Timer } from "lucide-react";
import React, { memo, useEffect, useMemo, useState } from "react";

type ChatInfoProps = {
  chat: ChatType;
};

const ChatInfo = ({ chat }: ChatInfoProps) => {
  const [reRender, setreRender] = useState(Math.random());

  useEffect(() => {
    function calc() {
      setreRender(Math.random() * 1000);
    }

    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const { userFriendlyDate, displayText } = useMemo(() => {
    return timeBetween(chat.createdAt);
  }, [chat.createdAt, reRender]);

  return (
    <TooltipComp
      className={cn(
        "border-[1px] border-highlighter",
        "shadow-black shadow-lg"
      )}
      title={
        <div className="p-2 px-4 text-sm">{userFriendlyDate}</div>
      }
    >
      <div className="flex flex-row gap-2 items-center cursor-pointer">
        <Timer size={15} className="stroke-text-color" />
        <h1 className="text-sm hover:underline">{displayText}</h1>
      </div>
    </TooltipComp>
  );
};

export default memo(ChatInfo);
