import { FaLongArrowAltRight, FaTrophy, FaRocket, FaShieldAlt, FaMedal } from 'react-icons/fa';
import usePublicAxios from '../hooks/usePublicAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const InsPire = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const axiosPublic = usePublicAxios();
  const { data = [] } = useQuery({
    queryKey: ['winnerData'],
    queryFn: async () => {
      const result = await axiosPublic.get('/total/winner');
      return result.data;
    },
  });

  return (
    <div className="w-full relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-gray-900 shadow-2xl">
      {/* Background with modern gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a1c38] to-gray-900"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFB703]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0ecdb9]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-24 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content Area */}
        <div 
          data-aos="fade-right"
          data-aos-duration="1000"
          className="w-full lg:w-[45%] space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#0ecdb9] animate-pulse"></span>
            <span className="text-sm font-semibold tracking-wide text-gray-300 uppercase">Inspire & Achieve</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Become A <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB703] to-[#f5dd90]">
                Successful Person
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Unleash your potential with ContestHub! Participate in a wide range of premium contests, validate your skills, and take your talents to the global stage on our innovative platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
            <Link to={'/login'} className="group w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FFB703] to-[#e5a400] hover:from-[#e5a400] hover:to-[#cc9300] text-gray-900 rounded-2xl font-bold shadow-xl shadow-[#FFB703]/20 flex items-center justify-center gap-3 transition-all transform active:scale-95">
                Start Your Journey
                <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="p-2.5 bg-[#FFB703]/20 rounded-xl">
                <FaTrophy className="text-[#FFB703] text-xl" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-xl leading-none">{data?.length || 0}+</p>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">Total Winners</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area - Modern Bento Grid */}
        <div 
          data-aos="fade-left"
          data-aos-duration="1000"
          className="w-full lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative"
        >
          <div className="space-y-4 md:space-y-6">
            {/* Spotlight Winner Card */}
            {data.slice(0, 1).map(item => (
              <div key={item._id} className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-xl hover:border-[#0ecdb9]/50 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FaMedal className="text-6xl text-[#0ecdb9]" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex mb-6 p-1.5 rounded-full bg-white/5 border border-white/10">
                    <img
                      src={item?.participateUserPhoto || 'https://via.placeholder.com/150'}
                      alt="Winner"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg"
                    />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Featured Winner</h4>
                    <h3 className="text-white font-bold text-lg sm:text-xl truncate">{item?.contestName}</h3>
                  </div>
                </div>
              </div>
            ))}

            {/* Feature Card 1 */}
            <div className="group rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-[#0ecdb9]/10 text-[#0ecdb9] group-hover:scale-110 transition-transform">
                <FaRocket className="text-2xl" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Responsive</h3>
                <p className="text-gray-400 text-sm">Flawless on all devices</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 sm:mt-12">
            {/* Feature Card 2 */}
            <div className="group rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 flex flex-col justify-center">
              <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                <FaMedal className="text-2xl" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">High Rewards</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Compete in top-tier contests with massive prize pools and industry recognition.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 flex flex-col justify-center">
              <div className="p-4 rounded-2xl bg-[#FFB703]/10 text-[#FFB703] w-fit mb-4 group-hover:scale-110 transition-transform">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Fair & Secure</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every contest uses strict rules and verified moderation to ensure equality.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InsPire;
