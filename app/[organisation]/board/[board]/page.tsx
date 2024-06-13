"use client";
import React, { useEffect, useState } from "react";
import { startCase } from "lodash";

import { getBoard } from "@/components/core/TEMPDATA";

import { cn } from "@/lib/utils";
import { BoardType } from "@/zstore";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import BoardTitle from "./components/BoardTitle";

type pageProps = {
  params: { board: string; organisation: string };
};

const Board = ({ params }: pageProps) => {
  const [currentBoard, setcurrentBoard] = useState<BoardType>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const board = await getBoard(params.board);
      setcurrentBoard(board as BoardType);
      setIsLoading(false);
    }
    init();
  }, []);

  console.log(
    `%c {paramsmvurrentBoard} `,
    "color: aqua;border:2px solid darkorange",
    currentBoard
  );

  return (
    <div className="h-full relative">
      {isLoading ? (
        <span
          className={cn(
            "loading loading-ring loading-lg",
            "absolute top-1/2 left-1/2 scale-150",
            "translate-x-[-50%] translate-y-[-50%]"
          )}
        />
      ) : (
        <div
          className={cn(
            "board-main-div w-full pt-4 pl-4",
            "flex justify-between"
          )}
        >
          <BoardTitle board={currentBoard} />

          <div></div>
        </div>
      )}
    </div>
  );
};

export default Board;
