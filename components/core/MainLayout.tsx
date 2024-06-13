"use client";
import React from "react";
// types
import { ChildrenType } from "@/types";

// Components
import Navbar from "./Navbar";
import SideMenu from "@/pages/Sidemenu";
import { cn } from "@/lib/utils";
import { useSideMenu } from "@/zstore";

type MainLayoutProps = ChildrenType & {};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isCollapsed } = useSideMenu();
  return (
    <div className="grid grid-rows-[3rem_1fr] h-dvh">
      <Navbar />
      <div
        className={cn(
          isCollapsed ? "grid-cols-[3rem_1fr]" : "grid-cols-[12rem_1fr]",
          "grid gap-4 rounded-tr-md"
        )}
      >
        <SideMenu />
        <div
          style={{ transition: "width 200ms ease" }}
          className={cn(
            'main-right-cont',
            "p-2 rounded-tl-lg grow shrink-0 bg-main-fg",
            "h-main-content-height  overflow-auto"
          )}
        >
          {children}
        </div>
      </div>
      {/* <div className="flex grow-1 flex-row gap-4 rounded-tr-md">
        <SideMenu />
        <div className="p-2 rounded-tl-lg grow shrink-0 bg-main-fg">
          {children}
        </div>
      </div> */}
    </div>
  );
};

export default MainLayout;
