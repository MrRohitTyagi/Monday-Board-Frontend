"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { startCase } from "lodash";
import { MessageCircleMore } from "lucide-react";

import { BoardType, PulseType, SprintType } from "@/zstore";
import { cn } from "@/lib/utils";
import Status from "./PulseBlocks/Status";

import TimeLine from "./PulseBlocks/TimeLine";
import Priority from "./PulseBlocks/Priority";
import Assigned from "./PulseBlocks/Assigned";
import PulseTitle from "./PulseBlocks/PulseTitle";

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
export const baseCssMiniItems = (w = 40) =>
  cn(
    "text-sm text-center tracking-wider",
    `opacity-80 max-w-${w} min-w-${w} h-full`,
    "content-around shrink-0 text-center tracking-wider text-nowrap",
    "border-pulse-divider border-r-[1px] cursor-pointer"
  );

type PulseContextType = {
  setPulse: React.Dispatch<React.SetStateAction<PulseType>>;
  updatePriority: (p: string) => void;
  updateTitle: (p: string) => void;
  updateStatus: (p: string) => void;
};
const PulseContext = createContext<PulseContextType>({} as PulseContextType);

const Pulse = ({
  pulse: mainPulse,
  sprint,
  isFake,
  leftPart,
  board,
}: PulseProps) => {
  const [pulse, setPulse] = useState<PulseType>(mainPulse);

  useEffect(() => {
    setPulse(mainPulse);
  }, [mainPulse]);

  const updateStatus = useCallback((status: string) => {
    setPulse((prev) => ({ ...prev, status: status }));
  }, []);

  const updatePriority = useCallback((priority: string) => {
    setPulse((prev) => ({ ...prev, priority: priority }));
  }, []);

  const updateTitle = useCallback((title: string) => {
    setPulse((prev) => ({ ...prev, title: title }));
  }, []);

  const updateTimeline = useCallback(
    (timeline: { start: string; end: string }) => {
      setPulse((prev) => ({ ...prev, timeline: timeline }));
    },
    []
  );

  return (
    <PulseContext.Provider
      value={{ setPulse, updateStatus, updatePriority, updateTitle }}
    >
      <div
        className={cn(
          "flex flex-row items-center justify-start h-full",
          "bg-main-light pl-2",
          "border-pulse-divider border-[1px]",
          "hover:bg-main-fg transition-all duration-150",
          "active:bg-main-active-dark transition-all duration-150"
        )}
      >
        {/* Pulse title  */}
        {leftPart === true && isFake ? (
          <div
            className={cn(
              "pulse-title",
              "w-full text-sm opacity-80 content-around",
              "text-ellipsis overflow-hidden text-nowrap",
              isFake === true && "text-center tracking-wider"
            )}
          >
            {startCase(pulse.title)}
          </div>
        ) : (
          <PulseTitle pulse={pulse} />
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
            {isFake === true ? (
              <div className={cn(baseCssMiniItems(), "timeline-block")}>
                {pulse.timeline.start}
              </div>
            ) : (
              <TimeLine pulse={pulse} board={board} />
            )}

            {/*  PRIORITY ----------------------------------------------------------------------- */}
            {isFake === true ? (
              <div
                className={cn(
                  baseCssMiniItems(),
                  "priority",
                  "hover:opacity-60"
                )}
              >
                {pulse.priority}
              </div>
            ) : (
              <Priority board={board} pulse={pulse} />
            )}
            {/* -------------------------------------------------------------------------------- */}

            {/* ASSIGNED ----------------------------------------------------------------------- */}
            {isFake === true ? (
              <div className={cn(baseCssMiniItems(), "assigned-to")}>
                Assigned
              </div>
            ) : (
              <Assigned pulse={pulse} board={board} />
            )}
            {/* ----------------------------------------------------------------------- */}

            {/*STATUS ----------------------------------------------------------------------- */}
            {isFake === true ? (
              <div className={cn(baseCssMiniItems(), "status-block")}>
                {pulse.status}
              </div>
            ) : (
              <Status pulse={pulse} board={board} />
            )}
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
    </PulseContext.Provider>
  );
};
export { PulseContext };
export default Pulse;
