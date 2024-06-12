import React from "react";
import { ChildrenType } from "@/types";
import MainLayout from "./MainLayout";

type AuthorizeTypes = ChildrenType & {};

const Authorize = ({ children }: AuthorizeTypes) => {
  return (
    <div className="bg-main-bg">
      <MainLayout>{children}</MainLayout>
    </div>
  );
};

export default Authorize;
