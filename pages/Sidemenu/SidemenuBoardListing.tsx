"use client";

import React, { memo } from "react";
import useNavigate from "@/hooks/useNavigate";
import { startCase } from "lodash";
import { usePathname, useRouter } from "next/navigation";

import { ClipboardEdit, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/zstore";
import { Button } from "@/components/ui/button";
import TooltipComp from "@/components/core/TooltipComp";

type SidemenuBoardListingProps = { isCollapsed: boolean };

const SidemenuBoardListing = ({ isCollapsed }: SidemenuBoardListingProps) => {
  const navigate = useNavigate();
  const {
    user: { boards },
    isAuthenticated,
  } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 animate-fadeIn w-full">
      {isCollapsed === false &&
        boards.map((board) => {
          const isActive = pathname?.includes(board._id);

          return (
            <div
              key={board._id + "fdsfds"}
              onClick={() => navigate(`board/${board._id}`)}
              className={cn(
                "flex flex-row gap-2 items-center ",
                "cursor-pointer p-2 rounded text-sm",
                "hover:bg-main-active-dark",
                isActive ? "bg-main-active-dark" : ""
              )}
            >
              <ClipboardEdit size="15px" />
              <h2
                className="text-ellipsis text-nowrap overflow-hidden"
                key={board._id + "board-listing"}
              >
                {startCase(board.title)}
              </h2>
            </div>
          );
        })}

      <TooltipComp title={"Create new board"} side="right">
        <Button
          disabled={isAuthenticated === false}
          onClick={() => {
            router.push("/board-settings/new");
          }}
          className={cn(
            "border-main-light border-2 gap-1",
            "flex flex-row items-center",
            "text-ellipsis overflow-hidden text-nowrap",
            "bg-transparent px-2"
          )}
        >
          <Plus size={isCollapsed === true ? 20 : 18} />
          {isCollapsed === false && <h1>Create board</h1>}
        </Button>
      </TooltipComp>
    </div>
  );
};

export default memo(SidemenuBoardListing);
