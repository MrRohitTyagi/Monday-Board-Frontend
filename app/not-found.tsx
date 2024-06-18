"use client";

import { useAuth } from "@/zstore";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const {
    user: { org },
  } = useAuth();
  const router = useRouter();

  router.replace(`/main/${org}`);

  return null;
}
