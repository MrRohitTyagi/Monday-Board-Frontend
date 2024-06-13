import React from "react";
import { startCase } from "lodash";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BoardType } from "@/zstore";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import AvatarGroup from "@/components/core/AvatarGroup";

type BoardTitleProps = {
  board: BoardType;
};

const BoardTitle = ({ board }: BoardTitleProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <h2
          className={cn(
            "cursor-pointer text-xl flex gap-2 items-center",
            "hover:bg-main-light rounded"
          )}
        >
          {startCase(board.title)}
          <ChevronDown size="15px" />
        </h2>
      </PopoverTrigger>
      <PopoverContent className="bg-main-light border-[#696767] p-2  pl-4 pr-4">
        <h2>Board Info</h2>
        <div className="h-2"></div>
        <p className="text-xs">{board.description}</p>
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
        <div className="flex items-center flex-row gap-4">
          <h4 className="text-sm w-20 text-nowrap opacity-80">Created On</h4>
          <h4 className="text-sm opacity-80">{board.pk}</h4>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BoardTitle;
