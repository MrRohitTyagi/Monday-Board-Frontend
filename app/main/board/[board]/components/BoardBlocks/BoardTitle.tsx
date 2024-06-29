"use client";

import React, { memo } from "react";
import { startCase } from "lodash";
import { ChevronDown, Edit } from "lucide-react";
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

  return (
    <PopoverComp
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
          <div className="flex items-center flex-row gap-4">
            <h4 className="text-sm w-20 text-nowrap opacity-80">Admins</h4>
            <AvatarGroup users={board.admins} />
          </div>

          {/* // members */}
          <div className="flex items-center flex-row gap-4">
            <h4 className="text-sm w-20 text-nowrap opacity-80">Members</h4>
            <AvatarGroup users={board.members} />
          </div>
          <div className="h-2"></div>

          {/* Created On */}
          <div className="flex items-center flex-row gap-4 overflow-hidden">
            <h4 className="text-sm w-20 text-nowrap opacity-80">Created On</h4>
            <h4 className="text-sm opacity-80">{userFriendlyDate}</h4>
          </div>
        </>
      }
      trigger={
        <h2
          className={cn(
            "cursor-pointer text-xl flex gap-2 items-center",
            "hover:bg-main-bg rounded",
            "p-2"
          )}
        >
          {startCase(board.title)}
          <ChevronDown size="15px" />
        </h2>
      }
    />
  );
};

export default memo(BoardTitle);
