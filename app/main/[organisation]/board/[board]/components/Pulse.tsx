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

import { BoardType, PulseType, SprintType } from "@/zstore";
import { cn } from "@/lib/utils";
import Status from "./PulseBlocks/Status";

import TimeLine from "./PulseBlocks/TimeLine";
import Priority from "./PulseBlocks/Priority";
import Assigned from "./PulseBlocks/Assigned";
import PulseTitle from "./PulseBlocks/PulseTitle";
import { updatePulse } from "@/gateways/pulse-gateway";
import PulseTag from "./PulseBlocks/PulseTag";
import usePulseChat from "@/hooks/usePulseChat";
import { useRouter } from "next/navigation";

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
  const debounceRef = useRef<any>();
  const router = useRouter();

  // const { openPulseChatLayer } = usePulseChat();

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

  return (
    <PulseContext.Provider
      value={{
        setPulse,
        updateStatus,
        updatePriority,
        updateTitle,
        updateTimeline,
        updateTag,
      }}
    >
      <div
        className={cn(
          "flex flex-row items-center justify-start h-full",
          "bg-main-light pl-2",
          "border-pulse-divider border-[1px]",
          "hover:bg-main-fg transition-all duration-150",
          "active:bg-main-active-dark transition-all duration-150"
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
              <MessageCircleMore size={"24px"} />
            </div>
            {/* ----------------------------------------------------------------------- */}
            {isFake === true ? (
              <div className={cn(baseCssMiniItems(), "timeline-block")}>
                {pulse.timeline.start}
              </div>
            ) : (
              <TimeLine pulse={pulse} board={board} />
            )}

            {/*  PRIORITY ----------------------------------------------------------------------- */}
            {isFake === true ? (
              <div
                className={cn(
                  baseCssMiniItems(),
                  "priority",
                  "hover:opacity-60"
                )}
              >
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
              <Assigned pulse={pulse} board={board} />
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
