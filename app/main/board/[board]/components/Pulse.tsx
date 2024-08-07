"use client";

import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
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
import { deleteSinglePulse, updatePulse } from "@/gateways/pulse-gateway";
import PulseTag from "./PulseBlocks/PulseTag";
import { useParams, useRouter } from "next/navigation";
import CustomDiv from "@/components/core/CustomDiv";

import { PulseType } from "@/types/pulseTypes";
import { SprintType } from "@/types/sprintTypes";
import { BoardType } from "@/types/boardTypes";
import { UserType } from "@/types/userTypes";
import useRealtimeChannels from "@/hooks/useRealtimeChannels";
import { useAuth } from "@/zstore";
import { useConfig } from "@/store/configStore";
import { Checkbox } from "@/components/ui/checkbox";
import Divider from "@/components/core/Divider";
import { SelectedPulseContext } from "@/hooks/useSelectedPulses";
import { StateSetter } from "@/types/genericTypes";

type PulseProps = {
  pulse: PulseType;
  sprint: SprintType;
  board: BoardType;
  index?: number;
  isLast?: boolean;
  leftPart?: boolean;
  isFake?: boolean;
  setSprint?: StateSetter<SprintType>;
};
// max-w-40 max-w-12 min-w-40 min-w-12
export const baseCssMiniItems = (w = 40) =>
  cn(
    "text-sm text-center tracking-wider",
    `max-w-${w} min-w-${w} h-full text-text-color`,
    "content-around shrink-0 text-center tracking-wider text-nowrap",
    "border-border-light border-r-[1px] cursor-pointer"
  );

type PulseContextType = {
  setPulse: StateSetter<PulseType>;
  updatePriority: (p: string) => void;
  updateTitle: (p: string) => void;
  updateTag: (p: string) => void;
  deletePulse: (p: string) => Promise<any>;
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
  const { user } = useAuth();
  const { notificationChannel } = useRealtimeChannels();

  const debounceRef = useRef<any>();
  const sprintDebounceRef = useRef<any>();
  const hideRef = useRef(false);

  const router = useRouter();
  const params = useParams();

  const {
    selected,
    setSelectedPulses,
    isDeleting,
    handleSelect,
    handleUnSelect,
  } = useContext(SelectedPulseContext);

  const debouncePulseUpdate = (data: any) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updatePulse({ ...data, _id: pulse._id });
    }, 1000);
  };

  const updateParentSprint = useCallback(
    (currentPulse: PulseType, key: string, value: string) => {
      clearTimeout(sprintDebounceRef.current);
      sprintDebounceRef.current = setTimeout(() => {
        setSprint?.((ps) => {
          const pulses = ps.pulses.map((p) => {
            if (currentPulse._id === p._id) return { ...p, [key]: value };
            else return p;
          });
          return { ...ps, pulses };
        });
      }, 700);
    },
    []
  );

  const updateStatus = useCallback((status: string) => {
    debouncePulseUpdate({ status });

    setPulse((currentPulse) => {
      updateParentSprint(currentPulse, "status", status);
      return { ...currentPulse, status: status };
    });
  }, []);

  const updatePriority = useCallback((priority: string) => {
    debouncePulseUpdate({ priority });
    setPulse((currentPulse) => {
      updateParentSprint(currentPulse, "priority", priority);

      return { ...currentPulse, priority: priority };
    });
  }, []);

  const updateTitle = useCallback((title: string) => {
    debouncePulseUpdate({ title });
    setPulse((currentPulse) => {
      updateParentSprint(currentPulse, "title", title);

      return { ...currentPulse, title: title };
    });
  }, []);

  const updateTag = useCallback((tag: string) => {
    debouncePulseUpdate({ tag });
    setPulse((prev) => ({ ...prev, tag: tag }));
  }, []);

  const deletePulse = useCallback(async (pulse_id: string) => {
    await deleteSinglePulse(pulse_id);
    setSprint?.((ps) => {
      return {
        ...ps,
        pulses: ps.pulses.filter((p) => p._id !== pulse_id),
      };
    });
  }, []);

  const updateAssigned = useCallback(
    (assignedUser: UserType, action = "add") => {
      setPulse((prev) => {
        let assigned = [];
        if (action == "remove") {
          assigned = prev.assigned.filter((a) => a !== assignedUser._id);
        } else {
          if (assignedUser._id !== user._id) {
            notificationChannel.publish(assignedUser._id, { type: "ASSIGNED" });
          }
          assigned = [assignedUser._id, ...prev.assigned];
        }
        debouncePulseUpdate({ assigned: assigned, boardId: params?.board });
        return { ...prev, assigned };
      });
    },
    [params, notificationChannel, user._id]
  );

  const updateTimeline = useCallback(
    (timeline: { start: string; end: string }) => {
      debouncePulseUpdate({ timeline });
      setPulse((prev) => ({ ...prev, timeline: timeline }));
    },
    []
  );

  // useEffect(() => {
  //   setPulse(mainPulse);
  // }, []);

  const isPulseChatOpen = params?.pulse_id === pulse._id;

  const {
    filters: { [board._id]: filterPerBoard },
  } = useConfig();

  const {
    priority: configPriority = "",
    status: configStatus = "",
    search: configSearch = "",
    user: configUser = "",
  } = filterPerBoard || {};

  hideRef.current = excludePulse({
    configPriority,
    configSearch,
    configStatus,
    configUser,
    isFake,
    pulse,
  });

  const allSelectedOfASprint = useMemo(() => {
    return (
      sprint.pulses.length > 0 && !!sprint.pulses.every((p) => selected[p._id])
    );
  }, [selected, sprint.pulses]);

  return (
    <div
      className={cn(
        isFake === false && hideRef.current === true
          ? "animate-pulse-height-rev"
          : "animate-pulse-height",
        "w-full",
        "transition-all duration-150",
        "hover:bg-main-bg",
        "active:bg-highlighter-dark"
      )}
    >
      <PulseContext.Provider
        value={{
          setPulse,
          updateStatus,
          updatePriority,
          updateTitle,
          updateTimeline,
          updateTag,
          updateAssigned,
          deletePulse,
        }}
      >
        <CustomDiv
          disabled={isDeleting}
          className={cn(
            "h-[var(--pulse-height)]",
            "flex flex-row items-center justify-start",
            "bg-main-bg  transition-all duration-150",
            "border-border-light border",
            isFake === false && !selected[pulse._id] && "hover:bg-main-fg",
            !!selected[pulse._id] && "bg-highlighter-dark",
            "transition-all duration-150",
            isPulseChatOpen && "!bg-highlighter-dark",
            leftPart === false && "border-l-0",
            "relative",
            "group"
          )}
        >
          {leftPart === true && (
            <div
              className={cn(
                "pulse-selector",
                "w-10 h-full px-2 mr-2 shrink-0",
                "border-0 border-r-1 border-r-border-light",
                "flex flex-row items-center justify-center"
              )}
            >
              <Checkbox
                disabled={sprint.pulses.length === 0}
                checked={
                  isFake === true ? allSelectedOfASprint : !!selected[pulse._id]
                }
                onCheckedChange={(e) => {
                  if (isFake && allSelectedOfASprint === true) {
                    setSelectedPulses((ps) => {
                      const obj = { ...ps };
                      sprint.pulses.forEach((p) => {
                        delete obj[p._id];
                      });
                      return { ...obj };
                    });
                  } else if (isFake) {
                    const allPulses = sprint.pulses.reduce((acc: any, p) => {
                      acc[p._id] = { ...p, sprintID: sprint._id };
                      return acc;
                    }, {});
                    setSelectedPulses((ps) => ({ ...ps, ...allPulses }));
                  } else if (e === true) {
                    handleSelect({ ...pulse, sprintID: sprint._id });
                  } else {
                    handleUnSelect(pulse._id);
                  }
                }}
                className="border border-border-light"
              />
              <Divider />
            </div>
          )}
          {/* Pulse title  */}
          {leftPart === true && isFake ? (
            <h2
              className={cn(
                "pulse-title",
                "w-full text-sm content-around h-full",
                "text-ellipsis overflow-hidden text-nowrap",
                isFake === true && "text-center tracking-wider"
              )}
            >
              {startCase(pulse.title)}
            </h2>
          ) : leftPart ? (
            <PulseTitle pulse={pulse} />
          ) : null}
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
                    className={cn(
                      "stroke-text-color",
                      isPulseChatOpen && "text-highlighter"
                    )}
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
        </CustomDiv>
      </PulseContext.Provider>
    </div>
  );
};

function excludePulse({
  configSearch,
  configUser,
  configStatus,
  isFake,
  pulse,
  configPriority,
}: any) {
  let exclude = false;
  if (pulse.isNew && isFake) return exclude;

  if (configPriority !== "" && pulse.priority !== configPriority) {
    exclude = true;
  }
  if (exclude === true) return exclude;

  if (configStatus !== "" && pulse.status !== configStatus) {
    exclude = true;
    // return null;
  }

  if (exclude === true) return exclude;

  if (
    configSearch !== "" &&
    !pulse.title.toLowerCase().includes(configSearch)
  ) {
    exclude = true;
  }

  if (exclude === true) return exclude;

  if (configUser !== "" && !pulse.assigned.includes(configUser)) {
    exclude = true;
  }

  return exclude;
}
export { PulseContext };
export default memo(Pulse);
