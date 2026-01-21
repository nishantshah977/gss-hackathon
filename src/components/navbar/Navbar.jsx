import React, { useEffect, useState } from 'react';
import { FaHome, FaBook, FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router';
import { MdLightMode, MdDarkMode } from "react-icons/md";
import NepaliDate from 'nepali-date-converter';

function Navbar() {
  const [lightTheme, setLightTheme] = useState(true);
  const todayDate = new NepaliDate()
  useEffect(() => {
    const storedTheme = localStorage.getItem('lightTheme');
    const isLight = storedTheme ? JSON.parse(storedTheme) : true;

    setLightTheme(isLight);

    if (!isLight) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggle = () => {
    setLightTheme(prev => {
      const nextTheme = !prev;

      if (nextTheme) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }

      localStorage.setItem('lightTheme', JSON.stringify(nextTheme));
      return nextTheme;
    });
  };

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 shadow-md p-4 flex flex-col">
      
      <div className="mb-8 flex items-center">
        <div className="text-blue-600 dark:text-blue-400 font-bold text-xl">
          MeroLawyer
        </div>
      </div>

      <nav className="flex flex-col gap-4 flex-1">
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 
                     hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/constitution"
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 
                     hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <FaClipboardList />
          Ask About Constitution
        </Link>

        <Link
          to="/documents"
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 
                     hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <FaCalendarAlt />
          Ask About Documents
        </Link>

        <Link
          to="/compare"
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 
                     hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <FaBook />
          Compare Documents
        </Link>
      </nav>
        <div className='flex flex-col gap-5 mb-2'>
      <button
        onClick={handleToggle}
        className="mt-6 flex items-center gap-2 text-gray-700 dark:text-gray-300
                   hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        {lightTheme ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
        <span className="text-sm">
          {lightTheme ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
      <p className='text-gray-700 dark:text-gray-300 ps-3'>{todayDate.getYear()} / {todayDate.getMonth()} / {todayDate.getDay()}
      </p>
      </div>
    </aside>
  );
}

export default Navbar;
