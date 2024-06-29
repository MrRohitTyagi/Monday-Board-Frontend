import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const useNavigate = () => {
  const router = useRouter();

  const queryString = useSearchParams()?.toString();

  const navigateWithQuery = useCallback((path: string) => {
    router.push(`${path}?${queryString}`);
  }, []);
  return { navigateWithQuery };
};

export default useNavigate;
