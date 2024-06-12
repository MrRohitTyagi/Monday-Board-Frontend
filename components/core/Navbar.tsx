import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="items-center w-full h-navbar-height border flex flex-row justify-between">
      <Link href="/">Logo</Link>
      <div className="right-side-navbar-stuff">
        <Button className="" variant="ghost">
          <Bell />
        </Button>
        <Button className="" variant="ghost">
          <Bell />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
