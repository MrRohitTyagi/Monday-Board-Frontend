import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { SelectedPulseContext } from "@/hooks/useSelectedPulses";
import { cn } from "@/lib/utils";
import { keys, startCase } from "lodash";
import { SquareArrowRight, Trash2, X } from "lucide-react";
import Loader from "@/components/core/Loader";
import PopoverComp from "@/components/core/PopoverComp";
import useBoardContext from "@/hooks/useBoardContext";
import { useAuth } from "@/zstore";

type SelectedPulsePopupProps = {};
const commonBoxStyle = cn(
  "selected-action-block",
  "py-0 px-0 cursor-pointer",
  "gap-1 h-full",
  "rounded-none group",
  "flex flex-col justify-center items-center"
);

const SelectedPulsePopup = (props: SelectedPulsePopupProps) => {
  //
  const {
    isSaving,
    selected,
    isDeleting,
    deleteAllSelected,
    unSelectAll,
    moveFromTo,
  } = useContext(SelectedPulseContext);

  const { user } = useAuth();
  const disabled = isSaving || isDeleting;

  return keys(selected).length > 0 ? (
    <div
      className={cn(
        "selected-pulse-popup-cont w-full",
        "animate-selected-pupup-up",
        "fixed left-1/2 -translate-x-1/2",
        "flex flex-row justify-center items-center"
      )}
    >
      <div
        className={cn(
          "selected-pulse-popup-content",
          "flex flex-row gap-6 bg-main-bg h-16",
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

        {/* ///////////////////////MOVE TO//////////////////////////// */}

        <PopoverComp
          additional={{ content: { side: "top" } }}
          classNames={{
            content:
              "bg-main-bg p-0 text-color w-fit shadow-2xl shadow-main-fg",
          }}
          content={
            <div className={cn("move-to-cont")}>
              <div className="p-2 w-full w-col gap-2 px-4">
                {user.boards.map((board) => {
                  return board.sprints.map((sprint) => {
                    return (
                      <Button
                        key={sprint._id}
                        onClick={() => {
                          moveFromTo(sprint._id);
                        }}
                        className={cn(
                          "w-full w-row",
                          "hover:bg-main-fg ",
                          "gap-2 justify-start"
                        )}
                        variant="ghost"
                      >
                        <div
                          className="rounded-full h-3 w-3"
                          style={{ background: sprint.color }}
                        />
                        <h1>{startCase(sprint.title)}</h1>
                      </Button>
                    );
                  });
                })}
              </div>
            </div>
          }
          trigger={
            <Button
              disabled={disabled}
              //   onClick={() => {
              //     moveFromTo("TODO");
              //   }}
              variant="ghost"
              className={cn(commonBoxStyle)}
            >
              {isSaving ? (
                <Loader className="h-5 w-5" />
              ) : (
                <SquareArrowRight
                  size={20}
                  className="group-hover:stroke-highlighter"
                />
              )}
              <h1 className="text-sm">{isSaving ? "Moving.." : "Move to"}</h1>
            </Button>
          }
        />

        {/* ///////////////////////// DELETE ////////////////////////// */}

        <Button
          disabled={disabled}
          onClick={deleteAllSelected}
          variant="ghost"
          className={cn(commonBoxStyle)}
        >
          {isDeleting ? (
            <Loader className="h-5 w-5" />
          ) : (
            <Trash2 size={20} className="group-hover:stroke-highlighter" />
          )}
          <h1 className="text-sm">{isDeleting ? "Deleting.." : "Delete"}</h1>
        </Button>

        <Button
          disabled={disabled}
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
