import React from 'react';
import { Link } from 'react-router';
import { FaTrophy, FaUsers, FaShieldAlt, FaRocket } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111827] pt-20 md:pt-24 pb-12 transition-colors duration-300 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-[#FFB703]/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-[#0ecdb9]/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            About <span className="text-[#FFB703]">Contest</span><span className="text-[#0ecdb9]">Hub</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
            Empowering creators, developers, and innovators to showcase their skills in a fair, competitive, and highly rewarding environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="bg-white/80 dark:bg-[#1f2340]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FFB703]/20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <FaRocket className="text-xl md:text-2xl text-[#FFB703]" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">Our Mission</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed md:leading-relaxed">    
              ContestHub is a competitive platform designed to bridge the gap between talent and opportunity. We provide a space where creators host exciting contests and participants can challenge themselves to grow, learn, and win.       
            </p>
          </div>

          <div className="bg-white/80 dark:bg-[#1f2340]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0ecdb9]/20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <FaShieldAlt className="text-xl md:text-2xl text-[#0ecdb9]" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">Fairness & Transparency</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed md:leading-relaxed">    
              To ensure absolute fairness, all works are reviewed under strict, controlled rules. Participants compete on equal footing, and all results are heavily verified by dedicated administrators before any winners are officially announced.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FFB703] to-[#e5a400] rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-6">Ready to showcase your talent?</h2>
            <p className="text-gray-800 text-sm sm:text-base md:text-lg mb-6 max-w-2xl mx-auto font-medium">
              Join thousands of creators who are already participating in active contests.
              Don't miss out on the chance to win prizes and global recognition.
            </p>
            <Link to="/allContest" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 w-full sm:w-auto">
              <FaTrophy className="text-[#FFB703]" /> Explore Contests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
