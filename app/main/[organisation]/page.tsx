"use client";
import React, { memo } from "react";
import { startCase } from "lodash";
import Image from "next/image";
import { Edit, Star } from "lucide-react";

// UI elements
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// utils
import { useAuth } from "@/zstore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useNavigate from "@/hooks/useNavigate";
import TooltipComp from "@/components/core/TooltipComp";
import { BoardType } from "@/types/boardTypes";

type pageProps = {};
const Organisation = (props: pageProps) => {
  const {
    user: { boards, username },
  } = useAuth();

  return (
    <div>
      <h2>
        Welcome! {startCase(username)} <br /> Quickly access your recent boards,
        Inbox and workspaces
      </h2>
      <div className="divider" />
      <div
        className={cn(
          "user-boards bg-main-light p-4 pt-8 pb-8 ",
          "rounded-tl-lg rounded-bl-lg space-y-4"
        )}
      >
        <h1 className="font-bold text-2xl">Your Boards</h1>
        <div className="boards-listing flex flex-row gap-4 flex-wrap">
          {boards.length === 0 ? (
            <CreateNewBoard />
          ) : (
            boards.map((board) => {
              return <BoardComp key={board._id + "board"} board={board} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};
const CreateNewBoard = () => {
  const router = useRouter();
  return (
    <div className="w-full gap-4 flex flex-col items-center create-new-board-cont">
      <h1 className="text-xl">No boards Found</h1>
      <Button
        variant={"default"}
        onClick={() => {
          router.push("/main/board-settings/new");
        }}
      >
        Create New Board
      </Button>
    </div>
  );
};

const BoardComp = ({ board }: { board: BoardType }) => {
  const navigate = useNavigate();
  const router = useRouter();
  return (
    <Card
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(`board/${board._id}`);
      }}
      className={cn(
        "bg-transparent h-card-height w-card-width ",
        "p-2 border-border-light border-[1px] space-y-2",
        "transition-all cursor-pointer",
        "hover:shadow-foreground shadow-lg"
      )}
    >
      <CardHeader className="flex flex-row justify-center items-center p-0">
        <Image
          className="object-cover w-full max-h-36"
          width={100}
          height={100}
          src={board.picture}
          alt={board.title}
          unoptimized
        />
      </CardHeader>

      <CardFooter className="flex flex-col justify-start items-start p-0">
        <div className="flex flex-row justify-between w-full items-center">
          <h3 className="text-ellipsis font-bold">{startCase(board.title)}</h3>
          <div className="board-actions space-x-2">
            {/* StarBoard  */}
            <Button variant="ghost" className="p-0">
              <TooltipComp className="px-3 py-2" title={"Star board"}>
                <Star size="18px" color="white" />
              </TooltipComp>
            </Button>

            {/* {EditBoard} */}
            <Button
              variant="ghost"
              className="p-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/main/board-settings/${board._id}`, {
                  scroll: true,
                });
              }}
            >
              <TooltipComp className="px-3 py-2" title={"Edit board"}>
                <Edit size="18px" color="white" />
              </TooltipComp>
            </Button>
          </div>
        </div>
        {/* <h5>{board.description}</h5> */}
      </CardFooter>
    </Card>
  );
};

export default memo(Organisation);
