import { cn } from "@/lib/utils";
import React from "react";
type DividerProps = {
  className?: string;
  horizontal?: boolean;
};
const Divider = ({ className, horizontal }: DividerProps) => {
  return (
    <div
      className={cn(
        className,
        "divider m-0 p-0",
        horizontal && "divider-horizontal"
      )}
    />
  );
};

export default Divider;
