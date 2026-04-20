import { Link } from 'react-router';
import { FaRocket, FaArrowRight } from 'react-icons/fa';

const Promote = () => {
  return (
    <div className="py-24 relative overflow-hidden bg-white dark:bg-[#1f2340]">
      {/* Background Decor */}
      <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#0ecdb9]/10 dark:bg-[#0ecdb9]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Image Grid */}
          <div className="w-full lg:w-1/2 relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#FFB703]/20 to-[#0ecdb9]/20 blur-3xl rounded-full transform -rotate-12 translate-x-4 translate-y-4"></div>
             <div className="relative bg-white dark:bg-[#111827] p-4 rounded-full shadow-2xl border border-gray-100 dark:border-gray-800">
               <img
                  src="https://img.freepik.com/free-vector/startup-life-concept-illustration_114360-1068.jpg"
                  alt="Startup Concept"
                  className="w-full rounded-full object-cover shadow-inner hover:rotate-3 transition-transform duration-700"
               />
             </div>
             
             {/* Floating elements */}
             <div className="absolute top-10 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-10 h-10 rounded-full bg-[#0ecdb9]/20 flex items-center justify-center">
                   <FaRocket className="text-[#0ecdb9]" />
                </div>
                <div>
                   <p className="text-xs text-gray-500 font-bold uppercase">Launch</p>
                   <p className="text-sm font-extrabold text-gray-900 dark:text-white">Your Career</p>
                </div>
             </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8 animate-in slide-in-from-right-10 fade-in duration-700">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/20 text-[#FFB703] font-bold text-sm">
                Next-Gen Platform
             </div>
             
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1]">
                An Ultimate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ecdb9] to-[#0ba898]">Contest Platform</span>
             </h2>
             
             <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                ContestHub is purpose-built for creators who want to sharpen their skills. 
                Engage in thrilling challenges, receive feedback from industry leaders, 
                and build an outstanding portfolio that commands attention globally. 
             </p>

             <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link to={'/allContest'}>
                   <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-xl transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-3">
                      Join The Contest <FaArrowRight />
                   </button>
                </Link>
                <Link to={'/about'}>
                   <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#111827] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl transition-all border border-gray-200 dark:border-gray-700 hover:-translate-y-1 shadow-sm">
                      Learn More
                   </button>
                </Link>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Promote;
