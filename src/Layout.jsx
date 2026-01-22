// Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/navbar/Navbar";
import { HiMenu } from "react-icons/hi";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Desktop sidebar sits in normal flow (md:block). Mobile sidebar is controlled inside Navbar. */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main area */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Mobile top bar (only visible on small screens) */}
        <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 shadow-sm">
          <div className="text-blue-600 dark:text-blue-400 font-bold">MeroLawyer</div>

          <div className="flex items-center gap-3">
            {/* Hamburger toggles mobile sidebar */}
            <button
              aria-label="Open sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((v) => !v)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <HiMenu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </div>

        {/* Page content area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
