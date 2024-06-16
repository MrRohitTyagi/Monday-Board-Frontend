import React from "react";

import { cn } from "@/lib/utils";
import { baseCssMiniItems } from "../Pulse";
import { BoardType, PulseType } from "@/zstore";

type AssignedProps = {
  board: BoardType;
  pulse: PulseType;
};

const Assigned = ({ board, pulse }: AssignedProps) => {
  return <h1 className={cn(baseCssMiniItems(), "assigned-to")}>Assigned</h1>;
};

export default Assigned;
