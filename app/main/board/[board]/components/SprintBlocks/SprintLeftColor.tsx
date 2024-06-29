import { cn } from "@/lib/utils";
import React from "react";

type SprintLeftColorProps = { color: string };
const SprintLeftColor = ({ color }: SprintLeftColorProps) => {
  return (
    <div
      style={{ background: color }}
      className={cn(
        "sprint-color-div",
        "left-0 w-2 h-full shrink-0",
        "rounded-tl-md",
        "rounded-bl-md"
      )}
    />
  );
};

export default SprintLeftColor;
