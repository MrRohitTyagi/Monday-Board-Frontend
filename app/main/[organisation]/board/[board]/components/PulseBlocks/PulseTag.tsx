import { cn } from "@/lib/utils";
import React, { memo, useCallback, useContext, useState } from "react";
import { PulseContext, baseCssMiniItems } from "../Pulse";
import { PulseType } from "@/types/pulseTypes";
import { SprintType } from "@/types/sprintTypes";

type PulseTagProps = {
  pulse: PulseType;
  sprint: SprintType;
};

const PulseTag = ({ pulse, sprint }: PulseTagProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { updateTag } = useContext(PulseContext);

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
        className={cn(baseCssMiniItems(), "pulse-tag-to")}
        type="text"
        onChange={(e) => updateTag(e.target.value)}
        value={pulse.tag}
      />
    </>
  ) : (
    <h1
      onClick={(e) => {
        setIsEditable(true);
      }}
      style={{ color: sprint.color }}
      className={cn(baseCssMiniItems(), "pulse-tag-to")}
    >
      {pulse.tag}
    </h1>
  );
};

export default memo(PulseTag);
