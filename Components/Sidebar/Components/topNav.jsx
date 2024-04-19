import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { userNavigation } from "@/utils/options";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import ProfileDropdown from "./profileDropdown";

const TopNav = ({ setSidebarOpen }) => {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6 justify-between w-[99%]">
          <div>
            <p className="pl-[7px] capitalize text-[23px] ">
              {pathname === "/" ? "Dashboard" : pathname.slice(1)}
            </p>
          </div>
          {/* Profile dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
