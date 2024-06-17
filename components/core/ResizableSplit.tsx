import React, { memo } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

type ResizableSplitProps = {
  leftPannel?: React.ReactNode;
  children?: React.ReactNode;
  rightPannel?: React.ReactNode;
  childMode: boolean;
  classNames?: {
    leftPanel?: string;
    rightPanel?: string;
  };
  id?: string;
};
const tempLeftPannel = (
  <div
    className="resizable-left-side h-full w-full bg-black 
        opacity-50 pointer-events-none"
  />
);
const ResizableSplit = ({
  leftPannel,
  rightPannel,
  children,
  childMode,
  classNames,
  id,
}: ResizableSplitProps) => {
  return childMode === true ? (
    <ResizablePanelGroup direction="horizontal" autoSaveId={id}>
      <ResizablePanel className={cn(classNames?.leftPanel)}>
        {leftPannel ? leftPannel : tempLeftPannel}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>{children}</ResizablePanel>
    </ResizablePanelGroup>
  ) : (
    <ResizablePanelGroup direction="horizontal" autoSaveId={id}>
      <ResizablePanel className={cn(classNames?.rightPanel)}>
        {leftPannel ? leftPannel : tempLeftPannel}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={1000} className="">
        {rightPannel}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default memo(ResizableSplit);
