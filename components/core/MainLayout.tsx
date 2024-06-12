import React from "react";
// types
import { ChildrenType } from "@/types";

// Components
import Navbar from "./Navbar";

type MainLayoutProps = ChildrenType & {};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="p-1">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
