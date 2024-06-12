"use client";

import {
  BriefcaseBusiness,
  ClipboardList,
  HomeIcon,
  LucideIcon,
} from "lucide-react";

export const gertNavConfig = (org: string) => [
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
