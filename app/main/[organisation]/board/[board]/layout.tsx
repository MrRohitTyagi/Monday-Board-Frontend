"use client";
import React, { memo, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import BoardTitle from "./components/BoardBlocks/BoardTitle";
import Sprint from "./components/Sprint";
import Space from "@/components/core/Space";
import { getBoard } from "@/gateways/board-gateway";
import { BoardContext } from "@/hooks/useBoardContext";
import BoardFilter from "./components/BoardBlocks/BoardFilter";
import { BoardType } from "@/types/boardTypes";

type pageProps = {
  params: { board: string; organisation: string };
  children: React.ReactNode;
};

const Board = ({ params, children }: pageProps) => {
  const [currentBoard, setCurrentBoard] = useState<BoardType>({} as BoardType);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const board = await getBoard(params.board);
      setCurrentBoard(board as BoardType);
      setIsLoading(false);
    }
    init();
  }, []);

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
        <BoardContext.Provider value={{ setCurrentBoard, board: currentBoard }}>
          <>
            <div
              className={cn(
                "bg-main-fg sticky top-0 z-30 pt-4",
                "boart-title-filter-comp"
              )}
            >
              <div
                className={cn("board-main-div w-full", "flex justify-between")}
              >
                <BoardTitle board={currentBoard} />
              </div>
              <Space h={4} />
              {/* Board filter */}
              <BoardFilter />
              <Space h={4} />
            </div>
            <div>
              {/* //  Board Content  */}
              <div className="flex flex-col gap-6 sprint-container">
                {currentBoard.sprints.map((sprintID) => {
                  return (
                    <Sprint
                      key={sprintID}
                      sprintID={sprintID}
                      board={currentBoard}
                    />
                  );
                })}
                <Space h={4} />
              </div>
            </div>
          </>
        </BoardContext.Provider>
      )}
      {children}
    </div>
  );
};
export default memo(Board);
