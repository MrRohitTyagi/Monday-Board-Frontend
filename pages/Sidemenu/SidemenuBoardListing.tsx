"use client";

import React, { memo } from "react";
import { startCase } from "lodash";
import { usePathname, useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/zstore";
import { Button } from "@/components/ui/button";
import TooltipComp from "@/components/core/TooltipComp";
import AvatarComp from "@/components/core/AvatarComp";
import { generatePictureFallback } from "@/utils/helperFunctions";

type SidemenuBoardListingProps = { isCollapsed: boolean };

const SidemenuBoardListing = ({ isCollapsed }: SidemenuBoardListingProps) => {
  const {
    user: { boards },
    isAuthenticated,
  } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 animate-fadeIn w-full transition-all">
      {boards.map((board, i) => {
        const isActive = pathname?.includes(board._id);

        return (
          <div
            key={board._id + "side-board"}
            onClick={() => router.push(`/main/board/${board._id}`)}
            className={cn(
              "single-board-row",
              "flex flex-row gap-2 items-center ",
              isCollapsed ? "justify-center" : "justify-start",
              "cursor-pointer p-2 rounded text-sm",
              "hover:bg-highlighter-dark",
              isActive ? "bg-highlighter-dark" : ""
            )}
          >
            <TooltipComp title={board.title}>
              <AvatarComp
                className="shrink-0 h-6 w-6"
                src={board.picture}
                fallback={generatePictureFallback(board.title)}
              />
            </TooltipComp>
            {isCollapsed === false && (
              <h2
                className="text-ellipsis text-nowrap overflow-hidden"
                key={board._id + "board-listing"}
              >
                {startCase(board.title)}
              </h2>
            )}
          </div>
        );
      })}

      <TooltipComp
        title={<h1>Create new board</h1>}
        side="right"
        className="px-3 py-2"
      >
        <Button
          disabled={isAuthenticated === false}
          onClick={() => {
            router.push("/main/board-settings/new");
          }}
          className={cn(
            "border-main-bg border-2 gap-1",
            "flex flex-row items-center",
            "text-ellipsis overflow-hidden text-nowrap",
            "bg-transparent px-2 m-0.5"
          )}
        >
          <Plus
            size={isCollapsed === true ? 20 : 18}
            className="stroke-text-color"
          />
          {isCollapsed === false && <h1>Create board</h1>}
        </Button>
      </TooltipComp>
    </div>
  );
};

export default memo(SidemenuBoardListing);
