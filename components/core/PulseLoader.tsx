import React from "react";
import { cn } from "@/lib/utils";

type PulseLoaderProps = {
  className?: string;
};
const PulseLoader = ({ className }: PulseLoaderProps) => {
  return (
    <span
      className={cn(
        "loading loading-ring loading-lg",

        className
      )}
    />
  );
};

export default PulseLoader;
