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
import { timeBetween } from "@/utils/helperFunctions";
import { isEmpty } from "lodash";

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

  const { twoDates, days } = useMemo(() => {
    if (isEmpty(pulse.timeline)) return { twoDates: "", days: "" };
    const { twoDates, days } = timeBetween(
      pulse?.timeline?.start || "",
      pulse?.timeline?.end || ""
    );
    return { twoDates, days: days ? days + "d" : "" };
  }, [pulse.timeline]);

  return (
    <PopoverComp
      classNames={{
        trigger: "h-full",
        content:
          "bg-main-fg p-2 shadow-lg shadow-foreground w-full rounded-sm overflow-hidden",
      }}
      trigger={
        <div
          className={cn(
            baseCssMiniItems(),
            "timeline-block",
            "px-2 group swap"
          )}
        >
          <h1
            className={cn(
              "between-dates group-hover:hidden",
              "text-ellipsis overflow-hidden text-center"
            )}
          >
            {twoDates}
          </h1>

          <h1
            className={cn(
              "only-days hidden group-hover:flex",
              "text-ellipsis overflow-hidden text-center"
            )}
          >
            {days}
          </h1>
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

export default memo(Timeline);
