import Banner from '../components/Banner';
import Cta from '../components/Cta';
import HomeContest from '../components/HomeContest';
import Howitworks from '../components/Howitworks';
import InsPire from '../components/InsPire';
import Promote from '../components/Promote';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-[#111827] min-h-screen transition-colors duration-300">
      <div className="relative">
        <Banner />
      </div>

      <div className="space-y-0">
        {/* Popular Contests Section */}
        <section className="relative z-10 pt-16 md:pt-20 pb-8 md:pb-10 bg-gray-50 dark:bg-[#111827]">
          <div className="text-center mb-10 md:mb-16 animate-in slide-in-from-bottom-10 fade-in duration-700 px-4 md:px-6">
            <span className="text-[#0ecdb9] font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3 block">Discover Excellence</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Trending <span className="text-[#FFB703]">Contests</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
              Join thousands of participants in our most popular ongoing competitions and win exclusive rewards.
            </p>
          </div>
          <HomeContest />
        </section>

        {/* How It Works Section */}
        <section className="relative">
          <Howitworks />
        </section>

        {/* Testimonials */}
        <section className="relative px-4 sm:px-6 md:px-0">
          <Testimonials />
        </section>

        {/* Inspire Section */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto">
           <div className="bg-white/50 dark:bg-[#1f2340]/50 backdrop-blur-xl rounded-2xl md:rounded-[3rem] p-4 sm:p-6 md:p-8 lg:p-12 border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden">
             <InsPire />
           </div>
        </section>

        {/* Promote Section */}
        <section className="bg-white dark:bg-[#111827] py-12 md:py-16 px-4 sm:px-6 md:px-0">
          <Promote />
        </section>
      </div>

      <div className="px-4 sm:px-6 md:px-0">
        <Cta />
      </div>
    </div>
  );
};

export default Home;
