import PopoverComp from "@/components/core/PopoverComp";
import React, { memo, useContext, useMemo, useState } from "react";
import { PulseContext, baseCssMiniItems } from "../Pulse";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BoardType } from "@/types/boardTypes";
import { PulseType } from "@/types/pulseTypes";
type PriorityProps = {
  board: BoardType;
  pulse: PulseType;
};

const Priority = ({ board, pulse }: PriorityProps) => {
  const [open, setOpen] = useState(false);
  const { updatePriority } = useContext(PulseContext);

  const priority = useMemo(() => Object.values(board.priority || {}), [board]);

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
            background: board?.priority?.[pulse?.priority]?.color,
            color: board?.priority?.[pulse?.priority]?.textColor,
          }}
          className={cn(baseCssMiniItems(), "priority")}
        >
          {board?.priority?.[pulse?.priority]?.title || ""}
        </h1>
      }
      content={
        <div className="flex flex-col gap-2">
          {priority.map((p, i) => {
            return (
              <Button
                onClick={() => {
                  updatePriority(p.id);
                  setOpen(false);
                }}
                variant="ghost"
                key={p.title}
                style={{ background: p.color, color: p.textColor }}
                className={cn(
                  "w-full h-10 text-center flex items-center justify-center",
                  "cursor-pointer"
                )}
              >
                {p.title}
              </Button>
            );
          })}

          <div className="divider m-0" />

          <Button
            disabled
            className="flex w-full flex-row items-center gap-2 border-2 border-main-bg "
          >
            {/* /TODO */}
            <Plus size={20} />
            <h1>Create New</h1>
          </Button>
        </div>
      }
    />
  );
};

export default memo(Priority);
