"use client";

import React from "react";
import { useAuth } from "@/zstore";
import { cn } from "@/lib/utils";
import AvatarComp from "@/components/core/AvatarComp";
import { Button } from "@/components/ui/button";
import LowOpacityText from "@/components/core/LowOpacityText";
import { useRouter } from "next/navigation";

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
  const { user } = useAuth();
  const router = useRouter();
  console.log("user", user);
  return (
    <div
      className={cn(
        "p-4 flex flex-row flex-wrap gap-3",
        "animate-fadeIn h-fit"
      )}
    >
      <div
        className={cn(
          "profile-user-top",
          "border-main-bg border-2 rounded-lg",
          "p-4 grow overflow-hidden"
        )}
        style={{ height: `${(user.boards.length + 1) * 3}rem` }}
      >
        <div className="flex flex-row gap-3">
          <div className="">
            <AvatarComp src={user.picture} className="h-24 w-24" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">{user.username}</h1>
            <h1>{user.email}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2"></div>
      </div>

      <div
        style={{ height: `${(user.boards.length + 1) * 3}rem` }}
        className={cn(
          "profile-user-bottom",
          "border-2 border-main-bg rounded-lg",
          "p-4 flex flex-col gap-1 grow overflow-hidden"
        )}
      >
        <h1 className="px-2">Assigned Boards</h1>
        {user.boards.map((board) => {
          return (
            <Button
              onClick={() => router.push(`/main/board/${board._id}`)}
              variant={"ghost"}
              className={cn("px-2", "flex flex-row justify-start gap-2")}
            >
              <AvatarComp src={board.picture} className="h-8 w-8" />
              <LowOpacityText className="text-start line-clamp-1 overflow-hidden">
                {board.title}
              </LowOpacityText>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
