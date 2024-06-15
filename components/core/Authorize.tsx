"use client";
import React, { useEffect } from "react";
import { ChildrenType } from "@/types";
import MainLayout from "./MainLayout";
import { useAuth, useSideMenu } from "@/zstore";
import { cn } from "@/lib/utils";
import { getToken } from "@/utils/cookie";
import useNavigate from "@/hooks/useNavigate";

type AuthorizeTypes = ChildrenType & {};

const Authorize = ({ children }: AuthorizeTypes) => {
  const { isLoading, fetchUser, notAuthenticated, isAuthenticated, user } =
    useAuth();
  const { toggleSideMenu } = useSideMenu();
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const token = getToken();
      if (!token) {
        navigate("login");
        notAuthenticated();
        toggleSideMenu(true);
      } else {
        console.log(`%c token `, "color: green;border:1px solid green", token);
        fetchUser(token);
      }
    }
    function tempInit() {
      fetchUser("666c949816b08c238854cabe");
    }
    init();
    // tempInit();
  }, []);
  console.log(`%c {isLoading} `, "color: red;border:2px dotted red", {
    isLoading,
    isAuthenticated,
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
