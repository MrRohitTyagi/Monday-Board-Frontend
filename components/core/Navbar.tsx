"use client";
import Link from "next/link";
import React from "react";
import { Bell } from "lucide-react";

import { Button } from "../ui/button";
import UserProfile from "@/pages/UserProfile";
import { useAuth } from "@/zstore";
import { cn } from "@/lib/utils";

type Props = {};

const Navbar = (props: Props) => {
  const { isAuthenticated } = useAuth();
  return (
    <div
      className={cn(
        "p-2 pr-8 items-center w-full h-navbar-height",
        " flex flex-row justify-between",
        isAuthenticated ? "" : "pointer-events-none opacity-50"
      )}
    >
      <Link href="/">TaskBoard.io</Link>
      <div className="right-side-navbar-stuff">
        <Button className="" variant="ghost">
          <Bell />
        </Button>
        <UserProfile />
      </div>
    </div>
  );
};

export default Navbar;
