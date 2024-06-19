"use client";

import { useAuth } from "@/zstore";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  if (user._id) router.replace(`/main/${user.org}`);
  else {
    router.replace(`/login`);
  }

  return null;
}
