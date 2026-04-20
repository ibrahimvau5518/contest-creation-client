import SliderInfo from './SliderInfo';

const Slider = () => {
  return (
    <div className="py-16 md:py-24 bg-cover bg-bottom bg-base-100 dark:bg-[#1f2340]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase text-[#FFB703] font-bold">
          Best Contest Creator
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-900 dark:text-gray-100 leading-relaxed max-w-3xl mx-auto">
          Best Contest Creator is designed for those who want to create<br className="hidden md:block"/>{' '}
          impactful contests quickly and efficiently. With advanced features and
          intuitive controls,<br className="hidden md:block"/>
          you can focus on making your contest memorable and enjoyable for all
          participants.
        </p>
      </div>
      <div className="mt-8 md:mt-12 rounded-xl px-4 sm:px-0">
        <SliderInfo></SliderInfo>
      </div>
    </div>
  );
};

export default Slider;
