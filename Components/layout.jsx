"use client";
import { Fragment, useState } from "react";
import Mobileview from "./Sidebar/Components/mobileview";
import { LeftSidebar } from "./Sidebar/Components/sidebar";
import TopNav from "./Sidebar/Components/topNav";
import { ToastContainer } from "react-toastify";

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Mobileview sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Static sidebar for desktop */}

        <LeftSidebar />

        <div className="lg:pl-[14rem]">
          <TopNav setSidebarOpen={setSidebarOpen} />
          <main className="py-10 px-10">{children}</main>
        </div>
      </div>
    </>
  );
}
