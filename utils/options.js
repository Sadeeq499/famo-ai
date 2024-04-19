"use client";
import {
  catalogueIcon,
  categoriesIcon,
  dashboardIcon,
  libaryIcon,
  llmsIcon,
  modelsIcon,
} from "@/Icons/svg";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Dashboard", href: "/", icon: dashboardIcon, current: true },
  {
    name: "Catalogue",
    href: "/catalogue",
    icon: catalogueIcon,
    current: false,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: categoriesIcon,
    current: false,
  },
  { name: "Models", href: "/models", icon: modelsIcon, current: false },
  { name: "Library", href: "/library", icon: libaryIcon, current: false },

  { name: "LLMs", href: "#", icon: llmsIcon, current: false },
];

export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];
