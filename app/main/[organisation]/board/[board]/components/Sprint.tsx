"use client";

import React, {
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isEmpty, startCase } from "lodash";

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
import { useConfig } from "@/store/configStore";

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

  const {
    filters: { [board._id]: filterPerBoard },
  } = useConfig();
  console.log(
    `%c filterPerBoard `,
    "color: orange;border:2px solid cyan",
    filterPerBoard
  );
  const {
    priority: configPriority = "",
    status: configStatus = "",
    search: configSearch = "",
    user: configUser = "",
  } = filterPerBoard || {};

  useEffect(() => {
    (async function init() {
      const fetchedSprint = await getSprint(sprintID);
      setSprint(fetchedSprint);
      setIsloading(false);
    })();
  }, [sprintID]);

  const filteredSprint = useMemo(() => {
    if (isEmpty(sprint)) return {} as SprintType;
    const obj = { ...sprint };
    obj.pulses = obj.pulses.filter((p) => {
      if (
        p.isNew === true ||
        ((configPriority === "" || p.priority === configPriority) &&
          (configStatus === "" || p.status === configStatus) &&
          (configSearch === "" ||
            p.title.toLowerCase().includes(configSearch)) &&
          (configUser === "" || p.assigned.includes(configUser)))
      ) {
        return true;
      } else return false;
    });
    return obj;
  }, [sprint, configPriority, configStatus, configSearch, configUser]);

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
      <ScrollWrapper
        className={cn(
          "overflow-x-auto",
          "grid grid-cols-[20rem_1fr]",
          "scrollbar-none"
        )}
      >
        <div className="pulse-container-left flex flex-row z-10 sticky left-0">
          <div
            style={{ background: sprint.color }}
            className={cn(
              "sprint-color-div",
              " left-color w-2 h-full shrink-0",
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

            {filteredSprint.pulses.map((pulse, i) => {
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
        <div className="pulse-container-right flex flex-col w-full">
          <PulseWrapper isRight={true}>
            <Pulse
              board={board}
              pulse={tempPulse}
              sprint={sprint}
              leftPart={false}
              isFake={true}
            />
          </PulseWrapper>
          {filteredSprint.pulses.map((pulse, i) => {
            return (
              <PulseWrapper key={pulse._id + i + "right"} isRight={true}>
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
        </div>
      </ScrollWrapper>
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
        return { ...ps, pulses: [...ps.pulses, { ...pulse, isNew: true }] };
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
          {isSubmitting ? "Creating new pulse item ..." : "Create New Pulse"}
        </h2>
        {isSubmitting ? <Loader /> : <Plus color="white" size={20} />}
      </div>
    </CustomDiv>
  );
};

type PulseWrapperType = {
  children: React.ReactNode;
  isRight?: boolean;
};
const PulseWrapper = ({ children, isRight }: PulseWrapperType) => {
  return (
    <div
      className={cn(
        "h-10",
        // isRight ? "w-fit" :
        "w-full",
        "animate-fadeIn",
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
