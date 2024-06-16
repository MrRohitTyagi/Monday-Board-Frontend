import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ColorPickerComp from "@/components/core/ColorPickerComp";
import SimpleFormInput from "@/components/core/FormSimpleInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { createSprint } from "@/gateways/sprint-gateway";
import { toast } from "sonner";
import { BoardType, SprintType } from "@/zstore";

const sprintSchema = z.object({
  title: z.string().min(5).max(100),
  color: z.string().optional(),
});
type NewSprintFormProps = {
  sprint: SprintType;
  board: BoardType;
  setCurrentBoard: React.Dispatch<React.SetStateAction<BoardType>>;
  onClose: () => void;
};

const NewSprintForm = ({
  board,
  setCurrentBoard,
  sprint,
  onClose,
}: NewSprintFormProps) => {
  const form = useForm({ resolver: zodResolver(sprintSchema) });
  //
  useEffect(() => {
    if (sprint._id) {
      form.reset({ title: sprint.title, color: sprint.color });
    }
  }, [sprint]);

  const updateCurrentBoard = useCallback(
    (sprint: any) => {
      setCurrentBoard((prevBoard) => {
        return { ...prevBoard, sprints: [sprint._id, ...prevBoard.sprints] };
      });
    },
    [setCurrentBoard]
  );

  const onSubmit = useCallback(
    async (values: any) => {
      const payload = { ...values, board: board._id };
      const sprint = await createSprint(payload);
      updateCurrentBoard(sprint);
      toast.success("Sprint created successfully");
      onClose();
    },
    [board._id, updateCurrentBoard]
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

export default NewSprintForm;
