"use client";

import React, {
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { startCase } from "lodash";

import Space from "@/components/core/Space";

import { cn } from "@/lib/utils";

import Pulse from "./Pulse";
import ScrollWrapper from "@/components/core/ScrollWrapper";
import { getSprint } from "@/gateways/sprint-gateway";
import PopoverComp from "@/components/core/PopoverComp";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import TooltipComp from "@/components/core/TooltipComp";
import DialogueComp from "@/components/core/DialogueComp";
import EditSprintForm from "./EditSprintForm";
import { createPulse } from "@/gateways/pulse-gateway";
import Loader from "@/components/core/Loader";
import { toast } from "sonner";
import useBoardContext from "@/hooks/useBoardContext";
import SprintSkeletonLoader from "./SprintSkeletonLoader";
import CustomDiv from "@/components/core/CustomDiv";
import { BoardType } from "@/types/boardTypes";
import { SprintType } from "@/types/sprintTypes";

const tempPulse = {
  _id: "temp-pulse",
  priority: "Priority",
  status: "Status",
  title: "Item",
  assigned: ["Assigned"],
  timeline: { start: "Timeline" },
  tag: "# Tag",
};

type SprintProps = { sprintID: string; board: BoardType };

const Sprint = ({ sprintID, board }: SprintProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sprint, setSprint] = useState<SprintType>({} as SprintType);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    (async function init() {
      const fetchedSprint = await getSprint(sprintID);
      setSprint(fetchedSprint);
      setIsloading(false);
    })();
  }, [sprintID]);

  // return <SprintSkeletonLoader />;

  return isloading === true ? (
    <SprintSkeletonLoader />
  ) : (
    <div className={cn(`w-full animate-fadeIn`)}>
      <div
        className={cn(
          "cursor-pointer",
          "hover:bg-main-bg w-fit rounded-sm pr-4 pl-2",
          "sprint-title flex flex-row gap-3 items-center"
        )}
      >
        <h2 className="text-xl" style={{ color: sprint.color }}>
          {startCase(sprint.title)}
        </h2>
        <div className="sprint-handlers cursor-pointer">
          <PopoverComp
            classNames={{ content: "sprint-title-popover bg-main-fg" }}
            trigger={<SlidersHorizontal size={15} />}
            content={
              <div className="sprint-expand-collapse flex felx-row gap-4">
                <EditSprint sprint={sprint} setSprint={setSprint}>
                  <Button
                    className="px-2 border-none"
                    onClick={() => setIsExpanded((p) => !p)}
                  >
                    <TooltipComp title={"Edit Sprint"} className="px-3 py-2">
                      <Edit size={20} color="white" />
                    </TooltipComp>
                  </Button>
                </EditSprint>

                {/* Sprint edit  */}
                <Button
                  className="px-2 border-none"
                  onClick={() => setIsExpanded((p) => !p)}
                >
                  <TooltipComp
                    title={isExpanded ? "Expand" : "Collapse"}
                    className="px-3 py-2"
                  >
                    {isExpanded ? (
                      <ChevronUp size={20} color="white" />
                    ) : (
                      <ChevronDown size={20} color="white" />
                    )}
                  </TooltipComp>
                </Button>
              </div>
            }
          />
        </div>
      </div>
      <Space />

      {/* pulses */}
      <div className="grid grid-cols-[20rem_1fr]">
        <div className="pulse-container-left flex flex-row">
          <div
            style={{ background: sprint.color }}
            className={cn(
              "left-color w-2 h-full shrink-0",
              "rounded-tl-md",
              "rounded-bl-md"
            )}
          />
          <div className="pulse-container-left w-full flex flex-col overflow-hidden">
            {/* <TempPulseRow color={sprint.color} /> */}

            <PulseWrapper>
              <Pulse
                pulse={tempPulse}
                board={board}
                sprint={sprint}
                leftPart={true}
                isFake={true}
              />
            </PulseWrapper>

            {sprint.pulses.map((pulse, i) => {
              return (
                <PulseWrapper key={pulse._id + i + "left"}>
                  <Pulse
                    setSprint={setSprint}
                    isFake={false}
                    pulse={pulse}
                    board={board}
                    sprint={sprint}
                    leftPart={true}
                  />
                </PulseWrapper>
              );
            })}
            {/* // Create new Pulse */}
            <PulseWrapper>
              <CreateNewPulse setSprint={setSprint} sprint={sprint} />
            </PulseWrapper>
          </div>
        </div>

        {/* RIGHT PART  */}
        <ScrollWrapper className="pulse-container-right flex flex-col w-full overflow-x-auto">
          <PulseWrapper>
            <Pulse
              board={board}
              pulse={tempPulse}
              sprint={sprint}
              leftPart={false}
              isFake={true}
            />
          </PulseWrapper>
          {sprint.pulses.map((pulse, i) => {
            return (
              <PulseWrapper key={pulse._id + i + "right"}>
                <Pulse
                  setSprint={setSprint}
                  board={board}
                  isFake={false}
                  pulse={pulse}
                  sprint={sprint}
                  leftPart={false}
                />
              </PulseWrapper>
            );
          })}
        </ScrollWrapper>
      </div>
    </div>
  );
};

type CreateNewPulseProps = {
  setSprint: React.Dispatch<SetStateAction<SprintType>>;
  sprint: SprintType;
};
const newPulse = { title: "New item" };
const CreateNewPulse = ({ setSprint, sprint }: CreateNewPulseProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  //
  const handleCreateNewpulse = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const pulse = await createPulse({ ...newPulse, sprint: sprint._id });

      setSprint((ps) => {
        return { ...ps, pulses: [...ps.pulses, pulse] };
      });
      setIsSubmitting(false);
    } catch (error: any) {
      toast.error(error?.message || "Unable to create pulse");
      setIsSubmitting(false);
    }
  }, [setSprint, sprint._id]);

  return (
    <CustomDiv
      className={cn(
        "flex flex-row items-center justify-start h-full",
        "bg-main-bg pl-2 opacity-80",
        "border-border-light border-[1px]",
        "hover:bg-main-fg transition-all duration-150",
        "active:bg-highlighter-dark transition-all duration-150",
        " rounded-br-lg animate-fadeIn"
      )}
      onClick={handleCreateNewpulse}
      disabled={isSubmitting}
    >
      <div
        className={cn(
          "pulse-title",
          "w-full text-sm content-around",
          "text-ellipsis overflow-hidden text-nowrap",
          "text-center tracking-wider",
          "Create-new-pulse flex flex-row items-center",
          "gap-2 justify-center cursor-pointer",
          "font-bold"
        )}
      >
        <h2>
          {isSubmitting ? "Creating new pulse item ..." : "Ceate New Pulse"}
        </h2>
        {isSubmitting ? <Loader /> : <Plus color="white" size={20} />}
      </div>
    </CustomDiv>
  );
};

const PulseWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "h-10 w-full animate-fadeIn",
        "transition-all duration-300",
        "hover:bg-main-bg",
        "active:bg-highlighter-dark"
      )}
    >
      {children}
    </div>
  );
};
type EditSprintProps = {
  children: React.ReactNode;
  sprint: SprintType;
  setSprint: React.Dispatch<React.SetStateAction<SprintType>>;
};
const EditSprint = ({ children, sprint, setSprint }: EditSprintProps) => {
  //
  const { setCurrentBoard, board } = useBoardContext();

  const [openSprintEditForm, setOpenSprintEditForm] = useState(false);
  return (
    <DialogueComp
      setOpen={setOpenSprintEditForm}
      open={openSprintEditForm}
      trigger={children}
    >
      <EditSprintForm
        setSprint={setSprint}
        onClose={() => setOpenSprintEditForm(false)}
        sprint={sprint}
        board={board}
        setCurrentBoard={setCurrentBoard}
      />
    </DialogueComp>
  );
};

export default memo(Sprint);
