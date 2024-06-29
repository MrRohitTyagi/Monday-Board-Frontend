"use client";
import Link from "next/link";
import React, { memo, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

//UI elements
import { Button } from "@/components/ui/button";

//utils
import { cn } from "@/lib/utils";

//constants

//hooks
import { useAuth, useSideMenu } from "@/zstore";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  LucideIcon,
} from "lucide-react";
import SidemenuBoardListing from "./SidemenuBoardListing";
import Space from "@/components/core/Space";

export const gertNavConfig = () => {
  return [
    {
      href: `/main`,
      label: "Home",
      icon: HomeIcon,
    },
    {
      href: `/main/my-work`,
      label: "My Work",
      icon: BriefcaseBusiness,
    },
    { isDivider: true },
  ];
};

type SideMenuProps = {};

const SideMenu = ({}: SideMenuProps) => {
  const { isCollapsed, toggleSideMenu } = useSideMenu();
  const { isAuthenticated, isLoading } = useAuth();
  const [selected, setSelected] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setSelected(`${pathname}`);
  }, [pathname]);

  const navConfig = useMemo(() => {
    return gertNavConfig();
  }, [gertNavConfig]);

  return (
    <div
      style={{ transition: "width 500ms ease-in-out" }}
      className={cn(
        isCollapsed
          ? "w-sidemenu-width-collapsed"
          : "w-sidemenu-width-extended",
        `bg-main-fg rounded-tr-lg shrink-0`,
        isCollapsed ? "" : `p-4`,
        `relative overflow-hidden`,
        `group  animate-fadeIn`,
        isAuthenticated ? "" : "opacity-70 cursor-not-allowed"
      )}
    >
      {isCollapsed === false && <Space h={4} />}
      {isLoading === false && (
        <div className="expand-buitton-wrapper flex flex-row justify-end pt-[1px] pr-[1px]">
          <Button
            variant={"ghost"}
            disabled={isAuthenticated === false}
            onClick={toggleSideMenu}
            className={cn(
              " z-[200] rounded-tr-lg",
              "transition-[width] duration-500",
              "rounded-none rounded-bl-md rounded-tr-md bg-main-bg transition-all",
              isCollapsed ? "relative" : "absolute",
              "h-10 place-content-center top-[1px] right-[1px] overflow-hidden p-1",
              `${
                isCollapsed ? "opacity-100" : "opacity-0"
              } group-hover:opacity-100`,
              isCollapsed ? `rounded-none rounded-tr-md w-full` : "w-10"
            )}
          >
            {isCollapsed ? (
              <ChevronRight size="15px" />
            ) : (
              <ChevronLeft size="15px" />
            )}
          </Button>
        </div>
      )}

      <div
        className={cn(
          "sidemenu-content flex flex-col gap-2 ",
          "items-start animate-fadeIn",
          isAuthenticated ? "" : "cursor-not-allowed"
        )}
      >
        {navConfig.map(({ href = "", label, ...nav }, i) =>
          nav.isDivider ? (
            <div key={href} className="divider m-0 h-0" />
          ) : (
            <NavLink
              isAuthenticated={isAuthenticated}
              key={href}
              href={href || ""}
              label={label || ""}
              selected={selected === href}
              icon={nav.icon as LucideIcon}
              isCollapsed={isCollapsed}
            />
          )
        )}
        {/* Extra nav items  */}
        {/* {isCollapsed === false && isAuthenticated === true && (
          <SelectComp onChange={() => {}} options={boardFilterOptions} />
        )} */}
        <SidemenuBoardListing isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

type NavLinkProps = {
  icon: LucideIcon;
  isAuthenticated: boolean;
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
  isAuthenticated,
}: NavLinkProps) => {
  return (
    <Link
      className={cn(
        "transition-all duration-300 ",
        selected ? "" : "hover:bg-main-bg",
        "rounded-sm w-full",
        "whitespace-nowrap flex flex-row",
        isCollapsed ? "justify-center" : "justify-start",
        selected ? "bg-highlighter-dark" : ""
      )}
      href={href}
    >
      <Button
        variant={"ghost"}
        className="p-0 m-0 w-full flex flex-row justify-start pl-3"
        disabled={isAuthenticated === false}
      >
        {isCollapsed ? <Icon size={"20px"} /> : label}
      </Button>
    </Link>
  );
};

export default memo(SideMenu);
