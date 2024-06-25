import useBoardContext from "@/hooks/useBoardContext";
import { cn } from "@/lib/utils";
import React from "react";

type BoardFilterProps = {};

const BoardFilter = ({}: BoardFilterProps) => {
  const { board, setCurrentBoard } = useBoardContext();
  return <div className={cn("h-0", "")}></div>;
};

export default BoardFilter;
