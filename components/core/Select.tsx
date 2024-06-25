"use client";

import React, { memo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectProps = {
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
};

const SelectComp = ({ options = [], onChange }: SelectProps) => {
  const [value, setValue] = useState("");

  const handleOnchange = (v: string) => {
    if (onChange) onChange(v);
    setValue(v);
  };

  return (
    <Select value={value} onValueChange={handleOnchange}>
      <SelectTrigger className="bg-transparent h-8 shadow-none">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="bg-transparent hover:bg-transparent">
        {options.map((o, i) => (
          <SelectItem
            key={i + "select-option"}
            value={o.value}
            className="bg-transparent 
            hover:bg-highlighter
            focus:bg-highlighter
            active:bg-highlighter
            cursor-pointer
            "
          >
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default memo(SelectComp);
