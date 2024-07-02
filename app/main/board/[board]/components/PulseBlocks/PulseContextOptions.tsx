"use client";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowBigRight,
  Copy,
  MoveRight,
  SquareArrowOutUpRightIcon,
  SquareArrowRight,
  Trash2,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TooltipComp from "@/components/core/TooltipComp";
import { useRouter } from "next/navigation";
import useBoardContext from "@/hooks/useBoardContext";
import { PulseType } from "@/types/pulseTypes";
import Divider from "@/components/core/Divider";

import { StateSetter } from "@/types/genericTypes";
import { SprintType } from "@/types/sprintTypes";
import PopoverComp from "@/components/core/PopoverComp";
import { useAuth } from "@/zstore";
import Loader from "@/components/core/Loader";
import { startCase } from "lodash";
import { SelectedPulseContext } from "@/hooks/useSelectedPulses";

type PulseContextOptionsProps = {
  pulse: PulseType;
  setSprint: StateSetter<SprintType>;
  sprint: SprintType;
  duplicatePulse: (
    pulse: PulseType,
    type: "WITH_UPDATES" | "WITHOUT_UPDATES"
  ) => void;
};

const PulseContextOptions = ({
  pulse,
  duplicatePulse,
  sprint: currentSprint,
}: PulseContextOptionsProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { board } = useBoardContext();

  const { deleteAllSelected, moveFromTo } = useContext(SelectedPulseContext);

  return (
    <div
      className={cn(
        "shadow-xl shadow-main-bg items-start w-48",
        "flex flex-col p-2 bg-main-fg rounded-lg gap-0.5",
        "border border-border-light overflow-hidden"
      )}
    >
      {/* ///////////////////////////////  Copy name */}
      <Button
        onClick={() => {
          navigator.clipboard.writeText(pulse.title);
        }}
        variant={"ghost"}
        className={cn(
          "w-full",
          " gap-2 text-start w-row justify-start",
          "grid grid-cols-[1.5rem_1fr]"
        )}
      >
        <Type size={20} className="stroke-text-color" />
        <h1>Copy name</h1>
      </Button>
      <Divider className="h-0.5" />
      {/* ///////////////////////////////  Open Task*/}
      <Button
        onClick={() => {
          router.push(`/main/board/${board._id}/pulse/${pulse._id}`);
        }}
        variant={"ghost"}
        className={cn(
          "w-full",
          " gap-2 text-start w-row justify-start",
          "grid grid-cols-[1.5rem_1fr]"
        )}
      >
        <SquareArrowOutUpRightIcon size={20} className="stroke-text-color" />
        <h1>Open item</h1>
      </Button>
      <Divider className="h-0.5" />
      {/* ///////////////////////////////////MOVE TO  */}

      <TooltipComp
        side="right"
        title={
          <div
            // className="p-2 w-full w-col gap-2 px-4"
            className={cn(
              "shadow-xl shadow-main-bg items-start ",
              "w-fit",
              "flex flex-col py-2 px-1 bg-main-fg rounded-lg gap-2",
              "border border-border-light overflow-hidden"
            )}
          >
            {user.boards.map((board) => {
              return board.sprints.map((sprint) => {
                if (sprint._id === currentSprint._id) return null;
                return (
                  <Button
                    key={sprint._id}
                    onClick={() => {
                      const payload = {
                        [pulse._id]: {
                          ...pulse,
                          sprintID: currentSprint._id,
                        },
                      };
                      moveFromTo(sprint._id, payload);
                    }}
                    className={cn(
                      "w-full w-row",
                      // "hover:bg-main-fg ",
                      "gap-2 justify-start"
                    )}
                    variant="ghost"
                  >
                    <div
                      className="rounded-full h-3 w-3"
                      style={{ background: sprint.color }}
                    />
                    <h1 className="capitalize">{sprint.title}</h1>
                  </Button>
                );
              });
            })}
          </div>
        }
      >
        <Button
          variant={"ghost"}
          className={cn(
            "w-full",
            " gap-2 text-start w-row justify-start",
            "grid grid-cols-[1.5rem_1fr]"
          )}
        >
          <ArrowBigRight size={22} className="stroke-text-color" />
          <h1>Move to</h1>
        </Button>
      </TooltipComp>

      {/* /////////////////////////// DUPLICATE  */}
      <TooltipComp
        side="right"
        title={
          <div
            className={cn(
              "shadow-xl shadow-main-bg items-start ",
              "w-fit",
              "flex flex-col py-2 px-1 bg-main-fg rounded-lg gap-2",
              "border border-border-light overflow-hidden"
            )}
          >
            <Button
              variant={"ghost"}
              className={cn(
                "w-full",
                " gap-2 text-start w-row justify-start",
                "grid grid-cols-[1.5rem_1fr]"
              )}
              onClick={() => {
                duplicatePulse(pulse, "WITH_UPDATES");
              }}
            >
              <h1>Duplicate With Updates</h1>
            </Button>

            <Button
              onClick={() => {
                duplicatePulse(pulse, "WITHOUT_UPDATES");
              }}
              variant={"ghost"}
              className={cn(
                "w-full",
                " gap-2 text-start w-row justify-start",
                "grid grid-cols-[1.5rem_1fr]"
              )}
            >
              <h1>Duplicate without updates</h1>
            </Button>
          </div>
        }
      >
        <Button
          onClick={() => {
            duplicatePulse(pulse, "WITHOUT_UPDATES");
          }}
          variant={"ghost"}
          className={cn(
            "w-full",
            " gap-2 text-start w-row justify-start",
            "grid grid-cols-[1.5rem_1fr]"
          )}
        >
          <Copy size={20} className="stroke-text-color" />
          <h1>Duplicate</h1>
        </Button>
      </TooltipComp>
      <Divider className="h-0.5" />

      <Button
        onClick={() => {
          const payload = {
            [pulse._id]: { ...pulse, sprintID: currentSprint._id },
          };
          deleteAllSelected(payload);
        }}
        variant={"ghost"}
        className={cn(
          "w-full",
          " gap-2 text-start w-row justify-start",
          "grid grid-cols-[1.5rem_1fr]"
        )}
      >
        <Trash2 size={20} className="stroke-text-color" />
        <h1>Delete</h1>
      </Button>
    </div>
  );
};

export default PulseContextOptions;
