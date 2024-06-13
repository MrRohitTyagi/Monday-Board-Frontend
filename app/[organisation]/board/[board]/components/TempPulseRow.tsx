import { cn } from "@/lib/utils";
import React from "react";
import { baseCss, baseCssMiniItems, pulseRestCcrollerCss } from "./Pulse";
import { MessageCircleMore } from "lucide-react";
type TempPulseRowProps = { color: string };

const TempPulseRow = ({ color }: TempPulseRowProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start h-10",
        "overflow-hidden",
        "rounded-tl-md",
        "bg-main-light",
        "transition-all duration-200",
        "hover:bg-main-bg",
        "active:bg-main-active-dark"
      )}
    >
      {/* LEFT COLOR  */}
      <div
        style={{ background: color }}
        className="left-border w-2 h-full shrink-0"
      />

      <div
        className={cn(
          "border-border-light border-[1px] w-full h-full flex ",
          "flex-row items-center justify-start pl-2 shrink-0"
        )}
      >
        {/* Pulse title  */}
        <div className={cn(baseCss, "text-ellipsis", "shrink-0")}>{"Item"}</div>
        {/* ----------------------------------------------------------- */}

        <div className={pulseRestCcrollerCss}>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(12), "openchat-to")}>
            <MessageCircleMore size={"20px"} />
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "timeline-block")}>
            Timeline
          </div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "assigned-to")}>Assigned</div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "priority")}>Priority</div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "status-block")}>Status</div>
          {/* ----------------------------------------------------------------------- */}
          <div className={cn(baseCssMiniItems(), "pulse-tag")}>Tag</div>
        </div>
        {/* ----------------------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default TempPulseRow;
