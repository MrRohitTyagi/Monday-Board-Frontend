"use client";
import { LogOut, User, UserCog } from "lucide-react";
import React, { memo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@/zstore";
import { usePathname, useRouter } from "next/navigation";
import { deleteToken } from "@/utils/cookie";
import { generatePictureFallback } from "@/utils/helperFunctions";
import AvatarComp from "@/components/core/AvatarComp";
// import { Button } from "@/components/ui/button";

type UserProfileProps = {};

const UserProfile = (props: UserProfileProps) => {
  const [open, setopen] = useState(false);

  const { user, notAuthenticated, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Popover open={open} onOpenChange={setopen}>
      <PopoverTrigger>
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <AvatarComp
            className="w-full h-full"
            fallback={generatePictureFallback(user.username)}
            src={user.picture}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="bg-main-bg w-fit border-2 border-highlighter-dark"
      >
        <div className="flex flex-col gap-2">
          {isAuthenticated && (
            <Button
              onClick={() => {
                router.push(`/profile?redirect_url=${pathname}`);
                setopen(false);
              }}
              className={cn(
                "user-settings",
                "flex flex-row items-center ",
                " justify-start gap-3 w-full"
              )}
            >
              <UserCog color="white" size={20} className="stroke-text-color" />
              <h2>User Profile</h2>
            </Button>
          )}
          <Button
            onClick={() => {
              deleteToken();
              router.replace("/login");
              setopen(false);
              const id = setTimeout(() => {
                notAuthenticated();
                clearTimeout(id);
              }, 700);
            }}
            className={cn(
              "logout ",
              "flex flex-row items-center ",
              " justify-start gap-3 w-full"
            )}
          >
            <LogOut color="white" size={20} className="stroke-text-color" />
            <h2>Logout</h2>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default memo(UserProfile);
