import React, { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ChildrenType } from "@/types/genericTypes";
import { cn } from "@/lib/utils";

type ContextMenuCompProps = { menuItems: ReactNode } & ChildrenType;
const ContextMenuComp = ({ children, menuItems }: ContextMenuCompProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className={cn("p-0")}>
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
