import React from 'react';

const Banner = () => {
  return (
    <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] my-5">
      {/* Banner Background Image */}
      <img
        src="/your-banner.jpg"
        alt="Banner"
        className="w-full h-full object-cover rounded-xl"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-sky-300 to-indigo-600 bg-opacity-50 rounded-xl"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3 ">
          Welcome to{' '}
          <span
            className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 to-sky-400 
             drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]"
          >
            Contest
            <span
              className="text-transparent bg-clip-text bg-gradient-to-br from-amber-600 to-amber-300 font-bold
               drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]"
            >
              Hub
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-lg opacity-90 mb-6 max-w-xl text-shadow-lg">
          Explore weekly contests, track your progress, and climb the
          leaderboard!
        </p>

        {/* Search Box */}
        <div className="w-full max-w-md flex items-center bg-white rounded-full overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search Contests..."
            className="flex-1 px-4 py-2 text-gray-700 outline-none"
          />
          <button className="px-5 py-2 bg-amber-500 text-white font-semibold hover:bg-amber-600 transition">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
