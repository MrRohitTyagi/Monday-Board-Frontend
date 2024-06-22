"use client";
import React, { memo, useEffect } from "react";

import { getToken } from "@/utils/cookie";
import { useAuth } from "@/zstore";
import { useRouter } from "next/navigation";
import { ChildrenType } from "@/types/genericTypes";

type MainEntryPointProps = ChildrenType;
const MainEntryPoint = ({ children }: MainEntryPointProps) => {
  const { notAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const token = getToken();
      if (!token) {
        router.replace("/login");
        notAuthenticated();
      }
    }
    init();
  }, []);
  return children;
};

export default memo(MainEntryPoint);
