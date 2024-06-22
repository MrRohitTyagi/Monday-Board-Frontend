"use client";

import { ChildrenType } from "@/types";
import { getToken } from "@/utils/cookie";
import { useAuth } from "@/zstore";
import { useRouter } from "next/navigation";
import { memo } from "react";

type layoutProps = ChildrenType;
const layout = ({ children }: layoutProps) => {
  const router = useRouter();
  const token = getToken();
  const { user } = useAuth();

  if (token) {
    router.replace(`/main/${user.org}`);
    return null;
  }

  return children;
};

export default memo(layout);
