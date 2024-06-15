"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import SimpleFormInput from "@/components/core/FormSimpleInput";
import { Button } from "@/components/ui/button";

type BoardSettingsProps = {};
const boardSchema = z.object({
  title: z
    .string({ message: "Board title is required" })
    .min(5, "Board name too short")
    .max(50, "Board name too long"),
  description: z
    .string()
    .min(5, "Description too short")
    .max(300, "Description too long")
    .optional(),
});
const BoardSettings = (props: BoardSettingsProps) => {
  const [picture, setPicture] = useState<any>(null);

  const form = useForm({
    resolver: zodResolver(boardSchema),
  });
  const onSubmit = (values: any) => {
    console.log(`%c values `, "color: pink;border:1px solid pink", values);
  };
  return (
    <div className="board-settings-conatiner p-4 pr-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <SimpleFormInput
            form={form}
            name="title"
            label="Title"
            placeHolder="Board title"
          />
          <SimpleFormInput
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
          <Button>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default BoardSettings;
