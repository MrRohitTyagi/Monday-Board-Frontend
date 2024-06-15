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

type SimpleFormInputProps = {
  form: UseFormReturn<FieldValues, any, undefined>;
  name: string;
  label: string;
  placeHolder: string;
  classNames?: {
    input: string;
    formItem: string;
  };
  customOnChange?: (e: any) => void;
  type?: string;
};

const SimpleFormInput = ({
  form,
  label,
  name,
  placeHolder,
  classNames,
  customOnChange,
  type,
}: SimpleFormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", classNames?.formItem)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...(type ? { type: type } : {})}
              customOnChange={customOnChange}
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

export default SimpleFormInput;
