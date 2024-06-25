"use client";
import FormSimpleInput from "@/components/core/FormSimpleInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type PasswordProps = {};

const Password = (props: PasswordProps) => {
  const form = useForm();
  const [otpSent, setOtpSent] = useState(false);

  const onSubmit = (values: any) => {
    console.log(`%c values `, "color: orange;border:2px solid cyan", values);
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-3")}
        >
          <FormSimpleInput
            classNames={{ input: "!mt-0" }}
            placeHolder=""
            form={form}
            label="Current password"
            name="current_passowrd"
            disabled={form.formState.isSubmitting}
          />
          <FormSimpleInput
            classNames={{ input: "!mt-0" }}
            placeHolder=""
            form={form}
            label="New password"
            name="new_passowrd"
            disabled={form.formState.isSubmitting}
          />
          <Button type="submit" className="">
            <h1>Sumbit</h1>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Password;
