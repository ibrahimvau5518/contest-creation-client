import { useQuery } from '@tanstack/react-query';
import usePublicAxios from '../hooks/usePublicAxios';
import { FaCrown, FaTrophy, FaMedal } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';

const LeaderBoard = () => {
  const axiosPublic = usePublicAxios();

  const { data = [], isLoading } = useQuery({
    queryKey: ['leaderBoard'],
    queryFn: async () => {
      const result = await axiosPublic.get('/leaderBoard');
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

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return <FaCrown className="text-3xl text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />;
      case 1: return <FaMedal className="text-3xl text-gray-400 drop-shadow-[0_0_8px_rgba(156,163,175,0.8)]" />;
      case 2: return <FaMedal className="text-3xl text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.8)]" />;
      default: return <span className="text-xl font-bold text-gray-500 dark:text-gray-400">#{index + 1}</span>;
    }
  };

  const getRowClass = (index) => {
    switch(index) {
      case 0: return "bg-yellow-50/50 dark:bg-yellow-900/10 border-l-4 border-yellow-400";
      case 1: return "bg-gray-50/50 dark:bg-gray-800/20 border-l-4 border-gray-400";
      case 2: return "bg-amber-50/50 dark:bg-amber-900/10 border-l-4 border-amber-700";
      default: return "border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/30";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111827] pt-24 pb-12 transition-colors duration-300 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-[#FFB703]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-[#FFB703]/20 rounded-full mb-4 shadow-[0_0_30px_rgba(255,183,3,0.3)]">
            <FaTrophy className="text-4xl text-[#FFB703]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Global <span className="text-[#FFB703]">Leaderboard</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recognizing the top creators and participants who continually dominate and win contests across our platform.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1f2340] shadow-2xl rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="table w-full whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                <tr>
                  <th className="py-5 px-6 font-bold text-center w-24">Rank</th>
                  <th className="py-5 px-6 font-bold">Champion Info</th>
                  <th className="py-5 px-6 font-bold hidden md:table-cell">Contact</th>
                  <th className="py-5 px-6 font-bold text-right">Total Wins</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data?.map((item, index) => (
                  <tr key={item._id} className={`${getRowClass(index)} transition-all duration-300`}>
                    
                    <td className="py-5 px-6 text-center">
                      <div className="flex justify-center items-center">
                        {getRankIcon(index)}
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={item?.winerPhoto || 'https://via.placeholder.com/150'}
                            alt={item?.winerName}
                            className={`w-14 h-14 rounded-full object-cover shadow-md ${index === 0 ? 'ring-4 ring-yellow-400 ring-offset-2 dark:ring-offset-[#1f2340]' : ''}`}
                          />
                          {index === 0 && (
                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 border-2 border-white dark:border-[#1f2340] rounded-full w-6 h-6 flex justify-center items-center text-xs font-bold shadow-lg">1</span>
                          )}
                        </div>
                        <div>
                          <p className="font-extrabold text-gray-900 dark:text-white text-lg">
                            {item?.winerName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 md:hidden mt-0.5">{item?.participateUserEmail}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-5 px-6 hidden md:table-cell">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {item?.participateUserEmail}
                      </span>
                    </td>

                    <td className="py-5 px-6 text-right">
                      <div className="inline-flex items-center justify-center gap-2 bg-[#FFB703]/10 dark:bg-[#FFB703]/20 text-[#d99b00] dark:text-[#FFB703] px-4 py-2 rounded-xl font-bold text-lg">
                        <FaTrophy className="text-sm" /> 
                        {item?.winCount}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeaderBoard;
