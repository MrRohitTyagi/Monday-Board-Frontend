"use client";

import { getBoardPerUser } from "@/gateways/board-gateway";
import useLoading from "@/hooks/useLoading";
import React, { useEffect, useState } from "react";
import SprintSkeletonLoader from "../board/[board]/components/SprintBlocks/SprintSkeletonLoader";
import Space from "@/components/core/Space";
import { BoardType } from "@/types/boardTypes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AvatarComp from "@/components/core/AvatarComp";
import LowOpacityText from "@/components/core/LowOpacityText";
import { useRouter } from "next/navigation";
import { startCase } from "lodash";
import { PulseType } from "@/types/pulseTypes";
import SprintLeftColor from "../board/[board]/components/SprintBlocks/SprintLeftColor";
import Divider from "@/components/core/Divider";
import { useAuth } from "@/zstore";

type MyWorkProps = {};
const MyWork = ({}: MyWorkProps) => {
  const { isLoading, triggerLoading } = useLoading({ defaultLoading: true });
  const [myBoards, setMyBoards] = useState<BoardType[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    async function init() {
      const boardAssigned = await getBoardPerUser();
      setMyBoards(boardAssigned);
      triggerLoading(false);
      console.log(
        `%c boardAssigned `,
        "color: orange;border:2px solid cyan",
        boardAssigned
      );
    }
    init();
  }, []);
  return isLoading ? (
    <div className="pt-4 space-y-2">
      <SprintSkeletonLoader />
      <Space />
      <SprintSkeletonLoader />
    </div>
  ) : (
    <div className="space-y-2 pt-2">
      <h1 className="text-2xl">My Work</h1>
      <Space h={4} />
      <div className="my-work-board-cont flex flex-col gap-8">
        {myBoards.map((board) => {
          return (
            <div
              key={board._id}
              className={cn(
                "board-mywork-cont",
                "relative h-fit px-2 py-4",
                "border border-highlighter-dark",
                "shrink-0 shadow-md shadow-[var(--main-bg)]"
              )}
            >
              <Button
                onClick={() => router.push(`/main/board/${board._id}`)}
                variant={"ghost"}
                className={cn(
                  "px-2 absolute bg-main-fg",
                  "flex flex-row justify-start gap-2",
                  "left-4 -top-5 max-w-60"
                )}
              >
                <AvatarComp src={board.picture} className="h-8 w-8" />
                <LowOpacityText className="text-start overflow-hidden text-ellipsis text-md font-bold">
                  {board.title}
                </LowOpacityText>
              </Button>
              <div className="per-board-work space-y-1">
                <Space />
                {board.sprints.map((sprint: any, i) => {
                  if (sprint.pulses.length === 0) return null;
                  return (
                    <>
                      {i > 0 && <Divider key={sprint._id} />}
                      {sprint.pulses.map((pulse: PulseType) => {
                        if (!pulse.assigned.includes(user._id)) return null;
                        return (
                          <div
                            onClick={() => {
                              router.push(
                                `/main/board/${board._id}/pulse/${pulse._id}`
                              );
                            }}
                            key={pulse._id}
                            className={cn(
                              "cursor-pointer",
                              "overflow-x-auto",
                              "grid grid-cols-[20rem_1fr]",
                              "scrollbar-none",
                              "animate-pulse-height",
                              "flex flex-row items-center justify-start h-full",
                              "bg-main-bg pl-2 shrink-0",
                              "border-border-light border-[1px]",
                              "hover:bg-main-fg transition-all duration-150",
                              "transition-all duration-150",
                              "relative"
                            )}
                          >
                            <SprintLeftColor color={sprint.color} />
                            <h2
                              className={cn(
                                "pulse-title",
                                "w-full text-sm content-around h-full",
                                "text-ellipsis overflow-hidden text-nowrap"
                              )}
                            >
                              {startCase(pulse.title)}
                            </h2>

                            <h2
                              className={cn(
                                "pulse-title",
                                "w-full text-sm content-around h-full",
                                "text-ellipsis overflow-hidden text-nowrap",
                                "flex flex-row items-center gap-2"
                              )}
                            >
                              <div
                                className="dot h-2 w-2 rounded-full"
                                style={{ backgroundColor: sprint.color }}
                              />
                              <h1>{startCase(sprint.title)}</h1>
                            </h2>
                          </div>
                        );
                      })}
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyWork;
