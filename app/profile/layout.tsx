"use client";

import React from "react";
import { cn } from "@/lib/utils";
import ProfileHeader from "./components/ProfileHeader";
import Divider from "@/components/core/Divider";
import { ChildrenType } from "@/types/genericTypes";
import ProfileSideMenu from "./components/ProfileSideMenu";

type ProfileLayoutProps = {} & ChildrenType;

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div
      className={cn(
        "profile-main-cont",
        "fixed top-0 bottom-0 left-0 right-0",
        "bg-layer-bg",
        "pt-8 px-8"
      )}
    >
      <div
        className={cn(
          "profile-inner-cont",
          "bg-main-fg h-full w-full rounded-lg",
          "flex flex-col"
        )}
      >
        <ProfileHeader />
        <Divider className="h-0.5" />
        <div
          className={cn(
            "lower-body-cont",
            "border-main-bg border-2",
            "h-full w-full shrink-0",
            "grid grid-cols-[12rem_1fr]"
          )}
        >
          <div
            className={cn(
              "profile-sidebar h-full",
              "border-r-4 border-main-bg"
            )}
          >
            <ProfileSideMenu />
          </div>

          <div className="profile-right-content h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
