import React, { memo, useContext, useMemo, useState } from "react";

import PopoverComp from "@/components/core/PopoverComp";

import { cn } from "@/lib/utils";
import { PulseContext, baseCssMiniItems } from "../Pulse";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BoardType } from "@/types/boardTypes";
import { PulseType } from "@/types/pulseTypes";

type PriorityProps = {
  board: BoardType;
  pulse: PulseType;
};

const Status = ({ board, pulse }: PriorityProps) => {
  const [open, setOpen] = useState(false);
  const { updateStatus } = useContext(PulseContext);

  const statuses = useMemo(() => Object.values(board.statuses || {}), [board]);

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
        <div className="flex flex-col gap-2">
          {statuses.map((s, i) => {
            return (
              <Button
                variant="ghost"
                onClick={() => {
                  updateStatus(s.id);
                  setOpen(false);
                }}
                key={s.id + i}
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

          <div className="divider m-0" />

          <Button className="flex w-full flex-row items-center gap-2 border-2 border-main-bg ">
            <Plus size={20} />
            <h1>Create New</h1>
          </Button>
        </div>
      }
    />
  );
};

export default memo(Status);
