"use client";
import React, { useEffect } from "react";
import { ChildrenType } from "@/types";
import MainLayout from "./MainLayout";
import { useAuth } from "@/zstore";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type AuthorizeTypes = ChildrenType & {};

const tempuser = {
  isAuthenticated: true,
  isLoading: false,
  username: "rohit",
  email: "rohit11@11.com",
  org: "granite-stack",
};

const Authorize = ({ children }: AuthorizeTypes) => {
  const { setUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setUser(tempuser);
      router.push(`/${tempuser.org}`);
    }, 1000);
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <span
          className={cn(
            "loading loading-ring loading-lg",
            "absolute top-1/2 left-1/2"
          )}
        ></span>
      ) : (
        children
      )}
    </MainLayout>
  );
};

export default Authorize;
