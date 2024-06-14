

"use client";

import useNavigate from "@/hooks/useNavigate";
import { cn } from "@/lib/utils";
import { useAuth } from "@/zstore";
import { startCase } from "lodash";
import { ClipboardEdit } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

type SidemenuBoardListingProps = {};
const SidemenuBoardListing = (props: SidemenuBoardListingProps) => {
  const navigate = useNavigate();
  const { boards } = useAuth();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 animate-fadeIn">
      {boards.map((board) => {
        const isActive = pathname?.includes(board.pk);

        return (
          <div
            key={board.pk + "fdsfds"}
            onClick={() => navigate(`board/${board.pk}`)}
            className={cn(
              "flex flex-row gap-2 items-center ",
              "cursor-pointer p-2 rounded text-sm",
              "hover:bg-main-active-dark",
              isActive ? "bg-main-active-dark" : ""
            )}
          >
            <ClipboardEdit size="15px" />
            <h2
              className="text-ellipsis text-nowrap"
              key={board.pk + "board-listing"}
            >
              {startCase(board.title)}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default SidemenuBoardListing;
