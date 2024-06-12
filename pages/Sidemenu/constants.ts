"use client";

import {
  BriefcaseBusiness,
  ClipboardList,
  HomeIcon,
  LucideIcon,
} from "lucide-react";

export const gertNavConfig = (org: string) => {
  console.log(`%c org `, "color: yellow;border:1px solid lightgreen", org);
  return [
    {
      href: `/${org}`,
      label: "Home",
      icon: HomeIcon as LucideIcon,
    },
    {
      href: `/${org}/my-work`,
      label: "My Work",
      icon: BriefcaseBusiness,
    },
    { href: `/${org}/board`, label: "Board", icon: ClipboardList },
  ];
};
