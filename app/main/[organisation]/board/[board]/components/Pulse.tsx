"use client";

import React, {
  createContext,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { startCase } from "lodash";
import { MessageCircleMore } from "lucide-react";

import { cn } from "@/lib/utils";
import Status from "./PulseBlocks/Status";

import TimeLine from "./PulseBlocks/TimeLine";
import Priority from "./PulseBlocks/Priority";
import Assigned from "./PulseBlocks/Assigned";
import PulseTitle from "./PulseBlocks/PulseTitle";
import { updatePulse } from "@/gateways/pulse-gateway";
import PulseTag from "./PulseBlocks/PulseTag";
import { useParams, useRouter } from "next/navigation";
import CustomDiv from "@/components/core/CustomDiv";

import { PulseType } from "@/types/pulseTypes";
import { SprintType } from "@/types/sprintTypes";
import { BoardType } from "@/types/boardTypes";
import { UserType } from "@/types/userTypes";
import useRealtimeChannels from "@/hooks/useRealtimeChannels";

type PulseProps = {
  pulse: PulseType;
  sprint: SprintType;
  board: BoardType;
  index?: number;
  isLast?: boolean;
  leftPart?: boolean;
  isFake?: boolean;
  setSprint?: React.Dispatch<React.SetStateAction<SprintType>>;
};
// max-w-40 max-w-12 min-w-40 min-w-12
export const baseCssMiniItems = (w = 40) =>
  cn(
    "text-sm text-center tracking-wider",
    `max-w-${w} min-w-${w} h-full`,
    "content-around shrink-0 text-center tracking-wider text-nowrap",
    "border-pulse-divider border-r-[1px] cursor-pointer"
  );

type PulseContextType = {
  setPulse: React.Dispatch<React.SetStateAction<PulseType>>;
  updatePriority: (p: string) => void;
  updateTitle: (p: string) => void;
  updateTag: (p: string) => void;
  updateStatus: (p: string) => void;
  updateTimeline: (p: { start: string; end: string }) => void;
  updateAssigned: (p: UserType, action?: "add" | "remove") => void;
};
const PulseContext = createContext<PulseContextType>({} as PulseContextType);

const Pulse = ({
  pulse: mainPulse,
  sprint,
  isFake,
  leftPart,
  setSprint,
  board,
}: PulseProps) => {
  const [pulse, setPulse] = useState<PulseType>(mainPulse);

  const { notificationChannel } = useRealtimeChannels();

  const debounceRef = useRef<any>();
  const router = useRouter();
  const params = useParams();

  const debouncePulseUpdate = (data: any) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updatePulse({ ...data, _id: pulse._id });
    }, 1000);
  };

  const updateStatus = useCallback((status: string) => {
    debouncePulseUpdate({ status });
    setPulse((prev) => ({ ...prev, status: status }));
  }, []);

  const updatePriority = useCallback((priority: string) => {
    debouncePulseUpdate({ priority });
    setPulse((prev) => ({ ...prev, priority: priority }));
  }, []);

  const updateTitle = useCallback((title: string) => {
    debouncePulseUpdate({ title });
    setPulse((prev) => ({ ...prev, title: title }));
  }, []);

  const updateTag = useCallback((tag: string) => {
    debouncePulseUpdate({ tag });
    setPulse((prev) => ({ ...prev, tag: tag }));
  }, []);

  const updateAssigned = useCallback(
    (user: UserType, action = "add") => {
      setPulse((prev) => {
        let assigned = [];
        if (action == "remove") {
          assigned = prev.assigned.filter((a) => a !== user._id);
        } else {
          notificationChannel.publish(user._id, { type: "ASSIGNED" });
          assigned = [user._id, ...prev.assigned];
        }
        debouncePulseUpdate({ assigned: assigned, boardId: params?.board });
        return { ...prev, assigned };
      });
    },
    [params, notificationChannel]
  );

  const updateTimeline = useCallback(
    (timeline: { start: string; end: string }) => {
      debouncePulseUpdate({ timeline });
      setPulse((prev) => ({ ...prev, timeline: timeline }));
    },
    []
  );

  useEffect(() => {
    setPulse(mainPulse);
  }, [mainPulse]);

  const isPulseChatOpen = params?.pulse_id === pulse._id;

  return (
    <PulseContext.Provider
      value={{
        setPulse,
        updateStatus,
        updatePriority,
        updateTitle,
        updateTimeline,
        updateTag,
        updateAssigned,
      }}
    >
      <div
        className={cn(
          "flex flex-row items-center justify-start h-full",
          "bg-main-light pl-2",
          "border-pulse-divider border-[1px]",
          isFake === false && "hover:bg-main-fg transition-all duration-150",
          "active:bg-main-active-dark transition-all duration-150",
          isPulseChatOpen && "!bg-main-active-dark"
        )}
      >
        {/* Pulse title  */}
        {leftPart === true && isFake ? (
          <h2
            className={cn(
              "pulse-title",
              "w-full text-sm  content-around",
              "text-ellipsis overflow-hidden text-nowrap",
              isFake === true && "text-center tracking-wider"
            )}
          >
            {startCase(pulse.title)}
          </h2>
        ) : (
          <PulseTitle pulse={pulse} />
        )}
        {leftPart === false && (
          <div
            className={cn(
              "w-full h-full flex flex-row items-center justify-start",
              "pulse-rest-scroller shrink-0"
            )}
          >
            {/* ----------------------------------------------------------------------- */}
            <div
              onClick={() =>
                isFake === false &&
                router.push(`${board._id}/pulse/${pulse._id}`)
              }
              className={cn(
                baseCssMiniItems(12),
                "openchat-to flex flex-row items-center justify-center",
                "cursor-pointer"
              )}
            >
              <CustomDiv lvl={20} disabled={isFake}>
                <MessageCircleMore
                  size={"24px"}
                  className={
                    isPulseChatOpen ? "text-highlighter" : "text-white"
                  }
                />
              </CustomDiv>
            </div>
            {/* ----------------------------------------------------------------------- */}
            {isFake === true ? (
              <div className={cn(baseCssMiniItems(), "timeline-block")}>
                {pulse.timeline.start}
              </div>
            ) : (
              <TimeLine pulse={pulse} board={board} setPulse={setPulse} />
            )}

            {/*  PRIORITY ----------------------------------------------------------------------- */}
            {isFake === true ? (
              <div className={cn(baseCssMiniItems(), "priority")}>
                {pulse.priority}
              </div>
            ) : (
              <Priority board={board} pulse={pulse} />
            )}
            {/* -------------------------------------------------------------------------------- */}

            {/* ASSIGNED ----------------------------------------------------------------------- */}
            {isFake === true ? (
              <div className={cn(baseCssMiniItems(), "assigned-to")}>
                Assigned
              </div>
            ) : (
              <Assigned pulse={pulse} board={board} setPulse={setPulse} />
            )}
            {/* ----------------------------------------------------------------------- */}

            {/*STATUS ----------------------------------------------------------------------- */}
            {isFake === true ? (
              <div className={cn(baseCssMiniItems(), "status-block")}>
                {pulse.status}
              </div>
            ) : (
              <Status pulse={pulse} board={board} />
            )}
            {/* ----------------------------------------------------------------------- */}

            {isFake ? (
              <div
                className={cn(baseCssMiniItems(), "pulse-tag")}
                style={{ color: sprint.color }}
              >
                {pulse.tag}
              </div>
            ) : (
              <PulseTag pulse={pulse} sprint={sprint} />
            )}
          </div>
        )}
      </div>
    </PulseContext.Provider>
  );
};
export { PulseContext };
export default memo(Pulse);
