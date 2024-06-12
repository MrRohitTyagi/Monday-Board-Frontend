import {
  BriefcaseBusiness,
  ClipboardList,
  Home,
  HomeIcon,
  LucideIcon,
} from "lucide-react";

export const navConfig = [
  { href: "/", label: "Home", icon: HomeIcon as LucideIcon },
  { href: "/my-work", label: "My Work", icon: BriefcaseBusiness },
  { href: "/board", label: "Board", icon: ClipboardList },
];
