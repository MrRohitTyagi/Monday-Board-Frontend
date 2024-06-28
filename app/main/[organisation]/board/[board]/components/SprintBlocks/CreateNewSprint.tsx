"use client";

import DialogueComp from "@/components/core/DialogueComp";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { memo, useState } from "react";
import EditSprintForm from "./EditSprintForm";
import { SprintType } from "@/types/sprintTypes";
import useBoardContext from "@/hooks/useBoardContext";
import { cn } from "@/lib/utils";

type CreateNewSprintProps = {};
const CreateNewSprint = (props: CreateNewSprintProps) => {
  const [openSprintForm, setOpenSprintForm] = useState(false);
  const { board, setCurrentBoard } = useBoardContext();

  return (
    <div className="create-new-sprint">
      <DialogueComp
        setOpen={setOpenSprintForm}
        open={openSprintForm}
        trigger={
          <Button
            className={cn(
              "border-2 border-highlighter-dark",
              "rounded-sm",
              "gap-2 flex flex-row items-center"
            )}
            variant={"ghost"}
            onClick={() => {
              setOpenSprintForm(true);
            }}
          >
            <Plus size={"15px"} />
            <h2>New Sprint</h2>
          </Button>
        }
      >
        <EditSprintForm
          onClose={() => setOpenSprintForm(false)}
          sprint={{} as SprintType}
          board={board}
          setCurrentBoard={setCurrentBoard}
        />
      </DialogueComp>
    </div>
  );
};

export default memo(CreateNewSprint);
