"use client";

import { useAuth } from "@/zstore";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { user } = useAuth();
  const router = useRouter();
  if (user._id) router.replace(`/main`);
  else {
    router.replace(`/login`);
  }

  return null;
}
