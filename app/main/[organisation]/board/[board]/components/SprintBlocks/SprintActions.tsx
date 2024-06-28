"use client";

import DialogueComp from "@/components/core/DialogueComp";
import { StateSetter } from "@/types/genericTypes";
import { SprintType } from "@/types/sprintTypes";
import React, { memo, useState } from "react";
import EditSprintForm from "./EditSprintForm";
import useBoardContext from "@/hooks/useBoardContext";
import { Button } from "@/components/ui/button";
import TooltipComp from "@/components/core/TooltipComp";
import { ChevronDownCircle, ChevronUpCircle, Edit, Trash2 } from "lucide-react";
import { useConfig } from "@/store/configStore";
import Loader from "@/components/core/Loader";
import useLoading from "@/hooks/useLoading";

type SprintActionsProps = {
  sprint: SprintType;
  setSprint: StateSetter<SprintType>;
  // setIsExpanded: StateSetter<boolean>;
  isExpanded: boolean;
};

const SprintActions = ({
  sprint,
  // setIsExpanded,
  setSprint,
  isExpanded,
}: SprintActionsProps) => {
  const { isDeleting, triggerDeleting } = useLoading({});
  const { unCollapseSprint, collapseSprint } = useConfig();
  const { deleteSprint } = useBoardContext();

  return (
    <div className="sprint-expand-collapse flex felx-row gap-2 opacity-80">
      {/* Sprint Expand collapse  */}
      <Button
        variant={"ghost"}
        className="p-1 border-none"
        onClick={() => {
          if (isExpanded) {
            collapseSprint(sprint._id);
          } else {
            unCollapseSprint(sprint._id);
          }
        }}
      >
        <TooltipComp
          title={isExpanded ? "Collapse" : "Expand"}
          className="px-3 py-2"
        >
          {isExpanded ? (
            <ChevronUpCircle size={18} color="white" />
          ) : (
            <ChevronDownCircle size={18} color="white" />
          )}
        </TooltipComp>
      </Button>

      <EditSprint sprint={sprint} setSprint={setSprint}>
        <Button
          variant={"ghost"}
          className="p-1 border-none"
          // onClick={() => setIsExpanded((p) => !p)}
        >
          <TooltipComp title={"Edit Sprint"} className="px-3 py-2">
            <Edit size={18} color="white" />
          </TooltipComp>
        </Button>
      </EditSprint>

      {/* // delete sprint  */}

      <Button
        variant={"ghost"}
        className="p-1 border-none"
        onClick={async () => {
          triggerDeleting(true);
          await deleteSprint(sprint._id);
          triggerDeleting(false);
        }}
      >
        <TooltipComp title={"Delete sprint"} className="px-3 py-2">
          {isDeleting ? (
            <Loader className="h-6 w-6" />
          ) : (
            <Trash2 size={18} color="white" />
          )}
        </TooltipComp>
      </Button>
    </div>
  );
};

type EditSprintProps = {
  children: React.ReactNode;
  sprint: SprintType;
  setSprint: React.Dispatch<React.SetStateAction<SprintType>>;
};

const EditSprint = ({ children, sprint, setSprint }: EditSprintProps) => {
  //
  const { setCurrentBoard, board } = useBoardContext();

  const [openSprintEditForm, setOpenSprintEditForm] = useState(false);
  return (
    <DialogueComp
      setOpen={setOpenSprintEditForm}
      open={openSprintEditForm}
      trigger={children}
    >
      <EditSprintForm
        setSprint={setSprint}
        onClose={() => setOpenSprintEditForm(false)}
        sprint={sprint}
        board={board}
        setCurrentBoard={setCurrentBoard}
      />
    </DialogueComp>
  );
};
export default memo(SprintActions);
