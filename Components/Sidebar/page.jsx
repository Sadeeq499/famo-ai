"use client";
import { Fragment, useState } from "react";

import { LeftSidebar } from "./Components/sidebar";
import TopNav from "./Components/topNav";
import Mobileview from "./Components/mobileview";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <Mobileview sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <LeftSidebar />

        <div className="lg:pl-72">
          <TopNav setSidebarOpen={setSidebarOpen} />
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8 bg-[#d5c8c8]"></div>
          </main>
        </div>
      </div>
    </>
  );
}
