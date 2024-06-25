import React, { useCallback } from "react";

import { useAuth } from "@/zstore";
import { useRouter, useSearchParams } from "next/navigation";

const useNavigate = () => {
  const router = useRouter();
  const {
    user: { org },
  } = useAuth();

  const queryString = useSearchParams()?.toString();

  const navigate = useCallback(
    (path: string, isBase?: boolean) => {
      if (org && isBase !== true) {
        router.push(`/main/${org}/${path}`);
      } else {
        router.push(`/${path}`);
      }
    },
    [org]
  );

  const navigateWithQuery = useCallback(
    (path: string, isBase: boolean = false) => {
      navigate(`${path}?${queryString}`, isBase);
    },
    [navigate]
  );
  return { navigate, navigateWithQuery };
};

export default useNavigate;
