"use client";

import React from "react";
import { SprintType } from "@/zstore";
import { cn } from "@/lib/utils";
import { startCase } from "lodash";
import Pulse from "./Pulse";
import Space from "@/components/core/Space";
import TempPulseRow from "./TempPulseRow";

const tempPulse = {
  pk: "temp-pulse",
  priority: "Priority",
  status: "Status",
  title: "Item",
  assigned: ["Assigned"],
  timeline: "Timeline",
  tag: "# Tag",
};

type SprintProps = { sprint: SprintType };

const Sprint = ({ sprint }: SprintProps) => {
  return (
    <div className={cn(`w-full`)}>
      <h2 className="text-xl" style={{ color: sprint.color }}>
        {startCase(sprint.title)}
      </h2>
      <Space />
      {/* pulses */}
      <div className="pulse-container flex flex-col ">
        {/* <TempPulseRow color={sprint.color} /> */}
        <Pulse
          pulse={tempPulse}
          sprint={sprint}
          index={0}
          isLast={false}
          isFake={true}
        />
        {sprint.pulses.map((pulse, i) => {
          return (
            <Pulse
              isFake={false}
              pulse={pulse}
              sprint={sprint}
              index={++i}
              isLast={i === sprint.pulses.length}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sprint;
