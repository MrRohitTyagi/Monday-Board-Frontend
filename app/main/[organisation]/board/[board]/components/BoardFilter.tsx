import useBoardContext from "@/hooks/useBoardContext";
import { cn } from "@/lib/utils";
import { BoardType } from "@/zstore";
import React from "react";

type BoardFilterProps = {};

const BoardFilter = ({}: BoardFilterProps) => {
  const { board, setCurrentBoard } = useBoardContext();
  return <div className={cn("h-10", "")}>BoardFilters TODO</div>;
};

export default BoardFilter;
