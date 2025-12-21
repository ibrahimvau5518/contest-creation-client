import SliderInfo from './SliderInfo';

const Slider = () => {
  return (
    <div className=" bg-cover bg-bottom bg-[#1f2340]">
      <h2 className="text-4xl text-center uppercase text-[#FFB703] pb-5 pt-20 font-bold">
        best contest creator
      </h2>
      <p className="text-center text-white">
        Best Contest Creator is designed for those who want to create <br />{' '}
        impactful contests quickly and efficiently. With advanced features and
        intuitive controls, <br />
        you can focus on making your contest memorable and enjoyable for all
        participants.
      </p>
      <div className="rounded-xl">
        <SliderInfo></SliderInfo>
      </div>
    </div>
  );
};

export default Slider;
