import React from "react";

const Home = () => {
  return (
    <main className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 min-h-screen p-8 md:p-20">
      <section className="flex flex-col md:flex-row items-center justify-between py-16 md:py-32">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MERO LAWYER</h1>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. If you are going to use a passage of Lorem Ipsum.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
              Free Quote
            </button>
            <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              Watch Video
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/images/constitution.png"
            alt="Constitution"
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
