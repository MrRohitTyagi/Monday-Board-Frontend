"use client";

import Divider from "@/components/core/Divider";
import LowOpacityText from "@/components/core/LowOpacityText";
import TooltipComp from "@/components/core/TooltipComp";
import { cn } from "@/lib/utils";
import { ThreadType } from "@/types/threadType";
import { areDatesEqual, timeBetween } from "@/utils/helperFunctions";
import { Clock, Timer } from "lucide-react";
import React, { memo, useEffect, useMemo, useState } from "react";

type ThreadInfoProps = {
  thread: ThreadType;
};

const ThreadInfo = ({ thread }: ThreadInfoProps) => {
  const [reRender, setreRender] = useState(Math.random());

  useEffect(() => {
    function calc() {
      setreRender(Math.random() * 1000);
    }

    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const isEdited = useMemo(
    () => !areDatesEqual(thread.createdAt, thread.updatedAt),
    [thread.createdAt, thread.updatedAt]
  );

  const { userFriendlyDate, displayText } = useMemo(() => {
    return timeBetween(thread.createdAt);
  }, [thread.createdAt, reRender]);

  return (
    <div className="flex flex-row items-center justify-start h-4 gap-3">
      <TooltipComp
        className={cn(
          "border-[1px] border-highlighter",
          "shadow-black shadow-lg"
        )}
        title={
          <div className="p-2 px-4 text-sm opacity-90">{userFriendlyDate}</div>
        }
      >
        <LowOpacityText className="text-xs flex flex-row items-center justify-start gap-1 hover:underline cursor-pointer">
          <Timer size={14} className="stroke-highlighter" />
          {displayText}
        </LowOpacityText>
      </TooltipComp>

      {isEdited && <Divider horizontal />}
      <LowOpacityText>{isEdited ? "Edited" : ""}</LowOpacityText>
    </div>
  );
};

export default memo(ThreadInfo);
