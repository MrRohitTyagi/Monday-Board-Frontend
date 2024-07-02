"use client";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowBigRight,
  Copy,
  SquareArrowOutUpRightIcon,
  Trash2,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TooltipComp from "@/components/core/TooltipComp";
import { useRouter } from "next/navigation";
import useBoardContext from "@/hooks/useBoardContext";
import { PulseType } from "@/types/pulseTypes";
import Divider from "@/components/core/Divider";
import { PulseContext } from "../Pulse";
import { StateSetter } from "@/types/genericTypes";
import { SprintType } from "@/types/sprintTypes";

type PulseContextOptionsProps = {
  pulse: PulseType;
  setSprint: StateSetter<SprintType>;
  duplicatePulse: (
    pulse: PulseType,
    type: "WITH_UPDATES" | "WITHOUT_UPDATES"
  ) => void;
};

const PulseContextOptions = ({
  pulse,
  duplicatePulse,
}: PulseContextOptionsProps) => {
  const router = useRouter();
  const { board } = useBoardContext();

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
        className="w-full gap-2 text-start w-row justify-start"
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
        className="w-full gap-2 text-start w-row justify-start"
      >
        <SquareArrowOutUpRightIcon size={20} className="stroke-text-color" />
        <h1>Open Task</h1>
      </Button>
      <Divider className="h-0.5" />
      {/* ///////////////////////////////////MOVE TO  */}

      <TooltipComp
        title={
          <div
            className={cn(
              "shadow-xl shadow-main-bg items-start ",
              "w-fit",
              "flex flex-col py-2 px-1 bg-main-fg rounded-lg gap-2",
              "border border-border-light overflow-hidden"
            )}
          >
            dsadsadsadsa
          </div>
        }
        side="right"
      >
        <Button
          variant={"ghost"}
          className="w-full gap-2 text-start w-row justify-start"
        >
          <ArrowBigRight size={22} className="stroke-text-color" />
          <h1>Move to</h1>
        </Button>
      </TooltipComp>

      {/* /////////////////////////// DUPLICATE  */}
      <TooltipComp
        className="z-[999]"
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
              className={cn("w-full gap-2 text-start w-row justify-start")}
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
              className={cn("w-full gap-2 text-start w-row justify-start")}
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
          className="w-full gap-2 text-start w-row justify-start"
        >
          <Copy size={20} className="stroke-text-color" />
          <h1>Duplicate</h1>
        </Button>
      </TooltipComp>
      <Divider className="h-0.5" />
      <Button
        variant={"ghost"}
        className="w-full gap-2 text-start w-row justify-start"
      >
        <Trash2 size={20} className="stroke-text-color" />
        <h1>Delete</h1>
      </Button>
    </div>
  );
};

export default PulseContextOptions;
