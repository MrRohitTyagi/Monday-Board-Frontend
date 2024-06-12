import Link from "next/link";
import React from "react";
import { Bell } from "lucide-react";

import { Button } from "../ui/button";
import UserProfile from "@/pages/UserProfile";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="items-center w-full h-navbar-height flex flex-row justify-between">
      <Link href="/">Logo</Link>
      <div className="right-side-navbar-stuff">
        <Button className="" variant="ghost">
          <Bell />
        </Button>
        <Button className="" variant="ghost">
          <UserProfile />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
