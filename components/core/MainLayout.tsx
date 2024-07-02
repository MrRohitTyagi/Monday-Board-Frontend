"use client";
import React, { memo } from "react";
// types

// Components
import Navbar from "./Navbar";
import SideMenu from "@/pages/Sidemenu";
import { cn } from "@/lib/utils";
import { useAuth, useSideMenu } from "@/zstore";
import { ChildrenType } from "@/types/genericTypes";

type MainLayoutProps = ChildrenType & {};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isCollapsed } = useSideMenu();
  const { isAuthenticated } = useAuth();
  return (
    <div className="grid grid-rows-[3rem_1fr] h-dvh animate-fadeIn">
      <Navbar />
      <div
        className={cn(
          "grid",
          isAuthenticated === true && "grid grid-cols-[1fr] w-full",
          isAuthenticated === true &&
            (isCollapsed === true
              ? "grid-cols-[3rem_1fr]"
              : "grid-cols-[12rem_1fr]"),
          //
          "gap-4 rounded-tr-md"
        )}
      >
        {isAuthenticated ? <SideMenu /> : null}
        <div
          id="main-right-cont"
          className={cn(
            "main-right-cont",
            "rounded-tl-lg grow shrink-0 bg-main-fg",
            "h-main-content-height  overflow-auto",
            "px-4 pr-2"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(MainLayout);
