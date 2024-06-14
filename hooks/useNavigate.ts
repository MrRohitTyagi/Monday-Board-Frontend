import React, { useCallback } from "react";

import { useAuth } from "@/zstore";
import { useRouter } from "next/navigation";

const useNavigate = () => {
  const router = useRouter();
  const {
    user: { org },
  } = useAuth();

  const navigate = useCallback(
    (path: string) => {
      if (org) {
        router.push(`/main/${org}/${path}`);
      } else {
        router.push(`/${path}`);
      }
    },
    [org]
  );
  return navigate;
};

export default useNavigate;
