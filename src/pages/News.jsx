import { Link } from 'react-router';
import { FaLinkedin, FaTwitter, FaBell, FaMegaport, FaNewspaper } from 'react-icons/fa';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "ContestHub is Officially Live!",
      date: "Oct 24, 2024",
      tag: "Launch",
      color: "#0ecdb9",
      desc: "Our platform is fully operational! Hosts can now submit contest requests, and users can browse the newest tournaments and start competing instantly. We're thrilled to build this ecosystem."
    },
    {
      id: 2,
      title: "New Category Added: AI Innovation",
      date: "Nov 02, 2024",
      tag: "Update",
      color: "#FFB703",
      desc: "Based on massive community demand, we have officially integrated the 'AI Innovation' category. Developers can now host contests exclusively targeting generative AI and machine learning fields."
    },
    {
      id: 3,
      title: "Winter Creator Championship 2024",
      date: "Dec 10, 2024",
      tag: "Event",
      color: "#f43f5e",
      desc: "Get ready for the biggest contest of the year. Featuring a combined prize pool of $15,000 across multiple categories, the Winter Championship will test the very best of your skills."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111827] pt-24 pb-12 transition-colors duration-300 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[20%] left-[-10%] w-64 h-64 md:w-[500px] md:h-[500px] bg-[#FFB703]/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-[500px] md:h-[500px] bg-[#0ecdb9]/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">

        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center justify-center p-3 bg-[#FFB703]/20 rounded-full mb-4">
            <FaNewspaper className="text-3xl text-[#FFB703]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Recent <span className="text-[#0ecdb9]">News</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
            Stay connected for updates about new contests, feature releases, and platform improvements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">
            {newsItems.map(item => (
              <div key={item.id} className="bg-white/80 dark:bg-[#1f2340]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform duration-300 group">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                    {item.tag}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <FaBell className="text-gray-400 text-xs sm:text-sm" /> {item.date}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#FFB703] transition-colors">{item.title}</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1f2340] to-[#111827] p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-800 lg:sticky lg:top-28">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <FaMegaport className="text-2xl text-[#0ecdb9]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Never Miss an Update</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-8 leading-relaxed">
                Subscribe to our official social channels to get instant notifications whenever a major contest goes live or crucial platform changes are deployed.
              </p>

              <div className="space-y-4">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-colors border border-white/10 group">
                  <div className="bg-[#0077b5] p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <FaLinkedin className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base text-white font-bold">LinkedIn</h4>
                    <p className="text-xs text-gray-400">Official Announcements</p>
                  </div>
                </a>

                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-colors border border-white/10 group">
                  <div className="bg-[#1DA1F2] p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <FaTwitter className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base text-white font-bold">Twitter (X)</h4>       
                    <p className="text-xs text-gray-400">Live Updates & Drops</p>
                  </div>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default News;
