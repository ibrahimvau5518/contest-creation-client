import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import usePublicAxios from '../hooks/usePublicAxios';
import { useQuery } from '@tanstack/react-query';

const SliderInfo = () => {
  const axiosPublic = usePublicAxios();

  const { data: allContest = [] } = useQuery({
    queryKey: ['all'],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/allContest-for/home/page?sort=${'asc'}`
      );
      return result.data;
    },
  });

  return (
    <div className="container mx-auto w-full px-4 sm:w-[90%] md:w-[80%] md:px-0 py-8 md:py-10">
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-xl md:rounded-3xl shadow-2xl"
      >
        {allContest?.slice(0, 4).map(item => (
          <SwiperSlide key={item._id}>
            <div className="card bg-[#151515]/80 backdrop-blur-md text-white min-h-[300px] flex flex-col md:flex-row items-center justify-center p-6 md:p-12">
              <figure className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
                <img
                  src="https://i.ibb.co.com/CpcK5gL7/Picsart-25-04-07-09-06-16-642.jpg"
                  alt="image"
                  className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover border-4 border-[#FFB703] shadow-lg shadow-[#FFB703]/20"
                />
              </figure>
              <div className="w-full md:w-2/3 text-center md:text-left space-y-3 px-2 md:px-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold capitalize text-[#FFB703]">
                  {item?.hostName}
                </h2>
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-200">
                  Contest: <span className="text-white">{item?.contestName}</span>
                </h4>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-white">Participated:</span> {item?.participated}
                </p>
                <p className="text-sm sm:text-base text-gray-400 italic">
                  "{item?.description?.slice(0, 100)}{item?.description?.length > 100 ? '...' : ''}"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderInfo;
