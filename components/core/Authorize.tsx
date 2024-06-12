import React from "react";
import { ChildrenType } from "@/types";
import MainLayout from "./MainLayout";

type AuthorizeTypes = ChildrenType & {};

const Authorize = ({ children }: AuthorizeTypes) => {
  return <MainLayout>{children}</MainLayout>;
};

export default Authorize;
