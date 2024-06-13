"use client";

import {
  BriefcaseBusiness,
  ClipboardList,
  HomeIcon,
  LucideIcon,
} from "lucide-react";

export const gertNavConfig = (org: string) => {
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
    { isDivider: true },
    // { href: `/${org}/board`, label: "Board", icon: ClipboardList },
  ];
};

export const boardFilterOptions = [
  { value: "all boards", label: "All Boards" },
  { value: "favourite", label: "Favourite" },
];
