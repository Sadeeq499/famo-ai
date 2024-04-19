"use client";
import React from "react";
import { navigation } from "@/utils/options";
import { dark, settings, signout } from "@/Icons/svg";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import logo from "@/public/Images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

export const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col bg-black" style={{ width: '250px' }}>
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center justify-center">
          <Image
            className="h-auto w-[100px]"
            src={logo}
            alt="Your Company"
            width={100}
            height={100}
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation?.map((item) => (
                  <li key={item.name}>
                    <div
                      onClick={() => {
                        router.push(item.href);
                      }}
                      className={classNames(
                        `/${item?.name?.toLowerCase()}` === pathname ||
                          (item.name === "Dashboard" && pathname === "/")
                          ? "bg-orange-500 text-white" // Changed to orange background for active element
                          : "text-gray-400 hover:text-white hover:bg-orange-300",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
            <ul role="list" className="flex flex-1 flex-col ">
              <li className="mt-auto">
                <Link
                  href="/settings"
                  className="group -mx-2 flex gap-[16px] rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <span>{settings}</span>
                  Settings
                </Link>
              </li>
              <li className="mt-[10px] ml-[5px]">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  onClick={() => signOut(() => router.push("/login"))}
                >
                  {signout}
                  Logout
                </a>
              </li>
            </ul>
          </ul>
        </nav>
      </div>
    </div>
  );
};
