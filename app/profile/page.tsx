"use client";

import React from "react";
import { useAuth } from "@/zstore";
import { cn } from "@/lib/utils";
import AvatarComp from "@/components/core/AvatarComp";
import { Button } from "@/components/ui/button";
import LowOpacityText from "@/components/core/LowOpacityText";
import useNavigate from "@/hooks/useNavigate";

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
  const { user } = useAuth();
  const { navigate } = useNavigate();
  console.log("user", user);
  return (
    <div
      className={cn(
        "profile-right-content",
        "p-4 grid grid-cols-2 gap-3",
        "animate-fadeIn h-fit"
      )}
    >
      <div
        className={cn(
          "profile-user-top",
          "border-main-bg border-2 rounded-lg h-fit",
          "p-4 h-full"
        )}
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
        className={cn(
          "profile-user-bottom",
          "border-2 border-main-bg rounded-lg h-fit",
          "p-4 flex flex-col gap-1"
        )}
      >
        <h1 className="px-2">Assigned Boards</h1>
        {user.boards.map((board) => {
          return (
            <Button
              onClick={() => navigate(`board/${board._id}`)}
              variant={"ghost"}
              className={cn("px-2", "flex flex-row justify-start")}
            >
              <LowOpacityText className="text-start">
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
