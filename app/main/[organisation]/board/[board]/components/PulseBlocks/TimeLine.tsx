import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, Range } from "react-date-range";
import "./css/dateRange.css";

import PopoverComp from "@/components/core/PopoverComp";

import { PulseContext, baseCssMiniItems } from "../Pulse";
import { cn } from "@/lib/utils";
import { BoardType } from "@/types/boardTypes";
import { PulseType } from "@/types/pulseTypes";
import { StateSetter } from "@/types/genericTypes";

type TimelineProps = {
  board: BoardType;
  pulse: PulseType;
  setPulse: StateSetter<PulseType>;
};

const Timeline = ({ board, pulse, setPulse }: TimelineProps) => {
  const { updateTimeline } = useContext(PulseContext);
  // const [state, setState] = useState<Range[]>([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);

  const state = useMemo(() => {
    const obj = {
      startDate: pulse?.timeline?.start
        ? new Date(pulse?.timeline?.start)
        : new Date(),
      endDate: pulse?.timeline?.end
        ? new Date(pulse?.timeline?.end)
        : new Date(),
      key: "selection",
    };
    return [obj];
  }, [pulse.timeline]);

  console.log(`%c state `, "color: orange;border:2px solid cyan", state);
  console.log(`%c pulse `, "color: pink;border:1px solid pink", pulse);

  const handleOnChange = useCallback(
    (item: any) => {
      const { startDate, endDate } = item.selection;

      const timeline = {
        end: endDate?.toISOString(),
        start: startDate?.toISOString(),
      };

      setPulse((pp) => ({
        ...pp,
        timeline: timeline,
      }));

      updateTimeline(timeline);
    },
    [setPulse, updateTimeline]
  );

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
