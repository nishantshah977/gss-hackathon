// Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { FaHome, FaBook, FaClipboardList } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import NepaliDate from "nepali-date-converter";

const navItems = [
  { label: "Dashboard", href: "/", icon: FaHome },
  { label: "Ask About Constitution", href: "/chat", icon: FaClipboardList },
  { label: "Compare Documents", href: "/documents", icon: FaBook },
];

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [lightTheme, setLightTheme] = useState(true);
  const location = useLocation();
  const today = new NepaliDate();

  useEffect(() => {
    const storedTheme = localStorage.getItem("lightTheme");
    const isLight = storedTheme ? JSON.parse(storedTheme) : true;
    setLightTheme(isLight);
    document.documentElement.classList.toggle("dark", !isLight);
  }, []);

  const handleToggleTheme = () => {
    setLightTheme((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", !next);
      localStorage.setItem("lightTheme", JSON.stringify(next));
      return next;
    });
  };

  return (
    <>
      {/* ===== Desktop sidebar (in-flow) =====
          - visible on md+
          - occupies space so content sits beside it
      */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:min-h-screen bg-white dark:bg-gray-900 shadow-md p-4">
        <div>
          <Link to="/">
            <div className="text-blue-600 dark:text-blue-400 font-bold text-2xl mb-6">MeroLawyer</div>
          </Link>

          <nav className="flex flex-col gap-3">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={label}
                  to={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* bottom area anchored using mt-auto */}
        <div className="mt-auto">
          <button
            onClick={handleToggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {lightTheme ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
            <span className="text-sm">{lightTheme ? "Dark Mode" : "Light Mode"}</span>
          </button>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 px-1">
            {today.getYear()} / {today.getMonth() + 1} / {today.getDate()}
          </p>
        </div>
      </aside>

      {/* ===== Mobile sidebar (sliding panel) =====
          - only mounted on small screens
          - controlled by sidebarOpen
      */}
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sliding panel */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-md p-4 transform transition-transform duration-300 md:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!sidebarOpen}
      >
        <div className="flex items-center justify-between mb-6">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <div className="text-blue-600 dark:text-blue-400 font-bold text-xl">MeroLawyer</div>
          </Link>
          <button
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={label}
                to={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                  ${isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleToggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {lightTheme ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
            <span className="text-sm">{lightTheme ? "Dark Mode" : "Light Mode"}</span>
          </button>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 px-1">
            {today.getYear()} / {today.getMonth() + 1} / {today.getDate()}
          </p>
        </div>
      </aside>
    </>
  );
}
