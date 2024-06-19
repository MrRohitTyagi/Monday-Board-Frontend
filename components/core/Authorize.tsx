"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import { ChildrenType } from "@/types";
import MainLayout from "./MainLayout";
import { useAuth, useSideMenu } from "@/zstore";
import { cn } from "@/lib/utils";
import { getToken } from "@/utils/cookie";
import useNavigate from "@/hooks/useNavigate";
import { usePathname, useRouter } from "next/navigation";

type AuthorizeTypes = ChildrenType & {};

const Authorize = ({ children }: AuthorizeTypes) => {
  const { isLoading, fetchUser, notAuthenticated, isAuthenticated, user } =
    useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const pathname = usePathname();

  function logout(data: any) {
    router.replace("/login");
    notAuthenticated();
  }

  useEffect(() => {
    document.addEventListener("LOGOUT", logout);
    return () => document.removeEventListener("LOGOUT", logout);
  }, []);

  useEffect(() => {
    const token = getToken();
    async function init() {
      fetchUser("user");
    }
    if (token) init();
    else {
      notAuthenticated();
    }
  }, []);

  useMemo(() => {
    console.log(`%c {isLoading} `, "color: red;border:2px dotted red", {
      user,
      pathname,
      isLoading,
      isAuthenticated,
    });
  }, [user]);

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

export default memo(Authorize);
