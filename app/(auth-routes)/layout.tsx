"use client";
import { memo } from "react";

import { ChildrenType } from "@/types/genericTypes";
import { getToken } from "@/utils/cookie";
import { useRouter } from "next/navigation";

type layoutProps = ChildrenType;
const layout = ({ children }: layoutProps) => {
  const router = useRouter();
  const token = getToken();

  if (token) {
    router.replace(`/main`);
    return null;
  }

  return children;
};

export default memo(layout);
