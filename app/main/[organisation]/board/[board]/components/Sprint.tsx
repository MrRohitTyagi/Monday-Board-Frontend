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
import { Plus } from "lucide-react";
import { createPulse } from "@/gateways/pulse-gateway";
import Loader from "@/components/core/Loader";
import { toast } from "sonner";
import SprintSkeletonLoader from "./SprintBlocks/SprintSkeletonLoader";
import CustomDiv from "@/components/core/CustomDiv";
import { BoardType } from "@/types/boardTypes";
import { SprintType } from "@/types/sprintTypes";
import SprintCollapsed from "./SprintBlocks/SprintCollapsed";
import SprintActions from "./SprintBlocks/SprintActions";
import SprintLeftColor from "./SprintBlocks/SprintLeftColor";

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
          <SprintActions
            isExpanded={isExpanded}
            sprint={sprint}
            setIsExpanded={setIsExpanded}
            setSprint={setSprint}
          />
        </div>
      </div>
      <Space />

      {/* pulses */}
      {isExpanded ? (
        <ScrollWrapper
          className={cn(
            "overflow-x-auto",
            "grid grid-cols-[20rem_1fr]",
            "scrollbar-none"
          )}
        >
          <div className="pulse-container-left flex flex-row z-10 sticky left-0">
            <SprintLeftColor color={sprint.color} />
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
          <div className="pulse-container-right flex flex-col w-full">
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
          </div>
        </ScrollWrapper>
      ) : (
        <SprintCollapsed sprint={sprint} setSprint={setSprint} />
      )}
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
        "flex flex-row items-center justify-start h-10",
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
};
const PulseWrapper = memo(({ children }: PulseWrapperType) => {
  return children;
});

export default memo(Sprint);
