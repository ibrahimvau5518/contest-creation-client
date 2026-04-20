import { useQuery } from '@tanstack/react-query';
import usePublicAxios from '../hooks/usePublicAxios';
import { ImSpinner9 } from 'react-icons/im';
import { FaClock, FaHourglassHalf, FaCalendarAlt } from 'react-icons/fa';

const Upcoming = () => {
  const axiospublic = usePublicAxios();

  const { data = [], isLoading } = useQuery({
    queryKey: ['upcoming'],
    queryFn: async () => {
      const result = await axiospublic.get('/upcoming');
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-[#111827]">
        <ImSpinner9 className="animate-spin text-5xl text-[#FFB703]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111827] pt-24 pb-16 transition-colors duration-300 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#0ecdb9]/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-[#0ecdb9]/20 rounded-full mb-4 shadow-[0_0_30px_rgba(14,205,185,0.3)]">
            <FaHourglassHalf className="text-4xl text-[#0ecdb9]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Upcoming <span className="text-[#0ecdb9]">Contests</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get ready. These exciting contests are launching soon. Start preparing your skills and checking the requirements.
          </p>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-20 bg-white/50 dark:bg-[#1f2340]/50 backdrop-blur-sm rounded-3xl border border-gray-100 dark:border-gray-800">
            <p className="text-2xl text-gray-500 dark:text-gray-400">No upcoming contests at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item, i) => (
              <div
                key={item._id}
                className="group flex flex-col bg-white dark:bg-[#1f2340] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-2 backdrop-blur-xl"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                    <img
                      src={item?.image || 'https://via.placeholder.com/600x400'}
                      alt={item?.contestName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                    <div className="mb-2">
                       <span className="inline-flex items-center gap-1.5 bg-[#0ecdb9]/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                          <FaClock className="animate-pulse" /> Coming Soon
                       </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-[#0ecdb9] transition-colors">
                    {item?.contestName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {item?.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800/50 flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 mt-auto">
                     <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg font-medium">
                        <FaCalendarAlt className="text-[#FFB703]" /> TBA
                     </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upcoming;
