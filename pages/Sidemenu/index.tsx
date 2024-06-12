"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

//utils
import { cn } from "@/lib/utils";

//constants
import { gertNavConfig } from "@/pages/Sidemenu/constants";

//hooks
import { useAuth, useSideMenu } from "@/zstore";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type SideMenuProps = {};

const SideMenu = ({}: SideMenuProps) => {
  const { isCollapsed, toggleSideMenu } = useSideMenu();
  const { isAuthenticated } = useAuth();
  const { org } = useAuth();
  const [selected, setSelected] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setSelected(`${pathname}`);
  }, [pathname]);

  console.log(
    `%c selected `,
    "color: aqua;border:2px solid darkorange",
    selected
  );

  const navConfig = useMemo(() => {
    return gertNavConfig(org);
  }, [gertNavConfig, org]);

  return (
    <div
      style={{ transition: "width 200ms ease" }}
      className={cn(
        isCollapsed
          ? "w-sidemenu-width-collapsed"
          : "w-sidemenu-width-extended",
        `bg-main-fg rounded-tr-lg shrink-0`,
        isCollapsed ? "" : `p-4 pt-8`,
        `relative overflow-hidden`,
        `group`,
        isAuthenticated ? "" : "pointer-events-none opacity-70"
      )}
    >
      <Button
        variant={"ghost"}
        onClick={toggleSideMenu}
        className={cn(
          "transition-all",
          "rounded-none rounded-bl-md bg-main-light transition-all",
          isCollapsed ? "relative" : "absolute",
          "h-10 place-content-center top-0 right-0 overflow-hidden p-1",
          `${
            isCollapsed ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100`,
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
        className={cn("sidemenu-content flex flex-col gap-2 ", "items-start")}
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
      className={cn(
        "transition-all duration-300 ",
        selected ? "" : "hover:bg-main-light",
        " p-2 rounded-sm w-full",
        "whitespace-nowrap",
        isCollapsed ? "flex flex-row justify-center" : "flex flex-row",
        selected ? "bg-main-active" : ""
      )}
      href={href}
    >
      {isCollapsed ? <Icon size={"20px"} /> : label}
    </Link>
  );
};

export default SideMenu;
