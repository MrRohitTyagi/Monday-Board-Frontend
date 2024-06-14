"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
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
import SelectComp from "@/components/core/Select";
import SidemenuBoardListing from "./SidemenuBoardListing";
import { boardFilterOptions } from "@/constants/constants";

export const gertNavConfig = (org: string) => {
  return [
    {
      href: `/main/${org}`,
      label: "Home",
      icon: HomeIcon,
    },
    {
      href: `/main/${org}/my-work`,
      label: "My Work",
      icon: BriefcaseBusiness,
    },
    { isDivider: true },
    // { href: `/${org}/board`, label: "Board", icon: ClipboardList },
  ];
};

type SideMenuProps = {};

const SideMenu = ({}: SideMenuProps) => {
  const { isCollapsed, toggleSideMenu } = useSideMenu();
  const { isAuthenticated, isLoading } = useAuth();
  const {
    user: { org },
  } = useAuth();
  const [selected, setSelected] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setSelected(`${pathname}`);
  }, [pathname]);

  const navConfig = useMemo(() => {
    return gertNavConfig(org);
  }, [gertNavConfig, org]);

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
      {isLoading === false && (
        <div className="expand-buitton-wrapper flex flex-row justify-end">
          <Button
            variant={"ghost"}
            disabled={isAuthenticated === false}
            onClick={toggleSideMenu}
            className={cn(
              "rounded-tr-lg",
              "transition-[width] duration-500",
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
            <div key={href + i} className="divider m-0 h-0" />
          ) : (
            <NavLink
              isAuthenticated={isAuthenticated}
              key={href + i}
              href={href || ""}
              label={label || ""}
              selected={selected === href}
              icon={nav.icon as LucideIcon}
              isCollapsed={isCollapsed}
            />
          )
        )}
        {/* Extra nav items  */}
        {isCollapsed === false && isAuthenticated === true && (
          <>
            <SelectComp onChange={() => {}} options={boardFilterOptions} />
            <SidemenuBoardListing />
          </>
        )}
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
    <Button
      variant={"ghost"}
      className="p-0 m-0 w-full"
      disabled={isAuthenticated === false}
    >
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
    </Button>
  );
};

export default SideMenu;
