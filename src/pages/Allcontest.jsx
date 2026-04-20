import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAllContest from '../hooks/useAllContest';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FaPlay, FaUsers, FaArrowRight, FaGamepad } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';

const AllContest = () => {
  const { currentPage, setCurrentPage } = useContext(AuthContext);
  const [allContest, , isLoading] = useAllContest();

  const { data: countData } = useQuery({
    queryKey: ['countApproved'],
    queryFn: async () => {
      return fetch('https://contest-creation.vercel.app/count/allContest').then(
        res => res.json(),
      );
    },
  });

  const count = countData?.count || 0;
  let numberOfPage = Math.ceil(count / 10);
  const pages = numberOfPage > 0 ? [...Array(numberOfPage).keys()] : [];

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-[#111827]">
        <ImSpinner9 className="animate-spin text-5xl text-[#FFB703]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111827] transition-colors duration-300 relative overflow-hidden">
      {/* Hero Banner Section */}
      <div className="relative w-full pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
            alt="Contests"
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/10 via-gray-50/80 to-gray-50 dark:from-[#111827]/10 dark:via-[#111827]/90 dark:to-[#111827]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center animate-in slide-in-from-top-10 fade-in duration-700">
          <div className="inline-flex justify-center items-center p-4 bg-[#FFB703]/20 rounded-full mb-6">
            <FaGamepad className="text-5xl text-[#FFB703]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 mt-4">
            Explore All{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB703] to-[#ff9900]">
              Contests
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Find your next challenge. Browse through a wide variety of
            competitions carefully curated to test your skills, provide
            real-world experience, and offer massive premium rewards.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16 relative z-10 -mt-8">
        {allContest.length < 1 ? (
          <div className="text-center py-24 bg-white dark:bg-[#1f2340] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
            <FaGamepad className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-400 dark:text-gray-500">
              No active contests found.
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {allContest.map((data, index) => (
              <div
                key={data._id}
                className="group flex flex-col bg-white dark:bg-[#1f2340] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-800 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <img
                      src={data?.image || 'https://via.placeholder.com/600'}
                      alt={data?.contestName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent opacity-90"></div>

                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-[#1f2340]/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20">
                    <FaUsers className="text-[#0ecdb9]" />
                    <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      {data?.participated || 0} Joined
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white group-hover:text-[#FFB703] transition-colors leading-tight drop-shadow-md">
                      {data?.contestName}
                    </h2>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {data?.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Ongoing
                    </span>
                    <Link to={`/allContests/${data?._id}`}>
                      <button className="btn btn-sm bg-[#FFB703]/10 hover:bg-[#FFB703] text-[#d99b00] hover:text-gray-900 border-none rounded-xl transition-all flex items-center gap-2 group-hover:pr-4">
                        Details{' '}
                        <FaArrowRight className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Modernization */}
        {pages.length > 1 && (
          <div className="flex justify-center items-center mt-16 gap-2 bg-white dark:bg-[#1f2340] px-6 py-4 rounded-full shadow-lg border border-gray-100 dark:border-gray-800 w-fit mx-auto">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="btn btn-sm btn-circle bg-gray-50 dark:bg-gray-800 border-none text-gray-600 dark:text-gray-300 hover:bg-[#0ecdb9] hover:text-white transition-colors disabled:opacity-50"
            >
              «
            </button>

            {pages.map(page => (
              <button
                onClick={() => setCurrentPage(page)}
                key={page}
                className={`btn btn-sm btn-circle border-none font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-[#FFB703] text-gray-900 shadow-md shadow-[#FFB703]/30 scale-110'
                    : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === pages.length - 1}
              className="btn btn-sm btn-circle bg-gray-50 dark:bg-gray-800 border-none text-gray-600 dark:text-gray-300 hover:bg-[#0ecdb9] hover:text-white transition-colors disabled:opacity-50"
            >
              »
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContest;
