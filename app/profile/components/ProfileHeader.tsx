"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type ProfileHeaderProps = {};

const ProfileHeader = (props: ProfileHeaderProps) => {
  const query = useSearchParams();
  const router = useRouter();

  const redirectBack = query?.get("redirect_url");

  return (
    <div className="h-12 w-full pl-6 pr-2 flex flex-row items-center shrink-0 justify-between">
      <h1 className="text-2xl">Profile</h1>
      <Button
        variant={"ghost"}
        onClick={() => router.push(redirectBack || "/")}
      >
        <X />
      </Button>
    </div>
  );
};

export default ProfileHeader;
