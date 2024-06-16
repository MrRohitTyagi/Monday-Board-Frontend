import React, { memo, useContext, useState } from "react";

import PopoverComp from "@/components/core/PopoverComp";
import { BoardType, PulseType } from "@/zstore";

import { cn } from "@/lib/utils";
import { PulseContext, baseCssMiniItems } from "../Pulse";
import { Button } from "@/components/ui/button";

type PriorityProps = {
  board: BoardType;
  pulse: PulseType;
};

const Status = ({ board, pulse }: PriorityProps) => {
  const [open, setOpen] = useState(false);
  const { updateStatus } = useContext(PulseContext);

  return (
    <PopoverComp
      controlled={true}
      open={open}
      close={(e) => {
        setOpen(e);
      }}
      classNames={{
        trigger: "h-full",
        content: "w-44 bg-main-fg p-4 shadow-lg shadow-foreground",
      }}
      trigger={
        <h1
          style={{
            background: board?.statuses?.[pulse?.status]?.color,
            color: board?.statuses?.[pulse?.status]?.textColor,
          }}
          className={cn(baseCssMiniItems(), "statuses", "hover:opacity-60")}
        >
          {board.statuses?.[pulse?.status]?.title}
        </h1>
      }
      content={
        <>
          {Object.entries(board.statuses || {}).map(([key, s], i) => {
            return (
              <Button
                variant={"ghost"}
                onClick={() => {
                  updateStatus(key);
                  setOpen(false);
                }}
                key={s.title + i}
                style={{ background: s.color, color: s.textColor }}
                className={cn(
                  "w-full h-10 text-center flex items-center justify-center mt-2",
                  "cursor-pointer",
                  "hover:opacity-60"
                )}
              >
                {s.title}
              </Button>
            );
          })}
        </>
      }
    />
  );
};

export default memo(Status);
