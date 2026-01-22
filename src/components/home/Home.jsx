import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <main className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col justify-center transition-colors">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 w-full px-6 md:px-20">
        
        {/* Text Content */}
        <div className="md:w-1/2 flex flex-col justify-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            Mero Lawyer
          </h1>
          
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify">
            Mero Lawyer makes understanding the law simple and stress-free. Ask questions about the constitution, get guidance on any legal documents, and easily compare documents side by side. Everything you need is right here, clear, helpful, and designed to make legal matters feel a little less complicated.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-6 mt-4">
            <Link to="/chat">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Talk About Constitution
              </button>
            </Link>

            <Link to="/documents">
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Compare Documents
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="src/assets/images/constitution.png"
            alt="Constitution"
            className="w-full max-w-xl rounded-xl shadow-xl object-contain"
          />
        </div>
      </section>

      {/* Features Section */}
<section className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">

  {/* Card 1 */}
  <div className="p-8 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transform transition duration-300">
    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Ask Questions</h3>
    <p className="text-gray-700 dark:text-gray-300 text-sm">
      Get AI-assisted answers to your legal queries instantly.
    </p>
  </div>

  {/* Card 2 */}
  <div className="p-8 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transform transition duration-300">
    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Compare Documents</h3>
    <p className="text-gray-700 dark:text-gray-300 text-sm">
      Upload documents and see differences clearly with AI analysis.
    </p>
  </div>

  {/* Card 3 */}
  <div className="p-8 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transform transition duration-300">
    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">User-Friendly Design</h3>
    <p className="text-gray-700 dark:text-gray-300 text-sm">
      Navigate easily with a clean dashboard, sidebar, and light/dark mode.
    </p>
  </div>

</section>

    </main>
  );
};

export default Home;
