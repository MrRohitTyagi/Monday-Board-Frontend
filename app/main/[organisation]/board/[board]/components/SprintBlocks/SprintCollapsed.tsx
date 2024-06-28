"use client";

import React, { memo, useMemo } from "react";
import { StateSetter } from "@/types/genericTypes";
import { SprintType } from "@/types/sprintTypes";
import { cn } from "@/lib/utils";
import LowOpacityText from "@/components/core/LowOpacityText";
import SprintLeftColor from "./SprintLeftColor";
import Divider from "@/components/core/Divider";
import useBoardContext from "@/hooks/useBoardContext";
import TooltipComp from "@/components/core/TooltipComp";

type SprintCollapsedProps = {
  sprint: SprintType;
  setSprint?: StateSetter<SprintType>;
  setIsExpanded?: StateSetter<boolean>;
};

const SprintCollapsed = ({
  sprint,
  setSprint,
  setIsExpanded,
}: SprintCollapsedProps) => {
  const { board } = useBoardContext();

  const priorityDisplayConfig = useMemo(() => {
    const usedPriorities: any = {};

    for (const pri in board.priority) {
      const priorityObj = board.priority[pri];
      sprint.pulses.forEach((pulse) => {
        if (pulse.priority === pri) {
          usedPriorities[pri] = {
            ...priorityObj,
            count: (usedPriorities[pri]?.count || 0) + 1,
          };
        }
      });
    }
    return Object.values(usedPriorities);
  }, [board, sprint]);

  const statusDisplayConfig = useMemo(() => {
    const usedStatuses: any = {};

    for (const status in board.statuses) {
      const statusObj = board.statuses[status];
      sprint.pulses.forEach((pulse) => {
        if (pulse.status === status) {
          usedStatuses[status] = {
            ...statusObj,
            count: (usedStatuses[status]?.count || 0) + 1,
          };
        }
      });
    }
    return Object.values(usedStatuses);
  }, [board, sprint]);

  console.log(`%c {usedStatuses} `, "color: pink;border:1px solid pink", {
    statusDisplayConfig,
    priorityDisplayConfig,
  });

  return (
    <div
      className={cn(
        "collapsed-sprint-cont",
        "flex flex-row relative items-center",
        " h-collapsed-sprint-height",
        "bg-main-bg"
      )}
    >
      <SprintLeftColor color={sprint.color} />
      <div
        className={cn("collapsed-content ml-3 h-full min-w-[30%] max-w-[30%]")}
      >
        <div className="collapsed-title flex flex-col gap-3 justify-center h-full">
          <h1>{sprint.title}</h1>
          <LowOpacityText className="opacity-45">
            {sprint.pulses.length} Items
          </LowOpacityText>
        </div>
      </div>

      <Divider horizontal />

      <div className="collapse-priority flex flex-col gap-2 items-center">
        <LowOpacityText>Priority</LowOpacityText>
        <div className="w-24 h-8 bg-main-fg flex flex-row items-center rounded-sm">
          {priorityDisplayConfig.map((p: any) => {
            return (
              <TooltipComp
                title={
                  <div className="px-4 py-2 border-2 border-highlighter-dark rounded-md">
                    <h1>
                      {p.title} {p.count}/{sprint.pulses.length}
                    </h1>
                  </div>
                }
              >
                <div
                  className={cn(
                    "hover:scale-x-110 hover:scale-y-[1.2] transition-all",
                    "hover:rounded-sm",
                    "h-full"
                  )}
                  style={{
                    background: p.color,
                    width: `${(100 / sprint.pulses.length) * p.count}%`,
                  }}
                />
              </TooltipComp>
            );
          })}
        </div>
      </div>

      <Divider horizontal />

      <div className="collapse-statuses flex flex-col gap-2 items-center">
        <LowOpacityText>Status</LowOpacityText>
        <div className="w-24 h-8 bg-main-fg flex flex-row items-center rounded-sm">
          {statusDisplayConfig.map((s: any) => {
            return (
              <TooltipComp
                title={
                  <div className="px-4 py-2 border-2 border-highlighter-dark rounded-md">
                    <h1>
                      {s.title} {s.count}/{sprint.pulses.length}
                    </h1>
                  </div>
                }
              >
                <div
                  className={cn(
                    "hover:scale-x-110 hover:scale-y-[1.2] transition-all",
                    "hover:rounded-sm",
                    "h-full"
                  )}
                  style={{
                    background: s.color,
                    width: `${(100 / sprint.pulses.length) * s.count}%`,
                  }}
                />
              </TooltipComp>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(SprintCollapsed);
