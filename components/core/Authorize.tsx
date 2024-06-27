"use client";
import React, { memo, useCallback, useEffect } from "react";
import MainLayout from "./MainLayout";
import { useAuth } from "@/zstore";
import { cn } from "@/lib/utils";
import { getToken } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { ChildrenType } from "@/types/genericTypes";
import useTheme from "@/hooks/useTheme";
import { useConfig } from "@/store/configStore";

type AuthorizeTypes = ChildrenType & {};

const Authorize = ({ children }: AuthorizeTypes) => {
  const { isLoading, fetchUser, notAuthenticated } = useAuth();
  const router = useRouter();
  const { getTheme, applyTheme } = useTheme();
  const { ...config } = useConfig();
  console.log(`%c config `, "color: orange;border:2px solid cyan", config);

  const logout = useCallback((data: any) => {
    router.replace("/login");
    notAuthenticated();
  }, []);

  useEffect(() => {
    const theme = getTheme();
    applyTheme(theme._id);
  }, []);

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
