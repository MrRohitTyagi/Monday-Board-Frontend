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
import { formatNumber } from "@/utils/helperFunctions";

type SprintCollapsedProps = {
  sprint: SprintType;
};

const SprintCollapsed = ({ sprint }: SprintCollapsedProps) => {
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

  return (
    <div
      className={cn(
        "overflow-x-auto",
        "grid grid-cols-[20rem_1fr]",
        "scrollbar-none bg-main-bg"
      )}
    >
      <div className="collapse-container-left flex flex-row z-10 sticky left-0">
        <SprintLeftColor color={sprint.color} />
        <div className="collapse-container-left w-full flex flex-col overflow-hidden">
          <div
            className={cn(
              "pulse-title",
              "w-full text-sm content-around h-full",
              "text-ellipsis overflow-hidden text-nowrap"
            )}
          >
            <div
              className={cn(
                "collapsed-title bg-main-bg flex flex-col gap-3",
                "justify-center h-full p-4",
                "border-r-1 border-r-border-light"
              )}
            >
              <h1>{sprint.title}</h1>
              <LowOpacityText className="opacity-45">
                {sprint.pulses.length} Items
              </LowOpacityText>
            </div>
          </div>
        </div>
      </div>

      <div className="collapse-container-right flex flex-row w-full items-center">
        {/* <Divider horizontal /> */}

        <StatRenderer
          config={priorityDisplayConfig}
          sprint={sprint}
          title={"Priority"}
        />
        {/* <Divider horizontal /> */}

        <StatRenderer
          config={statusDisplayConfig}
          sprint={sprint}
          title={"Status"}
        />
      </div>
    </div>
  );
};

type StatRendererType = {
  config: any;
  sprint: SprintType;
  title: string;
};

const StatRenderer = ({ config, sprint, title }: StatRendererType) => {
  return (
    <div
      className={cn(
        "px-12 collapse-statuses flex flex-col justify-center",
        " gap-2 items-center h-full shrink-0",
        "border-r-1 border-r-border-light"
      )}
    >
      <LowOpacityText>{title}</LowOpacityText>
      <div className="w-32 h-8 bg-main-fg flex flex-row items-center rounded-sm">
        {config.map((c: any, i: number) => {
          return (
            <TooltipComp
              key={c._id}
              title={
                <div className="px-4 py-2 border-2 border-highlighter-dark rounded-md">
                  <h1>
                    {c.title} {c.count}/{sprint.pulses.length}
                    {" - "}
                    {formatNumber((c.count / sprint.pulses.length) * 100)}%
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
                  background: c.color,
                  width: `${(100 / sprint.pulses.length) * c.count}%`,
                }}
              />
            </TooltipComp>
          );
        })}
      </div>
    </div>
  );
};

export default memo(SprintCollapsed);
