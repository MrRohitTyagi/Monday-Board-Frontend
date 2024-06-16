import React, { memo } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type ResizableSplitProps = {
  leftPannel: React.ReactNode;
  rightPannel: React.ReactNode;
};
const ResizableSplit = ({ leftPannel, rightPannel }: ResizableSplitProps) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>{leftPannel}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>{rightPannel}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default memo(ResizableSplit);
