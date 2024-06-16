import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ColorPickerComp from "@/components/core/ColorPickerComp";
import SimpleFormInput from "@/components/core/FormSimpleInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { createSprint, updateSprint } from "@/gateways/sprint-gateway";
import { toast } from "sonner";
import { BoardType, SprintType } from "@/zstore";

const sprintSchema = z.object({
  title: z.string().min(5).max(100),
  color: z.string().optional(),
});
type EditSprintFormProps = {
  sprint: SprintType;
  board: BoardType;
  setCurrentBoard: React.Dispatch<React.SetStateAction<BoardType>>;
  setSprint?: React.Dispatch<React.SetStateAction<SprintType>>;
  onClose: () => void;
};

const EditSprintForm = ({
  board,
  setCurrentBoard,
  sprint,
  onClose,
  setSprint,
}: EditSprintFormProps) => {
  const form = useForm({ resolver: zodResolver(sprintSchema) });
  //
  useEffect(() => {
    if (sprint._id) {
      form.reset({ title: sprint.title, color: sprint.color });
    }
  }, [sprint]);

  const addSprintToCurrentBoard = useCallback(
    (sprint: any) => {
      setCurrentBoard((prevBoard) => {
        return { ...prevBoard, sprints: [sprint._id, ...prevBoard.sprints] };
      });
    },
    [setCurrentBoard]
  );

  const onSubmit = useCallback(
    async (values: any) => {
      if (sprint?._id) {
        const updatedSprint = await updateSprint({
          ...values,
          _id: sprint._id,
        });
        console.log(
          `%c updatedSprint `,
          "color: orange;border:2px solid cyan",
          updatedSprint
        );
        setSprint?.(updatedSprint);
        onClose(); 
      } else {
        const payload = { ...values, board: board._id };
        const sprint = await createSprint(payload);
        addSprintToCurrentBoard(sprint);
        toast.success("Sprint created successfully");
        onClose();
      }
    },
    [board._id, addSprintToCurrentBoard]
  );

  console.log(`%c params `, "color: green;border:1px solid green", board);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <SimpleFormInput
          form={form}
          label="Title"
          name={"title"}
          placeHolder="Sprint Title"
        />
        <div className="space-y-2 w-full">
          <Label>Sprint Color</Label>
          <ColorPickerComp
            pickerType="swatches"
            color={form.watch("color")}
            onChange={(hex: string) => {
              form.setValue("color", hex, { shouldValidate: true });
            }}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditSprintForm;
