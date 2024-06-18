"use client";

import { useAuth } from "@/zstore";
import { useRouter } from "next/navigation";

export default function Home() {
  const {
    user: { org },
  } = useAuth();
  const router = useRouter();

  router.replace(`/main/${org}`);

  return null;
}
