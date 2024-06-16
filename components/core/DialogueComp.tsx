import React, { Dispatch } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type DialogueCompProps = {
  trigger: React.ReactNode | string;
  children: React.ReactNode | string;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  classnames?: {
    trigger: string;
    content: string;
  };
};

const DialogueComp = ({
  trigger,
  children,
  open,
  setOpen,
  classnames,
}: DialogueCompProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(classnames?.trigger, "bg-transparent")}>
        {trigger}
      </DialogTrigger>
      <DialogContent className={cn(classnames?.content, "bg-main-fg")}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogueComp;
