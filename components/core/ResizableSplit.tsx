import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type ResizableSplitProps = {
  children: React.ReactNode;
};
const ResizableSplit = ({ children }: ResizableSplitProps) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <div
          className="resizable-left-side h-full w-full bg-black 
            opacity-80 pointer-events-none"
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ResizableSplit;
