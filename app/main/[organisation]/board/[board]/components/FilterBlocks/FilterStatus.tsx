"use client";

import React, { memo, useMemo, useState } from "react";
import PopoverComp from "@/components/core/PopoverComp";
import { Button } from "@/components/ui/button";
import useBoardContext from "@/hooks/useBoardContext";
import { cn } from "@/lib/utils";
import { useConfig } from "@/store/configStore";
import { baseCssMiniItems } from "../Pulse";
import TooltipComp from "@/components/core/TooltipComp";

type FilterStatusProps = {};

const FilterStatus = (props: FilterStatusProps) => {
  const [open, setOpen] = useState(false);
  const { status: selectedStatus, setStatus } = useConfig();
  const { board } = useBoardContext();

  const statuses = useMemo(
    () => Object.values(board.statuses || {}),
    [board.statuses]
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
        content: "w-44 bg-main-fg p-4 shadow-lg shadow-foreground",
      }}
      trigger={
        // <TooltipComp
        //   title="Filter by status"
        //   className="px-3 py-2 border-2 border-highlighter-dark"
        // >
        <Button
          variant={"ghost"}
          onClick={(e) => {
            setOpen(true);
          }}
          className={cn(
            baseCssMiniItems(),
            "statuses border-r-0 border-2 border-highlighter-dark",
            "rounded-sm"
          )}
          style={{
            background: board?.statuses?.[selectedStatus]?.color,
            color: board?.statuses?.[selectedStatus]?.textColor,
          }}
        >
          <h1>{board?.statuses?.[selectedStatus]?.title || "Status"}</h1>
        </Button>
        // </TooltipComp>
      }
      content={
        <div className="flex flex-col gap-2">
          {statuses.map((p, i) => {
            return (
              <Button
                onClick={() => {
                  setStatus(p.id);
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
              setStatus("");
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

export default memo(FilterStatus);
