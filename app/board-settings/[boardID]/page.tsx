"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { BaseSyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import SimpleFormInput from "@/components/core/FormSimpleInput";
import { Button } from "@/components/ui/button";
import FormSimpleTextArea from "@/components/core/FormSimpleTextArea";
import { Label } from "@/components/ui/label";
import CreatableSelect from "@/components/core/CreatableSelect";
import { createBoard, updateBoard } from "@/gateways/board-gateway";
import { useAuth } from "@/zstore";
import { uploadImage } from "@/utils/imageupload";
import { toast } from "sonner";
import Space from "@/components/core/Space";
import useNavigate from "@/hooks/useNavigate";

type BoardSettingsProps = {
  params: {
    boardID: string;
  };
};
type ValueType = {
  id: string;
  title: string;
  isEditing: boolean;
  color: string;
  textColor: string;
};

type PriorityType = {
  [key: string]: ValueType;
};
type StatusesType = {
  [key: string]: ValueType;
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
  const {
    user: { _id },
    updateBoards,
  } = useAuth();
  const navigate = useNavigate();

  const [picture, setPicture] = useState<BaseSyntheticEvent | null>(null);
  const [statuses, setstatuses] = useState<StatusesType>({});
  const [priority, setpriority] = useState<PriorityType>({});

  const form = useForm({
    resolver: zodResolver(boardSchema),
  });

  const onSubmit = async (values: any) => {
    const url = picture ? await uploadImage(picture.target.files[0]) : "";

    const payload = {
      ...values,
      statuses,
      priority,
      picture: url,
      admins: [_id],
    };

    let board;
    if (params.boardID === "new") {
      board = await createBoard(payload);
      toast.success("Board created successfully");
    } else {
      payload._id = params.boardID;
      board = await updateBoard(payload);
      toast.success("Board updated successfully");
    }
    updateBoards(board);
    navigate(`board/${board._id}`);
  };

  return (
    <div className="board-settings-conatiner p-4 pr-8">
      <h1 className="text-2xl font-bold">
        {params.boardID === "new" ? "Create new board" : "Update board"}
      </h1>

      <div className="divider m-0"></div>
      <Space h={4} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          {/* // Title  */}
          <SimpleFormInput
            form={form}
            name="title"
            label="Title"
            placeHolder="Board title"
          />
          {/* // Description  */}
          <FormSimpleTextArea
            form={form}
            name="description"
            label="Description"
            placeHolder="Board description"
          />
          {/* // Picture  */}
          <SimpleFormInput
            form={form}
            name="picture"
            type="file"
            label="picture"
            placeHolder="Board picture"
            customOnChange={(e: any) => {
              setPicture(e);
            }}
          />
          {/* // Priority */}
          <Label>Priority </Label>
          <CreatableSelect data={priority} setData={setpriority} />
          <Label>Statuses </Label>
          {/* Statuses */}
          <CreatableSelect data={statuses} setData={setstatuses} />
          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BoardSettings;
