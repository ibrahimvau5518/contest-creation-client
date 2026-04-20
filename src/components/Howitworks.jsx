import { FaUserPlus, FaTrophy, FaGift } from 'react-icons/fa';

const Howitworks = () => {
  const steps = [
    {
      id: 1,
      title: 'Join & Create Account',
      description: 'Sign up in seconds, set up your creator profile, and get ready to participate in world-class contests.',
      icon: <FaUserPlus className="text-3xl text-white" />,
      color: 'bg-[#0ecdb9]'
    },
    {
      id: 2,
      title: 'Compete & Create',
      description: 'Find contests that match your skills. Read the guidelines, create your masterpiece, and submit your entry.',
      icon: <FaTrophy className="text-3xl text-white" />,
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'Win Amazing Prizes',
      description: 'Get evaluated by industry experts, climb the global leaderboard, and claim massive rewards for your talent.',
      icon: <FaGift className="text-3xl text-white" />,
      color: 'bg-[#FFB703]'
    }
  ];

  return (
    <div className="py-24 relative overflow-hidden bg-white dark:bg-[#111827]">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 dark:from-[#1f2340] to-transparent pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-in slide-in-from-bottom-10 fade-in duration-700">
          <span className="text-[#0ecdb9] font-bold tracking-widest uppercase text-sm mb-3 block">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            How It <span className="text-[#FFB703]">Works</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Your journey from an enthusiastic creator to an acclaimed champion in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-1 bg-gradient-to-r from-[#0ecdb9] via-purple-500 to-[#FFB703] opacity-30 rounded-full"></div>

          {steps.map((step, index) => (
             <div 
               key={step.id} 
               className="relative flex flex-col items-center text-center group animate-in slide-in-from-bottom"
               style={{ animationDelay: `${index * 200}ms` }}
             >
                {/* Step Icon */}
                <div className={`w-24 h-24 rounded-3xl ${step.color} flex items-center justify-center shadow-2xl shadow-${step.color.replace('bg-', '')}/30 transform group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-500 mb-8 relative z-10 rotate-3 group-hover:rotate-0`}>
                   {step.icon}
                   {/* Number Badge */}
                   <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center font-extrabold text-gray-900 dark:text-white text-sm border-2 border-transparent">
                      {step.id}
                   </div>
                </div>

                {/* Step Content */}
                <div className="bg-gray-50 dark:bg-[#1f2340] border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-shadow w-full">
                   <h3 className="text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-white mb-4 group-hover:text-[#FFB703] transition-colors">{step.title}</h3>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Howitworks;
