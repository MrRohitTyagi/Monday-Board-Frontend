"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { BaseSyntheticEvent, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import SimpleFormInput from "@/components/core/FormSimpleInput";
import { Button } from "@/components/ui/button";
import FormSimpleTextArea from "@/components/core/FormSimpleTextArea";
import { Label } from "@/components/ui/label";
import CreatableSelect, {
  cleanCreatableSelectPayload,
} from "@/components/core/CreatableSelect";
import { createBoard, getBoard, updateBoard } from "@/gateways/board-gateway";
import { useAuth } from "@/zstore";
import { uploadImage } from "@/utils/imageupload";
import { toast } from "sonner";
import Space from "@/components/core/Space";
import { Input } from "@/components/ui/input";
import { isEmpty } from "lodash";
import Loader from "@/components/core/Loader";
import { cn } from "@/lib/utils";
import useNavigate from "@/hooks/useNavigate";
import { PriorityType, StatusesType } from "@/types/pulseTypes";
import CustomDiv from "@/components/core/CustomDiv";
import useLoading from "@/hooks/useLoading";
import BoardSkeletonLoader from "./components/BoardSkeletonLoader";

type BoardSettingsProps = {
  params: {
    boardID: string;
  };
};

const boardSchema = z.object({
  title: z
    .string({ message: "Board title is required" })
    .min(5, "Board name too short")
    .max(50, "Board name too long"),
  description: z
    .string()
    .min(5, "Description too short")
    .max(400, "Description too long")
    .optional(),
});
const BoardSettings = ({ params }: BoardSettingsProps) => {
  const [statuses, setstatuses] = useState<StatusesType>({});
  const [priority, setpriority] = useState<PriorityType>({});
  const [picture, setPicture] = useState<BaseSyntheticEvent | null | string>(
    ""
  );

  const {
    user: { _id },
    addNewBoard,
    updateBoardState,
  } = useAuth();

  const { navigate } = useNavigate();

  const form = useForm({
    resolver: zodResolver(boardSchema),
  });

  const { isLoading, triggerLoading } = useLoading({ defaultLoading: true });

  useEffect(() => {
    if (params.boardID === "new") {
      triggerLoading(false);
      return;
    }

    (async function () {
      const board = await getBoard(params.boardID);
      form.reset(board);
      if (board.picture) setPicture(board.picture);
      if (!isEmpty(board.statuses)) setstatuses(board.statuses as StatusesType);
      if (!isEmpty(board.priority)) setpriority(board.priority as PriorityType);
      triggerLoading(false);
    })();
  }, []);

  const onSubmit = async (values: any) => {
    const url =
      typeof picture !== "string"
        ? await uploadImage(picture?.target?.files?.[0])
        : picture;

    const cleanPriorities = cleanCreatableSelectPayload(priority);
    const cleanStatuses = cleanCreatableSelectPayload(statuses);
    const payload = {
      ...values,
      statuses: cleanStatuses,
      priority: cleanPriorities,
      picture: url,
      admins: [_id],
    };

    let board;
    if (params.boardID === "new") {
      board = await createBoard(payload);
      toast.success("Board created successfully");
      addNewBoard(board);
      // navigate(`/`);
    } else {
      payload._id = params.boardID;
      board = await updateBoard(payload);
      updateBoardState(board);
      toast.success("Board updated successfully");
    }

    navigate(`/`);
  };

  return isLoading === true ? (
    <BoardSkeletonLoader />
  ) : (
    <div className="board-settings-conatiner p-4 pr-8">
      <h1 className="text-2xl font-bold">
        {params.boardID === "new"
          ? "Create new board"
          : `Update ${form.getValues("title")}`}
      </h1>

      <div className="divider m-0"></div>
      <Space h={4} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* // Title  */}
          <SimpleFormInput
            classNames={{ input: "bg-transparent" }}
            disabled={form.formState.isSubmitting}
            form={form}
            showDot={true}
            name="title"
            label="Title"
            placeHolder="Board title"
          />
          {/* // Description  */}
          {/* // */}
          <FormSimpleTextArea
            disabled={form.formState.isSubmitting}
            showDot={true}
            form={form}
            name="description"
            label="Description"
            placeHolder="Board description"
          />
          {/* // Picture  */}
          <div className="board-picture flex flex-row gap-4">
            <div className="board-picture flex flex-col gap-2">
              <Label>• Picture</Label>
              <Input
                name="picture"
                type="file"
                customOnChange={(e: any) => {
                  setPicture(e);
                }}
              />
            </div>
          </div>
          {/* // Priority */}
          <CustomDiv
            disabled={form.formState.isSubmitting}
            lvl={60}
            className="priority space-y-1"
          >
            <Label>• Priority </Label>
            <CreatableSelect
              data={priority}
              setData={setpriority}
              name="priority"
            />
          </CustomDiv>
          {/* Statuses */}
          <CustomDiv
            disabled={form.formState.isSubmitting}
            lvl={60}
            className="statuses space-y-1"
          >
            <Label>• Statuses </Label>
            <CreatableSelect
              data={statuses}
              setData={setstatuses}
              name="statuses"
            />
          </CustomDiv>
          <Button
            disabled={form.formState.isSubmitting}
            className={cn(
              "flex flex-row items-center gap-3",
              "w-full border-main-bg border-2"
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
    </div>
  );
};

export default memo(BoardSettings);
