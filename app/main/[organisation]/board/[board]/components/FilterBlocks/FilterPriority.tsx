"use client";

import React, { memo, useMemo, useState } from "react";
import PopoverComp from "@/components/core/PopoverComp";
import { Button } from "@/components/ui/button";
import useBoardContext from "@/hooks/useBoardContext";
import { cn } from "@/lib/utils";
import { useConfig } from "@/store/configStore";
import { baseCssMiniItems } from "../Pulse";
import TooltipComp from "@/components/core/TooltipComp";

type FilterPriorityProps = {};

const FilterPriority = (props: FilterPriorityProps) => {
  const [open, setOpen] = useState(false);
  const { priority: selectedPriority, setPriority } = useConfig();
  const { board } = useBoardContext();

  const priority = useMemo(
    () => Object.values(board.priority || {}),
    [board.priority]
  );

  return (
    <PopoverComp
      controlled={true}
      open={open}
      close={(e) => {
        setOpen(e);
      }}
      classNames={{
        trigger: "h-full",
        content:
          "w-44 bg-main-fg p-4 shadow-lg shadow-black border-2 border-highlighter-dark",
      }}
      trigger={
        <Button
          variant={"ghost"}
          onClick={(e) => {
            setOpen(true);
          }}
          className={cn(
            baseCssMiniItems(),
            "priority border-r-0 border-2 border-highlighter-dark",
            "rounded-sm"
          )}
          style={{
            background: board?.priority?.[selectedPriority]?.color,
            color: board?.priority?.[selectedPriority]?.textColor,
          }}
        >
          <h1>{board?.priority?.[selectedPriority]?.title || "Priority"}</h1>
        </Button>
      }
      content={
        <div className="flex flex-col gap-2">
          {priority.map((p, i) => {
            return (
              <Button
                onClick={() => {
                  setPriority(p.id);
                  setOpen(false);
                }}
                variant="ghost"
                key={p.title + i}
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
          <Button
            onClick={() => {
              setPriority("");
              setOpen(false);
            }}
            variant="ghost"
            key={"temp"}
            className={cn(
              "w-full h-10 text-center flex items-center justify-center",
              "cursor-pointer border-2 border-highlighter-dark"
            )}
          >
            <h1>Clear Filter</h1>
          </Button>
        </div>
      }
    />
  );
};

export default memo(FilterPriority);
