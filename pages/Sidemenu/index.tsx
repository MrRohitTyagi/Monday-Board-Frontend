"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
//utils
import { cn } from "@/lib/utils";

//constants
import { navConfig } from "@/pages/Sidemenu/constants";

//hooks
import { useSideMenu } from "@/zstore";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type SideMenuProps = {};

const SideMenu = (props: SideMenuProps) => {
  const { isCollapsed, toggleSideMenu } = useSideMenu();
  const [selected, setSelected] = useState("/");

  return (
    <div
      className={cn(
        isCollapsed
          ? "w-sidemenu-width-collapsed"
          : "w-sidemenu-width-extended",
        `bg-main-fg rounded-tr-lg shrink-0`,
        isCollapsed ? "" : `p-4 pt-8`,
        `relative overflow-hidden transition-all`,
        `group`
      )}
    >
      <Button
        variant={"ghost"}
        onClick={toggleSideMenu}
        className={cn(
          "rounded-none rounded-bl-md bg-main-light transition-all",
          isCollapsed ? "relative" : "absolute",
          "h-10 place-content-center top-0 right-0 overflow-hidden p-1",
          `opacity-${isCollapsed ? "100" : "0"} group-hover:opacity-100`,
          isCollapsed ? `rounded-none w-full` : "w-10"
        )}
      >
        {isCollapsed ? (
          <ChevronRight size="15px" />
        ) : (
          <ChevronLeft size="15px" />
        )}
      </Button>

      <div
        className={cn(
          "sidemenu-content flex flex-col gap-2 ",
          isCollapsed ? "items-center" : "items-start"
        )}
      >
        {navConfig.map((nav) => (
          <NavLink
            key={nav.href}
            href={nav.href}
            label={nav.label}
            selected={selected === nav.href}
            icon={nav.icon}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    </div>
  );
};

type NavLinkProps = {
  icon: LucideIcon;
  isCollapsed: boolean;
  href: string;
  label: string;
  selected: boolean;
};

const NavLink = ({
  href,
  label,
  selected,
  icon: Icon,
  isCollapsed,
}: NavLinkProps) => {
  return (
    <Link
      className={`transition-all hover:bg-main-light p-2 rounded-sm w-full`}
      href={href}
    >
      {isCollapsed ? <Icon size={"20px"} /> : label}
    </Link>
  );
};

export default SideMenu;
