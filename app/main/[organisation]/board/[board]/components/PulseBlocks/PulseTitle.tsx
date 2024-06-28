import { cn } from "@/lib/utils";
import { startCase } from "lodash";
import React, { memo, useCallback, useContext, useState } from "react";
import { PulseContext } from "../Pulse";
import { PulseType } from "@/types/pulseTypes";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useLoading from "@/hooks/useLoading";
import Loader from "@/components/core/Loader";

type PulseTitleProps = {
  pulse: PulseType;
};

const PulseTitle = ({ pulse }: PulseTitleProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { updateTitle, deletePulse } = useContext(PulseContext);
  const { isDeleting, triggerDeleting } = useLoading({});

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Enter":
        setIsEditable(false);
        break;
      default:
        break;
    }
  }, []);

  return isEditable ? (
    <>
      <input
        onBlur={() => setIsEditable(false)}
        onKeyUp={handleKey}
        ref={(e) => {
          e?.focus();
        }}
        className="w-11/12"
        type="text"
        onChange={(e) => updateTitle(e.target.value)}
        value={pulse.title}
      />
    </>
  ) : (
    <h1
      onClick={(e) => {
        setIsEditable(true);
      }}
      className={cn(
        "pulse-title",
        "flex flex-row items-center justify-between",
        "w-full text-sm content-around",
        "text-ellipsis overflow-hidden text-nowrap"
      )}
    >
      {startCase(pulse.title)}

      <Button
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          triggerDeleting(true);
          await deletePulse(pulse._id);
          triggerDeleting(false);
        }}
        variant={"ghost"}
        className={cn(
          "bg-transparent h-full w-8 flex-row items-center justify-center",
          "absolute right-0 p-0",
          isDeleting ? "flex" : "hidden",
          "group-hover:flex"
        )}
      >
        {isDeleting ? (
          <Loader className="h-6 w-6 opacity-70" />
        ) : (
          <Trash2 size={18} className="stroke-main-delete" />
        )}
      </Button>
    </h1>
  );
};

export default memo(PulseTitle);
