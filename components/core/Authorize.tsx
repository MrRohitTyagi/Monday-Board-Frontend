"use client";
import React, { useEffect } from "react";
import { ChildrenType } from "@/types";
import MainLayout from "./MainLayout";
import { useAuth } from "@/zstore";
import { cn } from "@/lib/utils";

type AuthorizeTypes = ChildrenType & {};

const Authorize = ({ children }: AuthorizeTypes) => {
  const { isLoading, fetchUser, user } = useAuth();

  useEffect(() => {
    // setTimeout(() => {
    //   setUser(TEMP_USER);
    //   // router.push(`/${TEMP_USER.org}`);
    // }, 10);
    async function init() {
      fetchUser("666c949816b08c238854cabe");
    }
    init();
  }, []);

  console.log(`%c {isloading,user} `, "color: red;border:2px dotted red", {
    isLoading,
    user,
  });

  return (
    <MainLayout>
      {isLoading === true ? (
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
