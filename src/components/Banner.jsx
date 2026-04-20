import { useContext, useRef } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';
import { FaSearch, FaTrophy, FaUsers, FaMedal } from 'react-icons/fa';
import NumberCounter from 'number-counter';

const Banner = () => {
  const textRef = useRef();
  const navigate = useNavigate();
  const { setInputData } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    const value = textRef.current.value;
    if (value.trim()) {
      setInputData(value);
      textRef.current.value = '';
      navigate('/allContest');
    }
  };

  return (
    <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden min-h-[85vh] flex flex-col justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white/90 to-gray-50 dark:from-[#111827]/80 dark:via-[#111827]/95 dark:to-[#111827]"></div>
         <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#FFB703] opacity-10 dark:opacity-5 blur-[120px] animate-pulse"></div>
         <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#0ecdb9] opacity-10 dark:opacity-5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-in slide-in-from-left-10 fade-in duration-1000 text-center lg:text-left mt-8 lg:mt-0 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1f2340] border border-gray-100 dark:border-gray-800 shadow-md">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#0ecdb9] animate-ping"></span>
              <span className="text-sm font-bold tracking-wide text-gray-800 dark:text-gray-200">The #1 Premium Contest Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1]">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB703] to-[#ff9900]">Talent & Skills</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Compete globally against elite creators, solve real-world challenges, and win massive premium rewards. Your next big breakthrough starts right here.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleClick} className="relative max-w-xl mx-auto lg:mx-0 group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFB703] to-[#0ecdb9] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative flex items-center bg-white dark:bg-[#1f2340] rounded-2xl p-2 shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="pl-4 text-gray-400">
                  <FaSearch className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  ref={textRef}
                  placeholder="What contest are you looking for?"
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white px-4 h-12 outline-none font-medium placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="h-12 px-8 bg-[#FFB703] hover:bg-[#e5a400] text-gray-900 font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-md"
                >
                  Search
                </button>
              </div>
            </form>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm font-semibold text-gray-500 dark:text-gray-400 pt-4">
               <span>Popular tags:</span>
               <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors">Design</span>
               <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors">Article</span>
               <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors">Gaming</span>
            </div>
          </div>

          {/* Hero Image & Graphics */}
          <div className="relative animate-in slide-in-from-right-10 fade-in duration-1000 delay-300 mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10 block lg:hidden"></div>
               <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  className="w-full object-cover h-[400px] lg:h-[550px] rounded-3xl transform hover:scale-105 transition-transform duration-700"
                  alt="Team Collaboration"
               />
               
               {/* Floating Badges */}
               <div className="absolute top-6 -left-6 lg:-left-12 bg-white dark:bg-[#1f2340] p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#0ecdb9]/20 flex items-center justify-center">
                        <FaMedal className="text-xl text-[#0ecdb9]" />
                     </div>
                     <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Reward Pool</p>
                        <p className="text-lg font-extrabold text-gray-900 dark:text-white">$50k+</p>
                     </div>
                  </div>
               </div>
               
               <div className="absolute bottom-10 -right-4 lg:-right-8 bg-white dark:bg-[#1f2340] p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <div className="flex flex-col items-center gap-1">
                     <div className="flex -space-x-2">
                        <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1f2340]" src="https://i.pravatar.cc/100?img=1" alt="Avatar 1" />
                        <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1f2340]" src="https://i.pravatar.cc/100?img=2" alt="Avatar 2" />
                        <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1f2340]" src="https://i.pravatar.cc/100?img=3" alt="Avatar 3" />
                     </div>
                     <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">100k+ Active Users</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 lg:mt-24 relative z-20">
          <div className="bg-white/80 dark:bg-[#1f2340]/80 backdrop-blur-xl rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
              
              <div className="flex items-center justify-center gap-6 pt-4 md:pt-0">
                <div className="w-14 h-14 rounded-2xl bg-[#FFB703]/20 flex items-center justify-center shadow-inner">
                  <FaTrophy className="text-3xl text-[#FFB703]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Total Contests</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                    <NumberCounter end={50} delay={4} postFix="+" className="inline-block" />
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 pt-8 md:pt-0">
                <div className="w-14 h-14 rounded-2xl bg-[#0ecdb9]/20 flex items-center justify-center shadow-inner">
                  <FaUsers className="text-3xl text-[#0ecdb9]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Active Users</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                    <NumberCounter end={100} delay={4} postFix="k+" className="inline-block" />
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 pt-8 md:pt-0">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center shadow-inner">
                  <FaMedal className="text-3xl text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Champions</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                    <NumberCounter end={1} delay={4} postFix="M+" className="inline-block" />
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
