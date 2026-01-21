import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import NepaliDate from "nepali-date-converter";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: FaHome,
  },
  {
    label: "Ask About Constitution",
    href: "/chat",
    icon: FaClipboardList,
  },
  {
    label: "Compare Documents",
    href: "/documents",
    icon: FaBook,
  },
];

function Navbar() {
  const [lightTheme, setLightTheme] = useState(true);
  const location = useLocation();
  const today = new NepaliDate();

  useEffect(() => {
    const storedTheme = localStorage.getItem("lightTheme");
    const isLight = storedTheme ? JSON.parse(storedTheme) : true;

    setLightTheme(isLight);
    document.documentElement.classList.toggle("dark", !isLight);
  }, []);

  const handleToggle = () => {
    setLightTheme((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", !next);
      localStorage.setItem("lightTheme", JSON.stringify(next));
      return next;
    });
  };

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 shadow-md p-4 flex flex-col">
        <Link to='/'>
      <div className="mb-8 text-blue-600 dark:text-blue-400 font-bold text-xl cursor-pointer">
        MeroLawyer
      </div>
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = location.pathname === href;

          return (
            <Link
              key={label}
              to={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
            >
              <Icon />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300
                     hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {lightTheme ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
          <span className="text-sm">
            {lightTheme ? "Dark Mode" : "Light Mode"}
          </span>
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-400 px-3">
          {today.getYear()} / {today.getMonth() + 1} / {today.getDate()}
        </p>
      </div>
    </aside>
  );
}

export default Navbar;