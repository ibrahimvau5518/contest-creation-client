import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'UI/UX Designer',
      image: 'https://i.pravatar.cc/150?img=47',
      text: 'ContestHub changed my career. I won a major design contest and the prize money helped me start my own agency.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Content Writer',
      image: 'https://i.pravatar.cc/150?img=11',
      text: 'The platform is incredibly intuitive. I love how easy it is to find article contests and submit my work. Pure professional experience.',
      rating: 5
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Game Developer',
      image: 'https://i.pravatar.cc/150?img=5',
      text: 'As a creator with small budget, the low entry fees and high rewards are a game-changer. The community is also super supportive.',
      rating: 4
    }
  ];

  return (
    <div className="py-24 relative bg-gray-50 dark:bg-[#111827]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">       
        <div className="text-center mb-16 animate-in slide-in-from-bottom-10 fade-in duration-700">
          <span className="text-[#0ecdb9] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block">What People Say</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Creator <span className="text-[#FFB703]">Success Stories</span>     
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
            Join thousands of creators who have elevated their careers and won amazing prizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">  
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className="bg-white dark:bg-[#1f2340] border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl hover:-translate-y-2 transition-all duration-300 relative group animate-in zoom-in-95"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <FaQuoteLeft className="text-3xl sm:text-4xl text-gray-100 dark:text-gray-800 mb-6 group-hover:text-[#FFB703] transition-colors" />

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img src={review.image} alt={review.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#0ecdb9] object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{review.name}</h4>
                  <p className="text-xs sm:text-sm text-[#FFB703] font-medium">{review.role}</p>
                </div>
              </div>

               <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex gap-1">
                 {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#FFB703] w-3 h-3 sm:w-4 sm:h-4" />       
                 ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
