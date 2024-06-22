import React, { memo, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, Range } from "react-date-range";
import "./css/dateRange.css";

import PopoverComp from "@/components/core/PopoverComp";

import { baseCssMiniItems } from "../Pulse";
import { cn } from "@/lib/utils";
import { BoardType } from "@/types/boardTypes";
import { PulseType } from "@/types/pulseTypes";

type TimelineProps = {
  board: BoardType;
  pulse: PulseType;
};

const Timeline = ({ board, pulse }: TimelineProps) => {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleOnChange = (item: any) => {
    setState([item.selection]);
  };

  return (
    <PopoverComp
      classNames={{
        trigger: "h-full",
        content:
          "bg-main-fg p-2 shadow-lg shadow-foreground w-full rounded-sm overflow-hidden",
      }}
      trigger={
        <h1 className={cn(baseCssMiniItems(), "timeline-block")}>
          {"TimeLine"}
        </h1>
      }
      content={
        <>
          <DateRange
            className="bg-transparent"
            classNames={{}}
            ranges={state}
            onChange={handleOnChange}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
          />
        </>
      }
    />
  );
};

export default memo(Timeline);
