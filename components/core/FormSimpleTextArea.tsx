import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

type FormSimpleTextAreaProps = {
  form: UseFormReturn<FieldValues, any, undefined>;
  name: string;
  label: string;
  placeHolder: string;
  classNames?: {
    input: string;
    formItem: string;
  };
  type?: string;
  showDot?: boolean;
};

const FormSimpleTextArea = ({
  form,
  label,
  name,
  placeHolder,
  classNames,
  showDot,
  type,
}: FormSimpleTextAreaProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", classNames?.formItem)}>
          <FormLabel>{showDot ? `• ${label}` : label}</FormLabel>
          <FormControl>
            <Textarea
              {...(type ? { type: type } : {})}
              placeholder={placeHolder}
              {...field}
              className={classNames?.input}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSimpleTextArea;
