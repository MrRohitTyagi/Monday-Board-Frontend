import PopoverComp from "@/components/core/PopoverComp";
import { BoardType, PulseType } from "@/zstore";
import React, { useContext, useState } from "react";
import { PulseContext, baseCssMiniItems } from "../Pulse";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
type PriorityProps = {
  board: BoardType;
  pulse: PulseType;
};

const Priority = ({ board, pulse }: PriorityProps) => {
  const [open, setOpen] = useState(false);
  const { updatePriority } = useContext(PulseContext);

  return (
    <PopoverComp
      controlled={true}
      open={open}
      close={(e) => {
        setOpen(e);
      }}
      classNames={{
        trigger: "h-full",
        content: "w-44 bg-transparent p-4 shadow-lg shadow-foreground",
      }}
      trigger={
        <div
          style={{ background: board?.priority?.[pulse?.priority]?.color }}
          className={cn(baseCssMiniItems(), "priority", "hover:opacity-60")}
        >
          {board?.priority?.[pulse?.priority]?.title || "NA"}
        </div>
      }
      content={
        <>
          {Object.entries(board.priority || {}).map(([key, p], i) => {
            return (
              <Button
                onClick={() => {
                  updatePriority(key);
                  setOpen(false);
                }}
                variant={"ghost"}
                key={p.title + i}
                style={{ background: p.color }}
                className={cn(
                  "w-full h-10 text-center flex items-center justify-center mt-2",
                  "cursor-pointer",
                  "hover:opacity-60"
                )}
              >
                {p.title}
              </Button>
            );
          })}
        </>
      }
    />
  );
};

export default Priority;
