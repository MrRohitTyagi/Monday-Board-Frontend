import React, { memo } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

type DrawerCompProps = {
  trigger: React.ReactNode | string;
  children: React.ReactNode | string;
};
const DrawerComp = ({ trigger, children }: DrawerCompProps) => {
  return (
    <Drawer handleOnly>
      <DrawerTrigger>{trigger}ds</DrawerTrigger>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
};

export default memo(DrawerComp);
