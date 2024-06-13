"use client";

import React from "react";
import { startCase } from "lodash";
import { MessageCircleMore } from "lucide-react";

import { BoardType, PulseType, SprintType } from "@/zstore";
import { cn } from "@/lib/utils";

type PulseProps = {
  pulse: PulseType;
  sprint: SprintType;
  board: BoardType;
  index?: number;
  isLast?: boolean;
  leftPart?: boolean;
  isFake?: boolean;
};
// max-w-40 max-w-12 min-w-40 min-w-12
const baseCssMiniItems = (w = 40) =>
  cn(
    "text-sm text-center tracking-wider",
    `opacity-80 max-w-${w} min-w-${w} h-full`,
    "content-around shrink-0 text-center tracking-wider text-nowrap",
    "border-pulse-divider border-r-[1px] cursor-pointer"
  );

const Pulse = ({ pulse, sprint, isFake, leftPart, board }: PulseProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start h-full",
        "bg-main-light pl-2",
        "border-pulse-divider border-[1px]",
        "hover:bg-main-fg transition-all duration-150",
        "active:bg-main-active-dark transition-all duration-150"
        // isFake === true && index === 0 && "rounded-tl-md",
        // leftPart === true && isLast === true && "rounded-bl-md"
      )}
    >
      {/* Pulse title  */}
      {leftPart === true && (
        <div
          className={cn(
            "pulse-title",
            "text-sm opacity-80 content-around",
            "text-ellipsis overflow-hidden text-nowrap",
            isFake ? "text-center tracking-wider" : ""
          )}
        >
          {startCase(pulse.title)}
        </div>
      )}
      {leftPart === false && (
        <div
          className={cn(
            "w-full h-full flex flex-row items-center justify-start",
            "pulse-rest-scroller shrink-0"
          )}
        >
          {/* ----------------------------------------------------------------------- */}
          <div
            className={cn(
              baseCssMiniItems(12),
              "openchat-to flex flex-row items-center justify-center",
              "cursor-pointer"
            )}
          >
            <MessageCircleMore size={"24px"} />
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "timeline-block")}>
            {pulse.timeline}
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div
            style={
              isFake ? {} : { background: board.priority[pulse.priority].color }
            }
            className={cn(baseCssMiniItems(), "priority")}
          >
            {isFake ? pulse.priority : board.priority[pulse.priority].title}
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "assigned-to")}>Assigned</div>
          {/* ----------------------------------------------------------------------- */}
          <div
            style={
              isFake ? {} : { background: board.statuses[pulse.status].color }
            }
            className={cn(baseCssMiniItems(), "status-block")}
          >
            {isFake ? pulse.status : board.statuses[pulse.status].title}
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div
            className={cn(baseCssMiniItems(), "pulse-tag")}
            style={{ color: sprint.color }}
          >
            {pulse.tag}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pulse;
