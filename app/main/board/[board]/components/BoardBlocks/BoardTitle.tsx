"use client";

import React, { memo, useState } from "react";
import { startCase } from "lodash";
import { ChevronDown, Edit, Fullscreen } from "lucide-react";
import { cn } from "@/lib/utils";
import AvatarGroup from "@/components/core/AvatarGroup";
import PopoverComp from "@/components/core/PopoverComp";
import Space from "@/components/core/Space";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TooltipComp from "@/components/core/TooltipComp";
import { BoardType } from "@/types/boardTypes";
import { timeBetween } from "@/utils/helperFunctions";

type BoardTitleProps = {
  board: BoardType;
};

const BoardTitle = ({ board }: BoardTitleProps) => {
  const router = useRouter();
  const { userFriendlyDate } = timeBetween(board.createdAt);
  const [open, setopen] = useState(false);

  return (
    <PopoverComp
      close={(e) => {
        setopen(e);
      }}
      controlled={true}
      open={open}
      additional={{ content: { align: "start" } }}
      classNames={{
        content:
          "bg-main-bg border-[#696767] p-2 pl-4 pr-4 shadow-lg shadow-foreground",
      }}
      content={
        <>
          <div className="flex felx-row items-center justify-between">
            <h2>Board Info</h2>
            <Button
              className="p-0 m-0"
              variant={"ghost"}
              onClick={() => router.push("/main/board-settings/" + board._id)}
            >
              <TooltipComp
                title="Edit board"
                side="right"
                className="px-3 py-2"
              >
                <Edit size={15} color="white" />
              </TooltipComp>
            </Button>
          </div>
          <Space />
          <h1 className="text-xs opacity-80">{board.description}</h1>
          <div className="divider m-0"></div>

          {/* // Admins */}
          <div className="flex items-center flex-row gap-4 mt-3">
            <h4 className="text-sm w-20 text-nowrap opacity-80">Admins</h4>
            <AvatarGroup users={board.admins} />
          </div>

          {/* // members */}
          <div className="flex items-center flex-row gap-4 mt-3">
            <h4 className="text-sm w-20 text-nowrap opacity-80">Members</h4>
            <AvatarGroup users={board.members} />
          </div>
          <div className="h-2"></div>

          {/* Created On */}
          <div className="flex items-center flex-row gap-4 overflow-hidden mt-3">
            <h4 className="text-sm w-20 text-nowrap opacity-80">Created On</h4>
            <h4 className="text-sm opacity-80">{userFriendlyDate}</h4>
          </div>
        </>
      }
      trigger={
        <div
          className={cn(
            "cursor-pointer text-xl flex gap-4 items-center",
            "hover:bg-main-bg rounded",
            "p-2 capitalize group"
          )}
        >
          <h1 className="group-hover:underline" onClick={() => setopen(true)}>
            {board.title}
          </h1>
          {/* <ChevronDown size="15px" /> */}

          <Button
            onClick={() => {
              const ele = document.getElementById("main-right-cont");
              ele?.requestFullscreen();
            }}
            variant={"ghost"}
            className={cn("opacity-0 p-0", "group-hover:!opacity-100")}
          >
            <TooltipComp
              side="right"
              title={
                <div className="px-3 py-2 shadow-lg shadow-main-fg border rounded-lg overflow-hidden border-border-light">
                  Full screen
                </div>
              }
            >
              <Fullscreen size={18} className="stroke-text-color" />
            </TooltipComp>
          </Button>
        </div>
      }
    />
  );
};

export default memo(BoardTitle);
