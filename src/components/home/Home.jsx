import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <main className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100 min-h-screen p-8 md:p-20">
      <section className="flex flex-col md:flex-row items-center justify-between py-16 md:py-32">
        <div className="md:w-1/2 mb-10 md:mb-0 flex flex-col justify-center gap-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MERO LAWYER</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg text-justify">
            Mero Lawyer is a web platform that helps you understand legal matters easily. You can ask questions about the constitution, get guidance on legal documents, and even compare different documents side by side. The site is designed to be simple and user-friendly, with a clean dashboard, sidebar navigation, and light/dark mode for comfortable reading.
          </p>
          <div className="flex gap-7">
            <Link to='/chat'>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
              Talk About Constitution
            </button>
            </Link>
            <Link to='/documents'>
            <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              Compare Documents
            </button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src='src/assets/images/constitution.png'
            alt="Constitution"
            className="w-full max-w-lg rounded-lg"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
