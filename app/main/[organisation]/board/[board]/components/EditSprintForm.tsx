import React, { memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import ColorPickerComp from "@/components/core/ColorPickerComp";
import SimpleFormInput from "@/components/core/FormSimpleInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import CustomDiv from "@/components/core/CustomDiv";

import { BoardType, SprintType } from "@/zstore";
import { createSprint, updateSprint } from "@/gateways/sprint-gateway";
import Loader from "@/components/core/Loader";
import { cn } from "@/lib/utils";

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <SimpleFormInput
          disabled={form.formState.isSubmitting}
          form={form}
          label="Title"
          name={"title"}
          placeHolder="Sprint Title"
        />

        <CustomDiv
          disabled={form.formState.isSubmitting}
          className="space-y-2 w-full xxxxxxxxx"
        >
          <Label>Sprint Color</Label>

          <ColorPickerComp
            pickerType="swatches"
            color={form.watch("color")}
            onChange={(hex: string) => {
              form.setValue("color", hex, { shouldValidate: true });
            }}
          />
        </CustomDiv>
        <Button
          disabled={form.formState.isSubmitting}
          className={cn(
            "flex flex-row items-center gap-3",
            "w-full border-main-light border-2"
          )}
        >
          {form.formState.isSubmitting && <Loader />}
          {form.formState.isSubmitting ? (
            <h1 className="animate-fadeIn">Submitting ...</h1>
          ) : (
            <h1 className="animate-fadeIn">Submit</h1>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default memo(EditSprintForm);
