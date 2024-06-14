import React from "react";

import { cn } from "@/lib/utils";
import { baseCssMiniItems } from "../Pulse";
import { BoardType, PulseType } from "@/zstore";

type AssignedProps = {
  board: BoardType;
  pulse: PulseType;
};

const Assigned = ({ board, pulse }: AssignedProps) => {
  return <div className={cn(baseCssMiniItems(), "assigned-to")}>Assigned</div>;
};

export default Assigned;
