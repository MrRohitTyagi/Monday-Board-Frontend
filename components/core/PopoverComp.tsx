import React, { memo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { PopoverContentProps } from "@radix-ui/react-popover";

type PopoverCompProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  additional?: {
    trigger?: any;
    content?: PopoverContentProps;
  };
  classNames?: {
    trigger?: string;
    content?: string;
  };
  controlled?: boolean;
  open?: boolean;
  close?: ((open: boolean) => void) | undefined;
};

const PopoverComp = ({
  trigger,
  content,
  classNames,
  additional,
  controlled,
  open,
  close = () => {},
}: PopoverCompProps) => {
  return controlled ? (
    <Popover
      open={open}
      onOpenChange={(e) => {
        close(e);
      }}
    >
      <PopoverTrigger
        asChild
        className={classNames?.trigger}
        {...additional?.trigger}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        className={cn(classNames?.content, "border-border-light border-[1px]")}
        {...additional?.content}
      >
        {content}
      </PopoverContent>
    </Popover>
  ) : (
    <Popover>
      <PopoverTrigger
        asChild
        className={classNames?.trigger}
        {...additional?.trigger}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        className={cn(classNames?.content, "border-border-light border-[1px]")}
        {...additional?.content}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default memo(PopoverComp);
