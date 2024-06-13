import React, { useCallback } from "react";

import { useAuth } from "@/zstore";
import { useRouter } from "next/navigation";

const useNavigate = () => {
  const router = useRouter();
  const { org } = useAuth();

  const navigate = useCallback(
    (path: string) => {
      router.push(`/${org}/${path}`);
    },
    [org]
  );
  return navigate;
};

export default useNavigate;
