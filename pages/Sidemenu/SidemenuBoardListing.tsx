"use client";

import React, { memo } from "react";
import useNavigate from "@/hooks/useNavigate";
import { startCase } from "lodash";
import { usePathname } from "next/navigation";

import { ClipboardEdit } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/zstore";

type SidemenuBoardListingProps = {};
const SidemenuBoardListing = (props: SidemenuBoardListingProps) => {
  const navigate = useNavigate();
  const {
    user: { boards },
  } = useAuth();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 animate-fadeIn w-full">
      {boards.map((board) => {
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
    </div>
  );
};

export default memo(SidemenuBoardListing);
