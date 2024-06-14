"use client";

import React, { useEffect, useState } from "react";
import { startCase } from "lodash";

import Space from "@/components/core/Space";

import { BoardType, SprintType } from "@/zstore";
import { cn } from "@/lib/utils";

import Pulse from "./Pulse";
import ScrollWrapper from "@/components/core/ScrollWrapper";
import { getSprint } from "@/gateways/sprint-gateway";

const tempPulse = {
  _id: "temp-pulse",
  priority: "Priority",
  status: "Status",
  title: "Item",
  assigned: ["Assigned"],
  timeline: { start: "Timeline" },
  tag: "# Tag",
};

type SprintProps = { sprintID: string; board: BoardType };

const Sprint = ({ sprintID, board }: SprintProps) => {
  const [sprint, setSprint] = useState<SprintType>({} as SprintType);
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    (async function init() {
      const fetchedSprint = await getSprint(sprintID);
      console.log(
        `%c fetchedSprint `,
        "color: aqua;border:2px solid darkorange",
        fetchedSprint
      );
      setSprint(fetchedSprint);
      setIsloading(false);
    })();
  }, [sprintID]);

  return isloading === true ? (
    <div className={cn(`w-full`)}>Skeleton Loading...</div>
  ) : (
    <div className={cn(`w-full animate-fadeIn`)}>
      <h2 className="text-xl" style={{ color: sprint.color }}>
        {startCase(sprint.title)}
      </h2>
      <Space />
      {/* pulses */}
      <div className="grid grid-cols-[20rem_1fr]">
        <div className="pulse-container-left flex flex-row">
          <div
            style={{ background: sprint.color }}
            className={cn(
              "left-color w-2 h-full shrink-0",
              "rounded-tl-md",
              "rounded-bl-md"
            )}
          />
          <div className="pulse-container-left w-full flex flex-col overflow-hidden">
            {/* <TempPulseRow color={sprint.color} /> */}

            <PulseWrapper>
              <Pulse
                pulse={tempPulse}
                board={board}
                sprint={sprint}
                leftPart={true}
                isFake={true}
              />
            </PulseWrapper>

            {sprint.pulses.map((pulse, i) => {
              return (
                <PulseWrapper key={pulse._id + i + "left"}>
                  <Pulse
                    isFake={false}
                    pulse={pulse}
                    board={board}
                    sprint={sprint}
                    leftPart={true}
                  />
                </PulseWrapper>
              );
            })}
          </div>
        </div>

        {/* RIGHT PART  */}
        <ScrollWrapper className="pulse-container-right flex flex-col w-full overflow-x-auto">
          <PulseWrapper>
            <Pulse
              board={board}
              pulse={tempPulse}
              sprint={sprint}
              leftPart={false}
              isFake={true}
            />
          </PulseWrapper>
          {sprint.pulses.map((pulse, i) => {
            return (
              <PulseWrapper key={pulse._id + i + "right"}>
                <Pulse
                  board={board}
                  isFake={false}
                  pulse={pulse}
                  sprint={sprint}
                  leftPart={false}
                />
              </PulseWrapper>
            );
          })}
        </ScrollWrapper>
      </div>
    </div>
  );
};

const PulseWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "h-10 w-full animate-fadeIn",
        "transition-all duration-300",
        "hover:bg-main-bg",
        "active:bg-main-active-dark"
      )}
    >
      {children}
    </div>
  );
};

export default Sprint;
