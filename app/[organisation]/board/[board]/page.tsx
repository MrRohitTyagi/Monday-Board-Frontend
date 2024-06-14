"use client";
import React, { useEffect, useState } from "react";

import { getBoard } from "@/components/core/TEMPDATA";

import { cn } from "@/lib/utils";
import { BoardType } from "@/zstore";

import BoardTitle from "./components/BoardTitle";
import Sprint from "./components/Sprint";
import Space from "@/components/core/Space";

type pageProps = {
  params: { board: string; organisation: string };
};

const Board = ({ params }: pageProps) => {
  const [currentBoard, setcurrentBoard] = useState<BoardType>({} as BoardType);
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
        <>
          <div className={cn("board-main-div w-full", "flex justify-between")}>
            <BoardTitle board={currentBoard} />
          </div>
          <div>
            <Space h={4} />

            {/* //  Board Content  */}
            <div className="flex flex-col gap-6">
              {currentBoard.sprints.map((sprint) => {
                return (
                  <Sprint
                    key={sprint._id}
                    sprint={sprint}
                    board={currentBoard}
                  />
                );
              })}
              <Space h={4} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
