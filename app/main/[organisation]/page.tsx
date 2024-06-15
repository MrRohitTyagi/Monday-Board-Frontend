"use client";
import React from "react";
import { startCase } from "lodash";
import Image from "next/image";
import { Star } from "lucide-react";

// UI elements
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// utils
import { BoardType, useAuth } from "@/zstore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useNavigate from "@/hooks/useNavigate";

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
          "rounded-lg space-y-4"
        )}
      >
        <h1 className="font-bold text-2xl">Your Boards</h1>
        <div className="boards-listing flex flex-row gap-4 flex-wrap">
          {boards.map((board) => {
            return <BoardComp key={board._id + "board"} board={board} />;
          })}
        </div>
      </div>
    </div>
  );
};

const BoardComp = ({ board }: { board: BoardType }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`board/${board._id}`)}
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
          <Button variant="ghost" className="p-0">
            <Star size="18px" />
          </Button>
        </div>
        {/* <h5>{board.description}</h5> */}
      </CardFooter>
    </Card>
  );
};

export default Organisation;
