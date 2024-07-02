import React, { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ChildrenType } from "@/types/genericTypes";
import { cn } from "@/lib/utils";

type ContextMenuCompProps = {
  menuItems: ReactNode;
  clasnames?: {
    trigger?: string;
    content?: string;
  };
} & ChildrenType;
const ContextMenuComp = ({
  children,
  menuItems,
  clasnames,
}: ContextMenuCompProps) => {
  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger className={cn("context-trigger", clasnames?.trigger)}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent
        className={cn("context-content", "p-0", clasnames?.content)}
      >
        {React.Children.map(menuItems, (child) => {
          return (
            <ContextMenuItem className={cn("p-0")}>{child}</ContextMenuItem>
          );
        })}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ContextMenuComp;
