import React, { memo } from "react";
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
  placeHolder?: string;
  classNames?: {
    input?: string;
    formItem?: string;
  };
  customOnChange?: (e: any) => void;
  type?: string;
  showDot?: boolean;
  disabled?: boolean;
};

const SimpleFormInput = ({
  form,
  label,
  name,
  placeHolder,
  classNames,
  customOnChange,
  type,
  showDot,
  disabled,
}: SimpleFormInputProps) => {
  return (
    <FormField
      disabled={disabled}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", classNames?.formItem)}>
          <FormLabel>{showDot ? `• ${label}` : label}</FormLabel>
          <FormControl>
            <Input
              {...(type ? { type: type } : {})}
              customOnChange={customOnChange}
              placeholder={placeHolder}
              {...field}
              className={cn("bg-transparent !mt-0", classNames?.input)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(SimpleFormInput);
