import React from "react";
// types
import { ChildrenType } from "@/types";

// Components
import Navbar from "./Navbar";
import SideMenu from "@/pages/Sidemenu";

type MainLayoutProps = ChildrenType & {};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="grid grid-rows-[3rem_1fr] h-dvh">
      <Navbar />
      <div className="flex grow-1 flex-row gap-4 rounded-tr-md">
        <SideMenu />
        <div className="p-2 rounded-tl-lg grow shrink-0 bg-main-fg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
