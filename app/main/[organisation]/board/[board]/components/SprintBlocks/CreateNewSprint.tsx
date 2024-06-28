"use client";

import DialogueComp from "@/components/core/DialogueComp";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import EditSprintForm from "./EditSprintForm";
import { SprintType } from "@/types/sprintTypes";
import useBoardContext from "@/hooks/useBoardContext";

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
            // variant={"ghost"}
            onClick={() => {
              setOpenSprintForm(true);
            }}
          >
            <div className="flex flex-row gap-2 items-center">
              <Plus size={"15px"} />
              <h2>New Sprint</h2>
            </div>
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

export default CreateNewSprint;
