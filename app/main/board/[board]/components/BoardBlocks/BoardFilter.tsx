"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import FilterSearch from "../FilterBlocks/FilterSearch";
import FilterUser from "../FilterBlocks/FilterUser";
import FilterStatus from "../FilterBlocks/FilterStatus";
import FilterPriority from "../FilterBlocks/FilterPriority";
import MoreSettings from "../FilterBlocks/MoreSettings";
import CreateNewSprint from "../SprintBlocks/CreateNewSprint";
import DialogueComp from "@/components/core/DialogueComp";
import { FilterIcon } from "lucide-react";

type BoardFilterProps = {};

const BoardFilter = ({}: BoardFilterProps) => {
  return (
    <>
      <div
        className={cn(
          "sm:hidden",
          "md:flex",
          "items-center gap-2 flex-row flex-wrap justify-start"
        )}
      >
        <CreateNewSprint />
        <FilterSearch />
        <FilterUser />
        <FilterStatus />
        <FilterPriority />
        <MoreSettings />
      </div>
      <BoardFiltersInModal />
    </>
  );
};

const BoardFiltersInModal = () => {
  const [open, setopen] = useState(false);
  return (
    <div className={cn("filter-in-model", "sm:grid", "md:hidden")}>
      <DialogueComp
        setOpen={setopen}
        open={open}
        classnames={{
          content: cn(
            "border-border-light border items-center gap-2 grid-cols-2 grid",
            "pt-8"
          ),
          trigger: "",
        }}
        trigger={<FilterIcon size={20} className="stroke-text-color" />}
      >
        <FilterSearch />
        <CreateNewSprint />
        <FilterUser />
        <FilterStatus />
        <FilterPriority />
        <MoreSettings />
      </DialogueComp>
    </div>
  );
};

export default BoardFilter;
