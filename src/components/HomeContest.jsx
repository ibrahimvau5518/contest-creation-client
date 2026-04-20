import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import usePublicAxios from '../hooks/usePublicAxios';
import { FaUsers, FaArrowRight, FaClock } from 'react-icons/fa';

const HomeContest = () => {
  const axiosPublic = usePublicAxios();

  const { data: allContest = [], isLoading } = useQuery({
    queryKey: ['homeContests'],
    queryFn: async () => {
      const result = await axiosPublic.get('/allContest-for/home/page?sort=asc');
      return result.data;
    },
  });

  return (
    <div className="relative pb-24 overflow-hidden pt-12 md:pt-0">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0ecdb9]/10 dark:bg-[#0ecdb9]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#FFB703]/10 dark:bg-[#FFB703]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <span className="loading loading-bars text-[#FFB703] loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {allContest
              .filter(item => item.status === 'accepted' || item.status === 'approved')
              .slice(0, 6)
              .map((data, index) => (
                <div 
                  key={data._id}
                  className="group relative bg-white/70 dark:bg-[#1f2340]/60 backdrop-blur-xl rounded-[2rem] border border-gray-100 dark:border-gray-800/50 shadow-2xl hover:shadow-[#0ecdb9]/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full animate-in slide-in-from-bottom border-t-white/40 dark:border-t-white/10"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Card Image Wrapper */}
                  <div className="relative h-[220px] lg:h-[240px] overflow-hidden rounded-t-[2rem]">
                    <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                      src={data?.image || 'https://via.placeholder.com/400'} 
                      alt={data?.contestName} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-5 left-5 z-20 flex gap-2">
                       <span className="px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 shadow-lg border border-white/20">
                          {data?.contestType || 'General'}
                       </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-white mb-3 group-hover:text-[#FFB703] transition-colors line-clamp-1 truncate">
                      {data?.contestName}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 text-sm md:text-base leading-relaxed flex-grow">
                      {data?.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-800/50">
                       <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <div className="w-8 h-8 rounded-full bg-[#0ecdb9]/10 flex items-center justify-center">
                             <FaUsers className="text-[#0ecdb9]" />
                          </div>
                          <span>{data?.participated || 0} Joined</span>
                       </div>

                       <Link to={`/allContests/${data?._id}`}>
                          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-[#FFB703] dark:bg-gray-800 dark:hover:bg-[#FFB703] text-gray-400 hover:text-gray-900 dark:text-gray-500 group-hover:bg-[#FFB703] group-hover:text-gray-900 transition-all duration-300 shadow-sm">
                            <FaArrowRight className="transform group-hover:translate-x-0.5 transition-transform" />
                          </button>
                       </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* View All Contests Button */}
        <div className="flex justify-center mt-16 pb-12">
          <Link to="/allContest">
            <button className="group px-8 py-4 bg-white dark:bg-[#1f2340] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-full font-extrabold shadow-xl border border-gray-200 dark:border-gray-700 flex items-center gap-3 transition-all transform hover:-translate-y-1 min-w-[200px] justify-center tracking-wide">
              Explore All Contests 
              <span className="w-8 h-8 rounded-full bg-[#FFB703]/20 flex items-center justify-center group-hover:bg-[#FFB703] group-hover:text-gray-900 transition-colors">
                 <FaArrowRight className="text-[#FFB703] group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeContest;
