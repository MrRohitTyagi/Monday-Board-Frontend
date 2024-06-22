import React, { memo, useMemo } from "react";
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
  childMode?: boolean;
  classNames?: {
    leftPanel?: string;
    rightPanel?: string;
  };
  id?: string;
  onLeftPannelClick?: () => void;
  closed?: boolean;
  // rest: any;
};

const ResizableSplit = ({
  leftPannel,
  rightPannel,
  children,
  childMode,
  classNames,
  id,
  onLeftPannelClick,
  closed = false,
  ...rest
}: ResizableSplitProps) => {
  const tempLeftPannel = useMemo(() => {
    return (
      <div
        className={cn(
          "resizable-left-side h-full w-full",
          "animate-change-bg-transparency z-[9999]",
          closed === true && "!bg-transparent"
        )}
      />
    );
  }, [closed]);

  return childMode === true ? (
    <ResizablePanelGroup direction="horizontal" autoSaveId={id} {...rest}>
      <ResizablePanel
        className={cn(classNames?.leftPanel)}
        onClick={onLeftPannelClick}
      >
        {leftPannel ? leftPannel : tempLeftPannel}
      </ResizablePanel>
      <ResizableHandle withHandle className="cursor-ew-resize" />
      <ResizablePanel minSize={40}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  ) : (
    <ResizablePanelGroup direction="horizontal" autoSaveId={id}>
      <ResizablePanel
        className={cn(classNames?.rightPanel)}
        onClick={onLeftPannelClick}
      >
        {leftPannel ? leftPannel : tempLeftPannel}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="">{rightPannel}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default memo(ResizableSplit);
