"use client";
import React, { useEffect } from "react";
import { ChildrenType } from "@/types";
import MainLayout from "./MainLayout";
import { useAuth } from "@/zstore";
import { cn } from "@/lib/utils";
import { TEMP_USER } from "./TEMPDATA";

type AuthorizeTypes = ChildrenType & {};

const Authorize = ({ children }: AuthorizeTypes) => {
  const { setUser, isLoading } = useAuth();
  console.log(
    `%c TEMP_USER `,
    "color: yellow;border:1px solid lightgreen",
    TEMP_USER
  );
  useEffect(() => {
    setTimeout(() => {
      setUser(TEMP_USER);
      // router.push(`/${TEMP_USER.org}`);
    }, 10);
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <span
          className={cn(
            "loading loading-ring loading-lg",
            "absolute top-1/2 left-1/2",
            "translate-x-[-50%] translate-y-[-50%]"
          )}
        />
      ) : (
        children
      )}
    </MainLayout>
  );
};

export default Authorize;
