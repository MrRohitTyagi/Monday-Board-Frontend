import React, { useContext } from "react";
import Space from "@/components/core/Space";
import { Button } from "@/components/ui/button";
import { SelectedPulseContext } from "@/hooks/useSelectedPulses";
import { cn } from "@/lib/utils";
import { keys } from "lodash";
import { SquareArrowRight, Trash2, X } from "lucide-react";

type SelectedPulsePopupProps = {};
const commonBoxStyle = cn(
  "selected-action-block",
  "py-0 cursor-pointer",
  "gap-1 h-full",
  "rounded-none group",
  "flex flex-col justify-center items-center"
);

const SelectedPulsePopup = (props: SelectedPulsePopupProps) => {
  //
  const { selected, handleSelect, handleUnSelect, unSelectAll } =
    useContext(SelectedPulseContext);

  return keys(selected).length > 0 ? (
    <div
      className={cn(
        "selected-pulse-popup-cont w-full",
        "animate-selected-pupup-up",
        "fixed left-0 px-6 py-6",
        "flex flex-row justify-center items-center"
      )}
    >
      <div
        className={cn(
          "selected-pulse-popup-content",
          "flex flex-row gap-3 bg-main-bg h-16",
          "border-2 border-border-light w-fit",
          "shadow-2xl shadow-main-fg rounded-lg",
          "overflow-hidden"
        )}
      >
        <div
          className={cn(
            "p-2 w-16",
            "h-full bg-highlighter w-row justify-center"
          )}
        >
          <h1>{keys(selected).length}</h1>
        </div>
        <div className={cn(commonBoxStyle)}>
          <h1 className="">Items selected</h1>
        </div>

        {/* /////////////////////////////////////////////////// */}
        <Button variant="ghost" className={cn(commonBoxStyle)}>
          <SquareArrowRight
            size={20}
            className="group-hover:stroke-highlighter"
          />
          <h1 className="text-sm">Move to</h1>
        </Button>
        {/* /////////////////////////////////////////////////// */}

        <Button variant="ghost" className={cn(commonBoxStyle)}>
          <Trash2 size={20} className="group-hover:stroke-highlighter" />
          <h1 className="text-sm">Delete</h1>
        </Button>

        <Button
          onClick={unSelectAll}
          variant="ghost"
          className={cn(
            commonBoxStyle,
            "border-0 border-l-2 border-l-border-light",
            "w-16"
          )}
        >
          <X size={20} className="group-hover:stroke-highlighter" />
          {/* <h1 className="text-sm">Delete</h1> */}
        </Button>
      </div>
    </div>
  ) : null;
};

export default SelectedPulsePopup;
