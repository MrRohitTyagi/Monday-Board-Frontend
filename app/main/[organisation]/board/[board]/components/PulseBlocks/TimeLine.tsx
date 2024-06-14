import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, Range } from "react-date-range";
import "./css/dateRange.css";

import PopoverComp from "@/components/core/PopoverComp";
import { BoardType, PulseType } from "@/zstore";

import { baseCssMiniItems } from "../Pulse";
import { cn } from "@/lib/utils";

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
    console.log(`%c item `, "color: red;border:2px dotted red", item);
    setState([item.selection]);
  };

  return (
    <PopoverComp
      classNames={{
        trigger: "h-full",
        content:
          "bg-transparent p-2 shadow-lg shadow-foreground w-full rounded-sm overflow-hidden",
      }}
      trigger={
        <div className={cn(baseCssMiniItems(), "timeline-block")}>
          {'TimeLine'}
        </div>
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

export default Timeline;
