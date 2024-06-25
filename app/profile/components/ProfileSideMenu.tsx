"use client";
import { Button } from "@/components/ui/button";
import useNavigate from "@/hooks/useNavigate";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type ProfileSideMenuProps = {};

const className = "flex flex-row items-center justify-start w-full";

const sideMenuButtons = [
  {
    label: "Profile",
    href: "profile",
  },
  {
    label: "Password",
    href: "profile/password",
  },
  {
    label: "Theme",
    href: "profile/theme",
  },
];
const ProfileSideMenu = (props: ProfileSideMenuProps) => {
  const pathname = usePathname();
  const { navigateWithQuery } = useNavigate();
  return (
    <div className={cn("w-full flex flex-col gap-1", "px-4 py-4")}>
      {sideMenuButtons.map((menu) => {
        const isActive = pathname === `/${menu.href}`;
        return (
          // <Link className={"w-full"} href={menu.href}>
          <Button
            onClick={() => navigateWithQuery(menu.href, true)}
            key={menu.href}
            variant={"ghost"}
            className={cn(className, isActive && "bg-highlighter-dark")}
          >
            <h1>{menu.label}</h1>
          </Button>
          // </Link>
        );
      })}
    </div>
  );
};

export default ProfileSideMenu;
