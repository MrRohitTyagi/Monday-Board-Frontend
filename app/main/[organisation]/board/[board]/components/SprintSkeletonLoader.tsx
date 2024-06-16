import { cn } from "@/lib/utils";
import React from "react";
import { baseCssMiniItems } from "./Pulse";
import Loader from "@/components/core/Loader";

const SprintSkeletonLoader = () => {
  return (
    <>
      <div className="h-8 w-40 bg-main-bg animate-pulse items-center flex felx-row pl-2 rounded-md">
        <Loader />
      </div>
      {[1, 2, 4].map((i) => {
        return (
          <div
            key={i}
            className={cn(
              "animate-pulse duration-1000",
              "skeleton-loader-item !h-10",
              "flex flex-row items-center justify-start h-full",
              "bg-main-light pl-2",
              "border-pulse-divider border-[1px]"
            )}
          >
            {/* Pulse title  */}

            <div
              className={cn(
                "w-full h-full flex flex-row items-center justify-start",
                "pulse-rest-scroller shrink-0"
              )}
            >
              {/* ----------------------------------------------------------------------- */}

              <div className={cn(baseCssMiniItems(), "timeline-block")}></div>

              {/*  PRIORITY ----------------------------------------------------------------------- */}
              <div className={cn(baseCssMiniItems(), "priority")}></div>

              {/* -------------------------------------------------------------------------------- */}

              {/* ASSIGNED ----------------------------------------------------------------------- */}

              <div className={cn(baseCssMiniItems(), "assigned-to")}></div>

              {/* ----------------------------------------------------------------------- */}

              {/*STATUS ----------------------------------------------------------------------- */}

              <div className={cn(baseCssMiniItems(), "status-block")}></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SprintSkeletonLoader;
