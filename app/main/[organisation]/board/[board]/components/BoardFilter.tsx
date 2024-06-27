"use client";
import React from "react";

import useBoardContext from "@/hooks/useBoardContext";
import { cn } from "@/lib/utils";
import FilterSearch from "./FilterBlocks/FilterSearch";
import FilterUser from "./FilterBlocks/FilterUser";
import FilterStatus from "./FilterBlocks/FilterStatus";
import FilterPriority from "./FilterBlocks/FilterPriority";

type BoardFilterProps = {};

const BoardFilter = ({}: BoardFilterProps) => {
  const { board } = useBoardContext();

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start gap-2"
      )}
    >
      <FilterSearch />
      <FilterUser />
      <FilterStatus />
      <FilterPriority />
    </div>
  );
};

export default BoardFilter;
