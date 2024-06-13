"use client";

import React from "react";
import { startCase } from "lodash";

import { PulseType, SprintType } from "@/zstore";
import { cn } from "@/lib/utils";
import TempPulseRow from "./TempPulseRow";
import { MessageCircleMore } from "lucide-react";

type PulseProps = {
  pulse: PulseType;
  sprint: SprintType;
  index: number;
  isLast: boolean;
  isFake: boolean;
};
const Pulse = ({ pulse, sprint, index, isLast, isFake }: PulseProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start h-10",
        "overflow-hidden",
        index === 0 ? "rounded-tl-md" : "",
        isLast ? "rounded-bl-md" : "",
        "bg-main-light",
        "transition-all duration-200",
        "hover:bg-main-bg",
        "active:bg-main-active-dark"
      )}
    >
      {/* LEFT COLOR  */}
      <div
        style={{ background: sprint.color }}
        className="left-border w-2 h-full shrink-0"
      />
      <div
        className={cn(
          "border-border-light border-[1px] w-full h-full flex ",
          "flex-row items-center justify-start pl-2 shrink-0"
        )}
      >
        {/* Pulse title  */}
        <div
          className={cn(
            "pulse-title",
            "text-sm opacity-80 max-w-80 min-w-80 h-full content-around",
            "text-ellipsis overflow-hidden text-nowrap",
            "border-r-[1px] border-pulse-divider shrink-0",
            isFake ? "text-center tracking-wider" : ""
          )}
        >
          {startCase(pulse.title)}
        </div>
        <div className={pulseRestCcrollerCss}>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(12), "openchat-to")}>
            <MessageCircleMore size={"20px"} />
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "timeline-block")}>
            {pulse.timeline}
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "assigned-to")}>Assigned</div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "priority")}>
            {pulse.priority}
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "status-block")}>
            {pulse.status}
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div
            className={cn(baseCssMiniItems(), "pulse-tag")}
            style={{ color: sprint.color }}
          >
            {pulse.tag}
          </div>
        </div>
      </div>
    </div>
  );
};
// max-w-40 max-w-12 min-w-40 min-w-12
const baseCssMiniItems = (w = 40) => `text-sm text-center tracking-wider 
  opacity-80 max-w-${w} min-w-${w} h-full  
  content-around shrink-0 text-center tracking-wider text-nowrap 
  border-r-[1px] border-pulse-divider`;

const baseCss = `text-sm text-center tracking-wider  
  opacity-80 max-w-80 min-w-80 h-full 
  content-around text-nowrap overflow-hidden border-r-[1px] border-pulse-divider  
  shrink-0`;

const pulseRestCcrollerCss = `border-border-light border-[1px] w-full h-full flex  
  flex-row items-center justify-start pl-2 pulse-rest-scroller overflow-x-scroll  
  shrink-0`;

export { baseCssMiniItems, baseCss, pulseRestCcrollerCss };
export default Pulse;
